const { createClient } = require("@supabase/supabase-js");
const { google } = require("googleapis");
const { Resend } = require("resend");

const APPLICATIONS_TABLE = "applications";
const DEFAULT_APPLICATION_STATUS = "접수";
const DEFAULT_ADMIN_EMAIL = "contact@eruty.co.kr";
const DEFAULT_FROM_EMAIL = "이룸터 <noreply@erumter.com>";
const GOOGLE_SHEETS_SCOPE = ["https://www.googleapis.com/auth/spreadsheets"];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9-\s]+$/;

const SUCCESS_RESPONSE_MESSAGE =
  "신청이 완료되었습니다. 입력하신 이메일로 접수 확인 메일을 발송할 예정입니다. 담당자가 확인 후 교육 일정 및 결제 안내를 순차적으로 전달드리겠습니다.";
const PARTIAL_EMAIL_SUCCESS_MESSAGE =
  "신청이 접수되었습니다. 다만 안내 메일 발송에 문제가 있을 수 있습니다. 잠시 후에도 메일을 받지 못하시면 contact@eruty.co.kr로 문의해 주세요.";
const DUPLICATE_EMAIL_MESSAGE =
  "이미 신청된 이메일입니다. 신청 내용 변경이 필요하신 경우 contact@eruty.co.kr로 문의해주세요.";
const INTERNAL_ERROR_MESSAGE = "신청 처리 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.";
const INVALID_JSON_MESSAGE = "요청 본문을 올바른 JSON 형식으로 보내 주세요.";

const investmentLevelLabels = {
  beginner: "초급",
  intermediate: "중급",
  advanced: "고급",
};

const aiExperienceLabels = {
  none: "없음",
  chatgpt: "ChatGPT 사용 경험 있음",
  "automation-tools": "자동화 도구 사용 경험 있음",
  "workflow-automation": "업무 자동화 경험 있음",
};

const interestLabels = {
  "stock-research-automation": "주식 리서치 자동화",
  "news-disclosure-analysis": "뉴스/공시 분석",
  "ai-reporting": "AI 리포트 생성",
  "n8n-automation": "n8n 자동화",
  "investment-routine": "투자 루틴 구축",
  other: "기타",
};

const referralSourceLabels = {
  instagram: "인스타그램",
  "naver-search": "네이버 검색",
  referral: "지인 추천",
  advertisement: "광고",
  other: "기타",
};

const sendJson = (res, statusCode, body) => {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
};

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const isPhoneFormatValid = (value) => {
  if (!phonePattern.test(value)) {
    return false;
  }

  const digitsOnly = value.replace(/\D/g, "");

  if (digitsOnly.length < 9 || digitsOnly.length > 11) {
    return false;
  }

  return digitsOnly.startsWith("0");
};

const getBodyFromRequest = (req) =>
  new Promise((resolve, reject) => {
    if (req.body && typeof req.body === "object") {
      resolve(req.body);
      return;
    }

    if (typeof req.body === "string") {
      try {
        resolve(JSON.parse(req.body));
      } catch (error) {
        reject(error);
      }
      return;
    }

    const chunks = [];

    req.on("data", (chunk) => {
      chunks.push(chunk);
    });

    req.on("end", () => {
      const rawBody = Buffer.concat(chunks).toString("utf8");

      if (!rawBody) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(rawBody));
      } catch (error) {
        reject(error);
      }
    });

    req.on("error", reject);
  });

const validateApplyPayload = (payload) => {
  if (!payload || typeof payload !== "object") {
    return "잘못된 요청입니다.";
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const phone = typeof payload.phone === "string" ? payload.phone.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const organization = typeof payload.organization === "string" ? payload.organization.trim() : "";
  const investmentLevel = typeof payload.investmentLevel === "string" ? payload.investmentLevel.trim() : "";
  const aiExperience = typeof payload.aiExperience === "string" ? payload.aiExperience.trim() : "";
  const purpose = typeof payload.purpose === "string" ? payload.purpose.trim() : "";

  if (!name) {
    return "이름을 입력해 주세요.";
  }

  if (!phone) {
    return "연락처를 입력해 주세요.";
  }

  if (!isPhoneFormatValid(phone)) {
    return "연락처는 010-1234-5678 또는 01012345678 형식으로 입력해 주세요.";
  }

  if (!email) {
    return "이메일을 입력해 주세요.";
  }

  if (!emailPattern.test(email)) {
    return "올바른 이메일 형식으로 입력해 주세요.";
  }

  if (!organization) {
    return "직업 또는 소속을 입력해 주세요.";
  }

  if (!investmentLevel) {
    return "투자 경험 수준을 선택해 주세요.";
  }

  if (!aiExperience) {
    return "AI 활용 경험을 선택해 주세요.";
  }

  if (!purpose) {
    return "참여 목적을 입력해 주세요.";
  }

  if (payload.privacyAgreed !== true) {
    return "개인정보 수집 및 이용에 동의해야 신청할 수 있습니다.";
  }

  return null;
};

const getDisplayValue = (mapping, value) => mapping[value] || value || "-";

const getInterestDisplay = (values = []) => {
  if (!Array.isArray(values) || !values.length) {
    return "없음";
  }

  return values.map((value) => getDisplayValue(interestLabels, value)).join(", ");
};

const formatSubmittedAt = (submittedAt) =>
  submittedAt.toLocaleString("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

const normalizePayload = (payload) => {
  const submittedAt = new Date();
  const normalizedInterests = Array.isArray(payload.interests)
    ? [...new Set(payload.interests.filter((value) => typeof value === "string" && value.trim()).map((value) => value.trim()))]
    : [];
  const normalizedEmail = payload.email.trim().toLowerCase();
  const normalizedReferralSource =
    typeof payload.referralSource === "string" && payload.referralSource.trim() ? payload.referralSource.trim() : "";

  return {
    name: payload.name.trim(),
    phone: payload.phone.trim(),
    email: normalizedEmail,
    organization: payload.organization.trim(),
    investmentLevel: payload.investmentLevel.trim(),
    investmentLevelLabel: getDisplayValue(investmentLevelLabels, payload.investmentLevel.trim()),
    aiExperience: payload.aiExperience.trim(),
    aiExperienceLabel: getDisplayValue(aiExperienceLabels, payload.aiExperience.trim()),
    interests: normalizedInterests,
    interestsLabel: getInterestDisplay(normalizedInterests),
    purpose: payload.purpose.trim(),
    inquiry: typeof payload.inquiry === "string" && payload.inquiry.trim() ? payload.inquiry.trim() : "없음",
    referralSource: normalizedReferralSource,
    referralSourceLabel: getDisplayValue(referralSourceLabels, normalizedReferralSource),
    privacyAgreed: payload.privacyAgreed === true,
    submittedAt,
    submittedAtLabel: formatSubmittedAt(submittedAt),
  };
};

const createApplicationRecord = (payload) => ({
  name: payload.name,
  phone: payload.phone,
  email: payload.email,
  organization: payload.organization,
  investment_level: payload.investmentLevel,
  ai_experience: payload.aiExperience,
  interests: payload.interests,
  purpose: payload.purpose,
  message: payload.inquiry === "없음" ? null : payload.inquiry,
  referral_source: payload.referralSource || null,
  privacy_agreed: payload.privacyAgreed,
  status: DEFAULT_APPLICATION_STATUS,
  created_at: payload.submittedAt.toISOString(),
});

const createGoogleSheetsConfig = () => {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const sheetName = process.env.GOOGLE_SHEETS_SHEET_NAME || "applications";
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;

  if (!spreadsheetId || !clientEmail || !privateKey) {
    return null;
  }

  return {
    spreadsheetId,
    range: `${sheetName}!A:M`,
    auth: new google.auth.JWT({
      email: clientEmail,
      key: privateKey.replace(/\\n/g, "\n"),
      scopes: GOOGLE_SHEETS_SCOPE,
    }),
  };
};

const createSupabaseClient = () => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Missing Supabase environment variables");
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};

const isDuplicateApplicationError = (error) => {
  if (!error || typeof error !== "object") {
    return false;
  }

  const code = "code" in error ? String(error.code) : "";
  const message = "message" in error ? String(error.message).toLowerCase() : "";

  return code === "23505" || message.includes("duplicate key") || message.includes("unique");
};

const findExistingApplicationByEmail = async (supabase, email) => {
  const { data, error } = await supabase
    .from(APPLICATIONS_TABLE)
    .select("id")
    .eq("email", email)
    .limit(1)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
};

const insertApplication = async (supabase, payload) => {
  const applicationRecord = createApplicationRecord(payload);
  const { data, error } = await supabase
    .from(APPLICATIONS_TABLE)
    .insert(applicationRecord)
    .select("id, email")
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
};

const appendApplicationToGoogleSheets = async (payload) => {
  const sheetsConfig = createGoogleSheetsConfig();

  if (!sheetsConfig) {
    return {
      ok: false,
      skipped: true,
      reason: "missing_google_sheets_environment_variables",
    };
  }

  const sheets = google.sheets({
    version: "v4",
    auth: sheetsConfig.auth,
  });

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetsConfig.spreadsheetId,
    range: sheetsConfig.range,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [
        [
          payload.submittedAt.toISOString(),
          payload.name,
          payload.phone,
          payload.email,
          payload.organization,
          payload.investmentLevelLabel,
          payload.aiExperienceLabel,
          payload.interestsLabel,
          payload.purpose,
          payload.inquiry,
          payload.referralSourceLabel,
          payload.privacyAgreed ? "TRUE" : "FALSE",
          DEFAULT_APPLICATION_STATUS,
        ],
      ],
    },
  });

  return {
    ok: true,
    skipped: false,
  };
};

const createAdminEmail = (payload) => {
  const subject = `[이룸터 1기 신청] ${payload.name} 님 신청 접수`;
  const text = [
    "이룸터 1기 신청이 접수되었습니다.",
    "",
    `이름: ${payload.name}`,
    `연락처: ${payload.phone}`,
    `이메일: ${payload.email}`,
    `직업/소속: ${payload.organization}`,
    `투자 경험 수준: ${payload.investmentLevelLabel}`,
    `AI 활용 경험: ${payload.aiExperienceLabel}`,
    `관심 분야: ${payload.interestsLabel}`,
    `참여 목적: ${payload.purpose}`,
    `문의사항: ${payload.inquiry}`,
    `유입 경로: ${payload.referralSourceLabel}`,
    `접수 시간: ${payload.submittedAtLabel}`,
  ].join("\n");

  const html = `
    <div style="font-family: Pretendard, Apple SD Gothic Neo, Noto Sans KR, sans-serif; color: #102033; line-height: 1.7;">
      <h2 style="margin: 0 0 16px;">이룸터 1기 신청이 접수되었습니다.</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tbody>
          ${[
            ["이름", payload.name],
            ["연락처", payload.phone],
            ["이메일", payload.email],
            ["직업/소속", payload.organization],
            ["투자 경험 수준", payload.investmentLevelLabel],
            ["AI 활용 경험", payload.aiExperienceLabel],
            ["관심 분야", payload.interestsLabel],
            ["참여 목적", payload.purpose],
            ["문의사항", payload.inquiry],
            ["유입 경로", payload.referralSourceLabel],
            ["접수 시간", payload.submittedAtLabel],
          ]
            .map(
              ([label, value]) => `
                <tr>
                  <td style="padding: 10px 12px; border: 1px solid #d9e5f0; background: #f5f9fc; width: 160px; font-weight: 700;">${escapeHtml(label)}</td>
                  <td style="padding: 10px 12px; border: 1px solid #d9e5f0; white-space: pre-line;">${escapeHtml(value)}</td>
                </tr>
              `
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;

  return { subject, text, html };
};

const createApplicantEmail = (payload) => {
  const subject = "[이룸터] 1기 신청이 정상 접수되었습니다.";
  const text = [
    `안녕하세요, ${payload.name} 님.`,
    "이룸터 1기 투자 AX 자동화 실전 과정 신청이 정상 접수되었습니다.",
    "",
    "담당자가 신청 내용을 확인한 뒤 교육 일정, 장소, 결제 안내를 순차적으로 전달드릴 예정입니다.",
    "",
    "감사합니다.",
    "이룸터 운영팀",
  ].join("\n");

  const html = `
    <div style="font-family: Pretendard, Apple SD Gothic Neo, Noto Sans KR, sans-serif; color: #102033; line-height: 1.8;">
      <p>안녕하세요, ${escapeHtml(payload.name)} 님.</p>
      <p>이룸터 1기 투자 AX 자동화 실전 과정 신청이 정상 접수되었습니다.</p>
      <p>담당자가 신청 내용을 확인한 뒤 교육 일정, 장소, 결제 안내를 순차적으로 전달드릴 예정입니다.</p>
      <p>감사합니다.<br />이룸터 운영팀</p>
    </div>
  `;

  return { subject, text, html };
};

const sendEmail = async (resend, options) => {
  const { data, error } = await resend.emails.send(options);

  if (error) {
    throw new Error(typeof error.message === "string" ? error.message : "Resend email send failed");
  }

  return data;
};

const sendApplyEmails = async (payload) => {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.FROM_EMAIL || DEFAULT_FROM_EMAIL;
  const adminEmail = process.env.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL;
  const result = {
    admin: { ok: false, error: null, data: null },
    applicant: { ok: false, error: null, data: null },
  };

  if (!apiKey) {
    const missingKeyError = new Error("Missing RESEND_API_KEY");
    result.admin.error = missingKeyError;
    result.applicant.error = missingKeyError;
    return result;
  }

  const resend = new Resend(apiKey);
  const adminEmailContent = createAdminEmail(payload);
  const applicantEmailContent = createApplicantEmail(payload);

  try {
    result.admin.data = await sendEmail(resend, {
      from,
      to: [adminEmail],
      subject: adminEmailContent.subject,
      html: adminEmailContent.html,
      text: adminEmailContent.text,
    });
    result.admin.ok = true;
  } catch (error) {
    result.admin.error = error;
  }

  try {
    result.applicant.data = await sendEmail(resend, {
      from,
      to: [payload.email],
      subject: applicantEmailContent.subject,
      html: applicantEmailContent.html,
      text: applicantEmailContent.text,
    });
    result.applicant.ok = true;
  } catch (error) {
    result.applicant.error = error;
  }

  return result;
};

const serializeError = (error) => ({
  message: error instanceof Error ? error.message : String(error),
  stack: error instanceof Error ? error.stack : null,
  code: error && typeof error === "object" && "code" in error ? String(error.code) : null,
});

const handler = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    sendJson(res, 405, {
      success: false,
      message: "Method Not Allowed",
    });
    return;
  }

  let body;

  try {
    body = await getBodyFromRequest(req);
  } catch (error) {
    sendJson(res, 400, {
      success: false,
      message: INVALID_JSON_MESSAGE,
    });
    return;
  }

  const validationError = validateApplyPayload(body);

  if (validationError) {
    sendJson(res, 400, {
      success: false,
      message: validationError,
    });
    return;
  }

  const normalizedPayload = normalizePayload(body);
  let supabase;

  try {
    supabase = createSupabaseClient();
  } catch (error) {
    console.error("[apply] Failed to initialize Supabase client", {
      ...serializeError(error),
      applicantEmail: normalizedPayload.email,
      applicantName: normalizedPayload.name,
    });

    sendJson(res, 500, {
      success: false,
      message: INTERNAL_ERROR_MESSAGE,
    });
    return;
  }

  try {
    const existingApplication = await findExistingApplicationByEmail(supabase, normalizedPayload.email);

    if (existingApplication) {
      sendJson(res, 409, {
        success: false,
        message: DUPLICATE_EMAIL_MESSAGE,
      });
      return;
    }

    await insertApplication(supabase, normalizedPayload);
  } catch (error) {
    if (isDuplicateApplicationError(error)) {
      sendJson(res, 409, {
        success: false,
        message: DUPLICATE_EMAIL_MESSAGE,
      });
      return;
    }

    console.error("[apply] Failed to persist application", {
      ...serializeError(error),
      applicantEmail: normalizedPayload.email,
      applicantName: normalizedPayload.name,
    });

    sendJson(res, 500, {
      success: false,
      message: INTERNAL_ERROR_MESSAGE,
    });
    return;
  }

  try {
    const googleSheetsResult = await appendApplicationToGoogleSheets(normalizedPayload);

    if (googleSheetsResult.skipped) {
      console.warn("[apply] Skipped Google Sheets sync", {
        reason: googleSheetsResult.reason,
        applicantEmail: normalizedPayload.email,
        applicantName: normalizedPayload.name,
      });
    }
  } catch (error) {
    console.error("[apply] Failed to append application to Google Sheets", {
      ...serializeError(error),
      applicantEmail: normalizedPayload.email,
      applicantName: normalizedPayload.name,
    });
  }

  const emailResult = await sendApplyEmails(normalizedPayload);

  if (!emailResult.admin.ok) {
    console.error("[apply] Failed to send admin email", {
      ...serializeError(emailResult.admin.error),
      applicantEmail: normalizedPayload.email,
      applicantName: normalizedPayload.name,
      recipient: process.env.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL,
    });
  }

  if (!emailResult.applicant.ok) {
    console.error("[apply] Failed to send applicant email", {
      ...serializeError(emailResult.applicant.error),
      applicantEmail: normalizedPayload.email,
      applicantName: normalizedPayload.name,
      recipient: normalizedPayload.email,
    });
  }

  const hasEmailFailure = !emailResult.admin.ok || !emailResult.applicant.ok;

  sendJson(res, 200, {
    success: true,
    message: hasEmailFailure ? PARTIAL_EMAIL_SUCCESS_MESSAGE : SUCCESS_RESPONSE_MESSAGE,
  });
};

module.exports = handler;
module.exports.validateApplyPayload = validateApplyPayload;
module.exports.normalizePayload = normalizePayload;
module.exports.createApplicationRecord = createApplicationRecord;
module.exports.createAdminEmail = createAdminEmail;
module.exports.createApplicantEmail = createApplicantEmail;
module.exports.createSupabaseClient = createSupabaseClient;
module.exports.createGoogleSheetsConfig = createGoogleSheetsConfig;
module.exports.appendApplicationToGoogleSheets = appendApplicationToGoogleSheets;

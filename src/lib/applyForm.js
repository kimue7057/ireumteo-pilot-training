export const APPLY_COHORT = "1기";

export const investmentExperienceOptions = [
  { value: "beginner", label: "초급" },
  { value: "intermediate", label: "중급" },
  { value: "advanced", label: "고급" },
];

export const aiExperienceOptions = [
  { value: "none", label: "없음" },
  { value: "chatgpt", label: "ChatGPT 사용 경험 있음" },
  { value: "automation-tools", label: "자동화 도구 사용 경험 있음" },
  { value: "workflow-automation", label: "업무 자동화 경험 있음" },
];

export const interestOptions = [
  { value: "stock-research-automation", label: "주식 리서치 자동화" },
  { value: "news-disclosure-analysis", label: "뉴스/공시 분석" },
  { value: "ai-reporting", label: "AI 리포트 생성" },
  { value: "n8n-automation", label: "n8n 자동화" },
  { value: "investment-routine", label: "투자 루틴 구축" },
  { value: "other", label: "기타" },
];

export const referralSourceOptions = [
  { value: "instagram", label: "인스타그램" },
  { value: "naver-search", label: "네이버 검색" },
  { value: "referral", label: "지인 추천" },
  { value: "advertisement", label: "광고" },
  { value: "other", label: "기타" },
];

export const createApplyFormState = () => ({
  name: "",
  phone: "",
  email: "",
  organization: "",
  investmentExperience: "",
  aiExperience: "",
  purpose: "",
  privacyConsent: false,
  interests: [],
  inquiry: "",
  referralSource: "",
  submissionState: "idle",
  submitMessage: "",
});

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9-\s]+$/;

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

export const validateApplyForm = (state) => {
  const errors = {};

  if (!state.name.trim()) {
    errors.name = "이름을 입력해 주세요.";
  }

  if (!state.phone.trim()) {
    errors.phone = "연락처를 입력해 주세요.";
  } else if (!isPhoneFormatValid(state.phone.trim())) {
    errors.phone = "연락처는 010-1234-5678 또는 01012345678 형식으로 입력해 주세요.";
  }

  if (!state.email.trim()) {
    errors.email = "이메일을 입력해 주세요.";
  } else if (!emailPattern.test(state.email.trim())) {
    errors.email = "올바른 이메일 형식으로 입력해 주세요.";
  }

  if (!state.organization.trim()) {
    errors.organization = "직업 또는 소속을 입력해 주세요.";
  }

  if (!state.investmentExperience) {
    errors.investmentExperience = "투자 경험 수준을 선택해 주세요.";
  }

  if (!state.aiExperience) {
    errors.aiExperience = "AI 활용 경험을 선택해 주세요.";
  }

  if (!state.purpose.trim()) {
    errors.purpose = "참여 목적을 입력해 주세요.";
  }

  if (!state.privacyConsent) {
    errors.privacyConsent = "개인정보 수집 및 이용에 동의해야 신청할 수 있습니다.";
  }

  return errors;
};

export const buildApplyPayload = (state) => ({
  cohort: APPLY_COHORT,
  name: state.name.trim(),
  phone: state.phone.trim(),
  email: state.email.trim(),
  organization: state.organization.trim(),
  investmentLevel: state.investmentExperience,
  aiExperience: state.aiExperience,
  purpose: state.purpose.trim(),
  privacyAgreed: state.privacyConsent,
  interests: [...state.interests],
  inquiry: state.inquiry.trim(),
  referralSource: state.referralSource || null,
});

export const submitApplyForm = async (state) => {
  const payload = buildApplyPayload(state);

  let response;

  try {
    response = await fetch("/api/apply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    throw new Error("네트워크 오류로 신청을 처리하지 못했습니다. 잠시 후 다시 시도해 주세요.");
  }

  let result = null;

  try {
    result = await response.json();
  } catch (error) {
    result = null;
  }

  if (!response.ok || !result?.success) {
    throw new Error(result?.message || "신청 처리 중 오류가 발생했습니다.");
  }

  return result;
};

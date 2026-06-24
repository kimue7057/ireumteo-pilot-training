import {
  APPLY_COHORT,
  aiExperienceOptions,
  interestOptions,
  investmentExperienceOptions,
  referralSourceOptions,
} from "../lib/applyForm.js?v=20260618a";

const renderTextField = ({
  name,
  label,
  type = "text",
  placeholder,
  autocomplete,
  inputMode = "",
  required = false,
  hint = "",
  full = false,
}) => `
  <label class="apply-field${full ? " full" : ""}" data-field="${name}">
    <span class="apply-label-row">
      <span>${label}</span>
      <em class="${required ? "apply-required" : "apply-optional"}">${required ? "필수" : "선택"}</em>
    </span>
    <input
      type="${type}"
      name="${name}"
      placeholder="${placeholder}"
      autocomplete="${autocomplete}"
      ${inputMode ? `inputmode="${inputMode}"` : ""}
      ${required ? "required" : ""}
    />
    ${hint ? `<small class="apply-help">${hint}</small>` : ""}
    <span class="apply-error" data-error-for="${name}"></span>
  </label>
`;

const renderSelectField = ({ name, label, options, placeholder, required = false, full = false }) => `
  <label class="apply-field${full ? " full" : ""}" data-field="${name}">
    <span class="apply-label-row">
      <span>${label}</span>
      <em class="${required ? "apply-required" : "apply-optional"}">${required ? "필수" : "선택"}</em>
    </span>
    <select name="${name}" ${required ? "required" : ""}>
      <option value="">${placeholder}</option>
      ${options.map((option) => `<option value="${option.value}">${option.label}</option>`).join("")}
    </select>
    <span class="apply-error" data-error-for="${name}"></span>
  </label>
`;

const renderTextareaField = ({ name, label, placeholder, required = false, full = false }) => `
  <label class="apply-field${full ? " full" : ""}" data-field="${name}">
    <span class="apply-label-row">
      <span>${label}</span>
      <em class="${required ? "apply-required" : "apply-optional"}">${required ? "필수" : "선택"}</em>
    </span>
    <textarea name="${name}" rows="5" placeholder="${placeholder}" ${required ? "required" : ""}></textarea>
    <span class="apply-error" data-error-for="${name}"></span>
  </label>
`;

const renderInterestChoices = () => `
  <div class="apply-field full" data-field="interests">
    <div class="apply-label-row">
      <span>관심 분야</span>
      <em class="apply-optional">선택</em>
    </div>
    <div class="apply-choice-set">
      ${interestOptions
        .map(
          (option) => `
            <label class="apply-choice">
              <input type="checkbox" name="interests" value="${option.value}" />
              <span>${option.label}</span>
            </label>
          `
        )
        .join("")}
    </div>
    <span class="apply-error" data-error-for="interests"></span>
  </div>
`;

export const applyModal = () => `
  <div class="apply-modal" data-apply-modal hidden aria-hidden="true">
    <div class="apply-modal-backdrop" data-close-apply-modal></div>
    <div class="apply-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="apply-modal-title">
      <div class="apply-modal-shell">
        <div class="apply-modal-header">
          <div>
            <p class="eyebrow">APPLY ${APPLY_COHORT}</p>
            <h2 id="apply-modal-title">${APPLY_COHORT} 신청</h2>
            <p>기본 정보를 남겨주시면 이후 신청 접수와 안내 흐름으로 연결할 수 있도록 준비해둘게요.</p>
          </div>
          <button class="apply-modal-close" type="button" data-close-apply-modal aria-label="신청 모달 닫기">
            닫기
          </button>
        </div>

        <div class="apply-view apply-view-form" data-apply-form-view>
          <form class="apply-form" data-apply-form novalidate>
            <section class="apply-form-section">
              <div class="apply-form-section-head">
                <strong>기본 정보</strong>
                <span>필수 입력</span>
              </div>
              <div class="apply-form-grid">
                ${renderTextField({
                  name: "name",
                  label: "이름",
                  placeholder: "이름을 입력해 주세요",
                  autocomplete: "name",
                  required: true,
                })}
                ${renderTextField({
                  name: "phone",
                  label: "연락처",
                  type: "tel",
                  placeholder: "010-0000-0000",
                  autocomplete: "tel",
                  inputMode: "tel",
                  required: true,
                  hint: "휴대폰 번호 또는 연락 가능한 번호를 입력해 주세요.",
                })}
                ${renderTextField({
                  name: "email",
                  label: "이메일",
                  type: "email",
                  placeholder: "name@example.com",
                  autocomplete: "email",
                  inputMode: "email",
                  required: true,
                })}
                ${renderTextField({
                  name: "organization",
                  label: "직업/소속",
                  placeholder: "예: 직장인 / 프리랜서 / 스타트업",
                  autocomplete: "organization-title",
                  required: true,
                })}
              </div>
            </section>

            <section class="apply-form-section">
              <div class="apply-form-section-head">
                <strong>참여 정보</strong>
                <span>필수 입력</span>
              </div>
              <div class="apply-form-grid">
                ${renderSelectField({
                  name: "investmentExperience",
                  label: "투자 경험 수준",
                  options: investmentExperienceOptions,
                  placeholder: "선택해 주세요",
                  required: true,
                })}
                ${renderSelectField({
                  name: "aiExperience",
                  label: "AI 활용 경험",
                  options: aiExperienceOptions,
                  placeholder: "선택해 주세요",
                  required: true,
                })}
                ${renderTextareaField({
                  name: "purpose",
                  label: "참여 목적",
                  placeholder: "이번 과정에 기대하는 점과 참여 목적을 적어 주세요.",
                  required: true,
                  full: true,
                })}
              </div>
            </section>

            <section class="apply-form-section">
              <div class="apply-form-section-head">
                <strong>추가 정보</strong>
                <span>선택 입력</span>
              </div>
              <div class="apply-form-grid">
                ${renderInterestChoices()}
                ${renderTextareaField({
                  name: "inquiry",
                  label: "문의사항",
                  placeholder: "궁금한 점이 있다면 남겨 주세요.",
                  full: true,
                })}
                ${renderSelectField({
                  name: "referralSource",
                  label: "유입 경로",
                  options: referralSourceOptions,
                  placeholder: "선택해 주세요",
                })}
              </div>
            </section>

            <section class="apply-consent-card" data-field="privacyConsent">
              <label class="apply-consent-check">
                <input type="checkbox" name="privacyConsent" value="agreed" />
                <span>[필수] 개인정보 수집 및 이용에 동의합니다.</span>
              </label>
              <div class="apply-consent-copy">
                <p>수집 항목: 이름, 연락처, 이메일, 직업/소속, 투자 경험, AI 활용 경험, 참여 목적, 문의사항</p>
                <p>수집 목적: 교육 신청 접수, 교육 안내, 문의 대응, 수강 관련 안내</p>
                <p>보유 기간: 교육 종료 후 1년 또는 신청자 삭제 요청 시까지</p>
              </div>
              <span class="apply-error" data-error-for="privacyConsent"></span>
            </section>

            <div class="apply-form-footer">
              <p class="apply-form-caption">신청 정보를 남겨주시면 접수 확인 후 입력하신 이메일로 안내를 순차적으로 전달드립니다.</p>
              <div class="apply-form-actions">
                <p class="apply-form-feedback" data-apply-form-feedback data-state="idle" aria-live="polite"></p>
                <button class="button primary apply-submit" type="submit" data-analytics-event="submit_apply_form_ui" data-analytics-label="apply_modal_submit">
                  신청 완료하기
                </button>
              </div>
            </div>
          </form>
        </div>

        <section class="apply-success-view" data-apply-success-view hidden aria-live="polite">
          <div class="apply-success-badge">Application Complete</div>
          <h3 class="apply-success-title" data-apply-success-title>신청이 완료되었습니다.</h3>
          <div class="apply-success-copy">
            <p data-apply-success-primary>입력하신 이메일로 접수 확인 메일을 발송했습니다.</p>
            <p data-apply-success-secondary>담당자가 확인 후 교육 일정, 장소, 결제 안내를 순차적으로 전달드릴 예정입니다.</p>
            <p class="apply-success-contact">
              문의가 필요하신 경우 <a href="mailto:contact@eruty.co.kr">contact@eruty.co.kr</a>로 연락 주세요.
            </p>
          </div>
          <p class="apply-success-status" data-apply-success-status hidden></p>
          <div class="apply-success-actions">
            <button class="button primary" type="button" data-apply-success-action="confirm">
              확인
            </button>
            <button class="button secondary" type="button" data-apply-success-action="continue">
              홈페이지 계속 보기
            </button>
          </div>
        </section>
      </div>
    </div>
  </div>
`;
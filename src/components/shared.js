import { APPLY_URL, navItems } from "../data/siteContent.js";

export const brand = () => `
  <a class="brand" href="#top" aria-label="이룸터 홈">
    <span class="brand-mark" aria-hidden="true">
      <svg viewBox="0 0 24 24" role="img">
        <circle cx="6" cy="14" r="2.2" />
        <circle cx="12" cy="8" r="2.2" />
        <circle cx="18" cy="12" r="2.2" />
        <path d="M6 14 12 8l6 4" />
      </svg>
    </span>
    <span class="brand-word">이룸<span>터</span></span>
  </a>
`;

export const externalApplyLink = (
  className,
  label = "1기 신청하기",
  analyticsLabel = "apply_button"
) => `
  <a
    class="${className}"
    href="${APPLY_URL}"
    target="_blank"
    rel="noopener noreferrer"
    data-analytics-event="generate_lead"
    data-analytics-label="${analyticsLabel}"
    data-analytics-method="google_form"
  >${label}</a>
`;

export const renderNavLinks = () => navItems.map((item) => `<a href="${item.href}">${item.label}</a>`).join("");

export const header = () => `
  <header class="site-header">
    <div class="container nav-wrap">
      ${brand()}
      <nav class="desktop-nav" aria-label="주요 메뉴">
        ${renderNavLinks()}
      </nav>
      ${externalApplyLink("nav-cta", "1기 신청하기", "header_nav")}
      <div class="mobile-header-actions">
        ${externalApplyLink("mobile-header-cta", "1기 신청하기", "mobile_header")}
        <button class="menu-button" type="button" data-menu-button aria-expanded="false" aria-controls="mobile-nav" aria-label="메뉴 열기">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
    <nav class="mobile-nav container" id="mobile-nav" data-mobile-nav hidden aria-label="모바일 메뉴">
      ${renderNavLinks()}
    </nav>
  </header>
`;

export const footer = () => `
  <footer class="footer">
    <div class="container footer-grid">
      <div>
        ${brand()}
        <p class="footer-slogan">배움을 실행으로, 실행을 성과로.</p>
        <p>AI 기반 실행과 성과를 만드는 성장 플랫폼입니다.</p>
      </div>
      <nav>
        <h3>프로그램</h3>
        <a href="#program">프로그램 소개</a>
        <a href="#curriculum">커리큘럼</a>
        <a href="#outcomes">기대 결과</a>
      </nav>
      <nav>
        <h3>안내</h3>
        <a href="#audience">오프라인 경험</a>
      </nav>
      <div>
        <h3>문의</h3>
        <p>문의: manager@eruty.co.kr<br />연락처: 070-4242-8559</p>
      </div>
    </div>
    <p class="copyright">© 2026 이룸터. All rights reserved.</p>
  </footer>
`;

export const sectionHeading = ({ eyebrow, title, description }) => `
  <div class="section-heading">
    ${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ""}
    <h2>${title}</h2>
    ${description ? `<p>${description}</p>` : ""}
  </div>
`;

export const featureCard = ({ chip, title, description, variant, small = false }) => `
  <article class="feature-card${small ? " small" : ""}">
    ${chip ? `<span class="icon-chip${variant === "mint" ? " mint" : ""}">${chip}</span>` : ""}
    <h3>${title}</h3>
    <p>${description}</p>
  </article>
`;

export const systemPreview = ({ className = "", compact = false, panels, footerLabels = [] }) => `
  <div class="${className} system-preview" aria-hidden="true">
    <div class="preview-topbar"><span></span><span></span><span></span></div>
    <div class="preview-grid${compact ? " compact" : ""}">
      ${panels.map((panel) => `
        <div class="preview-panel${panel.large ? " large" : ""}${panel.chart ? " chart" : ""}">
          <strong>${panel.title}</strong>${panel.chart ? "<b></b>" : panel.lines.map(() => "<i></i>").join("")}
        </div>
      `).join("")}
    </div>
    ${footerLabels.length ? `<div class="preview-footer">${footerLabels.map((label) => `<span>${label}</span>`).join("")}</div>` : ""}
  </div>
`;

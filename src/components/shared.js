import { navItems, contactInfo } from "../data/siteContent.js";
import { buildRouteHref } from "../lib/router.js";

const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const serializeApplyContext = (context = {}) =>
  Object.entries(context)
    .filter(([, value]) => value !== undefined && value !== null && value !== "")
    .map(([key, value]) => {
      const dataKey = key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
      const serializedValue = Array.isArray(value) ? value.join("|") : String(value);
      return `data-${dataKey}="${escapeHtml(serializedValue)}"`;
    })
    .join(" ");

const isActivePath = (currentPath, itemPath) =>
  currentPath === itemPath || (itemPath !== "/" && currentPath.startsWith(`${itemPath}/`));

export const brand = () => `
  <a class="brand" href="${buildRouteHref("/")}" data-route-link data-route-path="/" aria-label="이룸터 홈">
    <img class="brand-logo brand-logo-icon" src="assets/erumter-logo.png" alt="" aria-hidden="true" />
    <span class="brand-word">이룸터</span>
  </a>
`;

export const routeLink = ({
  path,
  label,
  query = {},
  className = "",
  analyticsEvent = "",
  analyticsLabel = "",
  ariaLabel = "",
}) => `
  <a
    href="${buildRouteHref(path, query)}"
    class="${className}"
    data-route-link
    data-route-path="${escapeHtml(path)}"
    data-route-query="${escapeHtml(JSON.stringify(query))}"
    ${analyticsEvent ? `data-analytics-event="${analyticsEvent}"` : ""}
    ${analyticsLabel ? `data-analytics-label="${analyticsLabel}"` : ""}
    ${ariaLabel ? `aria-label="${escapeHtml(ariaLabel)}"` : ""}
  >${label}</a>
`;

export const applyTriggerButton = ({
  className,
  label,
  analyticsLabel = "apply_button",
  context = {},
  analyticsEvent = "generate_lead",
}) => `
  <button
    type="button"
    class="${className}"
    data-open-apply-modal
    ${serializeApplyContext(context)}
    data-analytics-event="${analyticsEvent}"
    data-analytics-label="${analyticsLabel}"
    data-analytics-method="apply_modal"
  >${label}</button>
`;

export const sectionHeading = ({ eyebrow, title, description, align = "left" }) => `
  <div class="section-heading section-heading-${align}">
    ${eyebrow ? `<p class="eyebrow">${eyebrow}</p>` : ""}
    <h2>${title}</h2>
    ${description ? `<p>${description}</p>` : ""}
  </div>
`;

export const renderNavLinks = (currentPath) =>
  navItems
    .map((item) =>
      routeLink({
        path: item.path,
        query: item.query || {},
        label: item.label,
        className: isActivePath(currentPath, item.path) ? "is-active" : "",
      })
    )
    .join("");

export const header = ({ currentPath, primaryApplyContext }) => `
  <header class="site-header">
    <div class="container nav-wrap">
      ${brand()}
      <nav class="desktop-nav" aria-label="주요 메뉴">
        ${renderNavLinks(currentPath)}
      </nav>
      ${applyTriggerButton({
        className: "nav-cta",
        label: "문의 남기기",
        analyticsLabel: "header_cta",
        context: primaryApplyContext,
      })}
      <div class="mobile-header-actions">
        ${applyTriggerButton({
          className: "mobile-header-cta",
          label: "문의",
          analyticsLabel: "mobile_header_cta",
          context: primaryApplyContext,
        })}
        <button class="menu-button" type="button" data-menu-button aria-expanded="false" aria-controls="mobile-nav" aria-label="메뉴 열기">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
    <nav class="mobile-nav container" id="mobile-nav" data-mobile-nav hidden aria-label="모바일 메뉴">
      ${renderNavLinks(currentPath)}
    </nav>
  </header>
`;

export const footer = () => `
  <footer class="footer">
    <div class="container footer-grid">
      <div>
        ${brand()}
        <p class="footer-slogan">배움에서 실행으로, 실행에서 성과로</p>
        <p>이룸터는 교육과 컨설팅을 통해 AI를 실제 업무와 조직의 실행 구조로 연결하는 AX 플랫폼입니다.</p>
      </div>
      <nav>
        <h3>사이트</h3>
        ${routeLink({ path: "/", query: { section: "programs" }, label: "메인 홈" })}
        ${routeLink({ path: "/programs", label: "프로그램" })}
        ${routeLink({ path: "/business", label: "기업교육" })}
      </nav>
      <nav>
        <h3>탐색</h3>
        ${routeLink({ path: "/reviews", label: "후기" })}
        ${routeLink({ path: "/contact", label: "문의" })}
      </nav>
      <div>
        <h3>문의</h3>
        <p>이메일: <a href="mailto:${contactInfo.email}">${contactInfo.email}</a><br />전화: <a href="tel:${contactInfo.phone}">${contactInfo.phone}</a></p>
      </div>
    </div>
    <div class="container footer-meta">
      <p class="business-info">
        이룸터 | 사업자등록번호 ${contactInfo.businessNumber} | 문의 <a href="mailto:${contactInfo.email}">${contactInfo.email}</a> |
        전화번호 <a href="tel:${contactInfo.phone}">${contactInfo.phone}</a>
      </p>
      <p class="copyright">© 2026 이룸터. All rights reserved.</p>
    </div>
  </footer>
`;

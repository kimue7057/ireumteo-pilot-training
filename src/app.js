import { footer, header } from "./components/shared.js?v=20260615b";
import { pageSections } from "./components/sections.js?v=20260615b";
import { initAnalytics, initAnalyticsEvents } from "./lib/analytics.js?v=20260615b";

const mount = document.querySelector("[data-app]");

const renderPage = () => {
  if (!mount) return;

  mount.innerHTML = `
    ${header()}
    <main id="top">
      ${pageSections()}
    </main>
    ${footer()}
  `;
};

const initMobileMenu = () => {
  const menuButton = document.querySelector("[data-menu-button]");
  const mobileNav = document.querySelector("[data-mobile-nav]");

  if (!menuButton || !mobileNav) return;

  menuButton.addEventListener("click", () => {
    const expanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!expanded));
    mobileNav.hidden = expanded;
  });
};

const initSmoothAnchors = () => {
  const menuButton = document.querySelector("[data-menu-button]");
  const mobileNav = document.querySelector("[data-mobile-nav]");

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId) return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });

      if (mobileNav && !mobileNav.hidden) {
        mobileNav.hidden = true;
        menuButton?.setAttribute("aria-expanded", "false");
      }
    });
  });
};

renderPage();
initAnalytics();
initAnalyticsEvents();
initMobileMenu();
initSmoothAnchors();

import { applyModal } from "./components/applyModal.js";
import { footer, header } from "./components/shared.js";
import { getPageMeta, renderRoutePage } from "./components/sections.js";
import { initAnalytics, initAnalyticsEvents } from "./lib/analytics.js";
import {
  DEFAULT_APPLY_CONTEXT,
  createApplyFormState,
  mergeApplyContext,
  submitApplyForm,
  validateApplyForm,
} from "./lib/applyForm.js";
import { getCurrentRoute, navigateTo } from "./lib/router.js";

const EMAIL_WARNING_FRAGMENT = "안내 메일 발송에 문제가 있을 수 있습니다";

const createCompletionState = () => ({
  isVisible: false,
  isEmailDeliveryConfirmed: true,
  serverMessage: "",
});

const mount = document.querySelector("[data-app]");

const syncDocumentMeta = (path) => {
  const meta = getPageMeta(path);
  document.title = meta.title;

  const descriptionTag = document.querySelector('meta[name="description"]');
  if (descriptionTag) {
    descriptionTag.setAttribute("content", meta.description);
  }
};

const getApplyContextFromElement = (element, fallbackSourcePage) =>
  mergeApplyContext({
    programId: element?.dataset.programId,
    programTitle: element?.dataset.programTitle,
    programType: element?.dataset.programType,
    sourcePage: element?.dataset.sourcePage || fallbackSourcePage || DEFAULT_APPLY_CONTEXT.sourcePage,
    eyebrow: element?.dataset.eyebrow,
    description: element?.dataset.description,
    meta: element?.dataset.meta ? element.dataset.meta.split("|").filter(Boolean) : undefined,
    submitLabel: element?.dataset.submitLabel,
    requiresInvestmentLevel: element?.dataset.requiresInvestmentLevel === "true",
    cohort: element?.dataset.cohort,
  });

const renderPage = () => {
  if (!mount) {
    return;
  }

  const route = getCurrentRoute();
  syncDocumentMeta(route.path);

  mount.innerHTML = `
    ${header({ currentPath: route.path, primaryApplyContext: DEFAULT_APPLY_CONTEXT })}
    <main id="top" class="page-shell">
      ${renderRoutePage(route)}
    </main>
    ${footer()}
    ${applyModal()}
  `;

  document.body.dataset.route = route.path;
};

const initMobileMenu = () => {
  const menuButton = document.querySelector("[data-menu-button]");
  const mobileNav = document.querySelector("[data-mobile-nav]");

  if (!menuButton || !mobileNav) {
    return;
  }

  menuButton.addEventListener("click", () => {
    const expanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!expanded));
    mobileNav.hidden = expanded;
  });
};

const closeMobileMenu = () => {
  const menuButton = document.querySelector("[data-menu-button]");
  const mobileNav = document.querySelector("[data-mobile-nav]");

  if (!menuButton || !mobileNav) {
    return;
  }

  mobileNav.hidden = true;
  menuButton.setAttribute("aria-expanded", "false");
};

const initRouteLinks = () => {
  document.querySelectorAll("[data-route-link]").forEach((link) => {
    link.addEventListener("click", (event) => {
      if (!(link instanceof HTMLAnchorElement)) {
        return;
      }

      event.preventDefault();

      const routePath = link.dataset.routePath || "/";
      let query = {};

      if (link.dataset.routeQuery) {
        try {
          query = JSON.parse(link.dataset.routeQuery);
        } catch (error) {
          query = {};
        }
      }

      closeMobileMenu();
      navigateTo(routePath, query);
    });
  });
};

const initProgramFilters = () => {
  const filterButtons = Array.from(document.querySelectorAll("[data-program-filter]"));
  const cards = Array.from(document.querySelectorAll("[data-program-card]"));

  if (!filterButtons.length || !cards.length) {
    return;
  }

  const applyFilter = (nextFilter) => {
    filterButtons.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.programFilter === nextFilter);
    });

    cards.forEach((card) => {
      const group = card.getAttribute("data-filter-group");
      card.hidden = nextFilter !== "all" && group !== nextFilter;
    });
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const nextFilter = button.dataset.programFilter || "all";
      applyFilter(nextFilter);
    });
  });

  applyFilter("all");
};

const scrollToRequestedSection = () => {
  const route = getCurrentRoute();
  const targetSection = route.query.section;

  if (route.path === "/" && targetSection) {
    const target = document.querySelector(`[data-scroll-section="${targetSection}"]`);

    if (target instanceof HTMLElement) {
      window.requestAnimationFrame(() => {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      return;
    }
  }

  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
};

const initApplyModal = () => {
  const modal = document.querySelector("[data-apply-modal]");
  const formView = document.querySelector("[data-apply-form-view]");
  const successView = document.querySelector("[data-apply-success-view]");
  const form = document.querySelector("[data-apply-form]");
  const feedback = document.querySelector("[data-apply-form-feedback]");
  const submitButton = document.querySelector("[data-apply-submit-button]");
  const successTitle = document.querySelector("[data-apply-success-title]");
  const successPrimary = document.querySelector("[data-apply-success-primary]");
  const successSecondary = document.querySelector("[data-apply-success-secondary]");
  const successStatus = document.querySelector("[data-apply-success-status]");
  const successButtons = document.querySelectorAll("[data-apply-success-action]");
  const contextEyebrow = document.querySelector("[data-apply-context-eyebrow]");
  const contextTitle = document.querySelector("[data-apply-context-title]");
  const contextDescription = document.querySelector("[data-apply-context-description]");
  const contextMeta = document.querySelector("[data-apply-context-meta]");
  const investmentExperienceField = document.querySelector("[data-investment-experience-field]");
  const formCaption = document.querySelector("[data-apply-form-caption]");

  if (
    !modal ||
    !formView ||
    !successView ||
    !form ||
    !feedback ||
    !submitButton ||
    !successTitle ||
    !successPrimary ||
    !successSecondary ||
    !successStatus ||
    !successButtons.length ||
    !contextEyebrow ||
    !contextTitle ||
    !contextDescription ||
    !contextMeta ||
    !investmentExperienceField ||
    !formCaption
  ) {
    return;
  }

  const openButtons = document.querySelectorAll("[data-open-apply-modal]");
  const focusableSelector = 'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href]';
  const closeAnimationMs = 180;
  let closeTimer = null;
  let activeTrigger = null;
  let activeContext = DEFAULT_APPLY_CONTEXT;
  let formState = createApplyFormState(activeContext);
  let completionState = createCompletionState();
  let formErrors = {};
  let hasSubmitted = false;

  const isSubmitting = () => formState.submissionState === "submitting";
  const isInquiryContext = () => ["business", "contact"].includes(activeContext.programType);

  const getDefaultFormCaption = () =>
    isInquiryContext()
      ? "문의 내용을 남겨주시면 운영팀이 확인 후 이메일 또는 전화로 순차 회신드립니다."
      : "신청 정보를 남겨주시면 접수 확인 후 입력하신 이메일로 안내를 순차적으로 전달드립니다.";

  const syncFieldsFromState = () => {
    form.querySelectorAll("[name]").forEach((field) => {
      if (!(field instanceof HTMLInputElement || field instanceof HTMLSelectElement || field instanceof HTMLTextAreaElement)) {
        return;
      }

      if (field.name === "interests" && field instanceof HTMLInputElement && field.type === "checkbox") {
        field.checked = formState.interests.includes(field.value);
        return;
      }

      if (field.type === "checkbox") {
        field.checked = Boolean(formState[field.name]);
        return;
      }

      field.value = formState[field.name] ?? "";
    });
  };

  const syncValidationState = () => {
    form.querySelectorAll("[data-field]").forEach((field) => {
      const fieldName = field.getAttribute("data-field");
      field.classList.toggle("has-error", Boolean(hasSubmitted && fieldName && formErrors[fieldName]));
    });

    form.querySelectorAll("[data-error-for]").forEach((node) => {
      const fieldName = node.getAttribute("data-error-for");
      node.textContent = hasSubmitted && fieldName ? formErrors[fieldName] || "" : "";
    });

    form.querySelectorAll("[name]").forEach((field) => {
      if (!(field instanceof HTMLInputElement || field instanceof HTMLSelectElement || field instanceof HTMLTextAreaElement)) {
        return;
      }

      const hasError = hasSubmitted && Boolean(formErrors[field.name]);
      field.setAttribute("aria-invalid", hasError ? "true" : "false");
    });
  };

  const syncFeedback = () => {
    feedback.textContent = formState.submitMessage;
    feedback.dataset.state = formState.submissionState;
    feedback.classList.toggle("is-visible", Boolean(formState.submitMessage));
  };

  const syncContextUi = () => {
    contextEyebrow.textContent = activeContext.eyebrow;
    contextTitle.textContent = activeContext.programTitle;
    contextDescription.textContent = activeContext.description;
    contextMeta.innerHTML = activeContext.meta.map((item) => `<span class="apply-context-pill">${item}</span>`).join("");
    formCaption.textContent = getDefaultFormCaption();
    investmentExperienceField.hidden = !activeContext.requiresInvestmentLevel;
    submitButton.textContent = isSubmitting() ? "처리 중..." : activeContext.submitLabel;
  };

  const syncSuccessView = () => {
    const isVisible = completionState.isVisible;
    formView.hidden = isVisible;
    successView.hidden = !isVisible;
    modal.classList.toggle("is-complete", isVisible);

    if (!isVisible) {
      successStatus.hidden = true;
      successStatus.textContent = "";
      return;
    }

    successTitle.textContent = completionState.isEmailDeliveryConfirmed
      ? isInquiryContext()
        ? "문의가 접수되었습니다."
        : "신청이 완료되었습니다."
      : isInquiryContext()
        ? "문의가 정상 접수되었습니다."
        : "신청이 정상 접수되었습니다.";

    successPrimary.textContent = completionState.isEmailDeliveryConfirmed
      ? `${activeContext.programTitle} 관련 접수 확인 메일을 발송했습니다.`
      : `${activeContext.programTitle} 관련 내용은 정상 접수되었습니다.`;

    successSecondary.textContent = completionState.isEmailDeliveryConfirmed
      ? isInquiryContext()
        ? "운영팀이 확인 후 적합한 안내 방향을 검토해 순차적으로 회신드릴 예정입니다."
        : "운영팀이 확인 후 일정, 장소, 후속 안내를 순차적으로 전달드릴 예정입니다."
      : completionState.serverMessage;

    successStatus.hidden = completionState.isEmailDeliveryConfirmed;
    successStatus.textContent = completionState.isEmailDeliveryConfirmed ? "" : completionState.serverMessage;
  };

  const syncSubmitButton = () => {
    const submitting = isSubmitting();
    submitButton.disabled = submitting || completionState.isVisible;
    submitButton.setAttribute("aria-busy", submitting ? "true" : "false");
  };

  const syncFormUi = () => {
    syncContextUi();
    syncSuccessView();
    syncFieldsFromState();
    syncValidationState();
    syncFeedback();
    syncSubmitButton();
  };

  const setSubmissionFeedback = (submissionState, submitMessage) => {
    formState = {
      ...formState,
      submissionState,
      submitMessage,
    };
  };

  const setCompletionStateFromMessage = (message) => {
    const normalizedMessage = typeof message === "string" && message ? message : "";

    completionState = {
      isVisible: true,
      isEmailDeliveryConfirmed: !normalizedMessage.includes(EMAIL_WARNING_FRAGMENT),
      serverMessage: normalizedMessage,
    };
  };

  const resetApplyFlow = () => {
    formState = createApplyFormState(activeContext);
    completionState = createCompletionState();
    formErrors = {};
    hasSubmitted = false;
    syncFormUi();
  };

  const setActiveContext = (nextContext) => {
    activeContext = mergeApplyContext(nextContext);
    resetApplyFlow();
  };

  const updateStateFromField = (field) => {
    if (!(field instanceof HTMLInputElement || field instanceof HTMLSelectElement || field instanceof HTMLTextAreaElement)) {
      return;
    }

    if (field.name === "interests" && field instanceof HTMLInputElement && field.type === "checkbox") {
      const nextInterests = field.checked
        ? [...new Set([...formState.interests, field.value])]
        : formState.interests.filter((value) => value !== field.value);

      formState = {
        ...formState,
        interests: nextInterests,
      };
    } else if (field.type === "checkbox") {
      formState = {
        ...formState,
        [field.name]: field.checked,
      };
    } else {
      formState = {
        ...formState,
        [field.name]: field.value,
      };
    }

    if (!isSubmitting() && (formState.submissionState !== "idle" || formState.submitMessage)) {
      setSubmissionFeedback("idle", "");
    }

    if (hasSubmitted && !isSubmitting()) {
      formErrors = validateApplyForm(formState);
    }

    syncFormUi();
  };

  const findFocusableElements = () =>
    Array.from(modal.querySelectorAll(focusableSelector)).filter(
      (element) => element instanceof HTMLElement && !element.hasAttribute("hidden") && !element.closest("[hidden]")
    );

  const focusFirstSuccessAction = () => {
    const primarySuccessButton = successView.querySelector('[data-apply-success-action="confirm"]');

    if (primarySuccessButton instanceof HTMLElement) {
      window.setTimeout(() => {
        primarySuccessButton.focus({ preventScroll: true });
      }, 40);
    }
  };

  const openModal = (trigger) => {
    activeTrigger = trigger instanceof HTMLElement ? trigger : null;

    if (closeTimer) {
      clearTimeout(closeTimer);
      closeTimer = null;
    }

    modal.hidden = false;
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    window.requestAnimationFrame(() => {
      modal.classList.add("is-open");

      if (completionState.isVisible) {
        focusFirstSuccessAction();
        return;
      }

      form.querySelector('input[name="name"]')?.focus();
    });
  };

  const closeModal = ({ resetAfterClose = completionState.isVisible } = {}) => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    closeTimer = window.setTimeout(() => {
      modal.hidden = true;

      if (resetAfterClose) {
        resetApplyFlow();
      }

      activeTrigger?.focus();
    }, closeAnimationMs);
  };

  const focusFirstInvalidField = () => {
    const [firstInvalidName] = Object.keys(formErrors);
    if (!firstInvalidName) {
      return;
    }

    const invalidFieldContainer = form.querySelector(`[data-field="${firstInvalidName}"]`);
    const invalidField = form.querySelector(`[name="${firstInvalidName}"]`);

    if (invalidFieldContainer instanceof HTMLElement) {
      invalidFieldContainer.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
    }

    if (invalidField instanceof HTMLElement) {
      window.setTimeout(() => {
        invalidField.focus({ preventScroll: true });
      }, 120);
    }
  };

  const showCompletionScreen = (message) => {
    hasSubmitted = false;
    formErrors = {};
    setSubmissionFeedback("success", "");
    setCompletionStateFromMessage(message);
    syncFormUi();
    focusFirstSuccessAction();
  };

  openButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const route = getCurrentRoute();
      const nextContext = getApplyContextFromElement(button, route.path);
      setActiveContext(nextContext);
      openModal(button);
    });
  });

  successButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (isSubmitting()) {
        return;
      }

      closeModal({ resetAfterClose: true });
    });
  });

  modal.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    if (target.hasAttribute("data-close-apply-modal")) {
      if (isSubmitting()) {
        return;
      }

      closeModal();
    }
  });

  form.addEventListener("input", (event) => {
    updateStateFromField(event.target);
  });

  form.addEventListener("change", (event) => {
    updateStateFromField(event.target);
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (isSubmitting() || completionState.isVisible) {
      return;
    }

    hasSubmitted = true;
    formErrors = validateApplyForm(formState);

    if (Object.keys(formErrors).length) {
      setSubmissionFeedback("error", "필수 입력 항목을 확인해 주세요.");
      syncFormUi();
      focusFirstInvalidField();
      return;
    }

    setSubmissionFeedback("submitting", "");
    syncFormUi();

    try {
      const result = await submitApplyForm(formState);
      showCompletionScreen(result?.message);
    } catch (error) {
      setSubmissionFeedback("error", error instanceof Error ? error.message : "신청 처리 중 오류가 발생했습니다.");
      syncFormUi();
    }
  });

  modal.addEventListener("keydown", (event) => {
    if (modal.hidden) {
      return;
    }

    if (event.key === "Escape") {
      if (isSubmitting()) {
        return;
      }

      closeModal();
      return;
    }

    if (event.key !== "Tab") {
      return;
    }

    const focusableElements = findFocusableElements();
    if (!focusableElements.length) {
      return;
    }

    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstFocusable) {
      event.preventDefault();
      lastFocusable.focus();
    } else if (!event.shiftKey && document.activeElement === lastFocusable) {
      event.preventDefault();
      firstFocusable.focus();
    }
  });

  syncFormUi();
};

const mountPage = () => {
  renderPage();
  initMobileMenu();
  initRouteLinks();
  initProgramFilters();
  initApplyModal();
  scrollToRequestedSection();
};

mountPage();
initAnalytics();
initAnalyticsEvents();

window.addEventListener("popstate", mountPage);
window.addEventListener("hashchange", mountPage);

import { applyModal } from "./components/applyModal.js?v=20260618d";
import { footer, header } from "./components/shared.js?v=20260617a";
import { pageSections } from "./components/sections.js?v=20260617a";
import { initAnalytics, initAnalyticsEvents } from "./lib/analytics.js?v=20260617a";
import { createApplyFormState, submitApplyForm, validateApplyForm } from "./lib/applyForm.js?v=20260618a";

const DEFAULT_SUCCESS_MESSAGE =
  "신청이 완료되었습니다. 입력하신 이메일로 접수 확인 메일을 발송할 예정입니다. 담당자가 확인 후 교육 일정 및 결제 안내를 순차적으로 전달드리겠습니다.";
const EMAIL_WARNING_FRAGMENT = "안내 메일 발송에 문제가 있을 수 있습니다";

const createCompletionState = () => ({
  isVisible: false,
  isEmailDeliveryConfirmed: true,
  serverMessage: "",
});

const mount = document.querySelector("[data-app]");

const renderPage = () => {
  if (!mount) return;

  mount.innerHTML = `
    ${header()}
    <main id="top">
      ${pageSections()}
    </main>
    ${footer()}
    ${applyModal()}
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

const initApplyModal = () => {
  const modal = document.querySelector("[data-apply-modal]");
  const formView = document.querySelector("[data-apply-form-view]");
  const successView = document.querySelector("[data-apply-success-view]");
  const form = document.querySelector("[data-apply-form]");
  const feedback = document.querySelector("[data-apply-form-feedback]");
  const submitButton = form?.querySelector('button[type="submit"]');
  const successTitle = document.querySelector("[data-apply-success-title]");
  const successPrimary = document.querySelector("[data-apply-success-primary]");
  const successSecondary = document.querySelector("[data-apply-success-secondary]");
  const successStatus = document.querySelector("[data-apply-success-status]");
  const successButtons = document.querySelectorAll("[data-apply-success-action]");

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
    !successButtons.length
  ) {
    return;
  }

  const openButtons = document.querySelectorAll("[data-open-apply-modal]");
  const focusableSelector = 'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href]';
  const closeAnimationMs = 180;
  let closeTimer = null;
  let activeTrigger = null;
  let formState = createApplyFormState();
  let completionState = createCompletionState();
  let formErrors = {};
  let hasSubmitted = false;

  const isSubmitting = () => formState.submissionState === "submitting";

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

  const syncSubmitButton = () => {
    const submitting = isSubmitting();
    submitButton.disabled = submitting || completionState.isVisible;
    submitButton.textContent = submitting ? "신청 처리 중..." : "신청 완료하기";
    submitButton.setAttribute("aria-busy", submitting ? "true" : "false");
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

    successTitle.textContent = completionState.isEmailDeliveryConfirmed ? "신청이 완료되었습니다." : "신청이 접수되었습니다.";
    successPrimary.textContent = completionState.isEmailDeliveryConfirmed
      ? "입력하신 이메일로 접수 확인 메일을 발송했습니다."
      : "신청은 정상적으로 접수되었습니다.";
    successSecondary.textContent = completionState.isEmailDeliveryConfirmed
      ? "담당자가 확인 후 교육 일정, 장소, 결제 안내를 순차적으로 전달드릴 예정입니다."
      : "다만 안내 메일 발송에 문제가 있을 수 있습니다. 잠시 후에도 메일을 받지 못하시면 아래 연락처로 문의해 주세요.";

    successStatus.hidden = completionState.isEmailDeliveryConfirmed;
    successStatus.textContent = completionState.isEmailDeliveryConfirmed ? "" : completionState.serverMessage;
  };

  const syncFormUi = () => {
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
    const normalizedMessage = typeof message === "string" && message ? message : DEFAULT_SUCCESS_MESSAGE;

    completionState = {
      isVisible: true,
      isEmailDeliveryConfirmed: !normalizedMessage.includes(EMAIL_WARNING_FRAGMENT),
      serverMessage: normalizedMessage,
    };
  };

  const resetApplyFlow = () => {
    formState = createApplyFormState();
    completionState = createCompletionState();
    formErrors = {};
    hasSubmitted = false;
    syncFormUi();
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
    if (!firstInvalidName) return;

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
    button.addEventListener("click", () => openModal(button));
  });

  successButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (isSubmitting()) return;
      closeModal({ resetAfterClose: true });
    });
  });

  modal.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;

    if (target.hasAttribute("data-close-apply-modal")) {
      if (isSubmitting()) return;
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
      setSubmissionFeedback(
        "error",
        error instanceof Error ? error.message : "신청 처리 중 오류가 발생했습니다."
      );
      syncFormUi();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (modal.hidden) return;

    if (event.key === "Escape") {
      if (isSubmitting()) return;
      closeModal();
      return;
    }

    if (event.key !== "Tab") {
      return;
    }

    const focusableElements = findFocusableElements();
    if (!focusableElements.length) return;

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

renderPage();
initApplyModal();
initAnalytics();
initAnalyticsEvents();
initMobileMenu();
initSmoothAnchors();

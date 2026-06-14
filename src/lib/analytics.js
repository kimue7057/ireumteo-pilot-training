const getGtag = () => {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return null;
  }

  return window.gtag;
};

const getEventParams = (element) => {
  const params = {};

  if (element.dataset.analyticsLabel) {
    params.cta_label = element.dataset.analyticsLabel;
  }

  if (element.dataset.analyticsMethod) {
    params.method = element.dataset.analyticsMethod;
  }

  if (element instanceof HTMLAnchorElement && element.href) {
    params.destination = element.href;
  }

  return params;
};

export const initAnalytics = () => {
  return getGtag();
};

export const initAnalyticsEvents = (root = document) => {
  const gtag = getGtag();

  if (!gtag) {
    return;
  }

  root.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) {
      return;
    }

    const target = event.target.closest("[data-analytics-event]");

    if (!target) {
      return;
    }

    gtag("event", target.dataset.analyticsEvent, getEventParams(target));
  });
};

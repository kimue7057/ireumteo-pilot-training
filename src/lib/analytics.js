const getDataLayer = () => {
  if (typeof window === "undefined") {
    return null;
  }

  window.dataLayer = window.dataLayer || [];

  return window.dataLayer;
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
  getDataLayer();
};

export const initAnalyticsEvents = (root = document) => {
  const dataLayer = getDataLayer();

  if (!dataLayer) {
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

    dataLayer.push({
      event: target.dataset.analyticsEvent,
      ...getEventParams(target),
    });
  });
};

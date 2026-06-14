const PLACEHOLDER_MEASUREMENT_ID = "G-XXXXXXXXXX";

const getMeasurementId = () => {
  if (typeof window.GA_MEASUREMENT_ID !== "string") {
    return null;
  }

  const measurementId = window.GA_MEASUREMENT_ID.trim().toUpperCase();

  if (!/^G-[A-Z0-9]+$/.test(measurementId)) {
    return null;
  }

  if (measurementId === PLACEHOLDER_MEASUREMENT_ID) {
    return null;
  }

  return measurementId;
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
  const measurementId = getMeasurementId();

  if (!measurementId || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("js", new Date());
  window.gtag("config", measurementId);
};

export const initAnalyticsEvents = (root = document) => {
  if (!getMeasurementId() || typeof window.gtag !== "function") {
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

    window.gtag("event", target.dataset.analyticsEvent, getEventParams(target));
  });
};

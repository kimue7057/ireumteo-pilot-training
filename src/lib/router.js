const normalizePathValue = (value = "/") => {
  if (!value) {
    return "/";
  }

  const [pathOnly] = String(value).split("?");
  let normalized = pathOnly.startsWith("/") ? pathOnly : `/${pathOnly}`;

  if (normalized.length > 1 && normalized.endsWith("/")) {
    normalized = normalized.slice(0, -1);
  }

  return normalized || "/";
};

const toQueryObject = (search = "") =>
  Object.fromEntries(new URLSearchParams(search.startsWith("?") ? search.slice(1) : search));

const toQueryString = (query = {}) => {
  const params = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") {
      return;
    }

    params.set(key, String(value));
  });

  const serialized = params.toString();
  return serialized ? `?${serialized}` : "";
};

const parseHashRoute = (hash = "") => {
  const normalizedHash = hash.startsWith("#") ? hash.slice(1) : hash;

  if (!normalizedHash) {
    return { path: "/", query: {} };
  }

  const [pathPart = "/", queryPart = ""] = normalizedHash.split("?");

  return {
    path: normalizePathValue(pathPart),
    query: toQueryObject(queryPart),
  };
};

export const isHashRoutingEnabled = () =>
  typeof window !== "undefined" && window.location.protocol === "file:";

export const normalizeRoutePath = (value) => normalizePathValue(value);

export const getCurrentRoute = () => {
  if (typeof window === "undefined") {
    return { path: "/", query: {} };
  }

  if (isHashRoutingEnabled()) {
    return parseHashRoute(window.location.hash);
  }

  if (window.location.hash.startsWith("#/")) {
    return parseHashRoute(window.location.hash);
  }

  return {
    path: normalizePathValue(window.location.pathname),
    query: toQueryObject(window.location.search),
  };
};

export const buildRouteHref = (path = "/", query = {}) => {
  const normalizedPath = normalizePathValue(path);
  const search = toQueryString(query);

  if (isHashRoutingEnabled()) {
    return `#${normalizedPath}${search}`;
  }

  return `${normalizedPath}${search}`;
};

export const navigateTo = (path, query = {}, { replace = false } = {}) => {
  if (typeof window === "undefined") {
    return;
  }

  const href = buildRouteHref(path, query);

  if (isHashRoutingEnabled()) {
    const nextHash = href.startsWith("#") ? href : `#${href}`;

    if (window.location.hash === nextHash) {
      window.dispatchEvent(new Event("hashchange"));
      return;
    }

    if (replace) {
      const url = `${window.location.href.split("#")[0]}${nextHash}`;
      window.location.replace(url);
      return;
    }

    window.location.hash = nextHash.slice(1);
    return;
  }

  const nextUrl = href;
  const currentUrl = `${window.location.pathname}${window.location.search}`;

  if (currentUrl === nextUrl) {
    window.dispatchEvent(new Event("popstate"));
    return;
  }

  const historyMethod = replace ? "replaceState" : "pushState";
  window.history[historyMethod](null, "", nextUrl);
  window.dispatchEvent(new Event("popstate"));
};

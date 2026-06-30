import { urlConverter } from "../Functions/functions";

export const MAIN_NAV_ITEMS = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Catalogue", path: "/catalogue" },
  { label: "Contact", path: "/contact" },
];

export const COMPANY_NAV_ITEMS = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "All Products", path: "/all-products" },
  { label: "Catalogue", path: "/catalogue" },
  { label: "Contact", path: "/contact" },
];

export const EXTERNAL_CATEGORY_LINKS = [];

export const getCategoryPath = (name) => `/category/${urlConverter(name)}`;

export const getCategoryHref = (item) =>
  item?.href || getCategoryPath(item?.name);

export const isExternalCategory = (item) => Boolean(item?.isExternal || item?.href);

export const getCategoryList = (categories = [], options = {}) => {
  const { includeExternal = true, limit } = options;
  const source = Array.isArray(categories) ? categories.filter((c) => c?.name) : [];
  const base =
    typeof limit === "number" && includeExternal
      ? source.slice(0, Math.max(limit - EXTERNAL_CATEGORY_LINKS.length, 0))
      : source;
  const merged = includeExternal ? [...base, ...EXTERNAL_CATEGORY_LINKS] : base;
  const seen = new Set();
  const unique = merged.filter((item) => {
    const key = (item?.name || item?.label || item?.href || "").toLowerCase();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  return typeof limit === "number" ? unique.slice(0, limit) : unique;
};

export const openCategoryDestination = (item, navigate) => {
  const href = getCategoryHref(item);
  if (isExternalCategory(item)) {
    window.location.href = href;
    return;
  }
  navigate(href);
};

import { COMPANY, postalAddressSchema } from "./companyInfo";

export const SEO_CONFIG = {
  siteName: "SafetyPlus",
  siteUrl: (
    import.meta.env.VITE_SITE_URL || "https://safetyplusbd.com"
  ).replace(/\/+$/, ""),
  defaultTitle: "SafetyPlus | Fire Safety Equipment & Solutions in Bangladesh",
  titleSuffix: "SafetyPlus",
  defaultDescription:
    "SafetyPlus manufactures and supplies fire safety equipment for the Bangladesh market, including DB boxes, hose cabinets, fire doors, industrial racks, lockers, cabinets, custom tables, and safety garments.",
  defaultKeywords:
    "SafetyPlus, Safety Plus Bangladesh, fire safety Bangladesh, fire safety equipment, fire door Bangladesh, hose cabinet, electric DB box, industrial racks, industrial furniture, personnel locker, safety garments, safetyplusbd.com",
  defaultImage: "/Icon.png",
  themeColor: "#B91C1C",
  locale: "en_BD",
  // Pulled from the single source of truth (companyInfo.js).
  contact: {
    phone: COMPANY.phone,
    phoneTel: COMPANY.phoneTel,
    email: COMPANY.email,
    emails: COMPANY.emails,
    address: COMPANY.addressFull,
  },
};

export const getAbsoluteUrl = (value = "/") => {
  if (!value) {
    return SEO_CONFIG.siteUrl;
  }

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  const normalizedPath = value.startsWith("/") ? value : `/${value}`;
  return `${SEO_CONFIG.siteUrl}${normalizedPath}`;
};

export const createTitle = (title) => {
  if (!title) {
    return SEO_CONFIG.defaultTitle;
  }

  if (title.includes(SEO_CONFIG.titleSuffix)) {
    return title;
  }

  return `${title} | ${SEO_CONFIG.titleSuffix}`;
};

export const stripHtml = (value = "") =>
  value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

export const truncate = (value = "", limit = 160) => {
  if (value.length <= limit) {
    return value;
  }

  return `${value.slice(0, limit - 1).trim()}…`;
};

export const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SEO_CONFIG.siteName,
  legalName: COMPANY.legalName,
  alternateName: ["Safety Plus", "Safety Plus Industry"],
  url: SEO_CONFIG.siteUrl,
  email: COMPANY.email,
  telephone: COMPANY.phoneTel,
  address: postalAddressSchema,
  areaServed: "Bangladesh",
  image: getAbsoluteUrl(SEO_CONFIG.defaultImage),
};

// Rich LocalBusiness payload — helps Google show address, phone, map pin,
// and a knowledge panel when users search "SafetyPlus".
export const localBusinessStructuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SEO_CONFIG.siteUrl}/#localbusiness`,
  name: SEO_CONFIG.siteName,
  legalName: COMPANY.legalName,
  alternateName: ["Safety Plus", "Safety Plus Industry"],
  description: SEO_CONFIG.defaultDescription,
  url: SEO_CONFIG.siteUrl,
  email: COMPANY.email,
  telephone: COMPANY.phoneTel,
  image: getAbsoluteUrl(SEO_CONFIG.defaultImage),
  logo: getAbsoluteUrl(SEO_CONFIG.defaultImage),
  priceRange: "$$",
  address: postalAddressSchema,
  geo: {
    "@type": "GeoCoordinates",
    latitude: COMPANY.geo.latitude,
    longitude: COMPANY.geo.longitude,
  },
  hasMap: COMPANY.mapDirectionsUrl,
  areaServed: "Bangladesh",
};

export const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SEO_CONFIG.siteName,
  url: SEO_CONFIG.siteUrl,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SEO_CONFIG.siteUrl}/all-products?search={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

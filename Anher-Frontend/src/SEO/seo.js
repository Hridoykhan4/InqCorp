import { COMPANY, postalAddressSchema } from "./companyInfo";

export const SEO_CONFIG = {
  siteName: "Kawsar Anher",
  siteUrl: (
    import.meta.env.VITE_SITE_URL || "https://kawsaranher.com"
  ).replace(/\/+$/, ""),
  defaultTitle:
    "Kawsar Anher | Premium Sand & Stone Supplier in Bangladesh",
  titleSuffix: "Kawsar Anher",
  defaultDescription:
    "Kawsar Anher (Inqilab Trading Corporation) is Bangladesh's trusted supplier of premium construction aggregates — Fine Sand, Medium Sand, Coarse Sand, Stone Chips, and Boulder from Chattogram.",
  defaultKeywords:
    "Kawsar Anher, Inqilab Trading Corporation, sand supplier Bangladesh, stone chips Bangladesh, construction aggregate Chattogram, fine sand Bangladesh, coarse sand, boulder supplier, building materials Bangladesh, kawsaranher.com",
  defaultImage: "/inqcorpLogo.jpeg",
  themeColor: "#1B3A8A",
  locale: "en_BD",
  contact: {
    phone: COMPANY.phone,
    phoneTel: COMPANY.phoneTel,
    email: COMPANY.email,
    emails: COMPANY.emails,
    address: COMPANY.addressFull,
  },
};

export const getAbsoluteUrl = (value = "/") => {
  if (!value) return SEO_CONFIG.siteUrl;
  if (/^https?:\/\//i.test(value)) return value;
  const normalizedPath = value.startsWith("/") ? value : `/${value}`;
  return `${SEO_CONFIG.siteUrl}${normalizedPath}`;
};

export const createTitle = (title) => {
  if (!title) return SEO_CONFIG.defaultTitle;
  if (title.includes(SEO_CONFIG.titleSuffix)) return title;
  return `${title} | ${SEO_CONFIG.titleSuffix}`;
};

export const stripHtml = (value = "") =>
  value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

export const truncate = (value = "", limit = 160) =>
  value.length <= limit ? value : `${value.slice(0, limit - 1).trim()}…`;

export const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SEO_CONFIG.siteName,
  legalName: COMPANY.legalName,
  alternateName: ["Inqilab Trading", "ITC Bangladesh", "Kawsar Anher Sand Stone"],
  url: SEO_CONFIG.siteUrl,
  email: COMPANY.email,
  telephone: COMPANY.phoneTel,
  address: postalAddressSchema,
  areaServed: "Bangladesh",
  image: getAbsoluteUrl(SEO_CONFIG.defaultImage),
  foundingDate: "2020",
  founder: {
    "@type": "Person",
    name: COMPANY.ceo.name,
    jobTitle: COMPANY.ceo.title,
  },
};

export const localBusinessStructuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SEO_CONFIG.siteUrl}/#localbusiness`,
  name: SEO_CONFIG.siteName,
  legalName: COMPANY.legalName,
  alternateName: ["Inqilab Trading Corporation", "ITC"],
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
  knowsAbout: [
    "Fine Sand",
    "Medium Sand",
    "Coarse Sand",
    "Stone Chips",
    "Boulder",
    "Construction Aggregates",
    "Building Materials",
  ],
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

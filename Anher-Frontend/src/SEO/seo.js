import { COMPANY, postalAddressSchema } from "./companyInfo";

export const SEO_CONFIG = {
  siteName: "Inqilab Trading Corporation",
  siteUrl: (import.meta.env.VITE_SITE_URL || "https://kawsaranher.com").replace(
    /\/+$/,
    "",
  ),
  defaultTitle: "Inqilab Trading Corporation (ITC) | Sand & Stone Supplier Chattogram Bangladesh",
  titleSuffix: "Inqilab Trading Corporation",
  defaultDescription:
    "Inqilab Trading Corporation (ITC) — Bangladesh's trusted supplier of premium construction aggregates from Chattogram. Fine Sand, Medium Sand, Coarse Sand, Stone Chips (5–20mm) & Boulder. Call +880 1718 427 703.",
  defaultKeywords:
    "inqilab, inqilab trading, inqilab trading corporation, inqilab bangladesh, ইনকিলাব ট্রেডিং, ITC, ITC bangladesh, kawsar anher, Kawsar Alam, sand supplier bangladesh, stone chips bangladesh, construction aggregate chattogram, fine sand chattogram, coarse sand bangladesh, boulder supplier, building materials chittagong, বালি সরবরাহকারী চট্টগ্রাম",
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
  value
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

export const truncate = (value = "", limit = 160) =>
  value.length <= limit ? value : `${value.slice(0, limit - 1).trim()}…`;

export const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Inqilab Trading Corporation",
  legalName: COMPANY.legalName,
  alternateName: ["Inqilab Trading", "ITC", "ITC Bangladesh", "Kawsar Anher", "ইনকিলাব ট্রেডিং কর্পোরেশন"],
  url: SEO_CONFIG.siteUrl,
  email: COMPANY.email,
  telephone: COMPANY.phoneTel,
  address: postalAddressSchema,
  areaServed: ["Bangladesh", "Chattogram", "Chittagong"],
  image: getAbsoluteUrl(SEO_CONFIG.defaultImage),
  logo: getAbsoluteUrl(SEO_CONFIG.defaultImage),
  foundingDate: "2020",
  founder: {
    "@type": "Person",
    name: COMPANY.ceo.name,
    jobTitle: COMPANY.ceo.title,
  },
  sameAs: [
    COMPANY.social.facebook,
    SEO_CONFIG.siteUrl,
  ],
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

import { COMPANY, postalAddressSchema } from "./companyInfo";

export const SEO_CONFIG = {
  siteName: "Inqilab Trading Corporation",
  siteUrl: (import.meta.env.VITE_SITE_URL || "https://inqilabtradingcorporation.com.bd").replace(
    /\/+$/,
    "",
  ),
  defaultTitle: "Inqilab Trading Corporation (ITC) | Sand & Stone Supplier All Over Bangladesh",
  titleSuffix: "Inqilab Trading Corporation",
  defaultDescription:
    "Inqilab Trading Corporation (ITC) — Bangladesh's trusted supplier of premium construction aggregates nationwide. Fine Sand, Medium Sand, Coarse Sand, Stone Chips (5–20mm) & Boulder. Call +880 1718 427 703.",
  defaultKeywords:
    "inqilab, inqilab corporation, inqilab trading, inqilab trading corporation, iniqilab corporation, inquilab corporation, inquilab trading corporation, inqilab group, inqilab bd, inqilab bangladesh, ইনকিলাব, ইনকিলাব ট্রেডিং, ইনকিলাব ট্রেডিং কর্পোরেশন, ITC, ITC bangladesh, itc trading, kawsar anher, Kawsar Alam, sand supplier bangladesh, sand supplier dhaka, stone chips supplier bangladesh, stone chips price bangladesh, construction aggregate bangladesh, construction materials supplier bangladesh, fine sand bangladesh, coarse sand bangladesh, plaster sand, river sand supplier, boulder supplier bangladesh, filling sand, crushed stone dust, building materials bangladesh, বালি সরবরাহকারী বাংলাদেশ, পাথর সরবরাহকারী, নির্মাণ সামগ্রী",
  defaultImage: "/inqcorpLogo.jpeg",
  themeColor: "#fbfaf7",
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
  alternateName: ["Inqilab", "Inqilab Corporation", "Inqilab Trading", "Iniqilab Corporation", "Inquilab Corporation", "Inquilab Trading Corporation", "Inqilab Group", "ITC", "ITC Bangladesh", "Kawsar Anher", "ইনকিলাব", "ইনকিলাব ট্রেডিং কর্পোরেশন"],
  url: SEO_CONFIG.siteUrl,
  email: COMPANY.email,
  telephone: COMPANY.phoneTel,
  address: postalAddressSchema,
  areaServed: ["Bangladesh"],
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
  alternateName: ["Inqilab", "Inqilab Corporation", "Inqilab Trading", "Inqilab Trading Corporation", "Inqilab Group", "ITC"],
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

// BreadcrumbList schema for sub-pages — helps Google understand the site
// hierarchy and show sitelinks under brand searches.
export const breadcrumbSchema = (crumbs) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SEO_CONFIG.siteUrl },
    ...crumbs.map(([name, path], index) => ({
      "@type": "ListItem",
      position: index + 2,
      name,
      item: getAbsoluteUrl(path),
    })),
  ],
});

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

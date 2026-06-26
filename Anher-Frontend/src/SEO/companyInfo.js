// =============================================================================
// SINGLE SOURCE OF TRUTH for SafetyPlus company info.
// Change a value here and it updates across the WHOLE website
// (footer, contact page, about page, SEO meta, structured data, sitemap origin).
// Values mirror the official company letterhead.
// =============================================================================

const PHONE_DISPLAY = "+880 1911643816";
const PHONE_TEL = "+8801911643816"; // E.164 form for tel: links

const ADDRESS = {
  line1: "Plot No- 68, Mirpara, Demra",
  city: "Dhaka",
  postalCode: "1360",
  country: "Bangladesh",
  countryCode: "BD",
};

// Full address used wherever a single string is needed.
const ADDRESS_FULL = `${ADDRESS.line1}, ${ADDRESS.city}-${ADDRESS.postalCode}, ${ADDRESS.country}.`;

// Coordinates for Mirpara, Demra, Dhaka. The embed centers on these so the map
// always shows Demra/Mirpara (never the whole world / wrong city).
const GEO = { latitude: 23.7033, longitude: 90.5045 };

// Embed centers on the Demra/Mirpara area; directions/search use full address.
const MAP_EMBED_QUERY = encodeURIComponent("Mirpara, Demra, Dhaka, Bangladesh");
const MAP_QUERY = encodeURIComponent(`Safety Plus Industry, ${ADDRESS_FULL}`);

export const COMPANY = {
  // Branding
  name: "SafetyPlus",
  legalName: "Safety Plus Industry",
  tagline: "Fire Safety Bangladesh",

  // Contact
  phone: PHONE_DISPLAY,
  phoneTel: PHONE_TEL,
  email: "info@safetyplus.com",
  emails: ["info@safetyplus.com", "safetyplusindustry@gmail.com"],

  // Location
  address: ADDRESS,
  addressFull: ADDRESS_FULL,
  geo: GEO,

  // Map links (no API key required). Embed locks zoom 14 on Demra/Mirpara.
  mapEmbedSrc: `https://maps.google.com/maps?q=${MAP_EMBED_QUERY}&t=&z=14&ie=UTF8&iwloc=&output=embed`,
  mapDirectionsUrl: `https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`,
};

// PostalAddress block reused by every schema.org structured-data payload.
export const postalAddressSchema = {
  "@type": "PostalAddress",
  streetAddress: ADDRESS.line1,
  addressLocality: ADDRESS.city,
  postalCode: ADDRESS.postalCode,
  addressCountry: ADDRESS.countryCode,
};

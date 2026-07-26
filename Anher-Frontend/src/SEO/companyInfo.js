// =============================================================================
// SINGLE SOURCE OF TRUTH — ITC / Inqilab Trading Corporation
// Change here → updates entire website (SEO, footer, contact, schema, sitemap).
// =============================================================================

const PHONE_DISPLAY = "+880 1718 427 703";
const PHONE_TEL = "+8801718427703";

const ADDRESS = {
  line1: "All Over Bangladesh",
  city: "Bangladesh",
  postalCode: "",
  country: "Bangladesh",
  countryCode: "BD",
};

const ADDRESS_FULL = "All Over Bangladesh.";

const GEO = { latitude: 23.685, longitude: 90.3563 };

const MAP_EMBED_QUERY = encodeURIComponent("Bangladesh");
const MAP_QUERY = encodeURIComponent(
  `Inqilab Trading Corporation, Bangladesh`,
);

export const COMPANY = {
  // Branding
  name: "ITC",
  legalName: "Inqilab Trading Corporation",
  tagline: "Build with Strength",
  shortTagline: "Bangladesh's Premium Sand & Stone Supplier",

  // Contact
  phone: PHONE_DISPLAY,
  phoneTel: PHONE_TEL,
  email: "kawsar2nt1@gmail.com",
  emails: ["kawsar2nt1@gmail.com", "info@inqilabtrading.com"],

  // CEO
  ceo: {
    name: "Kawsar Alam",
    title: "Founder & CEO",
    education: "MBA in Accounting",
    photo: "/kawsar-alam.jpeg",
    quote:
      "We don't just supply materials — we build the foundations of Bangladesh.",
  },

  // Location
  address: ADDRESS,
  addressFull: ADDRESS_FULL,
  geo: GEO,

  // Social
  social: {
    facebook: "https://www.facebook.com/kawsaranher",
    whatsapp: PHONE_TEL,
    linkedin: "#",
    instagram: "#",
  },

  // Map
  mapEmbedSrc: `https://maps.google.com/maps?q=${MAP_EMBED_QUERY}&t=&z=14&ie=UTF8&iwloc=&output=embed`,
  mapDirectionsUrl: `https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`,
};

export const postalAddressSchema = {
  "@type": "PostalAddress",
  streetAddress: ADDRESS.line1,
  addressLocality: ADDRESS.city,
  postalCode: ADDRESS.postalCode,
  addressCountry: ADDRESS.countryCode,
};

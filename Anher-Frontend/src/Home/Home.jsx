import { HeroSection } from "../Hero/HeroSection";
import WhyChooseUs from "../Why Choose Us/WhyChooseUs";
import ProductsCarousel from "../Product Carousal/ProductCarousal";
import TestimonialsSlider from "../Testimonial Slider/TestimonialSlider";
import CompanyStats from "../Stats/CompanyStats";
import CategoryShowcase from "../Category Showcase/CategoryShowcase";
import { Reveal } from "../components/Reveal";
import { SeoManager } from "../SEO/SeoManager";
import {
  getAbsoluteUrl,
  SEO_CONFIG,
  localBusinessStructuredData,
  websiteStructuredData,
  organizationStructuredData,
} from "../SEO/seo";
import { COMPANY } from "../SEO/companyInfo";

const reviewStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Inqilab Trading Corporation",
  url: SEO_CONFIG.siteUrl,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "87",
    bestRating: "5",
  },
  review: [
    {
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      author: { "@type": "Organization", name: "Rahim Construction Ltd." },
      reviewBody:
        "Premium Fine Sand and Stone Chips delivered on time. Material quality exceeded expectations for our residential project in Chattogram.",
    },
    {
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      author: { "@type": "Organization", name: "Al-Amin Builders" },
      reviewBody:
        "Best aggregate supplier in Bangladesh. ITC delivers consistent grading and competitive pricing — our go-to for all construction materials.",
    },
  ],
};

const productOfferSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SEO_CONFIG.siteName,
  url: SEO_CONFIG.siteUrl,
  areaServed: "Bangladesh",
  image: getAbsoluteUrl("/inqcorpLogo.jpeg"),
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: { "@type": "Product", name: "Fine Sand", description: "0.063–1mm fine river sand for plastering and mortar" },
      price: "65",
      priceCurrency: "BDT",
      unitCode: "CFT",
    },
    {
      "@type": "Offer",
      itemOffered: { "@type": "Product", name: "Medium Sand", description: "1–2mm medium sand for concrete mixing" },
      price: "60",
      priceCurrency: "BDT",
      unitCode: "CFT",
    },
    {
      "@type": "Offer",
      itemOffered: { "@type": "Product", name: "Coarse Sand", description: "2–4.75mm coarse sand for structural concrete" },
      price: "55",
      priceCurrency: "BDT",
      unitCode: "CFT",
    },
    {
      "@type": "Offer",
      itemOffered: { "@type": "Product", name: "Stone Chips 5–10mm", description: "Fine stone chips for concrete and road base" },
      price: "85",
      priceCurrency: "BDT",
      unitCode: "CFT",
    },
    {
      "@type": "Offer",
      itemOffered: { "@type": "Product", name: "Stone Chips 10–20mm", description: "Standard stone chips for RCC and structural work" },
      price: "95",
      priceCurrency: "BDT",
      unitCode: "CFT",
    },
    {
      "@type": "Offer",
      itemOffered: { "@type": "Product", name: "Boulder / Pathor 20mm+", description: "Large stones for foundation and retaining walls" },
      price: "120",
      priceCurrency: "BDT",
      unitCode: "CFT",
    },
  ],
};

export const Home = () => {
  return (
    <div className="overflow-x-clip bg-white">
      <SeoManager
        title="Inqilab Trading Corporation (ITC) | Premium Sand & Stone Supplier Bangladesh"
        description="Inqilab Trading Corporation (ITC) — Bangladesh's trusted supplier of premium construction aggregates from Chattogram. Fine Sand, Medium Sand, Coarse Sand, Stone Chips & Boulder at competitive CFT prices."
        path="/"
        keywords="inqilab, inqilab trading corporation, ITC, Kawsar Anher, sand supplier Bangladesh, stone chips Bangladesh, fine sand Chattogram, coarse sand Bangladesh, boulder supplier bd, construction aggregate Bangladesh, building materials Chattogram, ইনকিলাব ট্রেডিং"
        structuredData={[
          localBusinessStructuredData,
          websiteStructuredData,
          organizationStructuredData,
          reviewStructuredData,
          productOfferSchema,
        ]}
      />

      <HeroSection />

      <Reveal variant="up">
        <ProductsCarousel />
      </Reveal>

      <CategoryShowcase />

      <Reveal variant="scale">
        <CompanyStats />
      </Reveal>

      <Reveal variant="up">
        <WhyChooseUs />
      </Reveal>

      <Reveal variant="up">
        <TestimonialsSlider />
      </Reveal>
    </div>
  );
};

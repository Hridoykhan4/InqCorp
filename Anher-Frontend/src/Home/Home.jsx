import { lazy, Suspense } from "react";
import { HeroSection } from "../Hero/HeroSection";
import { Reveal } from "../components/Reveal";

// Below-the-fold sections — lazy chunks so the hero paints without waiting for
// react-slick, ScrollTrigger, countup, etc.
const WhyChooseUs = lazy(() => import("../Why Choose Us/WhyChooseUs"));
const ProductsCarousel = lazy(() => import("../Product Carousal/ProductCarousal"));
const TestimonialsSlider = lazy(() => import("../Testimonial Slider/TestimonialSlider"));
const CompanyStats = lazy(() => import("../Stats/CompanyStats"));
const CategoryShowcase = lazy(() => import("../Category Showcase/CategoryShowcase"));
import { SeoManager } from "../SEO/SeoManager";
import {
  getAbsoluteUrl,
  SEO_CONFIG,
  localBusinessStructuredData,
  websiteStructuredData,
  organizationStructuredData,
} from "../SEO/seo";
import { COMPANY } from "../SEO/companyInfo";

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
        title="Inqilab Trading Corporation | Inqilab Corporation (ITC) — Premium Sand & Stone Supplier Bangladesh"
        description="Inqilab Trading Corporation (ITC) — Bangladesh's trusted supplier of premium construction aggregates from Chattogram. Fine Sand, Medium Sand, Coarse Sand, Stone Chips & Boulder at competitive CFT prices."
        path="/"
        keywords="inqilab, inqilab corporation, inqilab trading, inqilab trading corporation, inqilab group, inqilab bd, ITC, Kawsar Anher, ইনকিলাব, ইনকিলাব ট্রেডিং, sand supplier Bangladesh, stone chips Bangladesh, fine sand Chattogram, coarse sand Bangladesh, boulder supplier bd, construction aggregate Bangladesh, building materials Chattogram"
        structuredData={[
          localBusinessStructuredData,
          websiteStructuredData,
          organizationStructuredData,
          productOfferSchema,
        ]}
      />

      <HeroSection />

      <Suspense fallback={null}>
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
      </Suspense>
    </div>
  );
};

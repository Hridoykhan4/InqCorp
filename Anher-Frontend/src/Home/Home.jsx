import { lazy, Suspense } from "react";
import { HeroSection } from "../Hero/HeroSection";
import { Reveal } from "../components/Reveal";
import { QuickQuoteBar } from "../components/QuickQuoteBar";

// Below-the-fold sections — lazy chunks so the hero paints without waiting for
// react-slick, ScrollTrigger, countup, etc.
const WhyChooseUs = lazy(() => import("../Why Choose Us/WhyChooseUs"));
const ProductsCarousel = lazy(() => import("../Product Carousal/ProductCarousal"));
const TestimonialsSlider = lazy(() => import("../Testimonial Slider/TestimonialSlider"));
const CompanyStats = lazy(() => import("../Stats/CompanyStats"));
const CategoryShowcase = lazy(() => import("../Category Showcase/CategoryShowcase"));
import { SeoManager } from "../SEO/SeoManager";
import { organizationStructuredData } from "../SEO/seo";

// LocalBusiness + WebSite schemas are emitted statically in index.html, so the
// homepage only adds one Organization node (brand aliases + product offers)
// instead of duplicating them at runtime.
const homeOrganizationSchema = {
  ...organizationStructuredData,
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: { "@type": "Product", name: "Screened Plaster Sand", description: "Fine-graded sand for plaster and masonry applications" },
    },
    {
      "@type": "Offer",
      itemOffered: { "@type": "Product", name: "Medium River Sand", description: "General-purpose river sand for concrete and blockwork" },
    },
    {
      "@type": "Offer",
      itemOffered: { "@type": "Product", name: "Coarse Construction Sand", description: "Coarse aggregate sand for structural concrete" },
    },
    {
      "@type": "Offer",
      itemOffered: { "@type": "Product", name: "Stone Chips 5–10 mm", description: "Small-size crushed stone aggregate" },
    },
    {
      "@type": "Offer",
      itemOffered: { "@type": "Product", name: "Stone Chips 10–20 mm", description: "Structural crushed aggregate for RCC work" },
    },
    {
      "@type": "Offer",
      itemOffered: { "@type": "Product", name: "Natural Stone Boulder", description: "Natural boulder for foundation and civil applications" },
    },
  ],
};

export const Home = () => {
  return (
    <div className="overflow-x-clip bg-white">
      <SeoManager
        title="Inqilab Trading Corporation | Inqilab Corporation (ITC) — Premium Sand & Stone Supplier Bangladesh"
        description="Inqilab Trading Corporation (ITC) coordinates quality-checked sand, stone chips, boulder and filling materials for projects across Bangladesh."
        path="/"
        keywords="inqilab, inqilab corporation, inqilab trading, inqilab trading corporation, inqilab group, inqilab bd, ITC, Kawsar Anher, ইনকিলাব, ইনকিলাব ট্রেডিং, sand supplier Bangladesh, stone chips Bangladesh, fine sand Bangladesh, coarse sand Bangladesh, boulder supplier bd, construction aggregate Bangladesh, building materials Bangladesh"
        structuredData={[homeOrganizationSchema]}
      />

      <HeroSection />

      <Reveal variant="up">
        <QuickQuoteBar />
      </Reveal>

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

        <TestimonialsSlider />
      </Suspense>
    </div>
  );
};

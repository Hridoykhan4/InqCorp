import { SliderBanner } from "../SliderBanner/SliderBanner";
import WhyChooseUs from "../Why Choose Us/WhyChooseUs";
import ProductsCarousel from "../Product Carousal/ProductCarousal";
import AdventureThrills from "../Adventure Thrills/AdventureThrills";

import BlogSlider from "../Blog Slider/BlogSlider";
import TestimonialsSlider from "../Testimonial Slider/TestimonialSlider";
import CompanyStats from "../Stats/CompanyStats";
import CategoryShowcase from "../Category Showcase/CategoryShowcase";
import { Reveal } from "../components/Reveal";
import { SeoManager } from "../SEO/SeoManager";
import { getAbsoluteUrl, SEO_CONFIG, localBusinessStructuredData, websiteStructuredData } from "../SEO/seo";
import OfferAndStats from "../OfferAndStates/OfferAndStates";

// Aggregate rating + reviews → eligible for star rich snippets in search results.
const reviewStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SEO_CONFIG.siteName,
  url: SEO_CONFIG.siteUrl,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "127",
    bestRating: "5",
  },
  review: [
    {
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      author: { "@type": "Organization", name: "Bangladesh Textiles Ltd." },
      reviewBody:
        "Clear categories, real technical information, and direct quotation without the runaround.",
    },
    {
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      author: { "@type": "Organization", name: "Dhaka Commercial Complex" },
      reviewBody:
        "Practical product range for building safety planning — hose cabinets, fire doors, storage and furniture from one source.",
    },
  ],
};

export const Home = () => {
  return (
    <div className="overflow-x-clip bg-white">
      <SeoManager
        title="Fire Safety Equipment Manufacturer in Bangladesh"
        description="SafetyPlus manufactures and supplies fire safety equipment in Bangladesh, including electric DB boxes, hose cabinets, fire doors, industrial racks, industrial furniture, and safety garments."
        path="/"
        keywords="SafetyPlus, Safety Plus Bangladesh, fire safety equipment Bangladesh, fire door Bangladesh, hose cabinet Bangladesh, DB box, industrial racks, industrial furniture, fire safety products"
        structuredData={[
          localBusinessStructuredData,
          websiteStructuredData,
          reviewStructuredData,
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: SEO_CONFIG.siteName,
            url: SEO_CONFIG.siteUrl,
            areaServed: "Bangladesh",
            image: getAbsoluteUrl("/Icon.png"),
            makesOffer: [
              "Electric DB Box",
              "Hose Cabinet",
              "Industrial Racks",
              "Industrial Furniture",
              "Fire Door",
              "Industrial Garments",
            ],
          },
        ]}
      />

      <SliderBanner />
      {/* <WhyChooseUs /> */}
      <Reveal variant="up">
        <ProductsCarousel />
      </Reveal>
      <CategoryShowcase />
      <Reveal variant="scale">
        <CompanyStats />
      </Reveal>
      {/* <AdventureThrills /> */}
      {/* <OfferAndStats /> */}
      {/* <BlogSlider /> */}
      <Reveal variant="up">
        <TestimonialsSlider />
      </Reveal>
    </div>
  );
};

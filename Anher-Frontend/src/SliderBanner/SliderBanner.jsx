import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  faArrowRight,
  faChevronLeft,
  faChevronRight,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useOutletContext, useNavigate } from "react-router-dom";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import fallbackImage from "../assets/image/Normal Image/Manufactoring.png";
import { capitalizeWords } from "../Functions/functions";
import { getCategoryList, openCategoryDestination } from "../config/navigation";

// ── Static product showcase (right column) ──────────────────────────────────
// const SHOWCASE_ITEMS = [
//   {
//     id: "hose-cabinet",
//     label: "Fire Hose Cabinet",
//     spec: "Grade-A Steel · Powder-Coat Red",
//     match: "hose",
//   },
//   {
//     id: "fire-door",
//     label: "Industrial Fire Door",
//     spec: "UL Standard · Double-Leaf",
//     match: "door",
//   },
//   {
//     id: "cable-tray",
//     label: "Steel Cable Tray",
//     spec: "Pre-galvanised GI · Heavy-Gauge",
//     match: "cable",
//   },
// ];

// ── Helpers ──────────────────────────────────────────────────────────────────
const getSlideImage = (item) =>
  Array.isArray(item?.imageUrl)
    ? item.imageUrl[0] || fallbackImage
    : item?.imageUrl || fallbackImage;

const pickImg = (v) => (Array.isArray(v) ? v[0] : v) || null;

const getShowcaseData = (showcase, categories) => {
  const cat = categories?.find((c) => {
    const hay = `${c?.name || ""} ${c?.label || ""}`.toLowerCase();
    return hay.includes(showcase.match);
  });
  const img =
    pickImg(cat?.bannerImgUrl) ||
    pickImg(cat?.imageUrl) ||
    fallbackImage;
  return { image: img, category: cat || null };
};

const slideFallback = [
  {
    title: "Complete Fire Safety Solutions",
    description:
      "SafetyPlus manufactures and supplies UL-grade fire doors, industrial hose cabinets, steel cable trays, DB boxes, and heavy-gauge racks — engineered in Bangladesh for factories, warehouses, and commercial buildings.",
    imageUrl: [fallbackImage],
  },
];

// ── ArrowButton — GSAP depth-click (mimics physical hardware button) ─────────
const ArrowButton = memo(({ direction = "next", onClick }) => {
  const isNext = direction === "next";
  const btnRef = useRef(null);

  const handleClick = useCallback(() => {
    if (btnRef.current) {
      gsap
        .timeline()
        .to(btnRef.current, { scale: 0.78, duration: 0.07, ease: "power3.in" })
        .to(btnRef.current, {
          scale: 1,
          duration: 0.44,
          ease: "back.out(3)",
        });
    }
    onClick?.();
  }, [onClick]);

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={handleClick}
      aria-label={isNext ? "Next slide" : "Previous slide"}
      className={`absolute top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 place-items-center border border-white/18 bg-[#1E1E24]/55 text-white/75 backdrop-blur-md transition hover:border-[#D32F2F]/55 hover:bg-[#D32F2F]/15 hover:text-white md:grid ${
        isNext ? "right-5" : "left-5"
      }`}
      style={{ willChange: "transform" }}
    >
      <FontAwesomeIcon
        icon={isNext ? faChevronRight : faChevronLeft}
        className="text-sm"
      />
    </button>
  );
});
ArrowButton.displayName = "ArrowButton";

// ── HeroSlide — isolated GSAP context per slide ──────────────────────────────
const HeroSlide = memo(
  ({ item, index, isActive, navigate, categoryChips, categories }) => {
    const slideRef   = useRef(null);
    const gridRef    = useRef(null);
    const kickerRef  = useRef(null);
    const titleRef   = useRef(null);
    const ctaRef     = useRef(null);
    const chipsRef   = useRef(null);
    const productRefs = useRef([]);

    useEffect(() => {
      if (!isActive || !slideRef.current) return;

      const ctx = gsap.context(() => {
        // Lock starting state so there is no layout shift
        gsap.set(gridRef.current,   { opacity: 0 });
        gsap.set(kickerRef.current, { y: 28, opacity: 0 });
        gsap.set(titleRef.current,  { y: 54, opacity: 0, filter: "blur(4px)" });
        gsap.set(ctaRef.current,    { y: 24, opacity: 0 });
        gsap.set(chipsRef.current,  { y: 18, opacity: 0 });
        productRefs.current.filter(Boolean).forEach((el) =>
          gsap.set(el, { x: 130, opacity: 0 })
        );

        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          // Grid — slow structural reveal reinforces engineering precision
          .to(
            gridRef.current,
            { opacity: 0.21, duration: 1.55, ease: "power2.out" },
            0
          )
          // Kicker
          .to(kickerRef.current, { y: 0, opacity: 1, duration: 0.68 }, 0.07)
          // Headline — heavy deceleration, maximum weight
          .to(
            titleRef.current,
            { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.08 },
            0.22
          )
          // CTA row
          .to(ctaRef.current, { y: 0, opacity: 1, duration: 0.72 }, 0.58)
          // Category chips
          .to(chipsRef.current, { y: 0, opacity: 1, duration: 0.66 }, 0.72)
          // Product cards — slide from right + back.out bounce
          // (feels like a massive steel door locking into its frame)
          .to(
            productRefs.current.filter(Boolean),
            {
              x: 0,
              opacity: 1,
              duration: 0.84,
              stagger: 0.13,
              ease: "back.out(1.35)",
            },
            0.34
          );
      }, slideRef);

      return () => ctx.revert();
    }, [isActive]);

    const image = getSlideImage(item);

    return (
      <div ref={slideRef}>
        <div className="sp-i-slide relative min-h-[85svh] overflow-hidden sm:min-h-[100svh]">

          {/* Background banner image */}
          <img
            src={image}
            alt={item?.title || "SafetyPlus fire safety equipment"}
            className="sp-i-bg absolute inset-0 h-full w-full object-cover"
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
            onError={(e) => {
              e.currentTarget.src = fallbackImage;
            }}
          />

          {/* Cinematic scrims */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1E1E24]/97 via-[#1E1E24]/86 to-[#1E1E24]/52 md:to-[#1E1E24]/38" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E24]/88 via-transparent to-[#1E1E24]/30" />

          {/* Architectural grid — GSAP animates opacity from 0 → 0.21 */}
          <div
            ref={gridRef}
            className="sp-i-grid absolute inset-0 pointer-events-none"
            style={{ opacity: 0 }}
          />

          {/* Structural left-edge red accent line */}
          <div className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-transparent via-[#D32F2F] to-transparent opacity-55" />

          {/* ── Main layout ── */}
          <div className="container-page relative z-10 flex min-h-[85svh] items-center py-12 sm:min-h-[100svh] sm:py-16 lg:py-20">
            <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_440px]">

              {/* ── LEFT: Copy ── */}
              <div className="max-w-2xl">

                {/* Kicker */}
                <div
                  ref={kickerRef}
                  style={{ opacity: 0 }}
                  className="inline-flex items-center gap-2.5 border border-white/12 bg-white/[0.04] px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-red-200 backdrop-blur-sm sm:px-4 sm:py-2 sm:text-xs"
                >
                  <FontAwesomeIcon
                    icon={faShieldHalved}
                    className="shrink-0 text-[#D32F2F]"
                  />
                  Fire Safety Manufacturer · Bangladesh
                </div>

                {/* Headline — always in DOM; GSAP reveals it */}
                <h1
                  ref={titleRef}
                  style={{ opacity: 0 }}
                  className="mt-5 text-balance text-[30px] font-black leading-[1.06] tracking-[-0.01em] text-white sm:text-4xl md:text-5xl lg:text-[56px] xl:text-[62px]"
                >
                  {item?.title || "Complete Fire Safety Solutions"}
                </h1>

                {/* Description — always fully visible; never animated/hidden (SEO) */}
                <p className="mt-5 max-w-xl text-pretty text-sm leading-7 text-white/72 sm:text-base sm:leading-8">
                  {item?.description ||
                    "SafetyPlus manufactures and supplies UL-grade fire doors, industrial hose cabinets, steel cable trays, DB boxes, and heavy-gauge racks — engineered in Bangladesh for factories, warehouses, and commercial buildings."}
                </p>

                {/* CTA row */}
                <div
                  ref={ctaRef}
                  style={{ opacity: 0 }}
                  className="mt-8 flex flex-wrap items-center gap-3"
                >
                  {/* Primary — fill-from-left on hover */}
                  <button
                    type="button"
                    onClick={() => navigate("/all-products")}
                    className="sp-i-cta group relative inline-flex items-center gap-3 overflow-hidden border border-[#D32F2F]/55 bg-[#D32F2F]/10 px-7 py-3.5 text-sm font-bold text-white sm:text-base"
                  >
                    <span
                      className="absolute inset-0 origin-left scale-x-0 bg-[#D32F2F] transition-transform duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                      aria-hidden="true"
                    />
                    <span className="relative z-10">Explore Products</span>
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="relative z-10 text-xs transition-transform duration-300 group-hover:translate-x-1.5"
                    />
                  </button>

                  {/* Secondary */}
                  <button
                    type="button"
                    onClick={() => navigate("/contact")}
                    className="inline-flex items-center gap-2 border border-white/18 px-5 py-3.5 text-sm font-semibold text-white/80 transition hover:border-white/38 hover:text-white sm:text-base"
                  >
                    Request Quote
                  </button>
                </div>

                {/* Category chips */}
                {categoryChips.length > 0 && (
                  <div
                    ref={chipsRef}
                    style={{ opacity: 0 }}
                    className="mt-7 flex flex-wrap gap-2"
                  >
                    {categoryChips.map((cat) => (
                      <button
                        key={cat?._id || cat?.name}
                        type="button"
                        onClick={() => openCategoryDestination(cat, navigate)}
                        className="group inline-flex items-center gap-2 border border-white/12 bg-white/[0.04] px-4 py-2 text-xs font-bold text-white/72 backdrop-blur-sm transition hover:border-[#D32F2F]/45 hover:bg-[#D32F2F]/10 hover:text-white"
                      >
                        {capitalizeWords(cat?.label || cat?.name)}
                        <FontAwesomeIcon
                          icon={faArrowRight}
                          className="text-[9px] text-white/30 transition group-hover:translate-x-0.5 group-hover:text-[#D32F2F]"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* ── RIGHT: Product showcase cards ── */}

            </div>
          </div>
        </div>
      </div>
    );
  }
);
HeroSlide.displayName = "HeroSlide";

// ── SliderBanner (root export) ───────────────────────────────────────────────
export const SliderBanner = memo(() => {
  const { banners = [], categories } = useOutletContext();
  const navigate = useNavigate();
  const slides = banners?.length > 0 ? banners : slideFallback;
  const [activeSlide, setActiveSlide] = useState(0);

  const categoryChips = useMemo(
    () => getCategoryList(categories),
    [categories]
  );

  const settings = useMemo(
    () => ({
      dots: slides.length > 1,
      infinite: slides.length > 1,
      speed: 900,
      slidesToShow: 1,
      slidesToScroll: 1,
      prevArrow: <ArrowButton direction="prev" />,
      nextArrow: <ArrowButton direction="next" />,
      autoplay: slides.length > 1,
      autoplaySpeed: 6200,
      pauseOnHover: true,
      swipeToSlide: true,
      afterChange: (current) => setActiveSlide(current),
      cssEase: "cubic-bezier(0.22, 1, 0.36, 1)",
      appendDots: (dots) => (
        <div className="absolute bottom-7 left-0 right-0 z-20">
          <ul className="flex items-center justify-center gap-3">{dots}</ul>
        </div>
      ),
      customPaging: () => (
        <button
          type="button"
          aria-label="Go to slide"
          className="h-[3px] w-7 bg-white/28 transition-all hover:bg-white"
        />
      ),
    }),
    [slides.length]
  );

  return (
    <section className="relative overflow-hidden bg-[#1E1E24] text-white">
      <Slider {...settings} className="sp-i-slider">
        {slides.map((item, index) => (
          <HeroSlide
            key={item?._id || index}
            item={item}
            index={index}
            isActive={index === activeSlide}
            navigate={navigate}
            categoryChips={categoryChips}
            categories={categories}
          />
        ))}
      </Slider>

      <style>{`
        /* ── BG image — locked scale, subtle desaturation ── */
        .sp-i-bg {
          transform: scale(1.06);
          filter: saturate(0.72) contrast(1.05) brightness(0.82);
          will-change: transform;
        }

        /* ── Architectural grid overlay ── */
        .sp-i-grid {
          background-image:
            linear-gradient(rgba(255,255,255,.052) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.052) 1px, transparent 1px);
          background-size: 58px 58px;
          mask-image: linear-gradient(to right, rgba(0,0,0,0.75) 0%, transparent 72%);
          -webkit-mask-image: linear-gradient(to right, rgba(0,0,0,0.75) 0%, transparent 72%);
          will-change: opacity;
        }

        /* ── Slick dots: horizontal line style ── */
        .sp-i-slider .slick-dots li {
          width: auto;
          height: auto;
          margin: 0;
        }
        .sp-i-slider .slick-dots li.slick-active button {
          background: #D32F2F;
          width: 36px;
          box-shadow: 0 0 10px rgba(211,47,47,0.65);
        }
        .sp-i-slider .slick-dots li button::before {
          display: none;
        }

        /* ── Product card: hover lift (rises off platform like steel on concrete) ── */
        .sp-i-card {
          will-change: transform, box-shadow;
          transition:
            transform 0.32s cubic-bezier(0.16,1,0.3,1),
            box-shadow 0.32s cubic-bezier(0.16,1,0.3,1),
            border-color 0.28s ease;
        }
        .sp-i-card:hover {
          transform: scale(1.02) translateY(-2px);
          box-shadow:
            0 16px 40px -12px rgba(211,47,47,0.26),
            0 6px 20px -6px rgba(0,0,0,0.55);
          border-color: rgba(211,47,47,0.28);
        }

        /* ── Arrow button base ── */
        .sp-i-slider .slick-arrow {
          will-change: transform;
        }

        @media (prefers-reduced-motion: reduce) {
          .sp-i-bg { transform: none; }
          .sp-i-card,
          .sp-i-card:hover { transition: none; transform: none; }
        }
      `}</style>
    </section>
  );
});
SliderBanner.displayName = "SliderBanner";

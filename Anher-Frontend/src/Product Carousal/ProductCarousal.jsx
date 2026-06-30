import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faChevronLeft,
  faChevronRight,
  faMountain,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useMemo, useRef, useState } from "react";
import { capitalizeWords } from "../Functions/functions";
import { getCategoryHref, getCategoryList, isExternalCategory } from "../config/navigation";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NAVY = "#1B3A8A";
const GOLD = "#C49B2B";

const fallbackProduct =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png";

const getImage = (item) => {
  if (Array.isArray(item?.imageUrl)) return item.imageUrl[0] || fallbackProduct;
  return item?.imageUrl || fallbackProduct;
};

// Fallback product lines when backend empty
const FALLBACK_LINES = [
  { title: "Fine Sand", sub: "0.063 – 1mm", icon: faMountain, color: "#C49B2B" },
  { title: "Medium Sand", sub: "1 – 2mm", icon: faMountain, color: "#1B3A8A" },
  { title: "Coarse Sand", sub: "2 – 4.75mm", icon: faMountain, color: "#C49B2B" },
  { title: "Stone Chips 5–10mm", sub: "Fine chips", icon: faMountain, color: "#1B3A8A" },
  { title: "Stone Chips 10–20mm", sub: "Standard chips", icon: faMountain, color: "#C49B2B" },
  { title: "Boulder / Pathor", sub: "20mm+", icon: faMountain, color: "#1B3A8A" },
];

const ProductTile = ({ item }) => {
  const navigate = useNavigate();
  const tileRef = useRef(null);
  const title = capitalizeWords(item?.name || item?.model || "Aggregate Product");
  const sku = item?.name && item?.model ? String(item.model).toUpperCase() : null;

  const down = useRef({ x: 0, y: 0 });
  const onPointerDown = (e) => { down.current = { x: e.clientX ?? 0, y: e.clientY ?? 0 }; };
  const onClick = (e) => {
    const dx = Math.abs((e.clientX ?? 0) - down.current.x);
    const dy = Math.abs((e.clientY ?? 0) - down.current.y);
    if (dx > 8 || dy > 8) { e.preventDefault(); e.stopPropagation(); return; }
    if (item?.model) navigate(`/products/${item.model}`);
  };

  return (
    <div
      ref={tileRef}
      role="link"
      tabIndex={0}
      aria-label={title}
      onPointerDown={onPointerDown}
      onClick={onClick}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && item?.model) {
          e.preventDefault(); navigate(`/products/${item.model}`);
        }
      }}
      className="product-tile group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(27,58,138,0.2)] focus:outline-none"
      style={{ border: "1px solid rgba(27,58,138,0.1)" }}
    >
      {/* Top progress bar on hover */}
      <div
        className="absolute inset-x-0 top-0 z-10 h-[3px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
        style={{ background: `linear-gradient(90deg, ${NAVY}, ${GOLD})` }}
      />

      {/* Image area */}
      <div
        className="relative aspect-[4/3] overflow-hidden p-5"
        style={{ background: "linear-gradient(135deg, #f0f4ff 0%, #ffffff 60%, #fffbef 100%)" }}
      >
        <img
          src={getImage(item)}
          alt={title}
          className="h-full w-full object-contain transition-all duration-700 group-hover:scale-110"
          loading="lazy"
          onError={(e) => { e.currentTarget.src = fallbackProduct; }}
        />
        {/* Shimmer shine on hover */}
        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.6),transparent)] transition-transform duration-700 ease-out group-hover:translate-x-full" />

        {/* Category badge */}
        {item?.category && (
          <span
            className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white shadow-sm"
            style={{ background: NAVY }}
          >
            <FontAwesomeIcon icon={faMountain} className="text-[9px]" style={{ color: GOLD }} />
            {capitalizeWords(item.category)}
          </span>
        )}

        {/* Arrow button reveal */}
        <span
          className="absolute bottom-3 right-3 grid h-10 w-10 translate-y-3 place-items-center rounded-full text-white opacity-0 shadow-lg transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100"
          style={{ background: `linear-gradient(135deg, ${NAVY}, #2a50b8)` }}
        >
          <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3
          className="line-clamp-2 min-h-12 text-base font-extrabold leading-6 tracking-tight text-safety-ink transition-colors duration-300 group-hover:text-safety-red md:text-lg"
        >
          {title}
        </h3>
        <div className="mt-auto flex items-center justify-between gap-2 pt-3">
          {sku ? (
            <span
              className="inline-flex items-center rounded-lg px-2 py-0.5 font-mono text-[11px] font-bold tracking-wider"
              style={{ background: "rgba(27,58,138,0.06)", color: NAVY }}
            >
              {sku}
            </span>
          ) : (
            <span />
          )}
          <span
            className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.14em] transition-colors duration-300 group-hover:text-safety-red"
            style={{ color: "rgba(27,58,138,0.5)" }}
          >
            View
            <FontAwesomeIcon icon={faArrowRight} className="text-[10px] transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </div>
  );
};

const CategoryPill = ({ item }) => {
  const className =
    "group flex items-center gap-3 rounded-xl border bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md";
  const style = { borderColor: "rgba(27,58,138,0.12)" };
  const content = (
    <>
      <img
        src={getImage(item)}
        alt={item?.label || item?.name || "Product category"}
        className="h-12 w-12 rounded-lg object-cover"
        loading="lazy"
        onError={(e) => { e.currentTarget.src = fallbackProduct; }}
      />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-extrabold text-safety-ink group-hover:text-safety-red">
          {capitalizeWords(item?.label || item?.name) || "Category"}
        </span>
        <span className="block text-xs text-safety-muted">Browse products</span>
      </span>
      <FontAwesomeIcon
        icon={faArrowRight}
        className="text-xs text-safety-muted transition-transform group-hover:translate-x-0.5 group-hover:text-safety-red"
      />
    </>
  );

  return isExternalCategory(item) ? (
    <a href={getCategoryHref(item)} className={className} style={style}>{content}</a>
  ) : (
    <Link to={getCategoryHref(item)} className={className} style={style}>{content}</Link>
  );
};

export default function ProductsCarousel() {
  const { products = [], categories = [] } = useOutletContext();
  const featuredProducts = useMemo(() => products || [], [products]);
  const featuredCategories = useMemo(() => getCategoryList(categories), [categories]);
  const sliderRef = useRef(null);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(4);
  const [inView, setInView] = useState(true);

  // GSAP scroll reveal for heading
  useEffect(() => {
    if (!headingRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current.children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const slick = sliderRef.current;
    if (!slick) return;
    if (inView) slick.slickPlay?.();
    else slick.slickPause?.();
  }, [inView]);

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      if (w >= 1280) return 4;
      if (w >= 1024) return 3;
      if (w >= 768) return 3;
      if (w >= 560) return 2;
      return 1;
    };
    const update = () => setSlidesToShow(compute());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const count = featuredProducts.length;
  const clamp = (n) => Math.max(1, Math.min(n, count));
  const visible = clamp(slidesToShow);
  const totalDots = Math.max(1, count - visible + 1);
  const safeCurrent = Math.min(currentSlide, totalDots - 1);
  const canLoop = count > 1;

  const sliderSettings = {
    infinite: canLoop,
    speed: 600,
    cssEase: "cubic-bezier(0.22, 1, 0.36, 1)",
    slidesToShow: clamp(4),
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    autoplay: canLoop,
    autoplaySpeed: 4200,
    pauseOnHover: true,
    pauseOnFocus: true,
    swipeToSlide: true,
    touchThreshold: 8,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: clamp(3), infinite: canLoop } },
      { breakpoint: 1024, settings: { slidesToShow: clamp(3), infinite: canLoop } },
      { breakpoint: 768, settings: { slidesToShow: clamp(2), infinite: canLoop } },
      {
        breakpoint: 560,
        settings: { slidesToShow: 1, infinite: canLoop, centerMode: count > 1, centerPadding: "34px" },
      },
    ],
  };

  return (
    <section ref={sectionRef} className="section-page" style={{ background: "linear-gradient(to bottom, #f8f9fe, #ffffff, #f8f9fe)" }}>
      <div className="container-page">

        {/* Heading */}
        <div ref={headingRef} className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p
              className="text-[11px] font-bold uppercase tracking-[0.25em]"
              style={{ color: GOLD }}
            >
              Premium Aggregates
            </p>
            <h2
              className="mt-3 text-[clamp(26px,4vw,44px)] font-black leading-tight tracking-tight"
              style={{ color: "#0d1a36" }}
            >
              Quality Materials for Every Build
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-gray-500">
              From fine river sand to large boulders — every grade, precision-sourced and delivered across Chattogram.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => sliderRef.current?.slickPrev()}
              aria-label="Previous products"
              disabled={featuredProducts.length <= visible}
              className="grid h-12 w-12 place-items-center rounded-full border border-safety-border bg-white text-safety-ink shadow-sm transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40"
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = NAVY; e.currentTarget.style.color = NAVY; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = ""; e.currentTarget.style.color = ""; }}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button
              type="button"
              onClick={() => sliderRef.current?.slickNext()}
              aria-label="Next products"
              disabled={featuredProducts.length <= visible}
              className="grid h-12 w-12 place-items-center rounded-full text-white shadow-md transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40"
              style={{ background: `linear-gradient(135deg, ${NAVY}, #2a50b8)` }}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
            <Link
              to="/all-products"
              className="inline-flex items-center gap-2 rounded-xl border-2 px-5 py-2.5 text-sm font-bold transition-all duration-300"
              style={{ borderColor: NAVY, color: NAVY }}
              onMouseEnter={(e) => { e.currentTarget.style.background = NAVY; e.currentTarget.style.color = "white"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = ""; e.currentTarget.style.color = NAVY; }}
            >
              View All
              <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
            </Link>
          </div>
        </div>

        {/* Carousel or fallback */}
        {featuredProducts.length > 0 ? (
          <div className="mt-10 inq-products-carousel">
            <Slider
              ref={sliderRef}
              {...sliderSettings}
              beforeChange={(_, next) => setCurrentSlide(next)}
            >
              {featuredProducts.map((item, index) => (
                <div key={item?._id || item?.model || index} className="px-2 py-2">
                  <ProductTile item={item} />
                </div>
              ))}
            </Slider>

            {totalDots > 1 && (
              <div className="mt-8 flex items-center justify-center gap-4">
                <span className="text-xs font-bold tabular-nums text-safety-muted">
                  <span style={{ color: NAVY }}>{String(safeCurrent + 1).padStart(2, "0")}</span>
                  <span className="mx-1 text-safety-border">/</span>
                  {String(totalDots).padStart(2, "0")}
                </span>
                <div className="relative h-1 w-44 overflow-hidden rounded-full sm:w-64" style={{ background: "rgba(27,58,138,0.1)" }}>
                  <span
                    className="absolute top-0 h-full rounded-full transition-all duration-500 ease-out"
                    style={{
                      background: `linear-gradient(90deg, ${NAVY}, ${GOLD})`,
                      width: `${100 / totalDots}%`,
                      left: `${(safeCurrent / totalDots) * 100}%`,
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FALLBACK_LINES.map((item) => (
              <div
                key={item.title}
                className="group overflow-hidden rounded-2xl bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                style={{ border: "1px solid rgba(27,58,138,0.1)" }}
              >
                <div
                  className="grid h-14 w-14 place-items-center rounded-2xl text-xl"
                  style={{ background: `${item.color}18`, color: item.color }}
                >
                  <FontAwesomeIcon icon={item.icon} />
                </div>
                <h3 className="mt-5 text-lg font-extrabold text-safety-ink">{item.title}</h3>
                <p className="mt-1 text-sm font-semibold" style={{ color: GOLD }}>{item.sub}</p>
                <p className="mt-3 text-sm leading-6 text-gray-500">
                  Premium quality aggregate — add products from the dashboard to see them here.
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Categories browser */}
        {featuredCategories.length > 0 && (
          <div
            className="mt-12 overflow-hidden rounded-2xl bg-white p-5 shadow-sm sm:p-6"
            style={{ border: "1px solid rgba(27,58,138,0.1)" }}
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p
                  className="text-[10px] font-bold uppercase tracking-[0.22em]"
                  style={{ color: GOLD }}
                >
                  Browse by Category
                </p>
                <h3 className="mt-2 text-2xl font-black text-safety-ink">
                  Find the right aggregate faster.
                </h3>
              </div>
              <Link
                to="/all-products"
                className="text-sm font-extrabold transition"
                style={{ color: NAVY }}
              >
                Complete catalogue →
              </Link>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {featuredCategories.map((item) => (
                <CategoryPill key={item?._id || item?.name} item={item} />
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .inq-products-carousel .slick-list { padding: 4px 0 12px !important; }
        .inq-products-carousel .slick-track { display: flex; }
        .inq-products-carousel .slick-slide { height: auto; }
        .inq-products-carousel .slick-slide > div { height: 100%; }
        .product-tile { will-change: transform; }
      `}</style>
    </section>
  );
}

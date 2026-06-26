import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBoxOpen,
  faChevronLeft,
  faChevronRight,
  faDoorClosed,
  faFireExtinguisher,
  faIndustry,
  faLayerGroup,
  faShieldHalved,
  faWarehouse,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useMemo, useRef, useState } from "react";
import { capitalizeWords } from "../Functions/functions";
import { getCategoryHref, getCategoryList, isExternalCategory } from "../config/navigation";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const fallbackProduct =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png";

const getImage = (item) => {
  if (Array.isArray(item?.imageUrl)) {
    return item.imageUrl[0] || fallbackProduct;
  }
  return item?.imageUrl || fallbackProduct;
};

const plannedLines = [
  { title: "Electric DB Box", icon: faBoxOpen },
  { title: "Hose Cabinet", icon: faFireExtinguisher },
  { title: "Industrial Racks", icon: faWarehouse },
  { title: "Industrial Furniture", icon: faIndustry },
  { title: "Fire Door", icon: faDoorClosed },
  { title: "Industrial Garments", icon: faLayerGroup },
];

const ProductTile = ({ item }) => {
  const navigate = useNavigate();
  // Product NAME leads; model is a quiet SKU when it differs from the name.
  const title = capitalizeWords(item?.name || item?.model || "Safety product");
  const sku = item?.name && item?.model ? String(item.model).toUpperCase() : null;

  // Drag guard: slick fires a click after a desktop drag/swipe. Record the
  // pointer-down position and cancel navigation if the pointer actually moved.
  const down = useRef({ x: 0, y: 0 });
  const onPointerDown = (e) => {
    down.current = { x: e.clientX ?? 0, y: e.clientY ?? 0 };
  };
  const onClick = (e) => {
    const dx = Math.abs((e.clientX ?? 0) - down.current.x);
    const dy = Math.abs((e.clientY ?? 0) - down.current.y);
    if (dx > 8 || dy > 8) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    if (item?.model) navigate(`/products/${item.model}`);
  };

  return (
    <div
      role="link"
      tabIndex={0}
      aria-label={title}
      onPointerDown={onPointerDown}
      onClick={onClick}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && item?.model) {
          e.preventDefault();
          navigate(`/products/${item.model}`);
        }
      }}
      className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-safety-border bg-white shadow-sm transition duration-500 hover:-translate-y-1.5 hover:border-safety-red/40 hover:shadow-[0_24px_60px_-20px_rgba(185,28,28,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-safety-red focus-visible:ring-offset-2"
    >
      <div className="absolute inset-x-0 top-0 z-10 h-1 origin-left scale-x-0 bg-gradient-to-r from-safety-red to-safety-amber transition-transform duration-500 group-hover:scale-x-100" />
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-safety-surface via-white to-safety-surface p-5">
        <img
          src={getImage(item)}
          alt={title}
          className="h-full w-full object-contain transition duration-[800ms] ease-out group-hover:scale-[1.12] group-hover:-rotate-1"
          loading="lazy"
          onError={(event) => {
            event.currentTarget.src = fallbackProduct;
          }}
        />
        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.55),transparent)] transition-transform duration-700 ease-out group-hover:translate-x-full" />
        {item?.category && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/60 bg-white/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-safety-red shadow-sm backdrop-blur-md">
            <FontAwesomeIcon icon={faShieldHalved} className="text-[9px]" />
            {capitalizeWords(item.category)}
          </span>
        )}
        <span className="absolute bottom-3 right-3 grid h-10 w-10 translate-y-3 place-items-center rounded-full bg-safety-red text-white opacity-0 shadow-lg transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 min-h-12 text-base font-extrabold leading-6 tracking-tight text-safety-ink transition-colors duration-300 group-hover:text-safety-red md:text-lg">
          {title}
        </h3>
        <div className="mt-auto flex items-center justify-between gap-2 pt-3">
          {sku ? (
            <span className="inline-flex items-center rounded-md bg-safety-surface px-2 py-0.5 font-mono text-[11px] font-bold tracking-wider text-safety-muted">
              {sku}
            </span>
          ) : (
            <span />
          )}
          <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.14em] text-safety-muted transition-colors duration-300 group-hover:text-safety-red">
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
    "group flex items-center gap-3 rounded-xl border border-safety-border bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:border-safety-red/40 hover:shadow-md";
  const content = (
    <>
    <img
      src={getImage(item)}
      alt={item?.label || item?.name || "SafetyPlus category"}
      className="h-12 w-12 rounded-md bg-safety-surface object-cover"
      loading="lazy"
      onError={(event) => {
        event.currentTarget.src = fallbackProduct;
      }}
    />
    <span className="min-w-0 flex-1">
      <span className="block truncate text-sm font-extrabold text-safety-ink group-hover:text-safety-red">
        {capitalizeWords(item?.label || item?.name) || "Category"}
      </span>
      <span className="block text-xs text-safety-muted">Browse line</span>
    </span>
    <FontAwesomeIcon
      icon={faArrowRight}
      className="text-xs text-safety-muted transition-transform group-hover:translate-x-0.5 group-hover:text-safety-red"
    />
    </>
  );

  return isExternalCategory(item) ? (
    <a href={getCategoryHref(item)} className={className}>
      {content}
    </a>
  ) : (
    <Link to={getCategoryHref(item)} className={className}>
      {content}
    </Link>
  );
};

export default function ProductsCarousel() {
  const { products = [], categories = [] } = useOutletContext();
  // Show ALL products — the carousel handles any count gracefully.
  const featuredProducts = useMemo(() => products || [], [products]);
  const featuredCategories = useMemo(() => getCategoryList(categories), [categories]);
  const sliderRef = useRef(null);
  const sectionRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(4);
  const [inView, setInView] = useState(true);

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
  // Never request more slides than exist — that's what hid the last 2–3 products
  // and left blank gaps. Clamp every breakpoint to the real product count.
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
    <section ref={sectionRef} className="section-page bg-gradient-to-b from-safety-surface via-white to-safety-surface">
      <div className="container-page">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">SafetyPlus Products</p>
            <h2 className="heading-lg mt-3 text-balance">
              Engineered safety, curated for serious projects.
            </h2>
            <p className="body-lead mt-4">
              Browse featured fire & industrial safety lines. Swipe, tap, or drag — built smooth on every device.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => sliderRef.current?.slickPrev()}
              aria-label="Previous products"
              disabled={featuredProducts.length <= visible}
              className="grid h-12 w-12 place-items-center rounded-full border border-safety-border bg-white text-safety-ink shadow-sm transition hover:-translate-y-0.5 hover:border-safety-red hover:text-safety-red disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button
              type="button"
              onClick={() => sliderRef.current?.slickNext()}
              aria-label="Next products"
              disabled={featuredProducts.length <= visible}
              className="grid h-12 w-12 place-items-center rounded-full bg-safety-red text-white shadow-md transition hover:-translate-y-0.5 hover:bg-safety-red-dark disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
            <Link to="/all-products" className="btn-brand-outline self-start md:self-auto">
              View All
              <FontAwesomeIcon icon={faArrowRight} className="ml-2 text-xs" />
            </Link>
          </div>
        </div>

        {featuredProducts.length > 0 ? (
          <div className="mt-10 safety-products-carousel">
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
                  <span className="text-safety-red">{String(safeCurrent + 1).padStart(2, "0")}</span>
                  <span className="mx-1 text-safety-border">/</span>
                  {String(totalDots).padStart(2, "0")}
                </span>
                {/* Modern sliding position track — thumb glides to current page */}
                <div className="relative h-1 w-44 overflow-hidden rounded-full bg-safety-border/70 sm:w-64">
                  <span
                    className="absolute top-0 h-full rounded-full bg-gradient-to-r from-safety-red to-safety-amber transition-all duration-500 ease-out"
                    style={{
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
            {plannedLines.map((item) => (
              <div key={item.title} className="card-surface p-5">
                <span className="grid h-12 w-12 place-items-center rounded-md bg-red-50 text-safety-red">
                  <FontAwesomeIcon icon={item.icon} />
                </span>
                <h3 className="mt-5 text-xl font-extrabold text-safety-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-safety-muted">
                  This SafetyPlus product line is ready to be populated from the dashboard.
                </p>
              </div>
            ))}
          </div>
        )}

        {featuredCategories.length > 0 && (
          <div className="mt-12 rounded-2xl border border-safety-border bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="eyebrow">Browse by Category</p>
                <h3 className="mt-2 text-2xl font-black text-safety-ink">
                  Find the right safety line faster.
                </h3>
              </div>
              <Link to="/all-products" className="text-sm font-extrabold text-safety-red">
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
        .safety-products-carousel .slick-list { padding: 4px 0 12px !important; }
        .safety-products-carousel .slick-track { display: flex; }
        @keyframes carouselDotFill {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        .safety-products-carousel .slick-slide { height: auto; }
        .safety-products-carousel .slick-slide > div { height: 100%; }
      `}</style>
    </section>
  );
}

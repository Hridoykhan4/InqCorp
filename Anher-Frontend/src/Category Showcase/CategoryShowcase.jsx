import { useLayoutEffect, useRef } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { capitalizeWords } from "../Functions/functions";
import { Reveal } from "../components/Reveal";
import { getCategoryHref, getCategoryList, isExternalCategory } from "../config/navigation";

gsap.registerPlugin(ScrollTrigger);

const FALLBACK =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png";

const tileImage = (c) => {
  const pick = (v) => (Array.isArray(v) ? v[0] : v);
  return pick(c?.bannerImgUrl) || pick(c?.imageUrl) || FALLBACK;
};

// First tile spans 2 cols on large screens for an editorial, magazine feel.
const spanClass = (i, total) => {
  if (total >= 3 && i === 0) return "sm:col-span-2 lg:col-span-2 lg:row-span-2";
  return "";
};

const CategoryCard = ({ item, index, total }) => {
  const name = capitalizeWords(item?.label || item?.name || "Category");
  const imgRef = useRef(null);
  const className =
    "relative block h-full min-h-[200px] overflow-hidden rounded-3xl bg-safety-ink shadow-[0_20px_50px_-30px_rgba(2,6,23,0.5)]";
  const content = (
    <>
      <img
        ref={imgRef}
        src={tileImage(item)}
        alt={name}
        loading="lazy"
        decoding="async"
        onError={(e) => (e.currentTarget.src = FALLBACK)}
        className="absolute -top-[8%] left-0 right-0 h-[116%] w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
      />
      {/* readability + brand wash */}
      <span className="absolute inset-0 bg-gradient-to-t from-safety-ink via-safety-ink/30 to-transparent" />
      <span className="absolute inset-0 bg-safety-red/0 transition-colors duration-500 group-hover:bg-safety-red/15" />
      {/* shine sweep */}
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.35),transparent)] transition-transform duration-700 ease-out group-hover:translate-x-full" />

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 md:p-6">
        <div className="translate-y-0 transition-transform duration-500 group-hover:-translate-y-1">
          <span className="block h-1 w-8 rounded-full bg-safety-amber transition-all duration-500 group-hover:w-14" />
          <h3 className="mt-3 text-lg font-black leading-tight text-white drop-shadow md:text-2xl">
            {name}
          </h3>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/70">
            Explore range
          </p>
        </div>
        <span className="grid h-11 w-11 shrink-0 translate-y-2 place-items-center rounded-full bg-white text-safety-red opacity-0 shadow-lg transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          <FontAwesomeIcon icon={faArrowRight} />
        </span>
      </div>
    </>
  );

  // GSAP parallax — the image drifts slightly slower than scroll for depth.
  useLayoutEffect(() => {
    const el = imgRef.current;
    if (!el) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1 },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <Reveal
      variant="up"
      delay={index * 90}
      className={`group ${spanClass(index, total)}`}
    >
      {isExternalCategory(item) ? (
        <a href={getCategoryHref(item)} aria-label={name} className={className}>
          {content}
        </a>
      ) : (
        <Link to={getCategoryHref(item)} aria-label={name} className={className}>
          {content}
        </Link>
      )}
    </Reveal>
  );
};

const CategoryShowcase = () => {
  const { categories = [] } = useOutletContext();
  const list = getCategoryList(categories);
  if (list.length === 0) return null;

  return (
    <section className="section-page bg-white">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center" data-aos="fade-up">
          <p className="eyebrow text-safety-red">Our Ranges</p>
          <h2 className="heading-lg mt-3 text-balance">
            Built for every Bangladeshi site
          </h2>
          <p className="body-lead mx-auto mt-4 max-w-lg">
            Tap a range to explore our full fire safety product line.
          </p>
        </div>

        <div className="mt-12 grid auto-rows-[200px] grid-cols-1 gap-4 sm:grid-cols-2 md:auto-rows-[230px] lg:grid-cols-3 lg:gap-5">
          {list.map((item, i) => (
            <CategoryCard key={item?._id || item?.name} item={item} index={i} total={list.length} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;

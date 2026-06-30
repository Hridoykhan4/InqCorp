import { useCallback, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faQuoteLeft, faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NAVY = "#1B3A8A";
const GOLD = "#C49B2B";

const TESTIMONIALS = [
  {
    name: "Rahim Ahmed",
    title: "Project Manager",
    company: "Rahim Construction Ltd.",
    location: "Chattogram",
    rating: 5,
    initials: "RA",
    color: NAVY,
    text: "We sourced Fine Sand and Stone Chips from Kawsar Anher for a large residential complex. Material quality was consistent, delivery was on time, and the CFT pricing was the best in Chattogram. Our go-to supplier.",
  },
  {
    name: "Al-Amin Hossain",
    title: "Site Engineer",
    company: "Al-Amin Builders",
    location: "Cumilla",
    rating: 5,
    initials: "AH",
    color: GOLD,
    text: "The Coarse Sand and Boulder met our civil engineering specs exactly. What impressed us most was the communication — Kawsar Alam personally ensured our bulk order was dispatched within 24 hours. Exceptional service.",
  },
  {
    name: "Kamal Uddin",
    title: "Procurement Head",
    company: "Dhaka Infrastructure Ltd.",
    location: "Dhaka",
    rating: 5,
    initials: "KU",
    color: NAVY,
    text: "We've been sourcing Stone Chips 10–20mm for three major road construction projects. Consistent grading, reliable delivery schedule, and transparent pricing. Kawsar Anher is now our preferred aggregate partner.",
  },
  {
    name: "Nasrin Begum",
    title: "Director",
    company: "Nasrin Developers",
    location: "Chattogram",
    rating: 5,
    initials: "NB",
    color: GOLD,
    text: "Ordered 500 CFT of mixed aggregates for our housing project. Delivery was prompt and material quality was exactly as described. The team is professional and responsive. Highly recommended for any construction project.",
  },
  {
    name: "Jahangir Alam",
    title: "Civil Engineer",
    company: "Metro Constructions",
    location: "Sylhet",
    rating: 5,
    initials: "JA",
    color: NAVY,
    text: "Medium Sand quality from Kawsar Anher is excellent — no clay contamination, proper grading. We've now made them our sole sand supplier for all ongoing projects across Sylhet and Chattogram divisions.",
  },
];

const AUTOPLAY = 6500;

const StarRow = ({ count }) => (
  <div className="flex items-center gap-1">
    {Array.from({ length: count }).map((_, i) => (
      <FontAwesomeIcon key={i} icon={faStar} className="text-xs" style={{ color: GOLD }} />
    ))}
  </div>
);

const TestimonialCard = ({ t, active, animate }) => (
  <div
    className={`testi-card relative h-full overflow-hidden rounded-3xl p-7 transition-all duration-500 ${active ? "ring-2" : "opacity-60 scale-95 hover:opacity-80"}`}
    style={{
      background: active
        ? `linear-gradient(135deg, ${NAVY} 0%, #0d1f4a 100%)`
        : "rgba(27,58,138,0.08)",
      ringColor: GOLD,
      boxShadow: active ? "0 24px 64px rgba(27,58,138,0.35)" : "none",
      transform: active ? "scale(1)" : "scale(0.95)",
      border: active ? `1px solid rgba(196,155,43,0.3)` : "1px solid rgba(27,58,138,0.12)",
    }}
  >
    {/* Corner glow */}
    {active && (
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(196,155,43,0.15), transparent)" }}
      />
    )}

    {/* Quote icon */}
    <FontAwesomeIcon
      icon={faQuoteLeft}
      className="mb-4 text-2xl"
      style={{ color: active ? "rgba(196,155,43,0.5)" : "rgba(27,58,138,0.3)" }}
    />

    {/* Stars */}
    <StarRow count={t.rating} />

    {/* Text */}
    <p
      className="mt-4 text-[14px] leading-7 sm:text-[15px]"
      style={{ color: active ? "rgba(255,255,255,0.8)" : "#4b5563" }}
    >
      "{t.text}"
    </p>

    {/* Divider */}
    <div
      className="my-5 h-px w-full"
      style={{ background: active ? "rgba(196,155,43,0.2)" : "rgba(27,58,138,0.08)" }}
    />

    {/* Author */}
    <div className="flex items-center gap-3">
      <div
        className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-sm font-black text-white shadow-lg"
        style={{
          background: active
            ? `linear-gradient(135deg, ${GOLD}, #a07a1a)`
            : `linear-gradient(135deg, ${t.color}, rgba(27,58,138,0.6))`,
        }}
      >
        {t.initials}
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-extrabold" style={{ color: active ? "#fff" : "#111827" }}>
          {t.name}
        </p>
        <p className="truncate text-[12px]" style={{ color: active ? "rgba(255,255,255,0.55)" : "#6b7280" }}>
          {t.title} · {t.company}
        </p>
      </div>
      <span
        className="ml-auto shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
        style={{
          background: active ? "rgba(196,155,43,0.15)" : "rgba(27,58,138,0.06)",
          color: active ? GOLD : NAVY,
        }}
      >
        {t.location}
      </span>
    </div>
  </div>
);

const TestimonialsSlider = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const total = TESTIMONIALS.length;

  const goTo = useCallback((idx) => setActive(((idx % total) + total) % total), [total]);
  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, AUTOPLAY);
    return () => clearInterval(id);
  }, [paused, next]);

  // GSAP scroll reveal
  useEffect(() => {
    if (!headingRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current.children,
        { y: 36, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.75, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 82%" },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  // Which cards to show (active + neighbours)
  const getVisible = () => {
    if (total <= 1) return [0];
    const prev2 = ((active - 1) + total) % total;
    const next2 = (active + 1) % total;
    return [prev2, active, next2];
  };
  const visible = getVisible();

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-20 lg:py-28"
      style={{ background: "#F8F9FE" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background blobs */}
      <div
        className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full opacity-40"
        style={{ background: `radial-gradient(circle, rgba(27,58,138,0.08), transparent)`, filter: "blur(60px)" }}
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full opacity-40"
        style={{ background: `radial-gradient(circle, rgba(196,155,43,0.07), transparent)`, filter: "blur(60px)" }}
      />

      <div className="container mx-auto px-4 sm:px-8 lg:px-12">

        {/* Heading */}
        <div ref={headingRef} className="mb-14 text-center">
          <p
            className="inline-block text-[11px] font-bold uppercase tracking-[0.28em]"
            style={{ color: GOLD }}
          >
            Client Testimonials
          </p>
          <h2
            className="mt-3 text-[clamp(26px,4vw,44px)] font-black leading-tight tracking-tight"
            style={{ color: "#0d1a36" }}
          >
            Trusted by Builders Across Bangladesh
          </h2>
          {/* Gold underline */}
          <div className="mx-auto mt-4 flex items-center justify-center gap-2">
            <span className="block h-[3px] w-12 rounded-full" style={{ background: GOLD }} />
            <span className="block h-2 w-2 rounded-full" style={{ background: GOLD }} />
            <span className="block h-[3px] w-12 rounded-full" style={{ background: GOLD }} />
          </div>
          {/* Rating pill */}
          <div
            className="mx-auto mt-5 inline-flex items-center gap-2.5 rounded-full px-5 py-2 shadow-sm"
            style={{ background: "white", border: "1px solid rgba(27,58,138,0.1)" }}
          >
            <StarRow count={5} />
            <span className="text-sm font-extrabold" style={{ color: NAVY }}>4.9 / 5</span>
            <span className="text-xs font-semibold text-gray-400">average rating</span>
          </div>
        </div>

        {/* Cards - 3 visible on desktop */}
        <div
          className="grid grid-cols-1 gap-5 md:grid-cols-3"
          role="region"
          aria-label="Client testimonials"
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") prev();
            else if (e.key === "ArrowRight") next();
          }}
          tabIndex={0}
        >
          {visible.map((idx, pos) => (
            <div
              key={idx}
              className="cursor-pointer"
              onClick={() => setActive(idx)}
            >
              <TestimonialCard t={TESTIMONIALS[idx]} active={pos === 1} />
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="mt-10 flex flex-col items-center gap-5 sm:flex-row sm:justify-between">
          {/* Dot indicators */}
          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: idx === active ? 28 : 8,
                  background: idx === active ? NAVY : "rgba(27,58,138,0.2)",
                }}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>

          {/* Arrow controls */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold tabular-nums text-gray-400">
              <span className="font-black" style={{ color: NAVY }}>{String(active + 1).padStart(2, "0")}</span>
              {" / "}
              {String(total).padStart(2, "0")}
            </span>
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="grid h-11 w-11 place-items-center rounded-full border transition-all duration-300 hover:-translate-y-0.5"
              style={{ borderColor: "rgba(27,58,138,0.2)", color: NAVY }}
              onMouseEnter={(e) => { e.currentTarget.style.background = NAVY; e.currentTarget.style.color = "white"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = ""; e.currentTarget.style.color = NAVY; }}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="grid h-11 w-11 place-items-center rounded-full text-white shadow-md transition-all duration-300 hover:-translate-y-0.5"
              style={{ background: `linear-gradient(135deg, ${NAVY}, #2a50b8)` }}
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div
          className="mt-5 h-0.5 w-full overflow-hidden rounded-full"
          style={{ background: "rgba(27,58,138,0.1)" }}
        >
          <div
            key={`${active}-${paused}`}
            className="h-full rounded-full"
            style={{
              background: `linear-gradient(90deg, ${NAVY}, ${GOLD})`,
              animation: paused ? "none" : `testiProgress ${AUTOPLAY}ms linear forwards`,
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes testiProgress { from { width: 0%; } to { width: 100%; } }
        .testi-card { transition: all 0.45s cubic-bezier(0.22, 1, 0.36, 1); }
        @media (prefers-reduced-motion: reduce) { .testi-card { transition: none; } }
      `}</style>
    </section>
  );
};

export default TestimonialsSlider;

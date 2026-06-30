import { useCallback, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuoteRight,
  faStar,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const testimonials = [
  {
    name: "Rahim Construction",
    title: "Project Manager",
    company: "Chittagong residential project",
    rating: 5,
    text: "We sourced Fine Sand and Stone Chips from Kawsar Anher for a large residential block. The material quality was consistent, delivery was on time, and the price per CFT was the best we found in Chattogram. Will definitely order again.",
  },
  {
    name: "Al-Amin Builders",
    title: "Site Engineer",
    company: "Cumilla highway project",
    rating: 5,
    text: "The Coarse Sand and Boulder from Inqilab Trading Corporation met our civil engineering specifications. What impressed us most was the responsive communication — Kawsar Alam personally ensured our bulk order was dispatched within 24 hours.",
  },
  {
    name: "Dhaka Infrastructure Ltd.",
    title: "Procurement Head",
    company: "National highway contractor",
    rating: 5,
    text: "Quality aggregate at competitive rates. We've been sourcing Stone Chips 10–20mm for three major road construction projects. Kawsar Anher is now our go-to supplier for all construction aggregates in Bangladesh.",
  },
];

const AUTOPLAY_MS = 7000;
const SWIPE_THRESHOLD = 50;

const initialsOf = (name = "") =>
  name.split(" ").filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();

const TestimonialsSlider = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = testimonials.length;
  const touchStartX = useRef(null);
  const touchDeltaX = useRef(0);

  const goTo = useCallback((idx) => setActive(((idx % total) + total) % total), [total]);
  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, next]);

  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") prev();
    else if (e.key === "ArrowRight") next();
  };

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
    setPaused(true);
  };
  const onTouchMove = (e) => {
    if (touchStartX.current == null) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };
  const onTouchEnd = () => {
    const dx = touchDeltaX.current;
    if (Math.abs(dx) > SWIPE_THRESHOLD) dx < 0 ? next() : prev();
    touchStartX.current = null;
    touchDeltaX.current = 0;
    setPaused(false);
  };

  const current = testimonials[active];

  return (
    <section className="section-page relative overflow-hidden bg-safety-surface">
      <div className="pointer-events-none absolute -left-32 top-1/4 h-72 w-72 rounded-full bg-safety-red/5 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-safety-amber/5 blur-[120px]" />

      <div className="container-page relative z-10">
        <div className="mx-auto max-w-2xl text-center" data-aos="fade-up">
          <p className="eyebrow">Client Testimonials</p>
          <h2 className="heading-lg mt-3 text-balance">
            Trusted by builders across Bangladesh
          </h2>
          <div className="mt-5 inline-flex items-center gap-2.5 rounded-full border border-safety-border bg-white px-4 py-2 shadow-sm">
            <span className="flex items-center gap-0.5 text-safety-amber">
              {[...Array(5)].map((_, i) => (
                <FontAwesomeIcon key={i} icon={faStar} className="text-xs" />
              ))}
            </span>
            <span className="text-sm font-extrabold text-safety-ink">4.9/5</span>
            <span className="text-xs font-semibold text-safety-muted">average client rating</span>
          </div>
        </div>

        <div
          className="relative mx-auto mt-12 max-w-4xl"
          role="region"
          aria-roledescription="carousel"
          aria-label="Client testimonials"
          tabIndex={0}
          onKeyDown={onKeyDown}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="sp-testi-border relative rounded-[28px] p-[1.5px] shadow-[0_30px_80px_-40px_rgba(2,6,23,0.4)]">
            <div className="relative overflow-hidden rounded-[27px] bg-white px-6 py-10 md:px-14 md:py-14">
              <span className="pointer-events-none absolute -right-6 -top-8 select-none font-serif text-[180px] leading-none text-safety-red/[0.04] md:text-[240px]">"</span>
              <FontAwesomeIcon icon={faQuoteRight} className="pointer-events-none absolute right-8 top-8 text-4xl text-safety-red/20 md:text-5xl" />

              <div className="relative" aria-live="polite">
                <div key={active} className="sp-testi-slide">
                  <div className="flex items-center gap-1 text-safety-amber">
                    {[...Array(current.rating)].map((_, i) => (
                      <FontAwesomeIcon key={i} icon={faStar} className="text-sm" />
                    ))}
                  </div>
                  <blockquote className="mt-5 text-pretty text-lg font-medium leading-relaxed text-safety-ink sm:text-xl md:text-2xl md:leading-relaxed">
                    "{current.text}"
                  </blockquote>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-4 border-t border-safety-border pt-6">
                <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-safety-red to-safety-red-dark text-sm font-black text-white shadow-md ring-2 ring-safety-red/20 ring-offset-2">
                  {initialsOf(current.name)}
                </span>
                <div className="min-w-0">
                  <p className="truncate font-extrabold text-safety-ink">{current.name}</p>
                  <p className="truncate text-sm text-safety-muted">{current.title} · {current.company}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-7 flex flex-col items-center gap-5 sm:flex-row sm:justify-between">
            <div className="flex items-center gap-2" role="tablist">
              {testimonials.map((t, idx) => (
                <button
                  key={t.name}
                  type="button"
                  role="tab"
                  aria-selected={idx === active}
                  onClick={() => goTo(idx)}
                  className={`grid h-11 w-11 place-items-center rounded-full text-xs font-black transition-all duration-300 ${
                    idx === active
                      ? "scale-105 bg-safety-red text-white shadow-lg"
                      : "border border-safety-border bg-white text-safety-muted hover:border-safety-red/40 hover:text-safety-red"
                  }`}
                >
                  {initialsOf(t.name)}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold tabular-nums text-safety-muted">
                <span className="text-safety-ink">{String(active + 1).padStart(2, "0")}</span> / {String(total).padStart(2, "0")}
              </span>
              <button type="button" onClick={prev} aria-label="Previous" className="grid h-11 w-11 place-items-center rounded-full border border-safety-border bg-white text-safety-ink transition hover:-translate-y-0.5 hover:border-safety-red hover:text-safety-red">
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
              <button type="button" onClick={next} aria-label="Next" className="grid h-11 w-11 place-items-center rounded-full bg-safety-red text-white transition hover:-translate-y-0.5 hover:bg-safety-red-dark">
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </div>

          <div className="mt-5 h-0.5 w-full overflow-hidden rounded-full bg-safety-border">
            <div
              key={`${active}-${paused}`}
              className="h-full bg-safety-red"
              style={{ animation: paused ? "none" : `inqTestiProgress ${AUTOPLAY_MS}ms linear forwards` }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes inqTestiProgress {
          from { width: 0%; }
          to { width: 100%; }
        }
        .sp-testi-border {
          background: linear-gradient(120deg, #1B3A8A, #C49B2B, #2952CC, #1B3A8A);
          background-size: 300% 300%;
          animation: inqTestiFlow 7s ease infinite;
        }
        @keyframes inqTestiFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .sp-testi-slide { animation: spTestiSlideIn .5s cubic-bezier(.22,1,.36,1) both; }
        @keyframes spTestiSlideIn {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .sp-testi-border, .sp-testi-slide { animation: none; }
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSlider;

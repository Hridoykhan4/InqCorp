import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faArrowRight,
  faBolt,
} from "@fortawesome/free-solid-svg-icons";

// ── Ticker items ──────────────────────────────────────────────────────────────
const TICKER_ITEMS = [
  "Fine Sand (0.063–1mm)",
  "Stone Chips 5–10mm",
  "Boulder / Pathor 20mm+",
  "Coarse Sand (2–4.75mm)",
  "Medium Sand (1–2mm)",
  "Stone Chips 10–20mm",
];

// Trust badges
const TRUST_BADGES = [
  "ISO Certified",
  "500+ Projects",
  "Chattogram Based",
];

// ── Hero Section ──────────────────────────────────────────────────────────────
export const HeroSection = () => {
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);

  // Refs for GSAP
  const sectionRef    = useRef(null);
  const badgeRef      = useRef(null);
  const line1WrapRef  = useRef(null);
  const line1Ref      = useRef(null);
  const line2WrapRef  = useRef(null);
  const line2Ref      = useRef(null);
  const subtitleRef   = useRef(null);
  const ctaRef        = useRef(null);
  const trustRef      = useRef(null);
  const photoRef      = useRef(null);
  const photoLabelRef = useRef(null);
  const tickerRef     = useRef(null);
  const tickerTrackRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // ── Initial hidden states ──────────────────────────────────────────────
      gsap.set([line1Ref.current, line2Ref.current], { y: "115%" });
      gsap.set(
        [badgeRef.current, subtitleRef.current, ctaRef.current, trustRef.current],
        { y: 24, opacity: 0 }
      );
      gsap.set(photoRef.current, { x: 80, opacity: 0 });
      gsap.set(photoLabelRef.current, { y: 16, opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Badge kicker
      tl.to(badgeRef.current, { y: 0, opacity: 1, duration: 0.65 }, 0.1);

      // Headline lines
      tl.to(line1Ref.current, { y: "0%", duration: 0.9 }, 0.3);
      tl.to(line2Ref.current, { y: "0%", duration: 0.9 }, 0.45);

      // Subtitle
      tl.to(subtitleRef.current, { y: 0, opacity: 1, duration: 0.7 }, 0.7);

      // CTA
      tl.to(ctaRef.current, { y: 0, opacity: 1, duration: 0.65 }, 0.85);

      // Trust row
      tl.to(trustRef.current, { y: 0, opacity: 1, duration: 0.6 }, 1.0);

      // Photo slides in from right
      tl.to(photoRef.current, { x: 0, opacity: 1, duration: 1.1, ease: "power2.out" }, 0.35);
      tl.to(photoLabelRef.current, { y: 0, opacity: 1, duration: 0.7 }, 1.1);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Infinite ticker via CSS animation — no JS loop needed
  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #050d1f 0%, #0d1f4a 60%, #0a1633 100%)",
      }}
    >
      {/* ── Noise / grain overlay ───────────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          opacity: 0.5,
        }}
      />

      {/* ── Grid lines decoration ───────────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64'%3E%3Cpath d='M 64 0 L 0 0 0 64' fill='none' stroke='%23ffffff' stroke-width='0.4' stroke-opacity='0.04'/%3E%3C/svg%3E")`,
          backgroundSize: "64px 64px",
        }}
      />

      {/* ── Radial accent glow ──────────────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 20% 50%, rgba(196,155,43,0.07) 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 70% at 80% 45%, rgba(27,58,138,0.3) 0%, transparent 65%)",
        }}
      />

      {/* ── Left gold accent bar ─────────────────────────────────────────────── */}
      <div
        className="absolute inset-y-0 left-0 w-[3px]"
        style={{
          background: "linear-gradient(to bottom, transparent, #C49B2B 40%, #C49B2B 60%, transparent)",
          opacity: 0.6,
        }}
      />

      {/* ── Main content ────────────────────────────────────────────────────── */}
      <div className="container mx-auto flex flex-1 items-center px-4 py-20 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* ── LEFT: Copy ────────────────────────────────────────────────────── */}
          <div className="order-2 lg:order-1 max-w-2xl">

            {/* Badge kicker */}
            <div
              ref={badgeRef}
              style={{ opacity: 0 }}
              className="inline-flex items-center gap-2 rounded-full border border-[#C49B2B]/30 bg-[#C49B2B]/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#C49B2B]"
            >
              <FontAwesomeIcon icon={faBolt} className="text-[10px]" />
              Inqilab Trading Corporation
            </div>

            {/* Headline line 1 */}
            <div ref={line1WrapRef} className="mt-5 overflow-hidden">
              <h1
                ref={line1Ref}
                className="block text-[clamp(44px,7vw,88px)] font-black leading-[1.0] tracking-[-0.02em] text-white"
                style={{ willChange: "transform" }}
              >
                Build with
              </h1>
            </div>

            {/* Headline line 2 */}
            <div ref={line2WrapRef} className="overflow-hidden">
              <h1
                ref={line2Ref}
                className="block text-[clamp(44px,7vw,88px)] font-black leading-[1.0] tracking-[-0.02em]"
                style={{
                  willChange: "transform",
                  background: "linear-gradient(90deg, #C49B2B 0%, #e8c55a 50%, #C49B2B 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Strength
              </h1>
            </div>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              style={{ opacity: 0 }}
              className="mt-6 max-w-lg text-[15px] leading-7 text-white/65 sm:text-base sm:leading-8"
            >
              Premium sand and stone aggregates sourced and supplied across
              Chattogram, Bangladesh. Fine sands to boulder — every grade,
              every project, delivered on time.
            </p>

            {/* CTA buttons */}
            <div
              ref={ctaRef}
              style={{ opacity: 0 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              {/* Primary CTA */}
              <button
                type="button"
                onClick={() => navigate("/all-products")}
                className="hero-cta-primary group relative inline-flex items-center gap-2.5 overflow-hidden rounded-xl px-7 py-4 text-sm font-bold text-white transition-all duration-300 sm:text-base"
                style={{ background: "linear-gradient(135deg, #1B3A8A 0%, #2a50b8 100%)" }}
              >
                <span className="relative z-10">View Products</span>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                />
                <span className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </button>

              {/* Secondary CTA */}
              <button
                type="button"
                onClick={() => navigate("/contact")}
                className="inline-flex items-center gap-2.5 rounded-xl border-2 border-white/20 px-7 py-[14px] text-sm font-bold text-white/80 transition-all duration-300 hover:border-[#C49B2B] hover:text-[#C49B2B] sm:text-base"
              >
                Get Quote
              </button>
            </div>

            {/* Trust badges */}
            <div
              ref={trustRef}
              style={{ opacity: 0 }}
              className="mt-9 flex flex-wrap items-center gap-5"
            >
              {TRUST_BADGES.map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-2 text-[12px] font-semibold text-white/60"
                >
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="text-[#C49B2B]"
                  />
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* ── RIGHT: CEO photo ──────────────────────────────────────────────── */}
          <div className="order-1 flex flex-col items-center lg:order-2 lg:items-end">
            {/* Photo frame wrapper */}
            <div
              ref={photoRef}
              style={{ opacity: 0 }}
              className="relative"
            >
              {/* Outer glow ring */}
              <div
                className="absolute -inset-3 rounded-3xl"
                style={{
                  background:
                    "linear-gradient(135deg, #C49B2B 0%, transparent 50%, #1B3A8A 100%)",
                  opacity: 0.5,
                  filter: "blur(12px)",
                }}
              />

              {/* Golden border ring */}
              <div
                className="relative rounded-3xl p-[3px]"
                style={{
                  background:
                    "linear-gradient(135deg, #C49B2B 0%, #e8c55a 40%, #9a7520 70%, #C49B2B 100%)",
                }}
              >
                {/* Inner navy padding */}
                <div
                  className="rounded-[22px] p-[3px]"
                  style={{ background: "#050d1f" }}
                >
                  {/* Photo / fallback */}
                  {imgError ? (
                    <div
                      className="flex h-[360px] w-[300px] items-center justify-center rounded-[20px] sm:h-[420px] sm:w-[340px] lg:h-[460px] lg:w-[380px]"
                      style={{
                        background: "linear-gradient(135deg, #1B3A8A 0%, #0d1f4a 100%)",
                      }}
                    >
                      <span
                        className="text-7xl font-black text-[#C49B2B]"
                        style={{ fontFamily: "serif" }}
                      >
                        KA
                      </span>
                    </div>
                  ) : (
                    <img
                      src="/kawsar-alam.jpg"
                      alt="Kawsar Alam — Founder & CEO"
                      onError={() => setImgError(true)}
                      className="h-[360px] w-[300px] rounded-[20px] object-cover object-top sm:h-[420px] sm:w-[340px] lg:h-[460px] lg:w-[380px]"
                      draggable={false}
                    />
                  )}
                </div>
              </div>

              {/* Corner accent dots */}
              <div
                className="absolute -left-1.5 -top-1.5 h-3 w-3 rounded-full"
                style={{ background: "#C49B2B" }}
              />
              <div
                className="absolute -right-1.5 -top-1.5 h-3 w-3 rounded-full"
                style={{ background: "#C49B2B" }}
              />
              <div
                className="absolute -bottom-1.5 -left-1.5 h-3 w-3 rounded-full"
                style={{ background: "#C49B2B", opacity: 0.5 }}
              />
              <div
                className="absolute -bottom-1.5 -right-1.5 h-3 w-3 rounded-full"
                style={{ background: "#C49B2B", opacity: 0.5 }}
              />
            </div>

            {/* Name label beneath photo */}
            <div
              ref={photoLabelRef}
              style={{
                opacity: 0,
                background: "rgba(27,58,138,0.6)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(196,155,43,0.3)",
              }}
              className="mt-5 flex flex-col items-center gap-1.5 rounded-2xl px-6 py-3"
            >
              <span className="text-[15px] font-bold text-white">
                Kawsar Alam
              </span>
              <span className="text-[12px] font-semibold tracking-wide text-[#C49B2B]">
                Founder &amp; CEO
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom ticker strip ──────────────────────────────────────────────── */}
      <div
        ref={tickerRef}
        className="relative w-full overflow-hidden border-t py-3"
        style={{
          borderColor: "rgba(196,155,43,0.2)",
          background: "rgba(196,155,43,0.06)",
        }}
      >
        {/* Fade edges */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24"
          style={{
            background:
              "linear-gradient(to right, #050d1f, transparent)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24"
          style={{
            background:
              "linear-gradient(to left, #050d1f, transparent)",
          }}
        />

        {/* Scrolling track — duplicated for seamless loop */}
        <div ref={tickerTrackRef} className="ticker-track flex items-center whitespace-nowrap">
          {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-4 px-6 text-[13px] font-semibold uppercase tracking-[0.18em] text-white/50"
            >
              {item}
              <span
                className="inline-block h-1 w-1 rounded-full"
                style={{ background: "#C49B2B", opacity: 0.7 }}
              />
            </span>
          ))}
        </div>
      </div>

      <style>{`
        .ticker-track {
          animation: tickerScroll 28s linear infinite;
          will-change: transform;
        }
        @keyframes tickerScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.3333%); }
        }
        .ticker-track:hover {
          animation-play-state: paused;
        }
        .hero-cta-primary {
          box-shadow: 0 4px 24px rgba(27,58,138,0.5);
          will-change: transform;
          transition: filter 0.25s ease, transform 0.2s ease, box-shadow 0.25s ease;
        }
        .hero-cta-primary:hover {
          filter: brightness(1.12);
          transform: translateY(-1px);
          box-shadow: 0 8px 32px rgba(27,58,138,0.7);
        }
        @media (prefers-reduced-motion: reduce) {
          .ticker-track { animation: none; }
          .hero-cta-primary { transition: none; }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;

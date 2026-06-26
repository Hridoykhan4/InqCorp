import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

// ── Blueprint SVG background (data URI, zero HTTP request) ──────────────────
const BLUEPRINT_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='72' height='72'%3E%3Cpath d='M 72 0 L 0 0 0 72' fill='none' stroke='%23ffffff' stroke-width='0.45' stroke-opacity='0.055'/%3E%3Cpath d='M 36 0 L 36 72 M 0 36 L 72 36' fill='none' stroke='%23ffffff' stroke-width='0.25' stroke-opacity='0.025'/%3E%3C/svg%3E")`;

// ── Trust badges ─────────────────────────────────────────────────────────────
const BADGES = ["BNBC 2020", "NFPA 13", "NFPA 14", "BFS Reg."];

export const HeroSection = () => {
  const navigate = useNavigate();

  const sectionRef = useRef(null);
  const line1WrapRef = useRef(null);
  const line1Ref    = useRef(null);
  const line2WrapRef = useRef(null);
  const line2Ref    = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef      = useRef(null);
  const badgesRef   = useRef(null);
  const decorRef    = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Lock initial states — wrappers are overflow:hidden so text is already
      // invisible in the clip; no opacity:0 needed (avoids flash of invisible
      // text for search engine crawlers on the description para).
      gsap.set([line1Ref.current, line2Ref.current], { y: "110%" });
      gsap.set([subtitleRef.current, ctaRef.current, badgesRef.current], {
        y: 28, opacity: 0,
      });
      gsap.set(decorRef.current, { opacity: 0, x: 30 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // ── Headline lines slam up one after the other ───────────────────────
      tl.to([line1Ref.current, line2Ref.current], {
        y: "0%",
        duration: 0.95,
        stagger: 0.14,
      }, 0.1);

      // Subtitle
      tl.to(subtitleRef.current, {
        y: 0, opacity: 1, duration: 0.75,
      }, 0.55);

      // CTA row
      tl.to(ctaRef.current, {
        y: 0, opacity: 1, duration: 0.7,
      }, 0.72);

      // Trust badges
      tl.to(badgesRef.current, {
        y: 0, opacity: 1, duration: 0.65,
      }, 0.88);

      // Right decorative SVG diagram
      tl.to(decorRef.current, {
        opacity: 1, x: 0, duration: 1.1, ease: "power2.out",
      }, 0.3);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hs-root relative flex min-h-[100svh] items-center overflow-hidden bg-[#0F1117]"
    >
      {/* Blueprint grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: BLUEPRINT_BG, backgroundSize: "72px 72px" }}
      />

      {/* Left-edge structural red line */}
      <div className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-transparent via-[#D32F2F] to-transparent opacity-50" />

      {/* Radial depth vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(70% 80% at 55% 50%, transparent 40%, rgba(10,12,15,0.72) 100%)" }} />

      {/* ── Content grid ── */}
      <div className="container-page relative z-10 w-full py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_480px]">

          {/* ── LEFT: Typography ── */}
          <div className="max-w-3xl">

            {/* Kicker */}
            <div className="overflow-hidden">
              <p
                ref={subtitleRef}
                style={{ opacity: 0 }}
                className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#D32F2F] sm:text-xs"
              >
                <span className="inline-block h-[1px] w-6 bg-[#D32F2F]" />
                Bangladesh's Industrial Fire Safety Leader
              </p>
            </div>

            {/* ── Headline line 1 (overflow clip — zero reflow) ── */}
            <div ref={line1WrapRef} className="overflow-hidden mt-5">
              <h1
                ref={line1Ref}
                className="hs-headline text-[clamp(36px,6.5vw,80px)] font-black leading-[1.03] tracking-[-0.02em] text-white"
                style={{ willChange: "transform" }}
              >
                Securing Lives.
              </h1>
            </div>

            {/* ── Headline line 2 ── */}
            <div ref={line2WrapRef} className="overflow-hidden">
              <h1
                ref={line2Ref}
                className="hs-headline text-[clamp(36px,6.5vw,80px)] font-black leading-[1.03] tracking-[-0.02em] text-[#D32F2F]"
                style={{ willChange: "transform" }}
              >
                Shielding Infrastructure.
              </h1>
            </div>

            {/* Description — always visible; no animation; fully SEO-indexed */}
            <p className="mt-6 max-w-xl text-pretty text-[14px] leading-7 text-white/68 sm:text-base sm:leading-8">
              SafetyPlus engineers and manufactures UL-grade fire doors, hydrant
              systems, sprinkler installations, steel cable trays, and industrial
              hose cabinets — BNBC and NFPA compliant, delivered across Bangladesh.
            </p>

            {/* CTA row */}
            <div ref={ctaRef} style={{ opacity: 0 }} className="mt-9 flex flex-wrap items-center gap-3">
              {/* Primary CTA */}
              <button
                type="button"
                onClick={() => navigate("/contact")}
                className="hs-cta-primary group relative inline-flex items-center gap-3 overflow-hidden bg-[#D32F2F] px-8 py-4 text-sm font-bold text-white sm:text-base"
              >
                <span className="relative z-10">Request Quote</span>
                <svg
                  className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  viewBox="0 0 16 16" fill="none" aria-hidden="true"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {/* Overlay shimmer on hover */}
                <span className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </button>

              {/* Secondary CTA */}
              <button
                type="button"
                onClick={() => navigate("/all-products")}
                className="inline-flex items-center gap-2 border border-white/18 px-6 py-4 text-sm font-semibold text-white/80 transition hover:border-white/35 hover:text-white sm:text-base"
              >
                View Products
              </button>
            </div>

            {/* Trust badges */}
            <div ref={badgesRef} style={{ opacity: 0 }} className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/28">
                Compliant With
              </span>
              {BADGES.map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold text-white/55"
                >
                  <span className="h-1 w-1 rounded-full bg-[#D32F2F] opacity-70" />
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Abstract structural SVG diagram (desktop only) ── */}
          <div
            ref={decorRef}
            style={{ opacity: 0 }}
            className="hidden lg:flex lg:items-center lg:justify-center"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 400 400"
              className="hs-diagram w-full max-w-[400px]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer building boundary */}
              <rect x="40" y="40" width="320" height="320" stroke="rgba(211,47,47,0.35)" strokeWidth="1" />
              {/* Floor dividers */}
              <line x1="40" y1="147" x2="360" y2="147" stroke="rgba(255,255,255,0.1)" strokeWidth="0.6" />
              <line x1="40" y1="254" x2="360" y2="254" stroke="rgba(255,255,255,0.1)" strokeWidth="0.6" />
              {/* Vertical core */}
              <line x1="200" y1="40" x2="200" y2="360" stroke="rgba(255,255,255,0.08)" strokeWidth="0.6" />
              {/* Corridor lines */}
              <line x1="120" y1="40" x2="120" y2="360" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" strokeDasharray="4 8" />
              <line x1="280" y1="40" x2="280" y2="360" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" strokeDasharray="4 8" />
              {/* Fire sprinkler heads — small "+" markers */}
              {[
                [80, 93], [160, 93], [240, 93], [320, 93],
                [80, 200], [160, 200], [240, 200], [320, 200],
                [80, 307], [160, 307], [240, 307], [320, 307],
              ].map(([cx, cy], i) => (
                <g key={i}>
                  <line x1={cx - 6} y1={cy} x2={cx + 6} y2={cy} stroke="#D32F2F" strokeWidth="1" opacity="0.55" />
                  <line x1={cx} y1={cy - 6} x2={cx} y2={cy + 6} stroke="#D32F2F" strokeWidth="1" opacity="0.55" />
                  <circle cx={cx} cy={cy} r="2.5" stroke="#D32F2F" strokeWidth="0.8" opacity="0.4" />
                </g>
              ))}
              {/* Emergency door markers */}
              {[[40, 200], [360, 200]].map(([x, y], i) => (
                <rect key={i} x={i === 0 ? x - 2 : x - 10} y={y - 12} width={12} height={24}
                  fill="rgba(211,47,47,0.22)" stroke="#D32F2F" strokeWidth="1" />
              ))}
              {/* Corner ticks */}
              {[[40, 40], [360, 40], [40, 360], [360, 360]].map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r="3" fill="#D32F2F" opacity="0.55" />
              ))}
              {/* Blueprint label */}
              <text x="200" y="385" textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.2)"
                fontFamily="Sora, monospace" letterSpacing="3">
                FIRE SAFETY LAYOUT — TYPICAL FLOOR
              </text>
              {/* Zone labels */}
              {[
                [80, 120, "ZONE A"],
                [160, 120, "ZONE B"],
                [240, 120, "ZONE C"],
                [320, 120, "ZONE D"],
              ].map(([x, y, label]) => (
                <text key={label} x={x} y={y} textAnchor="middle" fontSize="6"
                  fill="rgba(255,255,255,0.15)" fontFamily="Sora, monospace" letterSpacing="2">
                  {label}
                </text>
              ))}
            </svg>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="hs-scroll-cue flex flex-col items-center gap-1.5">
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/25">Scroll</span>
            <svg className="h-4 w-4 text-white/20 hs-bounce" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      <style>{`
        .hs-headline {
          display: block;
        }
        .hs-cta-primary {
          will-change: transform;
          transition: filter 0.25s ease;
        }
        .hs-cta-primary:hover {
          filter: brightness(1.1);
        }
        .hs-diagram {
          opacity: 0.55;
        }
        .hs-bounce {
          animation: hsBounce 1.8s ease-in-out infinite;
        }
        @keyframes hsBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(4px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hs-bounce { animation: none; }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useHeroicEntry } from "../hooks/useHeroicEntry";

gsap.registerPlugin(ScrollTrigger);

// ── Metrics data ──────────────────────────────────────────────────────────────
const METRICS = [
  {
    value: 500000,
    suffix: "+",
    label: "Sq. Ft. Protected",
    sub: "Factory & warehouse floor area covered under active fire suppression",
    format: (v) => (v >= 1000 ? (v / 1000).toFixed(0) + "K" : v.toString()),
  },
  {
    value: 2500,
    suffix: "+",
    label: "Projects Completed",
    sub: "End-to-end fire safety installations delivered across Bangladesh",
    format: (v) => v.toLocaleString(),
  },
  {
    value: 4,
    suffix: "",
    label: "Safety Standards",
    sub: "BNBC 2020 · NFPA 13 · NFPA 14 · BFS Registration",
    format: (v) => v.toString(),
  },
  {
    value: 15,
    suffix: "+",
    label: "Years in Bangladesh",
    sub: "Local manufacturing, local engineering, and local accountability",
    format: (v) => v.toString(),
  },
];

// ── Animated counter card ─────────────────────────────────────────────────────
const MetricCard = ({ metric }) => {
  const numRef = useRef(null);

  useEffect(() => {
    if (!numRef.current) return;
    const counter = { val: 0 };
    const anim = gsap.to(counter, {
      val: metric.value,
      duration: 1.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: numRef.current,
        start: "top 88%",
        once: true,
      },
      onUpdate() {
        if (numRef.current) {
          numRef.current.textContent =
            metric.format(Math.round(counter.val)) + metric.suffix;
        }
      },
    });
    return () => anim.kill();
  }, [metric]);

  return (
    <div
      data-heroic-item
      className="ms-card group relative overflow-hidden border border-white/8 bg-[#14141A] p-7"
      style={{ willChange: "transform, opacity" }}
    >
      {/* Top accent fill on hover */}
      <span className="ms-accent absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-[#D32F2F] transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />

      {/* Counter */}
      <p
        ref={numRef}
        className="ms-num text-[clamp(36px,5vw,56px)] font-black leading-none tracking-tight text-white"
        aria-label={`${metric.value}${metric.suffix} ${metric.label}`}
      >
        0{metric.suffix}
      </p>

      {/* Divider */}
      <div className="mt-4 h-px w-10 bg-[#D32F2F] transition-all duration-500 group-hover:w-16" />

      {/* Label */}
      <p className="mt-4 text-[13px] font-bold uppercase tracking-[0.14em] text-white/75">
        {metric.label}
      </p>

      {/* Sub */}
      <p className="mt-2 text-[12px] leading-5 text-white/38">{metric.sub}</p>
    </div>
  );
};

// ── Section ───────────────────────────────────────────────────────────────────
const MetricShield = () => {
  const sectionRef = useHeroicEntry({ itemStagger: 0.1, start: "top 80%" });

  return (
    <section ref={sectionRef} className="ms-section relative overflow-hidden bg-[#0F1117] py-20 sm:py-28">
      {/* Grid bg */}
      <div className="ms-grid absolute inset-0 pointer-events-none" />

      {/* Red structural left accent */}
      <div className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-transparent via-[#D32F2F]/45 to-transparent" />

      <div className="container-page relative z-10">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p data-heroic-eyebrow className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#D32F2F] sm:text-xs">
            Measured Impact
          </p>
          <h2 data-heroic-title className="mt-3 text-balance text-[26px] font-black leading-[1.1] tracking-tight text-white sm:text-3xl md:text-4xl">
            Scale Built on Real Engineering
          </h2>
          <p className="mt-4 text-sm leading-7 text-white/52 sm:text-base">
            Numbers independently verifiable — not marketing estimates.
          </p>
        </div>

        {/* 4-col metric grid */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:mt-16">
          {METRICS.map((m) => (
            <MetricCard key={m.label} metric={m} />
          ))}
        </div>
      </div>

      <style>{`
        .ms-grid {
          background-image:
            linear-gradient(rgba(211,47,47,.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(211,47,47,.05) 1px, transparent 1px);
          background-size: 56px 56px;
        }
        .ms-num {
          text-shadow: 0 0 28px rgba(255,255,255,0.08);
          will-change: contents;
        }
        .ms-card {
          transition:
            border-color 0.28s ease,
            box-shadow 0.28s ease;
        }
        .ms-card:hover {
          border-color: rgba(211,47,47,0.22);
          box-shadow: 0 8px 32px -12px rgba(211,47,47,0.18);
        }
        @media (prefers-reduced-motion: reduce) {
          .ms-card { transition: none; }
        }
      `}</style>
    </section>
  );
};

export default MetricShield;

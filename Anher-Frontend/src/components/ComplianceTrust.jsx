import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useHeroicEntry } from "../hooks/useHeroicEntry";

gsap.registerPlugin(ScrollTrigger);

// ── Standards data ────────────────────────────────────────────────────────────
const STANDARDS = [
  {
    code: "BNBC 2020",
    label: "Bangladesh National Building Code",
    scope: "Chapter 4 Fire Safety — Full Compliance",
    pct: 100,
  },
  {
    code: "NFPA 13",
    label: "Installation of Automatic Sprinkler Systems",
    scope: "Design, Installation & Inspection",
    pct: 100,
  },
  {
    code: "NFPA 14",
    label: "Installation of Standpipe & Hose Systems",
    scope: "Class I · II · III Systems",
    pct: 100,
  },
  {
    code: "BFS",
    label: "Bangladesh Fire Service & Civil Defence",
    scope: "Licensed Contractor Registration",
    pct: 100,
  },
];

// ── Individual animated bar ───────────────────────────────────────────────────
const StandardRow = ({ standard, index }) => {
  const barRef = useRef(null);
  const numRef = useRef(null);

  useEffect(() => {
    if (!barRef.current) return;

    const counter = { val: 0 };
    const anim = gsap.to(counter, {
      val: standard.pct,
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: barRef.current,
        start: "top 88%",
        once: true,
      },
      onUpdate() {
        if (numRef.current) {
          numRef.current.textContent = Math.round(counter.val) + "%";
        }
        if (barRef.current) {
          barRef.current.style.width = counter.val + "%";
        }
      },
    });

    return () => anim.kill();
  }, [standard.pct]);

  return (
    <div
      data-heroic-item
      className="ct-row group"
      style={{
        "--delay": `${index * 0.08}s`,
        willChange: "transform, opacity",
      }}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="ct-code">{standard.code}</span>
            <span className="ct-dot" />
            <span className="ct-scope">{standard.scope}</span>
          </div>
          <p className="ct-label">{standard.label}</p>
        </div>
        <span ref={numRef} className="ct-num shrink-0">0%</span>
      </div>

      {/* Bar track */}
      <div className="ct-track mt-3">
        <div
          ref={barRef}
          className="ct-bar"
          style={{ width: "0%" }}
          role="progressbar"
          aria-valuenow={standard.pct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${standard.code} compliance`}
        />
      </div>
    </div>
  );
};

// ── Section ───────────────────────────────────────────────────────────────────
const ComplianceTrust = () => {
  const sectionRef = useHeroicEntry({ itemStagger: 0.08, start: "top 80%" });

  return (
    <section ref={sectionRef} className="ct-section relative overflow-hidden bg-[#0A0C0F] py-20 sm:py-28">
      {/* Grid */}
      <div className="ct-grid absolute inset-0 pointer-events-none" />

      <div className="container-page relative z-10">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-[380px_1fr] lg:gap-16 xl:grid-cols-[420px_1fr]">

          {/* ── Left: Heading ── */}
          <div>
            <p data-heroic-eyebrow className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#D32F2F] sm:text-xs">
              Regulatory Compliance
            </p>
            <h2 data-heroic-title className="mt-3 text-balance text-[24px] font-black leading-[1.1] tracking-tight text-white sm:text-3xl md:text-4xl">
              Built to Every Standard That Matters.
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/52 sm:text-base">
              Every installation leaves the factory pre-certified against
              Bangladeshi and international fire safety codes. No workarounds.
              No shortcuts.
            </p>

            {/* Shield badge */}
            <div className="ct-badge mt-8 inline-flex items-center gap-3 border border-[#D32F2F]/30 bg-[#D32F2F]/08 px-4 py-3">
              <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 shrink-0" aria-hidden="true">
                <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.25C16.5 22.15 20 17.25 20 12V6l-8-4z"
                  stroke="#D32F2F" strokeWidth="1.5" strokeLinejoin="round" />
                <polyline points="8.5,12 11,14.5 15.5,10" stroke="#D32F2F" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div>
                <p className="text-xs font-bold text-white/85">Zero Compliance Gaps</p>
                <p className="text-[11px] text-white/40">Verified by BFS-registered engineers</p>
              </div>
            </div>
          </div>

          {/* ── Right: Standards matrix ── */}
          <div className="flex flex-col gap-7">
            {STANDARDS.map((s, i) => (
              <StandardRow key={s.code} standard={s} index={i} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .ct-grid {
          background-image:
            linear-gradient(rgba(211,47,47,.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(211,47,47,.04) 1px, transparent 1px);
          background-size: 56px 56px;
        }

        .ct-row {
          padding-bottom: 1.5rem;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .ct-row:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .ct-code {
          font: 700 11px/1 "Sora", monospace;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #D32F2F;
        }
        .ct-dot {
          display: inline-block;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: rgba(255,255,255,0.25);
        }
        .ct-scope {
          font: 600 11px/1 "Sora", system-ui, sans-serif;
          color: rgba(255,255,255,0.38);
          letter-spacing: 0.04em;
        }
        .ct-label {
          margin: 4px 0 0;
          font: 500 13px/1.4 "Sora", system-ui, sans-serif;
          color: rgba(255,255,255,0.65);
        }
        .ct-num {
          font: 700 clamp(15px,2.5vw,18px)/1 "Sora", monospace;
          color: #D32F2F;
          text-shadow: 0 0 12px rgba(211,47,47,0.5);
          will-change: contents;
        }

        .ct-track {
          height: 3px;
          background: rgba(255,255,255,0.07);
          border-radius: 999px;
          overflow: hidden;
        }
        .ct-bar {
          height: 100%;
          background: linear-gradient(90deg, #7f1d1d, #D32F2F 70%, #f87171);
          border-radius: 999px;
          box-shadow: 0 0 8px rgba(211,47,47,0.7);
          will-change: width;
        }

        .ct-badge {
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
      `}</style>
    </section>
  );
};

export default ComplianceTrust;

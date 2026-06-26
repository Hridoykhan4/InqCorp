import { useRef } from "react";
import CountUp from "react-countup";

// SafetyPlus in numbers — clean, light, classic. Matches the rest of the page.
// Update these once real figures are confirmed.
const STATS = [
  { value: 250, suffix: "+", label: "Team Members" },
  { value: 60, suffix: "+", label: "Expert Engineers" },
  { value: 2500, suffix: "+", label: "Projects Delivered" },
];

// 3D tilt card — follows the pointer for a real sense of depth.
const TiltCard = ({ stat, index }) => {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--rx", `${(-py * 10).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(px * 12).toFixed(2)}deg`);
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  const reset = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <div className="sp-tilt-wrap" style={{ perspective: "900px" }}>
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={reset}
        data-aos="fade-up"
        data-aos-delay={index * 120}
        className="sp-tilt group relative overflow-hidden rounded-3xl border border-safety-border bg-white px-6 py-10 text-center shadow-[0_20px_50px_-30px_rgba(2,6,23,0.4)] transition-shadow duration-300 hover:shadow-[0_40px_80px_-30px_rgba(185,28,28,0.35)]"
      >
        {/* pointer glow */}
        <span className="sp-tilt-glow pointer-events-none absolute h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-safety-red/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
        {/* top accent */}
        <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-safety-red to-safety-amber transition-transform duration-500 group-hover:scale-x-100" />

        <div className="sp-tilt-inner relative">
          <p className="bg-gradient-to-br from-safety-red to-safety-red-dark bg-clip-text text-6xl font-black leading-none tracking-tight text-transparent md:text-7xl">
            <CountUp
              end={stat.value}
              duration={2.4}
              separator=","
              suffix={stat.suffix}
              enableScrollSpy
              scrollSpyOnce
            />
          </p>
          <span className="mx-auto mt-5 block h-1 w-10 rounded-full bg-safety-amber transition-all duration-500 group-hover:w-20" />
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-safety-muted sm:text-sm">
            {stat.label}
          </p>
        </div>
      </div>
    </div>
  );
};

const CompanyStats = () => {
  return (
    <section className="section-page relative overflow-hidden bg-gradient-to-b from-white via-safety-surface/40 to-white">
      <div className="container-page relative">
        <div className="mx-auto max-w-2xl text-center" data-aos="fade-up">
          <p className="eyebrow text-safety-red">SafetyPlus in Numbers</p>
          <h2 className="heading-lg mt-3 text-balance">
            Scale procurement teams can trust
          </h2>
          <p className="body-lead mx-auto mt-4 max-w-lg">
            Local manufacturing, engineering depth, and delivered projects across
            Bangladesh — measured, not marketed.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-3 md:mt-16 md:gap-6">
          {STATS.map((stat, i) => (
            <TiltCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        .sp-tilt {
          transform: rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg));
          transform-style: preserve-3d;
          transition: transform .15s ease-out, box-shadow .3s ease;
          will-change: transform;
        }
        .sp-tilt-inner { transform: translateZ(40px); }
        .sp-tilt-glow { left: var(--mx, 50%); top: var(--my, 50%); }
        @media (prefers-reduced-motion: reduce) {
          .sp-tilt { transform: none !important; }
        }
      `}</style>
    </section>
  );
};

export default CompanyStats;

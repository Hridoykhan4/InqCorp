import { useRef } from "react";
import CountUp from "react-countup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHardHat,
  faCalendarCheck,
  faLayerGroup,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";

// ── Stat definitions ──────────────────────────────────────────────────────────
const STATS = [
  {
    icon: faHardHat,
    value: 500,
    suffix: "+",
    label: "Projects Delivered",
    desc: "Construction sites supplied across Chattogram and beyond.",
  },
  {
    icon: faCalendarCheck,
    value: 10,
    suffix: "+",
    label: "Years Experience",
    desc: "Over a decade supplying Bangladesh's construction sector.",
  },
  {
    icon: faLayerGroup,
    value: 6,
    suffix: "",
    label: "Product Variants",
    desc: "From fine sand to boulder — every grade covered.",
  },
  {
    icon: faShieldHalved,
    value: 100,
    suffix: "%",
    label: "Quality Assured",
    desc: "Every batch tested and certified before dispatch.",
  },
];

// ── Individual stat card ──────────────────────────────────────────────────────
const StatCard = ({ stat, index }) => {
  const cardRef = useRef(null);

  const onMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--rx", `${(-py * 8).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(px * 10).toFixed(2)}deg`);
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  const onMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <div className="cs-tilt-wrap" style={{ perspective: "900px" }}>
      <div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        data-aos="fade-up"
        data-aos-delay={index * 120}
        className="cs-card group relative overflow-hidden rounded-2xl p-8 text-center transition-shadow duration-300"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(4px)",
        }}
      >
        {/* Pointer glow */}
        <span
          className="cs-glow pointer-events-none absolute h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
          style={{
            background: "rgba(196,155,43,0.15)",
            opacity: 0,
            transition: "opacity 0.3s",
          }}
        />

        {/* Gold top accent bar — slides in on hover */}
        <span
          className="absolute inset-x-0 top-0 h-[3px] origin-left cs-accent-bar"
          style={{
            background: "linear-gradient(90deg, #C49B2B, #e8c55a, #C49B2B)",
            transform: "scaleX(0)",
            transition: "transform 0.45s ease",
          }}
        />

        {/* Content */}
        <div className="cs-inner relative">
          {/* Icon */}
          <div
            className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl"
            style={{
              background: "rgba(196,155,43,0.12)",
              border: "1px solid rgba(196,155,43,0.2)",
            }}
          >
            <FontAwesomeIcon
              icon={stat.icon}
              className="text-xl"
              style={{ color: "#C49B2B" }}
            />
          </div>

          {/* Number */}
          <p
            className="text-[clamp(44px,5vw,64px)] font-black leading-none tracking-tight"
            style={{
              background: "linear-gradient(135deg, #C49B2B 0%, #e8c55a 50%, #C49B2B 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            <CountUp
              end={stat.value}
              duration={2.2}
              separator=","
              suffix={stat.suffix}
              enableScrollSpy
              scrollSpyOnce
            />
          </p>

          {/* Animated gold bar */}
          <span
            className="cs-underbar mx-auto mt-4 block h-[3px] rounded-full"
            style={{
              background: "#C49B2B",
              width: "2rem",
              transition: "width 0.4s ease",
            }}
          />

          {/* Label */}
          <p className="mt-4 text-[13px] font-bold uppercase tracking-[0.2em] text-white">
            {stat.label}
          </p>

          {/* Description */}
          <p className="mt-2 text-[13px] leading-5 text-white/50">
            {stat.desc}
          </p>
        </div>
      </div>
    </div>
  );
};

// ── Main Section ──────────────────────────────────────────────────────────────
const CompanyStats = () => {
  return (
    <section
      className="relative overflow-hidden py-20 lg:py-28"
      style={{
        background: "linear-gradient(135deg, #0F2257 0%, #1B3A8A 60%, #0F2257 100%)",
      }}
    >
      {/* ── Grain texture overlay ────────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      {/* ── Grid dot pattern ─────────────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Ccircle cx='24' cy='24' r='1' fill='%23ffffff' opacity='0.05'/%3E%3C/svg%3E")`,
          backgroundSize: "48px 48px",
        }}
      />

      {/* ── Radial glows ─────────────────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 10% 50%, rgba(196,155,43,0.08) 0%, transparent 60%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 90% 50%, rgba(196,155,43,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="container mx-auto px-4 sm:px-8 lg:px-12">

        {/* ── Section header ─────────────────────────────────────────────── */}
        <div className="mb-14 text-center" data-aos="fade-up">
          <p
            className="inline-block text-[11px] font-bold uppercase tracking-[0.28em]"
            style={{ color: "#C49B2B" }}
          >
            Inqilab Trading Corporation
          </p>
          <h2 className="mt-3 text-[clamp(28px,4vw,44px)] font-black leading-tight tracking-tight text-white">
            By the Numbers
          </h2>
          <div className="mx-auto mt-4 flex items-center justify-center gap-2">
            <span
              className="block h-[3px] w-12 rounded-full"
              style={{ background: "#C49B2B" }}
            />
            <span
              className="block h-2 w-2 rounded-full"
              style={{ background: "#C49B2B" }}
            />
            <span
              className="block h-[3px] w-12 rounded-full"
              style={{ background: "#C49B2B" }}
            />
          </div>
          <p className="mx-auto mt-4 max-w-lg text-[15px] leading-7 text-white/55">
            Track record built on reliable delivery, consistent quality, and
            deep knowledge of Bangladesh's construction aggregate market.
          </p>
        </div>

        {/* ── Stat cards ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        .cs-card {
          transform: rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
          transform-style: preserve-3d;
          transition: transform 0.15s ease-out, box-shadow 0.3s ease;
          will-change: transform;
        }
        .cs-inner {
          transform: translateZ(32px);
        }
        .cs-glow {
          left: var(--mx, 50%);
          top: var(--my, 50%);
        }
        .cs-card:hover .cs-glow {
          opacity: 1 !important;
        }
        .cs-card:hover .cs-accent-bar {
          transform: scaleX(1) !important;
        }
        .cs-card:hover .cs-underbar {
          width: 4rem !important;
        }
        @media (prefers-reduced-motion: reduce) {
          .cs-card { transform: none !important; }
          .cs-card:hover .cs-accent-bar { transform: none !important; }
        }
      `}</style>
    </section>
  );
};

export default CompanyStats;

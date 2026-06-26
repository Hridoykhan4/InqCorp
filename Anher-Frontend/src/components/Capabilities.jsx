import { useNavigate } from "react-router-dom";
import { useHeroicEntry } from "../hooks/useHeroicEntry";

// ── Inline SVG icons — zero external dependency ───────────────────────────────
const IconSprinkler = () => (
  <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" className="cap-icon">
    <circle cx="20" cy="14" r="5" stroke="#D32F2F" strokeWidth="1.6" />
    <line x1="20" y1="19" x2="20" y2="28" stroke="#D32F2F" strokeWidth="1.6" />
    {[[-6, 26, -30], [0, 28, 0], [6, 26, 30]].map(([dx, y, rot], i) => (
      <line key={i}
        x1={20} y1={28} x2={20 + dx} y2={y + 6}
        stroke="#D32F2F" strokeWidth="1.3" strokeLinecap="round"
        transform={`rotate(${rot} 20 28)`}
      />
    ))}
    <circle cx="20" cy="14" r="2" fill="#D32F2F" />
    <rect x="8" y="28" width="24" height="1.5" rx="0.75" fill="rgba(211,47,47,0.3)" />
  </svg>
);

const IconHydrant = () => (
  <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" className="cap-icon">
    <rect x="15" y="8" width="10" height="6" rx="1" stroke="#D32F2F" strokeWidth="1.6" />
    <rect x="12" y="14" width="16" height="16" rx="2" stroke="#D32F2F" strokeWidth="1.6" />
    <rect x="14" y="30" width="12" height="4" rx="1" stroke="#D32F2F" strokeWidth="1.6" />
    <line x1="8" y1="18" x2="12" y2="18" stroke="#D32F2F" strokeWidth="1.6" strokeLinecap="round" />
    <line x1="28" y1="18" x2="32" y2="18" stroke="#D32F2F" strokeWidth="1.6" strokeLinecap="round" />
    <circle cx="20" cy="22" r="3" stroke="#D32F2F" strokeWidth="1.3" />
  </svg>
);

const IconDoor = () => (
  <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" className="cap-icon">
    <rect x="9" y="6" width="22" height="30" rx="1" stroke="#D32F2F" strokeWidth="1.6" />
    <rect x="11" y="8" width="18" height="26" rx="0.5" stroke="rgba(211,47,47,0.35)" strokeWidth="0.75" />
    <circle cx="25" cy="21" r="1.5" fill="#D32F2F" />
    <line x1="9" y1="36" x2="31" y2="36" stroke="#D32F2F" strokeWidth="1.6" strokeLinecap="round" />
    <line x1="20" y1="8" x2="20" y2="34" stroke="rgba(211,47,47,0.2)" strokeWidth="0.6" strokeDasharray="2 4" />
  </svg>
);

const IconAudit = () => (
  <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" className="cap-icon">
    <rect x="9" y="5" width="22" height="30" rx="1.5" stroke="#D32F2F" strokeWidth="1.6" />
    <line x1="14" y1="13" x2="26" y2="13" stroke="#D32F2F" strokeWidth="1.3" strokeLinecap="round" />
    <line x1="14" y1="18" x2="26" y2="18" stroke="#D32F2F" strokeWidth="1.3" strokeLinecap="round" />
    <line x1="14" y1="23" x2="22" y2="23" stroke="#D32F2F" strokeWidth="1.3" strokeLinecap="round" />
    <polyline points="22,27 25,30 31,22" stroke="#D32F2F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CAPABILITIES = [
  {
    Icon: IconSprinkler,
    title: "Automatic Fire Sprinklers",
    desc: "NFPA 13 compliant wet-pipe and dry-pipe suppression systems for factories, warehouses, and high-rise commercial buildings.",
    tag: "Suppression",
  },
  {
    Icon: IconHydrant,
    title: "Hydrant & Standpipe Systems",
    desc: "Class I, II, and III combined standpipe systems with NFPA 14 design standards and pressure-tested GI pipework.",
    tag: "Distribution",
  },
  {
    Icon: IconDoor,
    title: "Industrial Fire Doors",
    desc: "UL-listed steel fire doors — single-leaf, double-leaf, and louver variants — rated 60 to 180 minutes.",
    tag: "Containment",
  },
  {
    Icon: IconAudit,
    title: "Safety Audits & Compliance",
    desc: "On-site BNBC and BFS regulatory inspections, fire risk assessment reports, and gap-closure documentation for procurement teams.",
    tag: "Advisory",
  },
];

const Capabilities = () => {
  const navigate = useNavigate();
  const sectionRef = useHeroicEntry({ itemStagger: 0.12, start: "top 78%" });

  return (
    <section ref={sectionRef} className="cap-section relative overflow-hidden bg-[#0F1117] py-20 sm:py-28">
      {/* Faint grid */}
      <div className="cap-grid absolute inset-0 pointer-events-none" />

      <div className="container-page relative z-10">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <p data-heroic-eyebrow className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#D32F2F] sm:text-xs">
            Core Capabilities
          </p>
          <h2 data-heroic-title className="mt-3 text-balance text-[26px] font-black leading-[1.1] tracking-tight text-white sm:text-3xl md:text-4xl">
            End-to-End Fire Safety Engineering
          </h2>
          <p className="mt-4 text-sm leading-7 text-white/55 sm:text-base">
            Designed for industrial compliance. Manufactured in Bangladesh.
          </p>
        </div>

        {/* 4-card grid */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:mt-16">
          {CAPABILITIES.map(({ Icon, title, desc, tag }) => (
            <div
              key={title}
              data-heroic-item
              className="cap-card group relative flex flex-col overflow-hidden border border-white/8 bg-[#14141A] p-6"
              style={{ willChange: "transform, opacity" }}
            >
              {/* Top accent */}
              <span className="cap-accent absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-[#D32F2F] transition-transform duration-[380ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />

              {/* Tag */}
              <span className="mb-4 self-start text-[9px] font-bold uppercase tracking-[0.22em] text-[#D32F2F]/65">
                {tag}
              </span>

              {/* Icon */}
              <div className="mb-5">
                <Icon />
              </div>

              {/* Content */}
              <h3 className="text-[15px] font-bold leading-snug text-white">{title}</h3>
              <p className="mt-2.5 text-[13px] leading-6 text-white/50 flex-1">{desc}</p>

              {/* Learn more link */}
              <button
                type="button"
                onClick={() => navigate("/services")}
                className="mt-5 self-start inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-[#D32F2F]/70 transition hover:text-[#D32F2F]"
              >
                Learn More
                <svg viewBox="0 0 12 12" fill="none" className="h-2.5 w-2.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true">
                  <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .cap-grid {
          background-image:
            linear-gradient(rgba(211,47,47,.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(211,47,47,.05) 1px, transparent 1px);
          background-size: 56px 56px;
        }
        .cap-icon {
          width: 40px;
          height: 40px;
          will-change: transform;
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        .cap-card:hover .cap-icon {
          transform: translateY(-3px);
        }
        .cap-card {
          transition:
            border-color 0.28s ease,
            box-shadow 0.28s ease;
        }
        .cap-card:hover {
          border-color: rgba(211,47,47,0.22);
          box-shadow: 0 8px 32px -12px rgba(211,47,47,0.2);
        }
        @media (prefers-reduced-motion: reduce) {
          .cap-card { transition: none; }
          .cap-card:hover .cap-icon { transform: none; }
        }
      `}</style>
    </section>
  );
};

export default Capabilities;

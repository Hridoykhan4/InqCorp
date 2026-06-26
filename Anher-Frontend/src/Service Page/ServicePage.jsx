import React from "react";
// import banner from "../assets/image/Banner Image/ServiceBanner.png";
import OurBenefits from "./Our Benefit/OurBenifit";
import FaqSection from "../About/FAQ/FAQ";
import { SeoManager } from "../SEO/SeoManager";

/* ---------- Orange-outline icons (use currentColor so they can flip on hover) ---------- */
const Lifebuoy = ({ cls = "h-7 w-7" }) => (
  <svg
    viewBox="0 0 24 24"
    className={cls}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M4 12h16M12 4v16M8.5 8.5l7 7M15.5 8.5l-7 7" />
  </svg>
);
const Cylinder = ({ cls = "h-7 w-7" }) => (
  <svg
    viewBox="0 0 24 24"
    className={cls}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <ellipse cx="12" cy="6" rx="6.5" ry="3" />
    <path d="M5.5 6v12c0 1.66 3 3 6.5 3s6.5-1.34 6.5-3V6" />
  </svg>
);
const Globe = ({ cls = "h-7 w-7" }) => (
  <svg
    viewBox="0 0 24 24"
    className={cls}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M2 12h20M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
  </svg>
);
const Diamond = ({ cls = "h-7 w-7" }) => (
  <svg
    viewBox="0 0 24 24"
    className={cls}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M12 3l3 4h5l-8 14L4 7h5l3-4z" />
  </svg>
);
const Binoculars = ({ cls = "h-7 w-7" }) => (
  <svg
    viewBox="0 0 24 24"
    className={cls}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="7" cy="16" r="3" />
    <circle cx="17" cy="16" r="3" />
    <path d="M4 13V9a3 3 0 0 1 3-3h1l2 5M20 13V9a3 3 0 0 0-3-3h-1l-2 5" />
  </svg>
);
const Pulse = ({ cls = "h-7 w-7" }) => (
  <svg
    viewBox="0 0 24 24"
    className={cls}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M3 12h4l2-5 3 10 2-5h5" />
  </svg>
);
const Cog = ({ cls = "h-7 w-7" }) => (
  <svg
    viewBox="0 0 24 24"
    className={cls}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM2 12h3M19 12h3M4.9 4.9l2.1 2.1M16.9 16.9l2.1 2.1M4.9 19.1l2.1-2.1M16.9 7l2.1-2.1" />
  </svg>
);
const Magnet = ({ cls = "h-7 w-7" }) => (
  <svg
    viewBox="0 0 24 24"
    className={cls}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M4 8h5v5a3 3 0 1 1-6 0V8zM15 8h5v5a3 3 0 1 1-6 0V8z" />
    <path d="M9 8V6a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v2" />
  </svg>
);

/* ---------- Data ---------- */
const services = [

  { title: "Seasonal Maintenance", icon: Cylinder },
  { title: "Emergency  Repairs", icon: Globe },
  { title: "Air Duct Cleaning", icon: Diamond },
  { title: "Air Conditioning Installation", icon: Binoculars },
];

/* ---------- Tile with slow left→right fill on hover ---------- */
const Tile = ({ title, icon: IconComp, featured, accentLine, dot }) => {
  const orange = "#EA6B3A";
  const darkSlate = "#0e2b3b";

  return (
    <div className="group relative h-[230px] overflow-hidden rounded-[18px] cursor-pointer shadow-[0_10px_30px_rgba(16,24,40,0.06)]">
      {/* Base background */}
      <div
        className={`${
          featured ? "bg-[#B31942]" : "bg-[#e9f2f2]"
        } absolute inset-0`}
        style={{ ["--orange"]: orange }}
      />
 
      {/* Hover sweep (slow) — only for non-featured tiles */}
      {!featured && (
        <div
          className="absolute inset-0 w-0 bg-[#B31942] transition-[width] duration-[900ms] ease-out group-hover:w-full"
          style={{ ["--orange"]: orange }}
        />
      )}

      {/* Content */}
      <div className="relative z-[1] flex h-full flex-col justify-between p-8">
        {/* Icon */}
        <IconComp
          cls={`h-8 w-8 transition-colors ${
            featured
              ? "text-white"
              : "text-[var(--orange)] group-hover:text-white"
          }`}
        />

        {/* Title */}
        <h3
          className={`text-[18px] font-semibold leading-6 transition-colors ${
            featured
              ? "text-white"
              : "text-[color:var(--slate)] group-hover:text-white"
          }`}
          style={{ ["--slate"]: darkSlate }}
        >
          {title}
        </h3>

        {/* Bottom-left round arrow */}
        <button
          type="button"
          className={`grid h-9 w-9 place-items-center rounded-full transition ${
            featured
              ? "bg-white text-[#B31942]"
              : "bg-[#B31942] text-white group-hover:bg-white group-hover:text-[#B31942]"
          }`}
          style={{ ["--orange"]: orange }}
          aria-label="Open"
          title="Open"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
          >
            <path d="M7 17L17 7M9 7h8v8" />
          </svg>
        </button>
      </div>

      {/* Accents (sit above base, below content) */}
      {accentLine && (
        <span
          className="pointer-events-none absolute left-7 right-7 bottom-0 z-0 h-[3px] rounded-full bg-[var(--orange)]"
          style={{ ["--orange"]: orange }}
        />
      )}
      {dot && (
        <span
          className="absolute left-6 bottom-6 z-0 h-2 w-2 rounded-full bg-[var(--orange)]"
          style={{ ["--orange"]: orange }}
        />
      )}
    </div>
  );
};

/* ============================ PAGE ============================ */
export const ServicePage = () => {
  return (
    <div>
      <SeoManager
        title="SafetyPlus Services"
        description="Explore SafetyPlus services including site safety audits, installation of fire doors and hose cabinets, equipment maintenance, and compliance support."
        path="/services"
        keywords="fire safety services Bangladesh, fire door installation, hose cabinet installation, safety audit, fire equipment maintenance"
      />
      {/* Banner (unchanged) */}
      <div className=" relative h-[400px] w-[95%] mx-auto rounded-2xl  overflow-hidden  ">
        <div className="h-[400px] w-full bg-[#0A3161] "></div>
        <div className="absolute inset-0 backdrop-blur-xs bg-white/0"></div>
        <div className="absolute top-1/2  left-1/2 -translate-x-1/2 w-full h-full">
          <h1 className="text-5xl  text-center  text-white font-semibold ">
            Service
          </h1>
        </div>
      </div>

      {/* Services Grid */}
      <section className="w-full py-14 md:py-30">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {services.map((s, i) => (
              <Tile key={i} {...s} />
            ))}
          </div>
        </div>
      </section>

      <OurBenefits></OurBenefits>
      <FaqSection></FaqSection>
    </div>
  );
};

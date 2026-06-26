// OurExperts.jsx
import React from "react";

/* tiny inline icons to match the mock */
const Lifebuoy = ({ className = "h-8 w-8" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#EA6B3A" strokeWidth="2">
    <circle cx="12" cy="12" r="9" />
    <path d="M15.5 8.5l-7 7M8.5 8.5l7 7M4 12h16M12 4v16" />
  </svg>
);
const Cylinder = ({ className = "h-8 w-8" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#EA6B3A" strokeWidth="2">
    <ellipse cx="12" cy="5" rx="7" ry="3" />
    <path d="M5 5v14c0 1.66 3.13 3 7 3s7-1.34 7-3V5" />
  </svg>
);
const CheckDot = () => (
  <span className="mr-2 inline-grid h-5 w-5 place-items-center rounded-full bg-[#FCE6DA]">
    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="#EA6B3A" strokeWidth="3">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  </span>
);

const FeatureCard = ({ Icon, title, points }) => (
  <div className="rounded-2xl bg-white/5 p-6 md:p-7 text-white/90 backdrop-blur-sm shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
    <Icon />
    <h4 className="mt-4 text-lg font-semibold text-white">{title}</h4>
    <p className="mt-2 text-sm leading-6 text-white/80">
      Before any repair, we walk you through the issue with clarity.
    </p>

    <ul className="mt-5 space-y-3 text-sm leading-6">
      {points.map((p, i) => (
        <li key={i} className="flex items-start">
          <CheckDot />
          <span>{p}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default function OurExperts() {
  return (
    <section className="w-full">
      <div className="relative  overflow-hidden">
        {/* gradient background */}
        <div className="absolute inset-0 bg-[#0A3161]" />
        {/* subtle warm glow bottom-right */}
        {/* <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-orange-300/20 blur-3xl" /> */}

        <div className="relative max-w-7xl mx-auto">
          {/* kicker + heading */}
          <div className="text-center">
            <div className="mb-3 text-xs font-semibold tracking-[0.2em] text-white/80">
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-white/90 align-middle" />
              OUR EXPERTS
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight text-white">
              Trusted AC experts with a
              <br className="hidden md:block" /> customer
            </h2>
          </div>

          {/* content grid */}
          <div className="mt-10 bg-amber-300 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_380px_380px] lg:items-start">
            {/* left image placeholder (keep gray) */}
            <div className="justify-self-center">
              <div className="h-[320px]  max-w-full rounded-2xl bg-gray-300" />
            </div>

            {/* feature cards */}
            <FeatureCard
              Icon={Lifebuoy}
              title="Neat & Professional"
              points={[
                "Service with visible results",
                "Clear explanation of prob.",
                "Visual proof and service.",
              ]}
            />
            <FeatureCard
              Icon={Cylinder}
              title="Smart & Refined"
              points={[
                "Service with visible results",
                "Clear explanation of prob.",
                "Visual proof and service.",
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

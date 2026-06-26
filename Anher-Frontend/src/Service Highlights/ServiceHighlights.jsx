import React from "react";

// HVACServiceHighlights
// A clean, responsive 3-card feature grid for an air conditioning & heating website.
// TailwindCSS only (no external UI libs). Drop into any React app.

export default function ServiceHighlights({
  heading = "What We Do Best",
  subtitle = "Premium air conditioning & heating services for year-round comfort.",
  items = [
    {
      title: "Energy-Efficient Installations",
      description:
        "High-SEER ACs, heat pumps, and furnaces sized with load calculations. Lower bills, quieter homes, greener footprint.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M4.5 6.75l15 10.5M4.5 17.25l15-10.5M3 12h18" />
        </svg>
      ),
    },
    {
      title: "Smart Thermostat Upgrades",
      description:
        "Wi-Fi thermostats, zoning, and schedules that learn your routine. Remote control, comfort scenes, and energy reports.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25a4.5 4.5 0 0 0-4.5 4.5v7.091a3.75 3.75 0 1 0 9 0V6.75a4.5 4.5 0 0 0-4.5-4.5Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5v8.25" />
        </svg>
      ),
    },
    {
      title: "24/7 Repairs & Seasonal Care",
      description:
        "Emergency diagnostics, refrigerant checks, coil cleaning, and tune-ups that extend equipment life and prevent breakdowns.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5h6l1.5 3H21M6 7.5 4.5 3m4.5 4.5L10.5 3M7.5 21h9m-10.5-4.5h12a1.5 1.5 0 0 0 1.5-1.5V12a1.5 1.5 0 0 0-1.5-1.5H9.75M7.5 21a1.5 1.5 0 1 1 0-3m9 3a1.5 1.5 0 1 1 0-3" />
        </svg>
      ),
    },
  ], 
}) {
  return (
    <section className="w-full px-4 py-12 md:py-16 bg-emerald-50/40">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 md:mb-12 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
            {heading}
          </h2>
          <p className="mt-2 text-slate-600 max-w-2xl mx-auto">{subtitle}</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item, idx) => (
            <article
              key={idx}
              className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-6 md:p-7 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 rounded-full bg-emerald-500/10 p-3 ring-1 ring-emerald-200">
                  <span className="text-emerald-600">{item.icon}</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* subtle bottom divider */}
              <div className="mt-6 h-px bg-gradient-to-r from-transparent via-emerald-100 to-transparent" />

              <div className="mt-4 flex items-center gap-3">
                <span className="inline-flex rounded-full bg-emerald-100 text-emerald-700 px-2.5 py-1 text-xs font-medium">
                  HVAC
                </span>
                <span className="inline-flex rounded-full bg-emerald-100 text-emerald-700 px-2.5 py-1 text-xs font-medium">
                  Comfort
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// Usage example:
// <HVACServiceHighlights />
// Or pass custom items like:
// <HVACServiceHighlights items={[
//   { title: "Ductless Mini-Splits", description: "Room-by-room comfort with hyper-heat in winter.", icon: (<YourIcon/>) },
//   ...
// ]} />
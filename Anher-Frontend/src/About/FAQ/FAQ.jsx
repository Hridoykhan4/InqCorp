// FaqSection.jsx
import React, { useState } from "react";
import img from "../../assets/image/Normal Image/image_team.png"
const Plus = ({ className = "h-5 w-5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 5v14M5 12h14" />
  </svg>
);
const Close = ({ className = "h-5 w-5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 6l12 12M18 6l-12 12" />
  </svg>
);
const HelpBadge = () => (
  <div className="flex items-center gap-3 rounded-2xl bg-white/20 backdrop-blur-md px-4 py-3 text-white shadow-lg">
    <span className="grid h-8 w-8 place-items-center rounded-full bg-white/90 text-[#0f2f44]">
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.24V12m0 4h.01" />
      </svg>
    </span>
    <div className="leading-tight">
      <div className="text-sm font-semibold">Smart Answers for</div>
      <div className="text-sm font-semibold">Cool Comfort.</div>
    </div>
  </div>
);

export default function FaqSection({
  imageUrl = img, // pass your image URL to show it on the right
}) {
  const faqs = [
    {
      q: "What are the signs that my AC needs repair?",
      a: "Strange noises, weak airflow, warm air, musty smells, short cycling, or unexpectedly high energy bills are common signs your AC needs attention.",
    },
    {
      q: "Do you offer emergency AC repair services?",
      a: "Yes. We provide 24/7 emergency support so you’re never stuck without cooling when you need it most.",
    },
    {
      q: "How often should I service my air conditioner?",
      a: "We recommend servicing at least once every 6 months for optimal performance, efficiency, and lifespan.",
    },
    {
      q: "How long does a typical AC installation take?",
      a: "Most standard installations are completed the same day, depending on site conditions and system type.",
    },
    {
      q: "Are your technicians certified and insured?",
      a: "Yes. All our technicians are certified, background-checked, and fully insured for your peace of mind.",
    },
  ];

  // open the last item by default (like the mock)
  const [active, setActive] = useState(4);

  const toggle = (i) => setActive((prev) => (prev === i ? -1 : i));

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">
        {/* Kicker + Heading */}
        <div className="text-center">
          <div className="mb-2 text-xs font-semibold tracking-[0.2em] text-slate-500">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#B31942]" />
            FAQ
          </div>
          <h2 className="text-3xl font-extrabold leading-tight text-[#0F2F44] md:text-5xl">
            Meet the skilled team commit
            <br className="hidden md:block" />
            to keeping you cool
          </h2>
        </div>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_520px]">
          {/* Left: Accordion */}
          <div className="space-y-4">
            {faqs.map((item, i) => {
              const isOpen = active === i;
              const isLast = i === faqs.length - 1;

              if (isOpen) {
                // Expanded orange card
                return (
                  <div
                    key={i}
                    className="rounded-2xl bg-[#B31942] text-white shadow-md"
                  >
                    <button
                      onClick={() => toggle(i)}
                      className="flex w-full items-center justify-between rounded-2xl px-5 py-5 text-left"
                    >
                      <span className="text-base font-semibold">
                        {i + 1}. {item.q}
                      </span>
                      <span className="text-white/90">
                        <Close />
                      </span>
                    </button>
                    <div className="px-5 pb-5 pt-1 text-[15px] leading-7 text-white/95">
                      {item.a}
                    </div>
                  </div>
                );
              }

              // Collapsed pill box
              return (
                <button
                  key={i}
                  onClick={() => toggle(i)}
                  className={`flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-5 text-left text-[#0F2F44] shadow-sm transition hover:shadow-md`}
                >
                  <span className="text-base">
                    <span className="font-semibold mr-1">{i + 1}.</span> {item.q}
                  </span>
                  <span className="text-slate-500">
                    <Plus />
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right: Image (or gray placeholder) */}
          <div className="justify-self-center">
            <div className="relative overflow-hidden rounded-2xl">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Technician"
                  className="h-[420px] w-[520px] object-cover"
                />
              ) : (
                <div className="h-[420px] w-[520px] bg-gray-300" />
              )}

              {/* Badge */}
              <div className="absolute bottom-5 left-5">
                <HelpBadge />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

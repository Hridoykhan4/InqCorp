// OurBenefits.jsx
import React from "react";

/* --- tiny outline icons (orange stroke) --- */
const Globe = ({ className = "h-9 w-9" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#EA6B3A" strokeWidth="2">
    <circle cx="12" cy="12" r="9" />
    <path d="M2 12h20M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
  </svg>
);
const Cylinder = ({ className = "h-9 w-9" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#EA6B3A" strokeWidth="2">
    <ellipse cx="12" cy="6" rx="6.5" ry="3" />
    <path d="M5.5 6v12c0 1.66 3 3 6.5 3s6.5-1.34 6.5-3V6" />
  </svg>
);
const Binoculars = ({ className = "h-9 w-9" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#EA6B3A" strokeWidth="2">
    <circle cx="7" cy="16" r="3" />
    <circle cx="17" cy="16" r="3" />
    <path d="M4 13V9a3 3 0 0 1 3-3h1l2 5M20 13V9a3 3 0 0 0-3-3h-1l-2 5" />
  </svg>
);
const Diamond = ({ className = "h-9 w-9" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#EA6B3A" strokeWidth="2">
    <path d="M12 3l3 4h5l-8 14L4 7h5l3-4z" />
  </svg>
);
const Magnet = ({ className = "h-9 w-9" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#EA6B3A" strokeWidth="2">
    <path d="M4 8h5v5a3 3 0 1 1-6 0V8zM15 8h5v5a3 3 0 1 1-6 0V8z" />
    <path d="M9 8V6a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v2" />
  </svg>
);

/* --- data --- */
const items = [
  {
    icon: Globe,
    title: "100% Customer Satisfaction",
    text:
      "At SafetyPlus, we specialize in delivering dependable fire safety and industrial protection equipment with a focus on quality and compliance.",
  },
  {
    icon: Cylinder,
    title: "Fast & Reliable Service",
    text:
      "At SafetyPlus, we specialize in delivering dependable fire safety and industrial protection equipment with a focus on quality and compliance.",
  },
  {
    icon: Binoculars,
    title: "Certified & Experience Technician",
    text:
      "At SafetyPlus, we specialize in delivering dependable fire safety and industrial protection equipment with a focus on quality and compliance.",
  },
  {
    icon: Diamond,
    title: "Energy–Efficient Solutions",
    text:
      "At SafetyPlus, we specialize in delivering dependable fire safety and industrial protection equipment with a focus on quality and compliance.",
  },
  {
    icon: Magnet,
    title: "Locally Owned & Operated",
    text:
      "At SafetyPlus, we specialize in delivering dependable fire safety and industrial protection equipment with a focus on quality and compliance.",
  },
  {
    icon: Diamond,
    title: "Satisfaction Guaranteed",
    text:
      "At SafetyPlus, we specialize in delivering dependable fire safety and industrial protection equipment with a focus on quality and compliance.",
  },
];

/* --- row item --- */
const BenefitRow = ({ Icon, title, text }) => (
  <div className="flex items-start gap-5 py-6">
    <Icon />
    <div>
      <h4 className="text-white font-semibold text-lg">{title}</h4>
      <p className="text-white/80 text-[15px] leading-7 max-w-[520px]">{text}</p>
    </div>
  </div>
);

export default function OurBenefits() {
  const left = items.slice(0, 3);
  const right = items.slice(3);

  return (
    <section className="w-full  bg-[#0A3161]">
      <div className="relative max-w-7xl mx-auto rounded-3xl overflow-hidden">
        {/* gradient bg */}
      
        {/* soft glows */}
        {/* <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-teal-400/25 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-orange-300/20 blur-3xl" /> */}

        {/* content */}
        <div className="relative px-6 md:px-14 py-10 md:py-14">
          {/* header row */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] items-start">
            <div>
              <div className="mb-3 text-xs font-semibold tracking-[0.2em] text-white/80">
                <span className="mr-2 inline-block h-2 w-2 rounded-full bg-white" />
                OUR BENEFITS
              </div>
              <h2 className="text-white text-[34px] md:text-[48px] font-extrabold leading-tight">
                The advantages of partner
                <br className="hidden md:block" /> with fire safety experts
              </h2>
            </div>
            <p className="text-white/80 text-[15px] leading-7">
              At SafetyPlus, we manufacture and install fire safety and industrial protection
              equipment with a focus on compliance and reliability. With over 15 years of industry
              experience, our factory-trained technicians ensure quality and timely delivery
            </p>
          </div>

          {/* divider */}
          <div className="mt-8 h-px w-full bg-white/15" />

          {/* benefits grid */}
          <div className="mt-2 grid grid-cols-1 gap-x-14 md:grid-cols-2">
            <div>
              {left.map((it, i) => (
                <BenefitRow key={i} Icon={it.icon} title={it.title} text={it.text} />
              ))}
            </div>
            <div>
              {right.map((it, i) => (
                <BenefitRow key={i} Icon={it.icon} title={it.title} text={it.text} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

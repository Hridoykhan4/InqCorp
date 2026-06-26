// AboutHvac.jsx
import React from "react";
import pic from "../../assets/image/Normal Image/image (2).png"
const OrangeDot = () => (
  <span className="mr-2 inline-block h-2.5 w-2.5 rounded-full bg-[#F26C3A] align-middle" />
);

const Check = ({ className = "h-4 w-4" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

export default function StorySection() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-6 pt-10 pb-16 md:pt-16">
        {/* Top row: Kicker + Big title / Years badge */}
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-[minmax(0,1fr)_300px]">
          <div>
            <div className="mb-3 text-sm font-semibold tracking-[0.18em] text-slate-500">
              <OrangeDot />
              <span className="align-middle">ABOUT US</span>
            </div>

            <h1 className="text-[34px] leading-[1.15] text-[#0C2238] font-extrabold md:text-[54px]">
              Professional HVAC service
              <br className="hidden md:block" />
              with a personal touch
            </h1>
          </div>

          {/* Years badge */}
          <div className="flex items-start gap-4 md:justify-end">
            <div className="leading-none text-[#0A3161]">
              <div className="text-[64px] font-extrabold md:text-[70px]">
                25<span className="align-top">+</span>
              </div>
            </div>
            <p className="max-w-[180px] pt-3 text-[15px] leading-6 text-slate-500  ">
              Years of Experience In
              <br /> Air Conditioning
              <br /> Solution
            </p>
          </div>
        </div>

        {/* Content row: Image placeholder + copy */}
        <div className="mt-10 grid grid-cols-1 items-start gap-10 md:mt-12 md:grid-cols-2">
          {/* Image placeholder (keep gray) */}
          <div className="rounded-2xl bg-gray-300  md:h-[480px] overflow-hidden" >
            <img src={pic} alt="" />

          </div>

          {/* Copy block */}
          <div className="max-w-xl">
            <p className="text-[15.5px] leading-7 text-slate-600">
              At Total Comfort HVAC, we specialize in delivering dependable heating and cooling
              services with a focus on quality, efficiency.
            </p>
            <p className="mt-5 text-[15.5px] leading-7 text-slate-600">
              With over 15 years of industry experience, certified technicians ensure your home or
              business stays comfortable in every season.
            </p>

            {/* Bullet list */}
            <ul className="mt-8 space-y-4">
              <li className="flex items-start gap-3 text-[15.5px] leading-7 text-slate-700">
                <span className="mt-1.5 grid h-5 w-5 place-items-center rounded-full bg-[#FDE8DF] text-[#F26C3A]">
                  <Check className="h-3.5 w-3.5" />
                </span>
                Years of Experience In Air Conditioning
              </li>
              <li className="flex items-start gap-3 text-[15.5px] leading-7 text-slate-700">
                <span className="mt-1.5 grid h-5 w-5 place-items-center rounded-full bg-[#FDE8DF] text-[#F26C3A]">
                  <Check className="h-3.5 w-3.5" />
                </span>
                Long-Standing Air Conditioning Expertise
              </li>
            </ul>

            {/* CTA */}
            <button
              type="button"
              className="mt-8 inline-flex items-center rounded-full cursor-pointer hover:-translate-y-1.5 transition-all duration-300 bg-[#0A3161] px-6 py-3 text-[15px] font-semibold text-white shadow-sm hover:brightness-95"
            >
              More Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

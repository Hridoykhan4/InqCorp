
// ProcessOverview.jsx
import React from "react";

const OutlineNum = ({ n }) => (
  <span
    className="text-3xl md:text-4xl font-extrabold leading-none text-transparent"
    style={{ WebkitTextStroke: "2px #1f7a57" }} // deep green outline
  >
    {n.toString().padStart(2, "0")}
  </span>
);

const ItemCard = ({ num, title, text }) => (
  <article className="rounded-2xl bg-white/95 shadow-[0_12px_28px_rgba(16,24,40,0.06)] px-6 py-6 md:px-7 md:py-7">
    <div className="mb-2">
      <OutlineNum n={num} />
    </div>
    <h4 className="text-[15px] md:text-base font-semibold text-[#0f3b2e]">
      {title}
    </h4>
    <p className="mt-2 text-[13px] md:text-[14px] leading-6 text-slate-500">
      {text}
    </p>
  </article>
);

export default function ProcessOverview({
  bgImage = "", // put your background image URL here
}) {
  const items = [
    {
      num: 1,
      title: "Visa Voyage Agency",
      text: "Lorem Ipsum is simply dummy text the printing and typeser",
    },
    {
      num: 2,
      title: "International Access Visas",
      text: "Lorem Ipsum is simply dummy text the printing and typeser",
    },
    {
      num: 3,
      title: "Gateway to Global Citizenship",
      text: "Lorem Ipsum is simply dummy text the printing and typeser",
    },
  ];

  return (
    <section className="w-full">
      <div className="relative mx-3 md:mx-6 rounded-[24px] overflow-hidden">
        {/* Background image layer (replace or pass via prop) */}
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{
            backgroundImage: bgImage
              ? `url(${bgImage})`
              : "linear-gradient(180deg,#f3f7f5, #e8f1ec)",
          }}
        />
        {/* Soft white veil so cards pop like the mock */}
        <div className="absolute inset-0 bg-white/55" />

        {/* Content */}
        <div className="relative px-5 md:px-10 py-10 md:py-14">
          {/* Kicker */}
          <div className="mb-2 text-center text-[11px] md:text-[12px] font-semibold tracking-[0.22em] text-emerald-800/80">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-700 align-middle" />
            PROCESS OVERVIEW
          </div>

          {/* Heading */}
          <h2 className="text-center text-[22px] md:text-4xl font-extrabold leading-tight text-[#0e3b2f]">
            Unforgettable Getaways
            <br className="hidden md:block" />
            Escaping Routine
          </h2>

          {/* Cards */}
          <div className="mt-8 grid grid-cols-1 gap-5 md:gap-6 md:grid-cols-3 max-w-5xl mx-auto">
            {items.map((it) => (
              <ItemCard key={it.num} {...it} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

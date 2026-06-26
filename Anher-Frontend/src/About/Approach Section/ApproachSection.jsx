// ApproachSection.jsx
import React from "react";
import img from "../../assets/image/Normal Image/image.png"

export default function ApproachSection({
  imgSrc = img, // put your image URL here; empty => gray placeholder
  imgAlt = "Technician working",
}) {
  return (
    <section className="w-full bg-[#0A3161]">
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />
       <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-amber-300/10 blur-2xl" />
      <div className="relative mx-auto rounded-3xl overflow-hidden max-w-7xl">
        {/* --- Background layer (green gradient) --- */}
        <div className="absolute inset-0 " />

        {/* --- Decorative shapes --- */}
        {/* Soft spotlight */}

       
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(currentColor 1px, transparent 1px)",
            backgroundSize: "18px 18px",
            color: "rgba(255,255,255,0.2)",
            maskImage:
              "linear-gradient(0deg, transparent 0%, black 20%, black 80%, transparent 100%)",
          }}
        />
        {/* Squares */}
        <div className="absolute left-14 top-16 h-10 w-10 rotate-45 border bg-[#B31942]" />
        <div className="absolute right-24 bottom-16 h-12 w-12 -rotate-12 border bg-[#B31942]" />
        {/* Triangles */}
        <div
          className="absolute right-32 top-20 h-10 w-12 bg-[#B31942]"
          style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
        />
        <div
          className="absolute left-24 bottom-24 h-8 w-10 bg-white/10"
          style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
        />

        {/* --- Content --- */}
        <div className="relative px-6 md:px-12 lg:px-20 py-14 md:py-20">
          {/* Heading */}
          <div className="text-center">
            <div className="mb-3 text-[12px] font-semibold tracking-[0.2em] text-white/80">
              <span className="inline-block h-2 w-2 rounded-full bg-white/90 align-middle mr-2" />
              OUR APPROACH
            </div>
            <h2 className="text-white text-3xl md:text-5xl font-extrabold leading-tight">
              Delivering cooling with clarity
              <br className="hidden md:block" /> and commitment
            </h2>
          </div>

          {/* Body grid */}
          <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_520px] items-start">
            {/* Left copy */}
            <div className="text-white/90">
              <ApproachItem
                title="Our mission"
                text="To provide fast, reliable, and affordable air conditioning services that ensure complete comfort and satisfaction for every customer we serve."
                withDivider
              />
              <ApproachItem
                title="Our vision"
                text="To provide fast, reliable, and affordable air conditioning services that ensure complete comfort and satisfaction for every customer we serve."
                withDivider
              />
              <ApproachItem
                title="Our goal"
                text="To provide fast, reliable, and affordable air conditioning services that ensure complete comfort and satisfaction for every customer we serve."
              />
            </div>

            {/* Right image (placeholder if no imgSrc) */}
            <div className="justify-self-center">
              <div className="rounded-2xl overflow-hidden shadow-lg">
                {imgSrc ? (
                  <img
                    src={imgSrc}
                    alt={imgAlt}
                    className="h-[320px] w-[520px] object-cover"
                  />
                ) : (
                  <div className="h-[320px] w-[520px] bg-gray-300" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ApproachItem({ title, text, withDivider = false }) {
  return (
    <div className="pb-6">
      <div className="mb-2 flex items-center gap-3">
        <span className="inline-block h-2 w-2 rounded-full bg-[#F26C3A]" />
        <h3 className="text-white font-semibold text-lg">{title}</h3>
      </div>
      <p className="text-[15.5px] leading-7 text-white/85">
        {text}{" "}
        <span className="inline-block h-2 w-2 ml-2 rounded-full bg-[#F26C3A]" />
      </p>
      {withDivider && <div className="mt-6 h-px w-full bg-white/15"></div>}
    </div>
  );
}

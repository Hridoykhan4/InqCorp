import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTruckFast,
  faMountain,
  faScaleBalanced,
  faHandshake,
} from "@fortawesome/free-solid-svg-icons";
import AOS from "aos";
import "aos/dist/aos.css";
import image from "../assets/image/Normal Image/image (3).png";

const features = [
  {
    title: "Direct from source",
    subtitle:
      "We source aggregates directly from quarries and riverbeds, cutting out middlemen and ensuring you get the freshest, highest-grade material at the lowest possible price.",
    icon: faMountain,
  },
  {
    title: "Fast, reliable delivery",
    subtitle:
      "Based in Chattogram — Bangladesh's gateway city — we offer swift logistics to construction sites across the country. Bulk orders dispatched within 24 hours.",
    icon: faTruckFast,
  },
  {
    title: "Precision grading",
    subtitle:
      "Every product is graded to exact specifications: Fine Sand (0.063–1mm), Coarse Sand (2–4.75mm), Stone Chips (5–10mm & 10–20mm), and Boulder (20mm+). Right material, every time.",
    icon: faScaleBalanced,
  },
  {
    title: "Transparent pricing",
    subtitle:
      "No hidden costs. Price per CFT is clearly listed and agreed before dispatch. Our clients trust us because we never change quoted prices after order confirmation.",
    icon: faHandshake,
  },
];

export default function WhyChooseUs() {
  useEffect(() => {
    AOS.init({ duration: 700, offset: 60, once: true });
  }, []);

  return (
    <section className="section-page bg-white">
      <div className="container-page grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div data-aos="fade-right" className="relative">
          <div className="overflow-hidden rounded-2xl border border-safety-border bg-safety-surface p-3 shadow-xl">
            <img
              src={image}
              alt="Kawsar Anher — premium construction aggregate supply in Bangladesh"
              className="aspect-[4/3] w-full rounded-xl object-cover"
            />
          </div>
          <div className="absolute -bottom-6 left-5 right-5 rounded-xl bg-safety-red p-5 text-white shadow-2xl md:left-auto md:right-8 md:w-72">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-safety-amber/20">
                <FontAwesomeIcon icon={faMountain} className="text-safety-amber" />
              </span>
              <div>
                <p className="text-lg font-black">Kawsar Anher</p>
                <p className="text-sm leading-5 text-white/70">
                  Build with Strength · Chattogram, Bangladesh
                </p>
              </div>
            </div>
          </div>
        </div>

        <div data-aos="fade-left" className="pt-8 lg:pt-0">
          <p className="eyebrow">Why Choose Kawsar Anher</p>
          <h2 className="heading-lg mt-3 text-balance">
            The foundation your construction projects deserve.
          </h2>
          <p className="body-lead mt-5">
            Bangladesh's construction sector demands consistent quality, competitive
            pricing, and reliable delivery. Kawsar Anher (Inqilab Trading Corporation)
            is built around exactly that — premium aggregates, zero compromise.
          </p>

          <div className="mt-8 grid gap-4">
            {features.map((item, index) => (
              <div
                key={item.title}
                data-aos="fade-up"
                data-aos-delay={index * 70}
                className="group rounded-xl border border-safety-border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-safety-red/40 hover:shadow-lg"
              >
                <div className="flex gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-blue-50 text-safety-red transition group-hover:bg-safety-red group-hover:text-white">
                    <FontAwesomeIcon icon={item.icon} />
                  </span>
                  <div>
                    <h3 className="text-lg font-extrabold text-safety-ink">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-safety-muted">{item.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

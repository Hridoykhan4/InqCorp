import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuildingShield,
  faCertificate,
  faClipboardCheck,
  faIndustry,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import AOS from "aos";
import "aos/dist/aos.css";
import image from "../assets/image/Normal Image/image (3).png";

const features = [
  {
    title: "In-house manufacturing",
    subtitle:
      "Local production gives buyers more control over product availability, specification changes, and delivery coordination.",
    icon: faIndustry,
  },
  {
    title: "Bangladesh market focus",
    subtitle:
      "Product lines are planned around the needs of factories, commercial buildings, warehouses, and safety teams.",
    icon: faBuildingShield,
  },
  {
    title: "Documentation ready",
    subtitle:
      "Technical datasheets can be uploaded as they are finalized, helping procurement teams compare specifications faster.",
    icon: faClipboardCheck,
  },
  {
    title: "UL roadmap",
    subtitle:
      "Current products are non-UL, with a future roadmap to manufacture and sell UL listed safety products.",
    icon: faCertificate,
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
          <div className="overflow-hidden rounded-lg border border-safety-border bg-safety-surface p-3 shadow-xl">
            <img
              src={image}
              alt="SafetyPlus manufacturing and industrial safety work"
              className="aspect-[4/3] w-full rounded-md object-cover"
            />
          </div>
          <div className="absolute -bottom-6 left-5 right-5 rounded-lg bg-safety-ink p-5 text-white shadow-2xl md:left-auto md:right-8 md:w-72">
            <FontAwesomeIcon icon={faShieldHalved} className="text-2xl text-safety-amber" />
            <p className="mt-3 text-2xl font-black">SafetyPlus</p>
            <p className="mt-1 text-sm leading-6 text-white/70">
              Fire safety equipment manufacturer and supplier for Bangladesh.
            </p>
          </div>
        </div>

        <div data-aos="fade-left" className="pt-8 lg:pt-0">
          <p className="eyebrow">Why Choose SafetyPlus</p>
          <h2 className="heading-lg mt-3 text-balance">
            Practical fire safety products with a serious industrial mindset.
          </h2>
          <p className="body-lead mt-5">
            Bangladeshi buyers need clarity: what is manufactured, what can be
            supplied, and how quickly they can evaluate it. SafetyPlus is being
            shaped around that buying journey.
          </p>

          <div className="mt-8 grid gap-4">
            {features.map((item, index) => (
              <div
                key={item.title}
                data-aos="fade-up"
                data-aos-delay={index * 70}
                className="group rounded-lg border border-safety-border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-safety-red/40 hover:shadow-lg"
              >
                <div className="flex gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-md bg-red-50 text-safety-red transition group-hover:bg-safety-red group-hover:text-white">
                    <FontAwesomeIcon icon={item.icon} />
                  </span>
                  <div>
                    <h3 className="text-lg font-extrabold text-safety-ink">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-safety-muted">
                      {item.subtitle}
                    </p>
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

import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBoxesStacked,
  faDoorClosed,
  faFireExtinguisher,
  faIndustry,
} from "@fortawesome/free-solid-svg-icons";
import leftImage from "../assets/image/Normal Image/leftImage.jpg";
import rightImage from "../assets/image/Normal Image/rightImage.png";

const stats = [
  { number: "6", label: "Initial product lines" },
  { number: "BD", label: "Market focus" },
  { number: "24h", label: "Quote follow-up target" },
  { number: "UL", label: "Future product roadmap" },
];

const quickLines = [
  { label: "Hose Cabinet", icon: faFireExtinguisher },
  { label: "Fire Door", icon: faDoorClosed },
  { label: "Industrial Racks", icon: faBoxesStacked },
  { label: "Factory Furniture", icon: faIndustry },
];

export default function OfferAndStats() {
  const navigate = useNavigate();

  return (
    <section className="section-page bg-white">
      <div className="container-page">
        <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
          <div className="overflow-hidden rounded-lg border border-safety-border bg-safety-surface p-3 shadow-lg">
            <img
              src={leftImage}
              alt="SafetyPlus industrial safety products"
              className="h-full min-h-[360px] w-full rounded-md object-cover"
              loading="lazy"
            />
          </div>

          <div className="grid gap-6">
            <div className="rounded-lg border border-safety-border bg-white p-6 shadow-sm md:p-8">
              <div className="grid gap-6 md:grid-cols-[1fr_260px] md:items-center">
                <div>
                  <p className="eyebrow">Fast Sales Conversation</p>
                  <h2 className="mt-3 text-3xl font-black leading-tight text-safety-ink md:text-5xl">
                    Send your safety requirement. We will help organize the product scope.
                  </h2>
                  <p className="body-lead mt-4">
                    Bangladeshi buyers often need a fast, practical conversation:
                    project type, product list, quantity, and documentation needs.
                    This website should move them there quickly.
                  </p>
                  <button
                    type="button"
                    onClick={() => navigate("/contact")}
                    className="btn-brand mt-6"
                  >
                    Contact SafetyPlus
                    <FontAwesomeIcon icon={faArrowRight} className="ml-2 text-xs" />
                  </button>
                </div>

                <div className="overflow-hidden rounded-lg bg-safety-surface">
                  <img
                    src={rightImage}
                    alt="SafetyPlus product consultation"
                    className="aspect-[4/5] w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((item) => (
                <div key={item.label} className="rounded-lg bg-safety-ink p-5 text-white">
                  <p className="text-3xl font-black text-safety-amber">{item.number}</p>
                  <p className="mt-2 text-sm font-semibold text-white/70">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {quickLines.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 rounded-lg border border-safety-border bg-safety-surface p-4"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-md bg-red-50 text-safety-red">
                    <FontAwesomeIcon icon={item.icon} />
                  </span>
                  <p className="text-sm font-extrabold text-safety-ink">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

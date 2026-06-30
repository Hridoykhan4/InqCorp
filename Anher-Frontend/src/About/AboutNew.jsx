import React, { useEffect, useRef } from "react";
import { SeoManager } from "../SEO/SeoManager";
import { SEO_CONFIG } from "../SEO/seo";
import { COMPANY, postalAddressSchema } from "../SEO/companyInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMountain,
  faTruck,
  faAward,
  faHandshake,
  faCheckCircle,
  faQuoteLeft,
  faLocationDot,
  faPhone,
  faEnvelope,
  faBriefcase,
  faGraduationCap,
  faBuilding,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TeamSection from "../About/Team section/TeamSection";

gsap.registerPlugin(ScrollTrigger);

const NAVY = "#1B3A8A";
const GOLD = "#C49B2B";

const STATS = [
  { value: "500+", label: "Projects Delivered", icon: faAward },
  { value: "10+", label: "Years of Excellence", icon: faBriefcase },
  { value: "6", label: "Product Variants", icon: faMountain },
  { value: "100%", label: "Quality Assured", icon: faCheckCircle },
];

const VALUES = [
  {
    title: "Source Quality",
    desc: "Every aggregate sourced from certified quarries — graded, tested, and approved before delivery.",
    icon: faMountain,
  },
  {
    title: "On-Time Delivery",
    desc: "Reliable fleet logistics ensure your materials arrive exactly when your project needs them.",
    icon: faTruck,
  },
  {
    title: "Fair Pricing",
    desc: "Transparent CFT pricing with no hidden charges. What you see is what you pay.",
    icon: faHandshake,
  },
  {
    title: "Trusted Partner",
    desc: "Building long-term relationships with contractors, developers, and project managers across Bangladesh.",
    icon: faAward,
  },
];

const MILESTONES = [
  { year: "2014", title: "Founded", desc: "Kawsar Alam establishes Inqilab Trading Corporation in Chattogram with a vision to supply premium aggregates." },
  { year: "2016", title: "First 100 Projects", desc: "Reached milestone of 100 completed construction supply deliveries across Chattogram division." },
  { year: "2018", title: "Fleet Expansion", desc: "Expanded delivery fleet to cover all major construction zones in Chattogram and surrounding districts." },
  { year: "2021", title: "500+ Projects", desc: "Trusted by over 500 construction projects — from residential buildings to major infrastructure works." },
  { year: "2024", title: "Market Leader", desc: "Recognized as one of Chattogram's most reliable premium aggregate and sand suppliers." },
];

const PRODUCTS = [
  { name: "Fine Sand", sub: "0.063–1mm", desc: "Ideal for plastering, mortar, and fine concrete mixes." },
  { name: "Medium Sand", sub: "1–2mm", desc: "General-purpose sand for concrete mixing and block work." },
  { name: "Coarse Sand", sub: "2–4.75mm", desc: "Structural concrete and heavy foundation applications." },
  { name: "Stone Chips 5–10mm", sub: "Fine chips", desc: "Road base, lightweight concrete, and drainage layers." },
  { name: "Stone Chips 10–20mm", sub: "Standard chips", desc: "RCC work, columns, beams, and slab construction." },
  { name: "Boulder / Pathor", sub: "20mm+", desc: "Foundation work, retaining walls, and embankment stabilization." },
];

export const About = () => {
  const statsRef = useRef(null);
  const valuesRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stats count-up animation
      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current.querySelectorAll(".stat-card"),
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: "power3.out",
            scrollTrigger: { trigger: statsRef.current, start: "top 80%" },
          }
        );
      }
      // Values
      if (valuesRef.current) {
        gsap.fromTo(
          valuesRef.current.querySelectorAll(".value-card"),
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power3.out",
            scrollTrigger: { trigger: valuesRef.current, start: "top 80%" },
          }
        );
      }
      // Timeline dots
      if (timelineRef.current) {
        gsap.fromTo(
          timelineRef.current.querySelectorAll(".milestone"),
          { x: -30, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.65, stagger: 0.15, ease: "power3.out",
            scrollTrigger: { trigger: timelineRef.current, start: "top 80%" },
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="overflow-x-hidden bg-white">
      <SeoManager
        title="About Kawsar Anher — Inqilab Trading Corporation, Chattogram"
        description="Kawsar Anher (Inqilab Trading Corporation) is Bangladesh's trusted supplier of premium construction aggregates — fine sand, stone chips, and boulders from Chattogram."
        path="/about"
        keywords="Kawsar Anher about, Inqilab Trading Corporation, sand supplier Chattogram, construction aggregate Bangladesh, Kawsar Alam CEO"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: SEO_CONFIG.siteName,
          legalName: COMPANY.legalName,
          description: "Premium sand and stone aggregate supplier in Chattogram, Bangladesh",
          foundingDate: "2014",
          url: `${SEO_CONFIG.siteUrl}/about`,
          email: COMPANY.email,
          telephone: COMPANY.phoneTel,
          address: postalAddressSchema,
          areaServed: "BD",
        }}
      />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-24 lg:py-32"
        style={{ background: `linear-gradient(135deg, #050d1f 0%, #0d1f4a 60%, #0a1633 100%)` }}
      >
        {/* Grid bg */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64'%3E%3Cpath d='M 64 0 L 0 0 0 64' fill='none' stroke='%23ffffff' stroke-width='0.4' stroke-opacity='0.04'/%3E%3C/svg%3E")`,
            backgroundSize: "64px 64px",
          }}
        />
        {/* Gold glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(196,155,43,0.07), transparent)" }}
        />
        <div className="container mx-auto px-4 text-center sm:px-8 lg:px-12">
          <p
            className="inline-block text-[11px] font-bold uppercase tracking-[0.28em]"
            style={{ color: GOLD }}
          >
            Our Story
          </p>
          <h1
            className="mx-auto mt-4 max-w-3xl text-[clamp(32px,5vw,58px)] font-black leading-tight tracking-tight text-white"
          >
            Built on Trust.<br />Delivered with Strength.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-8 text-white/60">
            Since 2014, Inqilab Trading Corporation has been Chattogram's go-to source for
            premium sand and stone aggregates — powering Bangladesh's construction sector one
            delivery at a time.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:brightness-110"
              style={{ background: `linear-gradient(135deg, ${NAVY}, #2a50b8)` }}
            >
              Get a Quote <FontAwesomeIcon icon={faArrowRight} />
            </a>
            <a
              href="/all-products"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-white/20 px-7 py-3.5 text-sm font-bold text-white/80 transition-all duration-300 hover:border-[#C49B2B] hover:text-[#C49B2B]"
            >
              View Products
            </a>
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────────────── */}
      <section ref={statsRef} className="py-16" style={{ background: "#f8f9fe" }}>
        <div className="container mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="stat-card overflow-hidden rounded-2xl bg-white p-6 text-center shadow-sm"
                style={{ border: "1px solid rgba(27,58,138,0.1)" }}
              >
                <div
                  className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-xl text-lg"
                  style={{ background: `${NAVY}12`, color: NAVY }}
                >
                  <FontAwesomeIcon icon={s.icon} />
                </div>
                <p
                  className="text-[clamp(28px,4vw,38px)] font-black leading-none"
                  style={{ color: NAVY }}
                >
                  {s.value}
                </p>
                <p className="mt-2 text-[13px] font-semibold text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOUNDER / CEO ─────────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Photo */}
            <div className="relative flex justify-center">
              <div
                className="relative overflow-hidden rounded-3xl shadow-2xl"
                style={{ border: `4px solid ${GOLD}`, maxWidth: 420 }}
              >
                <img
                  src="/kawsar-alam.jpg"
                  alt="Kawsar Alam — Founder & CEO, Inqilab Trading Corporation"
                  className="w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.parentElement.style.minHeight = "380px";
                    e.currentTarget.parentElement.style.background = `linear-gradient(135deg, ${NAVY}, #0d1f4a)`;
                    e.currentTarget.parentElement.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:380px;font-size:80px;font-weight:900;color:${GOLD};font-family:serif;">KA</div>`;
                  }}
                />
                {/* Gold overlay label */}
                <div
                  className="absolute bottom-0 inset-x-0 p-5"
                  style={{ background: "linear-gradient(to top, rgba(5,13,31,0.9), transparent)" }}
                >
                  <p className="text-lg font-black text-white">Kawsar Alam</p>
                  <p className="text-sm font-semibold" style={{ color: GOLD }}>Founder &amp; CEO</p>
                </div>
              </div>
              {/* Gold dot accent */}
              <div
                className="absolute -right-3 -top-3 h-6 w-6 rounded-full"
                style={{ background: GOLD }}
              />
              <div
                className="absolute -bottom-3 -left-3 h-4 w-4 rounded-full opacity-60"
                style={{ background: GOLD }}
              />
            </div>

            {/* Content */}
            <div>
              <span
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em]"
                style={{ background: `${NAVY}10`, color: NAVY }}
              >
                <FontAwesomeIcon icon={faBuilding} className="text-[10px]" />
                Founder &amp; CEO — Inqilab Trading Corporation
              </span>
              <h2
                className="mt-4 text-[clamp(28px,4vw,44px)] font-black leading-tight tracking-tight"
                style={{ color: "#0d1a36" }}
              >
                Kawsar Alam
              </h2>
              <div className="mt-4 flex flex-wrap gap-4">
                <span className="flex items-center gap-2 text-[13px] text-gray-500">
                  <FontAwesomeIcon icon={faGraduationCap} style={{ color: GOLD }} />
                  MBA in Accounting
                </span>
                <span className="flex items-center gap-2 text-[13px] text-gray-500">
                  <FontAwesomeIcon icon={faBriefcase} style={{ color: GOLD }} />
                  6+ Years Finance Experience
                </span>
              </div>
              <div className="my-6 h-[2px] w-16 rounded-full" style={{ background: GOLD }} />
              <p className="text-[15px] leading-8 text-gray-600">
                A seasoned finance professional with an MBA in Accounting and over 6 years of
                experience at Compliance BD Ltd., Kawsar Alam founded Inqilab Trading Corporation
                with a singular vision: to supply Bangladesh's booming construction sector with
                world-class aggregates — consistently, reliably, and on time.
              </p>
              <p className="mt-4 text-[15px] leading-8 text-gray-600">
                Under his leadership, Inqilab Trading Corporation has grown from a Chattogram-based
                startup to one of the region's most trusted names in sand and stone supply.
              </p>
              <blockquote
                className="relative mt-7 rounded-2xl py-5 pl-6 pr-5"
                style={{ background: `${NAVY}06`, borderLeft: `4px solid ${GOLD}` }}
              >
                <FontAwesomeIcon icon={faQuoteLeft} className="mb-2 text-lg" style={{ color: GOLD, opacity: 0.6 }} />
                <p className="text-[15px] font-semibold italic leading-7" style={{ color: NAVY }}>
                  "We don't just supply materials — we build the foundations of Bangladesh."
                </p>
                <span className="mt-2 block text-[12px] font-bold tracking-wide text-gray-400">
                  — Kawsar Alam, Founder &amp; CEO
                </span>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ── TEAM ──────────────────────────────────────────────────────────── */}
      <TeamSection />

      {/* ── VALUES ────────────────────────────────────────────────────────── */}
      <section
        ref={valuesRef}
        className="py-20"
        style={{ background: "linear-gradient(135deg, #050d1f 0%, #0d1f4a 100%)" }}
      >
        <div className="container mx-auto px-4 sm:px-8 lg:px-12">
          <div className="mb-14 text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: GOLD }}>
              Why Choose Us
            </p>
            <h2
              className="mt-3 text-[clamp(26px,4vw,42px)] font-black leading-tight text-white"
            >
              Our Core Values
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="value-card group rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div
                  className="grid h-14 w-14 place-items-center rounded-2xl text-xl"
                  style={{ background: `${GOLD}18`, color: GOLD }}
                >
                  <FontAwesomeIcon icon={v.icon} />
                </div>
                <h3 className="mt-5 text-lg font-black text-white">{v.title}</h3>
                <p className="mt-3 text-[14px] leading-6 text-white/55">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCTS LIST ─────────────────────────────────────────────────── */}
      <section className="py-20" style={{ background: "#f8f9fe" }}>
        <div className="container mx-auto px-4 sm:px-8 lg:px-12">
          <div className="mb-12 text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: GOLD }}>
              What We Supply
            </p>
            <h2 className="mt-3 text-[clamp(26px,4vw,42px)] font-black leading-tight" style={{ color: "#0d1a36" }}>
              Our Product Range
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((p, i) => (
              <div
                key={p.name}
                className="group overflow-hidden rounded-2xl bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                style={{ border: "1px solid rgba(27,58,138,0.1)" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="grid h-12 w-12 shrink-0 place-items-center rounded-xl text-lg"
                    style={{ background: i % 2 === 0 ? `${NAVY}12` : `${GOLD}18`, color: i % 2 === 0 ? NAVY : GOLD }}
                  >
                    <FontAwesomeIcon icon={faMountain} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-safety-ink">{p.name}</h3>
                    <p className="text-[11px] font-bold uppercase tracking-wide" style={{ color: GOLD }}>{p.sub}</p>
                  </div>
                </div>
                <p className="mt-4 text-[14px] leading-6 text-gray-500">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ──────────────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12">
          <div className="mb-12 text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: GOLD }}>
              Our Journey
            </p>
            <h2 className="mt-3 text-[clamp(26px,4vw,42px)] font-black leading-tight" style={{ color: "#0d1a36" }}>
              Company Milestones
            </h2>
          </div>
          <div ref={timelineRef} className="relative max-w-3xl mx-auto">
            {/* Vertical line */}
            <div
              className="absolute left-[22px] top-0 h-full w-[2px] sm:left-1/2"
              style={{ background: `linear-gradient(to bottom, ${NAVY}, ${GOLD}, ${NAVY})`, opacity: 0.2 }}
            />
            {MILESTONES.map((m, i) => (
              <div
                key={m.year}
                className={`milestone relative mb-8 flex items-start gap-6 ${i % 2 === 1 ? "sm:flex-row-reverse" : ""}`}
              >
                {/* Dot */}
                <div
                  className="relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full text-xs font-black text-white shadow-lg sm:mx-auto"
                  style={{ background: `linear-gradient(135deg, ${NAVY}, #2a50b8)` }}
                >
                  {m.year.slice(2)}
                </div>
                <div
                  className={`flex-1 overflow-hidden rounded-2xl bg-white p-5 shadow-sm ${i % 2 === 1 ? "sm:mr-6" : "sm:ml-6"}`}
                  style={{ border: "1px solid rgba(27,58,138,0.1)" }}
                >
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: GOLD }}>{m.year}</p>
                  <h3 className="mt-1 text-lg font-extrabold text-safety-ink">{m.title}</h3>
                  <p className="mt-2 text-[14px] leading-6 text-gray-500">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT CTA ───────────────────────────────────────────────────── */}
      <section
        className="py-20"
        style={{ background: "linear-gradient(135deg, #050d1f 0%, #0d1f4a 100%)" }}
      >
        <div className="container mx-auto px-4 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: GOLD }}>
              Get in Touch
            </p>
            <h2 className="mt-4 text-[clamp(26px,4vw,42px)] font-black leading-tight text-white">
              Ready to Order Premium Aggregates?
            </h2>
            <p className="mt-4 text-[15px] leading-8 text-white/60">
              Contact us today for pricing, availability, and delivery scheduling across Chattogram.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
              <a
                href={`tel:${COMPANY.phoneTel}`}
                className="inline-flex items-center gap-2.5 rounded-xl px-6 py-3.5 text-sm font-bold text-white transition-all hover:brightness-110"
                style={{ background: `linear-gradient(135deg, ${NAVY}, #2a50b8)` }}
              >
                <FontAwesomeIcon icon={faPhone} />
                {COMPANY.phone}
              </a>
              <a
                href={`mailto:${COMPANY.email}`}
                className="inline-flex items-center gap-2.5 rounded-xl border-2 border-white/20 px-6 py-3.5 text-sm font-bold text-white/80 transition-all hover:border-[#C49B2B] hover:text-[#C49B2B]"
              >
                <FontAwesomeIcon icon={faEnvelope} />
                {COMPANY.email}
              </a>
            </div>
            <p className="mt-6 flex items-center justify-center gap-2 text-[13px] text-white/40">
              <FontAwesomeIcon icon={faLocationDot} style={{ color: GOLD }} />
              {COMPANY.address.city}, {COMPANY.address.country}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

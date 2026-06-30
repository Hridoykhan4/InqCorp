import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuoteLeft,
  faBriefcase,
  faGraduationCap,
  faBuilding,
} from "@fortawesome/free-solid-svg-icons";

// ── Supporting team members (placeholder) ────────────────────────────────────
const SUPPORT_TEAM = [
  {
    initials: "RM",
    name: "Rahim Uddin",
    title: "Operations Manager",
    color: "#1B3A8A",
    desc: "Oversees daily logistics, delivery scheduling, and warehouse operations ensuring every order ships accurately and on time across Chattogram.",
  },
  {
    initials: "SA",
    name: "Salma Akter",
    title: "Sales Executive",
    color: "#C49B2B",
    desc: "Handles client relationships, quotations, and new business development, connecting construction firms with the right aggregate solutions.",
  },
  {
    initials: "JH",
    name: "Jamal Hossain",
    title: "Logistics Coordinator",
    color: "#1B3A8A",
    desc: "Coordinates fleet and transport routes to deliver materials efficiently across project sites, minimising downtime for construction teams.",
  },
];

// ── CEO Avatar with fallback ──────────────────────────────────────────────────
const CEOPhoto = () => {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return (
      <div
        className="flex h-full w-full items-center justify-center rounded-2xl"
        style={{
          background: "linear-gradient(135deg, #1B3A8A 0%, #0d1f4a 100%)",
        }}
      >
        <span
          className="text-6xl font-black"
          style={{ color: "#C49B2B", fontFamily: "serif" }}
        >
          KA
        </span>
      </div>
    );
  }

  return (
    <img
      src="/kawsar-alam.jpg"
      alt="Kawsar Alam — Founder & CEO, Inqilab Trading Corporation"
      onError={() => setImgError(true)}
      className="h-full w-full rounded-2xl object-cover object-top"
      draggable={false}
    />
  );
};

// ── Text Avatar for support members ──────────────────────────────────────────
const TextAvatar = ({ initials, color }) => (
  <div
    className="flex h-20 w-20 items-center justify-center rounded-full text-xl font-black text-white shadow-lg"
    style={{ background: color }}
  >
    {initials}
  </div>
);

// ── Main Component ────────────────────────────────────────────────────────────
const TeamSection = () => {
  return (
    <section
      className="relative w-full overflow-hidden py-20 lg:py-28"
      style={{ background: "#F8F9FE" }}
    >
      {/* ── Subtle background pattern ─────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle cx='30' cy='30' r='1' fill='%231B3A8A' opacity='0.04'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container mx-auto px-4 sm:px-8 lg:px-12">

        {/* ── Section heading ───────────────────────────────────────────────── */}
        <div className="mb-14 text-center" data-aos="fade-up">
          <p
            className="inline-block text-[11px] font-bold uppercase tracking-[0.25em]"
            style={{ color: "#C49B2B" }}
          >
            Our Leadership
          </p>
          <h2
            className="mt-3 text-[clamp(28px,4vw,44px)] font-black leading-tight tracking-tight"
            style={{ color: "#0d1a36" }}
          >
            Meet Our Leadership
          </h2>
          {/* Gold underline accent */}
          <div className="mx-auto mt-4 flex items-center justify-center gap-2">
            <span
              className="block h-[3px] w-16 rounded-full"
              style={{ background: "#C49B2B" }}
            />
            <span
              className="block h-2 w-2 rounded-full"
              style={{ background: "#C49B2B" }}
            />
            <span
              className="block h-[3px] w-16 rounded-full"
              style={{ background: "#C49B2B" }}
            />
          </div>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-7 text-gray-500">
            The people behind Bangladesh's most reliable construction aggregate
            supply chain — driven by expertise, integrity, and results.
          </p>
        </div>

        {/* ── CEO Featured Card ─────────────────────────────────────────────── */}
        <div
          data-aos="fade-up"
          data-aos-delay="100"
          className="relative mb-12 overflow-hidden rounded-3xl bg-white shadow-[0_8px_48px_rgba(27,58,138,0.12)]"
          style={{
            borderLeft: "5px solid #1B3A8A",
          }}
        >
          {/* Top gold accent strip */}
          <div
            className="absolute inset-x-0 top-0 h-1"
            style={{
              background: "linear-gradient(90deg, #C49B2B, #e8c55a, #C49B2B)",
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] xl:grid-cols-[380px_1fr]">

            {/* Photo column */}
            <div
              className="relative flex items-stretch justify-center overflow-hidden"
              style={{
                background: "linear-gradient(160deg, #0d1f4a 0%, #1B3A8A 100%)",
                minHeight: 380,
              }}
            >
              {/* Decorative circles */}
              <div
                className="absolute -bottom-12 -right-12 h-48 w-48 rounded-full opacity-10"
                style={{ background: "#C49B2B" }}
              />
              <div
                className="absolute -left-8 -top-8 h-32 w-32 rounded-full opacity-10"
                style={{ background: "#C49B2B" }}
              />

              <div className="relative z-10 flex items-end justify-center p-8 pb-0 lg:pb-8 lg:pl-8 lg:pr-4">
                <div
                  className="overflow-hidden rounded-2xl shadow-2xl"
                  style={{
                    width: "100%",
                    maxWidth: 320,
                    height: 380,
                    border: "3px solid rgba(196,155,43,0.4)",
                  }}
                >
                  <CEOPhoto />
                </div>
              </div>
            </div>

            {/* Content column */}
            <div className="flex flex-col justify-center p-8 lg:p-10 xl:p-12">
              {/* Title badge */}
              <span
                className="mb-4 inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em]"
                style={{
                  background: "rgba(27,58,138,0.08)",
                  color: "#1B3A8A",
                }}
              >
                <FontAwesomeIcon icon={faBuilding} className="text-[10px]" />
                Founder &amp; CEO — Inqilab Trading Corporation
              </span>

              <h3
                className="text-[clamp(26px,3.5vw,40px)] font-black leading-tight tracking-tight"
                style={{ color: "#0d1a36" }}
              >
                Kawsar Alam
              </h3>

              {/* Meta info */}
              <div className="mt-4 flex flex-wrap gap-4">
                <span className="flex items-center gap-2 text-[13px] text-gray-500">
                  <FontAwesomeIcon icon={faGraduationCap} style={{ color: "#C49B2B" }} />
                  MBA in Accounting
                </span>
                <span className="flex items-center gap-2 text-[13px] text-gray-500">
                  <FontAwesomeIcon icon={faBriefcase} style={{ color: "#C49B2B" }} />
                  6+ Years Finance Experience
                </span>
              </div>

              {/* Gold divider */}
              <div
                className="my-6 h-[2px] w-16 rounded-full"
                style={{ background: "#C49B2B" }}
              />

              {/* Bio */}
              <p className="text-[15px] leading-7 text-gray-600">
                A seasoned finance professional with an MBA in Accounting and 6+
                years of experience at Compliance BD Ltd., Kawsar Alam founded
                Inqilab Trading Corporation with a vision to supply Bangladesh's
                construction sector with world-class aggregates — on time, every
                time.
              </p>

              {/* Quote */}
              <blockquote
                className="relative mt-7 rounded-xl py-4 pl-5 pr-5"
                style={{
                  background: "rgba(27,58,138,0.04)",
                  borderLeft: "4px solid #C49B2B",
                }}
              >
                <FontAwesomeIcon
                  icon={faQuoteLeft}
                  className="mb-2 text-[18px]"
                  style={{ color: "#C49B2B", opacity: 0.6 }}
                />
                <p
                  className="text-[15px] font-semibold italic leading-7"
                  style={{ color: "#1B3A8A" }}
                >
                  "We don't just supply materials — we build the foundations of
                  Bangladesh."
                </p>
                <span className="mt-2 block text-[12px] font-bold tracking-wide text-gray-400">
                  — Kawsar Alam, Founder &amp; CEO
                </span>
              </blockquote>
            </div>
          </div>
        </div>

        {/* ── Supporting team grid ──────────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SUPPORT_TEAM.map((member, i) => (
            <div
              key={member.name}
              data-aos="fade-up"
              data-aos-delay={i * 100 + 150}
              className="group relative overflow-hidden rounded-2xl bg-white p-7 shadow-[0_4px_24px_rgba(27,58,138,0.08)] transition-all duration-300 hover:shadow-[0_8px_40px_rgba(27,58,138,0.18)] hover:-translate-y-1"
            >
              {/* Hover top accent */}
              <div
                className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-400 group-hover:scale-x-100"
                style={{
                  background: `linear-gradient(90deg, ${member.color}, #C49B2B)`,
                }}
              />

              <div className="flex items-center gap-4">
                <TextAvatar initials={member.initials} color={member.color} />
                <div>
                  <h4
                    className="text-[17px] font-bold"
                    style={{ color: "#0d1a36" }}
                  >
                    {member.name}
                  </h4>
                  <p
                    className="mt-0.5 text-[12px] font-semibold uppercase tracking-wide"
                    style={{ color: "#C49B2B" }}
                  >
                    {member.title}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div
                className="my-5 h-px w-full"
                style={{ background: "rgba(27,58,138,0.08)" }}
              />

              <p className="text-[14px] leading-6 text-gray-500">
                {member.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;

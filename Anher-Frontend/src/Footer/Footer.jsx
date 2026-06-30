import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faEnvelope,
  faPhone,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import map from "../assets/image/Footer/worldMap.png";
import { useSelector } from "react-redux";
import { COMPANY } from "../SEO/companyInfo";
import { capitalizeWords } from "../Functions/functions";
import {
  COMPANY_NAV_ITEMS,
  getCategoryHref,
  getCategoryList,
  openCategoryDestination,
} from "../config/navigation";

// ── Fallback product list (shown until real categories load) ──────────────────
const FALLBACK_PRODUCTS = [
  { name: "Fine Sand" },
  { name: "Medium Sand" },
  { name: "Coarse Sand" },
  { name: "Stone Chips 5–10mm" },
  { name: "Stone Chips 10–20mm" },
  { name: "Boulder / Pathor" },
];

// ── Social links ──────────────────────────────────────────────────────────────
const SOCIAL_LINKS = [
  {
    key: "facebook",
    icon: faFacebookF,
    href: COMPANY.social.facebook,
    label: "Facebook",
  },
  {
    key: "whatsapp",
    icon: faWhatsapp,
    href: `https://wa.me/${COMPANY.social.whatsapp}`,
    label: "WhatsApp",
  },
];

// ── Footer component ──────────────────────────────────────────────────────────
const Footer = ({ categories }) => {
  const navigate = useNavigate();
  const logo = useSelector((state) => state.hvac.logo);

  // Build product nav list — real categories if available, fallback otherwise
  const rawList = getCategoryList(categories && categories.length > 0 ? categories : FALLBACK_PRODUCTS, { limit: 6 });
  const productNav = rawList.map((c) => ({
    label: capitalizeWords(c?.label || c?.name) || "",
    to: getCategoryHref(c),
    item: c,
  }));

  return (
    <footer
      className="relative overflow-hidden text-white"
      style={{ background: "#0A1628" }}
    >
      {/* ── World map background ─────────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `url(${map})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.06,
        }}
      />

      {/* ── Top border line ──────────────────────────────────────────────── */}
      <div
        className="absolute inset-x-0 top-0 h-[2px]"
        style={{
          background: "linear-gradient(90deg, transparent, #C49B2B 30%, #C49B2B 70%, transparent)",
          opacity: 0.6,
        }}
      />

      {/* ── CTA strip ────────────────────────────────────────────────────── */}
      <div className="relative border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
        <div className="container mx-auto px-4 py-6 sm:px-8 lg:px-12">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p
                className="text-[11px] font-bold uppercase tracking-[0.22em]"
                style={{ color: "#C49B2B" }}
              >
                Ready to start your project?
              </p>
              <p className="mt-1 text-[15px] font-semibold text-white/80">
                Get premium aggregates delivered to your site — Chattogram &amp; beyond.
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate("/contact")}
              className="footer-cta-btn group inline-flex shrink-0 items-center gap-2.5 rounded-xl px-6 py-3 text-sm font-bold text-white transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #1B3A8A, #2a50b8)",
                border: "1px solid rgba(196,155,43,0.3)",
              }}
            >
              Request a Quote
              <FontAwesomeIcon
                icon={faArrowRight}
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </div>
        </div>
      </div>

      {/* ── Main footer columns ───────────────────────────────────────────── */}
      <div className="relative">
        <div className="container mx-auto px-4 py-14 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.9fr_0.9fr_1.1fr]">

            {/* ── COLUMN 1: Brand ──────────────────────────────────────────── */}
            <div>
              {/* Logo + name */}
              <button
                type="button"
                onClick={() => navigate("/")}
                className="flex items-center gap-3 text-left"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-1 shadow-lg">
                  {logo ? (
                    <img
                      src={logo}
                      alt="ITC logo"
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <img
                      src="/inqcorpLogo.jpeg"
                      alt="Inqilab Trading Corporation"
                      className="h-full w-full object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.parentElement.textContent = "KA";
                        e.currentTarget.parentElement.style.color = "#1B3A8A";
                        e.currentTarget.parentElement.style.fontWeight = "900";
                        e.currentTarget.parentElement.style.fontSize = "14px";
                      }}
                    />
                  )}
                </span>
                <span>
                  <span className="block text-[18px] font-black leading-tight text-white">
                    {COMPANY.name}
                  </span>
                  <span
                    className="block text-[10px] font-bold uppercase tracking-[0.2em]"
                    style={{ color: "#C49B2B" }}
                  >
                    {COMPANY.legalName}
                  </span>
                </span>
              </button>

              {/* Tagline */}
              <p
                className="mt-4 text-[12px] font-bold uppercase tracking-[0.22em]"
                style={{ color: "#C49B2B" }}
              >
                "{COMPANY.tagline}"
              </p>

              {/* Description */}
              <p className="mt-3 max-w-xs text-[13px] leading-6 text-white/55">
                Bangladesh's premium sand &amp; stone aggregate supplier — fine
                sands, stone chips, and boulders for every construction scale.
                Sourced from quality quarries, delivered on time.
              </p>

              {/* Social links */}
              <div className="mt-5 flex items-center gap-2.5">
                {SOCIAL_LINKS.map((item) => (
                  <a
                    key={item.key}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="footer-social-btn flex h-10 w-10 items-center justify-center rounded-xl border text-white/60 transition-all duration-300"
                    style={{ borderColor: "rgba(255,255,255,0.1)" }}
                  >
                    <FontAwesomeIcon icon={item.icon} className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* ── COLUMN 2: Products ───────────────────────────────────────── */}
            <div>
              <h4
                className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-white"
              >
                Products
              </h4>
              <ul className="mt-5 space-y-3">
                {productNav.map((item) => (
                  <li key={item.label}>
                    <button
                      type="button"
                      onClick={() =>
                        item.item
                          ? openCategoryDestination(item.item, navigate)
                          : navigate(item.to)
                      }
                      className="footer-link group inline-flex items-center gap-2 text-[13px] text-white/55 transition-colors duration-200"
                    >
                      <span
                        className="block h-px w-0 rounded-full transition-all duration-300 group-hover:w-4"
                        style={{ background: "#C49B2B" }}
                      />
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── COLUMN 3: Quick Links ────────────────────────────────────── */}
            <div>
              <h4
                className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-white"
              >
                Quick Links
              </h4>
              <ul className="mt-5 space-y-3">
                {COMPANY_NAV_ITEMS.map(({ label, path }) => (
                  <li key={path}>
                    <button
                      type="button"
                      onClick={() => navigate(path)}
                      className="footer-link group inline-flex items-center gap-2 text-[13px] text-white/55 transition-colors duration-200"
                    >
                      <span
                        className="block h-px w-0 rounded-full transition-all duration-300 group-hover:w-4"
                        style={{ background: "#C49B2B" }}
                      />
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── COLUMN 4: Contact ────────────────────────────────────────── */}
            <div>
              <h4
                className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-white"
              >
                Contact Us
              </h4>
              <div className="mt-5 space-y-4">
                {/* Location */}
                <a
                  href={COMPANY.mapDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-contact-link flex items-start gap-3 text-[13px] text-white/55 transition-colors duration-200"
                >
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className="mt-0.5 shrink-0 text-[14px]"
                    style={{ color: "#C49B2B" }}
                  />
                  <span>{COMPANY.addressFull}</span>
                </a>

                {/* Phone */}
                <a
                  href={`tel:${COMPANY.phoneTel}`}
                  className="footer-contact-link flex items-start gap-3 text-[13px] text-white/55 transition-colors duration-200"
                >
                  <FontAwesomeIcon
                    icon={faPhone}
                    className="mt-0.5 shrink-0 text-[14px]"
                    style={{ color: "#C49B2B" }}
                  />
                  <span>{COMPANY.phone}</span>
                </a>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="mt-0.5 shrink-0 text-[14px]"
                    style={{ color: "#C49B2B" }}
                  />
                  <span className="flex flex-col gap-1">
                    {COMPANY.emails.map((mail) => (
                      <a
                        key={mail}
                        href={`mailto:${mail}`}
                        className="footer-contact-link break-all text-[13px] text-white/55 transition-colors duration-200"
                      >
                        {mail}
                      </a>
                    ))}
                  </span>
                </div>
              </div>

              {/* Talk to us button */}
              <button
                type="button"
                onClick={() => navigate("/contact")}
                className="footer-talk-btn mt-6 inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-[13px] font-bold text-white/75 transition-all duration-300 hover:border-[#C49B2B] hover:text-[#C49B2B]"
              >
                Talk to Us
                <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Divider ─────────────────────────────────────────────────────── */}
      <div
        className="relative mx-4 h-px sm:mx-8 lg:mx-12"
        style={{ background: "rgba(255,255,255,0.07)" }}
      />

      {/* ── Bottom bar ───────────────────────────────────────────────────── */}
      <div className="relative">
        <div className="container mx-auto px-4 py-5 sm:px-8 lg:px-12">
          <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
            <p className="text-[12px] text-white/40">
              © {new Date().getFullYear()} {COMPANY.legalName}. All rights
              reserved.
            </p>
            <p
              className="text-[12px] font-semibold"
              style={{ color: "rgba(196,155,43,0.6)" }}
            >
              {COMPANY.name}
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .footer-link:hover {
          color: #C49B2B !important;
        }
        .footer-contact-link:hover {
          color: #C49B2B !important;
        }
        .footer-social-btn:hover {
          border-color: #C49B2B !important;
          color: #C49B2B !important;
          background: rgba(196,155,43,0.08);
        }
        .footer-cta-btn:hover {
          filter: brightness(1.12);
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(27,58,138,0.5);
        }
        @media (prefers-reduced-motion: reduce) {
          .footer-cta-btn { transform: none !important; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;

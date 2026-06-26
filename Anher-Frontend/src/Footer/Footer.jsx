import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  faArrowRight,
  faEnvelope,
  faFileShield,
  faLocationDot,
  faPhone,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
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

const socialLinks = [
  { key: "facebook", icon: faFacebookF, href: "https://www.facebook.com/safetyplusindustry" },
  { key: "x", icon: faXTwitter, href: "#" },
  { key: "linkedin", icon: faLinkedinIn, href: "#" },
  { key: "instagram", icon: faInstagram, href: "#" },
];

const Footer = ({ categories }) => {
  const navigate = useNavigate();
  const logo = useSelector((state) => state.hvac.logo);

  // Real categories drive the Products column; fall back to the static list
  // until they load. Each links straight to its category page.
  const configuredProductNav = getCategoryList(categories, { limit: 6 }).map((c) => ({
    label: capitalizeWords(c?.label || c?.name),
    to: getCategoryHref(c),
    item: c,
  }));
  const productNav = configuredProductNav;

  return (
    <footer className="relative overflow-hidden bg-safety-ink text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage: `url(${map})`, backgroundSize: "cover", backgroundPosition: "center" }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10" />

      <div className="container-page relative">
        <section className="grid gap-4 py-8 md:grid-cols-3">
          <div className="rounded-lg border border-white/10 bg-white/5 p-5">
            <FontAwesomeIcon icon={faShieldHalved} className="text-2xl text-safety-amber" />
            <h3 className="mt-4 text-xl font-extrabold">Fire Safety Equipment</h3>
            <p className="mt-2 text-sm leading-6 text-white/65">
              Focused products for Bangladesh factories, buildings, and industrial teams.
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-5">
            <FontAwesomeIcon icon={faFileShield} className="text-2xl text-safety-amber" />
            <h3 className="mt-4 text-xl font-extrabold">Datasheet Ready</h3>
            <p className="mt-2 text-sm leading-6 text-white/65">
              Product documentation can be uploaded as technical sheets become available.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/contact")}
            className="rounded-lg bg-safety-red p-5 text-left shadow-lg transition hover:bg-safety-red-dark"
          >
            <span className="block text-sm font-bold uppercase tracking-[0.16em] text-red-100">
              Need pricing?
            </span>
            <span className="mt-3 flex items-center justify-between text-xl font-extrabold">
              Request a quote
              <FontAwesomeIcon icon={faArrowRight} />
            </span>
          </button>
        </section>

        <div className="h-px w-full bg-white/10" />

        <section className="grid gap-10 py-12 lg:grid-cols-[1.1fr_0.8fr_0.8fr_1fr]">
          <div>
            <button
              type="button"
              className="flex items-center gap-3 text-left"
              onClick={() => navigate("/")}
            >
              <span className="grid h-12 w-12 place-items-center overflow-hidden rounded-md bg-white p-1">
                {logo ? (
                  <img src={logo} alt="SafetyPlus logo" className="h-full w-full object-contain" />
                ) : (
                  <FontAwesomeIcon icon={faShieldHalved} className="text-safety-red" />
                )}
              </span>
              <span>
                <span className="block text-xl font-black">SafetyPlus</span>
                <span className="block text-xs font-bold uppercase tracking-[0.18em] text-white/55">
                  Fire Safety Bangladesh
                </span>
              </span>
            </button>

            <p className="mt-5 max-w-md text-sm leading-7 text-white/68">
              SafetyPlus manufactures and supplies fire safety equipment for the
              Bangladesh market, including DB boxes, hose cabinets, fire doors,
              industrial racks, furniture, and protective garments.
            </p>

            <div className="mt-5 flex items-center gap-3">
              {socialLinks.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  className="grid h-10 w-10 place-items-center rounded-md border border-white/12 text-white/70 transition hover:border-safety-amber hover:text-safety-amber"
                  aria-label={item.key}
                >
                  <FontAwesomeIcon icon={item.icon} className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-extrabold uppercase tracking-[0.16em] text-white">
              Company
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-white/68">
              {COMPANY_NAV_ITEMS.map(({ label, path }) => (
                <li key={path}>
                  <button
                    type="button"
                    onClick={() => navigate(path)}
                    className="transition hover:text-safety-amber"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-extrabold uppercase tracking-[0.16em] text-white">
              Products
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-white/68">
              {productNav.map((item) => (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() =>
                      item.item ? openCategoryDestination(item.item, navigate) : navigate(item.to)
                    }
                    className="group inline-flex items-center gap-1.5 text-left transition hover:text-safety-amber"
                  >
                    <span className="h-px w-0 bg-safety-amber transition-all duration-300 group-hover:w-3" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-extrabold uppercase tracking-[0.16em] text-white">
              Contact
            </h4>
            <div className="mt-5 space-y-4 text-sm text-white/68">
              <a
                href={COMPANY.mapDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 transition hover:text-safety-amber"
              >
                <FontAwesomeIcon icon={faLocationDot} className="mt-1 text-safety-amber" />
                {COMPANY.addressFull}
              </a>
              <div className="flex items-start gap-3">
                <FontAwesomeIcon icon={faEnvelope} className="mt-1 text-safety-amber" />
                <span className="flex flex-col gap-1">
                  {COMPANY.emails.map((mail) => (
                    <a
                      key={mail}
                      href={`mailto:${mail}`}
                      className="break-all transition hover:text-safety-amber"
                    >
                      {mail}
                    </a>
                  ))}
                </span>
              </div>
              <a
                href={`tel:${COMPANY.phoneTel}`}
                className="flex items-start gap-3 transition hover:text-safety-amber"
              >
                <FontAwesomeIcon icon={faPhone} className="mt-1 text-safety-amber" />
                {COMPANY.phone}
              </a>
            </div>

            <button
              type="button"
              onClick={() => navigate("/contact")}
              className="mt-6 inline-flex min-h-11 items-center rounded-md bg-white px-5 py-3 text-sm font-extrabold text-safety-ink transition hover:bg-red-50 hover:text-safety-red"
            >
              Talk to SafetyPlus
            </button>
          </div>
        </section>

        <div className="h-px w-full bg-white/10" />

        <div className="flex flex-col items-center justify-between gap-4 py-6 text-sm text-white/55 md:flex-row">
          <p>© {new Date().getFullYear()} SafetyPlus. All rights reserved.</p>
          <p>Fire safety equipment manufacturer and supplier in Bangladesh.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

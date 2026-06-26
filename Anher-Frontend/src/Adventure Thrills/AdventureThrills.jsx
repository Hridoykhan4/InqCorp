import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faFileShield,
  faHandshake,
  faHelmetSafety,
  faListCheck,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";

const benefits = [
  {
    title: "Clear procurement path",
    text: "Product lines, specifications, and quote actions are designed for factory and commercial buyers.",
    icon: faListCheck,
  },
  {
    title: "Technical data workflow",
    text: "Datasheets can support product pages when the technical documents are ready.",
    icon: faFileShield,
  },
  {
    title: "Industrial protection focus",
    text: "The product selection starts with high-demand safety and storage needs in Bangladesh.",
    icon: faHelmetSafety,
  },
  {
    title: "Local supply mindset",
    text: "In-house manufacturing supports communication, customization, and practical lead-time planning.",
    icon: faTruckFast,
  },
  {
    title: "Future compliance roadmap",
    text: "SafetyPlus can grow toward UL listed products without confusing current buyers.",
    icon: faChartLine,
  },
  {
    title: "Relationship-driven sales",
    text: "The website guides serious visitors toward quotation, catalogue, and direct discussion.",
    icon: faHandshake,
  },
];

export default function AdventureThrills() {
  return (
    <section className="section-page bg-safety-ink text-white">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-200">
              Buyer Experience
            </p>
            <h2 className="mt-4 text-balance text-3xl font-black leading-tight md:text-5xl">
              Designed for Bangladeshi businesses that need safety decisions fast.
            </h2>
            <p className="mt-5 text-base leading-8 text-white/68">
              The site should help visitors understand SafetyPlus quickly,
              compare product lines, and contact the team without fighting the UI.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {benefits.map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-white/10 bg-white/[0.06] p-5 transition hover:-translate-y-1 hover:bg-white/[0.09]"
              >
                <span className="grid h-11 w-11 place-items-center rounded-md bg-safety-amber text-safety-ink">
                  <FontAwesomeIcon icon={item.icon} />
                </span>
                <h3 className="mt-5 text-lg font-extrabold">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/65">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

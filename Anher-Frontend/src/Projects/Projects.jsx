import { useNavigate } from "react-router-dom";
import { SeoManager } from "../SEO/SeoManager";

export const Projects = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#f6f8fb] px-4 py-10 md:px-6 md:py-16">
      <SeoManager
        title="SafetyPlus Projects"
        description="Upcoming SafetyPlus project showcases featuring completed fire safety, hose cabinet, fire door, and industrial protection installations across Bangladesh."
        path="/projects"
        keywords="fire safety projects, SafetyPlus portfolio, industrial safety projects Bangladesh"
      />
      <section className="mx-auto flex min-h-[70vh] w-full max-w-[1200px] items-center justify-center overflow-hidden rounded-[28px] bg-[#0A3161] px-6 py-16 text-center md:px-10">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#FFD166]">
            Projects
          </p>
          <h1 className="mt-5 text-4xl font-semibold leading-tight text-white md:text-6xl">
            Coming Soon
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/75 md:text-lg">
            We&apos;re preparing this page and will showcase our completed fire
            safety and industrial protection projects here very soon.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => navigate("/contact")}
              className="rounded-full bg-[#FF6900] px-6 py-3 font-semibold text-white transition hover:scale-[1.02]"
            >
              Contact Us
            </button>
            <button
              onClick={() => navigate("/")}
              className="rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-[#0A3161]"
            >
              Back To Home
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

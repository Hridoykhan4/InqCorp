import React from "react";

/* Small inline icons so it looks exactly like the mock */
const UiIcon = {
  plane: (cls = "") => (
    <svg
      viewBox="0 0 24 24"
      className={cls}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M22 2L11 13" />
      <path d="M22 2l-7 20-4-9-9-4 20-7z" />
    </svg>
  ),
  phone: (cls = "") => (
    <svg
      viewBox="0 0 24 24"
      className={cls}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72 12.8 12.8 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.8 12.8 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  mail: (cls = "") => (
    <svg
      viewBox="0 0 24 24"
      className={cls}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  ),
  pin: (cls = "") => (
    <svg
      viewBox="0 0 24 24"
      className={cls}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M12 21s-6-4.35-6-10a6 6 0 1 1 12 0c0 5.65-6 10-6 10z" />
      <circle cx="12" cy="11" r="2.5" />
    </svg>
  ),
  clock: (cls = "") => (
    <svg
      viewBox="0 0 24 24"
      className={cls}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v6l4 2" />
    </svg>
  ),
  quoteWave: () => (
    <svg
      width="56"
      height="12"
      viewBox="0 0 56 12"
      fill="none"
      className="inline -mt-1 ml-2"
    >
      <path
        d="M1 6c5-6 9 6 14 0s9 6 14 0 9 6 14 0 9 6 14 0"
        stroke="#8CCF5D"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
};

/* One input with a trailing circular icon (like the mock) */
const Field = ({ label, placeholder, type = "text", icon = "plane" }) => {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-semibold text-emerald-800/90">
        {label}
      </span>
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          className="h-12 w-full rounded-full border border-slate-200 bg-white px-4 pr-14 text-[15px] text-slate-700 placeholder-slate-400 outline-none focus:border-emerald-300"
        />
        <span className="absolute right-2 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-white text-emerald-700">
          {icon === "plane" && UiIcon.plane("h-4 w-4")}
          {icon === "phone" && UiIcon.phone("h-4 w-4")}
          {icon === "pin" && UiIcon.pin("h-4 w-4")}
          {icon === "mail" && UiIcon.mail("h-4 w-4")}
        </span>
      </div>
    </label>
  );
};

export const ContactForm = () => {
  return (
    <section className="w-full bg-[#eef6ea]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 py-14 lg:grid-cols-2">
        {/* LEFT: Form card */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="rounded-2xl bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] md:p-8"
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Field
              label="Your Email"
              placeholder="Your Email"
              type="email"
              icon="plane"
            />
            <Field
              label="Your Phone"
              placeholder="Your Phone"
              type="tel"
              icon="phone"
            />
          </div>

          <div className="mt-4">
            <Field label="Your Address" placeholder="Your Address" icon="pin" />
          </div>

          <label className="mt-4 block">
            <span className="mb-1 block text-sm font-semibold text-emerald-800/90">
              Message
            </span>
            <div className="relative">
              <textarea
                rows={5}
                placeholder="Write Message.."
                className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 pr-14 text-[15px] text-slate-700 placeholder-slate-400 outline-none focus:border-emerald-300"
              />
              <span className="absolute right-2 bottom-2 grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-white text-emerald-700">
                {UiIcon.mail("h-4 w-4")}
              </span>
            </div>
          </label>

          <button
            type="button"
            className="mt-6 grid h-12 w-full place-items-center rounded-full bg-[#0A3161] text-[15px] font-medium text-white shadow-md hover:brightness-95"
          >
            <span className="relative">
              Send Message
              <span className="absolute -right-8 top-1/2 -translate-y-1/2">
                {UiIcon.plane("h-5 w-5")}
              </span>
            </span>
          </button>
        </form>

        {/* RIGHT: Copy + contact info */}
        <div className="flex flex-col justify-center">
          {/* Kicker */}
          <div className="mb-2 text-[12px] font-semibold tracking-[.15em] text-emerald-800/90">
            TALK TO AN HVAC EXPERT
            {UiIcon.quoteWave()}
          </div>

          {/* Headline */}
          <h2 className="text-4xl font-extrabold leading-tight text-[#103E2D] md:text-5xl">
            Complete HVAC Solutions—
            <br className="hidden md:block" />
            Design, Install & Service
          </h2>

          {/* Blurb */}
          <p className="mt-4 max-w-xl text-[15px] leading-7 text-slate-500">
            We’re your one-stop partner for heating, cooling, and indoor air
            quality. From system design and professional installation to
            preventive maintenance and 24/7 emergency repairs—we keep homes and
            businesses comfortable and efficient year-round. We also specialize
            in ductless mini-splits, custom ductwork, geothermal heat pumps, air
            purification, UV germicidal treatment, and ventilation optimization.
            Honest advice, transparent pricing, reliable results.
          </p>

          {/* Contact rows */}
          <ul className="mt-6 space-y-6">
            <li className="flex items-start gap-4">
              <span className="mt-1 grid h-8 w-8 place-items-center rounded-full bg-emerald-600/15 text-emerald-700">
                {UiIcon.phone("h-4 w-4")}
              </span>
              <div>
                <p className="text-sm text-slate-500">
                  24/7 Emergency Service:
                </p>
                <p className="text-[15px] font-semibold text-[#103E2D]">
                  (629) 555–0129
                </p>
                <p className="text-[13px] text-slate-500">
                  Fast dispatch. Fully stocked trucks for same-day fixes.
                </p>
              </div>
            </li>

            <li className="flex items-start gap-4">
              <span className="mt-1 grid h-8 w-8 place-items-center rounded-full bg-emerald-600/15 text-emerald-700">
                {UiIcon.clock("h-4 w-4")}
              </span>
              <div>
                <p className="text-sm text-slate-500">Hours:</p>
                <p className="text-[15px] font-semibold text-[#103E2D]">
                  Office: 9am–8pm · Mon–Sat
                </p>
                <p className="text-[13px] text-slate-500">
                  Emergency Support: 24/7
                </p>
              </div>
            </li>

            <li className="flex items-start gap-4">
              <span className="mt-1 grid h-8 w-8 place-items-center rounded-full bg-emerald-600/15 text-emerald-700">
                {UiIcon.pin("h-4 w-4")}
              </span>
              <div>
                <p className="text-sm text-slate-500">Service Area & Office:</p>
                <p className="text-[15px] font-semibold text-[#103E2D]">
                  6391 Elgin St, Celina, Delaware 10299
                </p>
                <p className="text-[13px] text-slate-500">
                  Residential & commercial service across the greater metro
                  area.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

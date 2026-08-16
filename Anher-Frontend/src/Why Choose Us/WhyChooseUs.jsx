import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faCheck } from '@fortawesome/free-solid-svg-icons'

const STEPS = [
  { number: '01', title: 'Requirement check', copy: 'We confirm material type, grading, volume, delivery point and unloading constraints.' },
  { number: '02', title: 'Source alignment', copy: 'The supply source is selected around specification, availability and practical route planning.' },
  { number: '03', title: 'Delivery control', copy: 'Dispatch is coordinated with your site contact so each load arrives against the agreed sequence.' },
]

const WhyChooseUs = () => {
  const navigate = useNavigate()

  return (
    <section className="section-page overflow-hidden bg-[#f5f3ed]">
      <div className="container-page grid items-center gap-12 lg:grid-cols-[1.02fr_.98fr] lg:gap-20">
        <div className="relative">
          <div className="relative overflow-hidden rounded-[2rem] bg-white p-2 shadow-[0_35px_90px_-55px_rgba(19,35,58,.5)] sm:rounded-[2.6rem] sm:p-3">
            <img src="/images/itc-site-delivery.webp" alt="Organized ITC aggregate delivery at a project site" loading="lazy" className="aspect-[4/3] w-full rounded-[1.6rem] object-cover sm:rounded-[2.1rem]" />
          </div>
          <div className="absolute -bottom-7 -right-2 max-w-[250px] rounded-[1.4rem] border border-white bg-brand-primary p-5 text-white shadow-2xl sm:right-7">
            <span className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[.18em] text-[#e2bd70]"><FontAwesomeIcon icon={faCheck} /> Procurement clarity</span>
            <p className="mt-2 text-sm font-semibold leading-6 text-white/82">One accountable conversation from product selection through delivery.</p>
          </div>
        </div>

        <div>
          <p className="eyebrow">Why choose ITC</p>
          <h2 className="heading-lg mt-4 text-balance">Why projects choose ITC.</h2>
          <p className="body-lead mt-6 max-w-xl">One team coordinates the material, quantity and delivery. You get clear updates from confirmation to site.</p>

          <div className="mt-9 divide-y divide-brand-border border-y border-brand-border">
            {STEPS.map((step) => (
              <article key={step.number} className="grid grid-cols-[3.25rem_1fr] gap-4 py-5">
                <span className="pt-1 text-xs font-black tracking-[.12em] text-brand-accent">{step.number}</span>
                <div>
                  <h3 className="font-extrabold text-brand-ink">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-brand-muted">{step.copy}</p>
                </div>
              </article>
            ))}
          </div>

          <button type="button" onClick={() => navigate('/about')} className="mt-8 inline-flex items-center gap-2 text-sm font-extrabold text-brand-primary transition hover:gap-3">
            How ITC works <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs

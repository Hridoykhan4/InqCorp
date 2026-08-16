import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCubesStacked, faMap, faScaleBalanced, faTruckFast } from '@fortawesome/free-solid-svg-icons'

const PROOF = [
  { icon: faMap, value: 'Nationwide', label: 'Supply coverage', description: 'Delivery planning across Bangladesh.' },
  { icon: faCubesStacked, value: '4 ranges', label: 'Core materials', description: 'Sand, chips, boulder and filling.' },
  { icon: faScaleBalanced, value: 'Checked', label: 'Source & grading', description: 'Matched against project requirements.' },
  { icon: faTruckFast, value: 'Planned', label: 'Site logistics', description: 'Quantity, route and timing coordinated.' },
]

const CompanyStats = () => (
  <section className="bg-white py-8 sm:py-12">
    <div className="container-page">
      <div className="grid overflow-hidden rounded-[2rem] border border-brand-border bg-[#fbfaf7] sm:grid-cols-2 lg:grid-cols-4">
        {PROOF.map((item, index) => (
          <article
            key={item.label}
            className={`group relative p-7 sm:p-8 ${index ? 'border-t border-brand-border sm:border-l sm:border-t-0 lg:border-l' : ''} ${index === 2 ? 'sm:border-l-0 lg:border-l' : ''}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-2xl font-black tracking-tight text-brand-ink">{item.value}</p>
                <p className="mt-1 text-[10px] font-extrabold uppercase tracking-[.17em] text-brand-accent">{item.label}</p>
              </div>
              <span className="grid h-10 w-10 place-items-center rounded-2xl border border-brand-border bg-white text-brand-primary transition duration-300 group-hover:-translate-y-1 group-hover:border-brand-primary/25">
                <FontAwesomeIcon icon={item.icon} />
              </span>
            </div>
            <p className="mt-5 text-sm leading-6 text-brand-muted">{item.description}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
)

export default CompanyStats

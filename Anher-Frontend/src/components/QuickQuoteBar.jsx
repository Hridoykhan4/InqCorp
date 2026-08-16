import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faBoxOpen, faLocationDot, faRulerCombined } from '@fortawesome/free-solid-svg-icons'

const DETAILS = [
  { icon: faBoxOpen, label: '1 · Material', value: 'Sand, chips or boulder' },
  { icon: faRulerCombined, label: '2 · Quantity', value: 'CFT, ton or truck load' },
  { icon: faLocationDot, label: '3 · Delivery', value: 'District and site access' },
]

export const QuickQuoteBar = () => (
  <section className="relative z-10 bg-[#fbfaf7] py-6 sm:py-8">
    <div className="container-page">
      <div className="grid overflow-hidden rounded-[1.5rem] border border-brand-border bg-white shadow-[0_28px_70px_-48px_rgba(19,35,58,.5)] lg:grid-cols-[1.1fr_2fr_auto]">
        <div className="border-b border-brand-border bg-brand-primary p-5 text-white sm:p-6 lg:border-b-0 lg:border-r">
          <p className="text-[9px] font-black uppercase tracking-[.18em] text-brand-accent-light">Current delivered quote</p>
          <p className="mt-2 text-lg font-black leading-snug">Tell us three details. Get a useful response.</p>
        </div>
        <div className="grid sm:grid-cols-3">
          {DETAILS.map((item, index) => (
            <div key={item.label} className={`flex items-center gap-3 p-4 sm:px-5 ${index ? 'border-t border-brand-border sm:border-l sm:border-t-0' : ''}`}>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-wash text-xs text-brand-primary"><FontAwesomeIcon icon={item.icon} /></span>
              <span><span className="block text-[9px] font-black uppercase tracking-[.12em] text-brand-accent">{item.label}</span><span className="mt-1 block text-[11px] font-bold leading-4 text-brand-ink">{item.value}</span></span>
            </div>
          ))}
        </div>
        <div className="flex items-center border-t border-brand-border p-4 lg:border-l lg:border-t-0">
          <Link to="/contact?subject=Today%27s%20delivered%20rate" className="btn-brand w-full whitespace-nowrap gap-2 lg:w-auto">Get today’s rate <FontAwesomeIcon icon={faArrowRight} /></Link>
        </div>
      </div>
    </div>
  </section>
)

export default QuickQuoteBar

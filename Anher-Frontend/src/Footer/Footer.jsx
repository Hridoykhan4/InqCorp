import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons'
import { COMPANY } from '../SEO/companyInfo'
import { getCategoryHref, getCategoryList } from '../config/navigation'

const Footer = ({ categories = [] }) => {
  const year = new Date().getFullYear()
  const ranges = getCategoryList(categories).slice(0, 5)

  return (
    <footer className="border-t border-brand-border bg-[#f5f3ed]">
      <div className="container-page py-14 sm:py-20">
        <div className="grid items-end gap-8 border-b border-brand-border pb-12 lg:grid-cols-[1fr_auto]">
          <div className="max-w-3xl">
            <p className="eyebrow">Planning a delivery?</p>
            <h2 className="mt-4 text-balance text-3xl font-black tracking-[-.04em] text-brand-ink sm:text-5xl">Tell us the material, volume and site. We’ll help plan the rest.</h2>
          </div>
          <Link to="/contact" className="btn-brand shrink-0 gap-2">Start a conversation <FontAwesomeIcon icon={faArrowRight} className="text-xs" /></Link>
        </div>

        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.25fr_.75fr_.8fr_1.1fr]">
          <div>
            <Link to="/" className="inline-flex items-center gap-3">
              <img src="/inqcorpLogo.jpeg" alt="Inqilab Trading Corporation" className="h-14 w-14 rounded-2xl border border-brand-border bg-white object-contain p-1" />
              <span><strong className="block text-xl font-black tracking-tight text-brand-ink">ITC</strong><span className="mt-1 block text-[9px] font-extrabold uppercase tracking-[.16em] text-brand-muted">Inqilab Trading Corporation</span></span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-brand-muted">Construction aggregate sourcing and coordinated supply for projects across Bangladesh.</p>
            <p className="mt-5 font-display text-xl font-bold italic text-brand-primary">Build with strength.</p>
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-[.16em] text-brand-ink">Company</p>
            <nav className="mt-5 grid gap-3 text-sm font-semibold text-brand-muted">
              <Link to="/about" className="hover:text-brand-primary">About ITC</Link>
              <Link to="/all-products" className="hover:text-brand-primary">All products</Link>
              <Link to="/catalogue" className="hover:text-brand-primary">Catalogue</Link>
              <Link to="/gallery" className="hover:text-brand-primary">Gallery</Link>
              <Link to="/contact" className="hover:text-brand-primary">Contact</Link>
            </nav>
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-[.16em] text-brand-ink">Material ranges</p>
            <nav className="mt-5 grid gap-3 text-sm font-semibold text-brand-muted">
              {ranges.map((item) => <Link key={item._id || item.name} to={getCategoryHref(item)} className="hover:text-brand-primary">{item.name}</Link>)}
            </nav>
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-[.16em] text-brand-ink">Talk to us</p>
            <address className="mt-5 grid gap-4 text-sm not-italic text-brand-muted">
              <a href={`tel:${COMPANY.phoneTel}`} className="flex items-start gap-3 hover:text-brand-primary"><FontAwesomeIcon icon={faPhone} className="mt-1 w-4 text-brand-accent" /><span>{COMPANY.phone}</span></a>
              <a href={`mailto:${COMPANY.email}`} className="flex items-start gap-3 hover:text-brand-primary"><FontAwesomeIcon icon={faEnvelope} className="mt-1 w-4 text-brand-accent" /><span className="break-all">{COMPANY.email}</span></a>
              <a href={COMPANY.mapDirectionsUrl} target="_blank" rel="noreferrer" className="flex items-start gap-3 leading-6 hover:text-brand-primary"><FontAwesomeIcon icon={faLocationDot} className="mt-1 w-4 text-brand-accent" /><span>{COMPANY.addressFull}</span></a>
            </address>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-brand-border pt-7 text-[11px] font-semibold text-brand-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Inqilab Trading Corporation. All rights reserved.</p>
          <div className="flex items-center gap-5"><span>Dhaka · Bangladesh</span><Link to="/admin-login" className="hover:text-brand-primary">Admin</Link></div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

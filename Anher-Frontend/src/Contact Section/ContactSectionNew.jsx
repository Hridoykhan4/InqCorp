import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faCheck, faClock, faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { socket } from '../Socket/socket'
import { SeoManager } from '../SEO/SeoManager'
import { SEO_CONFIG } from '../SEO/seo'
import { COMPANY, postalAddressSchema } from '../SEO/companyInfo'
import { usePageEntrance } from '../components/usePageEntrance'

const INITIAL = { name: '', email: '', subject: '', description: '', phone: '', type: 'Project enquiry' }

const ContactSection = () => {
  const [searchParams] = useSearchParams()
  const [contact, setContact] = useState(INITIAL)
  const [submitting, setSubmitting] = useState(false)
  const [feedback, setFeedback] = useState(null)
  const pageRef = useRef(null)
  usePageEntrance(pageRef, [])
  const whatsappUrl = `https://wa.me/${COMPANY.phoneTel.replace(/\D/g, '')}?text=${encodeURIComponent('Hello ITC, I need a delivered material quote.')}`

  useEffect(() => {
    const product = searchParams.get('product')
    const subject = searchParams.get('subject')
    if (product || subject) setContact((current) => ({ ...current, subject: subject || `Supply enquiry — ${product}`, description: product ? `I would like a quote for ${product}.\n\nRequired quantity:\nDelivery location:\nPreferred schedule:` : current.description }))
  }, [searchParams])

  const change = (event) => {
    setFeedback(null)
    setContact((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const submit = (event) => {
    event.preventDefault()
    if (!contact.name.trim() || !contact.phone.trim() || !contact.description.trim()) {
      setFeedback({ type: 'error', message: 'Please add your name, phone number and project details.' })
      return
    }

    setSubmitting(true)
    setFeedback(null)
    if (!socket.connected) socket.connect()

    let completed = false
    const timer = setTimeout(() => {
      if (completed) return
      completed = true
      setSubmitting(false)
      setFeedback({ type: 'error', message: `The live form is reconnecting. Please call ${COMPANY.phone} or try again.` })
    }, 12_000)

    socket.emit('sendQueries', contact, (response = {}) => {
      if (completed) return
      completed = true
      clearTimeout(timer)
      setSubmitting(false)
      if (response.status === 200) {
        setContact(INITIAL)
        setFeedback({ type: 'success', message: response.message || 'Thank you. Your enquiry has been received.' })
      } else {
        setFeedback({ type: 'error', message: response.message || 'We could not send this enquiry. Please call or WhatsApp us.' })
      }
    })
  }

  return (
    <main ref={pageRef} className="min-h-screen bg-white pt-[76px]">
      <SeoManager
        title="Contact Inqilab Trading Corporation"
        description="Contact ITC for sand, stone chips, boulder and construction aggregate supply planning across Bangladesh."
        path="/contact"
        keywords="Inqilab Trading Corporation contact, sand supplier quote, stone chips delivery Bangladesh"
        structuredData={{ '@context': 'https://schema.org', '@type': 'ContactPage', name: 'Contact Inqilab Trading Corporation', url: `${SEO_CONFIG.siteUrl}/contact`, mainEntity: { '@type': 'Organization', name: COMPANY.legalName, email: COMPANY.email, telephone: COMPANY.phoneTel, address: postalAddressSchema } }}
      />

      <section className="bg-[#fbfaf7] pb-16 pt-8 sm:pt-11">
        <div className="container-page grid items-start gap-8 lg:grid-cols-[.72fr_1.28fr] lg:gap-12">
          <aside data-page-reveal className="space-y-5 lg:sticky lg:top-24">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[.16em] text-brand-muted"><Link to="/">Home</Link><span aria-hidden="true">/</span><span className="text-brand-accent">Contact</span></div>
              <h1 className="mt-3 text-[clamp(2.35rem,5vw,4.6rem)] font-black leading-[.98] tracking-[-.06em] text-brand-ink">Get a useful quote, fast.</h1>
              <p className="mt-5 max-w-xl text-sm leading-7 text-brand-muted sm:text-base">Send four things: material, quantity, delivery location and required date. We’ll respond with the next practical step.</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {['Material / grade', 'CFT or ton', 'Site location', 'Delivery date'].map((item) => <span key={item} className="rounded-full border border-brand-border bg-white px-3 py-2 text-[10px] font-extrabold text-brand-ink">{item}</span>)}
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-brand-border bg-white p-6 sm:p-7">
              <p className="eyebrow">Talk directly</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <a href={`tel:${COMPANY.phoneTel}`} className="group flex items-center gap-3 rounded-xl bg-brand-wash p-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-brand-primary"><FontAwesomeIcon icon={faPhone} /></span><span><span className="block text-[9px] font-black uppercase tracking-[.13em] text-brand-accent">Call</span><span className="mt-1 block text-xs font-extrabold text-brand-ink">{COMPANY.phone}</span></span></a>
                <a href={whatsappUrl} target="_blank" rel="noreferrer" className="group flex items-center gap-3 rounded-xl bg-[#ecf8f2] p-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-[#087a55]"><FontAwesomeIcon icon={faWhatsapp} /></span><span><span className="block text-[9px] font-black uppercase tracking-[.13em] text-[#087a55]">WhatsApp</span><span className="mt-1 block text-xs font-extrabold text-brand-ink">Message now</span></span></a>
              </div>
              <a href={`mailto:${COMPANY.email}`} className="mt-5 flex items-center gap-3 text-sm font-bold text-brand-ink hover:text-brand-primary"><FontAwesomeIcon icon={faEnvelope} className="text-brand-accent" /><span className="break-all">{COMPANY.email}</span></a>
              <a href={COMPANY.mapDirectionsUrl} target="_blank" rel="noreferrer" className="mt-4 flex items-start gap-3 text-xs font-semibold leading-5 text-brand-muted hover:text-brand-primary"><FontAwesomeIcon icon={faLocationDot} className="mt-1 text-brand-accent" /><span>{COMPANY.addressFull}</span></a>
            </div>

            <div className="rounded-[1.5rem] border border-brand-border bg-white p-6">
              <div className="flex items-center gap-3"><FontAwesomeIcon icon={faClock} className="text-brand-accent" /><h2 className="font-black text-brand-ink">Business hours</h2></div>
              <dl className="mt-5 divide-y divide-brand-border text-sm"><div className="flex justify-between gap-4 py-3"><dt className="font-semibold text-brand-muted">Sunday–Thursday</dt><dd className="font-extrabold text-brand-ink">9:00–18:00</dd></div><div className="flex justify-between gap-4 py-3"><dt className="font-semibold text-brand-muted">Saturday</dt><dd className="font-extrabold text-brand-ink">10:00–16:00</dd></div><div className="flex justify-between gap-4 py-3"><dt className="font-semibold text-brand-muted">Friday</dt><dd className="font-extrabold text-brand-ink">Closed</dd></div></dl>
            </div>
          </aside>

          <div data-page-reveal className="rounded-[1.75rem] border border-brand-border bg-white p-6 shadow-[0_32px_90px_-58px_rgba(19,35,58,.4)] sm:p-9 lg:p-10">
            <div><p className="eyebrow">Project enquiry</p><h2 className="mt-3 text-3xl font-black tracking-tight text-brand-ink sm:text-4xl">What should we prepare for?</h2><p className="mt-3 text-sm leading-7 text-brand-muted">The more context you share, the more useful our first response can be.</p></div>

            <form onSubmit={submit} className="mt-8 grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-xs font-extrabold text-brand-ink">Your name *<input name="name" value={contact.name} onChange={change} autoComplete="name" className="h-12 rounded-xl border border-brand-border bg-brand-surface px-4 text-sm font-medium outline-none focus:border-brand-primary focus:bg-white" /></label>
                <label className="grid gap-2 text-xs font-extrabold text-brand-ink">Phone / WhatsApp *<input name="phone" value={contact.phone} onChange={change} autoComplete="tel" className="h-12 rounded-xl border border-brand-border bg-brand-surface px-4 text-sm font-medium outline-none focus:border-brand-primary focus:bg-white" /></label>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-xs font-extrabold text-brand-ink">Email<input type="email" name="email" value={contact.email} onChange={change} autoComplete="email" className="h-12 rounded-xl border border-brand-border bg-brand-surface px-4 text-sm font-medium outline-none focus:border-brand-primary focus:bg-white" /></label>
                <label className="grid gap-2 text-xs font-extrabold text-brand-ink">Enquiry type<select name="type" value={contact.type} onChange={change} className="h-12 rounded-xl border border-brand-border bg-brand-surface px-4 text-sm font-medium outline-none focus:border-brand-primary focus:bg-white"><option>Project enquiry</option><option>Today’s rate</option><option>Bulk supply</option><option>Catalogue request</option></select></label>
              </div>
              <label className="grid gap-2 text-xs font-extrabold text-brand-ink">Subject<input name="subject" value={contact.subject} onChange={change} className="h-12 rounded-xl border border-brand-border bg-brand-surface px-4 text-sm font-medium outline-none focus:border-brand-primary focus:bg-white" placeholder="e.g. 10–20 mm stone chips for RCC" /></label>
              <label className="grid gap-2 text-xs font-extrabold text-brand-ink">Material, quantity, delivery location and schedule *<textarea name="description" value={contact.description} onChange={change} rows="8" className="resize-y rounded-xl border border-brand-border bg-brand-surface px-4 py-3 text-sm font-medium leading-6 outline-none focus:border-brand-primary focus:bg-white" placeholder="Example: 10–20 mm stone chips, approximate volume, project location, access notes, preferred delivery date..." /></label>

              {feedback && <div className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-sm font-semibold ${feedback.type === 'success' ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-red-200 bg-red-50 text-red-800'}`}>{feedback.type === 'success' && <FontAwesomeIcon icon={faCheck} className="mt-1" />}<span>{feedback.message}</span></div>}

              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <p className="max-w-md text-[11px] leading-5 text-brand-muted">Your details are used only to respond to this enquiry.</p>
                <button type="submit" disabled={submitting} className="btn-brand min-w-44 gap-2 disabled:cursor-not-allowed disabled:opacity-60">{submitting ? 'Sending…' : 'Request quote'}{!submitting && <FontAwesomeIcon icon={faArrowRight} />}</button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="bg-white pb-20 pt-8">
        <div className="container-page overflow-hidden rounded-[2rem] border border-brand-border bg-brand-surface p-2"><iframe title="Inqilab Trading Corporation office map" src={COMPANY.mapEmbedSrc} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-[360px] w-full rounded-[1.6rem] border-0" /></div>
      </section>
    </main>
  )
}

export default ContactSection

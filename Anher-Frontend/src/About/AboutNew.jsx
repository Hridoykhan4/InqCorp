import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRight,
  faCheck,
  faEnvelope,
  faLocationDot,
  faPhone,
  faQuoteLeft,
  faTruck,
} from '@fortawesome/free-solid-svg-icons'
import { SeoManager } from '../SEO/SeoManager'
import { SEO_CONFIG } from '../SEO/seo'
import { COMPANY, postalAddressSchema } from '../SEO/companyInfo'
import { Reveal } from '../components/Reveal'
import { usePageEntrance } from '../components/usePageEntrance'

const PROCESS = [
  { number: '01', title: 'Share the requirement', copy: 'Material, grade or size, approximate quantity, delivery location and preferred schedule.' },
  { number: '02', title: 'Confirm the supply plan', copy: 'We align the source, unit, availability, route and unloading conditions before dispatch.' },
  { number: '03', title: 'Coordinate the delivery', copy: 'Your site contact receives practical updates so people and access are ready for the load.' },
]

const RANGES = [
  { title: 'Sand', copy: 'Plaster, medium river and coarse construction grades.', image: '/images/itc-sand-medium.jpg' },
  { title: 'Stone Chips', copy: 'Common structural and civil-work sizes.', image: '/images/itc-chips-20-40.jpg' },
  { title: 'Boulder', copy: 'Natural stone for crushing and heavy civil use.', image: '/images/itc-boulder-yard.webp' },
  { title: 'Filling Materials', copy: 'Selected fill and crusher fines for preparation.', image: '/images/itc-stone-dust.jpg' },
]

const BUYER_QUESTIONS = [
  ['Is the material right for my work?', 'We start with the application and required grade—not only a product name.'],
  ['Can the load reach my site?', 'Route, access, unloading point and delivery timing are discussed before confirmation.'],
  ['Who do I speak to after ordering?', 'One accountable conversation stays with the requirement through delivery.'],
]

export const About = () => {
  const pageRef = useRef(null)
  usePageEntrance(pageRef, [])

  return (
    <main ref={pageRef} className="min-h-screen bg-white pt-[76px]">
      <SeoManager
        title="About ITC — Inqilab Trading Corporation"
        description="Meet Inqilab Trading Corporation, a Dhaka-based construction aggregate supply company coordinating sand, stone chips, boulder and filling materials across Bangladesh."
        path="/about"
        keywords="about Inqilab Trading Corporation, ITC Bangladesh, Kawsar Alam, construction aggregate supplier"
        structuredData={{ '@context': 'https://schema.org', '@type': 'Organization', name: SEO_CONFIG.siteName, legalName: COMPANY.legalName, url: `${SEO_CONFIG.siteUrl}/about`, email: COMPANY.email, telephone: COMPANY.phoneTel, address: postalAddressSchema, areaServed: 'BD' }}
      />

      <section className="relative overflow-hidden bg-[#f7f5ef] py-7 sm:py-10 lg:py-14">
        <div className="absolute right-[-10%] top-[-30%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(199,150,60,.16),transparent_66%)]" />
        <div className="container-page relative">
          <div data-page-reveal className="mb-7 flex flex-wrap items-center justify-between gap-3 text-[10px] font-black uppercase tracking-[.15em] text-brand-muted">
            <span>Company <span className="mx-2 text-brand-accent">/</span> About ITC</span>
            <span className="inline-flex items-center gap-2"><FontAwesomeIcon icon={faLocationDot} className="text-brand-accent" />Dhaka · Serving projects across Bangladesh</span>
          </div>

          <div className="grid items-center gap-8 lg:grid-cols-[.88fr_1.12fr] lg:gap-14">
            <div>
              <p data-page-reveal className="eyebrow">Inqilab Trading Corporation</p>
              <h1 data-page-reveal className="mt-4 max-w-2xl text-[clamp(2.5rem,5.2vw,5rem)] font-black leading-[.98] tracking-[-.055em] text-brand-ink">Material supply, made easier to manage.</h1>
              <p data-page-reveal className="mt-6 max-w-xl text-base leading-8 text-brand-muted sm:text-lg">ITC helps project teams select construction aggregates and coordinate their movement to site—through one clear point of contact.</p>

              <div data-page-reveal className="mt-7 flex flex-wrap gap-2">
                {['Sand & stone', 'CFT / Ton planning', 'Site delivery coordination'].map((item) => <span key={item} className="feature-pill !px-3.5 !py-2 !text-xs"><FontAwesomeIcon icon={faCheck} className="mr-2 text-brand-accent" />{item}</span>)}
              </div>

              <div data-page-reveal className="mt-8 flex flex-col gap-3 min-[430px]:flex-row">
                <Link to="/contact" className="btn-brand gap-2">Discuss a requirement <FontAwesomeIcon icon={faArrowRight} /></Link>
                <Link to="/all-products" className="btn-brand-outline">Browse materials</Link>
              </div>
            </div>

            <div data-page-reveal className="relative pb-5 sm:pb-8">
              <div className="overflow-hidden rounded-[1.8rem] border-[7px] border-white bg-white shadow-[0_32px_85px_-48px_rgba(19,35,58,.48)] sm:rounded-[2.3rem] sm:border-[9px]">
                <img src="/images/itc-boulder-yard.webp" alt="ITC aggregate sourcing and supply operation" className="aspect-[16/11] w-full object-cover" />
              </div>

              <div data-founder-feature className="relative z-10 mx-3 -mt-12 grid grid-cols-[88px_1fr] items-center gap-4 rounded-[1.6rem] border border-brand-border bg-white/96 p-4 shadow-[0_24px_65px_-34px_rgba(19,35,58,.55)] backdrop-blur sm:mx-6 sm:-mt-16 sm:grid-cols-[112px_1fr] sm:gap-5 sm:p-5 lg:grid-cols-[120px_1fr_auto] lg:p-6">
                <div className="relative">
                  <span className="absolute -inset-1.5 rounded-[1.35rem] bg-brand-accent/15" aria-hidden="true" />
                  <img src={COMPANY.ceo.photo} alt={`${COMPANY.ceo.name}, ${COMPANY.ceo.title}`} className="relative h-24 w-[88px] rounded-[1.15rem] border-2 border-white object-cover object-top shadow-lg sm:h-28 sm:w-28 lg:h-32 lg:w-[120px]" />
                </div>
                <div className="min-w-0">
                  <p className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[.15em] text-brand-accent sm:text-[10px]"><FontAwesomeIcon icon={faQuoteLeft} /> Founder’s note</p>
                  <p className="mt-2 text-sm font-black leading-6 text-brand-ink sm:text-base sm:leading-7">“Understand the requirement first. Then stay accountable through delivery.”</p>
                  <div className="mt-3 border-t border-brand-border pt-3 lg:hidden"><p className="text-xs font-black text-brand-ink">{COMPANY.ceo.name}</p><p className="mt-1 text-[9px] font-bold uppercase tracking-[.1em] text-brand-muted">{COMPANY.ceo.title}</p></div>
                </div>
                <div className="hidden min-w-[132px] border-l border-brand-border pl-5 text-right lg:block"><p className="text-sm font-black text-brand-ink">{COMPANY.ceo.name}</p><p className="mt-1 text-[9px] font-bold uppercase tracking-[.1em] text-brand-muted">{COMPANY.ceo.title}</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <nav className="sticky top-[76px] z-20 border-y border-brand-border bg-white/94 backdrop-blur-xl" aria-label="About page sections">
        <div className="container-page no-scrollbar flex gap-1 overflow-x-auto py-2">
          {[['What buyers need', '#buyers'], ['How supply works', '#process'], ['Material ranges', '#ranges'], ['Contact ITC', '#about-contact']].map(([label, href]) => <a key={href} href={href} className="shrink-0 rounded-full px-4 py-2 text-xs font-extrabold text-brand-muted transition hover:bg-brand-wash hover:text-brand-primary">{label}</a>)}
        </div>
      </nav>

      <section id="buyers" className="scroll-mt-32 section-page">
        <div className="container-page">
          <Reveal className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:gap-16">
            <div>
              <p className="eyebrow">What buyers need to know</p>
              <h2 className="mt-4 text-3xl font-black leading-tight tracking-[-.04em] text-brand-ink sm:text-5xl">Clear answers before a truck moves.</h2>
              <p className="mt-5 text-sm leading-7 text-brand-muted">For a contractor, engineer or owner, confidence comes from practical details—not decorative claims.</p>
            </div>
            <div className="grid gap-3">
              {BUYER_QUESTIONS.map(([question, answer], index) => (
                <article key={question} className="group grid gap-3 rounded-[1.35rem] border border-brand-border bg-[#fbfaf7] p-5 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-lg sm:grid-cols-[42px_1fr] sm:p-6">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-primary text-[10px] font-black text-white">0{index + 1}</span>
                  <div><h3 className="text-base font-black text-brand-ink">{question}</h3><p className="mt-2 text-sm leading-7 text-brand-muted">{answer}</p></div>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="process" className="scroll-mt-32 section-page bg-[#f4f6f8]">
        <div className="container-page">
          <Reveal className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div><p className="eyebrow">How supply works</p><h2 className="mt-4 text-3xl font-black tracking-[-.04em] text-brand-ink sm:text-5xl">Three practical steps.</h2></div>
            <p className="max-w-md text-sm leading-7 text-brand-muted">A short process keeps the first conversation useful and the delivery plan realistic.</p>
          </Reveal>
          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {PROCESS.map((step, index) => (
              <Reveal key={step.number} delay={index * 90} className="group relative overflow-hidden rounded-[1.55rem] border border-brand-border bg-white p-6 sm:p-7">
                <span className="text-[10px] font-black tracking-[.18em] text-brand-accent">{step.number}</span>
                <h3 className="mt-8 text-xl font-black text-brand-ink">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-brand-muted">{step.copy}</p>
                <span className="absolute -bottom-8 -right-4 text-[7rem] font-black leading-none text-brand-primary/[.035] transition group-hover:-translate-y-2">{step.number}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="ranges" className="scroll-mt-32 section-page">
        <div className="container-page">
          <Reveal className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div><p className="eyebrow">Material ranges</p><h2 className="mt-4 text-3xl font-black tracking-[-.04em] text-brand-ink sm:text-5xl">Focused on everyday project needs.</h2></div>
            <Link to="/all-products" className="inline-flex items-center gap-2 text-sm font-black text-brand-primary">View every product <FontAwesomeIcon icon={faArrowRight} /></Link>
          </Reveal>

          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {RANGES.map((range, index) => (
              <Reveal key={range.title} delay={index * 70}>
                <Link to={`/all-products?category=${encodeURIComponent(range.title)}`} className="group block overflow-hidden rounded-[1.5rem] border border-brand-border bg-white">
                  <div className="overflow-hidden"><img src={range.image} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105" /></div>
                  <div className="p-5"><p className="text-[9px] font-black uppercase tracking-[.15em] text-brand-accent">Range 0{index + 1}</p><h3 className="mt-2 text-lg font-black text-brand-ink">{range.title}</h3><p className="mt-2 text-xs leading-6 text-brand-muted">{range.copy}</p></div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="about-contact" className="scroll-mt-32 pb-16 sm:pb-24">
        <div className="container-page">
          <Reveal className="grid items-center gap-7 overflow-hidden rounded-[1.8rem] bg-[#12243b] p-6 text-white sm:p-9 lg:grid-cols-[1fr_auto] lg:p-11">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[.18em] text-[#e2bd70]">Have a requirement?</p>
              <h2 className="mt-3 text-2xl font-black tracking-[-.035em] sm:text-4xl">Send the material, quantity and delivery location.</h2>
              <div className="mt-5 flex flex-col gap-3 text-xs font-semibold text-white/62 sm:flex-row sm:flex-wrap sm:gap-5">
                <a href={`tel:${COMPANY.phoneTel}`} className="inline-flex items-center gap-2"><FontAwesomeIcon icon={faPhone} className="text-[#e2bd70]" />{COMPANY.phone}</a>
                <a href={`mailto:${COMPANY.email}`} className="inline-flex items-center gap-2"><FontAwesomeIcon icon={faEnvelope} className="text-[#e2bd70]" />{COMPANY.email}</a>
                <span className="inline-flex items-center gap-2"><FontAwesomeIcon icon={faTruck} className="text-[#e2bd70]" />Project delivery coordination</span>
              </div>
            </div>
            <Link to="/contact" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-black text-[#12243b]">Request a quote <FontAwesomeIcon icon={faArrowRight} /></Link>
          </Reveal>
        </div>
      </section>
    </main>
  )
}

export default About

import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import gsap from 'gsap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowLeft,
  faArrowRight,
  faCheckCircle,
  faLocationDot,
  faPhone,
} from '@fortawesome/free-solid-svg-icons'

const WORDS = ['strength.', 'quality.', 'confidence.', 'on-time supply.']

const useTypewriter = () => {
  const [word, setWord] = useState(0)
  const [length, setLength] = useState(WORDS[0].length)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const complete = length === WORDS[word].length
    const empty = length === 0
    const delay = complete && !deleting ? 1800 : deleting ? 42 : 72

    const timer = window.setTimeout(() => {
      if (complete && !deleting) return setDeleting(true)
      if (empty && deleting) {
        setWord((current) => (current + 1) % WORDS.length)
        setDeleting(false)
        return
      }
      setLength((current) => current + (deleting ? -1 : 1))
    }, delay)

    return () => window.clearTimeout(timer)
  }, [deleting, length, word])

  return WORDS[word].slice(0, length)
}

const firstImage = (item) => {
  const image = item?.imageUrl
  return Array.isArray(image) ? image[0] : image
}

const FALLBACK_BANNER = {
  title: 'Materials that keep projects moving',
  description: 'Quality-checked aggregates, clear coordination and dependable delivery across Bangladesh.',
  region: 'Bangladesh',
  imageUrl: ['/images/itc-sand-logistics.webp'],
}

export const HeroSection = () => {
  const navigate = useNavigate()
  const { banners = [], priceList = [], products = [] } = useOutletContext() || {}
  const sectionRef = useRef(null)
  const panelRef = useRef(null)
  const [active, setActive] = useState(0)
  const typedWord = useTypewriter()

  const slides = banners.filter((item) => firstImage(item)).length
    ? banners.filter((item) => firstImage(item))
    : [FALLBACK_BANNER]
  const current = slides[active % slides.length]

  useEffect(() => {
    if (slides.length < 2) return undefined
    const timer = window.setInterval(() => setActive((index) => (index + 1) % slides.length), 5000)
    return () => window.clearInterval(timer)
  }, [slides.length])

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined
    const context = gsap.context(() => {
      gsap.from('[data-hero-item]', {
        y: 26,
        opacity: 0,
        duration: .72,
        stagger: .09,
        ease: 'power3.out',
      })
      gsap.from(panelRef.current, {
        x: 44,
        opacity: 0,
        duration: .95,
        delay: .22,
        ease: 'power3.out',
      })
    }, sectionRef)
    return () => context.revert()
  }, [])

  const ticker = useMemo(() => {
    if (priceList.length) {
      return priceList.map((item) => `${item.name} — ৳${item.price}/${item.unit || 'CFT'}`)
    }
    return products.slice(0, 7).map((item) => item.name).filter(Boolean)
  }, [priceList, products])

  const move = (direction) => setActive((index) => (index + direction + slides.length) % slides.length)

  return (
    <section ref={sectionRef} className="relative isolate flex min-h-[calc(100svh-76px)] flex-col overflow-hidden bg-[#f8f7f3] pt-[76px]">
      <div className="absolute inset-0 -z-20 overflow-hidden" aria-hidden="true">
        <video className="h-full w-full object-cover opacity-25" src="/hero-video.mp4" poster="/hero-poster.jpg" autoPlay muted loop playsInline preload="metadata" />
      </div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(255,255,255,.98)_0%,rgba(255,255,255,.9)_48%,rgba(248,247,243,.74)_100%)]" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_82%_18%,rgba(199,150,60,.13),transparent_32%)]" aria-hidden="true" />

      <div className="container-page grid flex-1 items-center gap-12 py-14 lg:grid-cols-[.92fr_1.08fr] lg:gap-16 lg:py-16">
        <div className="max-w-2xl">
          <div data-hero-item className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-white/90 px-4 py-2 shadow-sm backdrop-blur">
            <span className="h-2 w-2 animate-pulse rounded-full bg-brand-accent" />
            <span className="text-[10px] font-black uppercase tracking-[.2em] text-brand-primary">Inqilab Trading Corporation</span>
          </div>

          <h1 data-hero-item className="mt-6 text-[clamp(2.9rem,6.5vw,6rem)] font-black leading-[.95] tracking-[-.055em] text-brand-ink">
            Build with
            <span className="mt-1 block text-brand-primary">
              {typedWord}<span className="hero-cursor text-brand-accent">|</span>
            </span>
          </h1>

          <p data-hero-item className="mt-6 max-w-xl text-base leading-8 text-brand-muted sm:text-lg">
            Sand, stone chips, boulder and filling materials—matched to the job, coordinated clearly and supplied across Bangladesh.
          </p>

          <div data-hero-item className="mt-8 grid gap-3 min-[430px]:flex min-[430px]:flex-wrap">
            <button type="button" onClick={() => navigate('/all-products')} className="btn-brand group w-full gap-2 min-[430px]:w-auto">
              View products <FontAwesomeIcon icon={faArrowRight} className="text-xs transition group-hover:translate-x-1" />
            </button>
            <button type="button" onClick={() => navigate('/contact')} className="btn-brand-outline w-full gap-2 min-[430px]:w-auto">
              <FontAwesomeIcon icon={faPhone} className="text-xs text-brand-accent" /> Get a quote
            </button>
          </div>

          <div data-hero-item className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs font-bold text-brand-muted sm:text-sm">
            {['Quality-checked materials', 'Direct coordination', 'Nationwide delivery'].map((item) => (
              <span key={item} className="inline-flex items-center gap-2"><FontAwesomeIcon icon={faCheckCircle} className="text-brand-accent" />{item}</span>
            ))}
          </div>
        </div>

        <div ref={panelRef} className="relative mx-auto w-full max-w-[660px]">
          <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] border-[8px] border-white bg-brand-surface shadow-[0_34px_90px_-45px_rgba(19,35,58,.5)] sm:border-[10px]">
            <img key={`${current?._id || current?.title}-${active}`} src={firstImage(current) || FALLBACK_BANNER.imageUrl[0]} alt={current?.title || 'ITC update'} className="hero-banner-image h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d203a]/90 via-[#0d203a]/22 to-transparent" />

            <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/92 px-3.5 py-2 text-[10px] font-black uppercase tracking-[.15em] text-brand-primary shadow backdrop-blur sm:left-7 sm:top-7">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" /> Latest update
            </div>

            <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
              <p className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[.18em] text-[#e7c477]"><FontAwesomeIcon icon={faLocationDot} />{current?.region || 'Bangladesh'}</p>
              <h2 className="mt-3 max-w-xl text-2xl font-black leading-tight tracking-[-.025em] sm:text-4xl">{current?.title || FALLBACK_BANNER.title}</h2>
              {current?.description && <p className="mt-3 max-w-lg text-sm leading-6 text-white/75 sm:text-base">{current.description}</p>}
            </div>
          </div>

          {slides.length > 1 && (
            <div className="absolute -bottom-5 right-5 flex items-center gap-2 rounded-full border border-brand-border bg-white p-2 shadow-lg sm:right-8">
              <button type="button" onClick={() => move(-1)} className="grid h-10 w-10 place-items-center rounded-full text-brand-primary transition hover:bg-brand-wash" aria-label="Previous update"><FontAwesomeIcon icon={faArrowLeft} /></button>
              <span className="min-w-12 text-center text-xs font-black tabular-nums text-brand-muted">{String(active + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</span>
              <button type="button" onClick={() => move(1)} className="grid h-10 w-10 place-items-center rounded-full bg-brand-primary text-white" aria-label="Next update"><FontAwesomeIcon icon={faArrowRight} /></button>
            </div>
          )}
        </div>
      </div>

      {ticker.length > 0 && (
        <div className="relative z-20 overflow-hidden border-y border-brand-border bg-white shadow-[0_-12px_35px_-30px_rgba(19,35,58,.45)]">
          <div className="flex min-h-[58px] items-stretch sm:min-h-[64px]">
            <div className="relative z-10 flex shrink-0 items-center gap-2 bg-brand-primary px-4 text-[9px] font-black uppercase tracking-[.16em] text-white shadow-[14px_0_28px_-22px_rgba(19,35,58,.8)] sm:px-7 sm:text-[10px]">
              <span className="h-2 w-2 animate-pulse rounded-full bg-brand-accent-light" />
              <span className="hidden min-[390px]:inline">Live material rates</span>
              <span className="min-[390px]:hidden">Live rates</span>
            </div>
            <div className="relative min-w-0 flex-1 overflow-hidden">
              <div className="hero-ticker flex h-full w-max items-center whitespace-nowrap">
                {[...ticker, ...ticker].map((item, index) => (
                  <span key={`${item}-${index}`} className="inline-flex items-center gap-4 px-6 text-[11px] font-extrabold uppercase tracking-[.14em] text-brand-ink sm:px-8 sm:text-xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" />{item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .hero-cursor{animation:heroBlink .85s step-end infinite;font-weight:400}
        .hero-banner-image{animation:heroBannerIn .7s ease both}
        .hero-ticker{animation:heroTicker 34s linear infinite}
        .hero-ticker:hover{animation-play-state:paused}
        @keyframes heroBlink{50%{opacity:0}}
        @keyframes heroBannerIn{from{opacity:.25;transform:scale(1.035)}to{opacity:1;transform:scale(1)}}
        @keyframes heroTicker{to{transform:translateX(-50%)}}
        @media(prefers-reduced-motion:reduce){.hero-cursor,.hero-banner-image,.hero-ticker{animation:none}}
      `}</style>
    </section>
  )
}

export default HeroSection

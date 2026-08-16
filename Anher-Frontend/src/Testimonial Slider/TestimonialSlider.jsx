import { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faLocationDot, faPause, faPlay, faQuoteLeft } from '@fortawesome/free-solid-svg-icons'

const TESTIMONIALS = [
  {
    name: 'Rahim Ahmed', role: 'Project Manager', company: 'Rahim Construction Ltd.', location: 'Bangladesh', initials: 'RA', material: 'Sand & stone chips',
    quote: 'We sourced Fine Sand and Stone Chips from ITC for a large residential complex. Material quality was consistent, delivery was on time, and communication stayed clear throughout the order.',
  },
  {
    name: 'Al-Amin Hossain', role: 'Site Engineer', company: 'Al-Amin Builders', location: 'Cumilla', initials: 'AH', material: 'Coarse sand & boulder',
    quote: 'The Coarse Sand and Boulder met our civil engineering requirements. What impressed us most was the communication and the way the bulk dispatch was coordinated.',
  },
  {
    name: 'Kamal Uddin', role: 'Procurement Head', company: 'Dhaka Infrastructure Ltd.', location: 'Dhaka', initials: 'KU', material: 'Stone chips 10–20 mm',
    quote: 'We sourced Stone Chips 10–20 mm for road construction work. The grading was consistent, the delivery schedule reliable, and the pricing process transparent.',
  },
  {
    name: 'Nasrin Begum', role: 'Director', company: 'Nasrin Developers', location: 'Bangladesh', initials: 'NB', material: 'Mixed aggregate order',
    quote: 'Our mixed aggregate order arrived as discussed and the material matched the requirement. The team was professional, responsive and easy to coordinate with.',
  },
  {
    name: 'Jahangir Alam', role: 'Civil Engineer', company: 'Metro Constructions', location: 'Sylhet', initials: 'JA', material: 'Medium river sand',
    quote: 'The Medium Sand was clean and properly graded for our work. ITC kept us updated from confirmation through dispatch, which made site planning much easier.',
  },
]

const AUTOPLAY_MS = 7000

const TestimonialsSlider = () => {
  const [active, setActive] = useState(0)
  const [manualPaused, setManualPaused] = useState(false)
  const [interacting, setInteracting] = useState(false)
  const cardRef = useRef(null)
  const touchStart = useRef(null)
  const testimonial = TESTIMONIALS[active]
  const paused = manualPaused || interacting

  const move = useCallback((direction) => {
    setActive((current) => (current + direction + TESTIMONIALS.length) % TESTIMONIALS.length)
  }, [])

  useEffect(() => {
    if (paused) return undefined
    const timer = window.setInterval(() => move(1), AUTOPLAY_MS)
    return () => window.clearInterval(timer)
  }, [move, paused])

  useEffect(() => {
    if (!cardRef.current || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined
    const animation = gsap.fromTo(cardRef.current, { y: 14, opacity: .45 }, { y: 0, opacity: 1, duration: .48, ease: 'power3.out' })
    return () => animation.kill()
  }, [active])

  const endTouch = (event) => {
    if (touchStart.current === null) return
    const distance = event.changedTouches[0].clientX - touchStart.current
    if (Math.abs(distance) > 45) move(distance > 0 ? -1 : 1)
    touchStart.current = null
  }

  return (
    <section
      id="testimonials"
      className="section-page overflow-hidden bg-[#f3f5f7]"
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocusCapture={() => setInteracting(true)}
      onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false) }}
    >
      <div className="container-page">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">Client experience</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-black tracking-[-.045em] text-brand-ink sm:text-5xl">What working with ITC feels like.</h2>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setManualPaused((value) => !value)} className="grid h-10 w-10 place-items-center rounded-full border border-brand-border bg-white text-xs text-brand-muted" aria-label={manualPaused ? 'Resume testimonial autoplay' : 'Pause testimonial autoplay'}><FontAwesomeIcon icon={manualPaused ? faPlay : faPause} /></button>
            <button type="button" onClick={() => move(-1)} className="grid h-10 w-10 place-items-center rounded-full border border-brand-border bg-white text-brand-primary transition hover:border-brand-primary/30" aria-label="Previous testimonial"><FontAwesomeIcon icon={faArrowLeft} /></button>
            <button type="button" onClick={() => move(1)} className="grid h-10 w-10 place-items-center rounded-full bg-brand-primary text-white shadow-md" aria-label="Next testimonial"><FontAwesomeIcon icon={faArrowRight} /></button>
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_330px]">
          <article
            ref={cardRef}
            className="flex min-h-[360px] flex-col justify-between rounded-[1.7rem] border border-brand-border bg-white p-6 shadow-[0_28px_75px_-55px_rgba(19,35,58,.5)] sm:p-9 lg:p-11"
            onTouchStart={(event) => { touchStart.current = event.touches[0].clientX }}
            onTouchEnd={endTouch}
            aria-live="polite"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <FontAwesomeIcon icon={faQuoteLeft} className="text-2xl text-brand-accent/55" />
                <span className="rounded-full bg-brand-wash px-3 py-2 text-[9px] font-black uppercase tracking-[.13em] text-brand-primary">{testimonial.material}</span>
              </div>
              <blockquote className="mt-7 max-w-4xl text-xl font-bold leading-[1.55] tracking-[-.02em] text-brand-ink sm:text-2xl lg:text-[1.8rem]">“{testimonial.quote}”</blockquote>
            </div>

            <div className="mt-9 flex items-center gap-4 border-t border-brand-border pt-6">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-primary text-sm font-black text-white">{testimonial.initials}</span>
              <div className="min-w-0"><p className="font-black text-brand-ink">{testimonial.name}</p><p className="mt-1 text-xs font-semibold text-brand-muted">{testimonial.role} · {testimonial.company}</p></div>
              <span className="ml-auto hidden items-center gap-2 text-[10px] font-bold text-brand-muted sm:inline-flex"><FontAwesomeIcon icon={faLocationDot} className="text-brand-accent" />{testimonial.location}</span>
            </div>
          </article>

          <div className="no-scrollbar flex gap-2 overflow-x-auto pb-2 lg:grid lg:overflow-visible lg:pb-0" aria-label="Choose a testimonial">
            {TESTIMONIALS.map((item, index) => (
              <button key={item.name} type="button" onClick={() => setActive(index)} className={`min-w-[230px] rounded-[1.15rem] border p-4 text-left transition lg:min-w-0 ${index === active ? 'border-brand-primary/25 bg-brand-primary text-white shadow-lg' : 'border-brand-border bg-white text-brand-ink hover:border-brand-primary/25'}`} aria-label={`Show testimonial from ${item.name}`}>
                <div className="flex items-center gap-3">
                  <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl text-xs font-black ${index === active ? 'bg-white/12 text-white' : 'bg-brand-wash text-brand-primary'}`}>{item.initials}</span>
                  <div className="min-w-0"><p className="truncate text-xs font-black">{item.name}</p><p className={`mt-1 truncate text-[10px] ${index === active ? 'text-white/58' : 'text-brand-muted'}`}>{item.company}</p></div>
                  <span className={`ml-auto text-[10px] font-black tabular-nums ${index === active ? 'text-[#e2bd70]' : 'text-brand-muted/55'}`}>0{index + 1}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 flex items-center gap-3">
          <span className="text-[10px] font-black tabular-nums text-brand-primary">{String(active + 1).padStart(2, '0')}</span>
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-brand-primary/10">
            <span key={`${active}-${paused}`} className={`block h-full origin-left rounded-full bg-brand-accent ${paused ? '' : 'testimonial-progress'}`} />
          </div>
          <span className="text-[10px] font-black tabular-nums text-brand-muted">{String(TESTIMONIALS.length).padStart(2, '0')}</span>
        </div>
      </div>

      <style>{`
        .testimonial-progress{animation:testimonialProgress ${AUTOPLAY_MS}ms linear both}
        @keyframes testimonialProgress{from{transform:scaleX(0)}to{transform:scaleX(1)}}
        @media(prefers-reduced-motion:reduce){.testimonial-progress{animation:none;transform:scaleX(1)}}
      `}</style>
    </section>
  )
}

export default TestimonialsSlider

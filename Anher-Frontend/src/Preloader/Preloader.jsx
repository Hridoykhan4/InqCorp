import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import gsap from 'gsap'
import { usePageScrollLock } from '../components/usePageScrollLock'

const PARTICLE_COUNT = 12
const angleFor = (index) => (index / PARTICLE_COUNT) * Math.PI * 2 + (index % 3 === 0 ? .2 : 0)

export const Preloader = () => {
  const logo = useSelector((state) => state.hvac.logo)
  const [finished, setFinished] = useState(false)
  const rootRef = useRef(null)
  const leftRef = useRef(null)
  const rightRef = useRef(null)
  const stageRef = useRef(null)
  const logoRef = useRef(null)
  const ringRef = useRef(null)
  const shockRef = useRef(null)
  const flashRef = useRef(null)
  const brandRef = useRef(null)
  const progressRef = useRef(null)
  const fillRef = useRef(null)
  const particleRefs = useRef([])
  usePageScrollLock(!finished)

  useEffect(() => {
    const escape = window.setTimeout(() => {
      setFinished(true)
    }, 6000)
    return () => window.clearTimeout(escape)
  }, [])

  useEffect(() => {
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      const timer = window.setTimeout(() => {
        setFinished(true)
      }, 500)
      return () => window.clearTimeout(timer)
    }

    const context = gsap.context(() => {
      const particles = particleRefs.current.filter(Boolean)
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      const radius = Math.min(centerX, centerY) * .58

      particles.forEach((particle, index) => {
        const angle = angleFor(index)
        gsap.set(particle, {
          position: 'fixed',
          x: centerX + Math.cos(angle) * radius,
          y: centerY + Math.sin(angle) * radius,
          xPercent: -50,
          yPercent: -50,
          opacity: 0,
          scale: .35,
        })
      })

      gsap.set(stageRef.current, { opacity: 0 })
      gsap.set(logoRef.current, { scale: 0, opacity: 0, rotate: -8 })
      gsap.set(ringRef.current, { scale: .65, opacity: 0 })
      gsap.set(shockRef.current, { scale: .5, opacity: 0 })
      gsap.set(flashRef.current, { opacity: 0 })
      gsap.set(brandRef.current, { y: 16, opacity: 0 })
      gsap.set(fillRef.current, { scaleX: 0, transformOrigin: 'left center' })

      const timeline = gsap.timeline({
        onComplete: () => {
          setFinished(true)
        },
      })

      timeline.to(particles, { opacity: 1, scale: 1, duration: .32, stagger: .04, ease: 'power2.out' }, .04)
      timeline.to(particles, {
        x: centerX,
        y: centerY,
        duration: .72,
        ease: 'power3.in',
        stagger: { amount: .18, from: 'random' },
      }, .18)
      timeline.to(flashRef.current, { opacity: 1, duration: .06 }, .85)
      timeline.to(flashRef.current, { opacity: 0, duration: .28 }, .91)
      timeline.to(particles, { opacity: 0, scale: 4, duration: .25, stagger: .02, ease: 'power3.out' }, .85)
      timeline.set(stageRef.current, { opacity: 1 }, .85)
      timeline.to(logoRef.current, { scale: 1.14, opacity: 1, rotate: 0, duration: .38, ease: 'back.out(2.4)' }, .87)
      timeline.to(logoRef.current, { scale: 1, duration: .42, ease: 'elastic.out(1.1,.5)' }, 1.22)
      timeline.fromTo(shockRef.current, { scale: .5, opacity: .8 }, { scale: 3.1, opacity: 0, duration: .65, ease: 'power2.out' }, .88)
      timeline.to(ringRef.current, { scale: 1, opacity: 1, duration: .32, ease: 'power3.out' }, 1)
      timeline.to(brandRef.current, { y: 0, opacity: 1, duration: .48, ease: 'power3.out' }, 1.18)
      timeline.to(fillRef.current, { scaleX: 1, duration: .9, ease: 'power2.inOut' }, 1.28)
      timeline.to([brandRef.current, progressRef.current], { y: -10, opacity: 0, duration: .25, ease: 'power2.in' }, 2.22)
      timeline.to([logoRef.current, ringRef.current], { scale: .92, opacity: 0, duration: .28, ease: 'power2.in' }, 2.24)
      timeline.to(leftRef.current, { x: '-102%', duration: .7, ease: 'power3.inOut' }, 2.28)
      timeline.to(rightRef.current, { x: '102%', duration: .7, ease: 'power3.inOut' }, 2.28)
    }, rootRef)

    return () => {
      context.revert()
    }
  }, [])

  if (finished) return null

  return (
    <div ref={rootRef} className="fixed inset-0 z-[99999] overflow-hidden" aria-label="Opening Inqilab Trading Corporation">
      <div ref={leftRef} className="opening-panel opening-panel-left" />
      <div ref={rightRef} className="opening-panel opening-panel-right" />

      {Array.from({ length: PARTICLE_COUNT }).map((_, index) => (
        <span key={index} ref={(element) => { particleRefs.current[index] = element }} className={`opening-particle ${index % 2 ? 'opening-particle-navy' : ''}`} aria-hidden="true" />
      ))}

      <div ref={flashRef} className="opening-flash" aria-hidden="true" />

      <div ref={stageRef} className="opening-stage">
        <div className="relative grid h-28 w-28 place-items-center">
          <span ref={shockRef} className="opening-shock" aria-hidden="true" />
          <span ref={ringRef} className="opening-ring" aria-hidden="true" />
          <img ref={logoRef} src={logo || '/inqcorpLogo.jpeg'} alt="ITC" className="opening-logo" onError={(event) => { event.currentTarget.src = '/inqcorpLogo.jpeg' }} />
        </div>
        <div ref={brandRef} className="text-center opacity-0">
          <p className="m-0 text-[clamp(2rem,5vw,3.25rem)] font-black leading-none tracking-[-.04em] text-brand-primary">ITC</p>
          <p className="mt-3 text-[clamp(.52rem,1.4vw,.7rem)] font-extrabold uppercase tracking-[.35em] text-brand-muted">Inqilab Trading Corporation · Bangladesh</p>
        </div>
      </div>

      <div ref={progressRef} className="opening-progress"><span ref={fillRef} className="opening-progress-fill" /></div>

      <style>{`
        .opening-panel{position:absolute;top:0;width:50%;height:100%;will-change:transform;background-color:#f8f7f3}
        .opening-panel::before{content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(23,59,103,.055) 1px,transparent 1px),linear-gradient(90deg,rgba(23,59,103,.055) 1px,transparent 1px);background-size:52px 52px}
        .opening-panel-left{left:0;background-image:radial-gradient(circle at 75% 45%,rgba(199,150,60,.13),transparent 38%)}
        .opening-panel-right{right:0;background-image:radial-gradient(circle at 25% 55%,rgba(23,59,103,.08),transparent 42%)}
        .opening-particle{position:fixed;z-index:10;width:8px;height:8px;border-radius:50%;background:#c7963c;box-shadow:0 0 12px rgba(199,150,60,.8),0 0 28px rgba(199,150,60,.35);will-change:transform,opacity}
        .opening-particle-navy{background:#173b67;box-shadow:0 0 12px rgba(23,59,103,.65),0 0 26px rgba(23,59,103,.28)}
        .opening-flash{position:absolute;inset:0;z-index:8;background:radial-gradient(circle at center,rgba(199,150,60,.28),transparent 65%);pointer-events:none}
        .opening-stage{position:absolute;inset:0;z-index:9;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:24px;pointer-events:none}
        .opening-shock{position:absolute;inset:-4px;border:2px solid rgba(199,150,60,.75);border-radius:50%}
        .opening-ring{position:absolute;inset:0;border:1.5px solid rgba(199,150,60,.55);border-radius:24px;box-shadow:0 0 22px rgba(199,150,60,.2),inset 0 0 18px rgba(199,150,60,.08)}
        .opening-logo{position:relative;z-index:2;width:92px;height:92px;object-fit:contain;padding:8px;border-radius:20px;background:#fff;box-shadow:0 22px 55px -24px rgba(19,35,58,.45);will-change:transform,opacity}
        .opening-progress{position:absolute;bottom:44px;left:50%;z-index:10;width:min(240px,52vw);height:3px;transform:translateX(-50%);overflow:hidden;border-radius:999px;background:rgba(23,59,103,.08)}
        .opening-progress-fill{display:block;height:100%;border-radius:inherit;background:linear-gradient(90deg,#173b67,#c7963c);box-shadow:0 0 12px rgba(199,150,60,.45)}
      `}</style>
    </div>
  )
}

export default Preloader

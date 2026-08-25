import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight, faExpand, faXmark } from '@fortawesome/free-solid-svg-icons'
import { SeoManager } from '../SEO/SeoManager'
import { breadcrumbSchema } from '../SEO/seo'
import { FALLBACK_GALLERY } from '../data/siteData'
import { usePageEntrance } from '../components/usePageEntrance'
import { usePageScrollLock } from '../components/usePageScrollLock'

export const Gallery = () => {
  const { gallery = [], contentStatus } = useOutletContext() || {}
  const images = gallery.length ? gallery : FALLBACK_GALLERY
  const [active, setActive] = useState(null)
  const pageRef = useRef(null)
  usePageEntrance(pageRef, [])
  usePageScrollLock(active !== null)

  const close = useCallback(() => setActive(null), [])
  const previous = useCallback(() => setActive((index) => (index - 1 + images.length) % images.length), [images.length])
  const next = useCallback(() => setActive((index) => (index + 1) % images.length), [images.length])

  useEffect(() => {
    if (active === null) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') close()
      if (event.key === 'ArrowLeft') previous()
      if (event.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [active, close, previous, next])

  return (
    <main ref={pageRef} className="min-h-screen bg-white pt-[76px]">
      <SeoManager
        title="Operations Gallery — Inqilab Trading Corporation"
        description="See ITC aggregate sourcing, quality inspection, loading and coordinated site delivery for projects across Bangladesh."
        path="/gallery"
        keywords="ITC gallery, Inqilab Trading Corporation projects, sand delivery Bangladesh, stone chips loading, construction material supply photos"
        structuredData={breadcrumbSchema([['Gallery', '/gallery']])}
      />

      <section className="border-b border-brand-border bg-[#fbfaf7] py-8 sm:py-11">
        <div className="container-page grid items-end gap-6 lg:grid-cols-[1fr_.75fr]">
          <div data-page-reveal>
            <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[.16em] text-brand-muted"><Link to="/">Home</Link><span aria-hidden="true">/</span><span className="text-brand-accent">Gallery</span></div>
            <h1 className="mt-3 max-w-4xl text-[clamp(2.3rem,4.5vw,4rem)] font-black leading-none tracking-[-.055em] text-brand-ink">Material in motion.</h1>
          </div>
          <div data-page-reveal>
            <p className="text-sm leading-7 text-brand-muted sm:text-base">Real moments from sourcing, checking, loading and delivery—not repeated catalogue artwork.</p>
            {contentStatus === 'fallback' && <p className="mt-4 text-xs font-semibold text-brand-muted">Showing the curated core gallery while live media reconnects.</p>}
          </div>
        </div>
      </section>

      <section className="pb-20 pt-7 sm:pt-9">
        <div className="container-page">
          <div className="grid auto-rows-[240px] gap-4 sm:grid-cols-2 sm:auto-rows-[290px] lg:grid-cols-12">
            {images.map((item, index) => {
              const span = index % 4 === 0 ? 'lg:col-span-7' : index % 4 === 1 ? 'lg:col-span-5' : index % 4 === 2 ? 'lg:col-span-5' : 'lg:col-span-7'
              return (
                <button data-page-reveal key={item._id || item.imageUrl || index} type="button" onClick={() => setActive(index)} className={`group relative overflow-hidden rounded-[1.6rem] bg-brand-surface text-left shadow-[0_22px_60px_-45px_rgba(19,35,58,.38)] ${span}`}>
                  <img src={item.imageUrl} alt={item.title || `ITC operations photo ${index + 1}`} loading={index < 2 ? 'eager' : 'lazy'} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" onError={(event) => { event.currentTarget.src = FALLBACK_GALLERY[index % FALLBACK_GALLERY.length].imageUrl }} />
                  <span className="absolute inset-0 bg-gradient-to-t from-[#102b4c]/65 via-transparent to-transparent opacity-75 transition group-hover:opacity-90" />
                  <span className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 p-5 sm:p-6">
                    <span><span className="block text-[9px] font-black uppercase tracking-[.17em] text-[#e2bd70]">ITC operations · 0{index + 1}</span><span className="mt-2 block text-base font-extrabold text-white sm:text-lg">{item.title || 'Aggregate supply operations'}</span></span>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-brand-primary opacity-0 transition duration-300 group-hover:opacity-100"><FontAwesomeIcon icon={faExpand} /></span>
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {active !== null && images[active] && (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-[#f7f4ee]/96 p-4 backdrop-blur-xl" role="dialog" aria-modal="true" aria-label="Gallery image viewer" onClick={close}>
          <button type="button" onClick={close} className="absolute right-5 top-5 grid h-12 w-12 place-items-center rounded-full border border-brand-border bg-white text-brand-ink shadow-lg" aria-label="Close image"><FontAwesomeIcon icon={faXmark} /></button>
          {images.length > 1 && <button type="button" onClick={(event) => { event.stopPropagation(); previous() }} className="absolute left-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-brand-border bg-white text-brand-primary shadow-lg sm:left-8" aria-label="Previous image"><FontAwesomeIcon icon={faChevronLeft} /></button>}
          <figure className="max-w-[min(1100px,86vw)]" onClick={(event) => event.stopPropagation()}>
            <img src={images[active].imageUrl} alt={images[active].title || 'ITC gallery'} className="max-h-[76vh] w-auto rounded-[1.5rem] object-contain shadow-[0_35px_100px_-45px_rgba(19,35,58,.5)]" />
            <figcaption className="mt-5 text-center"><p className="font-extrabold text-brand-ink">{images[active].title}</p><p className="mt-1 text-xs font-bold text-brand-muted">{String(active + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}</p></figcaption>
          </figure>
          {images.length > 1 && <button type="button" onClick={(event) => { event.stopPropagation(); next() }} className="absolute right-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-brand-border bg-white text-brand-primary shadow-lg sm:right-8" aria-label="Next image"><FontAwesomeIcon icon={faChevronRight} /></button>}
        </div>
      )}
    </main>
  )
}

export default Gallery

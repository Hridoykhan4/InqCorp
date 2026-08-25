import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare, faDownload, faFilePdf, faPhone } from '@fortawesome/free-solid-svg-icons'
import { SeoManager } from '../SEO/SeoManager'
import { breadcrumbSchema } from '../SEO/seo'
import { FALLBACK_CATALOGUES } from '../data/siteData'
import { usePageEntrance } from '../components/usePageEntrance'

const API_BASE = (import.meta.env.VITE_BACKEND_URL || '').replace(/\/+$/, '')
const imageOf = (item) => Array.isArray(item?.imageUrl) ? item.imageUrl[0] : item?.imageUrl

const safeFileName = (title) => `${title || 'ITC-Catalogue'}.pdf`
  .replace(/[\\/:*?"<>|]+/g, '')
  .replace(/\s+/g, '-')

export const Catelogue = () => {
  const [catalogues, setCatalogues] = useState(FALLBACK_CATALOGUES)
  const [live, setLive] = useState(false)
  const pageRef = useRef(null)
  usePageEntrance(pageRef, [])

  useEffect(() => {
    const controller = new AbortController()
    axios.get(`${API_BASE}/api/getCatalogues`, { signal: controller.signal, timeout: 12_000 })
      .then((response) => {
        const data = Array.isArray(response.data) ? response.data : response.data?.data
        if (Array.isArray(data) && data.length) {
          setCatalogues(data)
          setLive(true)
        }
      })
      .catch(() => {})
    return () => controller.abort()
  }, [])

  return (
    <main ref={pageRef} className="min-h-screen bg-[#fbfaf7] pt-[76px]">
      <SeoManager
        title="Product Catalogues | Inqilab Trading Corporation"
        description="View or download ITC construction material catalogues directly."
        path="/catalogue"
        keywords="ITC catalogue, Inqilab Trading Corporation catalogue, aggregate catalogue Bangladesh, sand stone chips price list pdf"
        structuredData={breadcrumbSchema([['Catalogue', '/catalogue']])}
      />

      <section className="border-b border-brand-border bg-white py-8 sm:py-11">
        <div className="container-page flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div data-page-reveal className="max-w-3xl">
            <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[.16em] text-brand-muted"><Link to="/">Home</Link><span aria-hidden="true">/</span><span className="text-brand-accent">Catalogue</span></div>
            <h1 className="mt-3 text-[clamp(2.25rem,4.5vw,4rem)] font-black leading-none tracking-[-.055em] text-brand-ink">The product book, ready to use.</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-brand-muted sm:text-base">Preview it online, download the PDF, or send it directly to your project team.</p>
          </div>
          <span data-page-reveal className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-border bg-[#fbfaf7] px-4 py-2 text-[11px] font-bold text-brand-muted">
            <span className={`h-2 w-2 rounded-full ${live ? 'bg-emerald-500' : 'bg-brand-accent'}`} />
            {live ? 'Live catalogue data' : 'Core catalogue available'}
          </span>
        </div>
      </section>

      <section className="pb-20 pt-7 sm:pt-9">
        <div className="container-page space-y-7">
          {catalogues.map((catalogue, index) => {
            const pdfReady = Boolean(catalogue?.pdfUrl)
            const image = imageOf(catalogue) || '/images/itc-site-delivery.webp'
            return (
              <article data-page-reveal key={catalogue?._id || `${catalogue?.title}-${index}`} className="grid overflow-hidden rounded-[1.75rem] border border-brand-border bg-white shadow-[0_28px_80px_-58px_rgba(19,35,58,.48)] md:grid-cols-[.4fr_.6fr]">
                <div className="relative min-h-[260px] overflow-hidden bg-brand-surface sm:min-h-[320px]">
                  <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/96 via-white/55 to-white/5" />
                  <div className="absolute inset-x-0 bottom-0 p-7 text-brand-ink sm:p-10">
                    <img src="/inqcorpLogo.jpeg" alt="ITC" className="h-14 w-14 rounded-xl border border-brand-border bg-white object-contain p-1.5 shadow-lg" />
                    <p className="mt-6 text-[10px] font-black uppercase tracking-[.2em] text-brand-accent">Official material catalogue</p>
                    <p className="mt-2 text-2xl font-black leading-tight">Inqilab Trading Corporation</p>
                  </div>
                </div>

                <div className="flex flex-col justify-center p-7 sm:p-9 lg:p-11">
                  <div className="inline-flex w-fit items-center gap-2 rounded-full bg-brand-wash px-3 py-2 text-[10px] font-black uppercase tracking-[.14em] text-brand-primary">
                    <FontAwesomeIcon icon={faFilePdf} className="text-brand-accent" /> PDF catalogue
                  </div>
                  <h2 className="mt-5 text-2xl font-black leading-tight tracking-[-.035em] text-brand-ink sm:text-3xl">{catalogue?.title || 'ITC Product Catalogue'}</h2>
                  {catalogue?.description && <p className="mt-5 max-w-2xl text-base leading-8 text-brand-muted">{catalogue.description}</p>}

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    {pdfReady ? (
                      <>
                        <a href={catalogue.pdfUrl} target="_blank" rel="noreferrer" className="btn-brand gap-2"><FontAwesomeIcon icon={faArrowUpRightFromSquare} /> View catalogue</a>
                        <a href={catalogue.pdfUrl} download={safeFileName(catalogue.title)} className="btn-brand-outline gap-2"><FontAwesomeIcon icon={faDownload} /> Download PDF</a>
                      </>
                    ) : (
                      <>
                        <span className="inline-flex min-h-12 items-center rounded-full border border-brand-border bg-brand-surface px-5 text-sm font-bold text-brand-muted">PDF update in progress</span>
                        <Link to="/contact?subject=Catalogue%20request" className="btn-brand-outline gap-2"><FontAwesomeIcon icon={faPhone} /> Request a copy</Link>
                      </>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </main>
  )
}

export default Catelogue

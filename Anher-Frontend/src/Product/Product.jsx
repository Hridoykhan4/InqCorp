import { useEffect, useMemo, useState } from 'react'
import { Link, useOutletContext, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faCheck, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
import { SeoManager } from '../SEO/SeoManager'
import { COMPANY } from '../SEO/companyInfo'
import { breadcrumbSchema, getAbsoluteUrl, stripHtml, truncate } from '../SEO/seo'

const imagesOf = (item) => {
  const images = Array.isArray(item?.imageUrl) ? item.imageUrl.filter(Boolean) : [item?.imageUrl].filter(Boolean)
  return images.length ? images : ['/images/itc-stone-chips.webp']
}

export const Product = () => {
  const { model } = useParams()
  const { products = [] } = useOutletContext() || {}
  const item = useMemo(() => products.find((product) => product?.model === model), [products, model])
  const images = useMemo(() => imagesOf(item), [item])
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => setActiveImage(0), [model])

  const related = useMemo(() => item
    ? products.filter((product) => product._id !== item._id && product.category === item.category).slice(0, 3)
    : [], [item, products])

  if (!item) {
    return (
      <main className="grid min-h-[80vh] place-items-center bg-[#fbfaf7] px-6 pt-[76px] text-center">
        <div className="max-w-lg"><p className="eyebrow">Material not found</p><h1 className="mt-4 text-4xl font-black tracking-tight text-brand-ink">This catalogue item is unavailable.</h1><p className="mt-4 leading-7 text-brand-muted">It may have moved or the catalogue may still be refreshing.</p><Link to="/all-products" className="btn-brand mt-7">Return to catalogue</Link></div>
      </main>
    )
  }

  const specs = (item.parameter || []).flatMap((entry) => {
    const [label, value] = Object.entries(entry || {})[0] || []
    return label && value ? [{ label, value }] : []
  })

  return (
    <main className="min-h-screen bg-white pt-[76px]">
      <SeoManager
        title={item.name || item.model}
        description={truncate(stripHtml(item.description || `${item.name} supplied by Inqilab Trading Corporation.`))}
        keywords={`${item.name}, ${item.category}, construction aggregates Bangladesh, Inqilab Trading Corporation`}
        image={images[0]}
        type="product"
        structuredData={[
          {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: item.name,
            sku: item.model,
            category: item.category,
            description: truncate(stripHtml(item.description || '')),
            image: images.map((image) => getAbsoluteUrl(image)),
            brand: { '@type': 'Brand', name: 'Inqilab Trading Corporation' },
          },
          breadcrumbSchema([['Materials', '/all-products'], [item.name || item.model, `/products/${item.model}`]]),
        ]}
      />

      <section className="border-b border-brand-border bg-[#fbfaf7] py-6">
        <div className="container-page"><Link to="/all-products" className="inline-flex items-center gap-2 text-xs font-extrabold text-brand-primary"><FontAwesomeIcon icon={faArrowLeft} /> Back to all materials</Link></div>
      </section>

      <section className="section-page !pt-12">
        <div className="container-page grid items-start gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
          <div>
            <div className="relative overflow-hidden rounded-[2rem] border border-brand-border bg-brand-surface p-2 shadow-[0_35px_90px_-55px_rgba(19,35,58,.45)] sm:p-3">
              <img src={images[activeImage]} alt={`${item.name} — view ${activeImage + 1}`} className="aspect-[4/3] w-full rounded-[1.55rem] object-cover sm:rounded-[1.65rem]" />
            </div>
            {images.length > 1 && <div className="no-scrollbar mt-4 flex gap-3 overflow-x-auto">{images.map((image, index) => <button key={image} type="button" onClick={() => setActiveImage(index)} className={`h-20 w-24 shrink-0 overflow-hidden rounded-xl border-2 ${activeImage === index ? 'border-brand-primary' : 'border-transparent'}`}><img src={image} alt="" className="h-full w-full object-cover" /></button>)}</div>}
          </div>

          <div className="lg:sticky lg:top-28">
            <div className="flex flex-wrap gap-2"><span className="product-card-badge">{item.category}</span><span className="rounded-full border border-brand-border bg-white px-3 py-1 text-[10px] font-bold tracking-[.1em] text-brand-muted">{item.model}</span></div>
            <h1 className="mt-5 text-balance text-4xl font-black leading-[1.03] tracking-[-.04em] text-brand-ink sm:text-5xl">{item.name}</h1>
            <p className="mt-6 text-base leading-8 text-brand-muted">{item.description}</p>

            {specs.length > 0 && (
              <dl className="mt-8 divide-y divide-brand-border border-y border-brand-border">
                {specs.map((spec) => <div key={`${spec.label}-${spec.value}`} className="grid grid-cols-[.8fr_1.2fr] gap-4 py-4 text-sm"><dt className="font-bold text-brand-muted">{spec.label}</dt><dd className="text-right font-extrabold text-brand-ink">{spec.value}</dd></div>)}
              </dl>
            )}

            <div className="mt-8 rounded-[1.5rem] border border-brand-border bg-[#fbfaf7] p-5 sm:p-6">
              <p className="text-[10px] font-black uppercase tracking-[.18em] text-brand-accent">Project pricing</p>
              <h2 className="mt-2 text-xl font-black text-brand-ink">Quote based on volume and delivery point.</h2>
              <p className="mt-2 text-sm leading-6 text-brand-muted">Share the required quantity, location and schedule for an accurate supply conversation.</p>
              <div className="mt-5 flex flex-wrap gap-3"><Link to={`/contact?product=${encodeURIComponent(item.name)}`} className="btn-brand gap-2">Request quote <FontAwesomeIcon icon={faArrowRight} /></Link><a href={`tel:${COMPANY.phoneTel}`} className="btn-brand-outline gap-2"><FontAwesomeIcon icon={faPhone} /> Call sales</a></div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-brand-border bg-[#fbfaf7] py-12">
        <div className="container-page grid gap-5 sm:grid-cols-3">
          {[['Requirement-led', 'Material range and grading discussed against the intended work.'], ['Coordinated supply', 'Volume, dispatch and site receiving details aligned before delivery.'], ['Direct support', 'A clear point of contact for follow-up and repeat requirements.']].map(([title, copy]) => <article key={title} className="rounded-[1.5rem] border border-brand-border bg-white p-6"><FontAwesomeIcon icon={faCheck} className="text-brand-accent" /><h3 className="mt-4 font-black text-brand-ink">{title}</h3><p className="mt-2 text-sm leading-6 text-brand-muted">{copy}</p></article>)}
        </div>
      </section>

      {related.length > 0 && <section className="section-page"><div className="container-page"><div className="flex items-end justify-between gap-4"><div><p className="eyebrow">Same range</p><h2 className="mt-3 text-3xl font-black tracking-tight text-brand-ink">Related materials</h2></div><Link to={`/all-products?category=${encodeURIComponent(item.category)}`} className="text-xs font-extrabold text-brand-primary">View category</Link></div><div className="mt-8 grid gap-5 sm:grid-cols-3">{related.map((product) => <Link key={product._id || product.model} to={`/products/${encodeURIComponent(product.model)}`} className="product-card group"><img src={imagesOf(product)[0]} alt={product.name} loading="lazy" className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-[1.02]" /><div className="p-5"><p className="text-[9px] font-black uppercase tracking-[.14em] text-brand-accent">{product.model}</p><h3 className="mt-2 font-black text-brand-ink">{product.name}</h3></div></Link>)}</div></div></section>}

      <section className="pb-20"><div className="container-page"><div className="flex flex-col items-start justify-between gap-6 rounded-[2rem] border border-brand-border bg-white p-8 shadow-[0_24px_70px_-48px_rgba(19,35,58,.3)] sm:flex-row sm:items-center"><div><p className="eyebrow">Need a datasheet or supply note?</p><h2 className="mt-2 text-2xl font-black text-brand-ink">Ask for the project-specific document pack.</h2></div><a href={`mailto:${COMPANY.email}?subject=${encodeURIComponent(`${item.name} specification request`)}`} className="btn-brand-outline gap-2"><FontAwesomeIcon icon={faEnvelope} /> Email ITC</a></div></div></section>
    </main>
  )
}

export default Product

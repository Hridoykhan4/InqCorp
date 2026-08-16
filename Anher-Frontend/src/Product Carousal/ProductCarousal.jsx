import { Link, useOutletContext } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FALLBACK_PRODUCTS } from '../data/siteData'

const imageOf = (item) => Array.isArray(item?.imageUrl) ? item.imageUrl[0] : item?.imageUrl

const ProductCarousal = () => {
  const { products = [] } = useOutletContext() || {}
  const featured = (products.length ? products : FALLBACK_PRODUCTS).slice(0, 4)

  return (
    <section className="section-page bg-white">
      <div className="container-page">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">Popular products</p>
            <h2 className="heading-lg mt-4 text-balance">Commonly requested materials.</h2>
            <p className="body-lead mt-5 max-w-xl">Open a product to see its grade, common uses and supply details.</p>
          </div>
          <Link to="/all-products" className="btn-brand-outline shrink-0 gap-2">View all products <FontAwesomeIcon icon={faArrowRight} className="text-xs" /></Link>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((item) => (
            <Link key={item._id || item.model} to={`/products/${encodeURIComponent(item.model)}`} className="product-card group flex min-h-full flex-col">
              <div className="relative aspect-[4/3] overflow-hidden bg-brand-surface">
                <img src={imageOf(item) || '/images/itc-stone-chips.webp'} alt={item.name} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <span className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[.15em] text-brand-primary shadow-sm backdrop-blur">{item.category}</span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-[10px] font-bold uppercase tracking-[.14em] text-brand-muted">{item.model}</p>
                <h3 className="mt-2 text-lg font-black tracking-tight text-brand-ink">{item.name}</h3>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-brand-muted">{item.description}</p>
                <span className="mt-auto inline-flex items-center gap-2 pt-5 text-xs font-extrabold text-brand-primary">View material <FontAwesomeIcon icon={faArrowRight} className="transition group-hover:translate-x-1" /></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductCarousal

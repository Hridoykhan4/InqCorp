import { Link, useOutletContext } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { capitalizeWords } from '../Functions/functions'
import { getCategoryHref, getCategoryList, isExternalCategory } from '../config/navigation'

const imageOf = (item) => {
  const value = item?.bannerImgUrl?.length ? item.bannerImgUrl : item?.imageUrl
  return Array.isArray(value) ? value[0] : value
}

const CategoryShowcase = () => {
  const { categories = [] } = useOutletContext() || {}
  const list = getCategoryList(categories)

  return (
    <section className="section-page bg-[#fbfaf7]">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Product categories</p>
          <h2 className="heading-lg mt-4 text-balance">Browse by category.</h2>
          <p className="body-lead mx-auto mt-5 max-w-xl">Choose sand, stone chips, boulder or filling materials.</p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {list.map((item, index) => {
            const name = capitalizeWords(item?.name || item?.label || 'Material')
            const className = 'group grid min-h-[230px] overflow-hidden rounded-[1.75rem] border border-brand-border bg-white shadow-[0_24px_60px_-45px_rgba(19,35,58,.35)] sm:grid-cols-[.92fr_1.08fr]'
            const content = (
              <>
                <div className="relative min-h-[180px] overflow-hidden bg-brand-surface">
                  <img src={imageOf(item) || '/images/itc-site-delivery.webp'} alt={name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                </div>
                <div className="flex flex-col justify-between p-6 sm:p-7">
                  <span className="text-[10px] font-black uppercase tracking-[.18em] text-brand-accent">Range 0{index + 1}</span>
                  <div>
                    <h3 className="mt-8 text-2xl font-black tracking-tight text-brand-ink">{name}</h3>
                    <p className="mt-3 text-sm leading-6 text-brand-muted">View product options, typical applications and supply details.</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-xs font-extrabold text-brand-primary">Explore range <FontAwesomeIcon icon={faArrowRight} className="transition group-hover:translate-x-1" /></span>
                  </div>
                </div>
              </>
            )

            return isExternalCategory(item)
              ? <a key={item._id || name} href={getCategoryHref(item)} className={className}>{content}</a>
              : <Link key={item._id || name} to={getCategoryHref(item)} className={className}>{content}</Link>
          })}
        </div>
      </div>
    </section>
  )
}

export default CategoryShowcase

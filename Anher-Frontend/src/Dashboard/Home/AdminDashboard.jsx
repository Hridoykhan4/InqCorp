import { useMemo, useRef } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRight,
  faBoxesStacked,
  faCircleCheck,
  faClock,
  faImages,
  faLayerGroup,
  faMessage,
  faPhotoFilm,
  faPlus,
  faTag,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons'
import { capitalizeWords } from '../../Functions/functions'
import { usePageEntrance } from '../../components/usePageEntrance'

const imageOf = (item) => Array.isArray(item?.imageUrl) ? item.imageUrl[0] : item?.imageUrl

const formatDate = (value) => {
  if (!value) return 'Recently'
  return new Intl.DateTimeFormat('en-BD', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' }).format(new Date(value))
}

const OverviewCard = ({ icon, label, value, note, tone = 'navy' }) => {
  const tones = {
    navy: 'bg-[#eaf0f6] text-brand-primary',
    gold: 'bg-[#f8f0df] text-[#9c711f]',
    green: 'bg-emerald-50 text-emerald-700',
    slate: 'bg-slate-100 text-slate-600',
  }

  return (
    <article data-page-reveal className="rounded-2xl border border-[#e0e5eb] bg-white p-4 shadow-[0_18px_45px_-38px_rgba(15,34,57,.45)] sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <span className={`grid h-10 w-10 place-items-center rounded-xl text-sm ${tones[tone]}`}><FontAwesomeIcon icon={icon} /></span>
        <p className="text-2xl font-black tracking-[-.04em] text-brand-ink sm:text-3xl">{value}</p>
      </div>
      <p className="mt-5 text-xs font-black text-brand-ink">{label}</p>
      <p className="mt-1 text-[11px] leading-5 text-brand-muted">{note}</p>
    </article>
  )
}

const AdminDashboard = () => {
  const { products = [], categories = [], queries = [], banners = [], gallery = [], priceList = [] } = useOutletContext() || {}
  const admin = useSelector((state) => state.hvac.users)
  const pageRef = useRef(null)
  usePageEntrance(pageRef, [])

  const categoryCounts = useMemo(() => categories.map((category) => ({
    name: category.name,
    count: products.filter((product) => product.category === category.name).length,
  })), [categories, products])

  const readiness = useMemo(() => {
    if (!products.length) return 0
    const complete = products.filter((product) => imageOf(product) && product.description && product.parameter?.length).length
    return Math.round((complete / products.length) * 100)
  }, [products])

  const recentQueries = queries.slice(0, 5)
  const recentProducts = products.slice(-4).reverse()
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div ref={pageRef} className="space-y-4 sm:space-y-5">
      <section data-page-reveal className="relative overflow-hidden rounded-[1.6rem] bg-[#12243b] p-5 text-white shadow-[0_28px_70px_-45px_rgba(11,25,42,.85)] sm:p-7">
        <div className="absolute -right-20 -top-28 h-64 w-64 rounded-full bg-[#c7963c]/12 blur-3xl" />
        <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[.18em] text-[#e2bd70]">{greeting}</p>
            <h1 className="mt-2 text-2xl font-black tracking-[-.035em] sm:text-3xl">{admin?.name ? capitalizeWords(admin.name) : 'ITC Administrator'}</h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-white/58">Your public catalogue, enquiries and live homepage updates are connected here.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link to="/dashboard/products" className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-white px-4 text-xs font-extrabold text-[#12243b]"><FontAwesomeIcon icon={faPlus} /> Add product</Link>
            <Link to="/dashboard/queries" className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-white/15 bg-white/8 px-4 text-xs font-extrabold text-white">Open enquiries <FontAwesomeIcon icon={faArrowRight} /></Link>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3 xl:grid-cols-5">
        <OverviewCard icon={faMessage} label="Enquiries" value={queries.length} note="Customer requests received" tone="green" />
        <OverviewCard icon={faBoxesStacked} label="Products" value={products.length} note={`${readiness}% fully detailed`} />
        <OverviewCard icon={faLayerGroup} label="Categories" value={categories.length} note="Public product ranges" tone="gold" />
        <OverviewCard icon={faPhotoFilm} label="Live updates" value={banners.length} note="Homepage banner slides" tone="slate" />
        <OverviewCard icon={faImages} label="Gallery" value={gallery.length} note="Published operation photos" tone="navy" />
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.2fr_.8fr]">
        <article data-page-reveal className="overflow-hidden rounded-[1.6rem] border border-[#e0e5eb] bg-white">
          <div className="flex items-center justify-between gap-4 border-b border-[#e8ebef] px-5 py-4 sm:px-6">
            <div>
              <p className="text-sm font-black text-brand-ink">Latest enquiries</p>
              <p className="mt-1 text-[11px] text-brand-muted">Real requests from the public contact form</p>
            </div>
            <Link to="/dashboard/queries" className="text-[11px] font-black text-brand-primary">View all</Link>
          </div>

          {recentQueries.length ? (
            <div className="divide-y divide-[#edf0f3]">
              {recentQueries.map((query, index) => (
                <Link key={query._id || index} to="/dashboard/queries" className="grid gap-3 px-5 py-4 transition hover:bg-[#f8fafb] sm:grid-cols-[1fr_auto] sm:items-center sm:px-6">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="truncate text-sm font-extrabold text-brand-ink">{query.name || 'Customer enquiry'}</p>
                      <span className="rounded-full bg-brand-wash px-2 py-1 text-[9px] font-black uppercase tracking-[.08em] text-brand-primary">{query.type || 'Project enquiry'}</span>
                    </div>
                    <p className="mt-1 truncate text-xs text-brand-muted">{query.subject || query.description || 'No subject provided'}</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-brand-muted"><FontAwesomeIcon icon={faClock} />{formatDate(query.createdAt)}</span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="px-6 py-12 text-center">
              <FontAwesomeIcon icon={faMessage} className="text-2xl text-brand-primary/20" />
              <p className="mt-3 text-sm font-bold text-brand-ink">No enquiries yet</p>
              <p className="mt-1 text-xs text-brand-muted">New website enquiries will appear here.</p>
            </div>
          )}
        </article>

        <article data-page-reveal className="rounded-[1.6rem] border border-[#e0e5eb] bg-white p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div><p className="text-sm font-black text-brand-ink">Catalogue readiness</p><p className="mt-1 text-[11px] text-brand-muted">Required public content</p></div>
            <span className="text-2xl font-black text-brand-primary">{readiness}%</span>
          </div>
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-[#edf0f3]"><span className="block h-full rounded-full bg-gradient-to-r from-brand-primary to-brand-accent" style={{ width: `${readiness}%` }} /></div>
          <div className="mt-6 space-y-3 text-xs">
            {[
              ['Products have image, copy and specs', readiness === 100],
              ['Homepage has a public update', banners.length > 0],
              ['Gallery has operation photos', gallery.length >= 4],
              ['Live material rates are configured', priceList.length > 0],
            ].map(([label, ready]) => (
              <div key={label} className="flex items-center gap-3">
                <FontAwesomeIcon icon={ready ? faCircleCheck : faTriangleExclamation} className={ready ? 'text-emerald-600' : 'text-amber-500'} />
                <span className={ready ? 'font-semibold text-brand-ink' : 'text-brand-muted'}>{label}</span>
              </div>
            ))}
          </div>
          <Link to="/dashboard/products" className="mt-6 inline-flex items-center gap-2 text-xs font-black text-brand-primary">Review catalogue <FontAwesomeIcon icon={faArrowRight} /></Link>
        </article>
      </section>

      <section className="grid gap-4 lg:grid-cols-[.9fr_1.1fr]">
        <article data-page-reveal className="rounded-[1.6rem] border border-[#e0e5eb] bg-white p-5 sm:p-6">
          <div className="flex items-center justify-between"><p className="text-sm font-black text-brand-ink">Category coverage</p><span className="text-[10px] font-black uppercase tracking-[.12em] text-brand-muted">{products.length} products</span></div>
          <div className="mt-5 space-y-4">
            {categoryCounts.map((category) => {
              const width = products.length ? Math.max(8, Math.round((category.count / products.length) * 100)) : 0
              return (
                <div key={category.name}>
                  <div className="flex items-center justify-between gap-4 text-xs"><span className="font-bold text-brand-ink">{category.name}</span><span className="font-black tabular-nums text-brand-muted">{category.count}</span></div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#edf0f3]"><span className="block h-full rounded-full bg-brand-primary" style={{ width: `${width}%` }} /></div>
                </div>
              )
            })}
          </div>
        </article>

        <article data-page-reveal className="rounded-[1.6rem] border border-[#e0e5eb] bg-white p-5 sm:p-6">
          <div className="flex items-center justify-between"><p className="text-sm font-black text-brand-ink">Recently added products</p><Link to="/dashboard/products" className="text-[11px] font-black text-brand-primary">Manage</Link></div>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {recentProducts.map((product) => (
              <Link key={product._id || product.model} to="/dashboard/products" className="group overflow-hidden rounded-xl border border-[#e5e9ee] bg-[#f8fafb]">
                <img src={imageOf(product) || '/images/itc-stone-chips.webp'} alt="" className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="p-3"><p className="truncate text-[11px] font-extrabold text-brand-ink">{product.name}</p><p className="mt-1 truncate text-[9px] font-bold uppercase tracking-[.08em] text-brand-muted">{product.category}</p></div>
              </Link>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link to="/dashboard/live-rates" className="inline-flex items-center gap-2 rounded-xl bg-brand-wash px-3 py-2 text-[10px] font-black text-brand-primary"><FontAwesomeIcon icon={faTag} /> Live Material Rates</Link>
            <Link to="/dashboard/banners" className="inline-flex items-center gap-2 rounded-xl bg-[#f8f0df] px-3 py-2 text-[10px] font-black text-[#93691d]"><FontAwesomeIcon icon={faPhotoFilm} /> Public updates</Link>
          </div>
        </article>
      </section>
    </div>
  )
}

export default AdminDashboard

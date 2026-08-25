import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation, useOutletContext, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faDownload, faMagnifyingGlass, faPenToSquare, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { ProductUpload } from '../Dashboard/FileUpload/ProductUpload'
import { ProductUpdate } from '../Dashboard/Update/ProductUpdate'
import { SeoManager } from '../SEO/SeoManager'
import { breadcrumbSchema } from '../SEO/seo'
import { usePageEntrance } from '../components/usePageEntrance'

const API_BASE = (import.meta.env.VITE_BACKEND_URL || '').replace(/\/+$/, '')
const SORTS = [
  { value: 'featured', label: 'Featured' },
  { value: 'name-asc', label: 'Name A–Z' },
  { value: 'name-desc', label: 'Name Z–A' },
  { value: 'category', label: 'Category' },
]

const imageOf = (item) => Array.isArray(item?.imageUrl) ? item.imageUrl[0] : item?.imageUrl

const firstSpec = (item) => {
  const spec = item?.parameter?.find((entry) => entry && typeof entry === 'object')
  if (!spec) return null
  const [label, value] = Object.entries(spec)[0] || []
  return label && value ? `${label}: ${value}` : null
}

export const AllProducts = () => {
  const { products = [], categories = [], setProducts, contentStatus } = useOutletContext() || {}
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const isDashboard = location.pathname.startsWith('/dashboard')
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [category, setCategory] = useState(searchParams.get('category') || 'All')
  const [sort, setSort] = useState('featured')
  const [limit, setLimit] = useState(12)
  const [selected, setSelected] = useState([])
  const pageRef = useRef(null)
  usePageEntrance(pageRef, [isDashboard])
  const productsAvailable = !isDashboard || contentStatus === 'live'
  const visibleProducts = useMemo(() => productsAvailable ? products : [], [products, productsAvailable])

  useEffect(() => {
    const next = {}
    if (search.trim()) next.search = search.trim()
    if (category !== 'All') next.category = category
    setSearchParams(next, { replace: true })
    setLimit(12)
  }, [search, category, setSearchParams])

  const categoryNames = useMemo(() => {
    const values = categories.map((item) => item?.name).filter(Boolean)
    if (!values.length) visibleProducts.forEach((item) => item?.category && values.push(item.category))
    return ['All', ...new Set(values)]
  }, [categories, visibleProducts])

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    const result = visibleProducts.filter((item) => {
      const matchCategory = category === 'All' || item?.category === category
      const haystack = `${item?.name || ''} ${item?.model || ''} ${item?.category || ''} ${item?.description || ''}`.toLowerCase()
      return matchCategory && (!query || haystack.includes(query))
    })

    if (sort === 'name-asc') result.sort((a, b) => (a.name || '').localeCompare(b.name || ''))
    if (sort === 'name-desc') result.sort((a, b) => (b.name || '').localeCompare(a.name || ''))
    if (sort === 'category') result.sort((a, b) => (a.category || '').localeCompare(b.category || ''))
    return result
  }, [visibleProducts, search, category, sort])

  const removeSelected = async () => {
    if (!selected.length) return
    const confirmation = await Swal.fire({
      title: `Delete ${selected.length} product${selected.length > 1 ? 's' : ''}?`,
      text: 'This cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#b42318',
      confirmButtonText: 'Delete',
    })
    if (!confirmation.isConfirmed) return

    try {
      await Promise.all(selected.map((id) => axios.delete(`${API_BASE}/api/deleteProduct`, { data: { id } })))
      setProducts((current) => current.filter((item) => !selected.includes(item._id)))
      setSelected([])
      Swal.fire({ title: 'Products deleted', icon: 'success', timer: 1300, showConfirmButton: false })
    } catch (error) {
      Swal.fire('Could not delete', error?.response?.data?.message || 'Please try again.', 'error')
    }
  }

  const exportProducts = () => {
    const blob = new Blob([JSON.stringify(filtered, null, 2)], { type: 'application/json' })
    const href = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = href
    anchor.download = 'itc-products.json'
    anchor.click()
    URL.revokeObjectURL(href)
  }

  const openProductEditor = (id) => {
    const toggle = document.getElementById(`ProductUpdate-${id}`)
    if (toggle) toggle.checked = true
  }

  return (
    <main ref={pageRef} className={isDashboard ? 'min-h-0 bg-transparent' : 'min-h-screen bg-white pt-[76px]'}>
      {!isDashboard && (
        <>
          <SeoManager
            title="Construction Aggregate Catalogue — Sand, Stone Chips & Boulder"
            description="Browse ITC construction aggregates: screened plaster sand, river sand, graded stone chips, natural boulder and filling materials with nationwide supply coordination."
            path="/all-products"
            keywords="sand supplier Bangladesh, stone chips Bangladesh, boulder supplier, aggregate catalogue, construction materials Dhaka, plaster sand price, river sand price, stone chips price bd, filling sand supplier"
            structuredData={breadcrumbSchema([['Materials', '/all-products']])}
          />
          <section className="overflow-hidden border-b border-brand-border bg-[#fbfaf7] py-8 sm:py-11">
            <div className="container-page grid items-end gap-7 lg:grid-cols-[1fr_auto]">
              <div data-page-reveal>
                <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[.16em] text-brand-muted"><Link to="/">Home</Link><span aria-hidden="true">/</span><span className="text-brand-accent">Materials</span></div>
                <h1 className="mt-3 max-w-3xl text-[clamp(2.35rem,5vw,4.5rem)] font-black leading-[.98] tracking-[-.055em] text-brand-ink">Choose the right material.</h1>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-brand-muted sm:text-base">Filter by material, check the grade, then share quantity and delivery location for a current delivered quote.</p>
              </div>
              <div data-page-reveal className="flex flex-wrap gap-2 lg:max-w-[340px] lg:justify-end">
                {['CFT / Ton', 'Grade matched', 'Site delivery'].map((label) => <span key={label} className="rounded-full border border-brand-border bg-white px-4 py-2 text-[10px] font-extrabold uppercase tracking-[.1em] text-brand-ink">{label}</span>)}
                {contentStatus === 'fallback' && <span className="w-full text-right text-[10px] font-bold text-brand-muted">Live inventory reconnecting · Core range shown</span>}
              </div>
            </div>
          </section>
        </>
      )}

      <section className={isDashboard ? '' : 'pb-20 pt-6 sm:pt-8'}>
        <div className={isDashboard ? 'mx-auto max-w-[1500px]' : 'container-page'}>
          {isDashboard && (
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div><p className="eyebrow">Dashboard</p><h1 className="mt-2 text-3xl font-black text-brand-ink">Products</h1></div>
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={exportProducts} disabled={!productsAvailable} className="btn-brand-outline gap-2 disabled:cursor-not-allowed disabled:opacity-50"><FontAwesomeIcon icon={faDownload} /> Export</button>
                {selected.length > 0 && <button type="button" onClick={removeSelected} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-red-700 px-5 text-sm font-bold text-white"><FontAwesomeIcon icon={faTrash} /> Delete ({selected.length})</button>}
                {productsAvailable && <label htmlFor="my_modal_4" className="btn-brand cursor-pointer gap-2"><FontAwesomeIcon icon={faPlus} /> Add product</label>}
              </div>
            </div>
          )}

          <div data-page-reveal className={`sticky z-20 rounded-[1.5rem] border border-brand-border bg-white/92 p-3 shadow-[0_20px_50px_-36px_rgba(19,35,58,.32)] backdrop-blur-xl sm:p-4 ${isDashboard ? 'top-[88px]' : 'top-[84px]'}`}>
            <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
              <label className="relative block">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-brand-muted" />
                <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search material, model or application" className="h-12 w-full rounded-full border border-brand-border bg-brand-surface pl-11 pr-4 text-sm font-semibold text-brand-ink outline-none transition focus:border-brand-primary focus:bg-white" />
              </label>
              <select value={sort} onChange={(event) => setSort(event.target.value)} className="h-12 rounded-full border border-brand-border bg-white px-5 text-sm font-bold text-brand-ink outline-none focus:border-brand-primary">
                {SORTS.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
              </select>
            </div>
            <div className="mt-3 flex flex-wrap gap-2 pb-1">
              {categoryNames.map((name) => (
                <button key={name} type="button" onClick={() => setCategory(name)} className={`shrink-0 rounded-full px-4 py-2 text-xs font-extrabold transition ${category === name ? 'bg-brand-primary text-white' : 'border border-brand-border bg-white text-brand-muted hover:text-brand-primary'}`}>{name}</button>
              ))}
            </div>
          </div>

          <div className="mt-7 flex items-center justify-between gap-4">
            <p className="text-sm font-bold text-brand-ink">{filtered.length} material{filtered.length === 1 ? '' : 's'} <span className="font-medium text-brand-muted">matched</span></p>
            {(search || category !== 'All') && <button type="button" onClick={() => { setSearch(''); setCategory('All') }} className="text-xs font-extrabold text-brand-primary">Clear filters</button>}
          </div>

          {filtered.length ? (
            <>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.slice(0, limit).map((item) => {
                  const checked = selected.includes(item._id)
                  return (
                    <Fragment key={item._id || item.model}>
                      <article className={`product-card group flex min-h-full flex-col ${checked ? 'ring-2 ring-brand-primary ring-offset-2' : ''}`}>
                      <div className="relative aspect-[16/10] overflow-hidden bg-brand-surface">
                        <img src={imageOf(item) || '/images/itc-stone-chips.webp'} alt={item.name} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" onError={(event) => { event.currentTarget.src = '/images/itc-stone-chips.webp' }} />
                        <span className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1.5 text-[9px] font-black uppercase tracking-[.15em] text-brand-primary shadow backdrop-blur">{item.category}</span>
                        {isDashboard && <label className="absolute right-4 top-4 grid h-9 w-9 cursor-pointer place-items-center rounded-full bg-white shadow"><input type="checkbox" className="checkbox checkbox-sm" checked={checked} onChange={(event) => setSelected((current) => event.target.checked ? [...current, item._id] : current.filter((id) => id !== item._id))} /></label>}
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <p className="text-[10px] font-extrabold uppercase tracking-[.14em] text-brand-muted">{item.model}</p>
                        <h2 className="mt-2 text-xl font-black tracking-tight text-brand-ink">{item.name}</h2>
                        {firstSpec(item) && <p className="mt-3 text-xs font-bold text-brand-accent">{firstSpec(item)}</p>}
                        <p className="mt-3 line-clamp-3 text-sm leading-6 text-brand-muted">{item.description}</p>
                        <div className="mt-auto flex items-center justify-between gap-3 pt-6">
                          <Link to={`/products/${encodeURIComponent(item.model)}`} className="inline-flex items-center gap-2 text-xs font-extrabold text-brand-primary">View details <FontAwesomeIcon icon={faArrowRight} className="transition group-hover:translate-x-1" /></Link>
                          {isDashboard && <button type="button" onClick={() => openProductEditor(item._id)} aria-label={`Edit ${item.name || item.model}`} className="inline-flex min-h-9 items-center gap-2 rounded-full border border-brand-border bg-white px-4 text-xs font-extrabold text-brand-ink transition hover:border-brand-primary hover:text-brand-primary"><FontAwesomeIcon icon={faPenToSquare} /> Edit</button>}
                          {!isDashboard && <Link to={`/contact?product=${encodeURIComponent(item.name)}`} className="rounded-full border border-brand-border px-3 py-2 text-[10px] font-extrabold text-brand-ink hover:border-brand-primary">Get quote</Link>}
                        </div>
                      </div>
                      </article>
                      {isDashboard && <ProductUpdate item={item} />}
                    </Fragment>
                  )
                })}
              </div>

              {limit < filtered.length && <div className="mt-10 text-center"><button type="button" onClick={() => setLimit((value) => value + 12)} className="btn-brand-outline">Load more materials</button></div>}
            </>
          ) : isDashboard && !productsAvailable ? (
            <div className="mt-8 rounded-[2rem] border border-dashed border-brand-border bg-[#fbfaf7] px-6 py-20 text-center">
              <span className="loading loading-spinner loading-lg text-brand-primary" />
              <h2 className="mt-5 text-2xl font-black text-brand-ink">{contentStatus === 'loading' ? 'Loading live products' : 'Products are temporarily unavailable'}</h2>
              <p className="mt-2 text-sm text-brand-muted">{contentStatus === 'loading' ? 'The dashboard is connecting to the catalogue.' : 'Reconnect the API before making catalogue changes.'}</p>
            </div>
          ) : (
            <div className="mt-8 rounded-[2rem] border border-dashed border-brand-border bg-[#fbfaf7] px-6 py-20 text-center">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="mx-auto text-3xl text-brand-accent/55" />
              <h2 className="mt-5 text-2xl font-black text-brand-ink">No matching material</h2>
              <p className="mt-2 text-sm text-brand-muted">Try a broader search or clear the selected category.</p>
              <button type="button" onClick={() => { setSearch(''); setCategory('All') }} className="btn-brand mt-6">Reset catalogue</button>
            </div>
          )}
        </div>
      </section>

      {isDashboard && productsAvailable && <ProductUpload />}
    </main>
  )
}

export default AllProducts

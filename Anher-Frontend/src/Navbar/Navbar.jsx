import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faBars, faChevronDown, faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons'
import { getCategoryHref, getCategoryList } from '../config/navigation'
import { capitalizeWords } from '../Functions/functions'

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Catalogue', path: '/catalogue' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Contact', path: '/contact' },
]

export const Navbar = ({ categories = [] }) => {
  const [productsOpen, setProductsOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const menuRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()
  const logo = useSelector((state) => state.hvac.logo)
  const admin = useSelector((state) => state.hvac.users)
  const categoryList = getCategoryList(categories)
  const isDashboard = location.pathname.startsWith('/dashboard')

  const isActive = (path) => path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)

  useEffect(() => {
    setProductsOpen(false)
    setMobileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const onPointerDown = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) setProductsOpen(false)
    }
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setProductsOpen(false)
        setMobileOpen(false)
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  useEffect(() => {
    const previous = document.body.style.overflow
    if (mobileOpen) document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previous }
  }, [mobileOpen])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-brand-border/80 bg-white/90 backdrop-blur-xl">
      <div className="container-page flex h-[76px] items-center justify-between gap-4">
        <button type="button" onClick={() => navigate('/')} className="group relative flex min-w-0 items-center gap-3 text-left" aria-label="ITC home">
          <span className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-2xl border border-brand-border bg-white p-1 shadow-sm">
            <img src={logo || '/inqcorpLogo.jpeg'} alt="ITC logo" className="h-full w-full rounded-xl object-contain" onError={(event) => { event.currentTarget.src = '/inqcorpLogo.jpeg' }} />
          </span>
          <span className="hidden sm:block">
            <span className="block text-lg font-black leading-5 tracking-[-.04em] text-brand-ink">ITC</span>
            <span className="mt-1 block text-[9px] font-extrabold uppercase tracking-[.18em] text-brand-muted">Inqilab Trading Corporation</span>
          </span>
          {admin?.token && (
            <label htmlFor="uploadLogo" onClick={(event) => event.stopPropagation()} className="absolute -right-1 -top-2 grid h-6 w-6 cursor-pointer place-items-center rounded-full bg-brand-primary text-[9px] text-white opacity-0 shadow transition group-hover:opacity-100" title="Update logo">
              <FontAwesomeIcon icon={faPenToSquare} />
            </label>
          )}
        </button>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {NAV_ITEMS.slice(0, 2).map((item) => (
            <Link key={item.path} to={item.path} className={`rounded-full px-4 py-2 text-[13px] font-bold transition ${isActive(item.path) ? 'bg-brand-wash text-brand-primary' : 'text-brand-muted hover:text-brand-ink'}`}>{item.label}</Link>
          ))}

          <div ref={menuRef} className="relative">
            <button type="button" onClick={() => setProductsOpen((value) => !value)} className={`flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-bold transition ${location.pathname.includes('product') || location.pathname.includes('category') || productsOpen ? 'bg-brand-wash text-brand-primary' : 'text-brand-muted hover:text-brand-ink'}`} aria-expanded={productsOpen}>
              Products <FontAwesomeIcon icon={faChevronDown} className={`text-[9px] transition ${productsOpen ? 'rotate-180' : ''}`} />
            </button>

            {productsOpen && (
              <div className="animate-rise absolute left-1/2 top-[calc(100%+16px)] w-[min(680px,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-[1.5rem] border border-brand-border bg-white shadow-[0_35px_90px_-35px_rgba(19,35,58,.35)]">
                <div className="flex items-center justify-between border-b border-brand-border bg-[#fbfaf7] px-6 py-4">
                  <div>
                    <p className="text-xs font-black text-brand-ink">Construction materials</p>
                    <p className="mt-1 text-[11px] text-brand-muted">Browse by supply range</p>
                  </div>
                  <Link to="/all-products" className="inline-flex items-center gap-2 text-xs font-extrabold text-brand-primary">View all <FontAwesomeIcon icon={faArrowRight} /></Link>
                </div>
                <div className="grid grid-cols-2 gap-2 p-3">
                  {categoryList.map((item) => {
                    const image = Array.isArray(item.imageUrl) ? item.imageUrl[0] : item.imageUrl
                    return (
                      <Link key={item._id || item.name} to={getCategoryHref(item)} className="group flex items-center gap-3 rounded-2xl p-3 transition hover:bg-brand-surface">
                        <img src={image || '/images/itc-stone-chips.webp'} alt="" className="h-12 w-12 rounded-xl object-cover" />
                        <span className="text-sm font-extrabold text-brand-ink group-hover:text-brand-primary">{capitalizeWords(item.name)}</span>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {NAV_ITEMS.slice(2).map((item) => (
            <Link key={item.path} to={item.path} className={`rounded-full px-4 py-2 text-[13px] font-bold transition ${isActive(item.path) ? 'bg-brand-wash text-brand-primary' : 'text-brand-muted hover:text-brand-ink'}`}>{item.label}</Link>
          ))}

          {admin?.token && <Link to="/dashboard" className={`rounded-full px-4 py-2 text-[13px] font-bold ${isDashboard ? 'bg-brand-primary text-white' : 'text-brand-primary'}`}>Dashboard</Link>}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/contact?subject=Today%27s%20delivered%20rate" className="hidden min-h-11 items-center rounded-full bg-brand-primary px-5 text-xs font-extrabold text-white shadow-[0_12px_24px_-15px_rgba(23,59,103,.9)] transition hover:-translate-y-0.5 sm:inline-flex">Get today’s rate</Link>
          {admin?.token && isDashboard ? (
            <label htmlFor="dashboard-drawer" className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-brand-border bg-white text-brand-ink lg:hidden" aria-label="Open dashboard menu"><FontAwesomeIcon icon={faBars} /></label>
          ) : (
            <button type="button" onClick={() => setMobileOpen(true)} className="grid h-11 w-11 place-items-center rounded-full border border-brand-border bg-white text-brand-ink lg:hidden" aria-label="Open menu"><FontAwesomeIcon icon={faBars} /></button>
          )}
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-[60] min-h-screen overflow-y-auto bg-[#fbfaf7] px-5 pb-10 pt-5 lg:hidden">
          <div className="mx-auto max-w-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={logo || '/inqcorpLogo.jpeg'} alt="ITC" className="h-12 w-12 rounded-2xl object-contain" />
                <div><p className="font-black text-brand-ink">ITC</p><p className="text-[9px] font-bold uppercase tracking-[.15em] text-brand-muted">Inqilab Trading Corporation</p></div>
              </div>
              <button type="button" onClick={() => setMobileOpen(false)} className="grid h-11 w-11 place-items-center rounded-full border border-brand-border bg-white" aria-label="Close menu"><FontAwesomeIcon icon={faXmark} /></button>
            </div>

            <nav className="mt-10 grid gap-2" aria-label="Mobile navigation">
              {[...NAV_ITEMS.slice(0, 2), { label: 'All Products', path: '/all-products' }, ...NAV_ITEMS.slice(2)].map((item) => (
                <Link key={item.path} to={item.path} className={`flex items-center justify-between rounded-2xl px-5 py-4 text-lg font-black ${isActive(item.path) ? 'bg-brand-primary text-white' : 'border border-brand-border bg-white text-brand-ink'}`}>
                  {item.label}<FontAwesomeIcon icon={faArrowRight} className="text-xs opacity-55" />
                </Link>
              ))}
              {admin?.token && <Link to="/dashboard" className="flex items-center justify-between rounded-2xl border border-brand-border bg-white px-5 py-4 text-lg font-black text-brand-ink">Dashboard <FontAwesomeIcon icon={faArrowRight} className="text-xs" /></Link>}
            </nav>

            <div className="mt-8">
              <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-brand-accent">Material ranges</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {categoryList.map((item) => <Link key={item._id || item.name} to={getCategoryHref(item)} className="feature-pill">{capitalizeWords(item.name)}</Link>)}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

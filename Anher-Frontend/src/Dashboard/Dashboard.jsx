import { useEffect, useMemo, useState } from 'react'
import { Outlet, useLocation, useOutletContext } from 'react-router'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare, faBars } from '@fortawesome/free-solid-svg-icons'
import { Sidebar } from './SideBar/Sidebar'

const TITLES = {
  '/dashboard': ['Overview', 'Live content and enquiries at a glance'],
  '/dashboard/categories': ['Categories', 'Organise the public material ranges'],
  '/dashboard/products': ['Products', 'Manage product details and availability'],
  '/dashboard/queries': ['Enquiries', 'Review customer and project requirements'],
  '/dashboard/banners': ['Public updates', 'Control the live homepage update slider'],
  '/dashboard/catalogue': ['Catalogues', 'Publish direct-view and downloadable files'],
  '/dashboard/live-rates': ['Live Material Rates', 'Full control of the homepage live material-rate ticker'],
  '/dashboard/gallery': ['Gallery', 'Manage public operations photography'],
  '/dashboard/blog': ['Articles', 'Manage published articles'],
  '/dashboard/certificate': ['Certificates', 'Manage company documents'],
  '/dashboard/country': ['Regions', 'Manage regional content'],
  '/dashboard/services': ['Services', 'Manage service content'],
}

export const Dashboard = () => {
  const data = useOutletContext()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const page = useMemo(() => TITLES[location.pathname] || ['Dashboard', 'Manage ITC website content'], [location.pathname])

  useEffect(() => setMenuOpen(false), [location.pathname])

  return (
    <div className="min-h-dvh bg-[#f3f5f7] lg:grid lg:grid-cols-[272px_minmax(0,1fr)]">
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="min-w-0">
        <header className="sticky top-0 z-30 border-b border-[#dde2e8] bg-white/92 backdrop-blur-xl">
          <div className="flex min-h-[72px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <button type="button" onClick={() => setMenuOpen(true)} className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-[#dfe4ea] bg-white text-brand-ink lg:hidden" aria-label="Open dashboard navigation">
                <FontAwesomeIcon icon={faBars} />
              </button>
              <div className="min-w-0">
                <p className="truncate text-base font-black tracking-[-.02em] text-brand-ink sm:text-lg">{page[0]}</p>
                <p className="hidden truncate text-xs text-brand-muted sm:block">{page[1]}</p>
              </div>
            </div>

            <Link to="/" target="_blank" className="inline-flex min-h-10 shrink-0 items-center gap-2 rounded-xl border border-[#dfe4ea] bg-white px-3.5 text-xs font-extrabold text-brand-primary transition hover:border-brand-primary/35 hover:bg-brand-wash sm:px-4">
              View website <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-[10px]" />
            </Link>
          </div>
        </header>

        <main className="min-w-0 overflow-x-clip p-3 sm:p-5 lg:p-7">
          <div className="mx-auto w-full max-w-[1500px]">
            <Outlet context={data} />
          </div>
        </main>
      </div>
    </div>
  )
}

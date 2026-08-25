import { NavLink, useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAward,
  faBookOpen,
  faBoxesStacked,
  faChartLine,
  faGlobe,
  faHouse,
  faLayerGroup,
  faMessage,
  faNewspaper,
  faPhotoFilm,
  faPhotoVideo,
  faRightFromBracket,
  faUserCircle,
  faWandMagicSparkles,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import { removeUser } from '../../Redux/hvac'

const GROUPS = [
  {
    label: 'Workspace',
    items: [
      { to: '/dashboard', label: 'Overview', icon: faHouse, end: true },
      { to: '/dashboard/queries', label: 'Enquiries', icon: faMessage },
    ],
  },
  {
    label: 'Live rates',
    items: [
      { to: '/dashboard/live-rates', label: 'Live Material Rates', icon: faChartLine },
    ],
  },
  {
    label: 'Catalogue',
    items: [
      { to: '/dashboard/products', label: 'Products', icon: faBoxesStacked },
      { to: '/dashboard/categories', label: 'Categories', icon: faLayerGroup },
      { to: '/dashboard/catalogue', label: 'PDF catalogues', icon: faBookOpen },
    ],
  },
  {
    label: 'Website content',
    items: [
      { to: '/dashboard/banners', label: 'Public updates', icon: faPhotoFilm },
      { to: '/dashboard/gallery', label: 'Gallery', icon: faPhotoVideo },
      { to: '/dashboard/services', label: 'Services', icon: faWandMagicSparkles },
      { to: '/dashboard/blog', label: 'Articles', icon: faNewspaper },
      { to: '/dashboard/certificate', label: 'Licenses', icon: faAward },
      { to: '/dashboard/country', label: 'Regions', icon: faGlobe },
    ],
  },
]

const SidebarContent = ({ onClose }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.hvac.users)

  const logout = () => {
    dispatch(removeUser())
    navigate('/')
  }

  return (
    <aside className="flex h-dvh w-[min(86vw,288px)] flex-col overflow-hidden bg-[#101d2f] text-white lg:w-full">
      <div className="flex h-[72px] shrink-0 items-center gap-3 border-b border-white/8 px-4 sm:px-5">
        <img src="/inqcorpLogo.jpeg" alt="ITC" className="h-10 w-10 rounded-xl bg-white object-contain p-1" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-black tracking-[-.02em]">ITC Admin</p>
          <p className="mt-0.5 truncate text-[9px] font-bold uppercase tracking-[.16em] text-white/42">Content workspace</p>
        </div>
        <button type="button" onClick={onClose} className="grid h-9 w-9 place-items-center rounded-lg text-white/60 transition hover:bg-white/8 hover:text-white lg:hidden" aria-label="Close dashboard navigation">
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>

      <nav className="no-scrollbar flex-1 space-y-6 overflow-y-auto px-3 py-5" aria-label="Dashboard navigation">
        {GROUPS.map((group) => (
          <div key={group.label}>
            <p className="mb-2 px-3 text-[9px] font-black uppercase tracking-[.2em] text-white/32">{group.label}</p>
            <div className="space-y-1">
              {group.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={onClose}
                  className={({ isActive }) => `group flex min-h-11 items-center gap-3 rounded-xl px-3 text-[13px] font-bold transition ${isActive ? 'bg-white text-[#101d2f] shadow-[0_12px_30px_-18px_rgba(0,0,0,.7)]' : 'text-white/58 hover:bg-white/7 hover:text-white'}`}
                >
                  {({ isActive }) => (
                    <>
                      <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg text-xs transition ${isActive ? 'bg-[#edf2f7] text-brand-primary' : 'bg-white/6 text-white/46 group-hover:text-white'}`}>
                        <FontAwesomeIcon icon={item.icon} />
                      </span>
                      <span>{item.label}</span>
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}

        <label htmlFor="uploadLogo" className="flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border border-dashed border-white/15 px-3 text-[13px] font-bold text-white/45 transition hover:border-[#c7963c]/55 hover:bg-[#c7963c]/8 hover:text-[#e2bd70]">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/6 text-xs"><FontAwesomeIcon icon={faPhotoVideo} /></span>
          Change logo
        </label>
      </nav>

      <div className="shrink-0 border-t border-white/8 p-3">
        <div className="rounded-2xl bg-white/6 p-3">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#c7963c]/16 text-[#e2bd70]"><FontAwesomeIcon icon={faUserCircle} /></span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-extrabold">{user?.name || 'ITC Administrator'}</p>
              <p className="mt-0.5 truncate text-[10px] text-white/38">{user?.email || 'admin@inqilab.com'}</p>
            </div>
          </div>
          <button type="button" onClick={logout} className="mt-3 flex min-h-9 w-full items-center justify-center gap-2 rounded-xl bg-white/6 text-[10px] font-black uppercase tracking-[.12em] text-white/55 transition hover:bg-red-500/12 hover:text-red-300">
            <FontAwesomeIcon icon={faRightFromBracket} /> Sign out
          </button>
        </div>
      </div>
    </aside>
  )
}

export const Sidebar = ({ open, onClose }) => (
  <>
    <div className="sticky top-0 hidden h-dvh lg:block">
      <SidebarContent onClose={onClose} />
    </div>

    <div className={`fixed inset-0 z-50 transition lg:hidden ${open ? 'pointer-events-auto' : 'pointer-events-none'}`} aria-hidden={!open}>
      <button type="button" className={`absolute inset-0 bg-[#07111f]/60 backdrop-blur-sm transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} aria-label="Close dashboard navigation overlay" />
      <div className={`relative h-full w-fit transition-transform duration-300 ease-out ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <SidebarContent onClose={onClose} />
      </div>
    </div>
  </>
)

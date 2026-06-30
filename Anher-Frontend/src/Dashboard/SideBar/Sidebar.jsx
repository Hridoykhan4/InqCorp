import React from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faXmark,
    faHouse,
    faLayerGroup,
    faBoxesStacked,
    faMessage,
    faNewspaper,
    faAward,
    faBookOpen,
    faGlobe,
    faPhotoFilm,
    faImages,
    faRightFromBracket,
    faUserCircle,
    faTag,
} from '@fortawesome/free-solid-svg-icons'
import { removeUser } from '../../Redux/hvac'

// ─── Colour tokens ───────────────────────────────────────────────────────────
const NAVY      = '#1B3A8A'
const NAVY_DARK = '#0F2257'
const GOLD      = '#C49B2B'

// ─── Nav items ───────────────────────────────────────────────────────────────
const NAV_ITEMS = [
    { to: '/dashboard',            label: 'Dashboard',  icon: faHouse,        exact: true },
    { to: '/dashboard/categories', label: 'Categories', icon: faLayerGroup              },
    { to: '/dashboard/products',   label: 'Products',   icon: faBoxesStacked            },
    { to: '/dashboard/queries',    label: 'Queries',    icon: faMessage                 },
    { to: '/dashboard/banners',    label: 'Banners',    icon: faPhotoFilm               },
    { to: '/dashboard/blog',       label: 'Blog',       icon: faNewspaper               },
    { to: '/dashboard/certificate',label: 'Certificate',icon: faAward                   },
    { to: '/dashboard/catalogue',  label: 'Catalogues', icon: faBookOpen                },
    { to: '/dashboard/country',    label: 'Country',    icon: faGlobe                   },
    { to: '/dashboard/pricelist',  label: 'Price List', icon: faTag                     },
]

// ─── Sidebar inner ────────────────────────────────────────────────────────────
const SidebarInner = () => {
    const location  = useLocation()
    const dispatch  = useDispatch()
    const navigate  = useNavigate()
    const user      = useSelector((state) => state.hvac.users)

    const isActive = (item) =>
        item.exact
            ? location.pathname === item.to
            : location.pathname === item.to

    const handleLogout = () => {
        dispatch(removeUser())
        navigate('/')
    }

    return (
        <aside
            className="flex h-full min-h-screen w-60 flex-col"
            style={{
                background: `linear-gradient(180deg, ${NAVY_DARK} 0%, ${NAVY} 100%)`,
                boxShadow: '4px 0 24px rgba(0,0,0,0.18)',
            }}
        >
            {/* ── Mobile close button ── */}
            <div className="flex items-center justify-between px-4 pt-4 lg:hidden">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/50">
                    Menu
                </p>
                <label
                    htmlFor="dashboard-drawer"
                    className="cursor-pointer rounded-lg p-1.5 text-white/60 transition hover:bg-white/10 hover:text-white"
                >
                    <FontAwesomeIcon icon={faXmark} />
                </label>
            </div>

            {/* ── Brand / Logo ── */}
            <div className="flex flex-col items-center px-4 pb-6 pt-6">
                {/* Logo ring */}
                <div
                    className="mb-3 flex h-16 w-16 items-center justify-center rounded-full p-0.5"
                    style={{
                        background: `linear-gradient(135deg, ${GOLD} 0%, rgba(196,155,43,0.3) 100%)`,
                        boxShadow: `0 0 0 4px rgba(196,155,43,0.15), 0 8px 24px rgba(0,0,0,0.3)`,
                    }}
                >
                    <img
                        src="/inqcorpLogo.jpeg"
                        alt="Kawsar Anher"
                        className="h-14 w-14 rounded-full object-cover"
                    />
                </div>

                <h2 className="text-sm font-extrabold tracking-tight text-white">
                    Kawsar Anher
                </h2>
                <p
                    className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.28em]"
                    style={{ color: GOLD }}
                >
                    Admin Panel
                </p>

                {/* Gold divider */}
                <div
                    className="mt-4 h-px w-3/4"
                    style={{
                        background: `linear-gradient(90deg, transparent, rgba(196,155,43,0.5), transparent)`,
                    }}
                />
            </div>

            {/* ── Nav ── */}
            <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-3 pb-2">
                <p className="mb-1.5 px-2 text-[9px] font-bold uppercase tracking-[0.28em] text-white/30">
                    Navigation
                </p>

                {NAV_ITEMS.map((item) => {
                    const active = isActive(item)
                    return (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.exact}
                            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all"
                            style={({ isActive: navActive }) => ({
                                background: navActive
                                    ? `linear-gradient(90deg, ${GOLD}22, ${GOLD}10)`
                                    : 'transparent',
                                color: navActive ? GOLD : 'rgba(255,255,255,0.55)',
                                borderLeft: navActive ? `3px solid ${GOLD}` : '3px solid transparent',
                            })}
                            onMouseEnter={(e) => {
                                if (!active) {
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                                    e.currentTarget.style.color = 'rgba(255,255,255,0.9)'
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!e.currentTarget.getAttribute('aria-current')) {
                                    e.currentTarget.style.background = ''
                                    e.currentTarget.style.color = ''
                                }
                            }}
                        >
                            {({ isActive: navActive }) => (
                                <>
                                    <span
                                        className="grid h-7 w-7 shrink-0 place-items-center rounded-lg text-xs"
                                        style={{
                                            background: navActive
                                                ? `${GOLD}22`
                                                : 'rgba(255,255,255,0.07)',
                                            color: navActive ? GOLD : 'rgba(255,255,255,0.5)',
                                        }}
                                    >
                                        <FontAwesomeIcon icon={item.icon} />
                                    </span>
                                    <span>{item.label}</span>
                                    {navActive && (
                                        <span
                                            className="ml-auto h-1.5 w-1.5 rounded-full"
                                            style={{ background: GOLD }}
                                        />
                                    )}
                                </>
                            )}
                        </NavLink>
                    )
                })}

                {/* Upload Logo trigger */}
                <label
                    htmlFor="uploadLogo"
                    className="mt-2 flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-2.5 text-sm font-semibold transition-all"
                    style={{
                        borderColor: 'rgba(196,155,43,0.25)',
                        color: 'rgba(255,255,255,0.45)',
                        borderStyle: 'dashed',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = GOLD
                        e.currentTarget.style.color = GOLD
                        e.currentTarget.style.background = `${GOLD}0A`
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(196,155,43,0.25)'
                        e.currentTarget.style.color = 'rgba(255,255,255,0.45)'
                        e.currentTarget.style.background = 'transparent'
                    }}
                >
                    <span
                        className="grid h-7 w-7 shrink-0 place-items-center rounded-lg text-xs"
                        style={{ background: 'rgba(255,255,255,0.06)' }}
                    >
                        <FontAwesomeIcon icon={faImages} />
                    </span>
                    Upload Logo
                </label>
            </nav>

            {/* ── User info + logout ── */}
            <div
                className="mx-3 mb-4 mt-2 rounded-xl p-3"
                style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.08)',
                }}
            >
                <div className="flex items-center gap-2.5">
                    <span
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-sm"
                        style={{ background: `${GOLD}22`, color: GOLD }}
                    >
                        <FontAwesomeIcon icon={faUserCircle} />
                    </span>
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-bold text-white">
                            {user?.name || 'Admin'}
                        </p>
                        <p className="truncate text-[10px] text-white/40">
                            {user?.email || 'admin@inqilab.com'}
                        </p>
                    </div>
                </div>

                <button
                    onClick={handleLogout}
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg py-2 text-xs font-bold uppercase tracking-wider transition-all"
                    style={{ color: 'rgba(255,255,255,0.45)', background: 'rgba(255,255,255,0.04)' }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(220,38,38,0.15)'
                        e.currentTarget.style.color = '#f87171'
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                        e.currentTarget.style.color = 'rgba(255,255,255,0.45)'
                    }}
                >
                    <FontAwesomeIcon icon={faRightFromBracket} className="text-xs" />
                    Sign Out
                </button>
            </div>
        </aside>
    )
}

// ─── Exported Sidebar with daisyUI drawer ─────────────────────────────────────
export const Sidebar = () => {
    return (
        <div className="drawer drawer-end z-30 w-auto sticky top-0 lg:drawer-open">
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-side z-40">
                <label
                    htmlFor="dashboard-drawer"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                />
                <SidebarInner />
            </div>
        </div>
    )
}

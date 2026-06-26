import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { NavLink, useLocation } from 'react-router'
import {
    faHouse,
    faLayerGroup,
    faBoxesStacked,
    faMessage,
    faImages,
    faNewspaper,
    faAward,
    faBookOpen,
    faGlobe,
    faPhotoFilm,
} from '@fortawesome/free-solid-svg-icons'

const NAV_ITEMS = [
    { to: '/dashboard', label: 'Home', icon: faHouse, exact: true },
    { to: '/dashboard/categories', label: 'Categories', icon: faLayerGroup },
    { to: '/dashboard/products', label: 'Products', icon: faBoxesStacked },
    { to: '/dashboard/queries', label: 'Queries', icon: faMessage },
    { to: '/dashboard/banners', label: 'Banners', icon: faPhotoFilm },
    { to: '/dashboard/blog', label: 'Blog', icon: faNewspaper },
    { to: '/dashboard/certificate', label: 'Certificate', icon: faAward },
    { to: '/dashboard/catalogue', label: 'Catalogues', icon: faBookOpen },
    { to: '/dashboard/country', label: 'Country', icon: faGlobe },
]

export const Sidebar = () => {
    const location = useLocation()

    const isActive = (item) =>
        item.exact ? location.pathname === item.to : location.pathname === item.to

    return (
        <div className='drawer drawer-end z-30 w-auto sticky top-0 lg:drawer-open'>
            <input id='dashboard-drawer' type='checkbox' className='drawer-toggle' />
            <div className='drawer-side z-40'>
                <label
                    htmlFor='dashboard-drawer'
                    aria-label='close sidebar'
                    className='drawer-overlay'
                />
                <aside className='flex h-full min-h-screen w-60 flex-col gap-1 bg-white p-3 shadow-md'>
                    <div className='flex items-center justify-between px-2 pb-3 lg:hidden'>
                        <p className='text-sm font-bold text-safety-ink'>Dashboard</p>
                        <label
                            htmlFor='dashboard-drawer'
                            className='cursor-pointer text-safety-red'
                        >
                            <FontAwesomeIcon icon={faXmark} size='lg' />
                        </label>
                    </div>

                    <p className='hidden px-2 pb-2 text-xs font-bold uppercase tracking-[0.18em] text-safety-muted lg:block'>
                        Admin Panel
                    </p>

                    <nav className='flex flex-1 flex-col gap-1 overflow-y-auto'>
                        {NAV_ITEMS.map((item) => {
                            const active = isActive(item)
                            return (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    end={item.exact}
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
                                        active
                                            ? 'bg-safety-red text-white shadow-sm'
                                            : 'text-safety-ink hover:bg-red-50 hover:text-safety-red'
                                    }`}
                                >
                                    <FontAwesomeIcon
                                        icon={item.icon}
                                        className={`text-sm ${active ? 'text-white' : 'text-safety-red'}`}
                                    />
                                    <span>{item.label}</span>
                                </NavLink>
                            )
                        })}

                        <label
                            htmlFor='uploadLogo'
                            className='mt-2 flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-safety-border px-3 py-2.5 text-sm font-semibold text-safety-ink hover:border-safety-red hover:text-safety-red'
                        >
                            <FontAwesomeIcon icon={faImages} className='text-safety-red' />
                            Upload Logo
                        </label>
                    </nav>
                </aside>
            </div>
        </div>
    )
}

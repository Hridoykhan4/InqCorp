import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faPlus, faTimes, faSearch, faDownload, faTag, faSliders } from '@fortawesome/free-solid-svg-icons'
import { useLocation, useOutletContext } from 'react-router-dom'
import { capitalizeWords } from '../Functions/functions'
import { ProductUpload } from '../Dashboard/FileUpload/ProductUpload'
import { ProductCard } from '../Product Card/ProductCard'
import { Searching } from '../Searching/Searching'
import { SeoManager } from '../SEO/SeoManager'
import AOS from 'aos'
import 'aos/dist/aos.css'
import CountUp from 'react-countup'
import axios from 'axios'
import Swal from 'sweetalert2'
import { EXTERNAL_CATEGORY_LINKS, getCategoryHref } from '../config/navigation'

const SORT_OPTIONS = [
    { value: 'name-asc', label: 'Name (A → Z)' },
    { value: 'name-desc', label: 'Name (Z → A)' },
    { value: 'createdAt-desc', label: 'Newest First' },
    { value: 'createdAt-asc', label: 'Oldest First' },
    { value: 'category-asc', label: 'Category (A → Z)' },
]

export const AllProducts = () => {
    const [limit, setLimit] = useState(12)
    const { products, categories, setProducts } = useOutletContext()
    const [categoryFilter, setCategoryFilter] = useState([])
    const [search, setSearch] = useState('')
    const [showFilter, setShowFilter] = useState(false)
    const [sortBy, setSortBy] = useState('name-asc')
    const [selectedProducts, setSelectedProducts] = useState([])
    const [debouncedSearch, setDebouncedSearch] = useState('')
    const location = useLocation()
    const isDashboard = location.pathname.startsWith('/dashboard')

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(search), 250)
        return () => clearTimeout(timer)
    }, [search])

    useEffect(() => {
        AOS.init({ duration: 600, once: true })
    }, [])

    useEffect(() => {
        if (showFilter) {
            const prev = document.body.style.overflow
            document.body.style.overflow = 'hidden'
            return () => { document.body.style.overflow = prev }
        }
    }, [showFilter])

    useEffect(() => {
        setLimit(12)
    }, [debouncedSearch, categoryFilter, sortBy])

    const filterProducts = useMemo(() => {
        if (!products) return []
        const q = debouncedSearch.trim().toLowerCase()
        const keys = ['model', 'category', 'name', 'description']

        let out = products.filter((item) => {
            const matchesSearch = q
                ? keys.some((k) => item?.[k]?.toString().toLowerCase().includes(q))
                : true
            const matchesCategory = categoryFilter.length > 0
                ? categoryFilter.includes((item?.category || '').toLowerCase())
                : true
            return matchesSearch && matchesCategory
        })

        const [field, dir] = sortBy.split('-')
        out.sort((a, b) => {
            let av = a?.[field]
            let bv = b?.[field]
            if (field === 'createdAt') {
                av = new Date(av || 0).getTime()
                bv = new Date(bv || 0).getTime()
            } else {
                av = (av || '').toString().toLowerCase()
                bv = (bv || '').toString().toLowerCase()
            }
            if (av < bv) return dir === 'asc' ? -1 : 1
            if (av > bv) return dir === 'asc' ? 1 : -1
            return 0
        })

        return out
    }, [products, debouncedSearch, categoryFilter, sortBy])

    const handleCategoryChange = useCallback((category, checked) => {
        const v = (category || '').toLowerCase()
        setCategoryFilter((prev) =>
            checked ? [...prev, v] : prev.filter((c) => c !== v)
        )
    }, [])

    const clearAllFilters = useCallback(() => {
        setCategoryFilter([])
        setSearch('')
        setSortBy('name-asc')
        setSelectedProducts([])
    }, [])

    const handleBulkDelete = async () => {
        if (selectedProducts.length === 0) return
        const result = await Swal.fire({
            title: `Delete ${selectedProducts.length} product${selectedProducts.length > 1 ? 's' : ''}?`,
            text: 'This action cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete',
        })
        if (!result.isConfirmed) return
        try {
            await Promise.all(
                selectedProducts.map((id) =>
                    axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/deleteProduct`, { data: { id } })
                )
            )
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getProducts`)
            setProducts(response.data?.data || response.data)
            setSelectedProducts([])
            Swal.fire('Deleted', 'Selected products removed.', 'success')
        } catch (error) {
            Swal.fire('Error', error?.response?.data?.message || error.message, 'error')
        }
    }

    const exportProducts = () => {
        const dataStr = JSON.stringify(filterProducts.slice(0, limit), null, 2)
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)
        const link = document.createElement('a')
        link.setAttribute('href', dataUri)
        link.setAttribute('download', 'products-export.json')
        link.click()
    }

    const activeFiltersCount = useMemo(() => {
        let n = 0
        if (categoryFilter.length > 0) n++
        if (debouncedSearch) n++
        return n
    }, [categoryFilter, debouncedSearch])

    const categoryBuckets = useMemo(() => {
        const map = new Map()
        ;(categories || []).forEach((c) => map.set((c?.name || '').toLowerCase(), { name: c?.name, count: 0 }))
        ;(products || []).forEach((p) => {
            const key = (p?.category || '').toLowerCase()
            if (map.has(key)) map.get(key).count += 1
        })
        return Array.from(map.values()).filter((c) => c.name)
    }, [categories, products])

    const FilterPanel = ({ inDrawer = false }) => (
        <div className={`${inDrawer ? '' : 'sticky top-24'} space-y-5 rounded-2xl border border-safety-border bg-white p-5 shadow-sm`}>
            <div className='flex items-center justify-between'>
                <h3 className='text-base font-bold text-safety-ink'>
                    <FontAwesomeIcon icon={faFilter} className='mr-2 text-safety-red' />
                    Filters
                    {activeFiltersCount > 0 && (
                        <span className='ml-2 rounded-full bg-safety-red px-2 py-0.5 text-xs text-white'>
                            {activeFiltersCount}
                        </span>
                    )}
                </h3>
                {activeFiltersCount > 0 && (
                    <button onClick={clearAllFilters} className='text-xs font-semibold text-safety-red hover:underline'>
                        Clear All
                    </button>
                )}
            </div>

            <div>
                <h4 className='mb-3 text-sm font-semibold text-safety-ink'>
                    <FontAwesomeIcon icon={faTag} className='mr-2 text-safety-muted' />
                    Categories
                </h4>
                <div className='space-y-1  overflow-y-auto no-scrollbar pr-1'>
                    {categoryBuckets.length === 0 && (
                        <p className='text-xs text-safety-muted'>No categories yet.</p>
                    )}
                    {categoryBuckets.map((c) => {
                        const value = c.name.toLowerCase()
                        const checked = categoryFilter.includes(value)
                        return (
                            <label
                                key={value}
                                className={`flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm transition ${
                                    checked ? 'bg-red-50 text-safety-red' : 'hover:bg-safety-surface text-safety-ink'
                                }`}
                            >
                                <span className='flex items-center gap-2'>
                                    <input
                                        type='checkbox'
                                        checked={checked}
                                        onChange={(e) => handleCategoryChange(c.name, e.target.checked)}
                                        className='checkbox checkbox-xs checkbox-error'
                                    />
                                    {capitalizeWords(c.name)}
                                </span>
                                <span className='text-xs text-safety-muted'>{c.count}</span>
                            </label>
                        )
                    })}
                </div>
            </div>

            <div>
                <h4 className='mb-2 text-sm font-semibold text-safety-ink'>Sort By</h4>
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className='select select-bordered select-sm w-full'
                >
                    {SORT_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                </select>
            </div>
        </div>
    )

    return (
        <section className='w-full py-4 sm:py-8'>
            {!isDashboard && (
                <SeoManager
                    title='All Safety Products - Safety Plus'
                    description='Browse our complete catalogue of professional fire safety and industrial products.'
                    path='/all-products'
                    keywords='safety products, fire safety equipment, industrial safety, safety catalogue, Bangladesh safety products'
                />
            )}

            {!isDashboard && (
                <div
                    className='container-page mb-6 sm:mb-8'
                    data-aos='fade-up'
                ><div className='rounded-2xl border border-safety-border bg-white/90 px-4 py-5 shadow-sm backdrop-blur-xl sm:px-6 sm:py-8'>
                    <div className='flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6'>
                        <div className='max-w-2xl'>
                            <p className='section-tagline text-[11px] sm:text-sm'>Complete Product Catalogue</p>
                            <h1 className='mt-1.5 text-2xl font-extrabold leading-tight text-safety-ink sm:mt-2 sm:text-4xl md:text-5xl'>
                                Professional Safety Equipment & Industrial Solutions
                            </h1>
                            <p className='mt-2 text-sm text-safety-muted sm:mt-3 sm:text-base sm:leading-7'>
                                Filter by category, search by model, and request a quote.
                            </p>
                        </div>
                        <div className='inline-flex shrink-0 items-center gap-3 self-start rounded-xl bg-safety-red/10 px-4 py-2.5 sm:gap-4 sm:px-5 sm:py-4'>
                            <span className='text-[10px] font-semibold uppercase tracking-[0.18em] text-safety-red sm:text-[11px]'>
                                Available
                            </span>
                            <span className='text-2xl font-extrabold leading-none text-safety-ink sm:text-3xl'>
                                <CountUp end={filterProducts?.length ?? 0} duration={1.2} />
                            </span>
                        </div>
                    </div>

                    <div className='mt-4 flex flex-nowrap items-center gap-2 overflow-x-auto no-scrollbar mask-fade-r pb-1 sm:mt-6 sm:flex-wrap'>
                        <button
                            type='button'
                            onClick={() => setCategoryFilter([])}
                            className={
                                categoryFilter.length === 0
                                    ? 'feature-pill border-safety-red bg-safety-red/10 text-safety-red'
                                    : 'feature-pill'
                            }
                        >
                            All ({products?.length || 0})
                        </button>
                        {categoryBuckets.slice(0, 8).map((c) => {
                            const value = c.name.toLowerCase()
                            const active = categoryFilter.includes(value)
                            return (
                                <button
                                    key={value}
                                    type='button'
                                    onClick={() => handleCategoryChange(c.name, !active)}
                                    className={
                                        active
                                            ? 'feature-pill border-safety-red bg-safety-red/10 text-safety-red'
                                            : 'feature-pill'
                                    }
                                >
                                    {capitalizeWords(c.name)} ({c.count})
                                </button>
                            )
                        })}
                        {EXTERNAL_CATEGORY_LINKS.map((item) => (
                            <a
                                key={item._id}
                                href={getCategoryHref(item)}
                                className='feature-pill'
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>
                </div>
                </div>
            )}

            <div data-aos='fade-in'>
                <Searching search={search} setSearch={setSearch} />
            </div>

            <div
                className={`${isDashboard ? 'w-full px-3' : 'container-page'} mb-12 space-y-4 sm:mb-16`}
                data-aos='fade-up'
                data-aos-delay='150'
            >
                {isDashboard && (
                    <div className='flex flex-wrap items-center justify-between gap-3 rounded-xl border border-safety-border bg-white p-3 shadow-sm'>
                        <div className='flex flex-wrap gap-2'>
                            <label htmlFor='my_modal_4' className='btn btn-primary btn-sm'>
                                <FontAwesomeIcon icon={faPlus} className='mr-1' />
                                Add Product
                            </label>
                            {selectedProducts.length > 0 && (
                                <button onClick={handleBulkDelete} className='btn btn-error btn-sm'>
                                    <FontAwesomeIcon icon={faTimes} className='mr-1' />
                                    Delete ({selectedProducts.length})
                                </button>
                            )}
                        </div>
                        <button onClick={exportProducts} className='btn btn-outline btn-sm'>
                            <FontAwesomeIcon icon={faDownload} className='mr-1' />
                            Export
                        </button>
                    </div>
                )}

                <div className='flex flex-col gap-6 lg:flex-row'>
                    <aside className='hidden w-72 shrink-0 lg:block'>
                        <FilterPanel />
                    </aside>

                    <div className='min-w-0 flex-1'>
                        <div className='mb-3 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-safety-border bg-white px-3 py-2 shadow-sm sm:mb-4 sm:gap-3 sm:px-4 sm:py-3'>
                            <div className='flex items-center gap-3'>
                                <button
                                    onClick={() => setShowFilter(true)}
                                    className='btn btn-sm btn-outline lg:hidden'
                                >
                                    <FontAwesomeIcon icon={faSliders} className='mr-1' />
                                    Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
                                </button>
                                <span className='text-sm font-medium text-safety-ink'>
                                    {filterProducts.length}
                                    <span className='text-safety-muted'> result{filterProducts.length !== 1 ? 's' : ''}</span>
                                </span>
                            </div>

                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className='select select-bordered select-sm hidden sm:inline-flex'
                            >
                                {SORT_OPTIONS.map((o) => (
                                    <option key={o.value} value={o.value}>{o.label}</option>
                                ))}
                            </select>
                        </div>

                        {showFilter && createPortal(
                            <div className='fixed inset-0 z-[200] lg:hidden animate-fade' role='dialog' aria-modal='true'>
                                <div
                                    className='absolute inset-0 bg-safety-ink/55 backdrop-blur-sm'
                                    onClick={() => setShowFilter(false)}
                                />
                                <div className='absolute inset-x-0 bottom-0 flex max-h-[88vh] flex-col rounded-t-3xl bg-white shadow-2xl animate-rise'>
                                    <div className='shrink-0 px-5 pt-4'>
                                        <div className='mx-auto mb-3 h-1.5 w-12 rounded-full bg-safety-border' />
                                        <div className='flex items-center justify-between'>
                                            <h3 className='text-base font-bold text-safety-ink'>Filters</h3>
                                            <button
                                                onClick={() => setShowFilter(false)}
                                                aria-label='Close filters'
                                                className='grid h-9 w-9 place-items-center rounded-full text-safety-muted transition hover:bg-safety-surface hover:text-safety-red'
                                            >
                                                <FontAwesomeIcon icon={faTimes} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className='min-h-0 flex-1 overflow-y-auto no-scrollbar px-5 py-3'>
                                        <FilterPanel inDrawer />
                                    </div>
                                    <div className='shrink-0 border-t border-safety-border bg-white p-4'>
                                        <button
                                            onClick={() => setShowFilter(false)}
                                            className='btn-brand w-full'
                                        >
                                            Show {filterProducts.length} result{filterProducts.length !== 1 ? 's' : ''}
                                        </button>
                                    </div>
                                </div>
                            </div>,
                            document.body
                        )}

                        {!products ? (
                            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3'>
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <div key={i} className='skeleton h-72 w-full rounded-2xl' />
                                ))}
                            </div>
                        ) : filterProducts.length > 0 ? (
                            <>
                                <div className='grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3'>
                                    {filterProducts.slice(0, limit).map((item, index) => (
                                        <ProductCard
                                            key={item._id || index}
                                            item={item}
                                            isSelected={selectedProducts.includes(item._id)}
                                            onSelect={(selected) =>
                                                setSelectedProducts((prev) =>
                                                    selected ? [...prev, item._id] : prev.filter((id) => id !== item._id)
                                                )
                                            }
                                        />
                                    ))}
                                </div>

                                {limit < filterProducts.length && (
                                    <div className='mt-8 text-center'>
                                        <button
                                            onClick={() => setLimit((prev) => prev + 12)}
                                            className='btn btn-primary'
                                        >
                                            Load More
                                            <FontAwesomeIcon icon={faPlus} className='ml-2' />
                                        </button>
                                        <p className='mt-2 text-xs text-safety-muted'>
                                            Showing {Math.min(limit, filterProducts.length)} of {filterProducts.length}
                                        </p>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className='rounded-2xl border border-dashed border-safety-border bg-white py-16 text-center'>
                                <FontAwesomeIcon icon={faSearch} className='text-5xl text-safety-border' />
                                <h3 className='mt-4 text-lg font-bold text-safety-ink'>No Products Found</h3>
                                <p className='mt-1 text-sm text-safety-muted'>
                                    Try clearing filters or adjusting your search.
                                </p>
                                <button onClick={clearAllFilters} className='btn btn-primary btn-sm mt-4'>
                                    Clear Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <ProductUpload />
        </section>
    )
}

export default AllProducts

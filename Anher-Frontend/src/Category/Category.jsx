import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useOutletContext, useParams } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong, faSearch } from '@fortawesome/free-solid-svg-icons'
import { DynamicBanner } from '../Dynamic Banner/DynamicBanner'
import { capitalizeWords, urlReverter } from '../Functions/functions'
import { ProductCard } from '../Product Card/ProductCard'
import { Searching } from '../Searching/Searching'
import { SeoManager } from '../SEO/SeoManager'

export const Category = () => {
  const { categoryName } = useParams()
  const category = urlReverter(categoryName)
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const navigate = useNavigate()

  const { products, categories } = useOutletContext()

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 200)
    return () => clearTimeout(t)
  }, [search])

  const filterProducts = useMemo(() => {
    if (!products) return null
    const cat = (category || '').toLowerCase()
    const q = debouncedSearch.trim().toLowerCase()
    return products.filter((p) => {
      const matchCat = (p?.category || '').toLowerCase() === cat
      if (!matchCat) return false
      if (!q) return true
      return ['model', 'name', 'description']
        .some((k) => (p?.[k] || '').toString().toLowerCase().includes(q))
    })
  }, [products, category, debouncedSearch])

  const categoryItem = useMemo(() => {
    if (!categories) return null
    return categories.find(
      (c) => (c?.name || '').toLowerCase() === (category || '').toLowerCase()
    )
  }, [categories, category])

  const totalInCategory = useMemo(() => {
    if (!products) return 0
    return products.filter(
      (p) => (p?.category || '').toLowerCase() === (category || '').toLowerCase()
    ).length
  }, [products, category])

  return (
    <div className='space-y-8 sm:space-y-10'>
      <SeoManager
        title={category ? `${category} Products` : 'Product Category'}
        description={
          category
            ? `Browse ${category} products from SafetyPlus and explore models, specifications and quotes.`
            : 'Browse SafetyPlus products by category.'
        }
        keywords={
          category
            ? `${category}, ${category} products, SafetyPlus, fire safety Bangladesh`
            : 'SafetyPlus categories, fire safety products'
        }
      />

      <DynamicBanner item={categoryItem} />

      <div className='mx-auto max-w-[1340px] px-4 sm:px-6'>
        <div className='hero-panel'>
          <div className='flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between'>
            <div className='max-w-2xl'>
              <button
                type='button'
                onClick={() => navigate('/all-products')}
                className='inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-safety-red hover:underline'
              >
                <FontAwesomeIcon icon={faArrowLeftLong} className='text-[10px]' />
                All Products
              </button>
              <h1 className='heading-xl mt-2'>
                {capitalizeWords(category) || 'Category'}
              </h1>
              <p className='body-lead mt-3'>
                {totalInCategory} product{totalInCategory !== 1 ? 's' : ''} available in this category. Filter, compare, and request a quote tailored to your project.
              </p>
            </div>
            <div className='inline-flex items-center gap-4 rounded-2xl bg-safety-red/10 px-5 py-4'>
              <span className='block text-[11px] font-semibold uppercase tracking-[0.2em] text-safety-red'>
                In Stock
              </span>
              <span className='block text-3xl font-extrabold leading-none text-safety-ink'>
                {totalInCategory}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className='mx-auto max-w-[1340px] px-4 sm:px-6'>
        <Searching search={search} setSearch={setSearch} />
      </div>

      <div className='mx-auto max-w-[1340px] px-4 pb-16 sm:px-6'>
        {!filterProducts ? (
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3'>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className='skeleton h-72 w-full rounded-2xl' />
            ))}
          </div>
        ) : filterProducts.length > 0 ? (
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3'>
            {filterProducts.map((item, i) => (
              <ProductCard key={item._id || i} item={item} />
            ))}
          </div>
        ) : (
          <div className='rounded-2xl border border-dashed border-safety-border bg-white py-16 text-center'>
            <FontAwesomeIcon icon={faSearch} className='text-5xl text-safety-border' />
            <h3 className='mt-4 text-lg font-bold text-safety-ink'>
              {debouncedSearch ? 'No matching products' : 'Nothing here yet'}
            </h3>
            <p className='mt-1 text-sm text-safety-muted'>
              {debouncedSearch
                ? 'Try a different keyword or browse the full catalogue.'
                : 'Products in this category will appear here.'}
            </p>
            <button
              type='button'
              onClick={() => navigate('/all-products')}
              className='btn btn-primary btn-sm mt-4'
            >
              Browse All Products
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

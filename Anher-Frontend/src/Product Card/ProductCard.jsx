import { useLocation, useNavigate, useOutletContext } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import { capitalizeWords } from '../Functions/functions'
import { ProductUpdate } from '../Dashboard/Update/ProductUpdate'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faShieldHalved,
  faTrash,
  faPenToSquare,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons'

const FALLBACK_IMG =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png'

export const ProductCard = ({ item, isSelected = false, onSelect }) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [imgFail, setImgFail] = useState(false)
  const { setProducts } = useOutletContext()
  const location = useLocation()
  const isDashboard = location.pathname.startsWith('/dashboard')

  const handleDelete = (e) => {
    e?.stopPropagation?.()
    if (!item) {
      Swal.fire('Nothing to delete', '', 'info')
      return
    }
    Swal.fire({
      title: `Delete ${item?.name || item?.model}?`,
      text: 'This cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      confirmButtonColor: '#d33',
    }).then((result) => {
      if (!result.isConfirmed) return
      setLoading(true)
      axios
        .delete(`${import.meta.env.VITE_BACKEND_URL}/api/deleteProduct`, {
          data: { id: item._id },
        })
        .then((res) => {
          Swal.fire('Deleted', `${item?.name || item?.model} removed.`, 'success')
          setProducts(res.data.data)
        })
        .catch((error) => {
          Swal.fire(
            'Error',
            error?.response?.data?.message || error.message,
            'error'
          )
        })
        .finally(() => setLoading(false))
    })
  }

  const goToDetails = () => {
    if (isDashboard || loading) return
    if (item?.model) navigate(`/products/${item.model}`)
  }

  const imageSrc = imgFail
    ? FALLBACK_IMG
    : item?.imageUrl?.[0] || FALLBACK_IMG

  // Product NAME is the hero. Model is shown as a quiet SKU only when it
  // differs from the title (so we never repeat the same string twice).
  const title = capitalizeWords(item?.name || item?.model || 'Safety Product')
  const sku = item?.name && item?.model ? String(item.model).toUpperCase() : null

  return (
    <>
      <article
        onClick={goToDetails}
        onKeyDown={(e) => {
          if (!isDashboard && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault()
            goToDetails()
          }
        }}
        role={isDashboard ? undefined : 'link'}
        tabIndex={isDashboard ? -1 : 0}
        aria-label={item?.name || item?.model || 'Product'}
        className={`group relative flex h-full ${
          isDashboard ? 'cursor-default' : 'cursor-pointer'
        } flex-col overflow-hidden rounded-2xl border border-safety-border bg-white shadow-sm transition duration-500 hover:-translate-y-1.5 hover:border-safety-red/40 hover:shadow-[0_24px_60px_-20px_rgba(185,28,28,0.3)] focus:outline-none focus-visible:ring-2 focus-visible:ring-safety-red focus-visible:ring-offset-2 ${
          isSelected ? 'ring-2 ring-safety-red ring-offset-2' : ''
        }`}
      >
        <span className='absolute inset-x-0 top-0 z-10 h-1 origin-left scale-x-0 bg-gradient-to-r from-safety-red to-safety-amber transition-transform duration-500 group-hover:scale-x-100' />

        <div className='relative aspect-square w-full overflow-hidden bg-gradient-to-br from-safety-surface via-white to-safety-surface'>
          <img
            src={imageSrc}
            onError={() => setImgFail(true)}
            alt={item?.name || item?.model || 'SafetyPlus product'}
            loading='lazy'
            draggable='false'
            className='h-full w-full object-contain p-5 transition duration-[800ms] ease-out group-hover:scale-[1.12] group-hover:-rotate-1'
          />

          {/* Diagonal shine sweep on hover — premium showcase feel */}
          <span className='pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.55),transparent)] transition-transform duration-700 ease-out group-hover:translate-x-full' />

          {item?.category && (
            <span className='absolute left-2 top-2 inline-flex max-w-[calc(100%-1rem)] items-center gap-1 rounded-full border border-white/60 bg-white/85 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-safety-red shadow-sm backdrop-blur-md sm:left-3 sm:top-3 sm:gap-1.5 sm:px-2.5 sm:py-1 sm:text-[10px] sm:tracking-[0.16em]'>
              <FontAwesomeIcon icon={faShieldHalved} className='shrink-0 text-[8px] sm:text-[9px]' />
              <span className='truncate'>{capitalizeWords(item.category)}</span>
            </span>
          )}

          {/* Floating action — appears on hover, signals it's clickable */}
          {!isDashboard && (
            <span className='absolute bottom-3 right-3 grid h-10 w-10 translate-y-3 place-items-center rounded-full bg-safety-red text-white opacity-0 shadow-lg transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100'>
              <FontAwesomeIcon icon={faArrowRight} className='text-sm' />
            </span>
          )}
        </div>

        <div className='flex flex-1 flex-col border-t border-safety-border/60 p-3.5 sm:p-4'>
          <h3 className='line-clamp-2 min-h-[2.6rem] text-[15px] font-extrabold leading-snug tracking-tight text-safety-ink transition-colors duration-300 group-hover:text-safety-red sm:min-h-[3rem] sm:text-base md:text-lg'>
            {title}
          </h3>

          <div className='mt-auto flex items-center justify-between gap-2 pt-2.5'>
            {sku ? (
              <span className='inline-flex items-center rounded-md bg-safety-surface px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider text-safety-muted sm:text-[11px]'>
                {sku}
              </span>
            ) : (
              <span />
            )}

            {!isDashboard && (
              <span className='inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.14em] text-safety-muted transition-colors duration-300 group-hover:text-safety-red sm:text-xs'>
                View
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className='text-[10px] transition-transform duration-300 group-hover:translate-x-0.5'
                />
              </span>
            )}
          </div>
        </div>

        {isDashboard && (
          <div
            className='flex flex-wrap items-center justify-between gap-2 border-t border-safety-border bg-safety-surface/60 px-3 py-2.5'
            onClick={(e) => e.stopPropagation()}
          >
            <label className='inline-flex items-center gap-2 text-xs font-semibold text-safety-ink'>
              <input
                type='checkbox'
                checked={isSelected}
                onChange={(e) => onSelect?.(e.target.checked)}
                className='checkbox checkbox-error checkbox-xs'
              />
              Select
            </label>
            <div className='flex flex-wrap gap-1.5'>
              <label
                htmlFor={`ProductUpdate-${item?._id}`}
                className='inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-safety-border bg-white px-3 py-1.5 text-xs font-semibold text-safety-ink transition hover:border-safety-red hover:text-safety-red'
              >
                <FontAwesomeIcon icon={faPenToSquare} className='text-[10px]' />
                Update
              </label>
              <button
                type='button'
                onClick={handleDelete}
                disabled={loading}
                className='inline-flex items-center gap-1.5 rounded-md bg-safety-red px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-safety-red-dark disabled:opacity-60'
              >
                <FontAwesomeIcon icon={faTrash} className='text-[10px]' />
                {loading ? 'Deleting' : 'Delete'}
              </button>
            </div>
          </div>
        )}
      </article>

      <ProductUpdate item={item} />
    </>
  )
}

import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import Swal from 'sweetalert2'
import { CountryUpload } from '../FileUpload/CountryUpload'

export const DashboardCountry = () => {
  const { country = [], setCountry } = useOutletContext() || {}
  const [loading, setLoading] = useState(null)

  const handleDelete = async (item) => {
    const confirmation = await Swal.fire({ title: `Delete “${item?.name || 'region'}”?`, icon: 'warning', showCancelButton: true, confirmButtonText: 'Delete', confirmButtonColor: '#b42318' })
    if (!confirmation.isConfirmed) return
    setLoading(item._id)
    try {
      const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/deleteCountry`, { data: { id: item._id } })
      setCountry(response.data.data)
      Swal.fire({ title: 'Region removed', icon: 'success', timer: 1200, showConfirmButton: false })
    } catch (error) {
      Swal.fire('Could not delete', error?.response?.data?.message || error.message, 'error')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-brand-border bg-white p-4 shadow-sm sm:p-5">
        <div><p className="text-[10px] font-black uppercase tracking-[.18em] text-brand-accent">Regional content</p><p className="mt-1 text-sm font-bold text-brand-ink">{country.length} region item{country.length === 1 ? '' : 's'} stored</p></div>
        <label htmlFor="uploadCountry" className="inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-xl bg-brand-primary px-4 text-xs font-extrabold text-white"><FontAwesomeIcon icon={faPlus} /> Add region</label>
      </div>

      {!country.length ? (
        <div className="grid min-h-[320px] place-items-center rounded-2xl border border-dashed border-brand-border bg-white text-center"><div><FontAwesomeIcon icon={faGlobe} className="text-4xl text-brand-border" /><p className="mt-4 font-black text-brand-ink">No regional media added</p></div></div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
          {country.map((item, index) => {
            const image = Array.isArray(item?.imageUrl) ? item.imageUrl[0] : item?.imageUrl
            return (
              <article key={item?._id || index} className={`overflow-hidden rounded-2xl border border-brand-border bg-white p-3 shadow-sm ${loading === item?._id ? 'opacity-45' : ''}`}>
                <img src={image} className="aspect-[4/3] w-full rounded-xl bg-brand-surface object-cover" alt={item?.name || 'Region'} />
                <div className="mt-3 flex items-center justify-between gap-3"><p className="truncate text-xs font-black text-brand-ink">{item?.name || 'Region'}</p><button type="button" onClick={() => handleDelete(item)} disabled={Boolean(loading)} className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-red-50 text-[10px] text-red-700" aria-label={`Delete ${item?.name || 'region'}`}><FontAwesomeIcon icon={faTrash} /></button></div>
              </article>
            )
          })}
        </div>
      )}

      <CountryUpload />
    </div>
  )
}

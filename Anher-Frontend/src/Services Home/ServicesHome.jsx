import { useOutletContext } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faPlus, faTrash, faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons'
import parse from 'html-react-parser'
import axios from 'axios'
import Swal from 'sweetalert2'
import { AddService } from './New Service Modal/AddService'
import { ServiceUpdate } from '../Dashboard/Update/ServiceUpdate'

const serviceIcon = (value) => {
  if (!value) return <FontAwesomeIcon icon={faWandMagicSparkles} />
  return parse(value.trim(), {
    replace: (node) => {
      if (node.type === 'tag' && node.name === 'svg') {
        const attributes = { ...(node.attribs || {}) }
        delete attributes.width
        delete attributes.height
        node.attribs = { ...attributes, className: 'h-7 w-7', fill: 'currentColor' }
      }
    },
  })
}

export const ServicesHome = () => {
  const { services = [], setServices } = useOutletContext() || {}

  const handleDelete = async (item) => {
    const confirmation = await Swal.fire({ title: `Delete “${item?.serviceName || 'service'}”?`, icon: 'warning', showCancelButton: true, confirmButtonText: 'Delete', confirmButtonColor: '#b42318' })
    if (!confirmation.isConfirmed) return
    try {
      const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/deleteService`, { data: { id: item._id } })
      setServices(response.data.data)
      Swal.fire({ title: 'Service deleted', icon: 'success', timer: 1200, showConfirmButton: false })
    } catch (error) {
      Swal.fire('Could not delete', error?.response?.data?.message || error.message, 'error')
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-brand-border bg-white p-4 shadow-sm sm:p-5">
        <div><p className="text-[10px] font-black uppercase tracking-[.18em] text-brand-accent">Capability content</p><p className="mt-1 text-sm font-bold text-brand-ink">{services.length} service{services.length === 1 ? '' : 's'} stored</p></div>
        <label htmlFor="AddService" className="inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-xl bg-brand-primary px-4 text-xs font-extrabold text-white"><FontAwesomeIcon icon={faPlus} /> Add service</label>
      </div>

      {!services.length ? (
        <div className="grid min-h-[320px] place-items-center rounded-2xl border border-dashed border-brand-border bg-white text-center"><div><FontAwesomeIcon icon={faWandMagicSparkles} className="text-4xl text-brand-border" /><p className="mt-4 font-black text-brand-ink">No services added</p></div></div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((item, index) => (
            <article key={item?._id || index} className="rounded-2xl border border-brand-border bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-wash text-brand-primary">{serviceIcon(item?.svgCode)}</span>
                <div className="flex gap-2">
                  <label htmlFor={item._id} className="grid h-9 w-9 cursor-pointer place-items-center rounded-xl border border-brand-border text-xs text-brand-primary" aria-label={`Edit ${item?.serviceName}`}><FontAwesomeIcon icon={faPenToSquare} /></label>
                  <button type="button" onClick={() => handleDelete(item)} className="grid h-9 w-9 place-items-center rounded-xl bg-red-50 text-xs text-red-700" aria-label={`Delete ${item?.serviceName}`}><FontAwesomeIcon icon={faTrash} /></button>
                </div>
              </div>
              <h2 className="mt-5 text-lg font-black text-brand-ink">{item?.serviceName || 'Service'}</h2>
              <p className="mt-2 text-sm leading-6 text-brand-muted">{item?.description || 'No description provided.'}</p>
              <ServiceUpdate index={item._id} item={item} />
            </article>
          ))}
        </div>
      )}

      <AddService />
    </div>
  )
}

import { useOutletContext } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAward, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import ModalImage from 'react-modal-image'
import axios from 'axios'
import Swal from 'sweetalert2'
import { CertificateUpload } from '../FileUpload/CertificateUpload'

const fallback = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png'

export const DashboardCertificate = () => {
  const { certificate = [], setCertificate } = useOutletContext() || {}

  const handleDelete = async (item) => {
    const result = await Swal.fire({ title: `Delete “${item?.name || 'license'}”?`, text: 'This removes it from the website.', icon: 'warning', showCancelButton: true, confirmButtonText: 'Delete', confirmButtonColor: '#b42318' })
    if (!result.isConfirmed) return
    try {
      const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/deleteCertificate`, { data: { id: item._id } })
      setCertificate(response.data.data)
      Swal.fire({ title: 'License deleted', icon: 'success', timer: 1200, showConfirmButton: false })
    } catch (error) {
      Swal.fire('Could not delete', error?.response?.data?.message || error.message, 'error')
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-brand-border bg-white p-4 shadow-sm sm:p-5">
        <div><p className="text-[10px] font-black uppercase tracking-[.18em] text-brand-accent">Company documents</p><p className="mt-1 text-sm font-bold text-brand-ink">{certificate.length} license{certificate.length === 1 ? '' : 's'} stored</p></div>
        <label htmlFor="certificate" className="inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-xl bg-brand-primary px-4 text-xs font-extrabold text-white"><FontAwesomeIcon icon={faPlus} /> Add license</label>
      </div>

      {!certificate.length ? (
        <div className="grid min-h-[320px] place-items-center rounded-2xl border border-dashed border-brand-border bg-white text-center"><div><FontAwesomeIcon icon={faAward} className="text-4xl text-brand-border" /><p className="mt-4 font-black text-brand-ink">No licenses uploaded</p></div></div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {certificate.map((item, index) => {
            const image = Array.isArray(item?.imageUrl) ? item.imageUrl[0] : item?.imageUrl
            return (
              <article key={item?._id || index} className="group overflow-hidden rounded-2xl border border-brand-border bg-white shadow-sm">
                <div className="aspect-[4/3] overflow-hidden bg-brand-surface"><ModalImage small={image || fallback} large={image || fallback} alt={item?.name || 'License'} className="h-full w-full object-cover" hideDownload hideZoom /></div>
                <div className="flex items-center justify-between gap-3 p-4"><p className="line-clamp-1 text-sm font-black text-brand-ink">{item?.name || 'License'}</p><button type="button" onClick={() => handleDelete(item)} className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-red-50 text-xs text-red-700" aria-label={`Delete ${item?.name || 'license'}`}><FontAwesomeIcon icon={faTrash} /></button></div>
              </article>
            )
          })}
        </div>
      )}

      <CertificateUpload />
    </div>
  )
}

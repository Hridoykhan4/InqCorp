import { useState } from 'react'
import { Link, useOutletContext } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faClock, faEnvelope, faInbox, faPhone } from '@fortawesome/free-solid-svg-icons'
import { QueryModal } from './QueryModal'
import { DateTime } from '../Date Time Formate/DateTime.jsx'

const text = (value, fallback = 'Not provided') => typeof value === 'string' && value.trim() ? value.trim() : fallback

export const Queries = () => {
  const { queries = [] } = useOutletContext() || {}
  const [description, setDescription] = useState(null)

  const open = (item) => {
    setDescription(text(item?.description, 'No additional project details were provided.'))
    const modal = document.getElementById('queryDetails')
    if (modal) modal.checked = true
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-brand-border bg-white p-4 shadow-sm sm:p-5">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[.18em] text-brand-accent">Customer requests</p>
          <p className="mt-1 text-sm font-bold text-brand-ink">{queries.length} enquir{queries.length === 1 ? 'y' : 'ies'} received from the public form</p>
        </div>
        <Link to="/contact" target="_blank" className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-brand-border bg-white px-4 text-xs font-extrabold text-brand-primary">View form <FontAwesomeIcon icon={faArrowRight} /></Link>
      </div>

      {!queries.length ? (
        <div className="grid min-h-[360px] place-items-center rounded-[1.6rem] border border-dashed border-brand-border bg-white px-6 text-center">
          <div>
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand-wash text-xl text-brand-primary"><FontAwesomeIcon icon={faInbox} /></span>
            <h2 className="mt-5 text-xl font-black text-brand-ink">No enquiries yet</h2>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-brand-muted">New quote and project requests will appear here as soon as a visitor submits the contact form.</p>
          </div>
        </div>
      ) : (
        <>
          <div className="grid gap-3 md:hidden">
            {queries.map((item, index) => (
              <button key={item?._id || index} type="button" onClick={() => open(item)} className="rounded-2xl border border-brand-border bg-white p-5 text-left shadow-sm transition active:scale-[.99]">
                <div className="flex items-start justify-between gap-3">
                  <div><p className="font-black text-brand-ink">{text(item?.name, 'Unnamed visitor')}</p><p className="mt-1 text-[10px] font-bold uppercase tracking-[.13em] text-brand-accent">{text(item?.type, 'Project enquiry')}</p></div>
                  <span className="rounded-full bg-brand-wash px-2.5 py-1 text-[9px] font-black text-brand-primary">#{String(index + 1).padStart(2, '0')}</span>
                </div>
                <p className="mt-4 line-clamp-2 text-sm font-bold leading-6 text-brand-ink">{text(item?.subject, 'Material supply requirement')}</p>
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[10px] font-semibold text-brand-muted">
                  <span className="inline-flex items-center gap-1.5"><FontAwesomeIcon icon={faPhone} className="text-brand-accent" />{text(item?.phone)}</span>
                  {item?.email && <span className="inline-flex items-center gap-1.5"><FontAwesomeIcon icon={faEnvelope} className="text-brand-accent" />{item.email}</span>}
                  <span className="inline-flex items-center gap-1.5"><FontAwesomeIcon icon={faClock} className="text-brand-accent" /><DateTime item={item?.createdAt} /></span>
                </div>
              </button>
            ))}
          </div>

          <div className="hidden overflow-hidden rounded-2xl border border-brand-border bg-white shadow-sm md:block">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] text-left">
                <thead className="bg-brand-wash text-[9px] font-black uppercase tracking-[.16em] text-brand-muted"><tr><th className="px-5 py-4">Customer</th><th className="px-5 py-4">Contact</th><th className="px-5 py-4">Type</th><th className="px-5 py-4">Subject</th><th className="px-5 py-4">Received</th></tr></thead>
                <tbody className="divide-y divide-brand-border">
                  {queries.map((item, index) => (
                    <tr key={item?._id || index} onClick={() => open(item)} className="cursor-pointer transition hover:bg-[#fbfaf7]">
                      <td className="px-5 py-4 text-sm font-extrabold text-brand-ink">{text(item?.name, 'Unnamed visitor')}</td>
                      <td className="px-5 py-4"><p className="text-xs font-bold text-brand-ink">{text(item?.phone)}</p><p className="mt-1 text-[10px] text-brand-muted">{text(item?.email)}</p></td>
                      <td className="px-5 py-4"><span className="rounded-full bg-brand-wash px-3 py-1.5 text-[10px] font-bold text-brand-primary">{text(item?.type, 'Project enquiry')}</span></td>
                      <td className="max-w-[280px] px-5 py-4 text-xs font-semibold text-brand-muted"><span className="line-clamp-2">{text(item?.subject, 'Material supply requirement')}</span></td>
                      <td className="px-5 py-4 text-xs font-semibold text-brand-muted"><DateTime item={item?.createdAt} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      <QueryModal description={description} />
    </div>
  )
}

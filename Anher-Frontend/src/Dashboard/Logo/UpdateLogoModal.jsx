import { faCloudArrowUp, faImage, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { addLogo } from '../../Redux/hvac'

export const UpdateLogoModal = () => {
  const admin = useSelector((state) => state.hvac.users)
  const logo = useSelector((state) => state.hvac.logo)
  const dispatch = useDispatch()

  const toggleRef = useRef(null)
  const fileInputRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [dragging, setDragging] = useState(false)
  const [loading, setLoading] = useState(false)

  const close = useCallback(() => {
    setOpen(false)
    setFile(null)
    setDragging(false)
    if (toggleRef.current) toggleRef.current.checked = false
    if (fileInputRef.current) fileInputRef.current.value = ''
  }, [])

  // The sidebar and navbar open this modal through <label htmlFor="uploadLogo">,
  // so the hidden checkbox stays as the trigger bridge.
  useEffect(() => {
    const toggle = toggleRef.current
    if (!toggle) return undefined
    const sync = () => setOpen(toggle.checked)
    toggle.addEventListener('change', sync)
    return () => toggle.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [open, close])

  useEffect(() => {
    if (!file) {
      setPreview(null)
      return undefined
    }
    const url = URL.createObjectURL(file)
    setPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [file])

  const acceptFile = (candidate) => {
    if (!candidate) return
    if (!candidate.type?.startsWith('image/')) {
      Swal.fire({ icon: 'error', title: 'Only image files are supported', text: 'Please choose a PNG, JPG, WEBP or SVG file.' })
      return
    }
    setFile(candidate)
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setDragging(false)
    acceptFile(event.dataTransfer?.files?.[0])
  }

  const handleSubmit = () => {
    if (!admin || !file || loading) return
    const formData = new FormData()
    formData.append('images', file)
    formData.append('name', admin?.name)

    setLoading(true)
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/logoUpload`, formData)
      .then((res) => {
        if (res.status === 200) {
          dispatch(addLogo(res.data.data))
          close()
          Swal.fire({ icon: 'success', title: 'Logo updated', text: 'The new logo is live across the website.' })
        }
      })
      .catch((err) => {
        Swal.fire({ icon: 'error', title: 'Upload failed', text: err?.response?.data?.message || err.message })
      })
      .finally(() => setLoading(false))
  }

  return (
    <>
      <input ref={toggleRef} type="checkbox" id="uploadLogo" className="hidden" aria-hidden="true" />

      {open && (
        <div className="fixed inset-0 z-120 flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true" aria-label="Update website logo">
          <button type="button" onClick={close} className="absolute inset-0 cursor-default bg-[#0b1626]/62 backdrop-blur-sm" aria-label="Close logo dialog" />

          <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-[0_40px_120px_-30px_rgba(9,20,38,.55)]">
            <div className="flex items-start justify-between gap-4 border-b border-[#e8e4dc] px-6 py-5">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[.2em] text-brand-accent">Brand identity</p>
                <h3 className="mt-1 text-lg font-black tracking-[-.02em] text-brand-ink">Update website logo</h3>
                <p className="mt-0.5 text-xs text-brand-muted">Shown in the navbar, dashboard and footer.</p>
              </div>
              <button type="button" onClick={close} className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[#e8e4dc] text-brand-muted transition hover:border-red-200 hover:bg-red-50 hover:text-red-500" aria-label="Close">
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>

            <div className="space-y-5 px-6 py-6">
              <div className="flex items-center gap-4">
                <div className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-2xl border border-[#e8e4dc] bg-brand-surface">
                  {logo
                    ? <img src={logo} alt="Current logo" className="h-full w-full object-contain p-1.5" />
                    : <FontAwesomeIcon icon={faImage} className="text-xl text-brand-muted/50" />}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-black uppercase tracking-[.14em] text-brand-muted">Current logo</p>
                  <p className="mt-1 text-sm text-brand-muted">{logo ? 'Live on the website now.' : 'No logo uploaded yet.'}</p>
                </div>
              </div>

              <label
                htmlFor="logoFilePicker"
                onDragOver={(event) => { event.preventDefault(); setDragging(true) }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                className={`flex min-h-40 cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-4 py-6 text-center transition ${dragging ? 'border-brand-accent bg-brand-accent/8' : 'border-[#d9d3c7] bg-brand-surface hover:border-brand-accent/60 hover:bg-brand-accent/5'}`}
              >
                {preview ? (
                  <>
                    <img src={preview} alt="New logo preview" className="max-h-24 w-auto rounded-xl border border-[#e8e4dc] bg-white object-contain p-2" />
                    <p className="max-w-full truncate text-xs font-bold text-brand-ink">{file?.name}</p>
                    <p className="text-[11px] text-brand-muted">Click to choose a different image</p>
                  </>
                ) : (
                  <>
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-primary/8 text-lg text-brand-primary">
                      <FontAwesomeIcon icon={faCloudArrowUp} />
                    </span>
                    <div>
                      <p className="text-sm font-extrabold text-brand-ink">Drop the new logo here</p>
                      <p className="mt-1 text-xs text-brand-muted">or click to browse — PNG, JPG, WEBP or SVG</p>
                    </div>
                  </>
                )}
                <input
                  ref={fileInputRef}
                  id="logoFilePicker"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(event) => acceptFile(event.target.files?.[0])}
                />
              </label>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-[#e8e4dc] bg-brand-surface/60 px-6 py-4">
              <button type="button" onClick={close} className="inline-flex min-h-11 items-center rounded-xl px-4 text-sm font-bold text-brand-muted transition hover:text-brand-ink">
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!file || loading}
                className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand-primary px-6 text-sm font-extrabold text-white shadow-[0_16px_35px_-18px_rgba(23,59,103,.8)] transition hover:bg-brand-primary-dark disabled:cursor-not-allowed disabled:opacity-40"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Uploading…
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faCloudArrowUp} className="text-xs" /> Upload logo
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

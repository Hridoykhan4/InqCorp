import { faCloudArrowUp, faFileShield, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useOutletContext } from 'react-router'
import Swal from 'sweetalert2'

export const CertificateUpload = () => {
    const { setCertificate } = useOutletContext()

    const toggleRef = useRef(null)
    const fileInputRef = useRef(null)
    const [open, setOpen] = useState(false)
    const [imageFile, setImageFile] = useState(null)
    const [preview, setPreview] = useState(null)
    const [name, setName] = useState('')
    const [dragging, setDragging] = useState(false)
    const [loading, setLoading] = useState(false)

    const close = useCallback(() => {
        setOpen(false)
        setImageFile(null)
        setName('')
        setDragging(false)
        if (toggleRef.current) toggleRef.current.checked = false
        if (fileInputRef.current) fileInputRef.current.value = ''
    }, [])

    // Opened through <label htmlFor="certificate"> on the licenses page,
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
        if (!imageFile) {
            setPreview(null)
            return undefined
        }
        const url = URL.createObjectURL(imageFile)
        setPreview(url)
        return () => URL.revokeObjectURL(url)
    }, [imageFile])

    const acceptFile = (candidate) => {
        if (!candidate) return
        if (!candidate.type?.startsWith('image/')) {
            Swal.fire({ icon: 'error', title: 'Only image files are supported', text: 'Please choose a PNG, JPG or WEBP scan of the document.' })
            return
        }
        setImageFile(candidate)
    }

    const handleDrop = (event) => {
        event.preventDefault()
        setDragging(false)
        acceptFile(event.dataTransfer?.files?.[0])
    }

    const handleSubmit = async () => {
        if (!imageFile || !name.trim() || loading) return

        const formData = new FormData()
        formData.append('image', imageFile) // matches multer.single('image')
        formData.append('name', name.trim())

        setLoading(true)
        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/addCertificate`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })
            setCertificate(res.data?.data)
            close()
            Swal.fire({ icon: 'success', title: 'License added', text: 'The document is now live on the website.' })
        } catch (err) {
            Swal.fire({ icon: 'error', title: 'Upload failed', text: err?.response?.data?.message || err.message })
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <input ref={toggleRef} type="checkbox" id="certificate" className="hidden" aria-hidden="true" />

            {open && (
                <div className="fixed inset-0 z-120 flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true" aria-label="Add license">
                    <button type="button" onClick={close} className="absolute inset-0 cursor-default bg-[#0b1626]/62 backdrop-blur-sm" aria-label="Close license dialog" />

                    <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-[0_40px_120px_-30px_rgba(9,20,38,.55)]">
                        <div className="flex items-start justify-between gap-4 border-b border-[#e8e4dc] px-6 py-5">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[.2em] text-brand-accent">Company documents</p>
                                <h3 className="mt-1 text-lg font-black tracking-[-.02em] text-brand-ink">Add license</h3>
                                <p className="mt-0.5 text-xs text-brand-muted">Trade licenses, permits and certifications.</p>
                            </div>
                            <button type="button" onClick={close} className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[#e8e4dc] text-brand-muted transition hover:border-red-200 hover:bg-red-50 hover:text-red-500" aria-label="Close">
                                <FontAwesomeIcon icon={faXmark} />
                            </button>
                        </div>

                        <div className="space-y-4 px-6 py-6">
                            <label className="block">
                                <span className="text-xs font-black uppercase tracking-[.14em] text-brand-muted">Document name</span>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    placeholder="e.g. Trade License 2026"
                                    className="mt-2 w-full rounded-xl border border-[#d9d3c7] bg-white px-4 py-3 text-sm font-bold text-brand-ink outline-none transition placeholder:font-medium placeholder:text-brand-muted/60 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/15"
                                />
                            </label>

                            <label
                                htmlFor="licenseFilePicker"
                                onDragOver={(event) => { event.preventDefault(); setDragging(true) }}
                                onDragLeave={() => setDragging(false)}
                                onDrop={handleDrop}
                                className={`flex min-h-40 cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-4 py-6 text-center transition ${dragging ? 'border-brand-accent bg-brand-accent/8' : 'border-[#d9d3c7] bg-brand-surface hover:border-brand-accent/60 hover:bg-brand-accent/5'}`}
                            >
                                {preview ? (
                                    <>
                                        <img src={preview} alt="License preview" className="max-h-24 w-auto rounded-xl border border-[#e8e4dc] bg-white object-contain p-2" />
                                        <p className="max-w-full truncate text-xs font-bold text-brand-ink">{imageFile?.name}</p>
                                        <p className="text-[11px] text-brand-muted">Click to choose a different image</p>
                                    </>
                                ) : (
                                    <>
                                        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-primary/8 text-lg text-brand-primary">
                                            <FontAwesomeIcon icon={faFileShield} />
                                        </span>
                                        <div>
                                            <p className="text-sm font-extrabold text-brand-ink">Drop the document scan here</p>
                                            <p className="mt-1 text-xs text-brand-muted">or click to browse — PNG, JPG or WEBP</p>
                                        </div>
                                    </>
                                )}
                                <input
                                    ref={fileInputRef}
                                    id="licenseFilePicker"
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
                                disabled={!imageFile || !name.trim() || loading}
                                className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand-primary px-6 text-sm font-extrabold text-white shadow-[0_16px_35px_-18px_rgba(23,59,103,.8)] transition hover:bg-brand-primary-dark disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                {loading ? (
                                    <>
                                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                        Uploading…
                                    </>
                                ) : (
                                    <>
                                        <FontAwesomeIcon icon={faCloudArrowUp} className="text-xs" /> Add license
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

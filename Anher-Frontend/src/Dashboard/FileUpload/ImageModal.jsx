import axios from 'axios'
import React, { useRef, useState } from 'react'
import { useOutletContext } from 'react-router'
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faPanorama, faXmark } from '@fortawesome/free-solid-svg-icons'

export const ImageModal = () => {
    const [imageFile, setImageFile] = useState(null)
    const [bannerFile, setBannerFile] = useState(null)
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)

    const setCategories = useOutletContext().setCategories
    const ImageFileInputRef = useRef()
    const BannerFileInputRef = useRef()

    const handleFileChange = (e, v) => {
        const file = e.target.files[0]
        if (!file) return
        v === 'image' ? setImageFile(file) : setBannerFile(file)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!imageFile || !name || !bannerFile) {
            Swal.fire({ icon: 'error', title: 'Name, image and banner all required.' })
            return
        }

        const formData = new FormData()
        formData.append('image', imageFile)
        formData.append('bannerImage', bannerFile)
        formData.append('name', name)

        setLoading(true)
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/addCategory`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            )

            Swal.fire({ icon: 'success', title: res.data?.message || 'Uploaded Successfully' })

            setImageFile(null)
            setBannerFile(null)
            setName('')
            if (ImageFileInputRef.current) ImageFileInputRef.current.value = null
            if (BannerFileInputRef.current) BannerFileInputRef.current.value = null
            setCategories(res.data?.data || [])
            const toggle = document.getElementById('my_modal_3')
            if (toggle) toggle.checked = false
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Error uploading',
                text: err?.response?.data?.message || err.message,
            })
        } finally {
            setLoading(false)
        }
    }

    const handleClose = () => {
        const toggle = document.getElementById('my_modal_3')
        if (toggle) toggle.checked = false
        if (ImageFileInputRef.current) ImageFileInputRef.current.value = null
        if (BannerFileInputRef.current) BannerFileInputRef.current.value = null
        setBannerFile(null)
        setImageFile(null)
        setName('')
    }

    const previewImage = imageFile ? URL.createObjectURL(imageFile) : null
    const previewBanner = bannerFile ? URL.createObjectURL(bannerFile) : null

    return (
        <div>
            <input type='checkbox' id='my_modal_3' className='modal-toggle' />

            <div className='modal'>
                <div className='modal-box w-[95vw] max-w-xl max-h-[90vh] overflow-y-auto relative p-0'>
                    <div className='flex items-center justify-between border-b border-safety-border px-5 py-4'>
                        <div>
                            <p className='text-xs font-bold uppercase tracking-[0.2em] text-safety-red'>
                                New Category
                            </p>
                            <h3 className='mt-1 text-lg font-bold text-safety-ink'>
                                Add Product Category
                            </h3>
                        </div>
                        <button
                            type='button'
                            onClick={handleClose}
                            className='grid h-9 w-9 place-items-center rounded-full text-safety-muted hover:bg-safety-surface hover:text-safety-red'
                            aria-label='Close add category'
                        >
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className='space-y-5 px-5 py-5'>
                        <div>
                            <label className='mb-1.5 block text-sm font-semibold text-safety-ink'>
                                Category Name
                            </label>
                            <input
                                type='text'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className='input input-bordered w-full'
                                placeholder='e.g. Passive Fire Protection'
                            />
                        </div>

                        <div>
                            <label className='mb-1.5 flex items-center gap-2 text-sm font-semibold text-safety-ink'>
                                <FontAwesomeIcon icon={faImage} className='text-safety-red' />
                                Category Thumbnail
                            </label>
                            <input
                                type='file'
                                ref={ImageFileInputRef}
                                onChange={(e) => handleFileChange(e, 'image')}
                                className='file-input file-input-bordered w-full'
                                accept='image/*'
                            />
                            {previewImage && (
                                <div className='mt-3 overflow-hidden rounded-xl border border-safety-border'>
                                    <img
                                        src={previewImage}
                                        alt='Thumbnail preview'
                                        className='h-32 w-full object-cover'
                                    />
                                </div>
                            )}
                        </div>

                        <div>
                            <label className='mb-1.5 flex items-center gap-2 text-sm font-semibold text-safety-ink'>
                                <FontAwesomeIcon icon={faPanorama} className='text-safety-red' />
                                Banner Image
                            </label>
                            <input
                                type='file'
                                ref={BannerFileInputRef}
                                onChange={(e) => handleFileChange(e, 'bannerImage')}
                                className='file-input file-input-bordered w-full'
                                accept='image/*'
                            />
                            {previewBanner && (
                                <div className='mt-3 overflow-hidden rounded-xl border border-safety-border'>
                                    <img
                                        src={previewBanner}
                                        alt='Banner preview'
                                        className='h-32 w-full object-cover'
                                    />
                                </div>
                            )}
                        </div>

                        <div className='flex flex-col-reverse gap-2 sm:flex-row sm:justify-end'>
                            <button
                                type='button'
                                onClick={handleClose}
                                className='btn btn-ghost'
                            >
                                Cancel
                            </button>
                            <button
                                type='submit'
                                disabled={!name || !imageFile || !bannerFile || loading}
                                className='btn btn-primary'
                            >
                                {loading && <span className='loading loading-spinner loading-sm' />}
                                Add Category
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

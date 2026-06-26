import { faPenToSquare, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import Swal from 'sweetalert2';
import { UploadBanner } from '../Upload Banner/UploadBanner';
import { useOutletContext } from 'react-router';
import axios from 'axios';

export const DashboardBanner = () => {

    const { dashboardBanners, setDashboardBanners, banners, setBanners } = useOutletContext()

    const [editing, setEditing] = useState(null) // banner being edited
    const [form, setForm] = useState({ title: '', description: '', region: '' })
    const [newImage, setNewImage] = useState(null)
    const [saving, setSaving] = useState(false)

    const openEdit = (item) => {
        setEditing(item)
        setForm({
            title: item?.title || '',
            description: item?.description || '',
            region: item?.region || '',
        })
        setNewImage(null)
        document.getElementById('editBanner').checked = true
    }

    const closeEdit = () => {
        document.getElementById('editBanner').checked = false
        setEditing(null)
        setNewImage(null)
    }

    const saveEdit = async () => {
        if (!editing?._id) return
        setSaving(true)
        try {
            // Send multipart so an optional new image can ride along. No image =
            // backend keeps the existing one.
            const fd = new FormData()
            fd.append('title', form.title)
            fd.append('description', form.description)
            fd.append('region', form.region)
            if (newImage) fd.append('images', newImage)

            const res = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/updateBanner/${editing._id}`,
                fd
            )
            if (res.status === 200) {
                setBanners(res.data.data)
                setDashboardBanners(res.data.dashboardData)
                Swal.fire('Updated', res.data.message, 'success')
                closeEdit()
            }
        } catch (error) {
            Swal.fire('Error', error?.response?.data?.message || error.message, 'error')
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: "Do you want to delete it?",
            showCancelButton: true,
            confirmButtonText: "Delete",
            confirmButtonColor: '#FF0000'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/deleteBanner`, { data: { id: id } })
                    .then((res) => {
                        if (res.status == 200) {
                            setBanners(res.data.data)
                            setDashboardBanners(res.data.dashboardData)
                            Swal.fire("Delete", res.data.message, "success");
                        }
                    })
                    .catch((error) => Swal.fire("Something Wrong", error.response.data.message || error.message, "error"))
            }
        });
    }

    return (
        <div className='space-y-1 w-full'>
            <div>
                <h1 className='text-center md:text-5xl text-3xl font-bold text-gray-800 underline'>Banners</h1>
            </div>

            <br />
            <section className='space-y-4 px-5'>
                <div className='flex max-sm:justify-center max-sm:items-center '>
                    <label htmlFor="uploadBanner" className='btn text-base font-semibold hover:bg-cyan-400 bg-cyan-500 rounded-md text-white '>
                        Upload Banners <FontAwesomeIcon icon={faPlus} ></FontAwesomeIcon>
                    </label>
                </div>

                <section className='flex max-sm:flex-col gap-5 items-center md:flex-wrap '>
                    {
                        dashboardBanners && dashboardBanners?.map((item, index) => {
                            return (
                                <div key={index} className="group relative w-[300px] max-sm:w-full overflow-hidden rounded-lg shadow-lg">
                                    <img
                                        src={`${item?.imageUrl[0] || `https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png`}`}
                                        alt={item?.title || 'banner'}
                                        loading="lazy"
                                        className="w-full h-[200px] object-cover transition-all duration-300 ease-in-out group-hover:scale-105"
                                    />

                                    {/* hover actions */}
                                    <div className="absolute right-2 top-2 flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition">
                                        <button
                                            onClick={() => openEdit(item)}
                                            className="grid h-8 w-8 place-items-center rounded-full bg-white text-cyan-600 shadow hover:bg-cyan-50"
                                            title="Edit"
                                        >
                                            <FontAwesomeIcon icon={faPenToSquare} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item._id)}
                                            className="grid h-8 w-8 place-items-center rounded-full bg-white text-red-600 shadow hover:bg-red-50"
                                            title="Delete"
                                        >
                                            <FontAwesomeIcon icon={faXmark} />
                                        </button>
                                    </div>

                                    <div className='space-y-1 p-3'>
                                        <p className='text-[10px] font-bold uppercase tracking-widest text-cyan-600'>
                                            {item?.region ? item.region.toUpperCase() : 'GLOBAL'}
                                        </p>
                                        <p className='line-clamp-1 font-bold text-gray-800'>{item?.title || 'Untitled'}</p>
                                        <p className='line-clamp-2 text-xs text-gray-500'>{item?.description || 'No description'}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </section>
            </section>

            {/* Edit modal */}
            <input type="checkbox" id="editBanner" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box max-w-lg space-y-4">
                    <h3 className="text-lg font-bold">Edit Banner</h3>
                    <div className="space-y-3">
                        <label className="block text-sm font-semibold">Title
                            <input
                                type="text"
                                value={form.title}
                                onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                                className="input input-bordered mt-1 w-full"
                                placeholder="Banner title"
                            />
                        </label>
                        <label className="block text-sm font-semibold">Description
                            <textarea
                                value={form.description}
                                onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                                className="textarea textarea-bordered mt-1 w-full"
                                rows={4}
                                placeholder="Banner description"
                            />
                        </label>
                        <label className="block text-sm font-semibold">Region
                            <input
                                type="text"
                                value={form.region}
                                onChange={(e) => setForm((p) => ({ ...p, region: e.target.value }))}
                                className="input input-bordered mt-1 w-full"
                                placeholder="e.g. global, bd"
                            />
                        </label>
                        <label className="block text-sm font-semibold">Banner Image (optional — leave empty to keep current)
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setNewImage(e.target.files?.[0] || null)}
                                className="file-input file-input-bordered file-input-sm mt-1 w-full"
                            />
                        </label>
                        <div className="flex items-center gap-3">
                            {(newImage || editing?.imageUrl?.[0]) && (
                                <img
                                    src={newImage ? URL.createObjectURL(newImage) : editing.imageUrl[0]}
                                    alt="preview"
                                    className="h-16 w-28 rounded-md border object-cover"
                                />
                            )}
                            <span className="text-xs text-gray-500">{newImage ? 'New image' : 'Current image'}</span>
                        </div>
                    </div>
                    <div className="modal-action">
                        <button onClick={closeEdit} className="btn btn-ghost">Cancel</button>
                        <button onClick={saveEdit} disabled={saving} className="btn btn-primary">
                            {saving ? <span className="loading loading-spinner loading-sm"></span> : 'Save Changes'}
                        </button>
                    </div>
                </div>
                <label className="modal-backdrop" htmlFor="editBanner" onClick={closeEdit}>Close</label>
            </div>

            <UploadBanner></UploadBanner>
        </div>
    )
}

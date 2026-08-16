import { faPenToSquare, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import Swal from 'sweetalert2';
import { UploadBanner } from '../Upload Banner/UploadBanner';
import { useOutletContext } from 'react-router';
import axios from 'axios';

export const DashboardBanner = () => {

    const { dashboardBanners, setDashboardBanners, setBanners } = useOutletContext()

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
        <div className='w-full space-y-5'>
            <div className='flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-brand-border bg-white p-4 shadow-sm sm:p-5'>
                <div>
                    <p className='text-[10px] font-black uppercase tracking-[.18em] text-brand-accent'>Homepage slider</p>
                    <p className='mt-1 text-sm font-bold text-brand-ink'>{dashboardBanners?.length || 0} public update{dashboardBanners?.length === 1 ? '' : 's'} live</p>
                </div>
                <label htmlFor="uploadBanner" className='inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-xl bg-brand-primary px-4 text-xs font-extrabold text-white shadow-sm transition hover:bg-brand-primary-dark'>
                    Add public update <FontAwesomeIcon icon={faPlus} />
                </label>
            </div>

                <section className='grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
                    {
                        dashboardBanners && dashboardBanners?.map((item, index) => {
                            return (
                                <article key={index} className="group relative overflow-hidden rounded-2xl border border-brand-border bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
                                    <img
                                        src={`${item?.imageUrl[0] || `https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png`}`}
                                        alt={item?.title || 'banner'}
                                        loading="lazy"
                                        className="aspect-[16/10] w-full object-cover transition-all duration-500 ease-out group-hover:scale-105"
                                    />

                                    {/* hover actions */}
                                    <div className="absolute right-2 top-2 flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition">
                                        <button
                                            onClick={() => openEdit(item)}
                                            className="grid h-9 w-9 place-items-center rounded-xl bg-white text-brand-primary shadow hover:bg-brand-wash"
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

                                    <div className='space-y-1 p-4'>
                                        <p className='text-[9px] font-black uppercase tracking-[.15em] text-brand-accent'>
                                            {item?.region ? item.region.toUpperCase() : 'GLOBAL'}
                                        </p>
                                        <p className='line-clamp-1 font-black text-brand-ink'>{item?.title || 'Untitled'}</p>
                                        <p className='line-clamp-2 text-xs leading-5 text-brand-muted'>{item?.description || 'No description'}</p>
                                    </div>
                                </article>
                            )
                        })
                    }
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

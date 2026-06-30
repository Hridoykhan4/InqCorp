import { useState, useRef } from 'react'
import { useOutletContext } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faPen, faTrash, faXmark, faImage } from '@fortawesome/free-solid-svg-icons'

const GOLD  = '#C49B2B'
const NAVY  = '#1B3A8A'

const emptyForm = { name: '', size: '', price: '', unit: 'CFT', order: 0 }

export const DashboardPriceList = () => {
    const { priceList = [], setPriceList } = useOutletContext()

    const [showModal, setShowModal]   = useState(false)
    const [editItem, setEditItem]     = useState(null)   // null = add mode
    const [form, setForm]             = useState(emptyForm)
    const [imageFile, setImageFile]   = useState(null)
    const [preview, setPreview]       = useState('')
    const [loading, setLoading]       = useState(false)
    const fileRef = useRef(null)

    const openAdd = () => {
        setEditItem(null)
        setForm(emptyForm)
        setImageFile(null)
        setPreview('')
        setShowModal(true)
    }

    const openEdit = (item) => {
        setEditItem(item)
        setForm({ name: item.name, size: item.size, price: item.price, unit: item.unit || 'CFT', order: item.order ?? 0 })
        setImageFile(null)
        setPreview(item.imageUrl || '')
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
        setEditItem(null)
        setForm(emptyForm)
        setImageFile(null)
        setPreview('')
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (!file) return
        setImageFile(file)
        setPreview(URL.createObjectURL(file))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!form.name || !form.price) return Swal.fire({ icon: 'warning', title: 'Name and price are required' })
        setLoading(true)
        try {
            const fd = new FormData()
            const info = { ...form, price: Number(form.price), order: Number(form.order) }
            if (editItem?.imageUrl && !imageFile) info.imageUrl = editItem.imageUrl
            fd.append('info', JSON.stringify(info))
            if (imageFile) fd.append('image', imageFile)

            let res
            if (editItem) {
                res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/updatePriceItem/${editItem._id}`, fd)
            } else {
                res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/addPriceItem`, fd)
            }
            setPriceList(res.data.data)
            closeModal()
            Swal.fire({ icon: 'success', title: res.data.message, timer: 1500, showConfirmButton: false })
        } catch (err) {
            Swal.fire({ icon: 'error', title: err.response?.data?.message || err.message })
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = (item) => {
        Swal.fire({
            title: `Delete "${item.name}"?`,
            text: 'This will remove it from the price list.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            confirmButtonText: 'Delete',
        }).then(async (result) => {
            if (!result.isConfirmed) return
            try {
                const res = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/deletePriceItem`, { data: { id: item._id } })
                setPriceList(res.data.data)
                Swal.fire({ icon: 'success', title: 'Deleted!', timer: 1200, showConfirmButton: false })
            } catch (err) {
                Swal.fire({ icon: 'error', title: err.response?.data?.message || err.message })
            }
        })
    }

    return (
        <div className="min-h-screen p-4 sm:p-6 bg-gray-50">
            {/* Page header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-black text-gray-800">Price List</h1>
                    <p className="text-sm text-gray-500 mt-0.5">Manage today's product prices — shown live on the homepage</p>
                </div>
                <button
                    onClick={openAdd}
                    className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white shadow-lg transition-transform hover:-translate-y-0.5"
                    style={{ background: `linear-gradient(135deg, ${NAVY}, #2a50b8)` }}
                >
                    <FontAwesomeIcon icon={faPlus} />
                    Add Item
                </button>
            </div>

            {/* Table card */}
            <div className="overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100">
                {/* Table header */}
                <div
                    className="grid px-5 py-3 text-[11px] font-bold uppercase tracking-widest text-white"
                    style={{ gridTemplateColumns: '60px 1fr 130px 100px 80px 100px', background: `linear-gradient(135deg, ${NAVY}, #2a50b8)` }}
                >
                    <span>Image</span>
                    <span>Product</span>
                    <span>Size</span>
                    <span>Price</span>
                    <span>Unit</span>
                    <span className="text-right">Actions</span>
                </div>

                {priceList.length === 0 && (
                    <div className="py-16 text-center text-gray-400">
                        <p className="text-4xl mb-3">📋</p>
                        <p className="font-semibold">No price items yet. Click "Add Item" to get started.</p>
                    </div>
                )}

                {priceList.map((item, idx) => (
                    <div
                        key={item._id}
                        className="grid items-center px-5 py-3.5 border-b border-gray-50 hover:bg-gray-50/80 transition-colors"
                        style={{ gridTemplateColumns: '60px 1fr 130px 100px 80px 100px' }}
                    >
                        {/* Image */}
                        <div>
                            {item.imageUrl ? (
                                <img src={item.imageUrl} alt={item.name} className="h-10 w-10 rounded-full object-cover border-2 border-gray-100" />
                            ) : (
                                <div className="h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold border-2 border-dashed border-gray-200 text-gray-400">
                                    {item.name.charAt(0)}
                                </div>
                            )}
                        </div>
                        {/* Name */}
                        <p className="font-semibold text-gray-800 text-sm">{item.name}</p>
                        {/* Size */}
                        <p className="text-sm text-gray-500">{item.size || '—'}</p>
                        {/* Price */}
                        <p className="text-sm font-black" style={{ color: GOLD }}>৳ {item.price}.00</p>
                        {/* Unit */}
                        <p className="text-sm text-gray-500">{item.unit || 'CFT'}</p>
                        {/* Actions */}
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => openEdit(item)}
                                className="grid h-8 w-8 place-items-center rounded-lg text-xs text-blue-600 hover:bg-blue-50 transition-colors"
                                title="Edit"
                            >
                                <FontAwesomeIcon icon={faPen} />
                            </button>
                            <button
                                onClick={() => handleDelete(item)}
                                className="grid h-8 w-8 place-items-center rounded-lg text-xs text-red-500 hover:bg-red-50 transition-colors"
                                title="Delete"
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
                    <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden">
                        {/* Modal header */}
                        <div className="flex items-center justify-between px-6 py-4" style={{ background: `linear-gradient(135deg, ${NAVY}, #2a50b8)` }}>
                            <h2 className="text-base font-black text-white">{editItem ? 'Edit Price Item' : 'Add Price Item'}</h2>
                            <button onClick={closeModal} className="grid h-8 w-8 place-items-center rounded-lg text-white/70 hover:bg-white/10 transition-colors">
                                <FontAwesomeIcon icon={faXmark} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            {/* Image upload */}
                            <div className="flex items-center gap-4">
                                <button
                                    type="button"
                                    onClick={() => fileRef.current?.click()}
                                    className="relative h-16 w-16 shrink-0 rounded-full overflow-hidden border-2 border-dashed hover:border-blue-400 transition-colors"
                                    style={{ borderColor: preview ? GOLD : '#d1d5db' }}
                                >
                                    {preview ? (
                                        <img src={preview} alt="preview" className="h-full w-full object-cover" />
                                    ) : (
                                        <span className="flex h-full w-full flex-col items-center justify-center gap-1 text-gray-400">
                                            <FontAwesomeIcon icon={faImage} className="text-lg" />
                                            <span className="text-[9px] font-bold uppercase">Photo</span>
                                        </span>
                                    )}
                                </button>
                                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                                <p className="text-xs text-gray-500">Click the circle to upload a product photo (optional)</p>
                            </div>

                            {/* Name */}
                            <div>
                                <label className="block text-xs font-bold text-gray-600 mb-1">Product Name *</label>
                                <input
                                    value={form.name}
                                    onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                                    placeholder="e.g. Fine Sand"
                                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-400 transition-colors"
                                    required
                                />
                            </div>

                            {/* Size */}
                            <div>
                                <label className="block text-xs font-bold text-gray-600 mb-1">Size / Grade</label>
                                <input
                                    value={form.size}
                                    onChange={(e) => setForm(f => ({ ...f, size: e.target.value }))}
                                    placeholder="e.g. 0.063 - 1mm"
                                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-400 transition-colors"
                                />
                            </div>

                            {/* Price + Unit */}
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 mb-1">Price (৳) *</label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={form.price}
                                        onChange={(e) => setForm(f => ({ ...f, price: e.target.value }))}
                                        placeholder="65"
                                        className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-400 transition-colors"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 mb-1">Unit</label>
                                    <input
                                        value={form.unit}
                                        onChange={(e) => setForm(f => ({ ...f, unit: e.target.value }))}
                                        placeholder="CFT"
                                        className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-400 transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Display Order */}
                            <div>
                                <label className="block text-xs font-bold text-gray-600 mb-1">Display Order</label>
                                <input
                                    type="number"
                                    value={form.order}
                                    onChange={(e) => setForm(f => ({ ...f, order: e.target.value }))}
                                    placeholder="0"
                                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-blue-400 transition-colors"
                                />
                                <p className="mt-1 text-[10px] text-gray-400">Lower number = shown first on the page</p>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3 pt-1">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="flex-1 rounded-xl border border-gray-200 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 rounded-xl py-2.5 text-sm font-bold text-white transition-all hover:opacity-90 disabled:opacity-60"
                                    style={{ background: `linear-gradient(135deg, ${NAVY}, #2a50b8)` }}
                                >
                                    {loading ? 'Saving…' : (editItem ? 'Save Changes' : 'Add Item')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

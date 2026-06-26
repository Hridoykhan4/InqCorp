import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useOutletContext } from 'react-router';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export const UpdateCategory = ({ item }) => {
    const [imageFile, setImageFile] = useState(null)
    const [bannerFile, setBannerFile] = useState(null)
    const [name, setName] = useState('');
    const [imagePreview, setImagePreview] = useState([]); // 🔧 Shows either existing or new image
    const [bannerImage, setBannerImage] = useState([])
    const [loading, setLoading] = useState(false);
    const { setCategories } = useOutletContext();
    const ImageFileInputRef = useRef();
    const BannerFileInputRef = useRef()
    const handleFileChange = (e, v) => {
        const file = e.target.files[0];
        if (file) {

            const path = URL.createObjectURL(file)
            v == 'image' ? setImageFile(file) : setBannerFile(file)


        } else {
            Swal.fire({
                icon: "error",
                title: "Oops Image Couldnt Select...",
                text: "Something went wrong!",

            });
        }
    };

    useEffect(() => {
        if (item) {
            setName(item.name || '');
            const img = Array.isArray(item.imageUrl) ? item.imageUrl[0] : item.imageUrl;
            const banner = Array.isArray(item.bannerImgUrl) ? item.bannerImgUrl[0] : item.bannerImgUrl;
            setImagePreview(img || null);
            setBannerImage(banner || null);
            setBannerFile(null);
            setImageFile(null);
        }
    }, [item?._id]);

    // const handleFileChange = (e) => {
    //     const selectedFile = e.target.files[0];
    //     if (selectedFile) {
    //         setFile(selectedFile);
    //         setImagePreview(URL.createObjectURL(selectedFile)); // 🔧 Show new image
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name) {
            Swal.fire({ icon: "error", title: "Missing Name" });
            return;
        }

        const formData = new FormData();
        if (imageFile) formData.append('image', imageFile);
        if (bannerFile) formData.append('bannerImage', bannerFile); // 🔧 Only if new image selected
        formData.append('name', name);

        setLoading(true);


        try {
            const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/updateCategory/${item._id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (res.status == 200) {
                // Close modal BEFORE setCategories triggers parent re-render.
                const toggle = document.getElementById(`updateCategory-${item.name}`);
                if (toggle) toggle.checked = false;
                if (ImageFileInputRef.current) ImageFileInputRef.current.value = null;
                if (BannerFileInputRef.current) BannerFileInputRef.current.value = null;
                setImageFile(null);
                setBannerFile(null);
                Swal.fire({ icon: "success", title: "Updated Successfully" });
                setCategories(res.data.data);
            } else {
                Swal.fire({ icon: "error", title: "Error updating" });
            }
        } catch (err) {
            Swal.fire({ icon: "error", title: "Error updating", text: err.response.data.message|| err.message });
        } finally {
            setLoading(false);
        }
    };

    const handleModalClose = () => {
        // Clear only file selections; keep name/preview in sync with item via useEffect resync.
        setImageFile(null);
        setBannerFile(null);
        if (ImageFileInputRef.current) ImageFileInputRef.current.value = null;
        if (BannerFileInputRef.current) BannerFileInputRef.current.value = null;
        const toggle = document.getElementById(`updateCategory-${item.name}`);
        if (toggle) toggle.checked = false;
    };

    if (!item) return null;

    return createPortal(
        <div>
            <input type="checkbox" id={`updateCategory-${item.name}`} className="modal-toggle peer sr-only" />
            <div
                className="fixed inset-0 z-[200] hidden peer-checked:flex items-center justify-center bg-safety-ink/60 backdrop-blur-sm p-4 animate-fade"
                role="dialog"
                aria-modal="true"
            >
                <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl animate-rise">
                    <button
                        type="button"
                        onClick={handleModalClose}
                        className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full text-safety-muted transition hover:bg-safety-surface hover:text-safety-red"
                        aria-label="Close"
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </button>

                    <div className="mb-5 border-b border-safety-border pb-3">
                        <h2 className="text-xl font-bold text-safety-ink">Update Category</h2>
                        <p className="mt-1 text-sm text-safety-muted">Edit category name and replace image or banner if needed.</p>
                    </div>

                    <section className="space-y-5">
                        <div>
                            <label className="mb-1.5 block text-sm font-semibold text-safety-ink">Category Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="input input-bordered w-full"
                                placeholder="Enter category name"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <p className="text-sm font-semibold text-safety-ink">Category Image</p>
                                {imagePreview && (
                                    <div className="aspect-square w-full overflow-hidden rounded-xl border border-safety-border bg-safety-surface">
                                        <img loading="lazy" src={imagePreview} alt="Category preview" className="h-full w-full object-cover" />
                                    </div>
                                )}
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm font-semibold text-safety-ink">Banner Image</p>
                                {bannerImage && (
                                    <div className="aspect-square w-full overflow-hidden rounded-xl border border-safety-border bg-safety-surface">
                                        <img loading="lazy" src={bannerImage} alt="Banner preview" className="h-full w-full object-cover" />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div>
                                <label className="mb-1.5 block text-sm font-semibold text-safety-ink">Replace Category Image</label>
                                <input
                                    type="file"
                                    ref={ImageFileInputRef}
                                    onChange={(e) => handleFileChange(e, 'image')}
                                    className="file-input file-input-bordered w-full"
                                    accept="image/*"
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-sm font-semibold text-safety-ink">Replace Banner Image</label>
                                <input
                                    type="file"
                                    ref={BannerFileInputRef}
                                    onChange={(e) => handleFileChange(e, 'bannerImage')}
                                    className="file-input file-input-bordered w-full"
                                    accept="image/*"
                                />
                            </div>
                        </div>

                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-safety-red px-4 py-2.5 text-sm font-bold text-white transition hover:bg-safety-red-dark disabled:opacity-60"
                        >
                            {loading && <span className="loading loading-spinner loading-sm"></span>}
                            {loading ? 'Updating...' : 'Save Changes'}
                        </button>
                    </section>
                </div>
            </div>
        </div>,
        document.body
    );
};

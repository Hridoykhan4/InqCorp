import axios from 'axios';
import React, { useRef, useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useOutletContext } from 'react-router-dom';
import Swal from 'sweetalert2';
import { capitalizeWords } from '../../Functions/functions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faXmark } from '@fortawesome/free-solid-svg-icons';

export const ProductUpdate = ({ item }) => {
    const [images, setImages] = useState([]);
    const [pdfs, setPdfs] = useState([{ key: '', file: null }]);
    const [existingPdfs, setExistingPdfs] = useState([]); // [{ key, url }]
    const [name, setName] = useState('');
    const [model, setModel] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [parameter, setParameter] = useState([{ key: '', value: '' }]);
    const [packingData, setPackingData] = useState([{ key: '', value: '' }]);
    const [loading, setLoading] = useState(false);

    const { setCategories, categories, products, setProducts } = useOutletContext();
    const fileInputRef = useRef();
    const pdfInputRefs = useRef([]);

    useEffect(() => {
        if (item && item._id) {
            setImages(item.imageUrl || []);
            setName(item.name || '');
            setModel(item.model || '');
            setDescription(item.description || '');
            setCategory(item.category || '');

            // Parameter format: [{ key: '', value: '' }]
            const formattedParameter =
                Array.isArray(item.parameter) && item.parameter.length > 0
                    ? item.parameter?.map(obj => {
                        const key = Object.keys(obj)[0];
                        return { key, value: obj[key] };
                    })
                    : [{ key: '', value: '' }];
            setParameter(formattedParameter);

            // PackingData format: [{ key: '', value: '' }]
            const formattedPackingData =
                Array.isArray(item.packingData) && item.packingData.length > 0
                    ? item.packingData?.map(obj => {
                        const key = Object.keys(obj)[0];
                        return { key, value: obj[key] };
                    })
                    : [{ key: '', value: '' }];
            setPackingData(formattedPackingData);

            // PDFs from db: { dataSheet: "url", userManual: "url" }
            const dbPdfs = item.pdf && typeof item.pdf === 'object' && !Array.isArray(item.pdf)
                ? Object.entries(item.pdf)?.map(([key, url]) => ({ key, url }))
                : [];
            setExistingPdfs(dbPdfs.length ? dbPdfs : []);
            setPdfs([{ key: '', file: null }]);
        }
    }, [item]);


    // ----------- Images -----------
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(prev => [...prev, ...files]);
    };
    const removeImage = (index) => setImages(prev => prev.filter((_, i) => i !== index));

    // Stable blob URLs for File previews — recompute only when images array reference changes.
    // Without this, URL.createObjectURL fires on every render → fresh URL each time → image flicker loop.
    const imagePreviewUrls = useMemo(() => {
        return images.map((img) => (typeof img === 'string' ? img : URL.createObjectURL(img)));
    }, [images]);

    useEffect(() => {
        return () => {
            imagePreviewUrls.forEach((url, i) => {
                if (typeof images[i] !== 'string' && url?.startsWith('blob:')) {
                    URL.revokeObjectURL(url);
                }
            });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imagePreviewUrls]);

    // ----------- Parameter -----------
    const handleParameter = (index, field, value) => {
        const newParameter = [...parameter];
        newParameter[index][field] = value;
        setParameter(newParameter);
    };
    const addParameterField = () => setParameter(prev => [...prev, { key: '', value: '' }]);
    const removeParameterField = (index) => setParameter(prev => prev.filter((_, i) => i !== index));

    // ----------- Packing Data -----------
    const handlePackingData = (index, field, value) => {
        const newPackingData = [...packingData];
        newPackingData[index][field] = value;
        setPackingData(newPackingData);
    };
    const addPackingDataField = () => setPackingData(prev => [...prev, { key: '', value: '' }]);
    const removePackingDataField = (index) => setPackingData(prev => prev.filter((_, i) => i !== index));

    // ----------- PDFs -----------
    const handlePdfFieldChange = (idx, field, value) => {
        const updated = [...pdfs];
        updated[idx][field] = value;
        setPdfs(updated);
    };
    const addPdfField = () => setPdfs(prev => [...prev, { key: '', file: null }]);
    const removePdfField = (idx) => setPdfs(prev => prev.filter((_, i) => i !== idx));

    // Remove an existing PDF (will not be sent to backend)
    const removeExistingPdf = (key) => setExistingPdfs(prev => prev.filter(pdf => pdf.key !== key));

    // ----------- Submit -----------
    const handleSubmit = async () => {
        if (!images.length || !name || !model || !description || !category) {
            Swal.fire({ icon: "error", title: "Missing required fields" });
            return;
        }

        const partialPdf = pdfs.find((p) => (p.key && !p.file) || (!p.key && p.file));
        if (partialPdf) {
            Swal.fire({
                icon: "warning",
                title: "Incomplete PDF entry",
                text: "Each new PDF needs both a key (e.g. dataSheet) and a file. Remove empty rows or complete them.",
            });
            return;
        }
        const formData = new FormData();

        // Images: distinguish existing (URL string) vs new (File object)
        images.forEach(img => {
            if (typeof img === 'string') {
                formData.append('existingImages', img);
            } else {
                formData.append('images', img);
            }
        });

        // PDFs: new uploads
        pdfs.forEach(pdf => {
            if (pdf.key && pdf.file) {
                formData.append(`pdf_${pdf.key}`, pdf.file);
            }
        });

        // PDFs: existing (to keep)
        if (existingPdfs.length) {
            formData.append('existingPdfs', JSON.stringify(existingPdfs));
        }

        // Parameter and PackingData
        const transformedParameter = parameter
            .filter(({ key, value }) => key && value)
            ?.map(({ key, value }) => ({ [key]: value }));

        const transformedPackingData = packingData
            .filter(({ key, value }) => key && value)
            ?.map(({ key, value }) => ({ [key]: value }));

        // PDFs for info
        const pdfInfo = [
            ...existingPdfs?.map(pdf => ({ [pdf.key]: pdf.url })),
            ...pdfs.filter(pdf => pdf.key)?.map(pdf => ({ [pdf.key]: "" }))
        ];

        const info = {
            name,
            model,
            description,
            category,
            parameter: transformedParameter,
            packingData: transformedPackingData,
            pdf: Object.assign({}, ...pdfInfo)
        };

        formData.append('info', JSON.stringify(info));
        setLoading(true);

        try {
            const res = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/updateProduct/${item._id}`,
                formData
            );
            if (res.status === 200) {
                setProducts(res.data.data);
                nullifyPdfInput()
                const toggle = document.getElementById(`ProductUpdate-${item?._id}`);
                if (toggle) toggle.checked = false;
                setPdfs([{ key: '', file: null }]);
                Swal.fire({ icon: "success", title: "Updated Successfully" });
            } else {
                Swal.fire({ icon: "error", title: res.data?.message || "Update failed" });
            }
        } catch (err) {
            console.log('error', err);
            Swal.fire({
                icon: "error",
                title: "Error updating",
                text: err?.response?.data?.message || err?.message || "Unknown error",
            });
        } finally {
            setLoading(false);
        }
    };

    if (!item) {
        return (
            <div className='w-full h-full flex justify-center items-center'>
                <span className="loading loading-spinner loading-xl"></span>
            </div>
        );
    }

    const nullifyPdfInput = () => {
        if (fileInputRef.current) fileInputRef.current.value = null;
        pdfInputRefs.current.forEach((ref) => {
            if (ref) ref.value = null;
        });
    }

    const hanldeClose = () => {
        setImages(item.imageUrl || []);
        setName(item.name || '');
        setModel(item.model || '');
        setDescription(item.description || '');
        setCategory(item.category || '');

        // Restore parameter and packingData
        const formattedParameter =
            Array.isArray(item.parameter) && item.parameter.length > 0
                ? item.parameter?.map(obj => {
                    const key = Object.keys(obj)[0];
                    return { key, value: obj[key] };
                })
                : [{ key: '', value: '' }];
        setParameter(formattedParameter);

        const formattedPackingData =
            Array.isArray(item.packingData) && item.packingData.length > 0
                ? item.packingData?.map(obj => {
                    const key = Object.keys(obj)[0];
                    return { key, value: obj[key] };
                })
                : [{ key: '', value: '' }];
        setPackingData(formattedPackingData);

        // Restore existing PDFs
        const dbPdfs = item.pdf && typeof item.pdf === 'object' && !Array.isArray(item.pdf)
            ? Object.entries(item.pdf)?.map(([key, url]) => ({ key, url }))
            : [];
        setExistingPdfs(dbPdfs.length ? dbPdfs : []);
        setPdfs([{ key: '', file: null }]);
        nullifyPdfInput()
        const toggle = document.getElementById(`ProductUpdate-${item?._id}`);
        if (toggle) toggle.checked = false;
    }

    return createPortal(
        <div>
            <input type='checkbox' id={`ProductUpdate-${item?._id}`} className='modal-toggle peer' />
            <div className='fixed inset-0 z-[200] hidden peer-checked:flex items-center justify-center bg-safety-ink/60 backdrop-blur-sm p-4 animate-fade' role='dialog' aria-modal='true'>
                <div className='relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl animate-rise'>
                    <button
                        type='button'
                        onClick={hanldeClose}
                        className='modal-action absolute -top-6 right-4 rounded-full bg-white shadow hover:bg-gray-100 p-3'
                        aria-label='Close product update'
                    >
                        <FontAwesomeIcon icon={faXmark} size='lg' />
                    </button>

                    <div className='mb-6 border-b border-safety-border pb-4'>
                        <h2 className='text-xl font-bold text-safety-ink'>Update Product</h2>
                        <p className='mt-2 text-sm text-safety-muted'>Edit product details, upload images, and keep your product data dashboard-ready.</p>
                    </div>

                    <section className='space-y-6'>
                        <div className='grid gap-4 lg:grid-cols-[1.2fr_0.8fr]'>
                            <div className='space-y-4'>
                                <label className='block text-sm font-medium text-safety-ink'>Model Name</label>
                                <input value={model} onChange={(e) => setModel(e.target.value)} className='input input-bordered w-full' placeholder='Model Name' />

                                <label className='block text-sm font-medium text-safety-ink'>Product Name</label>
                                <input value={name} onChange={(e) => setName(e.target.value)} className='input input-bordered w-full' placeholder='Product Name' />

                                <label className='block text-sm font-medium text-safety-ink'>Description</label>
                                <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={5} className='textarea textarea-bordered w-full' placeholder='Product description' />

                                <label className='block text-sm font-medium text-safety-ink'>Category</label>
                                <select value={category} onChange={(e) => setCategory(e.target.value)} className='select select-bordered w-full'>
                                    <option disabled value=''>Select Category</option>
                                    {categories?.map((cat, i) => (
                                        <option key={i} value={cat.name}>{capitalizeWords(cat.name)}</option>
                                    ))}
                                </select>
                            </div>

                            <div className='space-y-4'>
                                <div>
                                    <div className='flex items-center justify-between'>
                                        <p className='text-sm font-medium text-safety-ink'>Current Images</p>
                                        <span className='text-xs text-gray-500'>Preview only</span>
                                    </div>
                                    <div className='mt-3 grid grid-cols-3 gap-3'>
                                        {images?.map((img, i) => (
                                            <div key={i} className='relative overflow-hidden rounded-2xl border border-safety-border bg-white shadow-sm'>
                                                <img
                                                    src={imagePreviewUrls[i]}
                                                    alt={`Preview ${i + 1}`}
                                                    loading='lazy'
                                                    className='h-24 w-full object-cover'
                                                />
                                                <button
                                                    type='button'
                                                    onClick={() => removeImage(i)}
                                                    className='absolute top-2 right-2 rounded-full bg-white/90 p-1 text-safety-red shadow'
                                                    aria-label={`Remove image ${i + 1}`}
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className='block text-sm font-medium text-safety-ink'>Upload Images</label>
                                    <input type='file' ref={fileInputRef} onChange={handleFileChange} className='file-input file-input-bordered w-full' accept='image/*' multiple />
                                </div>

                                <div className='rounded-2xl border border-safety-border bg-safety-surface p-4'>
                                    <div className='flex items-center justify-between'>
                                        <p className='text-sm font-semibold text-safety-ink'>Existing PDFs</p>
                                        <span className='text-xs text-gray-500'>Download or remove</span>
                                    </div>
                                    {existingPdfs.length > 0 ? (
                                        <div className='mt-3 space-y-2'>
                                            {existingPdfs.map((pdf) => (
                                                <div key={pdf.key} className='flex items-center justify-between gap-3 rounded-xl border border-safety-border bg-white px-3 py-2'>
                                                    <button type='button' className='inline-flex items-center gap-2 text-sm font-medium text-safety-red' onClick={() => window.open(pdf.url, '_blank')}>
                                                        <FontAwesomeIcon icon={faFilePdf} />
                                                        {pdf.key}
                                                    </button>
                                                    <button type='button' className='text-gray-400 hover:text-red-500' onClick={() => removeExistingPdf(pdf.key)}>
                                                        Remove
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className='text-sm text-gray-500 mt-2'>No PDFs are linked currently.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className='grid gap-4 lg:grid-cols-2'>
                            <div className='space-y-4'>
                                <div className='flex items-center justify-between'>
                                    <p className='text-sm font-semibold text-safety-ink'>Parameters</p>
                                    <button type='button' className='btn btn-sm btn-outline' onClick={addParameterField}>Add Field</button>
                                </div>
                                {parameter.map((spec, index) => (
                                    <div key={index} className='grid gap-3 md:grid-cols-[1fr_1fr_auto_auto]'>
                                        <input
                                            type='text'
                                            value={spec.key}
                                            onChange={(e) => handleParameter(index, 'key', e.target.value)}
                                            className='input input-bordered w-full'
                                            placeholder='Spec name'
                                        />
                                        <input
                                            type='text'
                                            value={spec.value}
                                            onChange={(e) => handleParameter(index, 'value', e.target.value)}
                                            className='input input-bordered w-full'
                                            placeholder='Spec value'
                                        />
                                        <button type='button' className='btn btn-sm btn-primary' onClick={addParameterField}>+</button>
                                        <button type='button' className='btn btn-sm btn-error' onClick={() => removeParameterField(index)}>−</button>
                                    </div>
                                ))}
                            </div>

                            <div className='space-y-4'>
                                <div className='flex items-center justify-between'>
                                    <p className='text-sm font-semibold text-safety-ink'>PDF Uploads</p>
                                    <button type='button' className='btn btn-sm btn-outline' onClick={addPdfField}>Add PDF</button>
                                </div>
                                {pdfs.map((pdf, idx) => (
                                    <div key={idx} className='grid gap-2 rounded-xl border border-safety-border bg-white p-3 md:grid-cols-[1fr_1.4fr_auto]'>
                                        <input
                                            type='text'
                                            placeholder='Key (e.g. dataSheet)'
                                            value={pdf.key}
                                            onChange={(e) => handlePdfFieldChange(idx, 'key', e.target.value.trim())}
                                            list={`pdf-keys-${item?._id}`}
                                            className='input input-bordered input-sm w-full'
                                        />
                                        <input
                                            type='file'
                                            accept='application/pdf'
                                            onChange={(e) => handlePdfFieldChange(idx, 'file', e.target.files?.[0] || null)}
                                            ref={(ref) => pdfInputRefs.current[idx] = ref}
                                            className='file-input file-input-bordered file-input-sm w-full'
                                        />
                                        <button type='button' className='btn btn-sm btn-ghost text-safety-red' onClick={() => removePdfField(idx)} aria-label='Remove PDF row'>
                                            <FontAwesomeIcon icon={faXmark} />
                                        </button>
                                        {pdf.file && (
                                            <p className='md:col-span-3 text-xs text-safety-muted truncate'>
                                                Selected: <span className='font-semibold text-safety-ink'>{pdf.file.name}</span>
                                                <span className='ml-2'>({Math.round(pdf.file.size / 1024)} KB)</span>
                                            </p>
                                        )}
                                    </div>
                                ))}
                                <datalist id={`pdf-keys-${item?._id}`}>
                                    <option value='dataSheet' />
                                    <option value='userManual' />
                                    <option value='installationGuide' />
                                    <option value='certificate' />
                                    <option value='brochure' />
                                </datalist>
                            </div>
                        </div>

                        <button onClick={handleSubmit} className='btn btn-primary w-full'>
                            {loading ? 'Updating...' : 'Save Changes'}
                        </button>
                    </section>
                </div>
            </div>
        </div>,
        document.body
    );
};
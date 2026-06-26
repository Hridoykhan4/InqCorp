import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useOutletContext } from 'react-router';
import Swal from 'sweetalert2';
import { capitalizeWords } from '../../Functions/functions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

export const ProductUpload = () => {
    const [images, setImages] = useState([]);
    const [pdfFile, setPdfFile] = useState(null); // ✅ Added for PDF
    const [name, setName] = useState('');
    const [model, setModel] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [parameter, setParameter] = useState([{ key: '', value: '' }]);
    const [packingData, setPacking_Data] = useState([{ key: '', value: '' }]);
    const [loading, setLoading] = useState(false);
    const [pdfs, setPdfs] = useState([
        { key: '', file: null }
    ]);
    const { categories, setProducts } = useOutletContext();
    const fileInputRef = useRef();
    const pdfInputRef = useRef(); // ✅ PDF ref to reset later

    const handleFileChange = (e) => {
        const incoming = Array.from(e.target.files);
        // Accumulate instead of replace — add unlimited images across multiple picks.
        setImages((prev) => {
            const seen = new Set(prev.map((f) => `${f.name}_${f.size}`));
            const merged = [...prev];
            incoming.forEach((f) => {
                const key = `${f.name}_${f.size}`;
                if (!seen.has(key)) {
                    seen.add(key);
                    merged.push(f);
                }
            });
            return merged;
        });
        // Reset input so picking the same file again still fires onChange.
        if (fileInputRef.current) fileInputRef.current.value = null;
    };

    const removeImage = (index) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    const handleParameter = (index, field, value) => {
        const newParameter = [...parameter];
        newParameter[index][field] = value;
        setParameter(newParameter);
    };
    const handlePdfChange = (idx, field, value) => {
        const updated = [...pdfs];
        updated[idx][field] = value;
        setPdfs(updated);
    };
    const addSpecField = (v) => {
        if (v == 'parameter') {
            setParameter([...parameter, { key: '', value: '' }]);
        } else if (v == 'packing data') {
            setPacking_Data([...packingData, { key: '', value: '' }]);
        } else {
            setPdfs([...pdfs, { key: '', file: null }])
        }



    }
    const removeSpecField = (index, v) => {
        if (v == 'parameter') {
            setParameter(parameter.filter((_, i) => i !== index));
        } else if (v == 'packing data') {
            setPacking_Data(packingData.filter((_, i) => i !== index));
        } else {
            setPdfs(pdfs.filter((_, i) => i != index))
        }



    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!images.length || !model || !description || !category || !parameter) {
            Swal.fire({ icon: "error", title: "Missing required fields" });
            return;
        }

        const formData = new FormData();
        images.forEach((img) => formData.append('images', img)); // 🔥 Key must match multer config
        // Append each PDF with a unique key
        pdfs.forEach((pdf) => {
            if (pdf.file && pdf.key) {
                formData.append(`pdf_${pdf.key}`, pdf.file);
            }
        });
        if (pdfFile) {
            formData.append('pdf', pdfFile); // ✅ Key matches multer field
        }

        const transformedParameter = parameter?.map(({ key, value }) => ({ [key]: value }));


        const info = {
            name,
            model,
            description,
            category,
            parameter: transformedParameter,

            pdf: pdfs.filter(p => p.key).map(pdf => ({ [pdf.key]: "" }))
        };


        formData.append('info', JSON.stringify(info));

        setLoading(true);

        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/addProduct`, formData);

            if (res.status === 200) {
                setProducts(res.data.data);
                Swal.fire({ icon: "success", title: "Uploaded Successfully" });
            }

            // Reset
            setImages([]);
            setPdfFile(null);
            setName('');
            setModel('');
            setDescription('');
            setCategory('');
            setParameter([{ key: '', value: '' }]);

            setPdfs([{ key: '', value: '' }])
            fileInputRef.current.value = null;
            if (pdfInputRef.current) pdfInputRef.current.value = null;

        } catch (err) {

            console.log('Error', err);


            Swal.fire({ icon: "error", title: "Error uploading", text: err.response.data?.message || err.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <input type="checkbox" id="my_modal_4" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto relative">
                    <label htmlFor="my_modal_4" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>

                    <section className='space-y-4'>
                        <div className='space-y-4'>
                            <input type="text" value={model} onChange={(e) => setModel(e.target.value)} className='border-2 border-gray-300 p-2 w-full' placeholder='Model Name' />
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='border-2 border-gray-300 p-2 w-full' placeholder='Product Name' />
                            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className='border-2 border-gray-300 p-2 w-full' placeholder='Description' />

                            <select value={category} onChange={(e) => setCategory(e.target.value)} className='border-2 border-gray-300 p-2 w-full'>
                                <option disabled value=''>Select Category</option>
                                {categories && categories.map((item, index) => (
                                    <option key={index} value={item.name}>{capitalizeWords(item.name)}</option>
                                ))}
                            </select>


                            <div className='space-y-2'>
                                <p>Add <span className='font-semibold'>Specification</span> Info:</p>
                                {parameter && parameter?.map((spec, index) => (
                                    <div key={index} className='grid grid-cols-1 gap-2 sm:grid-cols-[1fr_1fr_auto_auto] sm:items-center'>
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
                                        <button type='button' className='btn btn-sm btn-primary' onClick={() => addSpecField('parameter')}>+</button>
                                        <button type='button' className='btn btn-sm btn-error' onClick={() => removeSpecField(index, 'parameter')}>−</button>
                                    </div>
                                ))}

                            </div>

                            {/* <div className='space-y-2'>
                                <p>Add <span className='font-semibold'>Packing Data</span>  Info:</p>
                                {packingData.map((spec, index) => (
                                    <div key={index} className='flex space-x-3 items-center'>
                                        <input
                                            type="text"
                                            value={spec.key}
                                            onChange={(e) => handlePackingData(index, 'key', e.target.value)}
                                            className='border-2 w-1/2 border-gray-300 p-2'
                                            placeholder='Spec name'
                                        />
                                        <input
                                            type="text"
                                            value={spec.value}
                                            onChange={(e) => handlePackingData(index, 'value', e.target.value)}
                                            className='border-2 w-1/2 border-gray-300 p-2'
                                            placeholder='Spec value'
                                        />
                                        <button type='button' className='btn btn-sm btn-primary' onClick={() => addSpecField('packing data')}>+</button>
                                        <button type='button' className='btn btn-sm btn-error' onClick={() => removeSpecField(index, 'packing data')}>−</button>
                                    </div>
                                ))}

                            </div> */}


                            {/* 🔥 Image Upload Field — add unlimited, accumulates */}
                            <div className='space-y-3'>
                                <label
                                    htmlFor='productImages'
                                    className='flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-6 text-center transition hover:border-cyan-400 hover:bg-cyan-50'
                                >
                                    <FontAwesomeIcon icon={faImage} size='2xl' className='text-cyan-500' />
                                    <span className='text-sm font-semibold text-gray-700'>
                                        Click to add images
                                    </span>
                                    <span className='text-xs text-gray-400'>
                                        Add as many as you want — selections stack up
                                    </span>
                                    <input
                                        id='productImages'
                                        type='file'
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        className='hidden'
                                        accept='image/*'
                                        multiple
                                    />
                                </label>

                                {images.length > 0 && (
                                    <div className='grid grid-cols-3 gap-3 sm:grid-cols-4'>
                                        {images.map((file, idx) => (
                                            <div
                                                key={`${file.name}_${file.size}_${idx}`}
                                                className='group relative aspect-square overflow-hidden rounded-lg border border-gray-200 bg-white'
                                            >
                                                <img
                                                    src={URL.createObjectURL(file)}
                                                    alt={file.name}
                                                    className='h-full w-full object-cover'
                                                />
                                                <button
                                                    type='button'
                                                    onClick={() => removeImage(idx)}
                                                    aria-label='Remove image'
                                                    className='absolute right-1 top-1 grid h-6 w-6 place-items-center rounded-full bg-red-600 text-xs font-bold text-white opacity-0 shadow transition group-hover:opacity-100'
                                                >
                                                    ✕
                                                </button>
                                                {idx === 0 && (
                                                    <span className='absolute bottom-1 left-1 rounded bg-black/60 px-1.5 py-0.5 text-[9px] font-bold uppercase text-white'>
                                                        Cover
                                                    </span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {images.length > 0 && (
                                    <p className='text-xs text-gray-500'>{images.length} image(s) selected</p>
                                )}
                            </div>

                            {/* ✅ PDF Upload Field */}
                            {/* <div className='flex space-x-3'>
                                <p>Upload PDF</p>
                                <input
                                    type="file"
                                    ref={pdfInputRef}
                                    onChange={(e) => setPdfFile(e.target.files[0])}
                                    className='border-2 border-gray-300 p-2 w-full'
                                    accept="application/pdf"
                                />
                            </div> */}



                            {pdfs?.map((pdf, idx) => (
                                <div key={idx} className='grid grid-cols-1 gap-2 sm:grid-cols-[1fr_1fr_auto_auto] sm:items-center'>
                                    <input
                                        type='text'
                                        placeholder='PDF Type (e.g. dataSheet)'
                                        value={pdf.key}
                                        onChange={(e) => handlePdfChange(idx, 'key', e.target.value)}
                                        className='input input-bordered w-full'
                                    />
                                    <input
                                        type='file'
                                        accept='application/pdf'
                                        onChange={(e) => handlePdfChange(idx, 'file', e.target.files[0])}
                                        className='file-input file-input-bordered w-full'
                                    />
                                    <button type='button' className='btn btn-sm btn-primary' onClick={() => addSpecField('pdf field')}>+</button>
                                    <button type='button' className='btn btn-sm btn-error' onClick={() => removeSpecField(idx, 'pdf field')}>−</button>
                                </div>
                            ))}
                        </div>

                        <button
                            disabled={(!model || !description || !category || !images.length || loading)}
                            onClick={handleSubmit}
                            className='btn btn-secondary w-full'>
                            Upload {loading && <span className="loading loading-spinner loading-sm"></span>}
                        </button>
                    </section>
                </div>
            </div>
        </div>
    );
};

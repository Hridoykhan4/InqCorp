import React, { useMemo } from 'react'
import { useNavigate, useOutletContext } from 'react-router'
import { capitalizeWords, urlConverter } from '../../Functions/functions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faPlus,
    faPenToSquare,
    faTrash,
    faLayerGroup,
} from '@fortawesome/free-solid-svg-icons'
import { ImageModal } from '../FileUpload/ImageModal'
import { UpdateCategory } from '../Update/CategoryUpdate'
import axios from 'axios'
import Swal from 'sweetalert2'

const FALLBACK_IMG =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png'

const getImage = (item) => {
    if (Array.isArray(item?.imageUrl)) return item.imageUrl[0] || FALLBACK_IMG
    return item?.imageUrl || FALLBACK_IMG
}

export const DashboardCategories = () => {
    const { categories, setCategories, products } = useOutletContext()
    const navigate = useNavigate()

    const counts = useMemo(() => {
        const map = new Map()
        ;(products || []).forEach((p) => {
            const k = (p?.category || '').toLowerCase()
            map.set(k, (map.get(k) || 0) + 1)
        })
        return map
    }, [products])

    const handleClick = (item) => {
        navigate(`/category/${urlConverter(item?.name)}`)
    }

    const handleDelete = (item, e) => {
        e?.stopPropagation?.()
        if (!item) {
            Swal.fire('Nothing selected', '', 'info')
            return
        }
        Swal.fire({
            title: `Delete category "${item.name}"?`,
            text: 'Products in this category will not be deleted, but will lose this category link.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            confirmButtonColor: '#d33',
        }).then((result) => {
            if (!result.isConfirmed) return
            axios
                .delete(`${import.meta.env.VITE_BACKEND_URL}/api/deleteCategory`, {
                    data: { id: item._id },
                })
                .then((res) => {
                    Swal.fire('Deleted', `${item.name} removed.`, 'success')
                    setCategories(res.data.data)
                })
                .catch((error) => {
                    Swal.fire(
                        'Error',
                        error?.response?.data?.message || error.message,
                        'error'
                    )
                })
        })
    }

    return (
        <div className='space-y-5 p-2 sm:p-3'>
            <div className='flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-safety-border bg-white p-4 shadow-sm'>
                <div>
                    <p className='text-[11px] font-bold uppercase tracking-[0.22em] text-safety-red'>
                        <FontAwesomeIcon icon={faLayerGroup} className='mr-1.5' />
                        Catalogue
                    </p>
                    <h2 className='mt-1 text-lg font-extrabold text-safety-ink sm:text-xl'>
                        Product Categories
                    </h2>
                    <p className='text-xs text-safety-muted'>
                        {categories?.length || 0} categor{(categories?.length || 0) === 1 ? 'y' : 'ies'} live on the storefront.
                    </p>
                </div>

                <label
                    htmlFor='my_modal_3'
                    className='inline-flex cursor-pointer items-center gap-2 rounded-full bg-safety-red px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-safety-red-dark'
                >
                    <FontAwesomeIcon icon={faPlus} />
                    Add Category
                </label>
            </div>

            {!categories ? (
                <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div
                            key={i}
                            className='skeleton h-56 w-full rounded-2xl'
                        />
                    ))}
                </div>
            ) : categories.length === 0 ? (
                <div className='rounded-2xl border border-dashed border-safety-border bg-white py-16 text-center'>
                    <FontAwesomeIcon icon={faLayerGroup} className='text-5xl text-safety-border' />
                    <h3 className='mt-3 text-lg font-bold text-safety-ink'>No categories yet</h3>
                    <p className='mt-1 text-sm text-safety-muted'>
                        Add your first product category to organise the catalogue.
                    </p>
                    <label
                        htmlFor='my_modal_3'
                        className='mt-4 inline-flex cursor-pointer items-center gap-2 rounded-full bg-safety-red px-5 py-2.5 text-sm font-bold text-white'
                    >
                        <FontAwesomeIcon icon={faPlus} />
                        Add Category
                    </label>
                </div>
            ) : (
                <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
                    {categories.map((item) => {
                        const count = counts.get((item?.name || '').toLowerCase()) || 0
                        return (
                            <article
                                key={item._id}
                                className='group relative overflow-hidden rounded-2xl border border-safety-border bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-xl'
                            >
                                <button
                                    type='button'
                                    onClick={() => handleClick(item)}
                                    className='block w-full text-left'
                                >
                                    <div className='relative aspect-[16/10] overflow-hidden bg-safety-surface'>
                                        <img
                                            src={getImage(item)}
                                            alt={item?.name || 'Category'}
                                            loading='lazy'
                                            className='h-full w-full object-cover transition duration-500 group-hover:scale-105'
                                        />
                                        <div className='absolute inset-0 bg-gradient-to-t from-safety-ink/70 via-safety-ink/10 to-transparent' />
                                        <span className='absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-safety-red shadow-sm'>
                                            {count} product{count !== 1 ? 's' : ''}
                                        </span>
                                        <div className='absolute inset-x-3 bottom-3'>
                                            <p className='text-base font-extrabold leading-tight text-white sm:text-lg'>
                                                {capitalizeWords(item?.name)}
                                            </p>
                                            <p className='text-[11px] text-white/80'>Tap to manage</p>
                                        </div>
                                    </div>
                                </button>

                                <div className='flex items-center justify-between gap-2 px-4 py-3'>
                                    <label
                                        htmlFor={`updateCategory-${item.name}`}
                                        className='inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-safety-border bg-white px-3 py-1.5 text-xs font-semibold text-safety-ink transition hover:border-safety-red hover:text-safety-red'
                                    >
                                        <FontAwesomeIcon icon={faPenToSquare} className='text-[10px]' />
                                        Update
                                    </label>
                                    <button
                                        type='button'
                                        onClick={(e) => handleDelete(item, e)}
                                        className='inline-flex items-center gap-1.5 rounded-md bg-safety-red px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-safety-red-dark'
                                    >
                                        <FontAwesomeIcon icon={faTrash} className='text-[10px]' />
                                        Delete
                                    </button>
                                </div>

                                <UpdateCategory item={item} />
                            </article>
                        )
                    })}
                </div>
            )}

            <ImageModal />
        </div>
    )
}

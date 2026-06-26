import React from 'react'
import { capitalizeWords } from '../Functions/functions'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useLocation, useNavigate, useOutletContext } from 'react-router'
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faTag, faBarcode } from '@fortawesome/free-solid-svg-icons'

export const ProductDetails = ({ item }) => {
    const admin = useSelector((state) => state.hvac.users)
    const { setProducts } = useOutletContext()
    const navigate = useNavigate()
    const location = useLocation()
    const isDashboard = location.pathname.startsWith('/dashboard')

    const handleDelete = () => {
        if (!item?._id) {
            Swal.fire({ title: 'Not Found', icon: 'error' })
            return
        }
        Swal.fire({
            title: `Delete ${item?.name || item?.model}?`,
            text: 'This cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            confirmButtonColor: '#d33',
        }).then((result) => {
            if (!result.isConfirmed) return
            axios
                .delete(`${import.meta.env.VITE_BACKEND_URL}/api/deleteProduct`, { data: { id: item._id } })
                .then((res) => {
                    if (res.status === 200) {
                        setProducts(res.data.data)
                        Swal.fire('Deleted', res.data.message || '', 'success')
                        navigate(isDashboard ? '/dashboard/products' : '/all-products')
                    }
                })
                .catch((err) =>
                    Swal.fire('Error', err?.response?.data?.message || err.message, 'error')
                )
        })
    }

    const params = Array.isArray(item?.parameter) ? item.parameter : []

    return (
        <div className='space-y-5'>
            <div className='space-y-2'>
                <h2 className='text-2xl font-extrabold leading-tight text-safety-ink sm:text-3xl'>
                    {item?.name || item?.model || 'Product'}
                </h2>
                <div className='flex flex-wrap items-center gap-2'>
                    {item?.category && (
                        <span className='inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-safety-red'>
                            <FontAwesomeIcon icon={faTag} className='text-[10px]' />
                            {capitalizeWords(item.category)}
                        </span>
                    )}
                    {item?.model && (
                        <span className='inline-flex items-center gap-1.5 rounded-full bg-safety-surface px-3 py-1 text-xs font-semibold text-safety-ink'>
                            <FontAwesomeIcon icon={faBarcode} className='text-[10px]' />
                            {String(item.model).toUpperCase()}
                        </span>
                    )}
                </div>
            </div>

            {item?.description && (
                <p className='rounded-2xl bg-safety-surface p-4 text-sm leading-7 text-safety-ink sm:text-base'>
                    {item.description}
                </p>
            )}

            {params.length > 0 && (
                <div className='rounded-2xl border border-safety-border bg-white p-4 sm:p-5'>
                    <p className='mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-safety-red'>
                        Specifications
                    </p>
                    <dl className='divide-y divide-safety-border'>
                        {params.map((p, i) => {
                            const k = Object.keys(p || {})[0]
                            const v = k ? p[k] : ''
                            if (!k) return null
                            return (
                                <div
                                    key={i}
                                    className='flex flex-col gap-1 py-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6'
                                >
                                    <dt className='text-xs font-semibold uppercase tracking-wider text-safety-muted sm:w-2/5 sm:text-sm sm:normal-case sm:tracking-normal sm:text-safety-ink'>
                                        {k}
                                    </dt>
                                    <dd className='text-sm text-safety-ink sm:w-3/5 sm:text-right sm:text-safety-muted'>
                                        {v}
                                    </dd>
                                </div>
                            )
                        })}
                    </dl>
                </div>
            )}

            {admin && isDashboard && (
                <button
                    type='button'
                    onClick={handleDelete}
                    className='btn btn-error btn-sm w-full sm:w-auto'
                >
                    <FontAwesomeIcon icon={faTrash} className='mr-2' />
                    Delete Product
                </button>
            )}
        </div>
    )
}

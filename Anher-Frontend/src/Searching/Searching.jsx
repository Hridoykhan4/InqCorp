import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export const Searching = ({ search, setSearch }) => {
    return (
        <div className='container-page py-3 sm:py-5'>
            <div className='mx-auto w-full max-w-3xl'>
                <div className='flex items-center gap-2 rounded-full border border-safety-border bg-white px-3 py-1.5 shadow-sm transition focus-within:border-safety-red focus-within:ring-2 focus-within:ring-safety-red/20 sm:px-4 sm:py-2'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className='text-sm text-safety-red sm:text-base' />
                    <input
                        type='text'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder='Search products…'
                        className='min-w-0 flex-1 bg-transparent py-1 text-sm text-safety-ink outline-none placeholder:text-safety-muted sm:text-base'
                    />
                    {search && (
                        <button
                            type='button'
                            onClick={() => setSearch('')}
                            aria-label='Clear search'
                            className='grid h-7 w-7 shrink-0 place-items-center rounded-full text-safety-muted transition hover:bg-safety-surface hover:text-safety-red'
                        >
                            <FontAwesomeIcon icon={faXmark} className='text-xs' />
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

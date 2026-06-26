import { useOutletContext } from 'react-router-dom'
import { InquiryModal } from './Inquiry Modal/InquiryModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

const ProductAccordion = ({ item }) => {
    useOutletContext()

    const handleModal = () => {
        setTimeout(() => {
            const el = document.getElementById('inquiryModal')
            if (el) el.checked = true
        }, 100)
    }

    // Specifications live in ProductDetails (single source) — no duplicate here.
    return (
        <div className='overflow-hidden rounded-2xl border border-safety-border bg-gradient-to-br from-safety-surface to-white'>
            <div className='flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6'>
                <div>
                    <p className='text-base font-extrabold text-safety-ink'>
                        Need a custom configuration or bulk pricing?
                    </p>
                    <p className='mt-1 text-sm text-safety-muted'>
                        Our engineering team replies fast with quotes and datasheets.
                    </p>
                </div>
                <button
                    onClick={handleModal}
                    className='inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-safety-red px-6 py-3 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-safety-red-dark'
                >
                    Send Inquiry
                    <FontAwesomeIcon icon={faPaperPlane} className='text-xs' />
                </button>
            </div>
            {item && <InquiryModal item={item} />}
        </div>
    )
}

export default ProductAccordion

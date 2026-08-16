import { Blog } from '../../Blog/Blog'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { BlogUpload } from '../FileUpload/BlogUpload'
import { useOutletContext } from 'react-router-dom'

export const DashboardBlog = () => {
    const { blogs } = useOutletContext()
    return (
        <div className='w-full space-y-5'>
            <div className='flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-brand-border bg-white p-4 shadow-sm sm:p-5'>
                <div><p className='text-[10px] font-black uppercase tracking-[.18em] text-brand-accent'>Editorial content</p><p className='mt-1 text-sm font-bold text-brand-ink'>{blogs?.length || 0} article{blogs?.length === 1 ? '' : 's'} available</p></div>
                <button className='inline-flex min-h-10 items-center gap-2 rounded-xl bg-brand-primary px-4 text-xs font-extrabold text-white' onClick={() => { const modal = document.getElementById('BlogUpload'); if (modal) modal.checked = true }} >Add article <FontAwesomeIcon icon={faPlus} /></button>
            </div>
            <BlogUpload></BlogUpload>
            <Blog  ></Blog>

        </div>
    )
}

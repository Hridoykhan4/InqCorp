import { COMPANY } from '../SEO/companyInfo'

const MESSAGE = 'Hello ITC, I would like to discuss a material requirement.'

export const ContactDock = () => {
  const phone = String(COMPANY.phoneTel || '').replace(/\D/g, '')
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(MESSAGE)}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full border-[5px] border-[#d9f4e7] bg-[#187f5b] text-white shadow-[0_18px_45px_-18px_rgba(24,127,91,.8)] transition hover:-translate-y-1 hover:bg-[#126d4d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#187f5b] focus-visible:ring-offset-4 sm:bottom-7 sm:right-7 sm:h-16 sm:w-16"
      aria-label="Discuss a requirement with ITC on WhatsApp"
      title="Chat with ITC"
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6 sm:h-7 sm:w-7" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9.3 9.3 0 0 1-3.8-.9L3 20.5l1.5-4.7A8.4 8.4 0 1 1 21 11.5Z" />
        <path d="M8.4 8.3c.5 3.4 2.4 5.3 5.8 5.8" />
        <path d="m8.4 8.3 1.7-.5.8 2-1.2 1M14.2 14.1l.5-1.7-2-.8-1 1.2" />
      </svg>
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full border border-brand-border bg-white px-3 py-2 text-[11px] font-extrabold text-brand-ink shadow-lg group-hover:block sm:block sm:opacity-0 sm:transition sm:group-hover:opacity-100">Chat with ITC</span>
    </a>
  )
}

export default ContactDock

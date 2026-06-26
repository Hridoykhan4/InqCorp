import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { COMPANY } from '../SEO/companyInfo'
import {
  faDownload,
  faEnvelopeOpenText,
  faFilePdf,
  faPhone,
  faShieldHalved,
  faTruck,
  faAward,
} from '@fortawesome/free-solid-svg-icons'

const TRUST_POINTS = [
  {
    icon: faShieldHalved,
    title: 'Certified Quality',
    body: 'SafetyPlus products meet local industrial and fire safety standards.',
  },
  {
    icon: faTruck,
    title: 'Nationwide Delivery',
    body: 'Bulk dispatch across Bangladesh with project-ready lead times.',
  },
  {
    icon: faAward,
    title: 'Project Support',
    body: 'Engineering team helps you spec the right product for your site.',
  },
]

export const ProductInfo = ({ item }) => {
  const pdfEntries =
    item?.pdf && typeof item.pdf === 'object' && !Array.isArray(item.pdf)
      ? Object.entries(item.pdf).filter(([k, v]) => k && v)
      : []

  return (
    <div className='space-y-6'>
      <div>
        <p className='text-xs font-bold uppercase tracking-[0.22em] text-safety-red'>
          Resources & Support
        </p>
        <h3 className='mt-2 text-xl font-extrabold text-safety-ink sm:text-2xl'>
          Everything you need to specify this product
        </h3>
      </div>

      <div className='grid gap-4 lg:grid-cols-[1.1fr_0.9fr]'>
        <div className='rounded-2xl border border-safety-border bg-safety-surface/60 p-5'>
          <div className='flex items-center gap-2'>
            <FontAwesomeIcon icon={faFilePdf} className='text-safety-red' />
            <p className='text-sm font-bold text-safety-ink'>
              Documents
            </p>
          </div>

          {pdfEntries.length > 0 ? (
            <div className='mt-4 space-y-2'>
              {pdfEntries.map(([key, url]) => (
                <a
                  key={key}
                  href={url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group flex items-center justify-between gap-3 rounded-xl border border-safety-border bg-white px-4 py-3 transition hover:border-safety-red'
                >
                  <span className='flex items-center gap-3'>
                    <span className='grid h-9 w-9 place-items-center rounded-lg bg-safety-red/10 text-safety-red'>
                      <FontAwesomeIcon icon={faFilePdf} />
                    </span>
                    <span>
                      <span className='block text-sm font-bold text-safety-ink'>
                        {key.replace(/_/g, ' ').toUpperCase()}
                      </span>
                      <span className='block text-xs text-safety-muted'>
                        PDF document
                      </span>
                    </span>
                  </span>
                  <FontAwesomeIcon
                    icon={faDownload}
                    className='text-safety-muted transition group-hover:text-safety-red'
                  />
                </a>
              ))}
            </div>
          ) : (
            <div className='mt-4 rounded-xl border border-dashed border-safety-border bg-white p-5 text-center'>
              <p className='text-sm font-semibold text-safety-ink'>
                Spec sheet on request
              </p>
              <p className='mt-1 text-xs text-safety-muted'>
                Our engineering team will share the latest datasheet and
                drawings tailored to your project.
              </p>
              <a
                href={`mailto:${COMPANY.email}`}
                className='mt-3 inline-flex items-center gap-2 text-sm font-bold text-safety-red hover:underline'
              >
                <FontAwesomeIcon icon={faEnvelopeOpenText} />
                Request datasheet
              </a>
            </div>
          )}
        </div>

        <div className='rounded-2xl border border-safety-red/30 bg-gradient-to-br from-safety-red to-safety-red-dark p-5 text-white shadow-lg'>
          <p className='text-[11px] font-bold uppercase tracking-[0.22em] text-white/80'>
            Talk to a specialist
          </p>
          <h4 className='mt-2 text-lg font-extrabold leading-tight sm:text-xl'>
            Get pricing for {item?.name || 'this product'}
          </h4>
          <p className='mt-2 text-sm text-white/85'>
            Bulk orders, customisation, and installation guidance available for
            B2B buyers.
          </p>
          <div className='mt-4 flex flex-col gap-2 sm:flex-row'>
            <a
              href={`tel:${COMPANY.phoneTel}`}
              className='inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-safety-red transition hover:bg-white/90'
            >
              <FontAwesomeIcon icon={faPhone} />
              Call Now
            </a>
            <a
              href={`mailto:${COMPANY.email}`}
              className='inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white/10'
            >
              <FontAwesomeIcon icon={faEnvelopeOpenText} />
              Email Sales
            </a>
          </div>
        </div>
      </div>

      <div className='grid gap-3 sm:grid-cols-3'>
        {TRUST_POINTS.map((t) => (
          <div
            key={t.title}
            className='rounded-2xl border border-safety-border bg-white p-4 shadow-sm'
          >
            <span className='grid h-10 w-10 place-items-center rounded-xl bg-safety-red/10 text-safety-red'>
              <FontAwesomeIcon icon={t.icon} />
            </span>
            <p className='mt-3 text-sm font-bold text-safety-ink'>{t.title}</p>
            <p className='mt-1 text-xs leading-5 text-safety-muted'>{t.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

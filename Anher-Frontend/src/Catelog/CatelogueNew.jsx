import React, { useEffect, useState } from 'react'
import { faArrowUpRightFromSquare, faBookOpen, faDownload, faEye, faFilePdf } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { SeoManager } from '../SEO/SeoManager'
import AOS from 'aos'
import 'aos/dist/aos.css'

/**
 * Catalogue Page - Professional PDF catalogue browser for Bangladesh marketplace
 * Features: Responsive grid, graceful handling of multiple catalogues, modern design
 * Customization notes:
 * - The grid automatically adjusts columns based on screen size
 * - Max 1 catalogue per row on mobile, 2 on tablet, 3+ on desktop
 * - Each catalogue card has hover effects and click-to-view functionality
 * - Categories can be added to group catalogues (commented out for now)
 */

export const Catelogue = () => {
    const [catalogues, setCatalogues] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchCatalogues()
        AOS.init({ duration: 900, offset: 80, once: true })
    }, [])

    const fetchCatalogues = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getCatalogues`)
            setCatalogues(Array.isArray(response.data) ? response.data : [])
        } catch (error) {
            console.error('Error fetching catalogues:', error)
            setCatalogues([])
        } finally {
            setLoading(false)
        }
    }

    const getSafeFileName = (title) => {
        return `${title || 'SafetyPlus Catalogue'}.pdf`
            .replace(/[\\/:*?"<>|]+/g, '')
            .replace(/\s+/g, '-')
    }

    const openCatalogue = (pdfUrl, title) => {
        if (!pdfUrl) return

        const cleanedTitle = title?.trim() || 'SafetyPlus Catalogue'
        console.log(`Opening catalogue: ${cleanedTitle}`)
        window.open(pdfUrl, '_blank', 'noopener,noreferrer')
    }

    const downloadCatalogue = async (event, pdfUrl, title) => {
        event?.stopPropagation?.()

        if (!pdfUrl) return

        try {
            const response = await fetch(pdfUrl, { cache: 'no-store' })
            if (!response.ok) {
                throw new Error(`Failed to download catalogue: ${response.status}`)
            }

            const blob = await response.blob()
            const blobUrl = window.URL.createObjectURL(blob)
            const fileName = getSafeFileName(title)
            const anchor = document.createElement('a')
            anchor.href = blobUrl
            anchor.download = fileName
            anchor.rel = 'noopener noreferrer'
            anchor.style.display = 'none'
            document.body.appendChild(anchor)
            anchor.click()
            document.body.removeChild(anchor)

            setTimeout(() => window.URL.revokeObjectURL(blobUrl), 1000)
        } catch (error) {
            console.error('Error downloading catalogue:', error)
            window.open(pdfUrl, '_blank', 'noopener,noreferrer')
        }
    }

    const handleCatalogueKeyDown = (event, pdfUrl, title) => {
        if (event.target !== event.currentTarget) return

        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            openCatalogue(pdfUrl, title)
        }
    }

    // Extract unique categories - can be customized to match your data structure
    // const categories = ['all', ...new Set(catalogues.map((cat) => cat?.category || 'Other'))]

    // Filter catalogues by selected category - kept for future use
    // const filteredCatalogues =
    //   selectedCategory === 'all'
    //     ? catalogues
    //     : catalogues.filter((cat) => cat?.category === selectedCategory)

    const filteredCatalogues = catalogues
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white to-safety-surface">
                <div className="space-y-4 text-center">
                    <div className="flex justify-center">
                        <div className="w-16 h-16 border-4 border-safety-border rounded-full animate-spin border-t-safety-red"></div>
                    </div>
                    <p className="text-safety-muted font-semibold">Loading catalogues...</p>
                </div>
            </div>
        )
    }

    return (
        <section className="space-y-10 py-16 px-5 overflow-hidden min-h-screen bg-gradient-to-br from-white via-safety-surface to-white">
            <SeoManager
                title="Product Catalogues | SafetyPlus Bangladesh"
                description="View SafetyPlus catalogues for fire doors, hose cabinets, DB boxes, industrial racks, lockers, cabinets, and protective garments. Built for engineers, contractors, and procurement buyers in Bangladesh."
                path="/catalogue"
                keywords="SafetyPlus catalogue, fire safety catalogue, fire door catalogue, hose cabinet, DB box, industrial racks Bangladesh"
                structuredData={{
                    '@context': 'https://schema.org',
                    '@type': 'CollectionPage',
                    name: 'SafetyPlus Catalogues',
                    description: 'Fire safety and industrial equipment catalogues with technical specifications',
                    url: `${import.meta.env.VITE_SITE_URL || 'https://safetyplusbd.com'}/catalogue`,
                }}
            />

            {/* Hero Section */}
            <div className="hero-panel mx-auto max-w-[1340px]" data-aos="fade-up" data-aos-duration="800">
                <div className="text-center space-y-6">
                    <p className="section-tagline">Quick Catalogue Preview</p>
                    <h1 className="heading-xl">SafetyPlus Product Catalogues</h1>
                    <p className="body-lead max-w-3xl mx-auto">
                        Click any card to preview a catalogue in a new tab, or use the download button for offline access on desktop and mobile.
                    </p>
                </div>
            </div>

            {/* Category Filter - Commented out but ready for use */}
            {/* 
      {categories.length > 1 && (
        <div className="max-w-[1340px] mx-auto space-y-4" data-aos="fade-up">
          <p className="text-sm font-semibold text-safety-muted uppercase tracking-[0.12em]">
            Filter by Category
          </p>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`feature-pill transition ${
                  selectedCategory === cat
                    ? 'border-safety-red text-safety-red bg-safety-red/10'
                    : 'border-safety-border'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}
      */}

            {/* Catalogues Grid */}
            <div className="max-w-[1340px] mx-auto">
                {filteredCatalogues.length > 0 ? (
                    <div
                        className={
                            filteredCatalogues.length === 1
                                ? 'flex justify-center'
                                : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'
                        }
                    >
                        {filteredCatalogues.map((catalogue, index) => (
                            <div
                                key={`${catalogue?._id || index}`}
                                className={`group ${filteredCatalogues.length === 1 ? 'w-full max-w-xl' : ''}`}
                                data-aos="fade-up"
                                data-aos-duration="800"
                                data-aos-delay={index * 100}
                            >
                                {/* Catalogue Card */}
                                <div
                                    role={catalogue?.pdfUrl ? 'button' : undefined}
                                    tabIndex={catalogue?.pdfUrl ? 0 : undefined}
                                    aria-label={catalogue?.pdfUrl ? `View catalogue: ${catalogue?.title || 'Product Catalogue'}` : undefined}
                                    onClick={() => openCatalogue(catalogue?.pdfUrl, catalogue?.title)}
                                    onKeyDown={(event) => handleCatalogueKeyDown(event, catalogue?.pdfUrl, catalogue?.title)}
                                    className={`relative h-full flex flex-col space-y-4 rounded-2xl border border-safety-border bg-white p-5 shadow-sm transition duration-500 focus:outline-none focus:ring-4 focus:ring-safety-red/20 ${catalogue?.pdfUrl ? 'cursor-pointer hover:-translate-y-1 hover:border-safety-red/40 hover:shadow-[0_30px_70px_-20px_rgba(185,28,28,0.25)]' : 'opacity-80'}`}
                                >
                                    <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 rounded-t-2xl bg-gradient-to-r from-safety-red to-safety-amber transition-transform duration-500 group-hover:scale-x-100" />
                                    {/* Image Container */}
                                    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-safety-surface via-white to-safety-surface h-[280px] md:h-[320px] w-full">
                                        <img
                                            src={catalogue?.imageUrl || '/pdf/HVAC-Image.jpg.jpeg'}
                                            alt={catalogue?.title || 'SafetyPlus Catalogue'}
                                            className="w-full h-full object-contain p-4 group-hover:scale-110 transition duration-500"
                                            loading="lazy"
                                        />


                                        {/* Category Badge - Optional */}
                                        {catalogue?.category && (
                                            <div className="absolute top-3 left-3 bg-safety-ink/80 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.12em] backdrop-blur-sm">
                                                {catalogue.category}
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 flex flex-col space-y-3">
                                        {/* Title */}
                                        <h3 className="text-lg font-bold text-safety-ink line-clamp-2 group-hover:text-safety-red transition">
                                            {catalogue?.title || 'Product Catalogue'}
                                        </h3>

                                        {/* Description - Optional */}
                                        {catalogue?.description && (
                                            <p className="text-sm text-safety-muted line-clamp-2">{catalogue.description}</p>
                                        )}

                                        {/* Meta Info */}
                                        <div className="flex flex-wrap gap-3 text-xs text-safety-muted pt-2 border-t border-safety-border">
                                            <span className="inline-flex items-center gap-1.5">
                                                <FontAwesomeIcon icon={faFilePdf} className="text-safety-red" />
                                                PDF Catalogue
                                            </span>
                                            {catalogue?.pages && (
                                                <span className="inline-flex items-center gap-1.5">
                                                    <FontAwesomeIcon icon={faBookOpen} className="text-safety-red" />
                                                    {catalogue.pages} Pages
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <button
                                            type="button"
                                            onClick={(event) => {
                                                event.stopPropagation()
                                                openCatalogue(catalogue?.pdfUrl, catalogue?.title)
                                            }}
                                            className={`inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-bold uppercase tracking-[0.12em] transition ${catalogue?.pdfUrl ? 'bg-safety-red text-white shadow-[0_16px_35px_-18px_rgba(185,28,28,0.9)] hover:bg-safety-red-dark hover:shadow-[0_22px_45px_-18px_rgba(185,28,28,0.75)]' : 'cursor-not-allowed border border-safety-border bg-safety-surface text-safety-muted'}`}
                                            disabled={!catalogue?.pdfUrl}
                                        >
                                            <FontAwesomeIcon icon={catalogue?.pdfUrl ? faEye : faFilePdf} />
                                            {catalogue?.pdfUrl ? 'View Catalogue' : 'Coming Soon'}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={(event) => {
                                                event.stopPropagation()
                                                downloadCatalogue(event, catalogue?.pdfUrl, catalogue?.title)
                                            }}
                                            className={`inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-bold uppercase tracking-[0.12em] transition ${catalogue?.pdfUrl ? 'border-safety-border bg-white text-safety-ink hover:border-safety-red hover:bg-safety-red/10 hover:text-safety-red' : 'cursor-not-allowed border-safety-border bg-safety-surface text-safety-muted'}`}
                                            disabled={!catalogue?.pdfUrl}
                                            aria-label={`Download catalogue: ${catalogue?.title || 'Product Catalogue'}`}
                                            title="Download catalogue"
                                        >
                                            <FontAwesomeIcon icon={faDownload} />
                                            Download
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Empty State */
                    <div className="section-panel text-center py-16 space-y-4">
                        <div className="text-6xl">📋</div>
                        <h3 className="text-xl font-bold text-safety-ink">No Catalogues Available</h3>
                        <p className="text-safety-muted max-w-md mx-auto">
                            Catalogues will be added soon. Please check back later or contact us for more information.
                        </p>
                    </div>
                )}
            </div>

            {/* Info Section */}
            <div className="max-w-[1340px] mx-auto">
                <div className="bg-safety-surface rounded-[24px] border-2 border-safety-border p-8 md:p-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Left Content */}
                        <div className="space-y-4" data-aos="fade-right">
                            <h2 className="heading-lg text-2xl">About Our Catalogues</h2>
                            <p className="body-lead">
                                Our comprehensive product catalogues include detailed specifications, installation guides, technical
                                datasheets, and maintenance procedures. All documents are optimized for both digital and print viewing.
                            </p>
                            {/* Customization: Update supported products list */}
                            <div className="space-y-2 pt-4">
                                <p className="font-semibold text-safety-ink">Included in our catalogues:</p>
                                <ul className="space-y-1 text-sm text-safety-muted">
                                    <li>✓ Complete product specifications and dimensions</li>
                                    <li>✓ Technical performance data and ratings</li>
                                    <li>✓ Installation and commissioning guidelines</li>
                                    <li>✓ Maintenance schedules and procedures</li>
                                    <li>✓ Warranty information</li>
                                    <li>✓ Contact and support details for Bangladesh</li>
                                </ul>
                            </div>
                        </div>

                        {/* Right Content - Contact CTA */}
                        <div className="space-y-4" data-aos="fade-left">
                            <h2 className="heading-lg text-2xl">Need a Custom Catalogue?</h2>
                            <p className="body-lead">
                                Looking for specific product information or a custom catalogue for your project? Our technical team is
                                ready to help you find exactly what you need.
                            </p>
                            <div className="space-y-3 pt-4">
                                <a href="/contact" className="cta-button inline-block">
                                    Request Custom Catalogue
                                </a>
                                <p className="text-xs text-safety-muted">
                                    {/* Customization: Update response time */}
                                    Response within 2 hours during business hours
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

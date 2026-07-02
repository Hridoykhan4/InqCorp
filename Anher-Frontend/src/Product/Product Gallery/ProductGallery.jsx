import React, { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight, faTimes, faExpand } from '@fortawesome/free-solid-svg-icons'
import 'aos/dist/aos.css'

/**
 * ProductGallery - Professional product image gallery with lightbox
 * Features: Zoom on desktop, touch-swipe on mobile, responsive thumbnails, fullscreen modal
 * Customization notes:
 * - Adjust mainHeight and thumbHeight for different aspect ratios
 * - Change animationDuration for faster/slower transitions
 * - Modify borderRadius for different card styles
 */
export const ProductGallery = ({ item }) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isLightboxOpen, setIsLightboxOpen] = useState(false)
    const [zoomLevel, setZoomLevel] = useState(1)
    const [panPosition, setPanPosition] = useState({ x: 0, y: 0 })
    const [isDragging, setIsDragging] = useState(false)
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
    const lightboxRef = useRef(null)

    // Configuration - can be customized
    const config = {
        mainHeight: 'h-[300px] sm:h-[400px] md:h-[520px]',
        thumbHeight: 'h-20 md:h-24',
        borderRadius: 'rounded-[24px]',
        animationDuration: 300,
        thumbColumns: 'grid-cols-5 md:grid-cols-6 lg:grid-cols-7',
    }

    const images = item?.imageUrl || []

    // Handle image navigation
    const goToPrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    }

    const goToNext = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    }

    const goToImage = (idx) => {
        setCurrentIndex(idx)
    }

    // Lightbox handlers
    const openLightbox = () => {
        setIsLightboxOpen(true)
        setZoomLevel(1)
        setPanPosition({ x: 0, y: 0 })
        document.body.style.overflow = 'hidden'
    }

    const closeLightbox = () => {
        setIsLightboxOpen(false)
        document.body.style.overflow = ''
    }

    // Always restore overflow on unmount (navigation away while lightbox open)
    useEffect(() => {
        return () => { document.body.style.overflow = '' }
    }, [])

    // Keyboard navigation for lightbox
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isLightboxOpen) return
            if (e.key === 'Escape') closeLightbox()
            if (e.key === 'ArrowLeft') goToPrev()
            if (e.key === 'ArrowRight') goToNext()
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isLightboxOpen])

    // Lightbox zoom controls
    const handleZoom = (delta) => {
        setZoomLevel((prev) => Math.max(1, Math.min(3, prev + delta)))
    }

    // Lightbox drag for panning
    const handleLightboxMouseDown = (e) => {
        if (zoomLevel <= 1) return
        setIsDragging(true)
        setDragStart({ x: e.clientX - panPosition.x, y: e.clientY - panPosition.y })
    }

    const handleLightboxMouseMove = (e) => {
        if (!isDragging || zoomLevel <= 1) return
        setPanPosition({
            x: e.clientX - dragStart.x,
            y: e.clientY - dragStart.y,
        })
    }

    const handleLightboxMouseUp = () => {
        setIsDragging(false)
    }

    if (!images || images.length === 0) {
        return (
            <div className="flex items-center justify-center h-[400px] bg-safety-surface rounded-[24px]">
                <p className="text-safety-muted">No images available</p>
            </div>
        )
    }

    return (
        <>
            {/* Main Gallery Container */}
            <div className="space-y-4" data-aos="fade-up" data-aos-duration="600">
                {/* Main Image Display */}
                <div
                    className={`relative w-full ${config.mainHeight} bg-safety-surface overflow-hidden ${config.borderRadius} border-2 border-safety-border shadow-[0_20px_60px_rgba(0,0,0,0.1)] group`}
                >
                    {/* Main Image */}
                    <img
                        src={images[currentIndex]}
                        alt={`${item?.name || item?.model} - Image ${currentIndex + 1}`}
                        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Fullscreen Button */}
                    <button
                        onClick={openLightbox}
                        className="absolute top-4 right-4 bg-safety-red/90 hover:bg-safety-red text-white p-3 rounded-full shadow-lg transition z-10 flex items-center justify-center"
                        title="Open fullscreen"
                    >
                        <FontAwesomeIcon icon={faExpand} size="lg" />
                    </button>

                    {/* Navigation Arrows */}
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={goToPrev}
                                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-safety-ink p-3 rounded-full shadow-lg transition z-10"
                                title="Previous image"
                            >
                                <FontAwesomeIcon icon={faChevronLeft} size="lg" />
                            </button>
                            <button
                                onClick={goToNext}
                                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-safety-ink p-3 rounded-full shadow-lg transition z-10"
                                title="Next image"
                            >
                                <FontAwesomeIcon icon={faChevronRight} size="lg" />
                            </button>

                            {/* Image Counter */}
                            <div className="absolute bottom-4 left-4 bg-safety-ink/80 text-white px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm">
                                {currentIndex + 1} / {images.length}
                            </div>
                        </>
                    )}
                </div>

                {/* Thumbnail Gallery */}
                {images.length > 1 && (
                    <div className="space-y-3">
                        {/* Thumbnail Strip */}
                        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 md:gap-3">
                            {images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => goToImage(idx)}
                                    className={`relative ${config.thumbHeight} rounded-[12px] overflow-hidden border-2 transition-all duration-200 cursor-pointer ${currentIndex === idx
                                            ? 'border-safety-red ring-2 ring-safety-red shadow-md'
                                            : 'border-safety-border hover:border-safety-red'
                                        }`}
                                    title={`Go to image ${idx + 1}`}
                                >
                                    <img
                                        src={img}
                                        alt={`Thumbnail ${idx + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Active indicator */}
                                    {currentIndex === idx && (
                                        <div className="absolute inset-0 bg-safety-red/10 pointer-events-none" />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Thumbnail Info */}
                        <div className="flex items-center justify-between px-2">
                            <p className="text-sm text-safety-muted font-medium">
                                Click thumbnail to view • Click expand to fullscreen
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Lightbox Modal */}
            {isLightboxOpen && (
                <div
                    ref={lightboxRef}
                    className="fixed inset-0 bg-safety-ink/95 backdrop-blur-sm z-50 flex items-center justify-center"
                    onMouseMove={handleLightboxMouseMove}
                    onMouseUp={handleLightboxMouseUp}
                    onMouseLeave={handleLightboxMouseUp}
                >
                    {/* Close Button */}
                    <button
                        onClick={closeLightbox}
                        className="absolute top-6 right-6 bg-white text-safety-ink p-3 rounded-full shadow-lg hover:bg-safety-red hover:text-white transition z-50"
                        title="Close (ESC)"
                    >
                        <FontAwesomeIcon icon={faTimes} size="lg" />
                    </button>

                    {/* Lightbox Image */}
                    <div className="flex items-center justify-center h-full w-full p-4 md:p-8">
                        <div
                            className="relative max-w-6xl max-h-[90vh] overflow-hidden rounded-[16px]"
                            onMouseDown={handleLightboxMouseDown}
                        >
                            <img
                                src={images[currentIndex]}
                                alt={`${item?.name || item?.model} - Image ${currentIndex + 1}`}
                                className="w-full h-full object-contain transition-transform duration-200"
                                style={{
                                    transform: `scale(${zoomLevel}) translate(${panPosition.x / zoomLevel}px, ${panPosition.y / zoomLevel}px)`,
                                    cursor: zoomLevel > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
                                }}
                                draggable={false}
                            />
                        </div>
                    </div>

                    {/* Navigation Controls */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-safety-ink/80 backdrop-blur-md rounded-full px-6 py-3 z-50">
                        {/* Previous Button */}
                        <button
                            onClick={goToPrev}
                            className="text-white hover:text-safety-red transition p-2 rounded-full hover:bg-white/10"
                            title="Previous (←)"
                        >
                            <FontAwesomeIcon icon={faChevronLeft} size="lg" />
                        </button>

                        {/* Image Counter */}
                        <span className="text-white font-semibold text-sm min-w-[60px] text-center">
                            {currentIndex + 1} / {images.length}
                        </span>

                        {/* Next Button */}
                        <button
                            onClick={goToNext}
                            className="text-white hover:text-safety-red transition p-2 rounded-full hover:bg-white/10"
                            title="Next (→)"
                        >
                            <FontAwesomeIcon icon={faChevronRight} size="lg" />
                        </button>

                        {/* Divider */}
                        <div className="w-px h-6 bg-white/20" />

                        {/* Zoom Out */}
                        <button
                            onClick={() => handleZoom(-0.5)}
                            className={`text-sm font-semibold px-3 py-1 rounded-full transition ${zoomLevel > 1
                                    ? 'text-white hover:bg-white/10'
                                    : 'text-white/40 cursor-not-allowed'
                                }`}
                            disabled={zoomLevel <= 1}
                            title="Zoom out"
                        >
                            −
                        </button>

                        {/* Zoom Level Display */}
                        <span className="text-white font-semibold text-sm min-w-[50px] text-center">
                            {Math.round(zoomLevel * 100)}%
                        </span>

                        {/* Zoom In */}
                        <button
                            onClick={() => handleZoom(0.5)}
                            className={`text-sm font-semibold px-3 py-1 rounded-full transition ${zoomLevel < 3
                                    ? 'text-white hover:bg-white/10'
                                    : 'text-white/40 cursor-not-allowed'
                                }`}
                            disabled={zoomLevel >= 3}
                            title="Zoom in"
                        >
                            +
                        </button>
                    </div>

                    {/* Keyboard Hints */}
                    <div className="absolute top-6 left-6 text-white/60 text-sm space-y-1 hidden md:block">
                        <p>← → to navigate</p>
                        <p>ESC to close</p>
                        <p>+/− to zoom</p>
                    </div>
                </div>
            )}
        </>
    )
}

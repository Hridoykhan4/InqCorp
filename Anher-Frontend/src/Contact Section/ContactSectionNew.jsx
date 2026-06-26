import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaCheckCircle, FaBolt, FaStar, FaRegClock, FaTools } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { socket } from '../Socket/socket'
import Swal from 'sweetalert2'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { SeoManager } from '../SEO/SeoManager'
import { SEO_CONFIG } from '../SEO/seo'
import { COMPANY, postalAddressSchema } from '../SEO/companyInfo'

/**
 * Contact Page - Premium world-class design for Bangladesh marketplace
 * Customization notes:
 * - Update bangladeshCoordinates with actual latitude/longitude
 * - Change contact.address, .phone, .email with real business details
 * - Modify businessHours for your operation times
 * - Update responseTime and leadTime with actual metrics
 */

const ContactSection = () => {
    const [contact, setContact] = useState({
        name: '',
        email: '',
        subject: '',
        description: '',
        phone: '',
        type: 'contact',
    })

    const [isSubmitting, setIsSubmitting] = useState(false)

    // Contact info pulled from the single source of truth (companyInfo.js).
    const bangladeshLocation = {
        address: COMPANY.addressFull,
        phone: COMPANY.phone,
        phoneTel: COMPANY.phoneTel,
        email: COMPANY.email,
        emails: COMPANY.emails,
        latitude: COMPANY.geo.latitude,
        longitude: COMPANY.geo.longitude,
        directionsUrl: COMPANY.mapDirectionsUrl,
    }

    const businessHours = [
        { day: 'Monday - Friday', time: '9:00 AM - 6:00 PM', active: true },
        { day: 'Saturday', time: '10:00 AM - 4:00 PM', active: true },
        { day: 'Sunday', time: 'Closed', active: false },
    ]

    // Trust indicators
    const trustMetrics = [
        { label: 'Response Time', value: '< 2 Hours', Icon: FaBolt },
        { label: 'Customer Satisfaction', value: '98%', Icon: FaStar },
        { label: 'Support Available', value: '6 Days/Week', Icon: FaRegClock },
        { label: 'Tech Team', value: 'Factory Trained', Icon: FaTools },
    ]

    const handleSubmit = () => {
        if (!contact.name || !contact.email || !contact.subject || !contact.description) {
            Swal.fire({
                icon: 'warning',
                title: 'Missing Information',
                text: 'Please fill in all required fields.',
            })
            return
        }

        setIsSubmitting(true)
        socket.emit('sendQueries', contact)

        setTimeout(() => {
            setContact({
                name: '',
                email: '',
                subject: '',
                description: '',
                phone: '',
                type: 'contact',
            })
            setIsSubmitting(false)

            Swal.fire({
                icon: 'success',
                title: 'Message Sent Successfully!',
                text: 'Our team will respond within 2 hours. Thank you for reaching out!',
                confirmButtonColor: '#b91c1c',
            })
        }, 500)
    }

    const handleChange = (e) =>
        setContact((p) => ({ ...p, [e.target.name]: e.target.value }))

    useEffect(() => {
        AOS.init({ duration: 900, offset: 80, once: true })
    }, [])

    // Map embed pointing at the real company address (no API key required).
    const mapEmbedUrl = COMPANY.mapEmbedSrc

    return (
        <section className="space-y-10 overflow-hidden bg-gradient-to-br from-white via-safety-surface to-white">
            <SeoManager
                title="Contact SafetyPlus Bangladesh"
                description="Get in touch with SafetyPlus Bangladesh. Fire safety equipment supply, factory-trained installation, and fast response support for industrial and commercial buyers."
                path="/contact"
                keywords="SafetyPlus Bangladesh, fire safety contact, industrial safety support, fire safety supplier Bangladesh"
                structuredData={{
                    '@context': 'https://schema.org',
                    '@type': 'ContactPage',
                    name: 'Contact SafetyPlus Bangladesh',
                    url: `${SEO_CONFIG.siteUrl}/contact`,
                    mainEntity: {
                        '@type': 'Organization',
                        name: SEO_CONFIG.siteName,
                        legalName: COMPANY.legalName,
                        email: COMPANY.email,
                        telephone: COMPANY.phoneTel,
                        address: postalAddressSchema,
                    },
                }}
            />

            {/* Hero Section */}
            <div
                className="hero-panel mx-auto max-w-[1340px] px-5 mt-10"
                data-aos="fade-up"
                data-aos-duration="800"
            >
                <div className="text-center space-y-6">
                    <p className="section-tagline">Get In Touch</p>
                    <h1 className="heading-xl">Connect With Our Bangladesh Team</h1>
                    <p className="body-lead max-w-2xl mx-auto">
                        Fast-responding expert support, factory-trained technicians, and compliance-grade fire and
                        industrial safety equipment tailored for Bangladesh sites.
                    </p>
                </div>
            </div>

            <div className="max-w-[1340px] mx-auto px-5 space-y-10">
                {/* Trust Metrics */}
                <div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
                    data-aos="fade-up"
                    data-aos-duration="900"
                >
                    {trustMetrics.map((metric, idx) => (
                        <div
                            key={idx}
                            className="section-panel text-center space-y-2 hover:shadow-xl transition"
                        >
                            <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-safety-red/10 text-safety-red">
                                <metric.Icon className="text-xl" />
                            </div>
                            <p className="text-sm uppercase tracking-[0.12em] font-semibold text-safety-red">
                                {metric.label}
                            </p>
                            <p className="text-2xl font-extrabold text-safety-ink">{metric.value}</p>
                        </div>
                    ))}
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Contact Info & Hours */}
                    <div className="lg:col-span-1 space-y-6" data-aos="fade-right" data-aos-duration="900">
                        {/* Contact Info Cards */}
                        <div className="section-panel space-y-4">
                            <h2 className="heading-lg text-2xl">Contact Details</h2>

                            {/* Location */}
                            <div className="flex gap-4 pb-4 border-b border-safety-border">
                                <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-safety-red/10">
                                        <FaMapMarkerAlt className="text-safety-red text-xl" />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-[0.12em] font-semibold text-safety-red">
                                        Our Location
                                    </p>
                                    <p className="mt-2 text-safety-ink font-medium">{bangladeshLocation.address}</p>
                                    {/* Link to Google Maps - can be customized */}
                                    <a
                                        href={bangladeshLocation.directionsUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-2 inline-block text-sm text-safety-red hover:text-safety-red-dark font-semibold"
                                    >
                                        View on Google Maps →
                                    </a>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="flex gap-4 pb-4 border-b border-safety-border">
                                <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-safety-red/10">
                                        <FaPhoneAlt className="text-safety-red text-xl" />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-[0.12em] font-semibold text-safety-red">Phone</p>
                                    <a
                                        href={`tel:${bangladeshLocation.phone.replace(/\s/g, '')}`}
                                        className="mt-2 text-lg font-bold text-safety-ink hover:text-safety-red transition"
                                    >
                                        {bangladeshLocation.phone}
                                    </a>
                                    <p className="text-xs text-safety-muted mt-1">Call us during business hours</p>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex gap-4">
                                <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-safety-red/10">
                                        <FaEnvelope className="text-safety-red text-xl" />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-[0.12em] font-semibold text-safety-red">Email</p>
                                    <div className="mt-2 flex flex-col gap-1">
                                        {bangladeshLocation.emails.map((mail) => (
                                            <a
                                                key={mail}
                                                href={`mailto:${mail}`}
                                                className="text-lg font-bold text-safety-ink hover:text-safety-red transition break-all"
                                            >
                                                {mail}
                                            </a>
                                        ))}
                                    </div>
                                    <p className="text-xs text-safety-muted mt-1">Response within 2 hours</p>
                                </div>
                            </div>
                        </div>

                        {/* Business Hours */}
                        <div className="section-panel space-y-4" data-aos="fade-up" data-aos-duration="1000">
                            <h3 className="flex items-center gap-3 text-lg font-bold text-safety-ink">
                                <FaClock className="text-safety-red" />
                                Business Hours
                            </h3>
                            <div className="space-y-3">
                                {businessHours.map((hour, idx) => (
                                    <div key={idx} className="flex justify-between items-center">
                                        <span className="font-medium text-safety-ink">{hour.day}</span>
                                        <div className="flex items-center gap-2">
                                            <span className={hour.active ? 'text-safety-muted' : 'text-gray-400'}>
                                                {hour.time}
                                            </span>
                                            {hour.active && <FaCheckCircle className="text-green-500 text-sm" />}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 p-3 rounded-lg bg-safety-red/5 border border-safety-red/20">
                                <p className="text-xs text-safety-muted">
                                    {/* Customization: Update emergency support info */}
                                    Emergency support available via phone. Please call for after-hours assistance.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Middle & Right: Contact Form */}
                    <div className="lg:col-span-2 space-y-6" data-aos="fade-left" data-aos-duration="900">
                        {/* Contact Form */}
                        <div className="section-panel space-y-5">
                            <h2 className="heading-lg text-2xl">Send Us a Message</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="Your Full Name *"
                                    name="name"
                                    value={contact.name}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border-2 border-safety-border bg-white px-4 py-3 text-sm outline-none focus:border-safety-red focus:ring-2 focus:ring-safety-red/20 transition"
                                />
                                <input
                                    type="email"
                                    placeholder="Your Email Address *"
                                    name="email"
                                    value={contact.email}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border-2 border-safety-border bg-white px-4 py-3 text-sm outline-none focus:border-safety-red focus:ring-2 focus:ring-safety-red/20 transition"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="tel"
                                    placeholder="Your Phone Number"
                                    name="phone"
                                    value={contact.phone}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border-2 border-safety-border bg-white px-4 py-3 text-sm outline-none focus:border-safety-red focus:ring-2 focus:ring-safety-red/20 transition"
                                />
                                <input
                                    type="text"
                                    placeholder="Subject *"
                                    name="subject"
                                    value={contact.subject}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border-2 border-safety-border bg-white px-4 py-3 text-sm outline-none focus:border-safety-red focus:ring-2 focus:ring-safety-red/20 transition"
                                />
                            </div>

                            <textarea
                                placeholder="Your Message *"
                                rows="6"
                                name="description"
                                value={contact.description}
                                onChange={handleChange}
                                className="w-full resize-none rounded-lg border-2 border-safety-border bg-white px-4 py-3 text-sm outline-none focus:border-safety-red focus:ring-2 focus:ring-safety-red/20 transition"
                            />

                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className={`w-full cta-button py-4 text-base font-bold uppercase tracking-[0.12em] transition ${isSubmitting ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-lg'
                                    }`}
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>

                            <p className="text-xs text-center text-safety-muted">
                                * Required fields. We respect your privacy and will only use this information to respond to your inquiry.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Map Section */}
                <div
                    className="map-panel overflow-hidden"
                    data-aos="zoom-in"
                    data-aos-duration="900"
                >
                    <div className="space-y-3 mb-0">
                        <h2 className="heading-lg text-2xl px-8 pt-8">Find Us On The Map</h2>
                        <p className="body-lead px-8 text-safety-muted">
                            Visit our Bangladesh headquarters or get directions from your location.
                        </p>
                    </div>
                    <iframe
                        title="SafetyPlus Bangladesh Location"
                        src={mapEmbedUrl}
                        loading="lazy"
                        className="w-full h-[400px] md:h-[500px] border-none"
                        allowFullScreen=""
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>

                {/* FAQ / Quick Links */}
                <div className="bg-safety-surface  rounded-[24px] border-2 mb-7 border-safety-border p-8" data-aos="fade-up">
                    <h2 className="heading-lg text-2xl mb-6">Frequently Asked Questions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Customization: Update FAQ items */}
                        <div className="space-y-2">
                            <p className="font-bold text-safety-ink">How quickly do you respond to inquiries?</p>
                            <p className="text-safety-muted text-sm">
                                We aim to respond to all inquiries within 2 hours during business hours. Emergency support is available via
                                phone.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <p className="font-bold text-safety-ink">Do you offer site visits and consultations?</p>
                            <p className="text-safety-muted text-sm">
                                Yes, our technicians provide free site consultations for industrial and commercial fire
                                safety projects across Bangladesh.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <p className="font-bold text-safety-ink">What areas do you serve?</p>
                            <p className="text-safety-muted text-sm">
                                We serve Dhaka, Chattogram, Sylhet, and all major cities across Bangladesh with nationwide support.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <p className="font-bold text-safety-ink">Do you offer warranty and after-sales support?</p>
                            <p className="text-safety-muted text-sm">
                                Yes, all products come with comprehensive warranty coverage and free first-year maintenance.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactSection

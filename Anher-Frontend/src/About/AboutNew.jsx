import React, { useEffect } from 'react'
import { SeoManager } from '../SEO/SeoManager'
import { SEO_CONFIG } from '../SEO/seo'
import { COMPANY, postalAddressSchema } from '../SEO/companyInfo'
import WhyChooseUs from '../Why Choose Us/WhyChooseUs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCalendarCheck,
    faCircleCheck,
    faUsers,
    faGlobe,
    faBullseye,
    faRocket,
    faLightbulb,
    faStar,
    faShieldHalved,
    faHandshakeAngle,
    faLocationDot,
    faPhone,
    faEnvelope,
} from '@fortawesome/free-solid-svg-icons'

/**
 * About Page - Professional SaaS-grade company story and values
 * Customization notes:
 * - Update company mission, vision, and values
 * - Modify team stats and achievements
 * - Update company timeline with actual milestones
 * - Replace with actual team member info
 * - Adjust brand colors and styling as needed
 */

export const About = () => {
    useEffect(() => {
        // AOS removed for better performance
    }, [])

    // Company stats - can be customized
    const stats = [
        { label: 'Years in Business', value: '15+', icon: faCalendarCheck },
        { label: 'Projects Completed', value: '2,500+', icon: faCircleCheck },
        { label: 'Clients Served', value: '500+', icon: faUsers },
        { label: 'Countries Reached', value: '12+', icon: faGlobe },
    ]

    const values = [
        {
            title: 'Innovation',
            description: 'Constantly evolving our solutions to meet Bangladesh marketplace needs.',
            icon: faLightbulb,
        },
        {
            title: 'Quality',
            description: 'Uncompromising commitment to factory-trained standards and excellence.',
            icon: faStar,
        },
        {
            title: 'Reliability',
            description: 'Dependable service and technical support when you need it most.',
            icon: faShieldHalved,
        },
        {
            title: 'Partnership',
            description: 'Treating every client as a long-term strategic partner.',
            icon: faHandshakeAngle,
        },
    ]

    // Timeline milestones - can be customized
    const milestones = [
        { year: '2010', title: 'Founded', description: 'SafetyPlus established with a focus on industrial fire safety.' },
        { year: '2014', title: 'Bangladesh Entry', description: 'Expanded manufacturing operations across Bangladesh.' },
        { year: '2018', title: '1000+ Projects', description: 'Reached milestone of 1000 completed safety projects.' },
        { year: '2023', title: 'Premium Services', description: 'Launched factory-trained installation and audit program.' },
        { year: '2024', title: 'Industry Leader', description: 'Recognized as a leading Bangladesh fire safety manufacturer.' },
    ]

    // Services focus areas - can be customized
    const serviceAreas = [
        {
            title: 'Industrial Safety',
            description:
                'DB boxes, hose cabinets, industrial racks, and protective enclosures for factories, warehouses, and plants.',
            points: ['Custom fabrication', 'Compliance-grade build', 'On-site installation'],
        },
        {
            title: 'Commercial Solutions',
            description:
                'Fire safety hardware, doors, signage, and equipment for offices, retail, hospitals, and institutions.',
            points: ['Responsive support', 'Preventive maintenance', 'Annual inspection'],
        },
        {
            title: 'Fire Safety Equipment',
            description:
                'Fire suppression, detection, hose cabinets, and fire-rated doors for end-to-end protection.',
            points: ['Emergency systems', 'Compliance certified', '24/7 response'],
        },
    ]

    return (
        <section className="space-y-16 overflow-hidden bg-white">
            <SeoManager
                title="About SafetyPlus Bangladesh - Industrial Fire Safety Manufacturer"
                description="SafetyPlus manufactures and supplies DB boxes, hose cabinets, fire doors, industrial racks, and protective equipment for Bangladesh factories and commercial buildings."
                path="/about"
                keywords="SafetyPlus, fire safety Bangladesh, industrial safety equipment, DB box, hose cabinet, fire door, protective equipment"
                structuredData={{
                    '@context': 'https://schema.org',
                    '@type': 'Organization',
                    name: SEO_CONFIG.siteName,
                    legalName: COMPANY.legalName,
                    alternateName: ['Safety Plus', 'Safety Plus Industry'],
                    description: 'Industrial fire safety equipment manufacturer in Bangladesh',
                    foundingDate: '2010',
                    url: `${SEO_CONFIG.siteUrl}/about`,
                    email: COMPANY.email,
                    telephone: COMPANY.phoneTel,
                    address: postalAddressSchema,
                    areaServed: 'BD',
                }}
            />

            {/* Hero Section */}
            <div className="hero-panel mx-auto max-w-[1340px] px-5 mt-10">
                <div className="text-center space-y-6">
                    <p className="section-tagline">Our Story</p>
                    <h1 className="heading-xl">Engineering Excellence for Bangladesh</h1>
                    <p className="body-lead max-w-3xl mx-auto">
                        For over 15 years, SafetyPlus has been the trusted manufacturer of industrial fire safety and
                        protection equipment across Bangladesh. Factory-trained engineering, compliance-grade build, real
                        after-sales support.
                    </p>
                </div>
            </div>

            {/* Stats Section */}
            <div className="max-w-[1340px] mx-auto px-5">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4" data-aos="fade-up" data-aos-duration="900">
                    {stats.map((stat, idx) => (
                        <div
                            key={idx}
                            className="section-panel text-center space-y-2 hover:shadow-xl transition"
                            data-aos="zoom-in"
                            data-aos-delay={idx * 100}
                        >
                            <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-safety-red/10 text-safety-red">
                                <FontAwesomeIcon icon={stat.icon} className="text-xl" />
                            </div>
                            <p className="text-3xl font-extrabold text-safety-red">{stat.value}</p>
                            <p className="text-sm font-semibold text-safety-muted uppercase tracking-[0.12em]">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mission & Vision */}
            <div className="max-w-[1340px] mx-auto px-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Mission */}
                    <div className="section-panel space-y-4" data-aos="fade-right">
                        <h2 className="heading-lg text-2xl flex items-center gap-3">
                            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-safety-red/10 text-safety-red">
                                <FontAwesomeIcon icon={faBullseye} />
                            </span>
                            Our Mission
                        </h2>
                        <p className="body-lead">
                            To deliver dependable fire safety and industrial protection equipment that safeguards lives,
                            property, and productivity across Bangladesh's factories and commercial buildings.
                        </p>
                        <p className="text-safety-muted">
                            We engineer compliance-grade hardware backed by factory-trained installation, audit, and
                            after-sales support.
                        </p>
                    </div>

                    {/* Vision */}
                    <div className="section-panel space-y-4" data-aos="fade-left">
                        <h2 className="heading-lg text-2xl flex items-center gap-3">
                            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-safety-red/10 text-safety-red">
                                <FontAwesomeIcon icon={faRocket} />
                            </span>
                            Our Vision
                        </h2>
                        <p className="body-lead">
                            To be the leading fire and industrial safety manufacturer in South Asia, recognized for
                            technical excellence, compliance, and reliable customer service.
                        </p>
                        <p className="text-safety-muted">
                            We aim to build long-term partnerships with clients by consistently exceeding expectations and creating
                            measurable value through our solutions.
                        </p>
                    </div>
                </div>
            </div>

            {/* Core Values */}
            <div className="max-w-[1340px] mx-auto px-5">
                <div className="text-center space-y-6 mb-10" data-aos="fade-up">
                    <p className="section-tagline">Core Values</p>
                    <h2 className="heading-lg">What Drives Us</h2>
                    <p className="body-lead max-w-2xl mx-auto">
                        These principles guide every decision we make and every solution we deliver.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {values.map((value, idx) => (
                        <div
                            key={idx}
                            className="section-panel space-y-3 hover:shadow-xl transition"
                            data-aos="zoom-in"
                            data-aos-delay={idx * 100}
                        >
                            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-safety-red/10 text-safety-red">
                                <FontAwesomeIcon icon={value.icon} className="text-xl" />
                            </div>
                            <h3 className="text-lg font-bold text-safety-ink">{value.title}</h3>
                            <p className="text-sm text-safety-muted">{value.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Service Areas */}
            <div className="max-w-[1340px] mx-auto px-5">
                <div className="text-center space-y-6 mb-10" data-aos="fade-up">
                    <p className="section-tagline">Our Expertise</p>
                    <h2 className="heading-lg">Solutions We Provide</h2>
                    <p className="body-lead max-w-2xl mx-auto">
                        Comprehensive fire safety and industrial protection equipment tailored to Bangladesh sites.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {serviceAreas.map((area, idx) => (
                        <div
                            key={idx}
                            className="section-panel space-y-4 hover:shadow-2xl transition"
                            data-aos="fade-up"
                            data-aos-delay={idx * 100}
                        >
                            <h3 className="text-xl font-bold text-safety-ink">{area.title}</h3>
                            <p className="text-safety-muted">{area.description}</p>
                            <ul className="space-y-2 pt-2 border-t border-safety-border">
                                {area.points.map((point, pidx) => (
                                    <li key={pidx} className="flex items-start gap-3">
                                        <span className="text-safety-red font-bold">✓</span>
                                        <span className="text-sm text-safety-muted">{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Timeline */}
            <div className="max-w-[1340px] mx-auto px-5">
                <div className="text-center space-y-6 mb-10" data-aos="fade-up">
                    <p className="section-tagline">Milestones</p>
                    <h2 className="heading-lg">Our Journey</h2>
                </div>

                <div className="relative">
                    {/* Vertical line - hidden on mobile */}
                    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-safety-red to-safety-red/20" />

                    <div className="space-y-8 md:space-y-12">
                        {milestones.map((milestone, idx) => (
                            <div
                                key={idx}
                                className={`flex ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                                data-aos={idx % 2 === 0 ? 'fade-right' : 'fade-left'}
                                data-aos-duration="800"
                            >
                                {/* Content */}
                                <div className={`w-full md:w-1/2 ${idx % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                                    <div className="section-panel space-y-2">
                                        <span className="text-sm font-bold uppercase tracking-[0.12em] text-safety-red">
                                            {milestone.year}
                                        </span>
                                        <h3 className="text-xl font-bold text-safety-ink">{milestone.title}</h3>
                                        <p className="text-safety-muted">{milestone.description}</p>
                                    </div>
                                </div>

                                {/* Timeline dot */}
                                <div className="hidden md:flex md:w-0 justify-center">
                                    <div className="w-4 h-4 bg-safety-red rounded-full border-4 border-white shadow-lg" />
                                </div>

                                {/* Spacer for alignment on mobile */}
                                <div className="md:hidden w-full" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Why Choose Us Section */}
            <div className="bg-safety-surface">
                <WhyChooseUs />
            </div>

            {/* Location / Visit Us */}
            <div className="max-w-[1340px] mx-auto px-5">
                <div className="text-center space-y-6 mb-10" data-aos="fade-up">
                    <p className="section-tagline">Visit Us</p>
                    <h2 className="heading-lg">Where to Find SafetyPlus</h2>
                    <p className="body-lead max-w-2xl mx-auto">
                        Our factory and office in Demra, Dhaka. Drop by, call, or message us anytime.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                    {/* Contact details */}
                    <div className="section-panel space-y-5">
                        <h3 className="text-xl font-bold text-safety-ink">{COMPANY.legalName}</h3>

                        <a
                            href={COMPANY.mapDirectionsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex gap-4 group"
                        >
                            <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-safety-red/10 text-safety-red">
                                <FontAwesomeIcon icon={faLocationDot} className="text-xl" />
                            </span>
                            <span>
                                <span className="block text-xs uppercase tracking-[0.12em] font-semibold text-safety-red">
                                    Our Location
                                </span>
                                <span className="mt-1 block text-safety-ink font-medium group-hover:text-safety-red transition">
                                    {COMPANY.addressFull}
                                </span>
                            </span>
                        </a>

                        <a href={`tel:${COMPANY.phoneTel}`} className="flex gap-4 group">
                            <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-safety-red/10 text-safety-red">
                                <FontAwesomeIcon icon={faPhone} className="text-xl" />
                            </span>
                            <span>
                                <span className="block text-xs uppercase tracking-[0.12em] font-semibold text-safety-red">
                                    Phone
                                </span>
                                <span className="mt-1 block text-lg font-bold text-safety-ink group-hover:text-safety-red transition">
                                    {COMPANY.phone}
                                </span>
                            </span>
                        </a>

                        <div className="flex gap-4">
                            <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-safety-red/10 text-safety-red">
                                <FontAwesomeIcon icon={faEnvelope} className="text-xl" />
                            </span>
                            <span>
                                <span className="block text-xs uppercase tracking-[0.12em] font-semibold text-safety-red">
                                    Email
                                </span>
                                <span className="mt-1 flex flex-col gap-1">
                                    {COMPANY.emails.map((mail) => (
                                        <a
                                            key={mail}
                                            href={`mailto:${mail}`}
                                            className="text-safety-ink font-medium hover:text-safety-red transition break-all"
                                        >
                                            {mail}
                                        </a>
                                    ))}
                                </span>
                            </span>
                        </div>

                        <a
                            href={COMPANY.mapDirectionsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cta-button inline-flex w-fit"
                        >
                            Get Directions
                        </a>
                    </div>

                    {/* Map */}
                    <div className="map-panel overflow-hidden rounded-[24px] border-2 border-safety-border min-h-[340px]">
                        <iframe
                            title={`${COMPANY.legalName} location on Google Maps`}
                            src={COMPANY.mapEmbedSrc}
                            loading="lazy"
                            className="w-full h-full min-h-[340px] border-none"
                            allowFullScreen=""
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="max-w-[1340px] mx-auto px-5 mb-10">
                <div className="hero-panel text-center space-y-6" data-aos="zoom-in">
                    <h2 className="heading-lg">Ready to Upgrade Your Site Safety?</h2>
                    <p className="body-lead max-w-2xl mx-auto">
                        Let's discuss how SafetyPlus can supply and install the right fire and industrial safety
                        equipment for your Bangladesh project.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                        <a href="/contact" className="cta-button">
                            Get in Touch
                        </a>
                        <a href="/all-products" className="ghost-button">
                            Explore Products
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

import React, { useEffect, useMemo } from 'react'
import { useOutletContext, useParams } from 'react-router'
import { ProductDetails } from './ProductDetails'
import { ProductInfo } from './ProductInfo'
import ProductAccordion from './ProductAccordion'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { DynamicBanner } from '../Dynamic Banner/DynamicBanner'
import { SeoManager } from '../SEO/SeoManager'
import { getAbsoluteUrl, stripHtml, truncate } from '../SEO/seo'
import { ProductGallery } from './Product Gallery/ProductGallery'

export const Product = () => {
    const { model } = useParams()
    const { products, categories } = useOutletContext()

    console.log(categories);

    const item = useMemo(() => {
        if (!products) return null
        return products.find((product) => product?.model === model)
    }, [products, model])

    const categoryItem = useMemo(() => {
        if (!categories || !item) return null
        return (
            categories.find(
                (cat) => cat?.name?.toLowerCase() === item.category?.toLowerCase()
            ) || null
        )
    }, [categories, item])

    useEffect(() => {
        AOS.init({ duration: 900, offset: 80, once: true })
    }, [])

    return (
        <section className='space-y-10'>
            <SeoManager
                title={item ? `${item?.name || item?.model}` : 'Product Details'}
                description={
                    item
                        ? truncate(stripHtml(item?.description || `${item?.name || item?.model} by SafetyPlus.`))
                        : 'Explore SafetyPlus product details, specifications, and downloadable information.'
                }
                keywords={
                    item
                        ? `${item?.name || item?.model}, ${item?.category || 'fire safety product'}, SafetyPlus`
                        : 'SafetyPlus products, fire safety product details'
                }
                image={item?.imageUrl?.[0] || '/pdf/HVAC-Image.jpg.jpeg'}
                type='product'
                structuredData={
                    item
                        ? {
                            '@context': 'https://schema.org',
                            '@type': 'Product',
                            name: item?.name || item?.model,
                            sku: item?.model,
                            category: item?.category,
                            description: truncate(stripHtml(item?.description || '')),
                            image: item?.imageUrl?.length
                                ? item.imageUrl.map((img) => getAbsoluteUrl(img))
                                : [getAbsoluteUrl('/pdf/HVAC-Image.jpg.jpeg')],
                        }
                        : undefined
                }
            />

            {item ? (
                <DynamicBanner item={categoryItem} />
            ) : (
                <div className='skeleton w-full h-[320px] rounded-[28px]'></div>
            )}

            <div className='mx-auto max-w-[1340px] space-y-6 px-4 sm:px-6 sm:space-y-8'>
                <section className='grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8'>
                    <div className='section-panel'>
                        {item ? <ProductGallery item={item} /> : <div className='skeleton h-[320px] rounded-[28px] sm:h-[500px]' />}
                    </div>

                    <div className='space-y-5'>
                        <div className='section-panel'>
                            {item ? <ProductDetails item={item} /> : <div className='skeleton h-[300px] rounded-[28px]' />}
                            <div className='mt-5 flex flex-wrap gap-3'>
                                <button className='cta-button'>Request a Quote</button>
                                <button className='ghost-button'>Download Specs</button>
                            </div>
                        </div>

                        <div className='section-panel'>
                            <ProductAccordion item={item} />
                        </div>
                    </div>
                </section>

                <section className='section-panel'>
                    <ProductInfo item={item} />
                </section>
            </div>
        </section>
    )
}

import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { capitalizeWords } from '../Functions/functions'

const FALLBACK_BANNER =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/800px-Image_not_available.png?20210219185637'

const resolveBannerImage = (item) => {
  if (!item) return null
  if (Array.isArray(item.bannerImgUrl)) return item.bannerImgUrl[0]
  if (typeof item.bannerImgUrl === 'string' && item.bannerImgUrl) return item.bannerImgUrl
  if (Array.isArray(item.imageUrl)) return item.imageUrl[0]
  if (typeof item.imageUrl === 'string' && item.imageUrl) return item.imageUrl
  return null
}

export const DynamicBanner = ({ item }) => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true })
  }, [])

  if (!item) {
    return (
      <div className='skeleton h-[180px] w-full sm:h-[260px] md:h-[320px]' />
    )
  }

  const banner = resolveBannerImage(item) || FALLBACK_BANNER

  return (
    <div className='container-page pt-4'>
      <div className='relative h-[160px] w-full overflow-hidden rounded-2xl border border-safety-border  shadow-[0_18px_50px_-20px_rgba(0,0,0,0.35)] sm:h-[200px] md:h-[240px]'>
        <img
          src={banner}
          alt={item?.name || 'SafetyPlus category banner'}
          loading='lazy'
          className='absolute inset-0 h-full w-full object-cover'
          style={{ objectPosition: 'center' }}
        />
        {/* Light left-only scrim — keeps text readable, image stays crisp */}
        <div className='absolute inset-0 bg-gradient-to-r from-safety-ink/80 via-safety-ink/25 to-transparent sm:via-transparent sm:w-1/2' />

        <div className='relative z-10 flex h-full items-center'>
          <div className='px-5 sm:px-8 md:px-10' data-aos='fade-right'>
            <p className='inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-safety-amber backdrop-blur-sm'>
              Product Category
            </p>
            <h2 className='mt-3 max-w-xl text-2xl font-extrabold leading-tight text-white text-shadow-xl sm:text-3xl md:text-4xl'>
              {capitalizeWords(item?.name) || 'Safety Solutions'}
            </h2>
            <p className='mt-2 hidden max-w-md text-sm text-white/80 sm:block'>
              Industrial-grade equipment engineered for compliance, durability, and project-ready deployment.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

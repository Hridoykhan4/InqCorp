import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { Bounce, toast, ToastContainer } from 'react-toastify'

import { Navbar } from '../Navbar/Navbar'
import { socket } from '../Socket/socket'
import { addLogo, removeUser } from '../Redux/hvac'
import { ScrollTop } from '../Custom Hooks/ScrollTop'
import Footer from '../Footer/Footer'
import { Preloader } from '../Preloader/Preloader'
import { ContactDock } from '../components/ContactDock'
import { clearPageScrollLocks } from '../components/usePageScrollLock'
import {
  FALLBACK_CATEGORIES,
  FALLBACK_GALLERY,
  FALLBACK_PRODUCTS,
} from '../data/siteData'

const API_BASE = (import.meta.env.VITE_BACKEND_URL || '').replace(/\/+$/, '')
const api = (path) => `${API_BASE}/api/${path}`
const asArray = (value) => (Array.isArray(value) ? value : [])
const UpdateLogoModal = lazy(() => import('../Dashboard/Logo/UpdateLogoModal').then((module) => ({ default: module.UpdateLogoModal })))

export const Root = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const admin = useSelector((state) => state.hvac.users)

  const [products, setProducts] = useState(FALLBACK_PRODUCTS)
  const [categories, setCategories] = useState(FALLBACK_CATEGORIES)
  const [queries, setQueries] = useState([])
  const [banners, setBanners] = useState([])
  const [dashboardBanners, setDashboardBanners] = useState([])
  const [blogs, setBlogs] = useState([])
  const [services, setServices] = useState([])
  const [businessProducts, setBusinessProducts] = useState(FALLBACK_PRODUCTS.slice(0, 4))
  const [certificate, setCertificate] = useState([])
  const [country, setCountry] = useState([])
  const [priceList, setPriceList] = useState([])
  const [gallery, setGallery] = useState(FALLBACK_GALLERY)
  const [contentStatus, setContentStatus] = useState('loading')

  useEffect(() => {
    clearPageScrollLocks()
  }, [location.pathname])

  useEffect(() => {
    const token = admin?.token
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
    } else {
      delete axios.defaults.headers.common.Authorization
    }

    // Keep browser automation finite; real visitors and the admin dashboard
    // still receive the live socket connection.
    if (!navigator.webdriver) {
      socket.auth = token ? { token } : {}
      if (socket.connected) socket.disconnect()
      socket.connect()
    }

    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error?.response?.status === 401 && admin?.token) dispatch(removeUser())
        return Promise.reject(error)
      },
    )

    return () => axios.interceptors.response.eject(responseInterceptor)
  }, [admin?.token, dispatch])

  useEffect(() => {
    const controller = new AbortController()

    const requests = [
      ['logo', 'getLogo'],
      ['banners', 'getBanners'],
      ['blogs', 'getBlogs'],
      ['products', 'getProducts'],
      ['services', 'getServices'],
      ['categories', 'getCategories'],
      ['businessProducts', 'getBusinessProducts'],
      ['certificate', 'getCertificate'],
      ['country', 'getCountry'],
      ['priceList', 'getPriceList'],
      ['gallery', 'getGallery'],
    ]

    Promise.allSettled(
      requests.map(async ([key, endpoint]) => {
        const response = await axios.get(api(endpoint), {
          signal: controller.signal,
          timeout: 12_000,
        })
        return [key, response.data]
      }),
    ).then((results) => {
      if (controller.signal.aborted) return
      let liveCoreData = false

      for (const result of results) {
        if (result.status !== 'fulfilled') continue
        const [key, payload] = result.value
        const list = asArray(payload?.data ?? payload)

        if (key === 'logo' && payload?.data) dispatch(addLogo(payload.data))
        if (key === 'banners') setBanners(list)
        if (key === 'blogs') setBlogs(list)
        if (key === 'services') setServices(list)
        if (key === 'certificate') setCertificate(list)
        if (key === 'country') setCountry(list)
        if (key === 'priceList') setPriceList(list)

        if (key === 'products') {
          setProducts(list)
          liveCoreData = true
        }
        if (key === 'categories') setCategories(list)
        if (key === 'businessProducts') setBusinessProducts(list)
        if (key === 'gallery') setGallery(list)
      }

      setContentStatus(liveCoreData ? 'live' : 'fallback')
    })

    return () => controller.abort()
  }, [dispatch])

  useEffect(() => {
    const handleQuery = (payload) => {
      if (!payload?.data) return
      setQueries((current) => [payload.data, ...current])
      toast.info('A new project enquiry has arrived.', { autoClose: 5000 })
    }

    socket.on('queries', handleQuery)
    return () => socket.off('queries', handleQuery)
  }, [])

  useEffect(() => {
    if (!admin?.token) {
      setQueries([])
      setDashboardBanners([])
      return
    }

    socket.emit('join', admin.token)
    const controller = new AbortController()
    Promise.allSettled([
      axios.get(api('getQueries'), { signal: controller.signal, timeout: 12_000 }),
      axios.get(api('dashboardBanners'), { signal: controller.signal, timeout: 12_000 }),
    ]).then(([queryResult, bannerResult]) => {
      if (controller.signal.aborted) return
      if (queryResult.status === 'fulfilled') setQueries(asArray(queryResult.value.data?.data))
      if (bannerResult.status === 'fulfilled') setDashboardBanners(asArray(bannerResult.value.data?.data))
    })

    return () => controller.abort()
  }, [admin?.token])

  const data = useMemo(() => ({
    products,
    categories,
    setCategories,
    setProducts,
    queries,
    setQueries,
    banners,
    setBanners,
    blogs,
    setBlogs,
    services,
    setServices,
    businessProducts,
    setBusinessProducts,
    certificate,
    setCertificate,
    country,
    setCountry,
    dashboardBanners,
    setDashboardBanners,
    priceList,
    setPriceList,
    gallery,
    setGallery,
    contentStatus,
  }), [
    products, categories, queries, banners, blogs, services,
    businessProducts, certificate, country, dashboardBanners,
    priceList, gallery, contentStatus,
  ])

  const isDashboard = location.pathname.startsWith('/dashboard')

  return (
    <div className={`min-h-screen ${isDashboard ? 'bg-[#f3f5f7]' : 'bg-white'}`}>
      {!isDashboard && <Preloader />}
      {admin?.token && <Suspense fallback={null}><UpdateLogoModal /></Suspense>}
      {!isDashboard && <Navbar categories={categories} country={country} />}
      <ScrollTop />

      <Outlet context={data} />

      {!isDashboard && <Footer categories={categories} />}
      {!isDashboard && <ContactDock />}
      <ToastContainer
        position="top-right"
        autoClose={3500}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="light"
        transition={Bounce}
        toastClassName="!rounded-xl !border !border-brand-border !font-medium !text-brand-ink !shadow-xl"
        progressClassName="!bg-brand-primary"
      />
    </div>
  )
}

import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { persistor, store } from './Redux/store.js'

// ── Eager — needed on first paint ──────────────────────────────────────────────
import { Root } from './Root/Root.jsx'
import { Home } from './Home/Home.jsx'

// ── Lazy — each becomes its own JS chunk, only downloaded when navigated to ────
const sl = (fn, name) => lazy(() => fn().then(m => ({ default: m[name] ?? m.default })))

const Product          = sl(() => import('./Product/Product.jsx'),                                    'Product')
const About            = sl(() => import('./About/About.jsx'),                                        'About')
const ContactSection   = lazy(() => import('./Contact Section/ContactSection.jsx'))
const Blog             = sl(() => import('./Blog/Blog.jsx'),                                          'Blog')
const ProtectedRoute   = sl(() => import('./Protected Route/ProtectedRoute.jsx'),                     'ProtectedRoute')
const Dashboard        = sl(() => import('./Dashboard/Dashboard.jsx'),                                'Dashboard')
const AdminDashboard   = lazy(() => import('./Dashboard/Home/AdminDashboard.jsx'))
const AllProducts      = sl(() => import('./Product/AllProducts.jsx'),                                'AllProducts')
const DashboardCategories = sl(() => import('./Dashboard/Dashboard Categories/DashboardCategories.jsx'), 'DashboardCategories')
const Queries          = sl(() => import('./Queries/Queries.jsx'),                                    'Queries')
const DashboardBanner  = sl(() => import('./Dashboard/Dashboar Banner/DashboardBanner.jsx'),          'DashboardBanner')
const DashboardServices= sl(() => import('./Dashboard/Dashboard Services/DashboardServices.jsx'),     'DashboardServices')
const DashboardBlog    = sl(() => import('./Dashboard/Dashboard Blog/DashboardBlog.jsx'),             'DashboardBlog')
const DashboardCertificate = sl(() => import('./Dashboard/Dashboard Certificate/DashboardCertificate.jsx'), 'DashboardCertificate')
const Login            = sl(() => import('./Login-Register/Login.jsx'),                               'Login')
const Category         = sl(() => import('./Category/Category.jsx'),                                  'Category')
const DashboardCountry = sl(() => import('./Dashboard/Dashboard Country/DashboardCountry.jsx'),      'DashboardCountry')
const ServicePage      = sl(() => import('./Service Page/ServicePage.jsx'),                           'ServicePage')
const Catelogue        = sl(() => import('./Catelog/Catelogue.jsx'),                                  'Catelogue')
const DashboardCatalogue = sl(() => import('./Dashboard/Dashboard Catalogue/DashboardCatalogue.jsx'),'DashboardCatalogue')
const Projects         = sl(() => import('./Projects/Projects.jsx'),                                  'Projects')
const DashboardPriceList = sl(() => import('./Dashboard/Dashboard PriceList/DashboardPriceList.jsx'),'DashboardPriceList')
const Gallery          = sl(() => import('./Gallery/Gallery.jsx'),                                    'Gallery')
const DashboardGallery = sl(() => import('./Dashboard/Dashboard Gallery/DashboardGallery.jsx'),      'DashboardGallery')

// Minimal dark-background fallback — matches site theme, no white flash
const F = () => <div style={{ minHeight: '100vh', background: '#000818' }} />

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { path: '/',                  element: <Home /> },
      { path: '/products/:model',   element: <Suspense fallback={<F />}><Product /></Suspense> },
      { path: '/about',             element: <Suspense fallback={<F />}><About /></Suspense> },
      { path: '/services',          element: <Suspense fallback={<F />}><ServicePage /></Suspense> },
      { path: '/projects',          element: <Suspense fallback={<F />}><Projects /></Suspense> },
      { path: '/contact',           element: <Suspense fallback={<F />}><ContactSection /></Suspense> },
      { path: '/category/:categoryName', element: <Suspense fallback={<F />}><Category /></Suspense> },
      { path: '/blog',              element: <Suspense fallback={<F />}><Blog /></Suspense> },
      { path: '/blog/:blogId',      element: <Suspense fallback={<F />}><Blog /></Suspense> },
      { path: '/catalogue',         element: <Suspense fallback={<F />}><Catelogue /></Suspense> },
      { path: '/all-products',      element: <Suspense fallback={<F />}><AllProducts /></Suspense> },
      { path: '/gallery',           element: <Suspense fallback={<F />}><Gallery /></Suspense> },
      {
        path: '/dashboard',
        element: (
          <Suspense fallback={<F />}>
            <ProtectedRoute><Dashboard /></ProtectedRoute>
          </Suspense>
        ),
        children: [
          { path: '/dashboard',               element: <Suspense fallback={<F />}><AdminDashboard /></Suspense> },
          { path: '/dashboard/products',      element: <Suspense fallback={<F />}><AllProducts /></Suspense> },
          { path: '/dashboard/categories',    element: <Suspense fallback={<F />}><DashboardCategories /></Suspense> },
          { path: '/dashboard/queries',       element: <Suspense fallback={<F />}><Queries /></Suspense> },
          { path: '/dashboard/banners',       element: <Suspense fallback={<F />}><DashboardBanner /></Suspense> },
          { path: '/dashboard/services',      element: <Suspense fallback={<F />}><DashboardServices /></Suspense> },
          { path: '/dashboard/blog',          element: <Suspense fallback={<F />}><DashboardBlog /></Suspense> },
          { path: '/dashboard/certificate',   element: <Suspense fallback={<F />}><DashboardCertificate /></Suspense> },
          { path: '/dashboard/country',       element: <Suspense fallback={<F />}><DashboardCountry /></Suspense> },
          { path: '/dashboard/catalogue',     element: <Suspense fallback={<F />}><DashboardCatalogue /></Suspense> },
          { path: '/dashboard/pricelist',     element: <Suspense fallback={<F />}><DashboardPriceList /></Suspense> },
          { path: '/dashboard/gallery',       element: <Suspense fallback={<F />}><DashboardGallery /></Suspense> },
        ],
      },
    ],
  },
  {
    path: '/admin-login',
    element: <Suspense fallback={<F />}><Login /></Suspense>,
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<F />} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </StrictMode>
)

import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { persistor, store } from './Redux/store.js'

// ── Eager — needed on first paint ──────────────────────────────────────────────
import { Root } from './Root/Root.jsx'
import { Home } from './Home/Home.jsx'
import { AppErrorBoundary } from './components/AppErrorBoundary.jsx'
import { PageLoader } from './components/PageLoader.jsx'
import { RouteError } from './components/RouteError.jsx'

// ── Lazy — each becomes its own JS chunk, only downloaded when navigated to ────
const sl = (fn, name) => lazy(() => fn().then(m => ({ default: m[name] ?? m.default })))

const Product          = sl(() => import('./Product/Product.jsx'),                                    'Product')
const About            = sl(() => import('./About/About.jsx'),                                        'About')
const ContactSection   = lazy(() => import('./Contact Section/ContactSection.jsx'))
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
const Catelogue        = sl(() => import('./Catelog/Catelogue.jsx'),                                  'Catelogue')
const DashboardCatalogue = sl(() => import('./Dashboard/Dashboard Catalogue/DashboardCatalogue.jsx'),'DashboardCatalogue')
const DashboardPriceList = sl(() => import('./Dashboard/Dashboard PriceList/DashboardPriceList.jsx'),'DashboardPriceList')
const Gallery          = sl(() => import('./Gallery/Gallery.jsx'),                                    'Gallery')
const DashboardGallery = sl(() => import('./Dashboard/Dashboard Gallery/DashboardGallery.jsx'),      'DashboardGallery')

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <RouteError />,
    children: [
      { path: '/',                  element: <Home /> },
      { path: '/products/:model',   element: <Suspense fallback={<PageLoader />}><Product /></Suspense> },
      { path: '/about',             element: <Suspense fallback={<PageLoader />}><About /></Suspense> },
      { path: '/services',          element: <Navigate to="/about" replace /> },
      { path: '/projects',          element: <Navigate to="/gallery" replace /> },
      { path: '/contact',           element: <Suspense fallback={<PageLoader />}><ContactSection /></Suspense> },
      { path: '/category/:categoryName', element: <Suspense fallback={<PageLoader />}><Category /></Suspense> },
      { path: '/blog',              element: <Navigate to="/catalogue" replace /> },
      { path: '/blog/:blogId',      element: <Navigate to="/catalogue" replace /> },
      { path: '/catalogue',         element: <Suspense fallback={<PageLoader />}><Catelogue /></Suspense> },
      { path: '/all-products',      element: <Suspense fallback={<PageLoader />}><AllProducts /></Suspense> },
      { path: '/gallery',           element: <Suspense fallback={<PageLoader />}><Gallery /></Suspense> },
      {
        path: '/dashboard',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProtectedRoute><Dashboard /></ProtectedRoute>
          </Suspense>
        ),
        children: [
          { path: '/dashboard',               element: <Suspense fallback={<PageLoader />}><AdminDashboard /></Suspense> },
          { path: '/dashboard/products',      element: <Suspense fallback={<PageLoader />}><AllProducts /></Suspense> },
          { path: '/dashboard/categories',    element: <Suspense fallback={<PageLoader />}><DashboardCategories /></Suspense> },
          { path: '/dashboard/queries',       element: <Suspense fallback={<PageLoader />}><Queries /></Suspense> },
          { path: '/dashboard/banners',       element: <Suspense fallback={<PageLoader />}><DashboardBanner /></Suspense> },
          { path: '/dashboard/services',      element: <Suspense fallback={<PageLoader />}><DashboardServices /></Suspense> },
          { path: '/dashboard/blog',          element: <Suspense fallback={<PageLoader />}><DashboardBlog /></Suspense> },
          { path: '/dashboard/certificate',   element: <Suspense fallback={<PageLoader />}><DashboardCertificate /></Suspense> },
          { path: '/dashboard/country',       element: <Suspense fallback={<PageLoader />}><DashboardCountry /></Suspense> },
          { path: '/dashboard/catalogue',     element: <Suspense fallback={<PageLoader />}><DashboardCatalogue /></Suspense> },
          { path: '/dashboard/pricelist',     element: <Suspense fallback={<PageLoader />}><DashboardPriceList /></Suspense> },
          { path: '/dashboard/gallery',       element: <Suspense fallback={<PageLoader />}><DashboardGallery /></Suspense> },
        ],
      },
      { path: '*', element: <RouteError /> },
    ],
  },
  {
    path: '/admin-login',
    element: <Suspense fallback={<PageLoader />}><Login /></Suspense>,
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppErrorBoundary>
      <Provider store={store}>
        <PersistGate loading={<PageLoader />} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    </AppErrorBoundary>
  </StrictMode>
)

const express = require('express')
const multer = require('multer')
const {
    seedDatabase,
    getProducts,
    addProduct,
    deleteProduct,
    getCategories,
    addCategory,
    deleteCategory,
    updateProduct,
    updateCategory,
    downloadPdfFiles,
    getLogo,
    pdfUpload,
    uploadBanner,
    getBanners,
    deleteBanner,
    updateBanner,
    AddBlog,
    getBlogs,
    deleteBlog,
    addService,
    getServices,
    updateService,
    deleteService,
    businessProducts,
    addCertificate,
    deleteCertificate,
    getCertificate,
    addCountry,
    getCountry,
    deleteCountry,
    addCatalogue,
    getCatalogues,
    deleteCatalogue,
    getPriceList,
    addPriceItem,
    updatePriceItem,
    deletePriceItem,
    getGallery,
    addGalleryImages,
    deleteGalleryImage,
} = require('../Controller/Controller')
const { authenticate, login, session } = require('../Controller/AuthController')
const { uploadLogo, getQueries, UploadPdf, dashboardBanners } = require('../Controller/AdminController')
const { isDatabaseReady, requireDatabase } = require('../Database Connection/DB_Connection')

const router = express.Router()
const upload = multer({
    dest: 'uploads/',
    limits: { fileSize: 15 * 1024 * 1024, files: 20 },
})

router.get('/', (_req, res) => {
    res.json({ service: 'ITC API', status: 'online' })
})

router.get('/health', (_req, res) => {
    const database = isDatabaseReady() ? 'connected' : 'reconnecting'
    res.status(200).json({
        service: 'ITC API',
        status: 'online',
        database,
        ready: database === 'connected',
        timestamp: new Date().toISOString(),
    })
})

// Every route below this line needs a live database. The middleware responds
// immediately with a friendly 503 instead of allowing buffered queries to hang.
router.use(requireDatabase)

router.post('/login', login)
router.get('/session', authenticate, session)

// Public catalogue/content routes.
router.get('/getProducts', getProducts)
router.get('/getCategories', getCategories)
router.get('/getCertificate', getCertificate)
router.get('/getLogo', getLogo)
router.get('/getCountry', getCountry)
router.get('/getBanners', getBanners)
router.get('/getBlogs', getBlogs)
router.get('/download/:fileId', downloadPdfFiles)
router.get('/getServices', getServices)
router.get('/getBusinessProducts', businessProducts)
router.get('/getCatalogues', getCatalogues)
router.get('/getPriceList', getPriceList)
router.get('/getGallery', getGallery)

// Private dashboard reads.
router.get('/getQueries', authenticate, getQueries)
router.get('/dashboardBanners', authenticate, dashboardBanners)

// Private setup and content mutations.
router.post('/admin/seed', authenticate, seedDatabase)
router.post('/addProduct', authenticate, upload.any(), addProduct)
router.post('/addCategory', authenticate, upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'bannerImage', maxCount: 1 },
]), addCategory)
router.post('/addCertificate', authenticate, upload.fields([
    { name: 'image', maxCount: 1 },
]), addCertificate)
router.post('/addBlog', authenticate, upload.fields([
    { name: 'images', maxCount: 10 },
    { name: 'pdf', maxCount: 1 },
]), AddBlog)
router.post('/uploadBanner', authenticate, upload.array('images', 10), uploadBanner)
router.post('/logoUpload', authenticate, upload.array('images', 5), uploadLogo)
router.post('/upload-pdf', authenticate, UploadPdf)
router.post('/pdf', authenticate, upload.single('pdf'), pdfUpload)
router.post('/addService', authenticate, addService)
router.post('/addCountry', authenticate, upload.array('images', 5), addCountry)
router.post('/addCatalogue', authenticate, upload.fields([
    { name: 'pdf', maxCount: 1 },
    { name: 'image', maxCount: 1 },
]), addCatalogue)
router.post('/addPriceItem', authenticate, upload.any(), addPriceItem)
router.post('/addGalleryImages', authenticate, upload.array('images', 20), addGalleryImages)

router.put('/updateBanner/:id', authenticate, upload.fields([{ name: 'images', maxCount: 1 }]), updateBanner)
router.put('/updatePriceItem/:id', authenticate, upload.any(), updatePriceItem)
router.put('/updateProduct/:id', authenticate, upload.any(), updateProduct)
router.put('/updateService/:id', authenticate, updateService)
router.put('/updateCategory/:id', authenticate, upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'bannerImage', maxCount: 1 },
]), updateCategory)

router.delete('/deleteProduct', authenticate, deleteProduct)
router.delete('/deleteCategory', authenticate, deleteCategory)
router.delete('/deleteBanner', authenticate, deleteBanner)
router.delete('/deleteBlog', authenticate, deleteBlog)
router.delete('/deleteCountry', authenticate, deleteCountry)
router.delete('/deleteService', authenticate, deleteService)
router.delete('/deleteCertificate', authenticate, deleteCertificate)
router.delete('/deleteCatalogue/:id', authenticate, deleteCatalogue)
router.delete('/deletePriceItem', authenticate, deletePriceItem)
router.delete('/deleteGalleryImage', authenticate, deleteGalleryImage)

module.exports = { router }

require('dotenv').config({ path: require('path').join(__dirname, '../.env') })
const cloudinary = require('cloudinary')
const mongoose = require('mongoose')
const { Products } = require('../Model/Prodcuts')

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
})

const FIXES = [
    {
        name: 'Medium Sand',
        url: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80',
    },
    {
        name: 'Fill Sand',
        url: 'https://images.unsplash.com/photo-1553701538-b3c2a5b2d2bb?w=800&q=80',
    },
]

async function run() {
    await mongoose.connect(process.env.MongoDB_URL)
    console.log('DB connected')

    for (const entry of FIXES) {
        try {
            console.log(`Uploading: ${entry.name} ...`)
            const result = await cloudinary.v2.uploader.upload(entry.url, {
                folder: 'anher-products',
                transformation: [{ width: 800, height: 600, crop: 'fill', quality: 'auto' }],
            })
            await Products.findOneAndUpdate({ name: entry.name }, { imageUrl: [result.secure_url] })
            console.log(`  ✓ ${entry.name} → ${result.secure_url}`)
        } catch (err) {
            console.error(`  ✗ ${entry.name}:`, err.message)
        }
    }

    console.log('Done!')
    process.exit(0)
}

run()

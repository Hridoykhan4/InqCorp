/**
 * One-time script: upload real product images to Cloudinary and update DB
 * Run: node scripts/seedImages.js
 */

require('dotenv').config({ path: require('path').join(__dirname, '../.env') })
const cloudinary = require('cloudinary')
const mongoose = require('mongoose')
const { Products } = require('../Model/Prodcuts')

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
})

// High-quality Unsplash images for each construction material
const PRODUCT_IMAGES = [
    {
        name: 'Fine Sand',
        url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    },
    {
        name: 'Medium Sand',
        url: 'https://images.unsplash.com/photo-1591812020980-19a9a95e8d93?w=800&q=80',
    },
    {
        name: 'Coarse Sand',
        url: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80',
    },
    {
        name: 'Stone Chips 5–10mm',
        url: 'https://images.unsplash.com/photo-1550159930-40066082a4fc?w=800&q=80',
    },
    {
        name: 'Stone Chips 10–20mm',
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    },
    {
        name: 'Stone Chips 20–40mm',
        url: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80',
    },
    {
        name: 'Boulder / Pathor',
        url: 'https://images.unsplash.com/photo-1536431311719-398b6704d4cc?w=800&q=80',
    },
    {
        name: 'Fill Sand',
        url: 'https://images.unsplash.com/photo-1579380988396-c5b34ac9c2ca?w=800&q=80',
    },
]

async function run() {
    await mongoose.connect(process.env.MongoDB_URL)
    console.log('DB connected')

    for (const entry of PRODUCT_IMAGES) {
        try {
            console.log(`Uploading image for: ${entry.name} ...`)

            const result = await cloudinary.v2.uploader.upload(entry.url, {
                folder: 'anher-products',
                transformation: [{ width: 800, height: 600, crop: 'fill', quality: 'auto' }],
            })

            const updated = await Products.findOneAndUpdate(
                { name: entry.name },
                { imageUrl: [result.secure_url] },
                { new: true }
            )

            if (updated) {
                console.log(`  ✓ ${entry.name} → ${result.secure_url}`)
            } else {
                console.log(`  ✗ Product not found: ${entry.name}`)
            }
        } catch (err) {
            console.error(`  ✗ Error for ${entry.name}:`, err.message)
        }
    }

    console.log('\nDone!')
    process.exit(0)
}

run()

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GallerySchema = Schema({
    imageUrl: { type: String, required: true },
    title: { type: String, default: '' },
    order: { type: Number, default: 0 },
}, { timestamps: true })

const Gallery = mongoose.model('gallery', GallerySchema)

module.exports = { Gallery }

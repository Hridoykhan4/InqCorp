const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, trim: true, index: true },
    imageUrl: { type: [String], default: [] },
    bannerImgUrl: { type: [String], default: [] },
}, { timestamps: true })

const Categories = mongoose.model('categories', CategorySchema)

module.exports = { Categories }

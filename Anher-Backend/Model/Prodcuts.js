const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    model: { type: String, required: true, unique: true, trim: true, index: true },
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true, index: true },
    description: { type: String, required: true, trim: true },
    imageUrl: { type: [String], default: [] },
    parameter: { type: [mongoose.Schema.Types.Mixed], default: [] },
    packingData: { type: [mongoose.Schema.Types.Mixed], default: [] },
    pdf: { type: mongoose.Schema.Types.Mixed, default: {} },
}, { timestamps: true })

const Products = mongoose.model('products', ProductSchema)

module.exports = { Products }

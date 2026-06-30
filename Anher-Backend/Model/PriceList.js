const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PriceListSchema = Schema({
    name: { type: String, required: true },
    size: { type: String, default: '' },
    price: { type: Number, required: true },
    unit: { type: String, default: 'CFT' },
    imageUrl: { type: String, default: '' },
    order: { type: Number, default: 0 },
}, { timestamps: true })

const PriceList = mongoose.model('pricelist', PriceListSchema)

module.exports = { PriceList }

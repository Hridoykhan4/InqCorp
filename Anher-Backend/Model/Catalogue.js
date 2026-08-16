const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CatalogueSchema = Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '', trim: true },
    pdfUrl: { type: String, default: '', trim: true },
    imageUrl: { type: String, default: '', trim: true }
},

    {
        timestamps: true
    }
)

const Catalogue = mongoose.model('Catalogue', CatalogueSchema)

module.exports = {
    Catalogue
}

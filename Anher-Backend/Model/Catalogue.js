const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CatalogueSchema = Schema({
    title: String,
    description: String,
    pdfUrl: String,
    imageUrl: String
},

    {
        timestamps: true
    }
)

const Catalogue = mongoose.model('Catalogue', CatalogueSchema)

module.exports = {
    Catalogue
}
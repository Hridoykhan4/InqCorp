const mongoose = require('mongoose')

const SupportSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true, maxlength: 100 },
    phone: { type: String, required: true, trim: true, maxlength: 30 },
    type: { type: String, trim: true, maxlength: 80, default: 'Project enquiry' },
    email: { type: String, trim: true, lowercase: true, maxlength: 160, default: '' },
    description: { type: String, required: true, trim: true, maxlength: 3000 },
    subject: { type: String, trim: true, maxlength: 160, default: '' },
}, { timestamps: true })

const Supports = mongoose.model('supports', SupportSchema)

module.exports = {
    Supports
}

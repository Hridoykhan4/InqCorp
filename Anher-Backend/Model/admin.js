const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        default: 'ITC Administrator',
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 10,
        select: false,
    },
    role: {
        type: String,
        enum: ['admin'],
        default: 'admin',
    },
    status: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true })

const Admin = mongoose.model('admins', AdminSchema)

module.exports = { Admin }

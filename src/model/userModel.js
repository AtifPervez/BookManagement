const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    title: {
        type: String,
        enum: ["Mr", "Mrs", "Miss"],
        trim: true,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    address: {
        street: {
            type: String
        },
        city: {
            type: String

        },
        pincode: {
            type: Number

        }

    }




},{timestamps:true})

module.exports = mongoose.model('user', userSchema)
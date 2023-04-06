const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
const isbn=require('node-isbn')
const moment=require('moment')
const bookSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    excerpt: {
        type: String,
        required: true
    },
    userId: {
        type: ObjectId,
        ref: "user",
        required: true
    },
    ISBN: {
        type: String,
        
        
    },
    category: {
        type: String,
        required: true
    },
    subcategory: {
        type: String,
        required: true
    },
    reviews: {
        type: Number,
        default: 0
    },
    deletedAt: {
        type: Date
    },
    isDeleted: {
        type:Boolean,
        default: false
    },
    releasedAt:{
        type:String,
        default:moment().format('DD-MM-YYYY'),
    }
        


},{timestamps:true})

module.exports = mongoose.model('book', bookSchema)










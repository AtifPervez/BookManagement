const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
const moment = require('moment')

const reviewSchema = new mongoose.Schema({

    ObjectId: { type: ObjectId },

    reviewedBy: { type: String, default: 'guest', trim: true },

    reviewedAt: { type: Date, default: moment().format('DD-MM-YYYY'), trim: true },

    rating: { type: Number, trim: true,minLength:1,maxLength:5 },

    review: { type: String, trim: true },

    isDeleted: { type: Boolean, default: false }

}, { timestamps: true }
)


module.exports = mongoose.model('review', reviewSchema)









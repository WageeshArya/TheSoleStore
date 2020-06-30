const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    company: {
        type: String
    },
    description: {
        type: String
    },
    year: {
        type: Number
    },
    productImage: {
        type: String,
        required: true
    },
    productFullImage: {
        type: String
    }
})

module.exports = mongoose.model('Product', productSchema);
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
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    productImage: {
        type: String,
        required: true
    },
    productImageName: {
        type: String,
        required: true
    },
    fullProductImage: {
        type: String,
        required: true
    },
    fullProductImageName: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Product', productSchema);
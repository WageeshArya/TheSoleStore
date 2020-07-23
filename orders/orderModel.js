const mongoose = require('mongoose');

const orderModel = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    default: 1,
    required: true 
  },
},{
  timestamps: { createdAt: true, updatedAt: false }
});

module.exports = mongoose.model('Order', orderModel)
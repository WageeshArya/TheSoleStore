const mongoose = require('mongoose');

const orderModel = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true 
  }
});

module.exports = mongoose.model('Order', orderModel)
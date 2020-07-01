const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const Product = require('../models/productModel');
const Order = require('../models/orderModel');

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'GET for orders'
  })
});

router.post('/', (req, res, next) => {
  Product.findById(req.body.productId)
  .exec()
  .then(result => {
    if(result) {
      const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        productId: req.body.productId,
        quantity: req.body.quantity
      });
      order
        .save()
        .then(result => {
          res.status(201).json({
            _id: order._id,
            productId: order.productId,
            quantity: order.quantity
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
    }
    else {
      res.status(404).json({
        message: 'Product not found'
      });
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:orderId',(req, res, next) => {
  const id = req.params.orderId;
  Order.deleteOne({_id: id})
  .exec()
  .then(result => {
    res.status(200).json({
      message: 'Order deleted',
            request: {
                type: 'POST',
                url: 'http://localhost:5000/products',
                body: { name: 'String', price: 'Number' }
            }
    });
  })
  .catch(err => {
    res.status(500).json({
      error: err
    })
  });
});

module.exports = router;
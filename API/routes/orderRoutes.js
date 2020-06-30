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
    console.log(req.body.productId);
    if(result) {
      console.log(result);
      res.status(200).json(result);
    }
    else {
      res.status(404).json({
        message: 'Product not found'
      })
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
})

module.exports = router;
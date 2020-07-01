const Order = require('./orderModel');
const Product = require('../products/productModel');
const User = require('../users/userModel');
const mongoose = require('mongoose');

exports.getAllOrders = (req, res, next) => {
  Order.find().exec().then(docs => {
    const response = {
      count: docs.length,
      users: docs.map(doc => {
        return {
          id: doc._id,
          email: doc.email
        }
      })
    }
    res.status(200).json(response);
  }).catch(err => {
    res.status(500).json({
      error: err
    })
  })
}

exports.createNewOrder = (req, res, next) => {
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
          User.findOneAndUpdate({_id: req.params.userId}, {$push: {orders: order}})
          .exec()
          .then(result => { 
            res.status(201).json({
              _id: order._id,
              productId: order.productId,
              quantity: order.quantity
            })
          }).catch(err => {
            console.log('error inside');
            res.status(500).json({
              error: err
            })
          })
        })
        .catch(err => {
          console.log('error outside');
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
}

exports.deleteOrder = (req, res, next) => {
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
}
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/userModel');
const Product = require('../models/productModel');
const Order = require('../models/orderModel');

router.post('/login', (req, res, next) => {
  User.find({email: req.body.email})
    .exec()
    .then(user => {
      if(user.length < 1){
        return res.status(401).json({
          error: "Authorization failed"
        });
      }
      bcrypt.compare(req.body.password,user[0].password,(err, result => {
        if(result) {
          const token = jwt.sign({
            userId: user[0]._id,
            email: user[0].email
          }, process.env.JWT_SECRET_KEY, {expiresIn: "2h"});
          console.log(token);
          return res.status(200).json({
            message: "logged in",
            token: token
          })
        }
        else {
          console.log(err);
          res.status(500).json(err);
        }
      }));
    })
    .catch(err => {
      res.status(401).json({
        error: err
      })
    });
});

router.post('/signup', (req, res, next) => {
  User.find({email: req.body.email})
  .exec()
  .then(found => {
    if(found.length >= 1) {
      return res.status(500).json({
        message: 'Email id already exists'
      })
    }
    else {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err) {
          console.log(err);
          res.status(500).json({
            error: err
          });
        }
        else {
          const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: hash
          });
          user
            .save()
            .then(result => {
              res.status(201).json({
                message: "User Created"
              })
            })
            .catch(err => {
              res.status(500).json(err);
            })
        }
      })
    }
  })
})

module.exports = router;
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('./userModel');
const adminAuth = require('../auth/adminAuth');
const checkAuth = require('../auth/checkAuth');

router.get('/', (req, res, next) => {
  User.find().exec().then(docs => {
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
})

router.get('/:userId', checkAuth, (req, res, next) => {
  User.findById(req.params.userId)
  .exec()
  .then(user => {
    console.log(user.orders.length);
    if(user.orders.length >= 1){
      const response = {
      _id: user._id,
      email: user.email,
      orders: {
        count: user.orders.length,
        allOrderIds: user.orders
      }
    }
      console.log(response);
      res.status(200).json(response);
    }
    else {
      const response = {
       _id: user._id,
       email: user.email,
       orders: []
      }
      res.status(200).json(response);
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    })
  })
})

router.post('/login', (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
        console.log(user);
        if(user.length < 1) {
            return res.status(401).json({
                message: 'Auth failed'
            });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if(result) {
            const token = jwt.sign({
              email: user[0].email,
              userId: user[0]._id 
            }, process.env.JWT_SECRET_KEY, 
            {
              expiresIn: "1h"
            });
            return res.status(200).json({
              message: 'Auth successful',
              token: token
            })
          }
          else {
            return res.status(401).json({
              message: 'Auth failed',
            });
          }
        })
    })
    .catch(err => {
        console.log(err);
        res.status(401).json({
            error: err
        })
    })
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

router.delete('/:userId', adminAuth, (req, res, next) => [
  User.deleteOne({_id:req.param.userId}).exec()
  .then(result => {
    res.status(200).json({
      message: "user deleted"
    })
  })
  .catch(err => {
    res.status(500).json({
      error: err
    })
  })
])
module.exports = router;
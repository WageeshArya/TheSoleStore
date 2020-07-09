const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const AdminAuth = require('../auth/adminAuth');
const Admin = require('./adminModel');
const adminAuth = require('../auth/adminAuth');

//GET ALL ADMINS
router.get('/', AdminAuth, (req, res, next) => {
  Admin.find()
  .select('_id email')
  .exec()
  .then(docs => {
    const response = {
      count: docs.length,
      admins: docs.map(doc =>{ 
        return {
          _id: doc._id,
          email: doc.email
        }
      })
    }
    res.status(200).json(response);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    })
  });
});
//GET PARTICULAR ADMIN
router.get('/:adminId', AdminAuth, (req, res, next) => {
  Admin.findById(req.params.adminId).exec()
  .then(result => {
    console.log(result);
    res.status(200).json({
      _id: result._id,
      email: result.email
    })
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    })
  });
});

//ADMIN LOGIN
router.post('/login', (req, res, next) => {
  Admin.find({email: req.body.email}).exec()
  .then(admin => {
    if(admin.length <1) {
      return res.status(409).json({
        message: "admin not registered"
      })
    }
    else {
      bcrypt.compare(req.body.password, admin[0].password, (err, result) => {
        if(result) {
          const token = jwt.sign({
            email: admin[0].email,
            adminId: admin[0]._id 
          }, process.env.ADMIN_SECRET_KEY, 
          {
            expiresIn: "3h"
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
      });
    }
    
  })
  .catch(err => {
    console.log(err);
    res.status(401).json({
        error: err
    });
  })
})

//POST NEW ADMIN
router.post('/', (req, res, next) => {
  Admin.find({email: req.body.email}).exec()
  .then(doc => { 
    if(doc.length >= 1) {
      return res.status(409).json({
        message: "admin email already registered"
      });
    }
    else {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err) {
          console.log(err);
          res.status(500).json(err);
        }
        else{
          const admin = new Admin({
            _id: new mongoose.Types.ObjectId,
            email: req.body.email,
            password: hash
          });
          admin
            .save()
            .then(result => {
              console.log(result);
              res.status(201).json(result);
            })
            .catch(err => {
              console.log(err);
              res.status(500).json({
                error: err
              });
            })
        }

      });
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    })
  })
});

router.patch('/:adminId', AdminAuth, (req, res, next) => {

  const updateFields = {}

  for (newData of req.body){
    updateFields[newData.fieldName] = newData.fieldValue
  }

  Admin.updateOne({_id: req.params.adminId}, {$set: updateFields})
  .exec()
  .then(result => {
    console.log(result);
    res.status(201).json({
      message: "Admin updated"
    })
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    })
  })
})

//DELETE ADMIN
router.delete('/:adminId', AdminAuth, (req, res, next) => {
  Admin.deleteOne({_id: req.params.adminId})
  .exec()
  .then(result => {
    res.status(200).json({
      message: "admin deleted"
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    })
  }) 
})

module.exports = router;


require("dotenv").config();
const Product = require('./productModel');
const mongoose = require('mongoose');
const aws = require('aws-sdk');
const upload = require('../services/imageUpload');

exports.getAllProducts = (req, res, next) => {
  Product.find().select('_id name price company year productImage fullProductImage description').exec().then(docs => {
      console.log(docs);
        res.status(200);
        res.send({products: JSON.stringify(docs)});
  }).catch(err => {
      console.log(err);
      res.status(500).json({
          error: err
      });
  });
}

exports.getProduct = (req, res, next) => {
  const id = req.params.productId;
  Product
  .findById(id)
  .select('name price company year description productImage fullProductImage')
  .then(doc => {
      console.log(doc);
      res.status(200).json(doc);
  })
  .catch(error => {
      res.status(500).json(error);
  }) 
}

exports.createNewProduct = (req, res, next) => {

    const img1 = req.files[0];
    const img2 = req.files[1];

    let s3 = new aws.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION
    });
    
    let params = {
        Bucket: 'thesolestore',
        Key: process.env.AWS_URL + img1.originalname,
        Body: img1.buffer,
        ContentType: img1.mimetype,
        ACL: 'public-read'
    }

    s3.upload(params, function(err, data) {
        if(err) {
            res.status(500).json({err: err});
        }
        else {
            params = {
                Bucket: 'thesolestore',
                Key: process.env.AWS_URL + img2.originalname,
                Body: img2.buffer,
                ContentType: img2.mimetype,
                ACL: 'public-read'
            }

            s3.upload(params, function(err2, data2) {   
                if(err2) {
                    res.status(500).json({err: err});
                }
                else {
                    const product = new Product({
                        _id: new mongoose.Types.ObjectId(),
                        name: req.body.name,
                        price: req.body.price,
                        description: req.body.description,
                        company: req.body.company,
                        year: req.body.year,
                        productImage: process.env.AWS_URL + img1.originalname,
                        productImageName: img1.originalname,
                        fullProductImage: process.env.AWS_URL + img2.originalname,
                        fullProductImageName: img2.originalname
                    });
        
                    product
                    .save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: "product created",
                            createdProduct: product
                        })
                    })
                    .catch(error => {
                        console.log(error);
                        res.status(500).json({
                            error: error,
                            message: "inside"
                        })
                    })
                }
            })
                }
            })

}

exports.searchProducts = (req, res, next) => {
    const search = req.body.searchTerm;
    const sortBy = req.body.sortBy;
    if(sortBy === undefined) {
        Product.find({
            $or: [
                {name: {$regex: new RegExp(search), $options: "i"}},
                {company: {$regex: new RegExp(search), $options: "i"}}
            ]
        })
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    }
    else {
        let sort;
        if(sortBy === 'asc-price')
            sort = 1;
        else if(sortBy === 'des-price')
            sort = -1;
        Product.find({
            $or: [
                {name: {$regex: new RegExp(search), $options: "i"}},
                {company: {$regex: new RegExp(search), $options: "i"}}
            ]
        }).sort({price: sort})
        .select('name price company year description productImage fullProductImage')
        .exec()
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json(err);
        })
    }
}

exports.updateProduct = (req, res, next) => {
  const id = req.params.productId;
  let updateFields = {};
  for(field of req.body) {
      updateFields[field.fieldName] = field.value;
  }
  console.log(updateFields);
  Product.updateOne({_id: id},{$set: updateFields}).exec()
  .then(result => {
      console.log(result);
      res.status(200).json({
          message: "Product updated!"
      });
  })
  .catch(error => {
      console.log(error);
      res.status(500).json({
          error: error
      });
  });
}

exports.deleteProduct = (req, res, next) => {
  const id = req.params.productId;

  Product.deleteOne({_id: id})
  .exec()
  .then(result => {
    let productImageName, fullProductImageName;
    Product
    .findById(id)
    .select('productImageName fullProductImageName ')
    .then(doc => {
        productImageName = doc.productImageName;
        fullProductImageName = doc.fullProductImageName;
    })
    .catch(error => {
        res.status(500).json({error: error});
    }) 

    let s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
    });
    
    let params = {
    Bucket: process.env.BUCKET_NAME,
    Key: productImageName
    };
    s3.deleteObject(params, (err, data) => {
        if(err) {
        res.status(500).json({err: err});
        }
        else {
            params = {
            Bucket: 'thesolestore',
            Key: fullProductImageName
            }
            s3.deleteObject(params, (err2, data2) => {
            if(err2) {
                res.status(500).json({err2: err2})
            }
            else {
                res.status(200).json({message: 'product deleted!'})
            }
            })
        }
    })

    res.status(200).json({
        message: 'product deleted',
        request: {
            type: 'POST',
            url: 'http://localhost:5000/products',
            body: { name: 'String', price: 'Number' }
        }
    });
  })
  .catch(err => {
      console.log(err);
      res.status(500).json({
          error: err
      });
  });
}
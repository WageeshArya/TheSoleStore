const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/productModel');

mongoose.connect(`mongodb+srv://WageeshArya:${process.env.MONGODB_ATLAS_PASS}@thesolestore.zqilv.mongodb.net/<dbname>?retryWrites=true&w=majority`, {
    useUnifiedTopology: true,
    useNewUrlParser: true 
});

router.get('/', (req, res, next) => {
    Product.find().select('name price').exec().then(docs => {
        res.status(200).json({
            count: docs.length,
            products: docs.map(doc => {
                return {
                    name: doc.name,
                    price: doc.price
                };
            })
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product
    .find({id: id})
    .select('name price')
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(error => {
        res.status(500).json(error);
    }) 
});

router.post('/', (req, res, next) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price
    })
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
});

router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    let updateFields = {};
    for(field of req.body) {
        updateFields[field.fieldName] = field.value;
    }
    console.log(updateFields);
    Product.updateOne({id: id},{$set: updateFields}).exec()
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
});

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.remove({id: id}).exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
})

module.exports = router;
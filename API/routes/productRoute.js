const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const Product = require('../models/productModel');

mongoose.connect(`mongodb+srv://WageeshArya:${process.env.MONGODB_ATLAS_PASS}@thesolestore.zqilv.mongodb.net/<dbname>?retryWrites=true&w=majority`, {
    useUnifiedTopology: true,
    useNewUrlParser: true 
});

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null,'./uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') +'-'+ file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
        cb(null, true);
    else 
        cb(null, false);
}

const upload = multer({
    storage: storage,
    fileFiler: fileFilter,
    limits: {
        fileSize: 1024*1024*2
    }
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
    .findById(id)
    .select('name price')
    .then(doc => {
        console.log(doc);
        res.status(200).json(doc);
    })
    .catch(error => {
        res.status(500).json(error);
    }) 
});

router.post('/', upload.single('productImage'), (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        company: req.body.company,
        year: req.body.year,
        productImage: req.file.path
    })
    console.log(req.file);
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
});

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.deleteOne({_id: id})
    .exec()
    .then(result => {
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
});

module.exports = router;
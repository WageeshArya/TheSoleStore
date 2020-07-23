require("dotenv").config();
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const productController = require('./productController');
const adminAuth = require('../auth/adminAuth');

// console.log(process.env.AWS_SECRET_ACCESS_KEY);
// console.log(process.env.AWS_ACCESS_KEY_ID);

var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

const s3 = new aws.S3();
aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    bucket: process.env.BUCKET_NAME,
    region: process.env.REGION
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
        cb(null, true);
    else 
        cb(null, false);
}

mongoose.connect(`mongodb+srv://WageeshArya:${process.env.MONGODB_ATLAS_PASS}@thesolestore.zqilv.mongodb.net/<dbname>?retryWrites=true&w=majority`, {
    useUnifiedTopology: true,
    useNewUrlParser: true 
});

router.get('/', productController.getAllProducts);

router.get('/:productId', productController.getProduct);

router.post('/search', productController.searchProducts);

router.post('/', adminAuth, upload.any(), productController.createNewProduct);

router.patch('/:productId', adminAuth, productController.updateProduct );

router.delete('/:productId', adminAuth, productController.deleteProduct);


module.exports = router;
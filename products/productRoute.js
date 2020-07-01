const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

const productController = require('./productController');
const adminAuth = require('../auth/adminAuth');

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

router.get('/', productController.getAllProducts);

router.get('/:productId', productController.getProduct);

router.post('/', adminAuth, upload.single('productImage'), productController.createNewProduct);

router.patch('/:productId', adminAuth, productController.updateProduct );

router.delete('/:productId', adminAuth, productController.deleteProduct);

module.exports = router;
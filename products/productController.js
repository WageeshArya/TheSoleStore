const Product = require('./productModel');
const mongoose = require('mongoose');

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
  console.log(id);
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
  const product = new Product({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      company: req.body.company,
      year: req.body.year,
      productImage: req.files[0].path,
      fullProductImage: req.files[1].path
  });
  console.log(req.files);
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
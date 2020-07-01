const Product = require('./productModel');

exports.getAllProducts = (req, res, next) => {
  Product.find().select('_id name price').exec().then(docs => {
      res.status(200).json({
          count: docs.length,
          products: docs.map(doc => {
              return {
                  _id: doc._id,
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
}

exports.getProduct = (req, res, next) => {
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
}

exports.createNewProduct = (req, res, next) => {
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
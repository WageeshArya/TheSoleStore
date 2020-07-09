import React from 'react';
import ProductCard from './ProductCard';
import product from './Product';
import './ProductsArea.css';

export const ProductsArea = ({products, loading}) => {

  if(loading) {
    return (
      <div>loading</div>
    )
  }
  else {
    console.log(products);
    return (
      <div className="productsArea">
        {
          products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))
        }
      </div>
    )
  }
}
export default ProductsArea;
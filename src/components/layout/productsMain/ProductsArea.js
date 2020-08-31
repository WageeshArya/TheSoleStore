import React from 'react';
import ProductCard from './ProductCard';
import './ProductsArea.css';

export const ProductsArea = ({products, loading}) => {

  if(loading) {
    return (
      <div>loading</div>
    )
  }
  else {
    return (
      <div className="productsAreaDiv">
        <div className="productsArea">
          {
            products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))
          }
        </div>
      </div>
    )
  }
}
export default ProductsArea;
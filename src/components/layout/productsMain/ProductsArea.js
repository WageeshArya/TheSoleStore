import React from 'react';
import ProductCard from './ProductCard';

export const ProductsArea = ({products, loading}) => {

  const all_products = JSON.parse(products);

  if(loading) {
    return (
      <div>loading</div>
    )
  }
  else {
    console.log(products);
    return (
      <div>
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
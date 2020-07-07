import React from 'react';
import product from './Product';

export const ProductCard = (props) => {

  const {name, price, description, productImage} = props.product;
  console.log(props.product);
  return (
    <div class="productCard">
      <p>{name}</p>
    </div>
  )
}

export default ProductCard;
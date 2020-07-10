import React from 'react';
import { Link } from 'react-router-dom';
import product from './Product';
import './ProductCard.css';
import atc from '../../../icons/atc.png';

export const ProductCard = (props) => {

  const {_id ,name, price, company, productImage} = props.product;
  
  return (
    <div className="productCard">
      <div className="cardTop">
      <div>
        <h1>{company}</h1>
        <h2>{name}</h2>
      </div>
      <div>
        <div className="atc">Add to cart</div>
      </div>
      </div>
      <div className="productImage">
        <Link to={`/shoes/${_id}`}><img src={`http://localhost:5000/${productImage}`} alt="product image"/></Link>
      </div>
      <div className="cardBottom">
        <div> <Link to={`/shoes/${_id}`} className="view">View</Link></div>
        <div className="price">${price}</div>
      </div>
      
    </div>
  )
}

export default ProductCard;
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addToCart } from '../../../actions/cartActions';
import './ProductCard.css';

export const ProductCard = (props) => {

  const {_id , name, price, company, productImage} = props.product;

  function atc() {
    const prod = {
      _id: _id,
      name: name,
      price: price,
      company: company
    }
    props.addToCart(prod);
  }
  
  return (
    <div className="productCard">
      <div className="cardTop">
      <div>
        <h1>{company}</h1>
        <h2>{name}</h2>
      </div>
      <div>
        <div className="atc" onClick={atc}>Add to cart</div>
      </div>
      </div>
      <div className="productImage">
        <Link to={`/shoes/${_id}`}><img src={`http://localhost:5000/${productImage}`} alt="product img"/></Link>
      </div>
      <div className="cardBottom">
        <div> <Link to={`/shoes/${_id}`} className="view">View</Link></div>
        <div className="price">${price}</div>
      </div>
      
    </div>
  )
}

const mapStateToProps = (state) => ({
  cart: state.cart.cart,
  total: state.cart.total
})

export default connect(mapStateToProps, {addToCart})(ProductCard);
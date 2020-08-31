import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addToCart, resetLoginErr } from '../../../actions/cartActions';
import './ProductCard.css';

export const ProductCard = (props) => {
  const [showAddedToCart, setShowAddedToCart] = useState(false);
  const {_id , name, price, company, productImage} = props.product;
  console.log(productImage);
  const atc = () => {
    const prod = {
      _id: _id,
      name: name,
      price: price,
      company: company
    }
    props.addToCart(prod);
    setTimeout(() => {
      props.resetLoginErr();
    },3000)
    setShowAddedToCart(true);
    setTimeout(() => {
      setShowAddedToCart(false);
    },1500);
  }
  
  return (
    <div className="productCard">
      <div className={ props.loggedIn && showAddedToCart? 'showAdded': 'hideAdded'}>Added To Cart!</div>
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
        <Link to={`/shoes/${_id}`}><img src={productImage} alt="product img"/></Link>
      </div>
      <div className="cardBottom">
        <div> <Link to={`/shoes/${_id}`} className="view">View</Link></div>
        <div className="price">${price}</div>
      </div>
      
    </div>
  )
}

const mapStateToProps = (state) => ({
  loginErr: state.users.loginErr,
  loggedIn: state.users.loggedIn
})

export default connect(mapStateToProps, { addToCart, resetLoginErr })(ProductCard);
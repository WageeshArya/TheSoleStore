import React, { useState } from 'react';
import './Cart.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { quantityUp, quantityDown, resetCart } from '../../../actions/cartActions';
import { newOrder } from '../../../actions/orderActions';

export const Cart = (props) => {

  const [ordered, setOrdered] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const incQuantity = (product) => {
    props.quantityUp(product);
  }

  const decQuantity = (product) => {
    props.quantityDown(product);
  }

  const placeOrder = () => {
    setOrderPlaced(true);
  }

  const newOrder = () => {
    setOrdered(true);
    props.newOrder(props.cart);
    setTimeout(() => {
      setOrderPlaced(false);
      setOrdered(false);
      props.resetCart();
      props.history.push("/shoes");
    }, 1500);
  }

  if(!props.loggedIn){
    return <div><strong>Error 401: </strong>Unauthorized</div>
  }
  // else if(props.total === 0) {
  //   return <div>
  //     please place items in your cart first
  //   </div>
  // }
  return (
    <div className="cart">
      <div className="cartHeader">
        <h1>Your Cart</h1>
        <div><Link to="/shoes">Browse more shoes</Link></div>
      </div>
      <div className={ordered ? 'ordered' : 'hideForm'}>Order Placed!</div>
      <div className={orderPlaced ? 'confirmOrder' : 'hideForm'}>
        <h1>Place order?</h1>
        <div>
          <button onClick={newOrder}>Confirm</button>
          <button onClick={() => setOrderPlaced(false)}>Cancel</button>
        </div>
      </div>
        
        
          <div className="cartContainer">
          {
            props.total===0 && <div><h2>Please place items in your cart first!</h2></div>
          }

          { props.total !==0 && 
            props.cart.map(product => {
              return <div>
                      <div className="cartItem">
                        <div>
                          <p>Product</p>
                          <br/>
                          {product.company}
                          <br/>
                          {product.name}
                        </div>
                        <div>
                          <p>Price</p>
                          <br/>
                          ${product.price}
                        </div>
                        <div>
                          <p>Quantity</p>
                          <br/>
                          <span onClick={() => incQuantity(product)} className="quantityUp">+</span><span className="itemQuantity">{product.quantity}</span><span onClick={() => decQuantity(product)} className="quantityDown">-</span>
                        </div>
                        <div>
                          <p>Subtotal</p>
                          <br/>
                          ${product.quantity * product.price}
                        </div>
                      </div>
                    </div>
            })
          }
          {
            props.total!==0 && 
            <div className="orderBtnArea">
              <button onClick={placeOrder} className="orderBtn">Place Order</button>
              <div className="total">
                <strong>Total:</strong> ${props.total}
              </div>
            </div>
          }
        </div>
      </div>
      
)}

const mapStateToProps = state => ({
  loggedIn: state.users.loggedIn,
  cart: state.cart.cart,
  total: state.cart.total
});

export default connect(mapStateToProps, { quantityUp, quantityDown, newOrder, resetCart })(Cart);
import React from 'react';
import './Cart.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { quantityUp, quantityDown } from '../../../actions/cartActions';
import { newOrder } from '../../../actions/orderActions';
export const Cart = (props) => {


  const incQuantity = (product) => {
    props.quantityUp(product);
  }

  const decQuantity = (product) => {
    props.quantityDown(product);
  }

  const placeOrder = () => {
    props.newOrder(props.cart);
    props.history.push("/orders");
  }

  console.log(props.cart);
  return (
    <div className="cart">
      <h1 style={{fontSize: '3rem', margin: 'rem', textDecoration: 'underline'}}>Your Cart</h1>
      <div className="cartContainer">
      {
        props.cart.map(product => {
          console.log(product);
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
      </div>
      <div className="orderBtnArea">
        <button onClick={placeOrder} className="orderBtn">Place Order</button>
        <div className="total">
          <strong>Total:</strong> ${props.total}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  cart: state.cart.cart,
  total: state.cart.total
});

export default connect(mapStateToProps, { quantityUp, quantityDown, newOrder })(Cart);
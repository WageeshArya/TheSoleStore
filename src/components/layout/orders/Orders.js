import React, { useEffect } from 'react';
import './Orders.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getOrders, deleteOrder } from '../../../actions/orderActions';
import del from '../../../icons/delete.svg';
import home from '../../../icons/home.svg';
export const Orders = (props) => {

  useEffect(() => {
    props.getOrders();
  }, [props.orders]);

  const delOrder = (orderId) => {
    props.deleteOrder(orderId);
  }

  if(!props.orders) {
    return <div>loading</div>
  }
  else {
    console.log(props.orders[0]);
    return (
      <div>
        <div className="ordersHeader">
          <h1 class="ordersTitle">Your Orders</h1>
          <Link to="/"><img src={home} alt="home"/></Link>
        </div>
        <div className="ordersArea">
          {
            props.orders[0].map(order => {
              return (
                    <div className="orderItem">
                        <div>
                          <div>
                            <p>Order details:</p>
                            <div className="value">{order.orderId}</div>
                            <p>Product id:</p>
                            <div className="value">{order.productId}</div>
                          </div>
                          <div>
                            <p>Quantity:</p>
                            <div className="value">{order.quantity}</div>
                          </div>
                          <div>
                            <p>Ordered on:</p>
                            <div className="value">{order.createdAt}</div>
                          </div>
                        </div>
                        <button onClick={() => delOrder(order.orderId)} className="deleteOrder"><img src={del} alt=""/></button>
                    </div>)
            })
          }
        </div>       
      </div>
    )
  }
}
const mapStateToProps = state => ({
  orders: state.orders.orders,
  userId: state.users._id
});

export default connect(mapStateToProps, { getOrders, deleteOrder })(Orders);
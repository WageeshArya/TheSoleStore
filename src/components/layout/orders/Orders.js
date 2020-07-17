import React, { useEffect } from 'react';
import './Orders.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getOrders } from '../../../actions/orderActions';
export const Orders = (props) => {

  useEffect(() => {
    props.getOrders();
  }, [props.orders]);

  if(!props.orders) {
    return <div>loading</div>
  }
  else {
    console.log(props.orders[0]);
    return (
      <div>
        <h1 class="ordersTitle">Your Orders</h1>
        <div className="ordersArea">
          {
            props.orders[0].map(order => {
              return (
                    <div className="orderItem">
                        <div>
                          <div>
                            <p>Order ID:</p>
                            <div className="value">{order.orderId}</div>
                          </div>
                          <div>
                            <p>Product ID:</p>
                            <div className="value">{order.productId}</div>
                          </div>
                          <div>
                            <p>Quantity:</p>
                            <div className="value">{order.quantity}</div>
                          </div>
                        </div>
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
  userId: state.users._id,
});

export default connect(mapStateToProps, { getOrders })(Orders);
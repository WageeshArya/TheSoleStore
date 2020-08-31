import React, { useEffect, useState } from 'react';
import './Orders.css';
import Loading from '../loading/Loading';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getOrders, deleteOrder } from '../../../actions/orderActions';
import del from '../../../icons/delete.svg';
import home from '../../../icons/home.svg';
export const Orders = (props) => {

  const [openConfirmDel, setOpenConfirmDel] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    props.getOrders();
  }, [props.orders])

  const delOrder = () => {
    props.deleteOrder(toDelete);
    setOpenConfirmDel(false);
    setToDelete(null);
  }

  const confirmDelete = (orderId) => {
    setToDelete(orderId);
    setOpenConfirmDel(true);
  }

  if(!props.loggedIn) {
    return <div><strong>Error 401: </strong>Unauthorized</div>
  }
  else if(!props.orders) {
    return <Loading/>
  }
  else {
    console.log(props.orders[0]);
    
    return (
      <div>
        <div className="ordersHeader">
          <h1 class="ordersTitle">Your Orders</h1>
          <Link to="/"><img src={home} alt="home"/></Link>
        </div>

        <div className={openConfirmDel ? 'confirmDelete' : 'hide'}>
          <h1>Delete order?</h1>
          <div>
            <button onClick={delOrder}>Delete</button>
            <button onClick={() => setOpenConfirmDel(false)}>Cancel</button>
          </div>
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
                        <button onClick={() => confirmDelete(order.orderId)} className="deleteOrder"><img src={del} alt=""/></button>
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
  loggedIn: state.users.loggedIn
});

export default connect(mapStateToProps, { getOrders, deleteOrder })(Orders);
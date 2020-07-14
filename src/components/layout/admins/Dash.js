import React from 'react';
import './Dash.css';
import { connect } from 'react-redux';

import edit from '../../../icons/edit.svg';
import del from '../../../icons/delete.svg';

export const Dash = (props) => {

  const products = props.products;
  
  // if(!props.adminLoggedIn) {
  //   return <div><strong>Error 401:</strong> Unauthorized</div>
  // } 

  return (
    <div className="dashBody">

      <div className="dashHead">
        <h1>Welcome to your Dashboard!</h1>
        <button className="addNew">Add new product</button>
      </div>

      {
        products.map((product => {
          return <div className="dashItem">
                  <div className="dashItemDetails">
                    <div className="dashItemAttr"><strong>_id: </strong> {product._id}</div>
                    <div className="dashItemAttr"><strong>name: </strong> {product.name}</div>
                    <div className="dashItemAttr"><strong>price: </strong> {product.price}</div>
                    <div className="dashItemAttr"><strong>description: </strong> {product.description}</div>
                  </div>
                  <div className="dashItemBtns">
                    <button><img src={del} alt="delete product" /></button>
                    <button><img src={edit} alt="edit produc" /></button>
                  </div>
                </div>
        }))
      }
    </div>
  )
}

const mapStateToProps = state => ({
  products: state.products.products,
  adminLoggedIn: state.admins.loggedIn
});

export default connect(mapStateToProps)(Dash);
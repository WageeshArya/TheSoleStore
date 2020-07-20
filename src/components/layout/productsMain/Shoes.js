import React, { useEffect, useState } from 'react';
import './Shoes.css';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getProducts, setLoading } from '../../../actions/productsActions';
import ProductsArea from './ProductsArea';
import Navbar from '../landing/Navbar';
import Search from './Search';
import LoginErr from '../error/LoginErr';
export const Shoes = (props) => {

  useEffect(() => {
    props.setLoading();
    props.getProducts();

    console.log(props.products);
    console.log(props.loading);
    
  }, []); 
  if(props.loading) {
    return (
      <h1>loading</h1>
    )
  }

  else {
    return (
      <div>
        <Navbar />
        <div className="shoes">
          <Search />
          {/* <LoginErr /> */}
          <div className={props.loginErr ? 'showLoginErr' : 'hideLoginErr'}>
            Please log in before adding items to cart
          </div>
          <h1 className="productsTitle">Our Selection</h1>
            <ProductsArea loading={props.loading} products={props.searched ? props.searchResults : props.products } /> 
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products.products,
  loading: state.products.loading,
  searchResults: state.products.searchResults,
  searched: state.products.searched,
  loginErr: state.cart.loginErr
})

export default connect(mapStateToProps, {getProducts, setLoading})(Shoes);
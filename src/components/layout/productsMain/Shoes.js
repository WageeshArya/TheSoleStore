import React, { useEffect } from 'react';
import './Shoes.css';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getProducts, setLoading } from '../../../actions/productsActions';
import ProductsArea from './ProductsArea';
import Navbar from '../landing/Navbar';
import Search from './Search';
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
  searched: state.products.searched
})

export default connect(mapStateToProps, {getProducts, setLoading})(Shoes);
import React, { useEffect } from 'react';
import './Shoes.css';
import { connect } from 'react-redux';
import Loading from '../loading/Loading';
import { getProducts, setLoading } from '../../../actions/productsActions';
import ProductsArea from './ProductsArea';
import Navbar from '../landing/Navbar';
import Search from './Search';
export const Shoes = (props) => {

  useEffect(() => {
    props.setLoading();
    props.getProducts();
    // window.location.reload(false);
  }, []); 
  if(props.loading) {
    return (
      <Loading />
    )
  }

  else {
    return (
      <div>
        <Navbar />
        <div className="shoesDiv">
          <div className="shoes">
            <Search />
            <div className={props.loginErr ? 'showLoginErr' : 'hideLoginErr'}>
              Please log in before adding items to cart
            </div>
            <h1 className="productsTitle">Our Selection</h1>
              <ProductsArea loading={props.loading} products={props.searched ? props.searchResults : props.products } /> 
          </div>
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
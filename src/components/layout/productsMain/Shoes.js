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
    // const getProducts = props.getProducts();
    // console.log(getProducts);
    // console.log(props.loading);
    // props.fetchData();
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
            <ProductsArea loading={props.loading} products={props.products} /> 
            {/* {
              props.products.map(product => (
                <ProductCard key={product._id} product={product} />
              ))
            } */}
        </div>
      </div>
    )
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     fetchData: () => dispatch(getProducts())
//   };
// };

const mapStateToProps = state => ({
  products: state.products.products,
  loading: state.products.loading
})

export default connect(mapStateToProps, {getProducts, setLoading} /*, mapDispatchToProps*/)(Shoes);
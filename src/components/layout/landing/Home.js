import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { getProducts, setLoading } from '../../../actions/productsActions';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import './Home.css';
import shoeGif from './shoeGif.gif';
import Loading from './Loading';
import Navbar from './Navbar';
import ProductSm from './ProductSm';
export const Home = (props) => {
  useEffect(() => {
    props.setLoading();
    props.getProducts();
    //eslint-disable-next-line
  }, []); 
  if(props.loading) {
    return <Loading />
  }
  else {
    
  return (
      <div>
        <Navbar />
        <div className="home">
          <div className="group-1">
            <div className="branding">
              <div className="brandName">
                The
                <br/>
                Sole
                <br/>
                Store
              </div>
              <div>
                  <p>The finest designs and fits.</p>
              </div>
            </div>
            <div className="viewProducts">
              <div>
                <p>
                  Check out our latest and greatest models
                </p>
                <Link className="productsBtn" to="/shoes">GO <i className="fas fa-arrow-right"/></Link>
              </div>
            </div>
          </div>
          <div className="group-2">
            <div className="products">
                <ProductSm />
                <ProductSm />
                <ProductSm />
                <ProductSm />
            </div>
            <div className="shoeGif">
              <lottie-player className="gif" src="https://assets7.lottiefiles.com/packages/lf20_S14LiY.json" style={{height: '300px', width: '300px'}} background="#E8F3F1"  speed="1.5" loop autoplay></lottie-player>
              {/* <img src={shoeGif} alt="gif"/> */}
            </div>
            </div>
        </div>
      </div>
  )
}
}
Home.propTypes = {
  products: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  products: state.products.products,
  loading: state.products.loading
});

export default connect(mapStateToProps, {getProducts, setLoading})(Home);
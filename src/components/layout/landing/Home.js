import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getProducts, setLoading } from '../../../actions/productsActions';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import './Home.css';
import Loading from './Loading';
import Navbar from './Navbar';
import ProductSm from './ProductSm';
export const Home = (props) => {
  const [showHome, setShowHome] = useState(false);
  useEffect(() => {
    console.log(window.innerWidth);
    console.log(window.innerHeight);
    props.setLoading();
    props.getProducts();
    //eslint-disable-next-line
    document.body.style.webkitTransform =  'scale(1)';
    document.body.style.msTransform =   'scale(90)';
    document.body.style.transform = 'scale(1)';
    // document.body.style.zoom = screen.logicalXDPI / screen.deviceXDPI;
  }, []); 
  if(props.loading || !showHome) {
    setTimeout(() => {
      setShowHome(true);
    }, 1500);
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
                <Link to="/about">
                  <lottie-player className="gif" src="https://assets7.lottiefiles.com/packages/lf20_S14LiY.json" background="#E8F3F1" style={{width: '250px', height: '250px'}} speed="1.5" loop autoplay></lottie-player>
                </Link>
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
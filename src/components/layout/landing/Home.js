import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { getProducts, setLoading } from '../../../actions/productsActions';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import './Home.css';
import loading from './loading.gif';
import Navbar from './Navbar';
export const Home = (props) => {

  // const counter = setInterval()

  useEffect(() => {
    props.setLoading();
    props.getProducts();
    //eslint-disable-next-line
    console.log(props.products);
    console.log(props.loading);
  }, []); 

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
            {props.loading && <div className="products">
                                <div><img className="loading" src={loading} alt="loading"/></div>
                                <div><img className="loading" src={loading} alt="loading"/></div>
                                <div><img className="loading" src={loading} alt="loading"/></div>
                                <div><img className="loading" src={loading} alt="loading"/></div>
                              </div>
            }
            {!props.loading && 
              <div className="products">
                <div className="product">
                  
                </div>
                <div className="product"></div>
                <div className="product"></div>
                <div className="product"></div>
              </div>
            }
            <div className="something"></div>
            </div>
        </div>
      </div>
  )
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
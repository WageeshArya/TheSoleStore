import React from 'react';
import './Home.css';
import Navbar from './Navbar';
export const Home = () => {
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
              <a className="productsBtn" href="#">GO <i class="fas fa-arrow-right"/></a>
            </div>
          </div>
        </div>
        <div className="group-2">
          <div className="products">
            <div className="product"></div>
            <div className="product"></div>
            <div className="product"></div>
            <div className="product"></div>
          </div>
          <div class="something"></div>
        </div>
      </div>
    </div>
  )
}

export default Home;
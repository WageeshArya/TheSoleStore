import React from 'react';
import './Shoes.css';

import {Link} from 'react-router-dom';

import Navbar from '../landing/Navbar';
import Search from './Search';
export const Shoes = () => {
  return (
    <div>
      <Navbar />
      <div className="shoes">
      <Search />
      <h1 className="productsTitle">Our Selection</h1>
      </div>
    </div>
  )
}

export default Shoes;
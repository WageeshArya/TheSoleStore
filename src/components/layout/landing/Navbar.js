import React from 'react';
import './Navbar.css';

import login from '../../../icons/login.png';
import signup from '../../../icons/signup.png';
import home from '../../../icons/home.svg';

export const Navbar = () => {
  return (
    <div className="navbar">
      <div className="brand">
        <div>The</div>
        <div>Sole</div>
        <div>Store</div>
      </div>
      <ul className="forUsers">
        <div>
          <li><a href="#"><img src={home} alt=""/></a></li>
        </div>
        <div className="icons">
          <li><a href="#"><img src={login} alt="Log in"/></a></li>
          <li><a href="#"><img src={signup} alt="Sign up"/></a></li>
        </div>
      </ul>
    </div>
  )
}

export default Navbar;
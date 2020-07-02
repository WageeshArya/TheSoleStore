import React from 'react';
import './Navbar.css';

export const Navbar = () => {
  return (
    <div className="navbar">
      <div className="brand">
        <div>The</div>
        <div>Sole</div>
        <div>Store</div>
      </div>
      <ul class="forUsers">
        <li><a href="#">Home</a></li>
        <li><a href="#">Log in</a></li>
        <li><a href="#">Sign in</a></li>
      </ul>
    </div>
  )
}

export default Navbar;
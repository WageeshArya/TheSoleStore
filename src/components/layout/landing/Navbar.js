import React , { useState } from 'react';
import './Navbar.css';
import logo from '../../../icons/logo.png';
import login from '../../../icons/login.png';
import signup from '../../../icons/signup.png';
import home from '../../../icons/home.svg';

export const Navbar = () => {

  const [homeHovered, setHomeHovered] = useState(false);

  const setHovered = () => {
    setHomeHovered(!homeHovered);
    console.log(homeHovered);
  }
  
  return (
    <div className={`navbar ${homeHovered ? 'extendNav' : ''}`}>
        <div>
          <a href="#"><img src={logo}  className="brand" alt="logo"/></a>
        </div>
      <ul className="forUsers">
        <div>
          <div className="homeBtn">
            <li className ={homeHovered ? 'extendHomeIcon' : ''}><a href="#"><img src={home} onClick={setHovered} alt=""/></a></li>
            <div className={homeHovered ? 'extendHome' : 'reveal'}>
              <ul>
                <li><a href="#">Admin login</a></li>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
          </div>
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
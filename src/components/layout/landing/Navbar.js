import React , { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../../../icons/logo.png';
import login from '../../../icons/login.png';
import signup from '../../../icons/signup.png';
import home from '../../../icons/menu.svg';

export const Navbar = () => {

  const [homeHovered, setHomeHovered] = useState(false);

  const setHovered = () => {
    setHomeHovered(!homeHovered);
    console.log(homeHovered);
  }
  
  return (
    <div className={`navbar ${homeHovered ? 'extendNav' : ''}`}>
        <div className="grp1">
          <Link to="/"><img src={logo}  className="brand" alt="logo"/></Link>
        </div>

        <div className="forUsers">
          <div className="homeBtn">
            <div className ={homeHovered ? 'extendHomeIcon' : ''}><a href="#"><img src={home} onClick={setHovered} alt=""/></a></div>
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
          <ul>
            <li><a href="#"><img src={login} alt="Log in"/></a></li>
            <li><a href="#"><img src={signup} alt="Sign up"/></a></li>
          </ul>
        </div>
    </div>
  )
}

export default Navbar;
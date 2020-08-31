import React , { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { adminLogout } from '../../../actions/adminActions';
import { logout } from '../../../actions/userActions';

import './Navbar.css';
import logo from '../../../icons/logo.png';
import login from '../../../icons/login2.png';
import cart from '../../../icons/cart.svg';
import home from '../../../icons/menu.svg';
import logoutIcon from '../../../icons/logout.svg';
import orders from '../../../icons/orders.svg';

export const Navbar = (props) => {

  const [homeClicked, setHomeClicked] = useState(false);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    if(props.loggedIn === true) {
      setShowCart(true);
    }
  },[props.loggedIn]);

  const setClicked = () => {
    setHomeClicked(!homeClicked);
  }

  const logoutAdmin = () => {
    props.adminLogout();
  }

  const logoutUser = () => {
    props.logout();
  }
  
  return (
    <div className="navbarDiv">
      <div className={`navbar ${homeClicked ? 'extendNav' : ''}`}>
          <div className="grp1">
            <Link to="/"><img src={logo}  className="brand" alt="logo"/></Link>
          </div>

          <div className="forUsers">
            <div className="homeBtn">
              <div className={homeClicked ? 'extendHomeIcon' : ''}>
                <a href="#"><img src={home} onClick={setClicked} alt=""/></a>
                <div className={homeClicked ? 'mobileExtendClicked' : 'hideIcon'}>
                  <ul id={props.loggedIn ? 'userNavlinks' : ''}>
                  <li className={`${props.adminLoggedIn ? 'hideIcon':''} ${props.loggedIn? 'hideIcon': ''}`}><Link to="/admins">Admin Login</Link></li>
                  <li className={props.adminLoggedIn ? '': 'hideIcon'}><Link to="/admins/dash">Admin Dashboard</Link></li>
                  <li><Link to="/about">About Us</Link></li>
                  <li><a href="https://github.com/WageeshArya">Contact</a></li>
                  </ul>
                </div>
              </div>
              <div className={homeClicked ? 'extendHome' : 'reveal'}>
                <ul>
                  <li className={`${props.adminLoggedIn ? 'hideIcon':''} ${props.loggedIn? 'hideIcon': ''}`}><Link to="/admins">Admin Login</Link></li>
                  <li className={props.adminLoggedIn ? '': 'hideIcon'}><Link to="/admins/dash">Admin Dashboard</Link></li>
                  <li><Link to="/about">About Us</Link></li>
                  <li><a href="https://github.com/WageeshArya">Contact</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="icons">
            <ul>
              <li className={`${props.loggedIn ? 'hideIcon':''} ${props.adminLoggedIn ? 'hideIcon':''}`}><Link to="/users"><img src={login} alt="Log in"/></Link></li>
              <li className={props.loggedIn ? '' : 'hideIcon' }><Link to="/orders"><img src={orders} alt="My Orders"/></Link></li>
              <li className={props.loggedIn ? '' : 'hideIcon'}><Link to="/cart"><img src={cart} alt="Cart" /></Link></li>
              <li onClick={logoutAdmin} className={props.adminLoggedIn ? '' : 'hideIcon'}><img className="logout adminIcon" src={logoutIcon} alt="adminLogout" /></li>
              <li onClick={logoutUser} className={props.loggedIn ? '' : 'hideIcon'}><img className="logout userIcon" src={logoutIcon} alt="logout" /></li>
            </ul>
          </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  loggedIn: state.users.loggedIn,
  adminLoggedIn: state.admins.loggedIn
})

export default connect(mapStateToProps, {adminLogout, logout})(Navbar);
import React , { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { adminLogout } from '../../../actions/adminActions';
import { logout } from '../../../actions/userActions';

import './Navbar.css';
import logo from '../../../icons/logo.png';
import login from '../../../icons/login.png';
import cart from '../../../icons/cart.svg';
import home from '../../../icons/menu.svg';
import logoutIcon from '../../../icons/logout.svg';
import orders from '../../../icons/orders.svg';

export const Navbar = (props) => {

  const [homeHovered, setHomeHovered] = useState(false);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    console.log(props.loggedIn);
    if(props.loggedIn === true) {
      setShowCart(true);
    }
  },[props.loggedIn]);

  const setHovered = () => {
    setHomeHovered(!homeHovered);
    console.log(homeHovered);
  }

  const logoutAdmin = () => {
    props.adminLogout();
  }

  const logoutUser = () => {
    props.logout();
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
                <li className={props.adminLoggedIn ? 'hideIcon':''}><Link to="/admins">Admin Login</Link></li>
                <li className={props.adminLoggedIn ? '': 'hideIcon'}><Link to="/admins/dash">Admin Dashboard</Link></li>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="icons">
          <ul>
            <li className={`${props.loggedIn ? 'hideIcon':''} ${props.adminLoggedIn ? 'hideIcon':''}`}><Link to="/users"><img src={login} alt="Log in"/></Link></li>
            <li className={props.loggedIn ? '' : 'hideIcon' }><Link to="/orders"><img src={orders} alt="My Orders"/></Link></li>
            <li className={props.loggedIn ? '' : 'hideIcon'}><Link to="/cart"><img src={cart} alt="Cart" /></Link></li>
            <li onClick={logoutAdmin} className={props.adminLoggedIn ? '' : 'hideIcon'}><img className="logout" src={logoutIcon} alt="adminLogout" /></li>
            <li onClick={logoutUser} className={props.loggedIn ? '' : 'hideIcon'}><img className="logout" src={logoutIcon} alt="logout" /></li>
          </ul>
        </div>
    </div>
  )
}

const mapStateToProps = state => ({
  loggedIn: state.users.loggedIn,
  adminLoggedIn: state.admins.loggedIn
})

export default connect(mapStateToProps, {adminLogout, logout})(Navbar);
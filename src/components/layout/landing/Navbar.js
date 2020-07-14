import React , { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../../../icons/logo.png';
import login from '../../../icons/login.png';
import cart from '../../../icons/cart.svg';
import home from '../../../icons/menu.svg';
import logout from '../../../icons/logout.svg';

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
                <li><Link to="/admins">Admin login</Link></li>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="icons">
          <ul>
            <li className={`${props.loggedIn ? 'hideIcon':''} ${props.adminLoggedIn ? 'hideIcon':''}`}><Link to="/users"><img src={login} alt="Log in"/></Link></li>
            <li className={props.loggedIn ? '' : 'hideIcon'}><Link to="/orders"><img src={cart} alt="Cart" /></Link></li>
            <li className={props.adminLoggedIn ? '' : 'hideIcon'}><img className="logout" src={logout} alt="adminLogout" /></li>
            <li className={props.loggedIn ? '' : 'hideIcon'}><img className="logout" src={logout} alt="logout" /></li>
          </ul>
        </div>
    </div>
  )
}

const mapStateToProps = state => ({
  loggedIn: state.users.loggedIn,
  adminLoggedIn: state.admins.loggedIn
})

export default connect(mapStateToProps)(Navbar);
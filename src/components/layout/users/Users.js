import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { newUser, login, resetDuplicate, resetUserErr } from '../../../actions/userActions';
import './Users.css';
export const Users = props => {

  useEffect(() => {
    if(props.loggedIn) {
      setTimeout(() => {
        props.history.push("/");
      },2000)
    }
  },[props.loggedIn])

  const regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  
  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false); 
  const [loginError, setLoginError] = useState(null);
  const [showSignup, setShowSignup] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [submitErr, setSubmitErr] = useState(false);

  const [showLoggedIn, setShowLoggedIn] = useState(false);

  const [signEmail, setSignEmail] = useState('');
  const [signPass, setSignPass] = useState('');
  const [signConfPass, setSignConfPass] = useState('');

  const [logEmail, setLogEmail] = useState('');
  const [logPass, setLogPass] = useState('');
  const [logConfPass, setLogConfPass] = useState('');


  const signEmailChange = e => {
    setSignEmail(e.target.value);
  }
  const signPassChange = e => {
    setSignPass(e.target.value);
  }
  const signConfPassChange = e => {
    setSignConfPass(e.target.value);
  }


  const logEmailChange = e => {
    setLogEmail(e.target.value);
  }
  const logPassChange = e => {
    setLogPass(e.target.value);
  }
  const logConfPassChange = e => {
    setLogConfPass(e.target.value);
  }

  const switchToLogin = e => {
    e.preventDefault();
    setShowSignup(false);
  }

  const switchToSignup = e => {
    e.preventDefault();
    setShowSignup(true);
  }

  const handleSignupSubmit = e => {
    e.preventDefault();
    if(!regex.test(signEmail)) {
      console.log('sign email error');
      setEmailError(true);
    }
    if(!(signPass === signConfPass)) {
      setPassError(true);
    }

    if(regex.test(signEmail) && (signPass === signConfPass)) {
      props.newUser({
        email: signEmail,
        password: signPass
      });
    }
    else {
      if(!regex.test(signEmail))          
        setEmailError(true);
      else if(signPass === signConfPass)  
        setPassError(true);
    }

    if(props.loggedIn){
      setShowLoggedIn(true);
      console.log(setShowLoggedIn);
      setTimeout(() => {
        setShowLoggedIn(false);
        props.history.push("/");
      },2000);
    }
    else{ 
      setTimeout(() => {
        props.resetDuplicate();
        setEmailError(false);
        setPassError(false);
      },2000)
    }
  }

  const handleLoginSubmit = e => {
    e.preventDefault();

    if(!regex.test(logEmail)) {
      console.log('log email error');
      setEmailError(true);
      setSubmitErr(true);
    }
    if(!(logPass === logConfPass)) {
      console.log('log pass error');
      setPassError(true);
      setSubmitErr(true);
    }
    if(regex.test(logEmail) && (logPass === logConfPass)) {
      props.login({
        email: logEmail,
        password: logPass
      });
    }
    else {
      if(!regex.test(logEmail)){
        setEmailError(true);
        setSubmitErr(true);
      }  

      else if(logPass !== logConfPass){
        setSubmitErr(true);
        setPassError(true);
      }
    }
    if(props.loggedIn){
      setShowLoggedIn(true);
      console.log(setShowLoggedIn);
      setTimeout(() => {
        setShowLoggedIn(false);
        props.history.push("/");
      },2000);
    }
    else{ 
      setTimeout(() => {
        props.resetUserErr();
        setEmailError(false);
        setPassError(false);
      },2000)
    }
    if(props.loggedIn) {
      props.history.push("/");
    }
}

  return (
    <div className="usersBody">
      <div className={props.loggedIn ? 'showLoggedIn' : 'hideLoggedIn'}>
        Logged in <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/><path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg>
      </div>
      <div className="usersTitle">
        <h1>The</h1>
        <h1>Sole</h1>
        <h1>Store</h1>
      </div>
      <div className='userContainer'>
        <div className={showSignup ? 'showForm' : 'hideSignup'}>
          <div className={props.duplicate ? 'dupError' : 'valid'}>That email id is already registered.</div>
          <div className={emailError? 'error': 'valid'}>Please enter a valid email address.</div>
          <div className={passError? 'error': 'valid'}>The passwords you entered do not match.</div>

          <form className="signup" onSubmit={handleSignupSubmit}>
            <h1 id="signup">Sign up</h1>
            <div>
              <label htmlFor="email">Email</label>
              <input className="email" onChange={signEmailChange} type="text" name="email" />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input className="password" onChange={signPassChange} type="password" name="password" />
            </div>
            <div>
              <label htmlFor="confPass" >Confirm Password</label>
              <input className="confPass" onChange={signConfPassChange} type="password" name="confPass" />
            </div>
            <input className="submitBtn" type="submit"/>
            <br/>
            <button className="goToLogin" onClick={switchToLogin}>Already registered?</button>
          </form>
        </div>

        <div className={showSignup ? 'hideLogin' : 'showForm'}>
          <div className={props.userErr ? 'error' : 'valid'}>Sorry, the email id you entered is not registered.</div>
          <div className={emailError ? 'error' : 'valid'}>Please enter a valid email address.</div>
          <div className={passError ? 'error' : 'valid'}>The passwords you entered do not match.</div>

          <form className="login" onSubmit={handleLoginSubmit}> 
            <h1 id="login">Log in</h1>
            <div>
              <label htmlFor="email">Email</label>
              <input className="email" onChange={logEmailChange} type="text" name="email" />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input className="password" onChange={logPassChange} type="password" name="password" />
            </div>
            <div>
              <label htmlFor="confPass"> Confirm Password</label>
              <input className="confPass" onChange={logConfPassChange} type="password" name="confPass" />
            </div>
            <input className="submitBtn" type="submit"/>
            <br/>
            <button className="newAcc" onClick={switchToSignup}>Create new account</button>
          </form>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  loggedIn: state.users.loggedIn,
  userErr: state.users.userErr,
  duplicate: state.users.duplicate
});

export default connect(mapStateToProps, { newUser, login, resetDuplicate, resetUserErr })(Users);
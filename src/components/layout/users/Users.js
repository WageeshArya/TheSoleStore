import React, {useState} from 'react';
import { connect } from 'react-redux';
import { newUser, login } from '../../../actions/userActions';
import './Users.css';
export const Users = props => {

  const regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  
  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false); 
  const [loginError, setLoginError] = useState(null);
  const [showSignup, setShowSignup] = useState(false);
  const [emailErr, setEmailErr] = useState(false);

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
      props.history.push("/")
    }
    else {
      if(!regex.test(signEmail))          
        setEmailError(true);
      else if(signPass === signConfPass)  
        setPassError(true);
    }
  }

  const handleLoginSubmit = e => {
    e.preventDefault();
    console.log(regex.test(logEmail));
    console.log(logEmail);
    if(!regex.test(logEmail)) {
      console.log('log email error');
      setEmailError(true);
    }
    if(!(logPass === logConfPass)) {
      console.log('log pass error');
      setPassError(true);
    }
    if(regex.test(logEmail) && (logPass === logConfPass)) {
      console.log('logging in');
      props.login({
        email: logEmail,
        password: logPass
      });
    }
    else {
      if(!regex.test(logEmail))  
        setEmailError(true);

      else if(signPass === logConfPass)
        setPassError(true);
    }

    if(!props.userErr) {
      setLoginError(null);
      if(props.loggedIn) {
        setShowLoggedIn(true);
      }
      setTimeout(async () => {
        setShowLoggedIn(false);
        props.history.push("/");
      },2000);
    }
    else
      setLoginError(props.error);
  }

  return (
    <div className="usersBody">
      <div className={props.loggedIn ? 'showLoggedIn' : 'hideLoggedIn'}>
        Logged in <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg>
      </div>
      <div className="usersTitle">
        <h1>The</h1>
        <h1>Sole</h1>
        <h1>Store</h1>
      </div>
      <div className='userContainer'>
        <div className={showSignup ? 'showForm' : 'hideSignup'}>

        <div className={emailError? 'error': 'valid'}>Please enter a valid email address</div>

        <div className={passError? 'error': 'valid'}>The passwords you entered do not match</div>

          <form className="signup" onSubmit={handleSignupSubmit}>
            <h1 id="signup">Sign up</h1>
            <div>
              <label htmlFor="email" class={emailErr? 'error': ''}>Email</label>
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

          <div className={emailError? 'error': 'valid'}>Please enter a valid email address</div>

          <div className={passError? 'error': 'valid'}>The passwords you entered do not match</div>

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
  userErr: state.users.userErr
})

export default connect(mapStateToProps, { newUser, login })(Users);
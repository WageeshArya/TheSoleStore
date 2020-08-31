import React from 'react';
import { connect } from 'react-redux';

export const LoginErr = (props) => {

  if(props.loginErr) {
    
  }

  else {
    return <span></span>
  }
  
}

const mapStateToProps = state => ({
  loginErr: state.cart.loginErr
})

export default connect(mapStateToProps)(LoginErr);
import React from 'react';
import Navbar from '../landing/Navbar';
import notFound from './notFound.svg';
export const NotFound = () => {
  return (
    <div>
      <Navbar />
      <img style={style} src={notFound} alt="error 404"/>
    </div>
  )
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%,-50%)',
  height: '300px',
  width: '300px'
}

export default NotFound;
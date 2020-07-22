import React from 'react';
import Navbar from '../landing/Navbar';
import notFound from './notFound.svg';
export const NotFound = () => {
  return (
    <div>
      <Navbar />
      <img src={notFound} alt="error 404"/>
    </div>
  )
}
export default NotFound;

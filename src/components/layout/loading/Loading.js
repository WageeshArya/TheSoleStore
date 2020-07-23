import React from 'react';
import loading from './loading.gif';

export const Loading = () => {
  return (
    <div style={loadingStyle}>
      <p style={{textAlign: 'center', fontFamily: 'Poppins', fontSize: '2rem'}}>Loading...</p>
      <img src={loading} alt="loading"/>
    </div>
  )
}

const loadingStyle = {
  height: '100vh',
  width: '100vw',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#f3feff'
}
export default Loading;
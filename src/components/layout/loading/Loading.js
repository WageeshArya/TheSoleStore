import React from 'react';
import loading from './loading.gif';

export const Loading = () => {
  return (
    <div style={loadingStyle}>
      <div style={{margin: '0 auto',textAlign: 'center', fontFamily: 'Poppins', fontSize: '2rem'}}>Loading...</div>
      <img src={loading} alt="loading"/>
    </div>
  )
}

const loadingStyle = {
  height: '100vh',
  width: '100vw',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f3feff'
}
export default Loading;
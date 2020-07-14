import { NEW_ADMIN, GET_ADMIN_DATA, ADMIN_LOGIN, SET_ADMIN_ERROR, ADMIN_LOGOUT } from './types';

export const newAdmin = (admin) => async (dispatch) => {
  const adminData = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(admin)
  }
  try{
    fetch('http://localhost:5000/admin/signup', adminData)
    .then((response) => {
      if(response.ok) {
        response.json().then((data) => {
          dispatch({
            type: NEW_ADMIN,
            payload: data
          });
          fetch('http://localhost:5000/admin/login', adminData)
          .then((response) => {
            if(response.ok) {
              response.json()
              .then((data) => {
                dispatch({
                  type: ADMIN_LOGIN,
                  payload: data
                });
              });
            }
          });
        });
      }
    });
  }
  catch(error) {
    console.log(error);
  }
}

export const adminLogin = (admin) => async (dispatch) => {
  const adminData = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(admin)
  }
  try {
    console.log(adminData);
    fetch('http://localhost:5000/admin/login', adminData)
    .then((response) => {
      if(response.ok) {
        response.json()
        .then((data) => {
          console.log(data);
          dispatch({
            type: ADMIN_LOGIN,
            payload: data
          });
        });
      }
      else {
        dispatch({
          type: SET_ADMIN_ERROR,
          payload: 'Please re-check your email or password'
        })
      }
    });
  }
  catch(error) {
    console.log(error.json().then(data => console.log(data)));
  }
}

export const adminLogout = () => (dispatch) => {
  dispatch({
    type: ADMIN_LOGOUT
  })
}
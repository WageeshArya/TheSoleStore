import {NEW_USER, GET_USER_DATA, LOGIN, SET_ERROR} from './types';

export const newUser = (user) => async (dispatch) => {
  const userData = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  }
  try{
    fetch('http://localhost:5000/users/signup', userData)
    .then((response) => {
      if(response.ok) {
        response.json().then((data) => {
          dispatch({
            type: NEW_USER,
            payload: data
          });
          fetch('http://localhost:5000/users/login', userData)
          .then((response) => {
            if(response.ok) {
              response.json()
              .then((data) => {
                dispatch({
                  type: LOGIN,
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
export const login = (user) => async (dispatch) => {
  const userData = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  }
  try {
    console.log(userData);
    fetch('http://localhost:5000/users/login', userData)
    .then((response) => {
      if(response.ok) {
        response.json()
        .then((data) => {
          dispatch({
            type: LOGIN,
            payload: data
          });
        });
      }
      else {
        dispatch({
          type: SET_ERROR,
          payload: 'Please re-check your email or password'
        })
      }
    });
  }
  catch(error) {
    console.log(error.json().then(data => console.log(data)));
  }
}

export const getUserData = () => async (dispatch) => {

} 
import {NEW_USER, GET_USER_DATA, LOGIN} from './types';

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
  }
  catch(error) {
    console.log(error);
  }
}

export const getUserData = () => async (dispatch) => {

} 
import {NEW_USER, GET_USER_DATA, LOGIN, SET_USER_ERROR, RESET_USER_ERROR, LOGOUT} from './types';

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
          type: SET_USER_ERROR,
          payload: 'Please re-check your email or password'
        })
      }
    });
  }
  catch(error) {
    console.log(error.json().then(data => console.log(data)));
  }
}

export const resetUserErr = () => async (dispatch) => {
  dispatch({
    type: RESET_USER_ERROR
  });
}

export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT
  });
}
import {NEW_USER, LOGIN, USER_NOT_FOUND, RESET_USER_ERROR, LOGOUT, DUPLICATE_FOUND, RESET_DUPLICATE} from './types';

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
    fetch('/users/signup', userData)
    .then((response) => {
      console.log(response);
      if(response.ok) {
        response.json().then((data) => {
          dispatch({
            type: NEW_USER,
            payload: data
          });
          fetch('/users/login', userData)
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
      else if(response.status === 409) {
        dispatch({type: DUPLICATE_FOUND});
      }
    });
  }
  catch(error) {
    console.log(error);
  }
}

export const resetDuplicate = () => (dispatch) => {
    dispatch({type: RESET_DUPLICATE});
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
    fetch('/users/login', userData)
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
      else if(response.status === 404) {
        dispatch({
          type: USER_NOT_FOUND
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
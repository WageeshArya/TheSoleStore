import {ATC, QUANTITY_UP, QUANTITY_DOWN, LOGIN_ERR, DELETE_PRODUCT, RESET_LOGIN_ERR, RESET_CART} from './types';

export const addToCart = (product) => async (dispatch, getState) => {
  const { authToken } = getState().users;
  console.log(authToken);
  if(authToken !== '') {
    dispatch({
      type: ATC,
      payload: product
    });
  }
  else {
    dispatch({
      type: LOGIN_ERR
    });
  }
}

export const quantityUp = (product) => dispatch => {
  dispatch({
    type: QUANTITY_UP,
    payload: product
  })
}

export const quantityDown = (product) => dispatch => {
  dispatch({
    type: QUANTITY_DOWN,
    payload: product
  })
}

export const delFromCart = (product) => dispatch => {
  dispatch({
    type: DELETE_PRODUCT,
    payload: product
  })
}

export const resetLoginErr = () => dispatch => {
  dispatch({
    type: RESET_LOGIN_ERR
  })
}

export const resetCart = () => dispatch => {
  dispatch({
    type: RESET_CART
  })
}
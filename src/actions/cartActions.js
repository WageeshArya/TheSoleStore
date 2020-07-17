import {ATC, QUANTITY_UP, QUANTITY_DOWN, DEL_FROM_CART, SET_LOADING, LOGIN_ERR, DELETE_PRODUCT} from './types';

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

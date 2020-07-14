import {ATC, QUANTITY_UP, QUANTITY_DOWN, DEL_FROM_CART, SET_LOADING, LOGIN_ERR} from './types';
import { setLoading } from './productsActions';

export const addToCart = (product) => async (dispatch, getState) => {
  const { authToken } = getState().users;
  console.log(authToken);
  if(authToken !== '') {
    setLoading();
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
  setLoading();
  dispatch({
    type: QUANTITY_UP,
    payload: product
  })
}

export const quantityDown = (product) => dispatch => {
  setLoading();
  dispatch({
    type: QUANTITY_DOWN,
    payload: product
  })
}

export const delFromCart = () => async dispatch => {

}

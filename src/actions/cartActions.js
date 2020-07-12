import {ATC, QUANTITY_UP, QUANTITY_DOWN, DEL_FROM_CART, SET_LOADING} from './types';
import { setLoading } from './productsActions';

export const addToCart = (product) => dispatch => { 
  setLoading();
  dispatch({
    type: ATC,
    payload: product
  })
}

export const quantityUp = (product) => dispatch => {
  setLoading();
  dispatch({
    type: QUANTITY_UP,
    payload: product
  })
}

// export const quantityDown = (product) => dispatch => {
//   setLoading();
//   dispatch({
//     type: QUANTITY_DOWN,
//     payload: product
//   })
// }

// export const delFromCart = () => async dispatch => {

// }

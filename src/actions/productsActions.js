import {GET_PRODUCTS, SET_LOADING, SET_ERROR} from './types';

export const getProducts = () => async (dispatch) => {
  try{
    setLoading();
    const res = await fetch('http://localhost:5000/products');
    const data = await res.json();
    console.log(data);
    dispatch({
      type: GET_PRODUCTS,
      payload: data
    })
  }
  catch(err) {
    dispatch({
      type: SET_ERROR,
      payload: err
    })
  }
}

export const setLoading = () => {
  return {
    type: SET_LOADING
  }
}
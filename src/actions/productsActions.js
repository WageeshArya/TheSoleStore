import {GET_PRODUCTS, GET_PRODUCT, SET_LOADING, SET_ERROR} from './types';

export const getProducts = () => async (dispatch) => {
  try{
    setLoading();
    const res = await fetch('http://localhost:5000/products');
    const data = await res.json();
    const productsData = JSON.parse(data.products);
    dispatch({
      type: GET_PRODUCTS,
      payload: productsData
    });
  }
  catch(err) {
    dispatch({
      type: SET_ERROR,
      payload: err
    })
  }
} 

export const getSingle = (productId) => async (dispatch) => {
  try{
    setLoading();
    const res = await fetch(`http://localhost:5000/products/${productId}`);
    const data = await res.json();
    console.log(data);
  
    dispatch({
      type: GET_PRODUCT,
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
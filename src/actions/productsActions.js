import {GET_PRODUCTS, SET_LOADING, SET_ERROR} from './types';

export const getProducts = () => async (dispatch) => {
  try{
    setLoading();
    const res = await fetch('http://localhost:5000/products');
    const data = await res.json();
    const productsData = JSON.parse(data.products);

    console.log(productsData);
    console.log(typeof productsData);
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

export const setLoading = () => {
  console.log('Loading true');
  return {
    type: SET_LOADING
  }
}
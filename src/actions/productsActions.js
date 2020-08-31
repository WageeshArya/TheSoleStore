import {GET_PRODUCTS, GET_PRODUCT, SET_LOADING, SET_ERROR, GET_RESULTS} from './types';

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
  console.log(productId);
  setLoading();

  const productData = {
    method: 'GET',
    headers: {
      Accept: 'application/json'
    }
  }

  fetch(`http://localhost:5000/products/${productId}`, productData)
  .then(response => {
    console.log(response);
    if(response.ok) {
      response.json().then(data => {
        console.log(data);
        dispatch({
          type: GET_PRODUCT,
          payload: data
        });
      })
    }
    else {
      response.json().then(err => {
        dispatch({
          type: SET_ERROR,
          payload: err
        });
      })
    }
  });
}

export const setLoading = () => {
  return {
    type: SET_LOADING
  }
}

export const getSearchResults = (searchTerm, sortBy) => (dispatch) => {
  const productsBody = {
    'searchTerm': searchTerm,
    'sortBy': sortBy
  }

  const productsData = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(productsBody)
  }

  fetch('http://localhost:5000/products/search', productsData)
  .then(response => {
    if(response.ok) {
      response.json().then(data => {
        dispatch({
          type: GET_RESULTS,
          payload: data
        })
      })
    }
    else{
      response.json().then(err => {
        console.log(err);
      })
    }
  })

}
import { GET_ORDERS, NEW_ORDER, DELETE_ORDER, ORDERS_LOADING, SET_ERROR} from './types';

export const getOrders = () => async (dispatch, getState) => {
  const { _id } = getState().users;
  const { authToken } = getState().users;
  const token = `Bearer ${authToken}`;
  console.log(token);

  const orderData = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'authorization': token
    }
  }
  fetch(`/orders/${_id}`, orderData)
  .then(response => {
    console.log(response);
      response.json().then(data => {
        dispatch({
          type: GET_ORDERS,
          payload: data.orders
        })
        
      })
  });
}

export const newOrder = (products) => async (dispatch, getState) => {
  const { _id } = getState().users;
  const { authToken } = getState().users;
  const token =  `Bearer ${authToken}`;
  let productData, orderData;

  for(let i = 0; i < products.length; i++) {
    productData = {
      productId: products[i]._id,
      quantity: products[i].quantity
    }
  
    orderData = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'authorization': token
      },
      body: JSON.stringify(productData)
    }
  
    fetch(`/orders/${_id}`, orderData)
    .then(response => {
      if(response.ok) {
        response.json()
        .then(data => {
          dispatch({
            type: NEW_ORDER,
            payload: data
          })
        })
      }
      else 
        response.json()
        .then(err => {
          dispatch({
            type: SET_ERROR,
            payload: err
          })
        })
    })
  }
}

export const deleteOrder = (orderId) => async (dispatch, getState) => {
  const { authToken } = getState().users;
  const token = `Bearer ${authToken}`;

  const orderData = {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'authorization': token
    }
  }

  fetch(`/orders/${orderId}`, orderData)
  .then(response => {
    if(response.ok) {
      response.json().then(data => {
        console.log(data);
        dispatch({
          type: DELETE_ORDER
        })
      })
    }
    else {
      response.json().then(err => {
        console.log(err);
      })
    }
  });
}
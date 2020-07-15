import { NEW_ADMIN, GET_ADMIN_DATA, ADMIN_LOGIN, SET_ADMIN_ERROR, ADMIN_LOGOUT, NEW_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT, SET_PRODUCT_ERROR } from './types';

export const newAdmin = (admin) => async (dispatch) => {
  const adminData = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(admin)
  }
  try{
    fetch('http://localhost:5000/admin/signup', adminData)
    .then((response) => {
      if(response.ok) {
        response.json().then((data) => {
          dispatch({
            type: NEW_ADMIN,
            payload: data
          });
          fetch('http://localhost:5000/admin/login', adminData)
          .then((response) => {
            if(response.ok) {
              response.json()
              .then((data) => {
                dispatch({
                  type: ADMIN_LOGIN,
                  payload: data
                });
              });
            }
          });
        });
      }
    });
  }
  catch(error) {
    console.log(error);
  }
}

export const adminLogin = (admin) => async (dispatch) => {
  const adminData = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(admin)
  }
  try {
    console.log(adminData);
    fetch('http://localhost:5000/admin/login', adminData)
    .then((response) => {
      if(response.ok) {
        response.json()
        .then((data) => {
          console.log(data);
          dispatch({
            type: ADMIN_LOGIN,
            payload: data
          });
        });
      }
      else {
        dispatch({
          type: SET_ADMIN_ERROR,
          payload: 'Please re-check your email or password'
        })
      }
    });
  }
  catch(error) {
    console.log(error.json().then(data => console.log(data)));
  }
}

export const adminLogout = () => (dispatch) => {
  dispatch({
    type: ADMIN_LOGOUT
  })
}

export const newProduct = (product) => async (dispatch, getState) => {
  const { authToken } = getState().admins;
  const token = `Bearer ${authToken}`;
  if(!authToken) {
    
  }
  const formData = new FormData();
  console.log(product);
  formData.append('name', product.name);
  formData.append('company', product.company);
  formData.append('price', product.price);
  formData.append('description', product.description);
  formData.append('year', product.year);
  formData.append('productImage', product.productImage);
  formData.append('fullProductImage', product.fullProductImage);

  fetch('http://localhost:5000/products', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'authorization': token
    },
    body: formData
  }).then(response => {
    if(response.ok){
      response.json()
      .then(data => {
        console.log(data);
      })
    }
    else {
      console.log(response);
    }
  })

  console.log(formData);
}

export const deleteProduct = (productId) => async (dispatch, getState) => {

  const authToken = getState().admins.authToken;
  const token = `Bearer ${authToken}`;
  console.log(token);
  fetch(`http://localhost:5000/products/${productId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'authorization': token
    }
  }).then(response => {
    if(response.ok) {
      response.json()
      .then(data => {
        console.log(data);
      })
    }
    else {
      response.json()
      .then(data => {
        console.log(data);
      })
    }
  })
}

export const updateProduct = (product) => async (dispatch, getState) => {
  const authToken = getState().admins.authToken;
  const token = `Bearer ${authToken}`;

  const updatedProduct = [
    {
      fieldName: "name",
      value: product.name
    },
    {
      fieldName: "price",
      value: product.price
    },
    {
      fieldName: "company",
      value: product.company
    },
    {
      fieldName: "description",
      value: product.description
    },
    {
      fieldName: "year",
      value: product.year
    }
  ]

  fetch(`http://localhost:5000/products/${product._id}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'authorization': token
    },
    body: JSON.stringify(updatedProduct)
  }).then((response) => {
    if(response.ok){
      response.json()
      .then((data) => {
        console.log(data);
      })
    }
    else {
      response.json()
      .then((error) => {
        console.log(error);
      })
    }
  })
}
import {GET_PRODUCTS, SET_LOADING, SET_ERROR} from '../actions/types';
const initialState = {
  products: [],
  loading: false,
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS: 
    console.log(action.payload);
      return {
        ...state,
        products: action.payload,
        loading: false
      }

    case SET_LOADING: 
      return {
        ...state,
        loading: true
      };

    case SET_ERROR: 
      console.log(action.payload);
      return {
        ...state,
        error: action.payload
      };
    default: return state;
  }
}
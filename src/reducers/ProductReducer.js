import {GET_PRODUCTS, GET_PRODUCT, SET_LOADING, SET_ERROR, GET_RESULTS} from '../actions/types';
const initialState = {
  product: null,
  products: [],
  searchResults: null,
  searched: false,
  loading: false,
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loading: false
      }

    case GET_PRODUCT: 
      console.log(action.payload);
      return {
        ...state,
        product: action.payload,
        loading: false
      }

    case GET_RESULTS: 
      return {
        ...state,
        searchResults: action.payload,
        searched: true
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
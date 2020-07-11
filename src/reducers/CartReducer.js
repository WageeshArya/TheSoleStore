import {ATC, UPDATE_QUANTITY, DEL_FROM_CART} from '../actions/types';
const initialState = {
  cart: [],
  total: 0
}

export default (state = initialState, action) => {
  switch(action.type) {
    case 'ATC':
    case 'UPDATE_QUANTITY':
    case 'DEL_FROM_CART':
    default: return state;
  }
}
import { GET_ORDERS, DELETE_ORDER, NEW_ORDER } from '../actions/types';
import { getOrders } from '../actions/orderActions';
const initialState = {
  orders: null,
  loading: false, 
  error: null
}

export default (state = initialState, action) => {
  switch(action.type) {

    case GET_ORDERS: 
                      return {
                        orders: action.payload,
                        loading: false,
                        error: null
                      }

    case NEW_ORDER: return state;

    case DELETE_ORDER: getOrders();
    default: return state;
  }
}
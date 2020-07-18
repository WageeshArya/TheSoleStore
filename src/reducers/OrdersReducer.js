import { GET_ORDERS, DELETE_ORDER } from '../actions/types';
import { getOrders } from '../actions/orderActions';
const initialState = {
  orders: null,
  loading: false, 
  error: null
}

export default (state = initialState, action) => {
  switch(action.type) {

    case GET_ORDERS:  console.log(action.payload);
                      return {
                        orders: action.payload,
                        loading: false,
                        error: null
                      }

    case DELETE_ORDER: getOrders();
    default: return state;
  }
}
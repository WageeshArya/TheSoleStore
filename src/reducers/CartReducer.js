import {ATC, QUANTITY_UP, QUANTITY_DOWN, DEL_FROM_CART} from '../actions/types';
import { quantityUp } from '../actions/cartActions';
const initialState = {
  cart: [],
  total: 0,
  itemCount: 0
}

export default (state = initialState, action) => {
  switch(action.type) {
    case ATC:
              for(let i=0 ; i < state.cart.length; i++) {
                if(state.cart[i]._id === action.payload._id) {
                  console.log('same product found');
                  quantityUp(action.payload);
                }
              }
              const newItem = {
                  ...action.payload,
                  quantity: 1
              }
              
              return {
                ...state,
                itemCount: state.itemCount + 1,
                cart: [...state.cart.slice(0, state.itemCount),newItem],
                total: state.total + action.payload.price,
                loading: false
              }

    case QUANTITY_UP: 
              let index, qty;
              for(let i=0; i< state.cart.length;i++) {
                if(state.cart[i]._id === action.payload._id) {
                  index = i;
                  qty = state.cart[i].quantity + 1;
                }
              }

              const updatedItem = {
                ...action.payload,
                quantity: qty + 1
              }

              return {
                state: [...state.cart.slice(0, index),
                          updatedItem,
                        ...state.cart.slice(index + 1)
                        ],
                total: state.total + action.payload.price,
                loading: false
              }

    // case QUANTITY_DOWN: 
    // case DEL_FROM_CART:
    default: return state;
  }
}
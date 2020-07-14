import {ATC, QUANTITY_UP, QUANTITY_DOWN, DEL_FROM_CART, LOGIN_ERR} from '../actions/types';
import { quantityUp, delFromCart } from '../actions/cartActions';
const initialState = {
  cart: [],
  total: 0,
  itemCount: 0,
  loginErr: false
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
              let incIndex, incQty;
              for(let i=0; i < state.cart.length;i++) {
                if(state.cart[i]._id === action.payload._id) {
                  incIndex = i;
                  incQty = state.cart[i].quantity + 1;
                }
              }

              const incItem = {
                ...action.payload,
                quantity: incQty
              }

              return {
                state: [...state.cart.slice(0, incIndex),
                          incItem,
                        ...state.cart.slice(incIndex + 1)
                        ],
                total: state.total + action.payload.price,
                loading: false
              }

    case QUANTITY_DOWN: 
              let decIndex, decQty;
              for(let i=0; i < state.cart.length; i++) {
                if(state.cart[i]._id === action.payload._id) {
                  decIndex = i;
                  decQty = state.cart[i].quantity - 1;
                  if(decQty === 0) {
                    delFromCart();
                  }
                  else {  
                    const decItem = {
                      ...action.payload,
                      quantity: decQty
                    }

                    return {
                      state: [...state.cart.slice(0, decIndex),
                                decItem,
                              ...state.cart.slice(incIndex + 1)
                      ],
                      total: state.total - action.payload.price,
                      loading: false
                    }
                  }
                }
              }
    // case DEL_FROM_CART:

    case LOGIN_ERR:
              return {
                ...state,
                loginErr: true
              }
    default: return state;
  }
}
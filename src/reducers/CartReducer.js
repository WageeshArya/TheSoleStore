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
              let flag = false;
              for(let i=0 ; i < state.cart.length; i++) {
                if(state.cart[i]._id === action.payload._id) {
                  console.log('same product found');
                  flag = true;
                  quantityUp(action.payload);
                }
              }
              if(!flag){
                const newItem = {
                  ...action.payload,
                  quantity: 1
                }
                console.log(state.cart);
                return {
                  ...state,
                  itemCount: state.itemCount + 1,
                  cart: [...state.cart.slice(0, state.cart.length),newItem],
                  total: state.total + action.payload.price
                }
              }
              

    case QUANTITY_UP: 
              let incIndex, incQty;
              console.log('quantity up');
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
              console.log([...state.cart.slice(0, incIndex),
                incItem,
              ...state.cart.slice(incIndex + 1)
              ]);
              return {
                cart: [...state.cart.slice(0, incIndex),
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
                    console.log('123');
                    delFromCart(action.payload);
                  }
                  else {  
                    const decItem = {
                      ...action.payload,
                      quantity: decQty
                    }

                    return {
                      cart: [...state.cart.slice(0, decIndex),
                                decItem,
                              ...state.cart.slice(decIndex + 1)
                      ],
                      total: state.total - action.payload.price
                    }
                  }
                }
              }

    case DEL_FROM_CART:
              let delIndex;
              for(let i=0; i < state.cart.length; i++) {
                if(state.cart[i]._id === action.payload._id) {
                  delIndex = i;
                }
              }
              return {
                cart: [
                    ...state.cart.slice(0, delIndex - 1),
                    ...state.cart.slice(delIndex )
                ],
                total: state.total - ( action.payload.price * action.payload.quantity)
              }
    case LOGIN_ERR:
              return {
                ...state,
                loginErr: true
              }
    default: return state;
  }
}
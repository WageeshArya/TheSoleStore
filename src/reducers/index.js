import {combineReducers} from 'redux';
import productsReducer from './ProductReducer';
import cartReducer from './CartReducer';
import usersReducer from './UsersReducer';
export default combineReducers({
  products: productsReducer,
  cart: cartReducer,
  users: usersReducer
});
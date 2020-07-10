import {combineReducers} from 'redux';
import productsReducer from './ProductReducer';

export default combineReducers({
  products: productsReducer
});
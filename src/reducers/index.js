import {combineReducers} from 'redux';
import getProductReducer from './getProductReducer';

export default combineReducers({
  products: getProductReducer
});
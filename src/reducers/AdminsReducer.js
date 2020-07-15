import { NEW_ADMIN, GET_ADMIN_DATA, ADMIN_LOGIN, SET_ADMIN_ERROR, ADMIN_LOGOUT, NEW_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT } from '../actions/types';
const initialState = {
  _id: '',
  email: '',
  authToken: '',
  loggedIn: false,
  error: null
}

export default (state = initialState, action) => {
  switch(action.type) {

    case NEW_ADMIN: 
      return state;

    case ADMIN_LOGIN:
      return {
        _id: action.payload.admin[0]._id,
        email: action.payload.admin[0].email,
        authToken: action.payload.token,
        loggedIn: true,
        error: null
      }
    case SET_ADMIN_ERROR:
      return {
        ...state,
        error: action.payload
      }

    case ADMIN_LOGOUT: 
      return {
        ...state,
        loggedIn: false,
        authToken: ''
      }
    case NEW_PRODUCT:
    default: return state;
  }
}
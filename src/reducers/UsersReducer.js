import {NEW_USER, LOGIN, USER_NOT_FOUND, LOGOUT ,RESET_USER_ERROR, DUPLICATE_FOUND, RESET_DUPLICATE} from '../actions/types';
const initialState = {
  _id: '',
  email: '',
  orders: [],
  authToken: '',
  loggedIn: false,
  userErr: null,
  duplicate: false
}
export default (state = initialState, action) => {
  switch(action.type) {
    case NEW_USER: 
                  return {
                    ...state,
                    duplicate: false
                  };
    case LOGIN: 
                  return {
                    ...state,
                    _id: action.payload.user[0]._id,
                    email: action.payload.user[0].email,
                    orders: action.payload.user[0].orders,
                    authToken: action.payload.token,
                    loggedIn: true,
                    duplicate: false,
                    userErr: null
                  }
    case USER_NOT_FOUND:
                  return {
                    ...state,
                    userErr: true
                  }
    case LOGOUT: 
                  return {
                    ...state,
                    loggedIn: false,
                    authToken: ''
                  }
    case RESET_USER_ERROR:
                  return {
                    ...state,
                    userErr: null
                  }
    case DUPLICATE_FOUND: 
                  return {
                    ...state,
                    duplicate: true
                  }
    case RESET_DUPLICATE: 
                  return {
                    ...state,
                    duplicate: false
                  }
    default: return state;
  }
}
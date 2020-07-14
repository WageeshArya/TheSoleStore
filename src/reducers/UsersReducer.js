import {NEW_USER, GET_USER_DATA, LOGIN, SET_USER_ERROR, LOGOUT} from '../actions/types';
const initialState = {
  _id: '',
  email: '',
  orders: [],
  authToken: '',
  loggedIn: false,
  error: null
}
export default (state = initialState, action) => {
  switch(action.type) {
    case NEW_USER: 
                  return state;
    case LOGIN: 
                  return {
                    ...state,
                    _id: action.payload.user[0]._id,
                    email: action.payload.user[0].email,
                    orders: action.payload.user[0].orders,
                    authToken: action.payload.token,
                    loggedIn: true,
                    error: null
                  }
    case SET_USER_ERROR:
                  return {
                    ...state,
                    error: action.payload
                  }
    case LOGOUT: 
                  return {
                    ...state,
                    loggedIn: false,
                    authToken: ''
                  }
    default: return state;
  }
}
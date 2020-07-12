import {NEW_USER, GET_USER_DATA, LOGIN} from '../actions/types';
import { login } from '../actions/userActions';
const initialState = {
  _id: '',
  email: '',
  orders: [],
  authToken: '',
  loggedIn: false
}
export default (state = initialState, action) => {
  switch(action.type) {
    case NEW_USER: 
                  login({
                    email: action.payload.email,
                    password: action.payload.password
                  })
    case LOGIN: 
                  return {
                    ...state,
                    _id: action.payload.user[0]._id,
                    email: action.payload.user[0].email,
                    orders: action.payload.user[0].orders,
                    authToken: action.payload.token,
                    loggedIn: true
                  }
    default: return state;
  }
}
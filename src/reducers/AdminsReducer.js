import { NEW_ADMIN, ADMIN_LOGIN, SET_ADMIN_ERROR, ADMIN_NOT_FOUND, ADMIN_LOGOUT, DUPLICATE_FOUND, RESET_DUPLICATE, RESET_ADMIN_ERROR} from '../actions/types';
const initialState = {
  _id: '',
  email: '',
  authToken: '',
  loggedIn: false,
  error: null,
  duplicate: false
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
        adminErr: null
      }
    case SET_ADMIN_ERROR:
      return {
        ...state,
        adminErr: action.payload
      }

    case RESET_ADMIN_ERROR:
      return {
        ...state,
        adminErr: null
      }

    case ADMIN_LOGOUT: 
      return {
        ...state,
        loggedIn: false,
        authToken: ''
      }

    case ADMIN_NOT_FOUND: 
      return {
        ...state,
        adminErr: true
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
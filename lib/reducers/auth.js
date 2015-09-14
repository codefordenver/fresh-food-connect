import {
  AUTH_LOGIN,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAIL,
  AUTH_LOGOUT,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_FAIL,
  AUTH_SIGNUP,
  AUTH_SIGNUP_SUCCESS,
  AUTH_SIGNUP_FAIL,
  VALIDATE_TOKEN,
  VALIDATE_TOKEN_SUCCESS,
  VALIDATE_TOKEN_FAIL,
} from '../constants';

const initialState = {
  loggedIn: false
};

export default function info(state = initialState, action = {}) {
  switch (action.type) {
    case AUTH_LOGIN:
      return {
        ...state,
        loggingIn: true
      };
    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        loggedIn: true,
        user: action.result.data
      };
    case AUTH_LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        loggedIn: false,
        user: null,
        loginError: action.error
      };
    case VALIDATE_TOKEN:
      return {
        ...state,
        loggingIn: true
      };
    case VALIDATE_TOKEN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        loggedIn: true,
        user: action.result.data
      };
    case VALIDATE_TOKEN_FAIL:
      return {
        ...state,
        loggingIn: false,
        loggedIn: false,
        user: null,
        loginError: action.error
      };
    case AUTH_SIGNUP:
      return {
        ...state,
        loggingIn: true
      };
    case AUTH_SIGNUP_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        user: action.result
      };
    case AUTH_SIGNUP_FAIL:
      return {
        ...state,
        loggingIn: false,
        user: null,
        loginError: action.error
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        loggingOut: true
      };
    case AUTH_LOGOUT_SUCCESS:
      return {
        ...state,
        loggingOut: false,
        loggedIn: true,
        user: null
      };
    case AUTH_LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        loggedIn: false,
        logoutError: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loggedIn;
}

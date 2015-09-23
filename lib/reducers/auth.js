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
  NEW_PASSWORD,
  NEW_PASSWORD_SUCCESS,
  NEW_PASSWORD_FAIL,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL
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
        loggedIn: true,
        user: action.result.data
      };
    case AUTH_SIGNUP_FAIL:
      return {
        ...state,
        loggingIn: false,
        loggedIn: false,
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
        loggedIn: false,
        user: null
      };
    case AUTH_LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        loggedIn: false,
        logoutError: action.error
      };

    case RESET_PASSWORD:
      return {
        ...state,
        resetingPassword: true
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetingPassword: false,
        passwordResetEmailSent: true
      };
    case RESET_PASSWORD_FAIL:
      return {
        ...state,
        resetingPassword: false,
        passwordResetEmailSent: false
      };

    case NEW_PASSWORD:
      return state;
    case NEW_PASSWORD_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        user: action.result.data.user
      };
    case NEW_PASSWORD_FAIL:
      return {
        ...state,
        newPasswordError: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loggedIn;
}

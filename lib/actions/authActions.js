import {
  AUTH_LOAD,
  AUTH_LOAD_SUCCESS,
  AUTH_LOAD_FAIL,
  AUTH_LOGIN,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAIL,
  AUTH_LOGOUT,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_FAIL,
  AUTH_SIGNUP,
  AUTH_SIGNUP_SUCCESS,
  AUTH_SIGNUP_FAIL
} from '../constants';

export function load() {
  return {
    types: [AUTH_LOAD, AUTH_LOAD_SUCCESS, AUTH_LOAD_FAIL],
    promise: (client) => client.get('/loadAuth')
  };
}

export function login(email, password) {
  return {
    types: [AUTH_LOGIN, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAIL],
    promise: (client) => client.post('/auth/sign_in', {
      data: {
        email,
        password
      }
    })
    .catch(err => alert(err))
  };
}

export function logout(email) {
  return {
    types: [AUTH_LOGOUT, AUTH_LOGOUT_SUCCESS, AUTH_LOGOUT_FAIL],
    promise: (client) => client.del('/sessions', {
      data: {
        email
      }
    })
    .catch(err => alert(err))
  };
}

export function signup(newUserData) {
  return {
    types: [AUTH_SIGNUP, AUTH_SIGNUP_SUCCESS, AUTH_SIGNUP_FAIL],
    promise: (client) => client.post('/users', newUserData)
  };
}

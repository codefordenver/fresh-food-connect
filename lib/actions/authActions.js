/* global __CLIENT_HOST__ */
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
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  NEW_PASSWORD,
  NEW_PASSWORD_SUCCESS,
  NEW_PASSWORD_FAIL
} from '../constants';

import * as storage from '../persistence/storage';

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

export function logout() {
  const accessToken = JSON.parse(storage.get('ffc-token'));
  return {
    types: [AUTH_LOGOUT, AUTH_LOGOUT_SUCCESS, AUTH_LOGOUT_FAIL],
    promise: (client) => client.del('/auth/sign_out', {
      data: accessToken
    })
      .then(() => {
        storage.remove('ffc-token');
      })
      .catch(err => alert(err))
  };
}

export function signup(newUserData) {
  return {
    types: [AUTH_SIGNUP, AUTH_SIGNUP_SUCCESS, AUTH_SIGNUP_FAIL],
    promise: (client) => client.post('/auth', {
      data: {
        ...newUserData,
        'confirm_success_url': '/profile'
      }
    })
  };
}

export function validateToken({accessToken, uid, client, tokenType, expiry}) {
  return {
    types: [VALIDATE_TOKEN, VALIDATE_TOKEN_SUCCESS, VALIDATE_TOKEN_FAIL],
    promise: api => api.get('/auth/validate_token', {
      params: {
        'access-token': accessToken,
        'token-type': tokenType,
        expiry,
        uid,
        client,
      }
    })
  };
}

export function resetPassword(email) {
  return {
    types: [RESET_PASSWORD, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL],
    promise: api => api.post('/auth/password', {
      data: {
        email,
        'redirect_url': `${__CLIENT_HOST__}/new-password`
      }
    })
  };
}

export function setNewPassword(password, resetToken) {
  return {
    types: [NEW_PASSWORD, NEW_PASSWORD_SUCCESS, NEW_PASSWORD_FAIL],
    promise: api => api.put('/auth/password', {
      data: {
        'reset_password_token': resetToken,
        'redirect_url': '/profile'
      }
    })
  };
}

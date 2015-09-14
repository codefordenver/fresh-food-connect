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

export function validateToken({accessToken, uid, client}) {
  return {
    types: [VALIDATE_TOKEN, VALIDATE_TOKEN_SUCCESS, VALIDATE_TOKEN_FAIL],
    promise: _client => _client.get('/auth/validate_token', {
      data: {
        'access-token': accessToken,
        uid,
        client
      }
    })
  };
}

import {
  ROUTE_LOGIN_FROM
} from '../constants';

const initialState = {};

export default function redirect(state = initialState, action) {
  switch (action.type) {
    case ROUTE_LOGIN_FROM:
      return {
        ...state,
        loginRedirectedFrom: action.payload.route
      };

    default:
      return state;
  }
}

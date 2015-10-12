import {
  ROUTE_LOGIN_FROM
} from '../constants';

export function loginFrom(route) {
  return {
    type: ROUTE_LOGIN_FROM,
    payload: {
      route
    }
  };
}

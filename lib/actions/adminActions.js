import {
  ADMIN_LOAD_DONORS,
  ADMIN_LOAD_DONORS_SUCCESS,
  ADMIN_LOAD_DONORS_FAIL
} from '../constants';

export function loadDonors() {
  return {
    types: [ADMIN_LOAD_DONORS, ADMIN_LOAD_DONORS_SUCCESS, ADMIN_LOAD_DONORS_FAIL],
    promise: (client) => client.get('/users')
  };
}

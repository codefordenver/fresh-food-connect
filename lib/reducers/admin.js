import {
  ADMIN_LOAD_DONORS,
  ADMIN_LOAD_DONORS_SUCCESS,
  ADMIN_LOAD_DONORS_FAIL
} from '../constants';

const initialState = {
  loadingDonors: false
};

export default function admin(state = initialState, action) {
  switch (action.type) {
    case ADMIN_LOAD_DONORS:
      return {
        ...state,
        loadingDonors: true
      };

    case ADMIN_LOAD_DONORS_SUCCESS:
      return {
        ...state,
        loadingDonors: false,
        donors: action.result.users
      };

    case ADMIN_LOAD_DONORS_FAIL:
      return {
        ...state,
        loadingDonors: false,
        error: action.error
      };

    default:
      return state;
  }
}

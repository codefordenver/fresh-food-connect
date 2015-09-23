import {
  USER_SET_DONATION_PREFERENCE
} from '../constants';

const initialState = {
  size: 0,
  comments: ''
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case USER_SET_DONATION_PREFERENCE:
      return {
        ...state,
        loadingDonors: true
      };

    default:
      return state;
  }
}

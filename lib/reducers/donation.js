import {
  CONFIRM_DONATION,
  CONFIRM_DONATION_SUCCESS
} from '../constants';

const initialState = {};

export default function user(state = initialState, action) {
  switch (action.type) {
    case CONFIRM_DONATION:
      return {
        ...state,
        confirmingDonation: true
      };

    case CONFIRM_DONATION_SUCCESS:
      return {
        ...state,
        confirmingDonation: false,
        donationConfirmed: true
      };

    default:
      return state;
  }
}

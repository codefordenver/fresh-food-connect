import {
  CONFIRM_DONATION,
  CONFIRM_DONATION_SUCCESS,
  CONFIRM_DONATION_FAIL
} from '../constants';

export function setDonationPreference({locationId, userId, size, comments}) {
  return {
    types: [CONFIRM_DONATION, CONFIRM_DONATION_SUCCESS, CONFIRM_DONATION_FAIL],
    promise: (client) => client.post(`/users/${userId}/donations`, {
      data: {
        donation: {
          size,
          comments,
          'location_id': locationId
        }
      }
    })
  };
}

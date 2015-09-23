import {
  USER_SET_DONATION_PREFERENCE,
  USER_SET_DONATION_PREFERENCE_SUCCESS,
  USER_SET_DONATION_PREFERENCE_FAIL
} from '../constants';

export function setDonationPreference({locationId, userId, size, comments}) {
  debugger;
  return {
    types: [USER_SET_DONATION_PREFERENCE, USER_SET_DONATION_PREFERENCE_SUCCESS, USER_SET_DONATION_PREFERENCE_FAIL],
    promise: (client) => client.post(`/users/${userId}/locations/${locationId}/donations`, {
      data: {
        donation: {
          size,
          comments
        }
      }
    })
    .catch(err => alert(err))
  };
}

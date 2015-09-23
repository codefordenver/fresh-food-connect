import {
  USER_SET_DONATION_PREFERENCE,
  USER_SET_DONATION_PREFERENCE_SUCCESS,
  USER_SET_DONATION_PREFERENCE_FAIL
} from '../constants';

export function setDonationPreference({locationId, userId, size, comments}) {
  return {
    types: [USER_SET_DONATION_PREFERENCE, USER_SET_DONATION_PREFERENCE_SUCCESS, USER_SET_DONATION_PREFERENCE_FAIL],
    promise: (client) => client.post(`/users/${userId}/donations`, {
      data: {
        donation: {
          size,
          comments,
          'location_id': locationId
        }
      }
    })
    .catch(err => alert(err))
  };
}
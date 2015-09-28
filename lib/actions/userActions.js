import {
  USER_SET_DONATION_PREFERENCE,
  USER_SET_DONATION_PREFERENCE_SUCCESS,
  USER_SET_DONATION_PREFERENCE_FAIL,
  VERIFY_EMAIL,
  VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL_FAIL
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
  };
}

export function verifyEmail(confirmationToken) {
  return {
    types: [VERIFY_EMAIL, VERIFY_EMAIL_SUCCESS, VERIFY_EMAIL_FAIL],
    promise: client => client.post('/auth/confirmation', {
      data: {
        'confirmation_token': confirmationToken
      }
    })
  };
}

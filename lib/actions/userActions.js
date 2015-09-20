import {
  USER_SET_DONATION_PREFERENCE
} from '../constants';

export function setDonationPreference({donationSize, comments}) {
  return {
    types: [USER_SET_DONATION_PREFERENCE],
    promise: (client) => client.post('/donation', {
      data: {
        donationSize,
        comments
      }
    })
    .catch(err => alert(err))
  };
}

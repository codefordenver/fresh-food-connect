import {
  ADMIN_LOAD_DONORS,
  ADMIN_LOAD_DONORS_SUCCESS,
  ADMIN_LOAD_DONORS_FAIL,
  ADMIN_SEND_EMAIL_REMINDERS,
  ADMIN_SEND_EMAIL_REMINDERS_SUCCESS,
  ADMIN_SEND_EMAIL_REMINDERS_FAIL
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

    case ADMIN_SEND_EMAIL_REMINDERS:
      return {
        ...state,
        sendingEmails: true
      };

    case ADMIN_SEND_EMAIL_REMINDERS_SUCCESS:
      return {
        ...state,
        sendingEmails: false,
        emailsSent: true
      };

    case ADMIN_SEND_EMAIL_REMINDERS_FAIL:
      return {
        ...state,
        sendingEmails: false,
        emailsSent: false
      };

    default:
      return state;
  }
}

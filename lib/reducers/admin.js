import {
  ADMIN_LOAD_DONORS,
  ADMIN_LOAD_DONORS_SUCCESS,
  ADMIN_LOAD_DONORS_FAIL,
  ADMIN_SEND_EMAIL_REMINDERS,
  ADMIN_SEND_EMAIL_REMINDERS_SUCCESS,
  ADMIN_SEND_EMAIL_REMINDERS_FAIL,
  ADMIN_LOAD_LOCATIONS,
  ADMIN_LOAD_LOCATIONS_SUCCESS,
  ADMIN_LOAD_LOCATIONS_FAIL,
  ADMIN_LOAD_DONATIONS,
  ADMIN_LOAD_DONATIONS_SUCCESS,
  ADMIN_LOAD_DONATIONS_FAIL
} from '../constants';

const initialState = {
  loadingDonors: false,
  loadingLocations: false,
  loadingDonations: false,
  donorsResponded: false,
  locationsResponded: false,
  donationsResponded: false
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
        donorsResponded: true,
        donors: action.result.users
      };

    case ADMIN_LOAD_DONORS_FAIL:
      return {
        ...state,
        loadingDonors: false,
        donorsResponded: true,
        donorsError: action.error
      };

    case ADMIN_LOAD_LOCATIONS:
      return {
        ...state,
        loadingLocations: true
      };
    case ADMIN_LOAD_LOCATIONS_SUCCESS:
      return {
        ...state,
        loadingLocations: false,
        locationsResponded: true,
        locations: action.result
      };
    case ADMIN_LOAD_LOCATIONS_FAIL:
      return {
        ...state,
        loadingLocations: false,
        locationsResponded: true,
        locationsError: action.error
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

    case ADMIN_LOAD_DONATIONS:
      return {
        ...state,
        loadingDonations: true
      };
    case ADMIN_LOAD_DONATIONS_SUCCESS:
      return {
        ...state,
        loadingDonations: false,
        donationsResponded: true,
        donations: action.result.donations
      };
    case ADMIN_LOAD_DONATIONS_FAIL:
      return {
        ...state,
        loadingDonations: false,
        donationsResponded: true,
        donationsError: action.error
      };

    default:
      return state;
  }
}

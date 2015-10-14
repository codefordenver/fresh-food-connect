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

export function loadDonors() {
  return {
    types: [ADMIN_LOAD_DONORS, ADMIN_LOAD_DONORS_SUCCESS, ADMIN_LOAD_DONORS_FAIL],
    promise: (client) => client.get('/users')
  };
}

export function sendReminderEmails(locationIds) {
  return {
    types: [ADMIN_SEND_EMAIL_REMINDERS, ADMIN_SEND_EMAIL_REMINDERS_SUCCESS, ADMIN_SEND_EMAIL_REMINDERS_FAIL],
    promise: (client) => client.post('/emails', {
      data: {
        'location_id': locationIds
      }
    })
  };
}

export function loadLocations() {
  return {
    types: [ADMIN_LOAD_LOCATIONS, ADMIN_LOAD_LOCATIONS_SUCCESS, ADMIN_LOAD_LOCATIONS_FAIL],
    promise: (client) => client.get('/locations')
  };
}

export function loadDonations({from, to}) {
  return {
    types: [ADMIN_LOAD_DONATIONS, ADMIN_LOAD_DONATIONS_SUCCESS, ADMIN_LOAD_DONATIONS_FAIL],
    promise: (client) => client.get(`/donations`, {
      params: {
        from,
        to
      }
    })
  };
}

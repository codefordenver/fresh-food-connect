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
  ADMIN_LOAD_DONATIONS_FAIL,
  ADMIN_SET_PICKUP_DAY_ALL,
  ADMIN_SET_PICKUP_DAY_ALL_SUCCESS,
  ADMIN_SET_PICKUP_DAY_ALL_FAIL
} from '../constants';

export function loadDonors() {
  return {
    types: [ADMIN_LOAD_DONORS, ADMIN_LOAD_DONORS_SUCCESS, ADMIN_LOAD_DONORS_FAIL],
    promise: (client) => client.get('/users')
  };
}

export function sendReminderEmails() {
  return {
    types: [ADMIN_SEND_EMAIL_REMINDERS, ADMIN_SEND_EMAIL_REMINDERS_SUCCESS, ADMIN_SEND_EMAIL_REMINDERS_FAIL],
    promise: (client) => client.post('/emails')
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

export function setPickupDayForAllLocations(day) {
  return dispatch => dispatch({
    types: [ADMIN_SET_PICKUP_DAY_ALL, ADMIN_SET_PICKUP_DAY_ALL_SUCCESS, ADMIN_SET_PICKUP_DAY_ALL_FAIL],
    promise: api => api.put('/locations/pickup_day', {
      data: {
        'pickup_day': day
      }
    })
      .then(() =>
        dispatch(loadLocations())
      )
  });
}

import {
  GET_LOCATION,
  GET_LOCATION_SUCCESS,
  GET_LOCATION_FAIL,
  UPDATE_LOCATION,
  UPDATE_LOCATION_SUCCESS,
  UPDATE_LOCATION_FAIL
} from '../constants';

export function getLocation(userId) {
  if (!userId) {
    throw new Error('getLocation requires a userId');
  }
  return {
    types: [GET_LOCATION, GET_LOCATION_SUCCESS, GET_LOCATION_FAIL],
    promise: api => api.get(`/users/${userId}/locations`)
  };
}

export function updateLocation(locationData, userId, locationId) {
  if (!userId) {
    throw new Error('updateLocation requires a userId');
  }

  const method = locationId ? 'put' : 'post';
  let endpoint = `/users/${userId}/locations`;
  if (locationId) {
    endpoint += `/${locationId}`;
  }

  return {
    types: [UPDATE_LOCATION, UPDATE_LOCATION_SUCCESS, UPDATE_LOCATION_FAIL],
    promise: api => api[method](endpoint, {
      data: {
        location: locationData
      }
    })
  };
}

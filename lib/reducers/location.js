import {
  GET_LOCATION,
  GET_LOCATION_SUCCESS,
  GET_LOCATION_FAIL
} from '../constants';

const initialState = {
  loadingLocation: false,
  recieved: false
};

export default function location(state = initialState, action) {
  switch (action.type) {
    case GET_LOCATION:
      return {
        ...state,
        loadingLocation: true
      };

    case GET_LOCATION_SUCCESS:
      return {
        ...state,
        loadingLocation: false,
        recieved: true,
        location: action.result[0]
      };

    case GET_LOCATION_FAIL:
      return {
        ...state,
        loadingLocation: false,
        recieved: true,
        errors: action.errors
      };

    default:
      return state;
  }
}

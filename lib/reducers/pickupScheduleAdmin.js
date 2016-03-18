import {
  PICKUP_SCHEDULE_ADMIN_CREATE,
  PICKUP_SCHEDULE_ADMIN_CREATE_FAIL,
  PICKUP_SCHEDULE_ADMIN_CREATE_SUCCESS,
} from '../constants'

const initialState = {
  creatingPickupSchedule: false
}

export default function pickupScheduleAdmin(state = initialState, action) {
  switch (action.type) {
    case PICKUP_SCHEDULE_ADMIN_CREATE:
      return {
        ...state,
        creatingPickupSchedule: true
      }
    case PICKUP_SCHEDULE_ADMIN_CREATE_SUCCESS:
      return {
        ...state,
        creatingPickupSchedule: false
      }
    case PICKUP_SCHEDULE_ADMIN_CREATE_FAIL:
      return {
        ...state,
        creatingPickupSchedule: false
      }
    default:
      return state
  }
}

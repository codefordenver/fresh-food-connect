import {
  PICKUP_SCHEDULE_ADMIN_CREATE,
  PICKUP_SCHEDULE_ADMIN_CREATE_FAIL,
  PICKUP_SCHEDULE_ADMIN_CREATE_SUCCESS,
} from '../constants'

export function createPickupSchedule(pickupSchedule) {
  return {
    types: [
      PICKUP_SCHEDULE_ADMIN_CREATE,
      PICKUP_SCHEDULE_ADMIN_CREATE_SUCCESS,
      PICKUP_SCHEDULE_ADMIN_CREATE_FAIL
    ],
    promise: (client) => client.post('/admin/pickup_schedules', {
      data: {
        'pickup_schedule': pickupSchedule
      }
    })
  }
}

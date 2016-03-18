import * as actions from 'actions/pickupScheduleAdminActions'
import * as types from 'constants'

describe('Pickup Schedule Admin actions', () => {
  it('posts provided Pickup Schedule data to the API', () => {
    let promise
    const mockClient = { post: chai.spy() }
    const pickupSchedule = {}

    promise = actions.createPickupSchedule(pickupSchedule).promise
    promise(mockClient)

    let result = expect(mockClient.post)
      .to.have.been.called.with(
        '/admin/pickup_schedules', {
          data: {
            'pickup_schedule': pickupSchedule
          }
        })
  })
})

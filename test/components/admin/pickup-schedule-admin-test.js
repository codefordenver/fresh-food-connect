import React from 'react'
import moment from 'moment'
import timekeeper from 'timekeeper'
import { PickupScheduleAdmin } from 'components/admin/PickupScheduleAdmin'
import { Simulate, createRenderer, renderIntoDocument } from 'react-addons-test-utils'

describe('PickupScheduleAdmin', () => {
  it('renders the new Pickup Schedule form with default values', () => {
    timekeeper.travel(new Date('Oct 14, 2016'))

    const component = renderIntoDocument(<PickupScheduleAdmin />)
    let refs = component.refs,
        defaultNotification = 'DEFAULT NOTIFICATION TEXT - CHANGE ME',
        notificationTime = refs.notification_time.props.defaultTime,
        startTime = refs.pickup_time_range_start.props.defaultTime,
        endTime = refs.pickup_time_range_end.props.defaultTime,
        startDate = refs.pickup_date_range_start.getDate(),
        endDate = refs.pickup_date_range_end.getDate()

    expect(refs.zip_code.getValue()).to.equal('')
    expect(refs.notification_text.getValue()).to.equal(defaultNotification)
    expect(moment(notificationTime).format('ha')).to.eq('3pm')
    expect(moment(startTime).format('ha')).to.eq('8am')
    expect(moment(endTime).format('ha')).to.eq('12pm')
    expect(moment(startDate).format('M/D/Y')).to.eq('10/21/2016')
    expect(moment(endDate).format('M/D/Y')).to.eq('1/14/2017')

    timekeeper.reset()
  })

  describe('when the form is submitted', () => {
    it('invokes the createPickupSchedule action', () => {
      const fakeAction = chai.spy()
      const props = { createPickupSchedule: fakeAction }
      const component = renderIntoDocument(<PickupScheduleAdmin {...props} />)

      Simulate.submit(component.refs.form)

      expect(fakeAction).to.have.been.called()
    })
  })
})

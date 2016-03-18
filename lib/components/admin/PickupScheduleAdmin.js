import React, { PropTypes, Component } from 'react'
import moment from 'moment'
import * as pickupScheduleAdminActions from 'actions/pickupScheduleAdminActions'
import { Card, DatePicker, TimePicker, TextField, RaisedButton } from 'material-ui'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

export class PickupScheduleAdmin extends Component {
  static propTypes = {
    createPickupSchedule: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this._resetPickupSchedule()
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.createPickupSchedule(this.state.pickupSchedule)
    this._resetPickupSchedule()
  }

  render() {
    return (
      <div>
        <h1 className='pageTitle text-center'>Pickup Schedules Admin</h1>
        <Card>
          <h2>Create New Pickup Schedule</h2>
          <form ref='form' onSubmit={::this.handleSubmit}>
            <TextField
              ref='zip_code'
              onChange={this._updateAttr.bind(this, 'zip_code')}
              value={this.state.pickupSchedule.zip_code}
              floatingLabelText='Zip Code' />
            <br />
            <TextField
              multiLine
              ref='notification_text'
              onChange={this._updateAttr.bind(this, 'notification_text')}
              value={this.state.pickupSchedule.notification_text}
              floatingLabelText='Notification Text' />
            <br />
            <TimePicker
              ref='notification_time'
              onChange={this._updateTimeAttr.bind(this, 'notification_time')}
              defaultTime={this.state.pickupSchedule.notification_time}
              floatingLabelText='Notification Time' />
            <br />
            <DatePicker
              ref='pickup_date_range_start'
              onChange={this._updateDateAttr.bind(this, 'pickup_date_range_start')}
              value={this.state.pickupSchedule.pickup_date_range_start}
              floatingLabelText='Start Date' />
            <br />
            <DatePicker
              ref='pickup_date_range_end'
              onChange={this._updateDateAttr.bind(this, 'pickup_date_range_end')}
              value={this.state.pickupSchedule.pickup_date_range_end}
              floatingLabelText='End Date' />
            <br />
            <TimePicker
              ref='pickup_time_range_start'
              onChange={this._updateTimeAttr.bind(this, 'pickup_time_range_start')}
              defaultTime={this.state.pickupSchedule.pickup_time_range_start}
              floatingLabelText='Pickup Start Time' />
            <br />
            <TimePicker
              ref='pickup_time_range_end'
              onChange={this._updateTimeAttr.bind(this, 'pickup_time_range_end')}
              defaultTime={this.state.pickupSchedule.pickup_time_range_end}
              floatingLabelText='Pickup End Time' />
            <br />
            <RaisedButton
              label='Create Pickup Schedule'
              onClick={::this.handleSubmit} />
          </form>
        </Card>
      </div>
    )
  }

  _resetPickupSchedule() {
    let notificationTime = moment().set({ hour: 15, minute: 0 }).toDate(),
      startDate = moment().add(7, 'days').toDate(),
      endDate = moment().add(3, 'months').toDate(),
      startTime = moment().set({ hour: 8, minute: 0 }).toDate(),
      endTime = moment().set({ hour: 12, minute: 0 }).toDate()

    this.state = {
      pickupSchedule: {
        /*eslint-disable camelcase*/
        zip_code: '',
        notification_text: 'DEFAULT NOTIFICATION TEXT - CHANGE ME',
        notification_time: notificationTime,
        pickup_date_range_start: startDate,
        pickup_date_range_end: endDate,
        pickup_time_range_start: startTime,
        pickup_time_range_end: endTime,
        /*eslint-enable camelcase*/
      }
    }
  }

  _updateTimeAttr(attr, _err, time) {
    this.refs[attr].setTime(time)
    this._updatePickupSchedule(attr, time)
  }

  _updateDateAttr(attr, _event, date) {
    this._updatePickupSchedule(attr, date)
  }

  _updateAttr(attr) {
    let value = this.refs[attr].getValue()
    this._updatePickupSchedule(attr, value)
  }

  _updatePickupSchedule(attr, value) {
    this.setState({
      pickupSchedule: {
        ...this.state.pickupSchedule,
        [attr]: value
      }
    })
  }
}

export default connect(
  state => ({ user: state.auth.user }),
  dispatch => bindActionCreators(pickupScheduleAdminActions, dispatch)
)(PickupScheduleAdmin)

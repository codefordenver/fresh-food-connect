import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import moment from 'moment'
import {
  Card,
  RaisedButton
} from 'material-ui'

import * as adminActions from '../../actions/adminActions'
import LocationsMap from './LocationsMap'
import DataTable from './DataTable'
import CoordinationTable from './CoordinationTable'

@connect(
  state => ({user: state.auth.user, admin: state.admin}),
  dispatch => bindActionCreators(adminActions, dispatch)
)
export default class CoordinationAdmin extends Component {
  static propTypes = {
    admin: PropTypes.object,
    user: PropTypes.object,

    loadDonations: PropTypes.func.isRequired,
    loadDonors: PropTypes.func.isRequired,
    loadLocations: PropTypes.func.isRequired,
    sendReminderEmails: PropTypes.func.isRequired
  }

  constructor(props, context) {
    super(props, context)

    const donationsFrom = moment.utc().subtract(5, 'days').format()
    const donationsTo =  moment.utc().add(5, 'days').format()

    this.state = {
      view: 'list',
      donationsFrom,
      donationsTo
    }

    props.loadDonors()
    props.loadLocations()
    props.loadDonations({from: donationsFrom, to: donationsTo})
  }

  _sendReminderEmails() {
    const locationIds = this.refs['coordination-table'].getSelectedLocationIds()
    const locationAddresses = locationIds.map(id => {
      const {address, city, state, zipcode} = this.props.admin.locations.find(location => +location.id === +id)
      return `- ${address}, ${city}, ${state}, ${zipcode}`
    })

    if (!locationIds.length) {
      alert('Please select locations to send email reminders to in the Coordination Table below')
    } else {
      const sendEmails = confirm('Sending emails to these locations:\n' + locationAddresses.join('\n'))

      if (sendEmails) {
        this.props.sendReminderEmails(locationIds)
      }
    }
  }

  render() {
    const {emailsSent} = this.props.admin
    return (
      <div>
        <div style={{marginTop: '50px'}}>
          <RaisedButton label={this._getOtherView(this.state.view)} onClick={this._toggleView.bind(this)}/>
          {' '}
          <RaisedButton label="Send Reminder Emails" onClick={this._sendReminderEmails.bind(this)} disabled={emailsSent}/>
          { emailsSent &&
            <p style={{color: 'white'}}>Reminder emails have been sent!</p>
          }
        </div>

        { this.state.view === 'list' ?
            this._getListView(this.props.admin)
          :
            this._getMapView(this.props.admin) }
      </div>
    )
  }

  _getOtherView(view) {
    return view === 'list' ? 'map' : 'list'
  }

  _toggleView() {
    if (this.state.view === 'list') {
      this.setState({ view: 'map' })
    } else {
      this.setState({ view: 'list' })
    }
  }

  _getListView(adminData) {
    const {donors, donations, locations} = adminData

    const coordinationTableProps = {donors, donations, locations}
    return (
      <div>
        <Card style={{margin: '30px 20px',
                  padding: '0 20px',
                  overflow: 'scroll'}}>
          <h2>Coordination Table</h2>
          <em>
            Note: Donation refers to latest donation for the address in the last 5 days
          </em>
          { locations && donors && donations ? <CoordinationTable
                                                    ref="coordination-table"
                                                    {...coordinationTableProps}/> : null }
        </Card>

        <Card style={{margin: '30px 20px',
                  padding: '0 20px',
                  overflow: 'scroll'}}>
          <h2>Users</h2>
          { donors ? <DataTable data={donors} showHeaders={true}/> : null }
        </Card>

        <Card style={{margin: '30px 20px',
                  padding: '0 20px',
                  overflow: 'scroll'}}>
          <h2>Locations</h2>
          { locations ? <DataTable data={locations} showHeaders={true}/> : null }
        </Card>

        <Card style={{margin: '30px 20px',
                  padding: '0 20px',
                  overflow: 'scroll'}}>
          <h2>Donations</h2>
          <em>
            Note: Only showing last 5 days
          </em>
          { donations ? <DataTable data={donations} showHeaders={true}/> : null }
        </Card>
      </div>
    )
  }

  _getMapView(adminData) {
    const {donations, locations} = adminData
    const hydratedLocations = locations.map(location => {
      const relatedDonation = donations.find(donation => donation.location_id === location.id)

      if (relatedDonation) {
        location.donation = relatedDonation
      }
      return location
    })
    return <LocationsMap locations={hydratedLocations} defaultCenter={{lat: 39.7392, lng: -104.9903}} defaultZoom={15}/>
  }
}

import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import moment from 'moment';
import {
  Card,
  RaisedButton
} from 'material-ui';

import * as adminActions from '../../actions/adminActions';
import LocationsMap from './LocationsMap';
import DataTable from './DataTable';
import SelectPickupDay from './SelectPickupDay';

@connect(
  state => ({user: state.auth.user, admin: state.admin}),
  dispatch => bindActionCreators(adminActions, dispatch)
)
export default class Admin extends React.Component {
  static propTypes = {
    admin: PropTypes.object,
    user: PropTypes.object,

    loadDonations: PropTypes.func.isRequired,
    loadDonors: PropTypes.func.isRequired,
    loadLocations: PropTypes.func.isRequired,
    sendReminderEmails: PropTypes.func.isRequired,
    setPickupDayForAllLocations: PropTypes.func.isRequired
  }

  constructor(props, context) {
    super(props, context);

    const donationsFrom = moment.utc().subtract(5, 'days').format();
    const donationsTo =  moment.utc().add(5, 'days').format();

    this.state = {
      view: 'list',
      donationsFrom,
      donationsTo
    };

    props.loadDonors();
    props.loadLocations();
    props.loadDonations({from: donationsFrom, to: donationsTo});
  }

  render() {
    const {emailsSent} = this.props.admin;
    return (
      <div>
        <h1 className="pageTitle text-center">Admin</h1>

        <div style={{marginTop: '50px'}}>
          <RaisedButton label={this._getOtherView(this.state.view)} onClick={this._toggleView.bind(this)}/>
          {' '}
          <RaisedButton label="Send Reminder Emails" onClick={this.props.sendReminderEmails} disabled={emailsSent}/>
          { emailsSent &&
            <p style={{color: 'white'}}>Reminder emails have been sent!</p>
          }
        </div>

        { this.state.view === 'list' ?
            this._getListView(this.props.admin)
          :
            this._getMapView(this.props.admin) }
      </div>
    );
  }

  _getOtherView(view) {
    return view === 'list' ? 'map' : 'list';
  }

  _toggleView() {
    if (this.state.view === 'list') {
      this.setState({ view: 'map' });
    } else {
      this.setState({ view: 'list' });
    }
  }

  _getListView(adminData) {
    const {donors, donations, locations} = adminData;
    return (
      <div>
        <Card style={{margin: '30px 20px',
                  padding: '0 20px',
                  overflow: 'scroll'}}>
          <h2>Users</h2>
          { donors ? <DataTable data={donors} showHeaders={true}/> : null }
        </Card>

        { this._getLocationsCard(locations) }

        <Card style={{margin: '30px 20px',
                  padding: '0 20px',
                  overflow: 'scroll'}}>
          <h2>Donations</h2>
          { donations ? <DataTable data={donations} showHeaders={true}/> : null }
        </Card>
      </div>
    );
  }

  _getLocationsCard(locations) {
    let innerContent = null;

    if (locations && locations.length > 0) {
      innerContent = (
        <div>
          <SelectPickupDay selectedDay={locations[0].pickup_day} onSelect={this._updatePickupDay.bind(this)} />

          <div style={{overflow: 'scroll'}}>
            <DataTable data={locations} showHeaders={true}/>
          </div>
        </div>
      );
    }

    return (
      <Card style={{margin: '30px 20px',
                    padding: '0 20px'}}>
        <h2>Locations</h2>
        { innerContent }
      </Card>
    );
  }

  _updatePickupDay(day) {
    this.props.setPickupDayForAllLocations(day);
  }

  _getMapView(adminData) {
    const {donations, locations} = adminData;
    const hydratedLocations = locations.map(location => {
      const relatedDonation = donations.find(donation => donation.location_id === location.id);

      if (relatedDonation) {
        location.donation = relatedDonation;
      }
      return location;
    });
    return <LocationsMap locations={hydratedLocations} defaultCenter={{lat: 39.7392, lng: -104.9903}} defaultZoom={15}/>;
  }
}

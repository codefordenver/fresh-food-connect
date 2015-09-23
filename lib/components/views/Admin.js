import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  Card,
  RaisedButton
} from 'material-ui';

import * as adminActions from '../../actions/adminActions';
import LocationsMap from '../LocationsMap';

@connect(
  state => ({user: state.auth.user, admin: state.admin}),
  dispatch => bindActionCreators(adminActions, dispatch)
)
export default class Admin extends React.Component {
  static propTypes = {
    admin: PropTypes.object,
    user: PropTypes.object,

    loadDonors: PropTypes.func.isRequired,
    loadLocations: PropTypes.func.isRequired,
    sendReminderEmails: PropTypes.func.isRequired
  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      view: 'list'
    };

    if (!props.admin.donorsResponded) {
      props.loadDonors();
    }
    if (!props.admin.locationsResponded) {
      props.loadLocations();
    }
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

        { this._getContent.call(this) }
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

  _getTable(donors) {
    const keys = Object.keys(donors[0]);
    return (
      <table className="list-table" style={{margin: '10px'}}>
        <tr>
          { keys.map(key => <th key={key}>{ key }</th>) }
        </tr>

        { donors.map(donor => (
          <tr key={donor.id}>
            {keys.map(key => <td key={key} style={{padding: '10px'}}>{ donor[key] }</td>)}
          </tr>
        )) }
      </table>
    );
  }

  _getContent() {
    let content;

    const {donors, locations} = this.props.admin;

    if (this.state.view === 'list') {
      content = (
        <div>
          <Card style={{margin: '30px 20px',
                    padding: '0 20px'}}>
            <h2>Users</h2>
            { donors ? this._getTable(donors) : null }
          </Card>

          <Card style={{margin: '30px 20px',
                    padding: '0 20px'}}>
            <h2>Locations</h2>
            { locations ? this._getTable(locations) : null }
          </Card>
        </div>
      );
    } else {
      content = <LocationsMap locations={locations} defaultCenter={{lat: 39.7392, lng: -104.9903}} defaultZoom={15}/>;
    }
    return content;
  }
}

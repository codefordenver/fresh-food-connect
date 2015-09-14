import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  RaisedButton
} from 'material-ui';

import * as adminActions from '../../actions/adminActions';
import LocationsMap from '../LocationsMap';

@connect(
  state => ({user: state.auth.user, donors: state.admin.donors}),
  dispatch => bindActionCreators(adminActions, dispatch)
)
export default class Admin extends React.Component {
  static propTypes = {
    donors: PropTypes.array,
    user: PropTypes.object,

    loadDonors: PropTypes.func.isRequired
  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      view: 'list'
    };
  }

  render() {
    const {loadDonors, donors} = this.props;
    if (!donors) {
      setTimeout(loadDonors, 0);
    }
    return (
      <div>
        <RaisedButton label={this.state.view} onClick={this._toggleView.bind(this)}/>

        { this._getContent.call(this) }
      </div>
    );
  }

  _toggleView() {
    if (this.state.view === 'list') {
      this.setState({ view: 'map' });
    } else {
      this.setState({ view: 'list' });
    }
  }

  _getDonorList(donors) {
    const keys = Object.keys(donors[0]);
    return (
      <table style={{margin: '10px'}}>
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

    if (this.state.view === 'list') {
      content = this.props.donors ? this._getDonorList(this.props.donors) : null;
    } else {
      content = <LocationsMap defaultCenter={{lat: 39.7392, lng: -104.9903}} defaultZoom={15}/>;
    }
    return content;
  }
}

import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import DonationSizeChooser from 'components/DonationSizeChooser';

import * as userActions from 'actions/userActions';

@connect(
  state => ({user: state.auth.user}),
  dispatch => bindActionCreators(userActions, dispatch)
)
export default class GotVeggies extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func
  };

  static childContextTypes = {
    muiTheme: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {selectedBagSize: null};
  }

  _onSizeSelected(bagSize) {
    this.setState({selectedBagSize: bagSize.name});
    userActions.setDonationPreference({donationSize: bagSize.value});
  }

  render() {
    return (
      <div className="donations">
        <p>Great! A young cyclist will pick up your veggies<br />
        <span className='pickup_info'>after 9 a.m.</span></p>

        <p>Leave your veggies in a place that is:</p>
        <ul className='pickup_info'>
          <li>Dry</li>
          <li>Shaded</li>
          <li>Elevated</li>
          <li>Easy to see from the street</li>
        </ul>

        <p>What size donation should we plan to pick up?</p>

        <DonationSizeChooser selected={this.state.selectedBagSize} onSelect={this._onSizeSelected.bind(this)}/>

        <p>Thanks for donating!</p>
      </div>
    );
  }
}

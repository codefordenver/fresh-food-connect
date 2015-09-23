import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {FontIcon, RaisedButton} from 'material-ui';
import DonationSizeChooser from 'components/DonationSizeChooser';

import * as userActions from 'actions/userActions';
import {getQueryVariable} from '../../utils/urlUtils';

@connect(
  state => ({user: state.auth.user}),
  dispatch => bindActionCreators(userActions, dispatch)
)
export default class GotVeggies extends Component {
  static propTypes = {
    user: PropTypes.object,
    setDonationPreference: PropTypes.func
  };

  static childContextTypes = {
    muiTheme: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    // donation sizes
    // 0 - no donation
    // 1 - small
    // 2 - medium
    // 3 - large
    this.state = {
      selectedBagSize: 0,
      comments: null
    };
  }

  _onSizeSelected(bagSize) {
    this.setState({selectedBagSize: bagSize.value});
  }

  _handleSubmit() {
    const {user} = this.props;
    const locationId = getQueryVariable('location_id');
    this.props.setDonationPreference({
      locationId,
      userId: user.id,
      size: this.state.selectedBagSize,
      comments: this.state.comments
    });
  }

  _handleChangeNote(event) {
    this.setState({
      comments: event.target.value
    });
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

        <form onSumbit={this._handleSubmit}>
          <p>What size donation should we plan to pick up?</p>

          <DonationSizeChooser selected={this.state.selectedBagSize} onSelect={::this._onSizeSelected}/>

          <p> Any notes for us: </p>
          <textarea name="notes" id="notes" cols="30" rows="10" onChange={::this._handleChangeNote} value={this.state.notes} placeholder="I have a dog, etc."></textarea>

          <br/>
          <br/>

          <RaisedButton linkButton={true} onClick={::this._handleSubmit} secondary={true} label="Submit Donation">
            <FontIcon className="muidocs-icon-custom-github"/>
          </RaisedButton>

        </form>

        <br/>

        <p>Thanks for donating!</p>

      </div>
    );
  }
}

import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {RaisedButton} from 'material-ui';

import DonationSizeChooser from 'components/DonationSizeChooser';
import * as userActions from 'actions/userActions';
import {getQueryVariable} from '../../utils/urlUtils';

const iconCheck = require('assets/images/icon-check.png');

@connect(
  state => ({user: state.auth.user}),
  dispatch => bindActionCreators(userActions, dispatch)
)
export default class GotVeggies extends Component {
  static propTypes = {
    user: PropTypes.object,
    setDonationPreference: PropTypes.func
  }

  constructor(props) {
    super(props);
    // donation sizes
    // 0 - no donation
    // 1 - small
    // 2 - medium
    // 3 - large
    this.state = {
      size: 0,
      comments: null
    };
  }

  _onSizeSelected(bagSize) {
    this.setState({size: bagSize.value});
  }

  _handleSubmit() {
    const {user} = this.props;
    const locationId = getQueryVariable('location_id');
    this.props.setDonationPreference({
      locationId,
      userId: user.id,
      size: this.state.size,
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
        <p className="pickupQ">You've got a donation?</p>
        <div className="highlight">First, how much are we picking up?</div>
        <span className="copy">Click on a size option below that indicates the best guess for how much food you've ready for pickup</span>

        <DonationSizeChooser selected={this.state.size} onSelect={this._onSizeSelected.bind(this)}/>

        <p>
          <span className="highlight">Second, </span> leave your veggies in a place that is
        </p>
        <ul className='info'>
          <li><img src={iconCheck} width="25" alt="" /> Dry</li>
          <li><img src={iconCheck} width="25" alt="" /> Shaded</li>
          <li><img src={iconCheck} width="25" alt="" /> Elevated</li>
          <li><img src={iconCheck} width="25" alt="" /> Easy to see from the street</li>
        </ul>

        <div className="highlight">Great!</div>
        A young cyclist will pick up your veggies <span className='info'>after 9 a.m.</span>

        <p> Any notes for us: </p>
        <textarea name="notes" id="notes" cols="30" rows="5" onChange={::this._handleChangeNote} value={this.state.notes} placeholder="I have a dog, etc."></textarea>

        <br/>
        <br/>

        <RaisedButton onClick={::this._handleSubmit} secondary={true} label="I'm ready! Come and get it!"/>
      </div>
    );
  }
}

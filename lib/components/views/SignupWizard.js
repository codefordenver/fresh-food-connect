import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import LocationCard from '../LocationCard';
import PickupInfoCard from '../PickupInfoCard';
import SignupCard from '../SignupCard';
import {signup} from '../../actions/authActions';
import {updateLocation} from '../../actions/locationActions';

import {PICKUP_TIME} from '../../constants';


@connect(
  state => ({user: state.auth.user}),
  dispatch => bindActionCreators({signup, updateLocation}, dispatch)
)
export default class SignupWizard extends Component {
  static propTypes = {
    signup: PropTypes.func.isRequired,
    updateLocation: PropTypes.func.isRequired,
    user: PropTypes.object
  }

  constructor(props) {
    super(props);

    this.state = {
      location: null
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user && this.state.location) {
      this.props.updateLocation(this.state.location, nextProps.user.id);
    }
  }

  render() {
    return (
      <div>
        <h1 className="pageTitle text-center">
          Where do you live?
        </h1>
        <LocationCard saveLocation={this._storeLocation.bind(this)}/>
        {this.state.location ? this._getPickupDetails() : null}
        {this.state.location ? this._getEmailSignup.call(this) : null}
      </div>
    );
  }

  _storeLocation(location) {
    this.setState({
      location
    });
  }

  _getPickupDetails() {
    // We can check if the zipcode / location is in a place
    // where they pickup currently here
    // Also, this is where we would check the api for the actual
    // pickup day associated with that location
    const pickupDay = PICKUP_TIME;
    return (
      <PickupInfoCard pickupDay={pickupDay} />
    );
  }

  _getEmailSignup() {
    return (
      <div>
        <h2 className="text-center" style={{color: 'white'}}>
          Now we just need a way to contact you
        </h2>
        <h3 className="text-center" style={{color: 'white'}}>
          and an email so you can update your preferences
        </h3>
        <p className="text-center" style={{color: 'white'}}>
          You will receive an email the day before a pickup to check if you have food to donate.
        </p>
        <SignupCard signup={this.props.signup}/>
      </div>
    );
  }
}

import React, {Component, PropTypes} from 'react/addons';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  Card,
  FlatButton
} from 'material-ui';
import {Link} from 'react-router';

import LocationCard from '../LocationCard';
import PickupInfoCard from '../PickupInfoCard';
import SignupCard from '../SignupCard';
import {signup} from '../../actions/authActions';

import {PICKUP_TIME} from '../../constants';

const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

@connect(
  state => ({user: state.auth.user}),
  dispatch => bindActionCreators({signup}, dispatch)
)
export default class SignupWizard extends Component {
  static propTypes = {
    signup: PropTypes.func.isRequired,
    user: PropTypes.object
  }

  constructor(props) {
    super(props);

    this.state = {
      location: null
    };
  }

  render() {
    let signupCards;

    if (!this.state.location) {
      signupCards = (
        <Card key="log-in"
            style={{margin: '26px 20px',
                    padding: '5px 20px'}}>
          <p>
            Have an account already?
            <Link to="login">
              <FlatButton label="Log In" secondary={true}/>
            </Link>
          </p>
        </Card>
      );
    } else {
      signupCards = [
        this._getPickupDetails(),
        this._getEmailSignup.call(this)
      ];
    }
    return (
      <div>
        <h1 className="pageTitle text-center">
          Sign Up
        </h1>
        <LocationCard saveLocation={this._storeLocation.bind(this)}>
          <h1>
            Where should we pick up?
          </h1>
        </LocationCard>

        <ReactCSSTransitionGroup transitionName="wizard">
          {signupCards}
        </ReactCSSTransitionGroup>
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
      <PickupInfoCard key="pickup-details" pickupDay={pickupDay} />
    );
  }

  _getEmailSignup() {
    return (
      <SignupCard key="email-signup" signup={this._signup.bind(this)}>
        <h2>
          Now we just need a way to contact you
        </h2>
        <p>
          You will receive an email the day before a pickup to check if you have food to donate.
        </p>
      </SignupCard>
    );
  }

  _signup({email, password}) {
    this.props.signup({
      email,
      password,
      location: this.state.location
    });
  }
}

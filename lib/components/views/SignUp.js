import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as authActions from '../../actions/authActions';
import SignupCard from '../SignupCard';

@connect(
  () => ({}),
  dispatch => bindActionCreators(authActions, dispatch)
)
export default class SignUp extends Component {
  static propTypes = {
    signup: PropTypes.func
  };

  render() {
    return (
      <div>
        <h1 className="pageTitle text-center">
          Sign Up
        </h1>
        <SignupCard signup={this.props.signup} />
      </div>
    );
  }
}

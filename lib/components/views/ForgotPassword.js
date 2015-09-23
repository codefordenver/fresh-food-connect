import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  Card,
  RaisedButton,
  TextField
} from 'material-ui';

import * as authActions from '../../actions/authActions';
import {validatePasswordReset} from '../../validation/passwordReset';

@connect(
  state => ({passwordResetEmailSent: state.auth.passwordResetEmailSent}),
  dispatch => bindActionCreators(authActions, dispatch)
)
export default class PasswordReset extends Component {
  static propTypes = {
    passwordResetEmailSent: PropTypes.bool,
    resetPassword: PropTypes.func
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      email: '',
      validation: {}
    };
  }

  render() {
    return (
      <Card style={{margin: '76px 20px',
                    padding: '0 20px'}}>
        <h1>Reset Password</h1>

        {!this.props.passwordResetEmailSent &&
          <form onSubmit={this.handleSubmit}>
            <TextField
                floatingLabelText="Email"
                value={this.state.email}
                errorText={this.state.validation.email}
                onChange={this._updateInputState.bind(this, 'email')} />
            <br/>
            <RaisedButton label="Reset Password" onClick={this.handleSubmit.bind(this)}/>
          </form>
        }
        {this.props.passwordResetEmailSent &&
          <div>
            <h3>Email Sent</h3>
            <p>
              Please check your email for a link to reset your password
            </p>
          </div>
        }
      </Card>
    );
  }

  _updateInputState(key, event) {
    this.setState({
      [key]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const {email} = this.state;
    const validation = validatePasswordReset({ email });
    this.setState({
      validation
    });
    if (validation.valid) {
      this.props.resetPassword(this.state.email);
    }
  }
}

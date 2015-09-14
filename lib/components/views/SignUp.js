import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  Card,
  FlatButton,
  RaisedButton,
  Snackbar,
  TextField
} from 'material-ui';

import * as authActions from '../../actions/authActions';
import signupValidation from '../../validation/signupValidation';

@connect(
  () => ({}),
  dispatch => bindActionCreators(authActions, dispatch)
)
export default class SignUp extends Component {
  static propTypes = {
    signup: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  render() {
    return (
      <div>
        <Card style={{margin: '76px 20px',
                      padding: '0 20px'}}>
          <h1>Sign Up</h1>

          <form onSubmit={this.handleSubmit}>
            <TextField
                floatingLabelText="Email"
                value={this.state.email}
                onChange={this._updateInputState.bind(this, 'email')} />
            <br/>
            <TextField
                floatingLabelText="Password"
                hintText="Password Field"
                type="password"
                value={this.state.password}
                onChange={this._updateInputState.bind(this, 'password')}/>
            <br/>
            <RaisedButton label="Sign Up" onClick={this.handleSubmit.bind(this)}/>

            <p>
              Have an account already?
              <Link to="login">
                <FlatButton label="Log In" secondary={true}/>
              </Link>
            </p>
          </form>
        </Card>

        <Snackbar
            ref="snackbar"
            message="Requires: valid a email and password (8 or more characters)."
            autoHideDuration={3000}/>
      </div>
    );
  }

  _updateInputState(key, event) {
    this.setState({
      [key]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { email, password } = this.state;

    const validation = signupValidation({
      email,
      password
    });

    if (validation.valid) {
      this.props.signup({email, password});
    } else {
      this.refs.snackbar.show();
    }
  }
}

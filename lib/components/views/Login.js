import React, {Component, PropTypes} from 'react';
import { findDOMNode } from 'react-dom'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import * as authActions from '../../actions/authActions';
import loginValidation from '../../validation/loginValidation';

import {
  Card,
  FlatButton,
  RaisedButton,
  TextField,
  Snackbar
} from 'material-ui';


@connect(
  state => ({user: state.auth.user}),
  dispatch => bindActionCreators(authActions, dispatch)
)
export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
  };

  render() {
    const {user, logout} = this.props;
    const styles = require('./Login.scss');

    return (
      <div className={styles.loginPage + ' container'}>
        <Snackbar
          ref="snackbar"
          message="Invalid or Missing Username & Password. Please try again."
          autoHideDuration={2000}
          className="snackbar"/>

        <Card style={{margin: '76px 20px',
                      padding: '20px'}}>

          <h1>Login</h1>

          {!user &&
            <div>
              <form className="login-form" onSubmit={::this.handleSubmit}>
                <TextField
                    ref="email"
                    floatingLabelText="Email"
                    multiLine={false}/>
                <br/>
                <TextField
                    ref="password"
                    hintText="Password Field"
                    floatingLabelText="Password"
                    type="password"/>
                <br/>
                <RaisedButton label="log in" onClick={::this.handleSubmit}/>
                <Link to="/signup">
                  <FlatButton label="Create Account" secondary={true}/>
                </Link>
                <Link to="/reset-password">
                  <FlatButton label="Forgot password" primary={true}/>
                </Link>
              </form>
              <br />
            </div>
          }
          {user &&
          <div>
            <p>You are currently logged in as {user.email}.</p>

            <FlatButton label="Log Out" secondary={true} onClick={logout}/>
          </div>
          }
        </Card>
      </div>
    );
  }

  handleSubmit(event) {
    event.preventDefault();

    const emailField = findDOMNode(this.refs.email).children[1];
    const passwordField = findDOMNode(this.refs.password).children[2];
    let email = emailField.value;
    let password = passwordField.value;

    const validation = loginValidation({
      email,
      password
    });

    if (validation.valid) {
      this.props.login(email, password);
    } else {
      this.refs.snackbar.show();
      email = '';
      password = '';
      return;
    }
  }
}

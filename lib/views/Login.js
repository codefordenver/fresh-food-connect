import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {isLoaded as isAuthLoaded} from '../reducers/auth';
import * as authActions from '../actions/authActions';
import {load as loadAuth} from '../actions/authActions';
import loginValidation from '../validation/loginValidation';

import {
  Card,
  FlatButton,
  RaisedButton,
  Styles,
  TextField,
  Snackbar
} from 'material-ui';

import DocumentMeta from 'react-document-meta';

const ThemeManager = new Styles.ThemeManager();


@connect(
  state => ({user: state.auth.user}),
  dispatch => bindActionCreators(authActions, dispatch)
)
export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func
  };

  static childContextTypes = {
    muiTheme: React.PropTypes.object
  };

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }

  componentWillReceiveProps(nextProps) {
    // store localStorage.setItem('sessionKey', xyz);
  }

  render() {
    const {user, logout} = this.props;
    const styles = require('./Login.scss');

    return (
      <div className={styles.loginPage + ' container'}>
        <Snackbar
          ref="snackbar"
          message="Invalid or Missing Username & Password. Please try again."
          autoHideDuration={2000}/>
        <DocumentMeta title="Fresh Food Connect | Login"/>

        <Card style={{margin: '76px 20px',
                      padding: '0 20px'}}>

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
                <Link to="signup">
                  <FlatButton label="Create Account" secondary={true}/>
                </Link>
              </form>
            </div>
          }
          {user &&
          <div>
            <p>You are currently logged in as {user.user.email}.</p>

            <FlatButton label="Log Out" secondary={true} onClick={logout}/>
          </div>
          }
        </Card>
      </div>
    );
  }

  handleSubmit(event) {
    event.preventDefault();

    const emailField = React.findDOMNode(this.refs.email).children[1];
    const passwordField = React.findDOMNode(this.refs.password).children[2];
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

  static fetchData(store) {
    if (!isAuthLoaded(store.getState())) {
      return store.dispatch(loadAuth());
    }
  }
}

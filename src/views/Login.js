import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {isLoaded as isAuthLoaded} from '../reducers/auth';
import * as authActions from '../actions/authActions';
import {load as loadAuth} from '../actions/authActions';
import {requireServerCss} from '../util';
import { RaisedButton, Styles, TextField } from 'material-ui';

const ThemeManager = new Styles.ThemeManager();

const styles = __CLIENT__ ? require('./Login.scss') : requireServerCss(require.resolve('./Login.scss'));

class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func
  }

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    const input = React.findDOMNode(this.refs.username).children[1];
    this.props.login(input.value);
    input.value = '';
  }

  render() {
    const {user, logout} = this.props;
    return (
      <div className={styles.loginPage + ' container'}>
        <h1>Login</h1>
        {!user &&
        <div>
          <form className="login-form" onSubmit={::this.handleSubmit}>
            <TextField
                ref="username"
                floatingLabelText="Username"
                multiLine={false}/>
            <br/>
            <TextField
                hintText="Password Field"
                floatingLabelText="Password"
                type="password"/>
            <br/>
            <RaisedButton label="login" onClick={::this.handleSubmit}
            />
          </form>
          <p>This will "log you in" as this user, storing the username in the session of the API server.</p>
        </div>
        }
        {user &&
        <div>
          <p>You are currently logged in as {user.name}.</p>
          <div>
            <button className="btn btn-danger" onClick={logout}><i className="fa fa-sign-out"/>{' '}Log Out</button>
          </div>
        </div>
        }
      </div>
    );
  }
}

Login.childContextTypes = {
  muiTheme: React.PropTypes.object
};

@connect(state => ({
  user: state.auth.user
}))
export default class LoginContainer extends Component {
  static propTypes = {
    user: PropTypes.object,
    dispatch: PropTypes.func.isRequired
  }

  static fetchData(store) {
    if (!isAuthLoaded(store.getState())) {
      return store.dispatch(loadAuth());
    }
  }

  render() {
    const { user, dispatch } = this.props;
    return <Login user={user} {...bindActionCreators(authActions, dispatch)}>
      {this.props.children}
    </Login>;
  }
}

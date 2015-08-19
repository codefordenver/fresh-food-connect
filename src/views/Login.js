import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {isLoaded as isAuthLoaded} from '../reducers/auth';
import * as authActions from '../actions/authActions';
import {load as loadAuth} from '../actions/authActions';
import {requireServerCss} from '../util';
import { RaisedButton, Styles, TextField, FlatButton } from 'material-ui';

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
    const email = React.findDOMNode(this.refs.email).children[1];
    const password = React.findDOMNode(this.refs.password).children[2];
    this.props.login(email.value, password.value);
    email.value = '';
    password.value = '';
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
            <Link to="signup"><FlatButton label="Create Account" secondary={true}/></Link>
          </form>
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
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

const SignUp = React.createClass({
  propTypes: {
    signup: PropTypes.func
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  getInitialState() {
    return {
      username: '',
      password: ''
    };
  },

  _updateInputState(key, event) {
    this.setState({
      [key]: event.target.value
    });
  },

  handleSubmit(event) {
    event.preventDefault();
    this.props.signup({
      email: this.state.username,
      password: this.state.password
    });
  },

  render() {
    return (
      <div className={styles.loginPage + ' container'}>
        <h1>Sign Up</h1>
        <div>
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
            <RaisedButton label="Sign Up" onClick={this.handleSubmit}/>
          </form>
        </div>
      </div>
    );
  }
});


@connect(() => ({}))
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
    const { dispatch } = this.props;
    return <SignUp {...bindActionCreators(authActions, dispatch)}>
      {this.props.children}
    </SignUp>;
  }
}

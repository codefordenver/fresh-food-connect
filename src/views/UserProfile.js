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

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      city: 'Denver',
      state: 'Co',
      zip: ''
    };
  }

  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func
  }

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
  }

  _updateInputState(key, event) {
    this.setState({
      [key]: event.target.value
    });
  }

  render() {
    const {user, logout} = this.props;
    return (
      <div className={styles.loginPage + ' container'}>
        <h1>Profile</h1>
        { user &&
        <div>
          <form className="login-form" onSubmit={::this.handleSubmit}>
            <TextField
                floatingLabelText="Address"
                value={this.state.address}
                multiLine={true}
                onChange={this._updateInputState.bind(this, 'address')} />
            <br />
            <TextField
                floatingLabelText="City"
                value={this.state.city}
                onChange={this._updateInputState.bind(this, 'city')} />
            <br />
            <TextField
                floatingLabelText="State"
                value={this.state.state}
                onChange={this._updateInputState.bind(this, 'state')}
                style={{width: '5rem'}}/>
            {' '}
            <TextField
                floatingLabelText="Zip"
                value={this.state.zip}
                onChange={this._updateInputState.bind(this, 'zip')}
                style={{width: '9rem'}} />
            <br />
            <br />
            <RaisedButton label="Save" onClick={::this.handleSubmit}/>
          </form>
        </div>
        }
        { !user &&
        <div>
          <p>You need to log in first.</p>
          <div>
            <RaisedButton
                label="Log in"
                linkButton={true}
                href="login" />
          </div>
        </div>
        }
      </div>
    );
  }
}

UserProfile.childContextTypes = {
  muiTheme: React.PropTypes.object
};

@connect(state => ({
  user: state.auth.user
}))
export default class UserProfileContainer extends Component {
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
    return <UserProfile user={user} {...bindActionCreators(authActions, dispatch)}>
      {this.props.children}
    </UserProfile>;
  }
}

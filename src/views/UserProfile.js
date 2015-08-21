import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {isLoaded as isAuthLoaded} from '../reducers/auth';
import * as authActions from '../actions/authActions';
import {load as loadAuth} from '../actions/authActions';
import { RaisedButton, Styles, TextField } from 'material-ui';

const ThemeManager = new Styles.ThemeManager();

@connect(
  state => ({user: state.auth.user}),
  dispatch => bindActionCreators(authActions, dispatch)
)
export default class UserProfile extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func
  }

  static childContextTypes = {
    muiTheme: React.PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
      address: '',
      city: 'Denver',
      state: 'Co',
      zip: ''
    };
  }

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }

  render() {
    const {user} = this.props;
    const styles = require('./Login.scss');

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

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
  }

  _updateInputState(key, event) {
    this.setState({
      [key]: event.target.value
    });
  }

  static fetchData(store) {
    if (!isAuthLoaded(store.getState())) {
      return store.dispatch(loadAuth());
    }
  }
}

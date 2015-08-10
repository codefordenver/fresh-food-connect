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
        <h1>UserProfile</h1>
        { user &&
        <div>
          <form className="login-form" onSubmit={::this.handleSubmit}>
            <TextField
                floatingLabelText="Address"
                multiLine={true} />
            <br />
            <TextField
                floatingLabelText="City"
                defaultValue="Denver" />
            <br />
            <TextField
                floatingLabelText="State"
                defaultValue="CO"
                style={{width: '5rem'}}/>
                {' '}
            <TextField
                floatingLabelText="Zip"
                defaultValue=""
                style={{width: '9rem'}} />
            <br />
            <br />
            <RaisedButton label="Save" onClick={::this.handleSubmit}/>
          </form>
          <p>This will "log you in" as this user, storing the username in the session of the API server.</p>
        </div>
        }
        { !user &&
        <div>
          <p>You need to login first.</p>
          <div>
            <button className="btn btn-danger" onClick={logout}><i className="fa fa-sign-out"/>{' '}Log Out</button>
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

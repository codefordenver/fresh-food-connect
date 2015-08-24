import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {isLoaded as isAuthLoaded} from '../reducers/auth';
import * as authActions from '../actions/authActions';
import {load as loadAuth} from '../actions/authActions';
import DocumentMeta from 'react-document-meta';
import {
  Card,
  FlatButton,
  RaisedButton,
  Styles,
  TextField
} from 'material-ui';

const ThemeManager = new Styles.ThemeManager();

@connect(
  () => ({}),
  dispatch => bindActionCreators(authActions, dispatch)
)
export default class SignUp extends Component {
  static propTypes = {
    signup: PropTypes.func
  }

  static childContextTypes = {
    muiTheme: React.PropTypes.object
  }

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };
  }

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }

  render() {
    const styles = require('./Login.scss');

    return (
      <div className={styles.loginPage + ' container'}>
        <DocumentMeta title="Fresh Food Connect | Sign Up"/>

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
      </div>
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.signup({
      email: this.state.username,
      password: this.state.password
    });
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

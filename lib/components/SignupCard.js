import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {
  Card,
  FlatButton,
  RaisedButton,
  Snackbar,
  TextField
} from 'material-ui';

import signupValidation from '../validation/signupValidation';

export default class SignupCard extends Component {
  static propTypes = {
    children: PropTypes.node,
    signup: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordError: ''
    };
  }

  render() {
    return (
      <div>
        <Card style={{margin: '26px 20px',
                      padding: '20px'}}>

          {this.props.children}

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
                errorText={this.state.passwordError}
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
            message="Requires: a valid email and password with 8 or more characters."
            autoHideDuration={3000}
            className="snackbar"/>
      </div>
    );
  }

  _updateInputState(key, event) {
    this.setState({
      [key]: event.target.value
    });
    if (key === 'password') {
      this.setState({
        'passwordError': (event.target.value.length < 8) ? 'Password must be at least 8 characters.' : ''
      });
    }
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

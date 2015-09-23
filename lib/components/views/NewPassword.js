import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  Card,
  RaisedButton,
  TextField
} from 'material-ui';

import * as authActions from '../../actions/authActions';
import {validateNewPassword} from '../../validation/passwordReset';
import {getQueryVariable} from '../../utils/urlUtils';

@connect(
  () => ({}),
  dispatch => bindActionCreators(authActions, dispatch)
)
export default class NewPassword extends Component {
  static propTypes = {
    params: PropTypes.object,
    setNewPassword: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      password: '',
      validation: {}
    };
  }

  render() {
    return (
      <Card style={{margin: '76px 20px',
                    padding: '0 20px'}}>
        <h1>Set a new password</h1>

        <form onSubmit={this.handleSubmit}>
          <TextField
              floatingLabelText="Password"
              hintText="Password Field"
              type="password"
              value={this.state.password}
              errorText={this.state.validation.password}
              onChange={this._updateInputState.bind(this, 'password')}/>
          <br/>
          <RaisedButton label="Set Password" onClick={this.handleSubmit.bind(this)}/>
        </form>
      </Card>
    );
  }

  _updateInputState(key, event) {
    this.setState({
      [key]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const {password} = this.state;
    const validation = validateNewPassword({ password });
    const resetToken = getQueryVariable('reset_password_token');

    this.setState({
      validation
    });
    if (validation.valid && resetToken) {
      this.props.setNewPassword(this.state.password, resetToken);
    }
  }
}

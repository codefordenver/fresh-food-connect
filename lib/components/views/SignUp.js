import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as authActions from '../../actions/authActions';

import {
  Card,
  RaisedButton,
  TextField,
  Snackbar
} from 'material-ui';


@connect(
  state => ({user: state.auth.user}),
  dispatch => bindActionCreators(authActions, dispatch)
)
export default class SignUp extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func,
  };

  render() {
    const styles = require('./Login.scss');

    return (
      <div className={styles.loginPage + ' container'}>
        <Snackbar
          ref="snackbarError"
          message="Sorry, we're not accepting pickups in your area yet."
          autoHideDuration={2000}/>

        <Card style={{margin: '76px 20px',
                      padding: '0 20px'}}>

          <h2>I'd Like to Donate</h2>
          <p>Are we in your neighborhood yes?</p>
          <div>
            <form onSubmit={::this.handleSubmit}>
              <TextField
                floatingLabelText="What's your zip?"
                multiLine={false}
                ref="zip"/>
              <RaisedButton label="Check" onClick={::this.handleSubmit}/>
            </form>
          </div>
        </Card>
      </div>
    );
  }

  handleSubmit(event) {
    event.preventDefault();

    const zipField = React.findDOMNode(this.refs.zip).children[1];
    let zip = zipField.value;

    if (!zip) {
      this.refs.snackbarError.show();
    }
  }
}

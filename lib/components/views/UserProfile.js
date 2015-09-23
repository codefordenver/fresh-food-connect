import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {login} from '../../actions/authActions';
import {getLocation, updateLocation} from '../../actions/locationActions';
import {
  Card,
  Checkbox,
  RaisedButton,
  TextField,
  TimePicker
} from 'material-ui';

import LocationCard from '../LocationCard';

@connect(
  state => ({
    user: state.auth.user,
    apiLocation: state.location.location,
    locationRecieved: state.location.recieved
  }),
  dispatch => bindActionCreators({getLocation, login, updateLocation}, dispatch)
)
export default class UserProfile extends Component {
  static propTypes = {
    apiLocation: PropTypes.object,
    getLocation: PropTypes.func.isRequired,
    locationRecieved: PropTypes.bool,
    login: PropTypes.func.isRequired,
    updateLocation: PropTypes.func.isRequired,
    user: PropTypes.object
  }

  componentWillMount() {
    this._checkAndLoadLocation(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this._checkAndLoadLocation(nextProps);
  }

  _checkAndLoadLocation(props) {
    const {user, locationRecieved} = props;
    if (user && !locationRecieved) {
      props.getLocation(props.user.id);
    }
  }

  render() {
    const {user} = this.props;
    const styles = require('./Login.scss');

    return (
      <div className={styles.loginPage}>
        { user &&
        <div>
          <h1 className="pageTitle text-center">
            Profile
          </h1>

          <LocationCard
              userId={user.id}
              saveLocation={this.props.updateLocation}
              apiLocation={this.props.apiLocation}/>

          <Card style={{margin: '20px',
                        padding: '0 20px'}}>
            <h2>
              Pickup Time
            </h2>
            <span>
              Your pickup time is:
              <div style={{display: 'inline-block', padding: '0 5px'}}>
                <TimePicker ref="timeSelector"
                    defaultTime={new Date('Tues Aug 25 3:00:00 pm')}
                    format="ampm"
                    hintText="12hr Format"
                    pedantic={true}
                    onChange={::this._handleTimeChange}
                    style={{width: '5rem'}}/>
              </div>
              <em>Tuesday</em>
            </span>
          </Card>

          <Card style={{margin: '20px',
                        padding: '0 20px'}}>
            <h2>
              Pickup Notes
            </h2>

            <Checkbox
                name="dog"
                value="dog"
                label="I have a dog"/>


            <TextField
                floatingLabelText="Additional Notes"
                defaultValue={"\n\n\n"}
                multiLine={true} />
          </Card>
        </div>
        }

        { !user &&
        <Card style={{margin: '76px 20px',
                        padding: '0 20px'}}>
          <p>You need to log in first.</p>
          <div>
            <RaisedButton
                label="Log in"
                linkButton={true}
                href="login" />
          </div>
        </Card>
        }
      </div>
    );
  }

  _handleTimeChange(err, t) {
    this.refs.timeSelector.setTime(t);
  }
}

import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {login} from '../../actions/authActions';
import {getLocation, updateLocation} from '../../actions/locationActions';
import {
  Card,
  RaisedButton
} from 'material-ui';

import LocationCard from '../LocationCard';
import PickupInfoCard from '../PickupInfoCard';

import {PICKUP_TIME} from '../../constants';


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
    const pickupDay = PICKUP_TIME;

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

          <PickupInfoCard pickupDay={pickupDay} />

          {/* can add this back when we actually persist and use the data
          <Card style={{margin: '20px',
                        padding: '20px'}}>
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
          </Card>*/}
        </div>
        }

        { !user &&
        <Card style={{margin: '76px 20px',
                        padding: '20px'}}>
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
}

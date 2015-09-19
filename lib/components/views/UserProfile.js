import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as authActions from '../../actions/authActions';
import {
  Card,
  Checkbox,
  RaisedButton,
  TextField,
  TimePicker
} from 'material-ui';
import {GoogleMap, Marker} from 'react-google-maps';

import {geoCode} from '../../utils/mapUtils';

@connect(
  state => ({user: state.auth.user}),
  dispatch => bindActionCreators(authActions, dispatch)
)
export default class UserProfile extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func
  };

  static childContextTypes = {
    muiTheme: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      address: '',
      city: 'Denver',
      state: 'Co',
      zip: '',

      addressGeo: null
    };
  }

  render() {
    const {user} = this.props;
    const styles = require('./Login.scss');

    return (
      <div className={styles.loginPage}>
        { user &&
        <div>
          <h1>
            Profile
          </h1>

          <Card style={{margin: '20px',
                        padding: '0 20px'}}>
            <h2>
              Address
            </h2>

            <form className="login-form"
                style={{float: 'left'}}
                onSubmit={::this.handleSubmit}>
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

            { this.state.addressGeo ? this._getMiniMap(this.state.addressGeo) : null}
          </Card>

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

  _getMiniMap(addressGeo) {
    const {location} = addressGeo.geometry;
    const mapProps = {
      containerProps: {
        style: {
          height: '300px',
          width: 'calc(100% - 300px)',
          float: 'right'
        }
      },
      ref: 'map',
      defaultZoom: 16,
      center: location
    };

    return (
      <GoogleMap {...mapProps}>
        <Marker position={location} />
      </GoogleMap>
    );
  }

  _handleTimeChange(err, t) {
    this.refs.timeSelector.setTime(t);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);

    const {address, city, state, zip} = this.state;
    const fullAddress = `${address} ${city} ${state} ${zip}`;

    geoCode(fullAddress, (results) => {
      this.setState({
        addressGeo: results[0]
      });
      console.log('results', results);
    });
  }

  _updateInputState(key, event) {
    this.setState({
      [key]: event.target.value
    });
  }
}

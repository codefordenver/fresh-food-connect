import React, {Component, PropTypes} from 'react';
import {
  Card,
  RaisedButton,
  TextField
} from 'material-ui';
import {GoogleMap, Marker} from 'react-google-maps';

import {geoCode} from '../utils/mapUtils';

export default class LocationCard extends Component {
  static propTypes = {
    apiLocation: PropTypes.object,
    saveLocation: PropTypes.func.isRequired,
    userId: PropTypes.number
  }

  constructor(props) {
    super(props);
    this.state = {
      location: null
    };
  }

  getAddressValue(key) {
    return key in this.state ? this.state[key] : (this.props.apiLocation && this.props.apiLocation[key]);
  }

  render() {
    const loc = this._getLocationFromPropsOrState.call(this);

    return (
      <Card style={{margin: '20px',
                    padding: '20px'}}>
        <h2>
          Address
        </h2>

        <form
            style={{float: 'left'}}
            onSubmit={::this.handleSubmit}>
          <TextField
              floatingLabelText="Address"
              value={this.getAddressValue.call(this, 'address')}
              multiLine={true}
              onChange={this._updateInputState.bind(this, 'address')} />
          <br />
          <TextField
              floatingLabelText="City"
              value={this.getAddressValue.call(this, 'city')}
              onChange={this._updateInputState.bind(this, 'city')} />
          <br />
          <TextField
              floatingLabelText="State"
              value={this.getAddressValue.call(this, 'state')}
              onChange={this._updateInputState.bind(this, 'state')}
              style={{width: '5rem'}}/>
          {' '}
          <TextField
              floatingLabelText="Zip"
              value={this.getAddressValue.call(this, 'zipcode')}
              onChange={this._updateInputState.bind(this, 'zipcode')}
              style={{width: '9rem'}} />
          <br />
          <br />
          <RaisedButton label="Save" onClick={::this.handleSubmit}/>
        </form>

        { loc ? this._getMiniMap(loc) : null}
      </Card>
    );
  }

  _getLocationFromPropsOrState() {
    const {apiLocation} = this.props;

    if (this.state.location) {
      return this.state.location;
    }
    else if (apiLocation && apiLocation.latitude && apiLocation.longitude) {
      return {
        lat: apiLocation.latitude,
        lng: apiLocation.longitude
      };
    }
  }

  _updateInputState(key, event) {
    this.setState({
      [key]: event.target.value
    });
  }

  _getMiniMap(location) {
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

  handleSubmit(event) {
    event.preventDefault();

    const {address, city, state, zipcode} = this.state;
    const fullAddress = ['address', 'city', 'state', 'zipcode']
                          .map(key => this.getAddressValue.call(this, key))
                          .join(' ');

    geoCode(fullAddress, (results) => {
      const {location} = results[0].geometry;

      this.setState({
        location
      });
      const latitude = location.lat();
      const longitude = location.lng();

      const locationDetails = {
        address,
        city,
        state,
        zipcode,

        latitude,
        longitude
      };

      const locId = this.props.apiLocation && this.props.apiLocation.id;

      this.props.saveLocation(locationDetails, this.props.userId, locId);
    });
  }
}

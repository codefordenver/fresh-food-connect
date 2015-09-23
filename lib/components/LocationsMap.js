import React, {Component, PropTypes} from 'react';

import {GoogleMap, Marker} from 'react-google-maps';

export default class LocationsMap extends Component {
  static propTypes = {
    defaultZoom: PropTypes.number.isRequired,
    defaultCenter: PropTypes.object.isRequired,
    locations: PropTypes.array
  }

  render () {
    const mapProps = {
      containerProps: {
        style: {
          height: '90vh'
        }
      },
      ref: 'map',
      defaultZoom: this.props.defaultZoom,
      defaultCenter: this.props.defaultCenter
    };

    return (
      <GoogleMap {...mapProps}>
        {this.props.locations.map(this._getMarker)}
      </GoogleMap>
    );
  }

  _getMarker(location, key) {
    let position;
    if (location.latitude && location.longitude) {
      position = {
        lat: location.latitude,
        lng: location.longitude
      };
    }

    const markerProps = {
      position,
      key,
      defaultAnimation: 2
    };

    return <Marker {...markerProps} />;
  }
}

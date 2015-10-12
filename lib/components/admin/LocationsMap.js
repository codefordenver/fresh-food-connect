import React, {Component, PropTypes} from 'react';
import {
  GoogleMap,
  InfoWindow,
  Marker
} from 'react-google-maps';

import DataTable from './DataTable';
const greenPinIcon = require('assets/images/green-pin-small.png');

export default class LocationsMap extends Component {
  static propTypes = {
    defaultZoom: PropTypes.number.isRequired,
    defaultCenter: PropTypes.object.isRequired,
    locations: PropTypes.array
  }

  constructor(props) {
    super(props);

    this.state = {
      visibleMarkerInfoId: null
    };
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
        {this.props.locations.map(this._getMarker, this)}
      </GoogleMap>
    );
  }

  _getMarker(location) {
    if (!location.latitude && !location.longitude) {
      return null;
    }

    const markerProps = {
      position: {
        lat: location.latitude,
        lng: location.longitude
      },
      key: `marker_${location.id}`,
      defaultAnimation: 2
    };

    if (location.donation) {
      markerProps.icon = greenPinIcon;
    }

    return (
      <Marker {...markerProps} onClick={this._showInfoWindow.bind(this, location.id)}>
        { this.state.visibleMarkerInfoId === location.id ? this._getInfoWindow.call(this, location) : null }
      </Marker>
    );
  }


  _showInfoWindow(id) {
    this.setState({
      visibleMarkerInfoId: id
    });
  }

  _hideInfoWindow() {
    this.setState({
      visibleMarkerInfoId: null
    });
  }

  _getInfoWindow(location) {
    const locationDataArray = Object.keys(location).map(key => ({id: key, value: location[key]}));
    return (
      <InfoWindow key={`infoWindow_${location.id}`} onCloseclick={this._hideInfoWindow.bind(this)}>
        <DataTable data={locationDataArray} />
      </InfoWindow>
    );
  }
}

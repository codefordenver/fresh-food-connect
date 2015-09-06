import React, {addons, Component} from 'react/addons';

import {GoogleMap, Marker} from 'react-google-maps';

const {update} = addons;

/*
 * This is the modify version of:
 * https://developers.google.com/maps/documentation/javascript/examples/event-arguments
 *
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
export default class LocationsMap extends Component {
  static propTypes = {
    defaultZoom: React.PropTypes.number.isRequired,
    defaultCenter: React.PropTypes.object.isRequired
  }

  state = {
    markers: [{
      position: {
        lat: 39.7392,
        lng: -104.9903
      },
      key: 'Denver',
      defaultAnimation: 2
    }],
  }

  /*
   * This is called when you click on the map.
   * Go and try click now.
   */
  addMarker = (event) => {
    let {markers} = this.state;
    markers = update(markers, {
      $push: [
        {
          position: event.latLng,
          defaultAnimation: 2,
          key: Date.now(),// Add a key property for: http://fb.me/react-warning-keys
        },
      ],
    });
    this.setState({ markers });
  }

  removeMarker(index) {
    /*
     * All you modify is data, and the view is driven by data.
     * This is so called data-driven-development. (And yes, it's now in
     * web front end and even with google maps API.)
     */
    let {markers} = this.state;
    markers = update(markers, {
      $splice: [
        [index, 1]
      ],
    });
    this.setState({ markers });
  }

  render () {
    const mapProps = {
      containerProps: {
        style: {
          height: '100vh'
        }
      },
      ref: 'map',
      defaultZoom: this.props.defaultZoom,
      defaultCenter: this.props.defaultCenter,
      onClick: this.addMarker
    };

    return (
      <GoogleMap {...mapProps}>
        {this.state.markers.map((marker, index) => (
          <Marker
              {...marker}
              onRightclick={this.removeMarker.bind(this, index)} />
        ))}
      </GoogleMap>
    );
  }
}

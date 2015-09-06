import React from 'react';
import LocationsMap from '../LocationsMap';

export default class Admin extends React.Component {
  render() {
    return (
      <LocationsMap defaultCenter={{lat: 39.7392, lng: -104.9903}} defaultZoom={15}/>
    );
  }
}

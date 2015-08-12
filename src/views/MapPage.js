import React from 'react';

var map;
var markers = {};
var infoWindows = {};

// function getCurrentPosition(cb) {
//   function errHandler(error) {
//     var errors = {
//         1: 'Authorization fails', // permission denied
//         2: 'Can\'t detect your location', //position unavailable
//         3: 'Connection timeout' // timeout
//     };
//     cb(errors[error.code]);
//   }
//   function successHandler(position) {
//     cb(null, {
//       lat: position.coords.latitude,
//       lng: position.coords.longitude,
//       acr: position.coords.accuracy
//     });
//   }

//   if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(successHandler, errHandler, { enableHighAccuracy: true });
//   } else {
//       // handle no geolocation
//       cb('geolocation not supported');
//   }
// }

function setMarker(data) {
  var markerPos = new google.maps.LatLng(data.loc.lat, data.loc.lng);

  var markerId = data.id.toString();

  if (markers[markerId]) {
    markers[markerId].setPosition(markerPos);
  }
  else {
    markers[markerId] = new google.maps.Marker({
      position: new google.maps.LatLng(data.loc.lat, data.loc.lng),
      map: map,
      title: markerId,
      icon: 'img/transportation-pin.png'
    });

    infoWindows[markerId] = new google.maps.InfoWindow({
      content: markerId
    });

    google.maps.event.addListener(markers[markerId], 'click', () => {
      infoWindows[markerId].open(map, markers[markerId]);
    });
  }
}

// function checkStatus(response) {
//   if (response.status >= 200 && response.status < 300) {
//     return response
//   } else {
//     var error = new Error(response.statusText)
//     error.response = response
//     throw error
//   }
// }


class MapPage extends React.Component {

  componentDidMount() {
    var mapOptions = {
      center: { lat: 39.7427784, lng: -104.9829768},
      zoom: 8
    };
    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    // fetch('api/locations')
    //   .then(checkStatus)
    //   .then((res) => {
    //     return res.json()
    //   }).then((locations) => {
    //     locations.forEach(setMarker);
    //   }).catch((ex) => {
    //     // handle exception
    //   });
  }

  render() {
    return (
      <div>
        <div id="map" style={{height: '100%'}}>
        </div>
      </div>
    );
  }

  _shareLocation() {
    getCurrentPosition((err, loc) => {
      if (err) {
        // handle error
        return;
      }

      fetch('api/locations', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'loc': [loc.lat, loc.lng].join(',')
        })
      });
    });
  }
}

export default MapPage;

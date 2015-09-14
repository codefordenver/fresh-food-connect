let geocoder;

export function geoCode(addr, cb) {
  if (!geocoder) {
    geocoder = new window.google.maps.Geocoder();
  }
  geocoder.geocode({address: addr}, cb);
}

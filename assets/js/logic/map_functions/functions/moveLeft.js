function moveLeft() {
  // Get the current bounds of the map
  const bounds = map.getBounds();

  // Extract the southwest and northeast corners
  const minLongitude = bounds._southWest.lng;
  const maxLongitude = bounds._northEast.lng;

  // Calculate the absolute longitude range
  const longitudeRange = Math.abs(maxLongitude - minLongitude);

  // Get the current center of the map
  const currentCenter = map.getCenter();

  // Calculate the new longitude by shifting half the longitude range to the left
  const newLongitude = currentCenter.lng - longitudeRange / 4;

  // Create a new LatLng object with the updated longitude and the current latitude
  const newCenter = L.latLng(currentCenter.lat, newLongitude);

  // Set the new view to move the map to the left
  map.setView(newCenter, map.getZoom());
}

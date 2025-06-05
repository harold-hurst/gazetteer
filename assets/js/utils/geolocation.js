

function getCurrentLocation(successCallback, errorCallback) {
  if ("geolocation" in navigator) {
    // Get the current position
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {
      enableHighAccuracy: true, // Use high accuracy if available
      timeout: 10000, // Timeout after 10 seconds
      maximumAge: 0, // Don't use cached position
    });
  } else {
    errorCallback("Geolocation is not supported by this browser.");
  }
}

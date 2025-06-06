// function getCurrentLocation(successCallback, errorCallback) {
function getCurrentLocation() {

  return new Promise((resolve, reject) => {
    // Check if geolocation is supported by the browser
    if (navigator.geolocation) {
      // Attempt to get the current position
      navigator.geolocation.getCurrentPosition(
        function (position) {
          // Resolve the Promise with the location (latitude and longitude)
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          resolve(location);
        },
        function (error) {
          // Reject the Promise with the error message
          reject(error.message);
        },
        {
          enableHighAccuracy: true, // Request high accuracy
          timeout: 10000, // Set a timeout of 10 seconds
          maximumAge: 0, // Do not use cached location
        }
      );
    } else {
      // Geolocation is not supported
      reject("Geolocation is not supported by this browser.");
    }
  });
}

//   if ("geolocation" in navigator) {
//     // Get the current position
//     navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {
//       enableHighAccuracy: true, // Use high accuracy if available
//       timeout: 10000, // Timeout after 10 seconds
//       maximumAge: 0, // Don't use cached position
//     });
//   } else {
//     errorCallback("Geolocation is not supported by this browser.");
//   }

// }

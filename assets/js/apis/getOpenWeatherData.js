// return country info from coords
function getOpenWeatherData(capitalLocation) {


  // take country code name and country code - get coords of capital city. Pass location object into ajax call.
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "libs/php/api-connections/openweathermap-data.php",
      method: "GET",
      dataType: "json",
      data: capitalLocation,
      success: function (data) {
        resolve(data);
      },
      error: function (xhr, status, error) {
        reject(error);

        console.error("AJAX request failed:", error);
      },
    });
  });
}

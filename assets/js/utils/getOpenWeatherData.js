// return country info from coords
function getOpenWeatherData(city, countryCode) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "libs/php/api-connections/openweathermap-data.php",
      method: "GET",
      dataType: "json",
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

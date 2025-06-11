// return country info from coords
function getOpenWeatherData(capitalLocation) {
return new Promise((resolve, reject) => {
    $.ajax({
      url: "php/api-connections/openweathermap-data.php",
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

// return country info from coords
function getPixabayData(countryName) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "libs/php/api-connections/pixabay-image-data-request.php",
      method: "GET",
      dataType: "json",
      data: { countryName: countryName },
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

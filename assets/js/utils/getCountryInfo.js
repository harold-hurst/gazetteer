// return country info from coords
function getCountryInfo(location) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "libs/php/openCageApi.php",
      type: "POST",
      dataType: "json",
      data: location,
      success: function (result, status, xhr) {
        resolve(result);
      },
      error: function (xhr, status, error) {
        reject(error);
      },
    });
  });
}

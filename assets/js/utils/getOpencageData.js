// return country info from coords
function getOpencageData(location) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "libs/php/api-connections/opencage-geocode-request.php",
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

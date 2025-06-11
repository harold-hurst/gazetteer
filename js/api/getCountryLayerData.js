// return country info from coords
function getCountrylayerData(code) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "php/api-connections/countrylayer-data-request.php",
      type: "GET",
      data: { code: code },
      dataType: "json",
      success: function (response) {
        resolve(response);
      },
      error: function (xhr, status, error) {
        console.error("AJAX error:", status, error);
        reject(error);
      },
    });
  });
}

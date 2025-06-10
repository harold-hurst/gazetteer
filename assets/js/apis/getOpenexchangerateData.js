// return country info from coords
function getExchangeRateData(currency) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "libs/php/api-connections/openexchagerates-data-request.php",
      type: "GET",
      data: { currency: currency },
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

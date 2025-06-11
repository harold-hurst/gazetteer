function getNewsApiData(countryCode) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "libs/php/api-connections/newsapi-request.php",
      method: "GET",
      dataType: "json",
      data: {
        countryCode: countryCode
      },
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

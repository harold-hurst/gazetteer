function getNewsApiData(countryCode) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "php/api-connections/newsapi-request.php",
      method: "GET",
      dataType: "json",
      data: {
        countryCode: countryCode.toLowerCase(),
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

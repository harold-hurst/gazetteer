$(window).on("load", function () {
  if ($("#preloader").length) {
    $("#preloader")
      .delay(1000)
      .fadeOut("slow", function () {
        $(this).remove();
      });
  }
});

$(document).ready(function () {
  $.ajax({
    url: "libs/php/getCountryNames.php", // PHP file that returns JSON
    method: "GET", // or 'POST' if needed
    dataType: "json", // Expect JSON response
    success: function (countryMap) {
      console.log(JSON.stringify(countryMap));

      $.each(countryMap, function (countryName, isoCode) {
        $("#countrySelect").append(
          $("<option></option>").val(isoCode).text(countryName)
        );
      });

    },
    error: function (xhr, status, error) {
      console.error("AJAX error:", error);
    },
  });
});

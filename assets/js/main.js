$(window).on("load", function () {
  if ($("#preloader").length) {
    $("#preloader")
      .delay(500)
      .fadeOut("slow", function () {
        $(this).remove();
      });
  }
});

$.ajax({
  url: "libs/php/getCountryNames.php", // PHP file that returns JSON
  method: "GET", // or 'POST' if needed
  dataType: "json", // Expect JSON response
  success: function (countryMap) {

    // Function to reorder keys alphabetically
const orderedCountryCodes = Object.keys(countryMap)  // Get all the keys
  .sort()  // Sort them alphabetically
  .reduce((acc, key) => {
    acc[key] = countryMap[key];  // Rebuild the object with sorted keys
    return acc;
  }, {});
  
    // console.log(JSON.stringify(countryMap));

    $.each(orderedCountryCodes, function (countryName, isoCode) {
      $("#countrySelect").append(
        $("<option></option>").val(isoCode).text(countryName)
      );
    });
  },
  error: function (xhr, status, error) {
    console.error("AJAX error:", error);
  },
});

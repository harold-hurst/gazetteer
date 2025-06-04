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

$("#countrySelect").on("change", function () {
  const selectedValue = $(this).val(); // e.g., "HN"
  // const selectedText = $(this).find('option:selected').text();  // e.g., "Honduras"

  $.ajax({
    url: "libs/php/getBorders.php",
    method: "GET",
    dataType: "json",
    data: {
      isoCode: selectedValue,
    },
    success: function (result) {
      console.log(JSON.stringify(result));
    },
    error: function (xhr, status, error) {
      console.error("AJAX error:", error);
    },
  });

  console.log("ISO Code:", selectedValue);
  // console.log("Country Name:", selectedText);
});

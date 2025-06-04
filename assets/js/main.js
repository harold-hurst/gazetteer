$(window).on("load", function () {
  if ($("#preloader").length) {
    $("#preloader")
      .delay(1000)
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

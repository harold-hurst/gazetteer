$.ajax({
  url: "libs/php/getCountryNames.php", // PHP file that returns JSON
  method: "GET", // or 'POST' if needed
  dataType: "json", // Expect JSON response
  success: function (countryMap) {
    // Function to reorder keys alphabetically
    const orderedCountryCodes = Object.keys(countryMap) // Get all the keys
      .sort() // Sort them alphabetically
      .reduce((acc, key) => {
        acc[key] = countryMap[key]; // Rebuild the object with sorted keys
        return acc;
      }, {});

    // populate <select> with values from orderedCountryCodes
    $.each(orderedCountryCodes, function (countryName, isoCode) {
      $("#countrySelect").append(
        $("<option></option>").val(isoCode).text(countryName)
      );
    });

    // set to current country
    

    // get current location
    // success callback
    function success(position) {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      $.ajax({
        url: "libs/php/openCageApi.php",
        type: "POST",
        dataType: "json",
        data: {
          lat: lat,
          lng: lng,
        },
        success: function (result, status, xhr) {
          const isoCode =
            result.data.results[0].components["ISO_3166-1_alpha-2"];
            console.log(result);
            $("#countrySelect").val(isoCode).trigger("change");

  
        },
        error: function (xhr, status, error) {
          console.error("AJAX Error:", error);
        },
      });
    }

    // error callback
    function error(err) {
      console.warn(`ERROR: ${err}`);
    }

    getCurrentLocation(success, error);
  },
  error: function (xhr, status, error) {
    console.error("AJAX error:", error);
  },
});

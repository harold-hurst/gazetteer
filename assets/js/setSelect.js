// set the value of the select element to the current country
getCurrentLocation()
  .then((location) => {

    getCountryInfo(location)
      .then((data) => {
        const isoCode = data.data.results[0].components["ISO_3166-1_alpha-2"];
        $("#countrySelect").val(isoCode).trigger("change");
      })
      .catch(function (error) {
        console.log(error); // Handle the error if it happens
      });
  })
  .catch((errorMessage) => {
    console.error("Error: " + errorMessage);
  });
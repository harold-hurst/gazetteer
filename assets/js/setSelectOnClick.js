function onMapClick(e) {
  const location = { lat: e.latlng.lat, lng: e.latlng.lng };

  getCountryInfo(location)
    .then((data) => {
      const isoCode = data.data.results[0].components["ISO_3166-1_alpha-2"];
      $("#countrySelect").val(isoCode).trigger("change");
    })
    .catch(function (error) {
      console.log(error); // Handle the error if it happens
    });
}

map.on("click", onMapClick);

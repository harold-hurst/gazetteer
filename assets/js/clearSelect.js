$("#clearSelect").on("click", function () {
  $("#countrySelect").val('');
  map.removeLayer(geoJsonLayer);
});

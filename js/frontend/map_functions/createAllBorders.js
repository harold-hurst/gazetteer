function createAllBorders(array) {
  allCountriesGeoJsonLayer = L.geoJSON(array, {
    style: {
      color: "#1c1c1c",
      fillColor: "",
      fillOpacity: 0.1,
      dashArray: "5",
      weight: 2,
      opacity: 0.8,
    },
    onEachFeature: function (feature, layer) {
      layer.bindPopup("Country: " + feature.properties.name);

      layer.on({
        mouseover: function () {
          // On mouseover, change the style
          layer.setStyle({
            fillOpacity: 0, // Increase opacity on hover
          });
        },
        mouseout: function () {
          // On mouseout, reset the style to initial
          allCountriesGeoJsonLayer.resetStyle(layer); // Use the initial style
        },
        click: function () {
          // Handle the click event
          $("#countrySelect").val(feature.properties.iso_a2).trigger("change");
        },
      });
    },
  }).addTo(map);
}

$.ajax({
  url: "php/utils/getBorderData.php", // PHP file that returns JSON
  method: "GET", // or 'POST' if needed
  dataType: "json", // Expect JSON response

  success: function (borderData) {
    createAllBorders(borderData.features);
  },

  error: function (xhr, status, error) {
    console.error("AJAX error:", error);
  },
});

$("#countrySelect").on("change", function () {
  // extract value from the <select> element - iso code or empty string
  selectedCode = this.value;

  if (allCountriesGeoJsonLayer) {
    map.removeLayer(allCountriesGeoJsonLayer);
  }

  $.ajax({
    url: "php/utils/getBorderData.php",
    method: "GET",
    dataType: "json",
    success: function (data) {

      const filtered = data.features.filter(
        (feature) => feature.properties.iso_a2 !== selectedCode
      );

      createAllBorders(filtered);
    },
    error: function (xhr, status, error) {
      console.error("Error loading GeoJSON:", error);
    },
  });
});

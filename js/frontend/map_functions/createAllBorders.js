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

fetch("data/countryBorders.geo.json")
  .then((res) => res.json())
  .then((data) => {
    createAllBorders(data.features);
  });

$("#countrySelect").on("change", function () {
  // extract value from the <select> element - iso code or empty string
  selectedCode = this.value;

  if (allCountriesGeoJsonLayer) {
    map.removeLayer(allCountriesGeoJsonLayer);
  }

  fetch("data/countryBorders.geo.json")
    .then((res) => res.json())
    .then((data) => {
      // create filtered array of all countries excluding currently selected one
      const filtered = data.features.filter(
        (feature) => feature.properties.iso_a2 !== this.value
      );

      // asign the new filtered array to the layer
      createAllBorders(filtered);
    });
});

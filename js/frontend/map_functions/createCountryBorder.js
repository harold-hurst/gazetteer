// initialise variable for layer
let currentCountryGeoJsonLayer = null;

// event handler on the country select dropdown element
$("#countrySelect").on("change", function () {
  // extract value from the <select> element
  selectedCode = this.value;

  // Clear old layer if exists
  if (currentCountryGeoJsonLayer) {
    map.removeLayer(currentCountryGeoJsonLayer);
  }

  if (selectedCode.length !== 0) {
    fetch("data/countryBorders.geo.json")
      .then((res) => res.json())
      .then((data) => {
        // Filter features by selected country code
        const filtered = data.features.filter(
          (feature) => feature.properties.iso_a2 === selectedCode
        );

        // create a Feature Collection
        const geoJson = {
          type: "FeatureCollection",
          features: filtered,
        };

        // add layer
        currentCountryGeoJsonLayer = L.geoJSON(geoJson, {
          style: {
            color: "#80d643",
            opacity: 0.5,
            fillColor: "#80d643",
            fillOpacity: 0.3,
          },
          onEachFeature: function (feature, layer) {
            layer.bindPopup("Country: " + feature.properties.name);

            layer.on({
              mouseover: function () {
                // On mouseover, change the style
                layer.setStyle({
                  fillOpacity: 0.5, // Increase opacity on hover
                });
              },
              mouseout: function () {
                // On mouseout, reset the style to initial
                currentCountryGeoJsonLayer.resetStyle(layer); // Use the initial style
              },
            });
          },
        }).addTo(map);

        // Zoom to the selected country
        map.fitBounds(currentCountryGeoJsonLayer.getBounds());
      });
  }
});

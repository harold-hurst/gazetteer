// initialise variable for layer
let currentCountryGeoJsonLayer;

// event handler on the country select dropdown element
$("#countrySelect").on("change", function () {
  // extract value from the <select> element
  selectedCode = this.value;

  // Clear old layer if exists
  if (currentCountryGeoJsonLayer) {
    map.removeLayer(currentCountryGeoJsonLayer);
  }

  if (selectedCode.length !== 0) {
    $.ajax({
      url: "php/utils/getBorderData.php",
      method: "GET",
      dataType: "json",
      success: function (data) {
        // Filter features by selected country code
        const filtered = data.features.filter(
          (feature) => feature.properties.iso_a2 === selectedCode
        );

        // Create a FeatureCollection
        const geoJson = {
          type: "FeatureCollection",
          features: filtered,
        };

        // Add layer to the map
        currentCountryGeoJsonLayer = L.geoJSON(geoJson, {
          style: {
            color: "#80d643",
            opacity: 0.5,
            fillColor: "#80d643",
            fillOpacity: 0.2,
          },
          onEachFeature: function (feature, layer) {
            layer.bindPopup("Country: " + feature.properties.name);

            layer.on({
              mouseover: function () {
                layer.setStyle({
                  fillOpacity: 0.4,
                });
              },
              mouseout: function () {
                currentCountryGeoJsonLayer.resetStyle(layer);
              },
            });
          },
        }).addTo(map);

        // Zoom to the selected country
        map.fitBounds(currentCountryGeoJsonLayer.getBounds());
      },
      error: function (xhr, status, error) {
        console.error("Error loading GeoJSON:", error);
      },
    });
  }
});

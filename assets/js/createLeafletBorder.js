// event handler on the country select dropdown element
$("#countrySelect").on("change", function () {
  // extract value from the <select> element
  const selectedCode = this.value;

  if (!selectedCode) return;

  fetch("data/countryBorders.geo.json")
    .then((res) => res.json())
    .then((data) => {
      // Filter features by selected country code
      const filtered = data.features.filter(
        (feature) => feature.properties.iso_a2 === selectedCode
      );

      // Clear old layer if exists
      if (geoJsonLayer) {
        map.removeLayer(geoJsonLayer);
      }

      if (filtered.length === 0) {
        alert("No matching country found.");
        return;
      }

      // create a Feature Collection
      const geoJson = {
        type: "FeatureCollection",
        features: filtered,
      };

      // add layer
      geoJsonLayer = L.geoJSON(geoJson, {
        style: {
          color: "#80d643",
          fillColor: "#80d643",
          fillOpacity: 0.1,
        },
        onEachFeature: function (feature, layer) {
          layer.bindPopup("Country: " + feature.properties.name);
        },
      }).addTo(map);

      // Zoom to the selected country
      map.fitBounds(geoJsonLayer.getBounds());
    });
});

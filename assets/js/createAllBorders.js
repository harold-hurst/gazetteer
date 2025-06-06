// initialise variable for layer
let allCountriesGeoJsonLayer;

// event handler on the country select dropdown element
$("#countrySelect").on("change", function () {
  // extract value from the <select> element
  const selectedCode = this.value;

  if (!selectedCode) return;

  fetch("data/countryBorders.geo.json")
    .then((res) => res.json())
    .then((data) => {
      const filtered = data.features.filter(
        (feature) => feature.properties.iso_a2 !== $("#countrySelect").val()
      );

      // Clear old layer if exists
      if (allCountriesGeoJsonLayer) {
        map.removeLayer(allCountriesGeoJsonLayer);
      }

      allCountriesGeoJsonLayer = L.geoJSON(filtered, {
        style: {
          color: "#1c1c1c",
          fillColor: "",
          fillOpacity: 0.1,
          dashArray: "10",
          weight: 3,
          opacity: 0.5,
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

              $("#countrySelect")
                .val(feature.properties.iso_a2)
                .trigger("change");
            },
          });
        },
      }).addTo(map);
    });
});

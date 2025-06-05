// create map instance
var map = L.map("map").setView([52.95, -1.16], 13);

// create a tile and add it to the map - google street
googleStreet = L.tileLayer(
  "http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}",
  {
    maxZoom: 20,
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
    attribution: "Google Maps",
  }
);

// Hybrid,

// googleHybrid = L.tileLayer('http://{s}.google.com/vt?lyrs=s,h&x={x}&y={y}&z={z}',{
//     maxZoom: 20,
//     subdomains:['mt0','mt1','mt2','mt3']
// });
// satellite,

// googleSat = L.tileLayer('http://{s}.google.com/vt?lyrs=s&x={x}&y={y}&z={z}',{
//     maxZoom: 20,
//     subdomains:['mt0','mt1','mt2','mt3']
// });
// Terrain

// googleTerrain = L.tileLayer('http://{s}.google.com/vt?lyrs=p&x={x}&y={y}&z={z}',{
//     maxZoom: 20,
//     subdomains:['mt0','mt1','mt2','mt3']
// });

googleStreet.addTo(map);

// create variable to store map layers
let geoJsonLayer; // to store and remove the previous layer

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
          fillOpacity: 0.3,
        },
        onEachFeature: function (feature, layer) {
          layer.bindPopup("Country: " + feature.properties.name);
        },
      }).addTo(map);

      // Zoom to the selected country
      map.fitBounds(geoJsonLayer.getBounds());
    });
});

let userMarker; // To store and remove the previous marker

L.easyBar(
  [
    // get current location button
    L.easyButton(
      '<i class="bi bi-geo-alt-fill"></i>',

      function (btn, map) {
        const options = {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        };

        function success(position) {
          const latlng = [position.coords.latitude, position.coords.longitude];
          const accuracy = position.coords.accuracy;

          // Move the map to the user's current location
          map.setView(latlng, 15);

          // Remove previous marker if it exists
          if (userMarker) {
            map.removeLayer(userMarker);
          }

          // Add a new marker at the user's location
          userMarker = L.marker(latlng)
            .addTo(map)
            .bindPopup(`You're here - accuracy: ${accuracy}m`) // Add popup
            .openPopup(); // Open popup automatically
        }

        function error(err) {
          console.warn(`ERROR(${err.code}): ${err.message}`);
        }

        navigator.geolocation.getCurrentPosition(success, error, options);
      },
      "Show My Location"
    ),
    L.easyButton(
      '<i class="bi bi-house-door-fill"></i>',
      function (btn, map) {
        map.setView([52.95, -1.16], 13);
      },
      "Home View"
    ),
  ],
  {
    position: "topleft",
  }
).addTo(map);

// text of currently selected <option> of the <select>
function returnCountry() {
  const country = $("#countrySelect option:selected").text();
  const countrySelected = $("#countrySelect").val() !== "";
  return { country, countrySelected };
}

function highlightSelect() {
  $("#countrySelect").addClass("focus-visible"); // Add the class on button click

  // Optional: Remove the class after some time or on focus/blur
  setTimeout(function () {
    $("#countrySelect").removeClass("focus-visible"); // Optional: Remove class after 2 seconds
  }, 2000);
}

L.easyBar(
  [
    L.easyButton('<i class="bi bi-info-circle"></i>', function () {
      const country = returnCountry();

      if (country.countrySelected) {
        $("#modalContainer").html(createCard("Demographics of", country));
        $("#infoModal").modal("show");
      } else {
        highlightSelect();
      }
    }),
    L.easyButton('<i class="bi bi-newspaper"></i>', function () {
      const country = returnCountry();

      if (country.countrySelected) {
        $("#modalContainer").html(createCard("Latest news about", country));
        $("#infoModal").modal("show");
      } else {
        highlightSelect();
      }
    }),
    L.easyButton('<i class="bi bi-image"></i>', function () {
      const country = returnCountry();

      if (country.countrySelected) {
        $("#modalContainer").html(createCard("Images of", country));
        $("#infoModal").modal("show");
      } else {
        highlightSelect();
      }
    }),
    L.easyButton('<i class="bi bi-coin"></i>', function () {
      const country = returnCountry();

      if (country.countrySelected) {
        $("#modalContainer").html(createCard("Exchange rate for", country));
        $("#infoModal").modal("show");
      } else {
        highlightSelect();
      }
    }),
    L.easyButton('<i class="bi bi-cloud-sun"></i>', function () {
      const country = returnCountry();

      if (country.countrySelected) {
        $("#modalContainer").html(createCard("Weather in", country));
        $("#infoModal").modal("show");
      } else {
        highlightSelect();
      }
    }),
  ],
  {
    position: "topright",
  }
).addTo(map);

// Geo-location

// ---------------------------------------------------------
// GLOBAL DECLARATIONS
// ---------------------------------------------------------

// var map;

// tile layers

// var streets = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}", {
//     attribution: "Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012"
//   }
// );

// var satellite = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
//     attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
//   }
// );

// var basemaps = {
//   "Streets": streets,
//   "Satellite": satellite
// };

// buttons

// var infoBtn = L.easyButton("fa-info fa-xl", function (btn, map) {
//   $("#exampleModal").modal("show");
// });

// // ---------------------------------------------------------
// // EVENT HANDLERS
// // ---------------------------------------------------------

// // initialise and add controls once DOM is ready

//   map = L.map("map", {
//     layers: [streets]
//   }).setView([54.5, -4], 6);

//   // setView is not required in your application as you will be
//   // deploying map.fitBounds() on the country border polygon

//   layerControl = L.control.layers(basemaps).addTo(map);

//   infoBtn.addTo(map);

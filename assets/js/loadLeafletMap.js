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

let userMarker; // To store and remove the previous marker

L.easyBar(
  [
    // get current location button
    L.easyButton(
      '<i class="bi bi-geo-alt-fill"></i>',

      
      function (btn, map) {
        // success callback
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

        // error callback
        function error(err) {
          console.warn(`ERROR: ${err}`);
        }

        getCurrentLocation(success, error);
      }
    ),
    L.easyButton('<i class="bi bi-house-door-fill"></i>', function (btn, map) {
      map.setView([52.95, -1.16], 13);
    }),
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

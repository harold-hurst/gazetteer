// create map instance
var map = L.map("map").setView([52.95, -1.16], 13);

// Street

googleStreet = L.tileLayer(
  "http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}",
  {
    maxZoom: 20,
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
    attribution: "Google Maps",
  }
);

// Hybrid

googleHybrid = L.tileLayer(
  "http://{s}.google.com/vt?lyrs=s,h&x={x}&y={y}&z={z}",
  {
    maxZoom: 20,
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
    attribution: "Google Maps",
  }
);

// satellite

googleSat = L.tileLayer("http://{s}.google.com/vt?lyrs=s&x={x}&y={y}&z={z}", {
  maxZoom: 20,
  subdomains: ["mt0", "mt1", "mt2", "mt3"],
  attribution: "Google Maps",
});

// Terrain

googleTerrain = L.tileLayer(
  "http://{s}.google.com/vt?lyrs=p&x={x}&y={y}&z={z}",
  {
    maxZoom: 20,
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
    attribution: "Google Maps",
  }
);

const basemaps = {
  Streets: googleStreet,
  Satellite: googleSat,
  Hybrid: googleHybrid,
  Terrain: googleTerrain,
};

// add streets to map as a default
basemaps["Streets"].addTo(map);

const options = {
  collapsed: true, // Make the control open by default
  position: "bottomright", // Position the control at the top-right corner
  autoZIndex: false, // Don't auto adjust the z-index of layers
};

// add the different layers to the map
layerControl = L.control.layers(basemaps, null, options).addTo(map);

// BUTTONS -----------------------------------------------

let userMarker; // To store and remove the previous marker

L.easyBar(
  [
    // get current location button
    L.easyButton(
      '<i class="bi bi-geo-alt-fill"></i>',

      function (btn, map) {
        getCurrentLocation()
          .then((position) => {
            // Handle the success, location object contains the latitude and longitude

            const location = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            const accuracy = position.coords.accuracy;

            // Move the map to the user's current location
            map.setView(location, 15);

            // Remove previous marker if it exists
            if (userMarker) {
              map.removeLayer(userMarker);
            }

            // Add a new marker at the user's location
            userMarker = L.marker(location)
              .addTo(map)
              .bindPopup(`You're here`) // Add popup
              .openPopup(); // Open popup automatically

            userCircle = L.circle(location, {
              color: "red",
              fillColor: "#f03",
              fillOpacity: 0.5,
              radius: accuracy,
            }).addTo(map);
          })
          .catch((error) => {
            // Handle errors (e.g. if geolocation fails)
            console.error("Error:", error);
          });
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

// create map instance
var map = L.map("map").setView([52.95, -1.16], 13);

// Street

googleStreet = L.tileLayer(
  "http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}",
  {
    maxZoom: 20,
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
    attribution: "Google Streets",
  }
);

// Hybrid

googleHybrid = L.tileLayer(
  "http://{s}.google.com/vt?lyrs=s,h&x={x}&y={y}&z={z}",
  {
    maxZoom: 20,
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
    attribution: "Google Hybrid",
  }
);

// satellite

googleSat = L.tileLayer("http://{s}.google.com/vt?lyrs=s&x={x}&y={y}&z={z}", {
  maxZoom: 20,
  subdomains: ["mt0", "mt1", "mt2", "mt3"],
  attribution: "Google Satellite",
});

// Terrain

googleTerrain = L.tileLayer(
  "http://{s}.google.com/vt?lyrs=p&x={x}&y={y}&z={z}",
  {
    maxZoom: 20,
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
    attribution: "Google Terrain",
  }
);

weatherLayer = L.tileLayer(
  `https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=745267ab8cb24cb1769dbb5962301b17`,
  {
    attribution: "&copy; OpenWeatherMap",

    // opacity: 1,
  }
);

const basemaps = {
  Streets: googleStreet,
  Satellite: googleSat,
  Hybrid: googleHybrid,
  Terrain: googleTerrain,
  Weather: weatherLayer,
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

L.easyBar(
  [
    L.easyButton('<i class="bi bi-info-circle"></i>', function () {
      const code = $("#countrySelect").val();
      const countryName = $("#countrySelect option:selected").text();
      // return a promise

      getCountrylayerData(code)
        .then((data) => {
          $("#infoModal")
            .html(createDataTable(countryName, data.data[0]))
            .modal("show");
        })
        .catch(function (error) {
          console.log(error); // Handle the error if it happens
        });
    }),
    L.easyButton('<i class="bi bi-newspaper"></i>', function () {}),
    L.easyButton('<i class="bi bi-image"></i>', function () {}),
    L.easyButton('<i class="bi bi-coin"></i>', function () {}),
    L.easyButton('<i class="bi bi-cloud-sun"></i>', function () {
      const code = $("#countrySelect").val();
      const countryName = $("#countrySelect option:selected").text();



      getOpenWeatherData("Paris", "FR")
        .then((data) => {

          $("#infoModal").html(createWeatherTable(countryName, data.list)).modal("show");


          // console.log("data from get country layer api:");
          console.log(JSON.stringify(data));
          console.log(data);
        })
        .catch(function (error) {
          console.log(error); // Handle the error if it happens
        });
    }),
  ],
  {
    position: "topright",
  }
).addTo(map);

$(".leaflet-control-layers-toggle").html("<i class='bi bi-layers fs-3'></i>");

const corner1 = L.latLng(-90, -180);
const corner2 = L.latLng(90, 180);
const bounds = L.latLngBounds(corner1, corner2);

var map = L.map("map", {
  minZoom: 3,
  maxBounds: bounds,
  // center: [52.95, -1.16],
  zoom: 13,
  maxBoundsViscosity: 0.8,
  inertia: true,
});

let userMarker;
let userCircle;

// Street
googleStreet = L.tileLayer(
  "http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}",
  {
    maxZoom: 20,
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
    attribution: "Google Streets",
    noWrap: true,
  }
);

// Hybrid
googleHybrid = L.tileLayer(
  "http://{s}.google.com/vt?lyrs=s,h&x={x}&y={y}&z={z}",
  {
    maxZoom: 20,
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
    attribution: "Google Hybrid",
    noWrap: true,
  }
);

// satellite
googleSat = L.tileLayer("http://{s}.google.com/vt?lyrs=s&x={x}&y={y}&z={z}", {
  maxZoom: 20,
  subdomains: ["mt0", "mt1", "mt2", "mt3"],
  attribution: "Google Satellite",
  noWrap: true,
});

// Terrain
googleTerrain = L.tileLayer(
  "http://{s}.google.com/vt?lyrs=p&x={x}&y={y}&z={z}",
  {
    maxZoom: 20,
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
    attribution: "Google Terrain",
    noWrap: true,
  }
);

tempLayer = L.tileLayer(
  `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=745267ab8cb24cb1769dbb5962301b17`,
  {
    attribution: "&copy; OpenWeatherMap",
    subdomains: ["a", "b", "c"],
    noWrap: true,
  }
);

var rainLayer = L.tileLayer(
  "https://{s}.tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=745267ab8cb24cb1769dbb5962301b17",
  {
    attribution:
      'Weather data &copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>',
    subdomains: ["a", "b", "c"],
    noWrap: true,
  }
);

var cloudsLayer = L.tileLayer(
  "https://{s}.tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=745267ab8cb24cb1769dbb5962301b17",
  {
    attribution:
      'Weather data &copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>',
    subdomains: ["a", "b", "c"],
    noWrap: true,
  }
);

var windLayer = L.tileLayer(
  "https://{s}.tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=745267ab8cb24cb1769dbb5962301b17",
  {
    attribution:
      'Weather data &copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>',
    subdomains: ["a", "b", "c"],
    noWrap: true,
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

const overlays = {
  Temperature: tempLayer,
  Precipitation: rainLayer,
  Clouds: cloudsLayer,
  Wind: windLayer,
};

// add the different layers to the map
L.control.layers(basemaps, overlays, options).addTo(map);

// add custom icon to layerControl toggle button
$(".leaflet-control-layers-toggle").html("<i class='bi bi-layers fs-3'></i>");

// BUTTONS -----------------------------------------------

L.easyBar(
  [
    // get current location button
    L.easyButton(
      '<i class="bi bi-geo-alt-fill fs-6"></i>',

      function (btn, map) {
        getCurrentLocation()
          .then((position) => {
            // clear out selected country
            $("#countrySelect").val("").trigger("change");

            const location = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            const accuracy = position.coords.accuracy;

            // Move the map to the user's current location
            map.setView(location, 15);

            // Remove the existing circle, if there is one
            if (userCircle) {
              map.removeLayer(userCircle);
            }

            userCircle = L.circle(location, {
              radius: accuracy,
              color: "#80d643",
              opacity: 0.5,
              fillColor: "#80d643",
              fillOpacity: 0.3,
            }).addTo(map);

            getOpencageData(location).then((data) => {
              // Remove previous marker if it exists
              if (userMarker) {
                map.removeLayer(userMarker);
              }

              var greenIcon = L.icon({
                iconUrl: "assets/images/geo-alt-fill.svg",
                iconSize: [32, 32], // size of the icon
                iconAnchor: [16, 26], // point of the icon which will correspond to marker's location
                popupAnchor: [0, -26], // point from which the popup should open relative to the iconAnchor
              });

              // Add a new marker at the user's location
              userMarker = L.marker(location, { icon: greenIcon })
                .addTo(map)
                .bindPopup(data.data.results[0].formatted) // Add popup
                .openPopup(); // Open popup automatically
            });
          })
          .catch((error) => {
            // Handle errors (e.g. if geolocation fails)
            console.error("Error:", error);
          });
      }
    ),
    L.easyButton(
      '<i class="bi bi-house-door-fill fs-6"></i>',
      function (btn, map) {
        map.setView([52.95, -1.16], 13);
      }
    ),
  ],
  {
    position: "topleft",
  }
).addTo(map);

L.easyBar(
  [
    L.easyButton('<i class="bi bi-info-circle fs-6"></i>', function () {
      // do nothing if no country selected
      if ($("#countrySelect").val() !== "") {
        const countryCode = $("#countrySelect").val();
        const countryName = $("#countrySelect option:selected").text();

        getCountrylayerData(countryCode)
          .then((data) => {

            console.log(data);
            
            $("#infoModal")
              .html(createDataTable(countryName, data.data[0]))
              .modal("show");
          })
          .catch(function (error) {
            console.log(error); // Handle the error if it happens
          });
      }
    }),
    L.easyButton('<i class="bi bi-cloud-sun fs-6"></i>', function () {
      // do nothing if no country selected
      if ($("#countrySelect").val() !== "") {
        const countryCode = $("#countrySelect").val();
        const countryName = $("#countrySelect option:selected").text();

        getCountrylayerData(countryCode)
          .then((data) => {
            const capital = data.data[0].capital[0] + ", " + countryName;
            let capitalLocation = data.data[0].capitalInfo.latlng;
            capitalLocation = {
              lat: capitalLocation[0],
              lng: capitalLocation[1],
            };

            getOpenWeatherData(capitalLocation)
              .then((data) => {
                $("#infoModal")
                  .html(createWeatherTable(capital, data.data.daily))
                  .modal("show");
              })
              .catch(function (error) {
                console.log(error); // Handle the error if it happens
              });
          })
          .catch(function (error) {
            console.log(error); // Handle the error if it happens
          });
      }
    }),
    L.easyButton('<i class="bi bi-newspaper fs-6"></i>', function () {
      // do nothing if no country selected
      if ($("#countrySelect").val() !== "") {
        const countryCode = $("#countrySelect").val();
        const countryName = $("#countrySelect option:selected").text();

        getNewsApiData(countryCode)
          .then((data) => {
            console.log(data);

            $("#infoModal")
              .html(createNewsContainer(countryName, data.data))
              .modal("show");
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }),
    L.easyButton('<i class="bi bi-image fs-6"></i>', function () {
      // do nothing if no country selected
      if ($("#countrySelect").val() !== "") {
        const countryCode = $("#countrySelect").val();
        const countryName = $("#countrySelect option:selected").text();

        getPixabayData(countryName)
          .then((data) => {
            console.log(data);

            $("#infoModal")
              .html(createPhotoCarousel(countryName, data.hits))
              .modal("show");

            // Initialize the carousel with jQuery
            $("#carouselExampleInterval").carousel({
              interval: 4000, // Interval for auto-sliding
            });
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }),
    L.easyButton('<i class="bi bi-coin fs-6"></i>', function () {
      const countryCode = $("#countrySelect").val();
      const countryName = $("#countrySelect option:selected").text();

      getCountrylayerData(countryCode)
        .then((data) => {
          const currency = Object.keys(data.data[0].currencies)[0];

          let currencyObject = data.data[0].currencies[currency];

          const flag = data.data[0].flag;
          getExchangeRateData(currency)
            .then((data) => {
              currencyObject = { ...currencyObject, ...data.data.rates };

              console.log(currencyObject);

              $("#infoModal")
                .html(createCurrencyCard(countryName, currencyObject, flag))
                .modal("show");
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch(function (error) {
          console.log(error);
        });
    }),
  ],
  {
    position: "topright",
  }
).addTo(map);

// COMPONENTS *****************************************

// DataTable
function createDataTable(countryName, countryInfo) {
  function tableRows(dataObject) {
    const keysWanted = [
      "capital",
      "region",
      "population",
      "area",
      "currencies",
      "continents",
      "unMember",
    ];

    // Icon class mapping per key
    const iconMap = {
      flag: "bi bi-flag",
      capital: "bi bi-bank",
      region: "bi bi-globe-europe-africa",
      population: "bi bi-person-standing",
      area: "bi bi-arrows-angle-expand",
      currencies: "bi bi-coin",
      continents: "bi bi-globe",
    };

    return keysWanted
      .map((key) => {
        let value = dataObject[key];

        // Skip if key is not in object or value is null/undefined
        if (value === undefined || value === null) return "";

        // Format arrays or objects for display
        if (Array.isArray(value)) {
          value = value.join(", ");
        } else if (typeof value === "object") {
          // e.g. currencies might be an object: { EUR: { name: "Euro", ... } }
          value = Object.values(value)
            .map((v) => v.name || JSON.stringify(v))
            .join(", ");
        }

        // Handle boolean values
        if (typeof value === "boolean") {
          value = value ? "Yes" : "No";
        }

        // Optionally format numbers (like population, area)
        else if (typeof value === "number") {
          value = value.toLocaleString();
        }

        const label = key.charAt(0).toUpperCase() + key.slice(1);
        const iconClass = iconMap[key] || "bi bi-circle"; // fallback icon

        return `
        <tr>
          <td class="p-2 col-1">
            <i class="${iconClass} fs-4"></i>
          </td>
          <td class="p-3 col-6">${label}</td>
          <td class="text-end p-3 col-5">${value}</td>
        </tr>
      `;
      })
      .join("");
  }

  return `
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content shadow">
        <div class="modal-header bg-primary text-white">
        <i class="fs-1 me-3">${countryInfo.flag}</i>
          <h5 class="modal-title">${countryName} Overview</h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <table class="table table-striped">
            ${tableRows(countryInfo)}
          </table>
        </div>
        <div class="modal-footer">
          <button
            id="responsiveBtn"
            type="button"
            class="btn btn-outline-primary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
`;
}

// WeatherTable
function createWeatherTable(countryName, forecastArray) {
  function cardsHTML(forecastArray) {
    return forecastArray
      .map((data) => {
        const date = new Date(data.dt * 1000).toLocaleDateString("en-US", {
          weekday: "long", // Full weekday name (e.g., "Monday")
          month: "long", // Full month name (e.g., "June")
          day: "numeric", // Day of the month (e.g., "9")
        });
        const sunrise = new Date(data.sunrise * 1000).toLocaleTimeString();
        const sunset = new Date(data.sunset * 1000).toLocaleTimeString();
        const tempDay = (data.temp.day - 273.15).toFixed(1);
        const tempMin = (data.temp.min - 273.15).toFixed(1);
        const tempMax = (data.temp.max - 273.15).toFixed(1);
        const feelsLike = (data.feels_like.day - 273.15).toFixed(1);

        const weather = data.weather[0];
        const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;

        return `
      <div class="row align-items-center mb-4 p-3 border rounded shadow-sm bg-light">

        <div class="col-2 text-center">
          <img src="${iconUrl}" alt="${
          weather.description
        }" class="img-fluid" />
          <div class="small text-muted mt-1">${weather.main}</div>
        </div>

        <div class="col-10">
          <h6>${date} – ${weather.description}</h6>
          <p class="mb-2"><em>${data.summary}</em></p>
          <div class="row small">
            <div class="col-md-4"><strong>Temp:</strong> ${tempDay}°C (min: ${tempMin}°C, max: ${tempMax}°C)</div>
            <div class="col-md-4"><strong>Feels Like:</strong> ${feelsLike}°C</div>
            <div class="col-md-4"><strong>Humidity:</strong> ${
              data.humidity
            }%</div>
            <div class="col-md-4"><strong>Rain:</strong> ${
              data.rain ?? 0
            } mm</div>
            <div class="col-md-4"><strong>Wind:</strong> ${
              data.wind_speed
            } m/s</div>
            <div class="col-md-4"><strong>Pressure:</strong> ${
              data.pressure
            } hPa</div>
            <div class="col-md-4"><strong>Sunrise:</strong> ${sunrise}</div>
            <div class="col-md-4"><strong>Sunset:</strong> ${sunset}</div>
            <div class="col-md-4"><strong>UV Index:</strong> ${data.uvi}</div>
          </div>
        </div>

      </div>
    `;
      })
      .join("");
  }

  return `
  
        <div class="modal-dialog modal-dialog-scrollable">
          <div class="modal-content shadow">
            <div class="modal-header bg-primary text-white">
              <h5 class="modal-title">${countryName} Forecast</h5>
              <button
                type="button"
                class="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">

            <div id="forecastContainer" class="container my-4">
            
              ${cardsHTML(forecastArray)}
            
            </div>
            </div>
            <div class="modal-footer">
              <button
                id="responsiveBtn"
                type="button"
                class="btn btn-outline-primary btn-sm"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
  
  `;
}

// CurrencyCard
function createCurrencyCard(
  countryName,
  currencyObject,
  selectOptions,
  currency
) {

  function createCurrencySelect(selectOptions) {
    let html =
      '<select name="currency" id="currencySelect" class="form-select shadow-sm mb-4">';
    html += "<option disabled selected value=''>Select a currency</option>";

    for (const [code, rate] of Object.entries(selectOptions)) {
      html += `<option value="${rate}">${code}</option>`;
    }

    html += "</select>";
    return html;
  }

  const currencyName = currencyObject.name;
  const currencySymbol = currencyObject.symbol;

  return `
    <div class="modal-dialog modal-dialog-scrollable">
    <div class="modal-content shadow">
        <div class="modal-header bg-primary text-white align-items-start">

        <div class="w-100">
            <h5 class="modal-title">Currency in ${countryName}: </h5>
            <h6>Exchange ${currencyName}s (${currency})</h6>
        </div>

        <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
            aria-label="Close"
        ></button>
        </div>
        <div class="modal-body">













        <div class="my-4">
          <label for="currencyAmount" class="form-label">From ${currencyName}s (${currencySymbol}):</label>
          <input type="number" id="currencyAmount" class="form-control" placeholder="Enter a number">
        </div>

        <!--
        <div
            class="w-100 d-inline-flex mb-4 p-3 border rounded shadow-sm bg-light"
        >
        </div>
        -->


        ${createCurrencySelect(selectOptions)}

        <div
            class="w-100 d-inline-flex mb-4 p-3 border rounded shadow-sm bg-light"
        >
            <span id="currencyOutput" class="flex-fill"></span>

        </div>
















        </div>
        <div class="modal-footer">
        <button
            id="responsiveBtn"
            type="button"
            class="btn btn-outline-primary btn-sm"
            data-bs-dismiss="modal"
        >
            Close
        </button>
        </div>
    </div>
    </div>
`;
}

// NewsContainer
function createNewsContainer(countryName, newsData) {
  function renderArticlesToHTML(articles) {
    return articles
      .map((article) => {
        const {
          title,
          description,
          url, // Correct key for the article's URL
          published_at, // Correct key for the published date
          image_url, // Correct key for image
          source, // Source of the article
          categories, // Correct key for categories (it's an array)
        } = article;

        // Format categories if available
        const categoryList =
          categories && categories.length > 0
            ? categories.join(", ")
            : "General";

        // Format published date
        const publishedDate = new Date(published_at).toLocaleString();

        return `
        <div class="col-xl-6">
          <div class="card h-100 shadow-sm">
            ${
              image_url
                ? `<img src="${image_url}" class="card-img-top" alt="News image" />`
                : ""
            }
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${title}</h5>
              ${description ? `<p class="card-text">${description}</p>` : ""}
              <p class="card-text mt-auto">
                <small class="text-muted">
                  ${source || "Unknown Source"}<br />
                  Categories: ${categoryList}<br />
                  ${publishedDate}
                </small>
              </p>
              <a href="${url}" target="_blank" class="btn btn-outline-primary btn-sm mt-2">Read More</a>
            </div>
          </div>
        </div>
      `;
      })
      .join("");
  }

  return `
        <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content shadow">
            <div class="modal-header bg-primary text-white">
            <h5 class="modal-title">Latest news in ${countryName}</h5>
            <button
                type="button"
                class="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
            ></button>
            </div>
            <div class="modal-body">
            <div class="my-4">
                <div id="news-container" class="row gy-4">
                ${renderArticlesToHTML(newsData)}
                </div>
            </div>
            </div>
            <div class="modal-footer">
            <button
                id="responsiveBtn"
                type="button"
                class="btn btn-outline-primary btn-sm"
                data-bs-dismiss="modal"
            >
                Close
            </button>
            </div>
        </div>
        </div>
`;
}

// PhotoCarousel
function createPhotoCarousel(countryName, photoArray) {
  function itemHTML(photoArray) {
    return photoArray
      .map((data, index) => {
        // Get the correct image source, alt text, and link
        const imageSrc = data.webformatURL;
        const altText = data.tags || "Image from Pixabay";
        const photoLink = data.pageURL;

        // If it's the first item, make it active by default
        const activeClass = index === 0 ? "active" : "";

        return `
        <div class="carousel-item ${activeClass}" data-bs-interval="4000">
            <div class="carousel-image-container">
            <img src="${imageSrc}" class="d-block w-100" alt="${altText}">
            </div>
          <div class="carousel-caption d-none d-md-block">
            <p></p>
          </div>
        </div>
      `;
      })
      .join("");
  }
  return `
    <div class="modal-dialog modal-dialog-scrollable">
    <div class="modal-content shadow">
        <div class="modal-header bg-primary text-white">
        <h5 class="modal-title">Photos of ${countryName}</h5>
        <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
            aria-label="Close"
        ></button>
        </div>
        <div class="modal-body">
        <div
            id="carouselExampleInterval"
            class="carousel slide"
            data-bs-ride="carousel"
        >
            <div class="carousel-inner">${itemHTML(photoArray)}</div>
            <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide="prev"
            >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
            </button>
            <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide="next"
            >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
            </button>
        </div>
        </div>
        <div class="modal-footer">
        <button
            id="responsiveBtn"
            type="button"
            class="btn btn-outline-primary btn-sm"
            data-bs-dismiss="modal"
        >
            Close
        </button>
        </div>
    </div>
    </div>
  `;
}

// UTILS *****************************************

// GeoLocate *****************************************
function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    // Check if geolocation is supported by the browser
    if (navigator.geolocation) {
      // Attempt to get the current position
      navigator.geolocation.getCurrentPosition(
        function (position) {
          resolve(position);
        },
        function (error) {
          // Reject the Promise with the error message
          reject(error.message);
        },
        {
          enableHighAccuracy: true, // Request high accuracy
          timeout: 10000, // Set a timeout of 10 seconds
          maximumAge: 0, // Do not use cached location
        }
      );
    } else {
      // Geolocation is not supported
      reject("Geolocation is not supported by this browser.");
    }
  });
}

// API *****************************************

// CountryLayer
function getGeonamesData(countryCode) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "php/api-connections/geonames-data-request.php",
      type: "GET",
      data: { code: countryCode },
      dataType: "json",
      success: function (response) {
        resolve(response);
      },
      error: function (xhr, status, error) {
        console.error("AJAX error:", status, error);
        reject(error);
      },
    });
  });
}

// OpenCage
function getOpencageData(location) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "php/api-connections/opencage-geocode-request.php",
      type: "POST",
      dataType: "json",
      data: location,
      success: function (result, status, xhr) {
        resolve(result);
      },
      error: function (xhr, status, error) {
        reject(error);
      },
    });
  });
}

// OpenWeather
function getOpenWeatherData(capitalLocation) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "php/api-connections/openweathermap-data.php",
      method: "GET",
      dataType: "json",
      data: capitalLocation,
      success: function (data) {
        resolve(data);
      },
      error: function (xhr, status, error) {
        reject(error);

        console.error("AJAX request failed:", error);
      },
    });
  });
}

// CountryLayer
function getCountrylayerData(countryCode) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "php/api-connections/countrylayer-data-request.php",
      type: "GET",
      data: { code: countryCode },
      dataType: "json",
      success: function (response) {
        resolve(response);
      },
      error: function (xhr, status, error) {
        console.error("AJAX error:", status, error);
        reject(error);
      },
    });
  });
}

// OpenExchange
function getExchangeRateData(currency) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "php/api-connections/openexchagerates-data-request.php",
      type: "GET",
      data: { currency: currency },
      dataType: "json",
      success: function (response) {
        resolve(response);
      },
      error: function (xhr, status, error) {
        console.error("AJAX error:", status, error);
        reject(error);
      },
    });
  });
}

// NewsApi
function getNewsApiData(countryCode) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "php/api-connections/newsapi-request.php",
      method: "GET",
      dataType: "json",
      data: {
        countryCode: countryCode.toLowerCase(),
      },
      success: function (data) {
        resolve(data);
      },
      error: function (xhr, status, error) {
        reject(error);

        console.error("AJAX request failed:", error);
      },
    });
  });
}

// Pixabay API
function getPixabayData(countryName) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "php/api-connections/pixabay-image-data-request.php",
      method: "GET",
      dataType: "json",
      data: { countryName: countryName },
      success: function (data) {
        resolve(data);
      },
      error: function (xhr, status, error) {
        reject(error);

        console.error("AJAX request failed:", error);
      },
    });
  });
}

// FRONTEND LOGIC *****************************************

// Load Leaflet.js map *****************************************
const corner1 = L.latLng(-90, -180);
const corner2 = L.latLng(90, 180);
const bounds = L.latLngBounds(corner1, corner2);

// define Leaflet js map
const map = L.map("map", {
  minZoom: 3,
  maxBounds: bounds,
  maxBoundsViscosity: 0.8,
  inertia: true,
}).setView([54.5, -3.0], 6);

// define marker variables to show user location
let userMarker;
let userCircle;

// define some cluster groups to be populated with markers
let airportsCluster = L.markerClusterGroup();
let citiesCluster = L.markerClusterGroup();
let castlesCluster = L.markerClusterGroup();
let universitiesCluster = L.markerClusterGroup();
let stadiumsCluster = L.markerClusterGroup();

// define custom markers
const blueIcon = L.icon({
  iconUrl: "assets/images/geo-alt-fill.svg",
  iconSize: [22, 22], // size of the icon
  iconAnchor: [11, 26], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -22], // point from which the popup should open relative to the iconAnchor
});

const airportIcon = L.icon({
  iconUrl: "assets/images/plane-solid.svg",
  iconSize: [22, 22], // size of the icon
  iconAnchor: [11, 26], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -22], // point from which the popup should open relative to the iconAnchor
});

const citiesIcon = L.icon({
  iconUrl: "assets/images/city-solid.svg",
  iconSize: [22, 22], // size of the icon
  iconAnchor: [11, 26], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -22], // point from which the popup should open relative to the iconAnchor
});

const castlesIcon = L.icon({
  iconUrl: "assets/images/chess-rook-solid.svg",
  iconSize: [22, 22], // size of the icon
  iconAnchor: [11, 26], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -22], // point from which the popup should open relative to the iconAnchor
});

const universitiesIcon = L.icon({
  iconUrl: "assets/images/school-flag-solid.svg",
  iconSize: [22, 22], // size of the icon
  iconAnchor: [11, 26], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -22], // point from which the popup should open relative to the iconAnchor
});

const stadiumsIcon = L.icon({
  iconUrl: "assets/images/hotel-solid.svg",
  iconSize: [22, 22], // size of the icon
  iconAnchor: [11, 26], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -22], // point from which the popup should open relative to the iconAnchor
});

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
  // Temperature: tempLayer,
  // Precipitation: rainLayer,
  // Clouds: cloudsLayer,
  // Wind: windLayer,
  Cities: citiesCluster,
  Airports: airportsCluster,
  Castles: castlesCluster,
  Universities: universitiesCluster,
  Stadiums: stadiumsCluster,
};

// add the different layers to the map
L.control.layers(basemaps, overlays, options).addTo(map);

$(".leaflet-control-layers-toggle").html("<i class='bi bi-layers fs-3'></i>");

L.easyBar(
  [
    // get current location button
    L.easyButton(
      '<i class="bi bi-crosshair fs-6"></i>',

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

              // Add a new marker at the user's location
              userMarker = L.marker(location, { icon: blueIcon })
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
    L.easyButton('<i class="bi bi-house fs-6"></i>', function (btn, map) {
      map.setView([52.95, -1.16], 13);
    }),
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
            console.log(data.data[0]);

            $("#infoModal")
              .html(createDataTable(countryName, data.data[0]))
              .modal("show");
          })
          .catch(function (error) {
            console.log(error); // Handle the error if it happens
          });
      }
    }),

    L.easyButton('<i class="bi bi-geo-alt fs-6"></i>', function () {
      // do nothing if no country selected
      if ($("#countrySelect").val() !== "") {
        const countryCode = $("#countrySelect").val();

        // clear any existing layers on clusters
        citiesCluster.clearLayers();
        airportsCluster.clearLayers();
        castlesCluster.clearLayers();
        stadiumsCluster.clearLayers();
        universitiesCluster.clearLayers();

        // get
        getGeonamesData(countryCode)
          .then((data) => {
            data.cities.forEach(function (item) {
              // Convert lat and lng to numbers
              const lat = parseFloat(item.lat);
              const lng = parseFloat(item.lng);

              // Create the marker using the lat and lng from the current item
              let marker = L.marker([lat, lng], {
                icon: citiesIcon,
              }).bindPopup(
                `<strong>${item.name}</strong><br>${item.adminName1}, ${item.countryName}`
              );

              // Add the marker to the MarkerClusterGroup
              citiesCluster.addLayer(marker);
            });

            // Add the updated marker cluster group to the map (if not already added)
            if (!map.hasLayer(citiesCluster)) {
              map.addLayer(citiesCluster);
            }

            data.airports.forEach(function (item) {
              // Convert lat and lng to numbers
              const lat = parseFloat(item.lat);
              const lng = parseFloat(item.lng);

              // Create the marker using the lat and lng from the current item
              let marker = L.marker([lat, lng], {
                icon: airportIcon,
              }).bindPopup(
                `<strong>${item.name}</strong><br>${item.adminName1}, ${item.countryName}`
              );

              // Add the marker to the MarkerClusterGroup
              airportsCluster.addLayer(marker);
            });

            // Add the updated marker cluster group to the map (if not already added)
            if (!map.hasLayer(airportsCluster)) {
              map.addLayer(airportsCluster);
            }

            data.castles.forEach(function (item) {
              // Convert lat and lng to numbers
              const lat = parseFloat(item.lat);
              const lng = parseFloat(item.lng);

              // Create the marker using the lat and lng from the current item
              let marker = L.marker([lat, lng], {
                icon: castlesIcon,
              }).bindPopup(
                `<strong>${item.name}</strong><br>${item.adminName1}, ${item.countryName}`
              );

              // Add the marker to the MarkerClusterGroup
              castlesCluster.addLayer(marker);
            });

            // Add the updated marker cluster group to the map (if not already added)
            if (!map.hasLayer(castlesCluster)) {
              map.addLayer(castlesCluster);
            }

            data.stadiums.forEach(function (item) {
              // Convert lat and lng to numbers
              const lat = parseFloat(item.lat);
              const lng = parseFloat(item.lng);

              // Create the marker using the lat and lng from the current item
              let marker = L.marker([lat, lng], {
                icon: stadiumsIcon,
              }).bindPopup(
                `<strong>${item.name}</strong><br>${item.adminName1}, ${item.countryName}`
              );

              // Add the marker to the MarkerClusterGroup
              stadiumsCluster.addLayer(marker);
            });

            // Add the updated marker cluster group to the map (if not already added)
            if (!map.hasLayer(stadiumsCluster)) {
              map.addLayer(stadiumsCluster);
            }

            data.universities.forEach(function (item) {
              // Convert lat and lng to numbers
              const lat = parseFloat(item.lat);
              const lng = parseFloat(item.lng);

              // Create the marker using the lat and lng from the current item
              let marker = L.marker([lat, lng], {
                icon: universitiesIcon,
              }).bindPopup(
                `<strong>${item.name}</strong><br>${item.adminName1}, ${item.countryName}`
              );

              // Add the marker to the MarkerClusterGroup
              universitiesCluster.addLayer(marker);
            });

            // Add the updated marker cluster group to the map (if not already added)
            if (!map.hasLayer(universitiesCluster)) {
              map.addLayer(universitiesCluster);
            }
          })
          .catch(function (error) {
            console.log(error); // Handle the error if it happens
          });

        const $control = $(".leaflet-control-layers");
        $control.addClass("leaflet-control-layers-expanded");
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
    L.easyButton('<i class="bi bi-currency-exchange fs-6"></i>', function () {
      const countryCode = $("#countrySelect").val();
      const countryName = $("#countrySelect option:selected").text();

      getCountrylayerData(countryCode) // pull currency info on base country
        .then((data) => {
          const currency = Object.keys(data.data[0].currencies)[0]; // eg. GBP
          let currencyObject = data.data[0].currencies[currency]; // eg. {symbol: '£', name: 'British pound'}


          getExchangeRateData(currency)
            .then((data) => {

              const selectOptions = data.data.allRates.rates;

              const dollarRate = data.data.dollarRate.rates;

              const [multiplierKey, multiplierValue] =
                Object.entries(dollarRate)[0];

              const convertedRates = {};

              for (const [code, value] of Object.entries(selectOptions)) {
                convertedRates[code] = value / multiplierValue;
              }

              $("#infoModal")
                .html(
                  createCurrencyCard(
                    countryName,
                    currencyObject,
                    convertedRates,
                    currency
                  )
                )
                .modal("show");

              // adding an event listener every time modal opens !!!
              $("#currencySelect").on("change", function () {
                const selectedCurrencyRate = parseFloat($(this).val());
                const amount = $('#currencyAmount').val();
                const totalCurrencyValue = (selectedCurrencyRate * amount).toFixed(
                  2
                );

                const currencyCode = $(this).find("option:selected").text();
                $("#currencyOutput").text(totalCurrencyValue + ' ' + currencyCode);
              });
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

// Create country boarder with Leaflet.js *****************************************
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
            opacity: 0.7,
            fillColor: "#80d643",
            fillOpacity: 0,
          },
          onEachFeature: function (feature, layer) {
            layer.bindPopup("Country: " + feature.properties.name);
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

// Create all borders with Leaflet.js *****************************************
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

$.ajax({
  url: "php/utils/getBorderData.php", // PHP file that returns JSON
  method: "GET", // or 'POST' if needed
  dataType: "json", // Expect JSON response

  success: function (borderData) {
    createAllBorders(borderData.features);
  },

  error: function (xhr, status, error) {
    console.error("AJAX error:", error);
  },
});

$("#countrySelect").on("change", function () {
  // extract value from the <select> element - iso code or empty string
  selectedCode = this.value;

  if (allCountriesGeoJsonLayer) {
    map.removeLayer(allCountriesGeoJsonLayer);
  }

  $.ajax({
    url: "php/utils/getBorderData.php",
    method: "GET",
    dataType: "json",
    success: function (data) {
      const filtered = data.features.filter(
        (feature) => feature.properties.iso_a2 !== selectedCode
      );

      createAllBorders(filtered);
    },
    error: function (xhr, status, error) {
      console.error("Error loading GeoJSON:", error);
    },
  });
});

$("#countrySelect").on("change", function () {
  map.removeLayer(airportsCluster);
  map.removeLayer(castlesCluster);
  map.removeLayer(stadiumsCluster);
  map.removeLayer(universitiesCluster);
  map.removeLayer(citiesCluster);
});

$("#clearSelect").on("click", function () {
  map.removeLayer(airportsCluster);
  map.removeLayer(castlesCluster);
  map.removeLayer(stadiumsCluster);
  map.removeLayer(universitiesCluster);
  map.removeLayer(citiesCluster);
});

// Scroll map left and right when modal opens/closes *****************************************
$("#infoModal").on("show.bs.modal", function () {
  // Get the current bounds of the map
  const bounds = map.getBounds();

  // Extract the southwest and northeast corners
  const minLongitude = bounds._southWest.lng;
  const maxLongitude = bounds._northEast.lng;

  // Calculate the absolute longitude range
  const longitudeRange = Math.abs(maxLongitude - minLongitude);

  // Get the current center of the map
  const currentCenter = map.getCenter();

  // Calculate the new longitude by shifting half the longitude range to the left
  const newLongitude = currentCenter.lng + longitudeRange / 4;

  // Create a new LatLng object with the updated longitude and the current latitude
  const newCenter = L.latLng(currentCenter.lat, newLongitude);

  // Set the new view to move the map to the left
  map.setView(newCenter, map.getZoom());
});

$("#infoModal").on("hidden.bs.modal", function () {
  // Get the current bounds of the map
  const bounds = map.getBounds();

  // Extract the southwest and northeast corners
  const minLongitude = bounds._southWest.lng;
  const maxLongitude = bounds._northEast.lng;

  // Calculate the absolute longitude range
  const longitudeRange = Math.abs(maxLongitude - minLongitude);

  // Get the current center of the map
  const currentCenter = map.getCenter();

  // Calculate the new longitude by shifting half the longitude range to the left
  const newLongitude = currentCenter.lng - longitudeRange / 4;

  // Create a new LatLng object with the updated longitude and the current latitude
  const newCenter = L.latLng(currentCenter.lat, newLongitude);

  // Set the new view to move the map to the left
  map.setView(newCenter, map.getZoom());
});

// populate the <select> element with country names from geoData file *****************************************
$.ajax({
  url: "php/utils/getCountryNames.php", // PHP file that returns JSON
  method: "GET", // or 'POST' if needed
  dataType: "json", // Expect JSON response
  success: function (countryMap) {
    // Function to reorder keys alphabetically
    const orderedCountryCodes = Object.keys(countryMap) // Get all the keys
      .sort() // Sort them alphabetically
      .reduce((acc, key) => {
        acc[key] = countryMap[key]; // Rebuild the object with sorted keys
        return acc;
      }, {});

    // populate <select> with values from orderedCountryCodes
    $.each(orderedCountryCodes, function (countryName, isoCode) {
      $("#countrySelect").append(
        $("<option></option>").val(isoCode).text(countryName)
      );
    });
  },
  error: function (xhr, status, error) {
    console.error("AJAX error:", error);
  },
});

// set <select> value on load to country user is in *****************************************
$(document).ready(function () {
  getCurrentLocation()
    .then((position) => {
      const location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      getOpencageData(location)
        .then((data) => {
          const isoCode = data.data.results[0].components["ISO_3166-1_alpha-2"];
          $("#countrySelect").val(isoCode).trigger("change");
        })
        .catch(function (error) {
          console.log(error); // Handle the error if it happens
        });
    })
    .catch((errorMessage) => {
      console.error("Error: " + errorMessage);
    });
});

// clear <select> value when Clear button clicked *****************************************
$("#clearSelect").on("click", function () {
  $("#countrySelect").val("").trigger("change");
});

// remove the spinner on document load *****************************************
$(window).on("load", function () {
  if ($("#preloader").length) {
    $("#preloader").fadeOut("slow", function () {
      $(this).remove();
    });
  }
});

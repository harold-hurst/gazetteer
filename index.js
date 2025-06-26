// COMPONENTS *****************************************

// DataTable
function createDataTable(countryName, countryInfo, wikiArticle) {
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



          <table class="table table-striped mb-4">
            ${tableRows(countryInfo)}
          </table>
          <h5>Wikipedia</h5>
          ${wikiArticle}



`;
}

// WeatherTable
function createWeatherTable(countryName, forecastArray) {
  const firstItem = forecastArray.shift();

  const tempMin = (firstItem.temp.min - 273.15).toFixed(1);
  const tempMax = (firstItem.temp.max - 273.15).toFixed(1);

  const weather = firstItem.weather[0];
  const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;
  const description = weather.description;

  const grouped = [];

  for (let i = 0; i < forecastArray.length; i += 2) {
    grouped.push({
      days: [forecastArray[i], forecastArray[i + 1]],
    });
  }

  function weatherCard(grouped) {
    return grouped
      .map((data) => {
        const date1 = new Date(data.days[0].dt * 1000).toLocaleDateString(
          "en-US",
          {
            weekday: "long", // Full weekday name (e.g., "Monday")
            month: "long", // Full month name (e.g., "June")
            day: "numeric", // Day of the month (e.g., "9")
          }
        );

        const tempMin1 = (data.days[0].temp.min - 273.15).toFixed(1);
        const tempMax1 = (data.days[0].temp.max - 273.15).toFixed(1);

        const weather1 = data.days[0].weather[0];
        const iconUrl1 = `https://openweathermap.org/img/wn/${weather1.icon}@2x.png`;

        if (data.days[1] !== undefined && data.days[1] !== null) {
          const day2 = data.days[1];
          const date2 = new Date(day2.dt * 1000).toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          });

          const tempMin2 = (day2.temp.min - 273.15).toFixed(1);
          const tempMax2 = (day2.temp.max - 273.15).toFixed(1);

          const weather2 = day2.weather[0];
          const iconUrl2 = `https://openweathermap.org/img/wn/${weather2.icon}@2x.png`;

          day2Html = `
          <div class="col border mt-2 ms-3 me-3">
            <div class="row">
              <div class="col text-center">
                <p class="fw-bold fs-6 mt-3">${date2}</p>
              </div>
            </div>
            <div class="row">
              <div class="col text-center">
                <img src="${iconUrl2}" alt="" title="" />
              </div>
              <div class="col text-center">
                <p class="fw-bold fs-4 mb-0">
                  <span>${tempMax2}</span><sup>o</sup>c
                </p>
                <p class="fs-5 mt-0 text-secondary">
                  <span>${tempMin2}</span><sup>o</sup>c
                </p>
              </div>
            </div>
          </div>`;
        }

        return `

      <div class="row mb-2">

        <div class="col border mt-2 ms-3 me-3">

          <div class="row">
            <div class="col text-center">
              <p id="day1Date" class="fw-bold fs-6 mt-3">${date1}</p>
            </div>
          </div>

          <div class="row">
            <div class="col text-center">
              <img id="day1Icon" src="${iconUrl1}" alt="" title="" />
            </div>

            <div class="col text-center">
              <p class="fw-bold fs-4 mb-0">
                <span id="day1MaxTemp">${tempMax1}</span><sup>o</sup>c
              </p>
              <p class="fs-5 mt-0 text-secondary">
                <span id="day1MinTemp">${tempMin1}</span><sup>o</sup>c
              </p>
            </div>
          </div>

        </div>

          ${(data.days[1] !== undefined && data.days[1] !== null) ? day2Html : `<div class="col mt-2 ms-3 me-3"></div>`}

        </div>

    `;
      })
      .join("");
  }

  return `



      <div class="row">

        <div class="col border mt-1 ms-3 me-3 mb-2">
          <p class="fw-bold fs-6 mt-1">TODAY</p>

          <div class="row">
            <div class="col text-center">
              <p id="todayConditions" class="fw-bold fs-6 mt-3">${description}</p>
            </div>

            <div class="col text-center">
              <img
                id="todayIcon"
                class="img-fluid mt-0"
                src="${iconUrl}"
                alt=""
                title=""
              />
            </div>

            <div class="col text-center">
              <p class="fw-bold fs-4 mb-0">
                <span id="todayMaxTemp">${tempMax}</span><sup>o</sup
                ><span class="tempMetric">c</span>
              </p>
              <p class="fs-5 mt-0 text-secondary">
                <span id="todayMinTemp">${tempMin}</span><sup>o</sup
                ><span class="tempMetric">c</span>
              </p>
            </div>
          </div>
        </div>

      </div>

      ${weatherCard(grouped)}



  
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

    html = "<label for='currencySelect'>Convert to</label>" + html;
    html += "</select>";
    return html;
  }

  const currencyName = currencyObject.name;
  const currencySymbol = currencyObject.symbol;

  return `
      <div class="my-4">
        <label for="currencyAmount" class="form-label"
          >From ${currencyName}s (${currencySymbol}):</label
        >
        <input
          type="number"
          id="currencyAmount"
          class="form-control"
          placeholder="Enter a number"
        />
      </div>

      ${createCurrencySelect(selectOptions)}

      <div
        class="w-100 d-inline-flex mb-4 p-3 border rounded shadow-sm bg-light"
      >
        <span id="currencyOutput" class="flex-fill"></span>
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

        <table class="table table-borderless">
          <tr>
            <td rowspan="2" width="50%">
              <img class="img-fluid rounded" src="${image_url}" alt="" title="" />
            </td>

            <td>
              <a href="${url}" class="fw-bold fs-6 text-black" target="_blank"
                >${title}</a
              >
            </td>
          </tr>

          <tr>
            <td class="align-bottom pb-0">
              <p class="fw-light fs-6 mb-1">${source || "Unknown Source"}</p>
            </td>
          </tr>
        </table>

        <hr />

      `;
      })
      .join("");
  }

  return `
          ${renderArticlesToHTML(newsData)}
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
          <span class="carousel-control-prev-icon"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon"></span>
          <span class="visually-hidden">Next</span>
        </button>
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

// Pixabay
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

// Wikimedia
function getWikipediaPage(countryName) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "php/api-connections/wikipedia-page-request.php",
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

// define Leaflet js map - provide default location to position the map at with setView
const map = L.map("map", {
  minZoom: 3,
  maxBounds: bounds,
  maxBoundsViscosity: 0.8,
  inertia: true,
}).setView([54.5, -3.0], 6);

// define marker variables to show user location
let userMarker;
let userCircle;

// define custom markers
const blueIcon = L.icon({
  iconUrl: "assets/images/geo-alt-fill.svg",
  iconSize: [22, 22], // size of the icon
  iconAnchor: [11, 26], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -22], // point from which the popup should open relative to the iconAnchor
});

const airportIcon = L.ExtraMarkers.icon({
  icon: "bi-airplane",
  markerColor: "red",
  innerHTML:
    "<img src='assets/images/plane-solid.svg' alt='Marker'  style='width: 17px; height: 33px;'></img>",
  shape: "square",
  prefix: "bi",
});

const citiesIcon = L.ExtraMarkers.icon({
  icon: "bi-buildings",
  markerColor: "blue",
  innerHTML:
    "<img src='assets/images/city-solid.svg' alt='Marker'  style='width: 17px; height: 33px;'></img>",
  shape: "square",
  prefix: "bi",
});

const castlesIcon = L.ExtraMarkers.icon({
  icon: "",
  markerColor: "green",
  innerHTML:
    "<img src='assets/images/chess-rook-solid.svg' alt='Marker'  style='width: 17px; height: 33px;'></img>",
  shape: "square",
  prefix: "bi",
});

const universitiesIcon = L.ExtraMarkers.icon({
  icon: "",
  markerColor: "orange",
  innerHTML:
    "<img src='assets/images/school-flag-solid.svg' alt='Marker'  style='width: 17px; height: 33px;'></img>",
  shape: "square",
  prefix: "bi",
});

const stadiumsIcon = L.ExtraMarkers.icon({
  icon: "",
  markerColor: "yellow",
  innerHTML:
    "<img src='assets/images/hotel-solid.svg' alt='Marker'  style='width: 17px; height: 33px;'></img>",
  shape: "square",
  prefix: "bi",
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

// define some cluster groups to be populated with markers
let airportsCluster = L.markerClusterGroup();
let citiesCluster = L.markerClusterGroup();
let castlesCluster = L.markerClusterGroup();
let universitiesCluster = L.markerClusterGroup();
let stadiumsCluster = L.markerClusterGroup();

const markersOverlay = {
  Cities: citiesCluster,
  Airports: airportsCluster,
  Castles: castlesCluster,
  Universities: universitiesCluster,
  Stadiums: stadiumsCluster,
};

const weatherOverlay = {
  Temperature: tempLayer,
  Precipitation: rainLayer,
  Clouds: cloudsLayer,
  Wind: windLayer,
};

const options = {
  collapsed: false, // Make the control open by default
  position: "bottomright", // Position the control at the top-right corner
  autoZIndex: false, // Don't auto adjust the z-index of layers
};

// add the different layers to the map
let layersControl = L.control.layers(basemaps, null, options).addTo(map);

function switchOverlay(newOverlay) {
  map.removeControl(layersControl);
  layersControl = L.control.layers(basemaps, newOverlay, options).addTo(map);
}

L.easyBar(
  [
    L.easyButton('<i class="bi bi-info-circle fs-6"></i>', function () {
      // do nothing if no country selected
      if ($("#countrySelect").val() !== "") {
        // show the modal which contains a spinner
        $("#infoModal").modal("show");

        const countryCode = $("#countrySelect").val();

        const countryName = $("#countrySelect option:selected").text();
        $("#modalTitle").text(`${countryName} Overview`);

        Promise.all([
          getWikipediaPage(countryName),
          getCountrylayerData(countryCode),
        ])
          .then(([wikipediaData, countryData]) => {
            const [firstKey, firstValue] = Object.entries(
              wikipediaData.query.pages
            )[0];
            const htmlArticle = firstValue.extract;

            const tableData = countryData.data[0];

            $("#contentContainer").html(
              createDataTable(countryName, tableData, htmlArticle)
            );

            $("#modalPreloader").addClass("fadeOut");
          })
          .catch(function (error) {
            console.log("An error occurred:", error);
            $("#modalTitle").text(`Error retrieving country data`);
          });

        // change L.control
        switchOverlay(null);
      } else {
        $(document).ready(function () {
          $("#countrySelect").focus();
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

        // change L.control
        switchOverlay(markersOverlay);

        // open new control
        const $control = $(".leaflet-control-layers");
        $control.addClass("leaflet-control-layers-expanded");
      } else {
        $(document).ready(function () {
          $("#countrySelect").focus();
        });
      }
    }),
    L.easyButton('<i class="bi bi-cloud-sun fs-6"></i>', function () {
      // do nothing if no country selected
      if ($("#countrySelect").val() !== "") {
        // show the modal which contains a spinner
        $("#infoModal").modal("show");

        const countryCode = $("#countrySelect").val();
        const countryName = $("#countrySelect option:selected").text();
        $("#modalTitle").text(`${countryName} Weather`);

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
                $("#contentContainer").html(
                  createWeatherTable(capital, data.daily)
                );

                $("#modalPreloader").addClass("fadeOut");
              })
              .catch(function (error) {
                console.log(error); // Handle the error if it happens
              });
          })
          .catch(function (error) {
            console.log(error); // Handle the error if it happens
            $("#modalTitle").text(`Error retrieving weather data`);
          });

        // change L.control
        switchOverlay(weatherOverlay);

        // open new control
        const $control = $(".leaflet-control-layers");
        $control.addClass("leaflet-control-layers-expanded");
      } else {
        $(document).ready(function () {
          $("#countrySelect").focus();
        });
      }
    }),
    L.easyButton('<i class="bi bi-newspaper fs-6"></i>', function () {
      // do nothing if no country selected
      if ($("#countrySelect").val() !== "") {
        // show the modal which contains a spinner
        $("#infoModal").modal("show");

        const countryCode = $("#countrySelect").val();

        const countryName = $("#countrySelect option:selected").text();
        $("#modalTitle").text(`${countryName} News`);

        getNewsApiData(countryCode)
          .then((data) => {

            $("#contentContainer").html(
              createNewsContainer(countryName, data.data)
            );
            $("#modalPreloader").addClass("fadeOut");
          })
          .catch(function (error) {
            console.log(error);
            $("#modalTitle").text(`Error retrieving news data`);
          });

        // change L.control
        switchOverlay(null);
      } else {
        $(document).ready(function () {
          $("#countrySelect").focus();
        });
      }
    }),
    L.easyButton('<i class="bi bi-image fs-6"></i>', function () {
      // do nothing if no country selected
      if ($("#countrySelect").val() !== "") {
        // show the modal which contains a spinner
        $("#infoModal").modal("show");

        const countryName = $("#countrySelect option:selected").text();
        $("#modalTitle").text(`${countryName} Images`);

        getPixabayData(countryName)
          .then((data) => {
            $("#contentContainer").html(
              createPhotoCarousel(countryName, data.hits)
            );
            $("#modalPreloader").addClass("fadeOut");

            // Initialize the carousel with jQuery
            $("#carouselExampleInterval").carousel({
              interval: 4000, // Interval for auto-sliding
            });
          })
          .catch(function (error) {
            console.log(error);
            $("#modalTitle").text(`Error retrieving images`);
          });

        // change L.control
        switchOverlay(null);
      } else {
        $(document).ready(function () {
          $("#countrySelect").focus();
        });
      }
    }),
    L.easyButton('<i class="bi bi-currency-exchange fs-6"></i>', function () {
      if ($("#countrySelect").val() !== "") {
        // show the modal which contains a spinner
        $("#infoModal").modal("show");

        const countryCode = $("#countrySelect").val();
        const countryName = $("#countrySelect option:selected").text();
        $("#modalTitle").text(`${countryName} Currency Exchange`);

        getCountrylayerData(countryCode) // pull currency info on base country
          .then((data) => {
            const currency = Object.keys(data.data[0].currencies)[0]; // eg. GBP
            let currencyObject = data.data[0].currencies[currency]; // eg. {symbol: '£', name: 'British pound'}

            getExchangeRateData(currency)
              .then((data) => {
                const selectOptions = data.allRates.rates;

                const dollarRate = data.dollarRate.rates;

                const [multiplierKey, multiplierValue] =
                  Object.entries(dollarRate)[0];

                const convertedRates = {};

                for (const [code, value] of Object.entries(selectOptions)) {
                  convertedRates[code] = value / multiplierValue;
                }

                $("#contentContainer").html(
                  createCurrencyCard(
                    countryName,
                    currencyObject,
                    convertedRates,
                    currency
                  )
                );
                $("#modalPreloader").addClass("fadeOut");

                $("#currencySelect").on("change", function () {
                  const selectedCurrencyRate = parseFloat($(this).val());
                  const amount = $("#currencyAmount").val();
                  const totalCurrencyValue = (
                    selectedCurrencyRate * amount
                  ).toFixed(2);

                  const currencyCode = $(this).find("option:selected").text();
                  $("#currencyOutput").text(
                    totalCurrencyValue + " " + currencyCode
                  );
                });
              })
              .catch(function (error) {
                console.log(error);
                $("#modalTitle").text(`Error retrieving currency data`);
              });
          })
          .catch(function (error) {
            console.log(error);
            $("#modalTitle").text(`Error retrieving currency data`);
          });

        // change L.control
        switchOverlay(null);
      } else {
        $(document).ready(function () {
          $("#countrySelect").focus();
        });
      }
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
            color: "#df2e31",
            opacity: 1,
            fillColor: "#df2e31",
            fillOpacity: 0.0,
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

$("#countrySelect").on("change", function () {
  map.removeLayer(airportsCluster);
  map.removeLayer(castlesCluster);
  map.removeLayer(stadiumsCluster);
  map.removeLayer(universitiesCluster);
  map.removeLayer(citiesCluster);

  switchOverlay(null);
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

  $("#modalPreloader").removeClass("fadeOut");
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

// create map instance
var map = L.map("map").setView([52.95, -1.16], 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// icon: Font Awesome class name or custom HTML for the icon.
// onClickFunction: Callback function that runs on click.
// tooltipText: (Optional) Hover tooltip text.
// buttonId: (Optional) Unique ID for the button.

// buttons

L.easyBar(
  [
    L.easyButton(
      '<i class="bi bi-info-circle"></i>',
      function () {
        $("#infoModal").modal("show");
      },
      "Info"
    ),

    L.easyButton(
      '<i class="bi bi-house-door-fill"></i>',
      function (btn, map) {
        map.setView([51.505, -0.09], 13);
      },
      "Home View"
    ),

    L.easyButton(
      '<i class="bi bi-geo-alt"></i>',
      function () {
        alert("Geolocation coming soon!");
      },
      "Locate Me"
    ),
  ],
  {
    position: "topright",
  }
).addTo(map);

// infoBtn.addTo(map);

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

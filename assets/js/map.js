// create map instance
var map = L.map("map").setView([52.95, -1.16], 13);

var polygon = L.polygon([
  [
    [
      [-5.661948614921897, 54.55460317648385],
      [-6.197884894220977, 53.86756500916334],
      [-6.953730231137996, 54.073702297575636],
      [-7.572167934591079, 54.05995636658599],
      [-7.366030646178785, 54.595840969452695],
      [-7.572167934591079, 55.1316222194549],
      [-6.733847011736145, 55.1728600124238],
      [-5.661948614921897, 54.55460317648385],
    ],
  ],
  [
    [
      [-3.005004848635281, 58.63500010846633],
      [-4.073828497728016, 57.55302480735525],
      [-3.055001796877661, 57.69001902936095],
      [-1.959280564776918, 57.68479970969951],
      [-2.219988165689301, 56.87001740175353],
      [-3.119003058271118, 55.973793036515474],
      [-2.085009324543023, 55.90999848085127],
      [-2.005675679673857, 55.80490285035023],
      [-1.11499101399221, 54.62498647726539],
      [-0.4304849918542, 54.46437612570216],
      [0.184981316742039, 53.32501414653103],
      [0.469976840831777, 52.92999949809197],
      [1.681530795914739, 52.739520168664],
      [1.559987827164377, 52.09999848083601],
      [1.050561557630914, 51.806760565795685],
      [1.449865349950301, 51.28942780212196],
      [0.550333693045502, 50.765738837275876],
      [-0.78751746255864, 50.77498891865622],
      [-2.489997524414377, 50.50001862243124],
      [-2.956273972984036, 50.696879991247016],
      [-3.617448085942328, 50.22835561787272],
      [-4.542507900399244, 50.34183706318566],
      [-5.245023159191135, 49.95999990498108],
      [-5.776566941745301, 50.15967763935682],
      [-4.309989793301838, 51.21000112568916],
      [-3.414850633142123, 51.42600861266925],
      [-3.422719467108323, 51.42684816740609],
      [-4.984367234710874, 51.593466091510976],
      [-5.267295701508885, 51.99140045837458],
      [-4.222346564134853, 52.301355699261364],
      [-4.770013393564113, 52.840004991255626],
      [-4.579999152026915, 53.49500377055517],
      [-3.093830673788659, 53.404547400669685],
      [-3.092079637047106, 53.404440822963544],
      [-2.945008510744344, 53.984999701546684],
      [-3.614700825433034, 54.600936773292574],
      [-3.63000545898933, 54.615012925833014],
      [-4.844169073903004, 54.790971177786844],
      [-5.082526617849226, 55.06160065369937],
      [-4.719112107756644, 55.50847260194348],
      [-5.047980922862109, 55.78398550070752],
      [-5.586397670911139, 55.31114614523682],
      [-5.644998745130181, 56.275014960344805],
      [-6.149980841486354, 56.78500967063354],
      [-5.786824713555291, 57.81884837506465],
      [-5.009998745127575, 58.63001333275005],
      [-4.211494513353557, 58.55084503847917],
      [-3.005004848635281, 58.63500010846633],
    ],
  ],
]).addTo(map);

// add a tile layer

// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 19,
//     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// }).addTo(map);

// L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
//   maxZoom: 19,
//   attribution:
//     '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
// }).addTo(map);

// google street
googleStreet = L.tileLayer('http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

googleStreet.addTo(map);

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

// onClickFunction: Callback function that runs on click.
// tooltipText: (Optional) Hover tooltip text.
// buttonId: (Optional) Unique ID for the button.

// buttons

// You will be expected to provide at least five buttons with each one opening a different modal with a dedicated theme, eg; demographics, wiki, news, currency converter, images, public holidays, weather forecast. See what else you can find that may be of interest.

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

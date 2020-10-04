// Creating map object
var myMap = L.map("mapid", {
  center: [70, 0],
  zoom: 3
});
  
  // tile layer
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/light-v9",
    accessToken: API_KEY
  }).addTo(myMap);


// var baseMaps = {
//     "Light Map": lightmap
//   };  

// Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
// L.control.layers(baseMaps, overlayMaps, {
//   collapsed: false
// }).addTo(myMap);

  // Create an overlayMaps object to hold the quakes_occur layer
  // var overlayMaps = {
  //   "Earthquakes": quakes_occur
  // };

  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  // L.control.layers(baseMaps, overlayMaps, {
  //   collapsed: false
  // }).addTo(map);

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson", getMarkers);

function fillColour(data) {
  switch (true) {
    case data > 100:
      return "#ea3c5c";
    case data > 80:
      return "#ea825c";
    case data > 60:
      return "#ee8c01";
    case data > 40:
      return "#eecc00";
    case data > 20:
      return "#d5ee00";
    default:
      return "#97ee00";
  }
}

function getMarkers(response) {

  var quake_data = response.features;
  var quakeMarkers = [];
  // var quakeMarkers = L.markerClusterGroup();
  for (var index = 0; index < quake_data.length; index++) {
        var quake = quake_data[index];
        // quakeMarkers.addLayer(L.marker([quake.geometry.coordinates[0], quake.geometry.coordinates[1]], radius = quake.properties.mag, fillColor = "#ea2c2c"))
        var quakeMarker = L.circleMarker([quake.geometry.coordinates[0], quake.geometry.coordinates[1]], {radius: quake.properties.mag*5, fillColor: fillColour(quake.geometry.coordinates[2])})
      .bindPopup("<h3>" + quake.properties.title + "<h3><h3>Magnitude: " + quake.properties.mag + "</h3>");
      
      quakeMarkers.push(quakeMarker);

      // console.log(quakeMarkers)
  };
L.layerGroup(quakeMarkers).addTo(myMap);
// console.log(quakeMarkers[8])
// myMap.addLayer(quakeMarkers);

};

var legend = L.control({ position: "bottomright" });
legend.onAdd = function() {
  var div = L.DomUtil.create("div", "info legend");
  var limits = [-20, 20, 40, 60, 80, 100];
  var colors = ["#97ee00", "#d5ee00", "#eecc00", "#ee8c01", "#ea825c", "#ea3c5c", ];
  var labels = [];

  // Add min & max
  var legendInfo = "<h1>Quake Depth</h1>" +
    "<div class=\"labels\">" +
      "<div class=\"min\">" + limits[0] + "</div>" +
      "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
    "</div>";

  div.innerHTML = legendInfo;

  limits.forEach(function(limit, index) {
    labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
  });

  div.innerHTML += "<ul>" + labels.join("") + "</ul>";
  return div;
};

// Adding legend to the map
legend.addTo(myMap);






// Perform an API call to the Citi Bike API to get quake information. Call createMarkers when complete
// d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson", createMarkers);

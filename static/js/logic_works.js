


function createMap(quakes) {

  // Create the tile layer that will be the background of our map
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 2,
    id: "mapbox.light",
    accessToken: API_KEY
  });
  

  // Create a baseMaps object to hold the lightmap layer
  var baseMaps = {
    "Light Map": lightmap
  };

  var overlayMaps = {
    "Earthquakes" : quakes
  }

  // Create the map object with options
  var map = L.map("map-id", {
    center: [40.73, -74.0059],
    zoom: 2,
    layers: [lightmap, quakes]
  });

  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
}

function createMarkers(response) {
  //create quake markets layer
  var features = response.features;

  // Initialize an array to hold markers
  var quakeMarkers = [];

  // Loop through the markers array
  for (var index = 0; index < features.length; index++) {
    var feature = features[index];
    var s = new Date(feature.properties.time).toLocaleDateString("en-US")
    var quakeMarker = L.marker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]])
        .bindPopup("<h6>" + feature.properties.place + "<h6><h6>Time: " + s + ", Mag: " + feature.properties.mag)
        ;
    // Add the marker to the quakeMarkers array
    quakeMarkers.push(quakeMarker);
  }
  
  // Create a layer group made from the bike markers array, pass it into the createMap function
  createMap(L.layerGroup(quakeMarkers));
}

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson", createMarkers);



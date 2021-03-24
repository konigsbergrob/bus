// Access token for Mapbox. 
mapboxgl.accessToken = 'pk.eyJ1Ijoia29uaWdzYmVyZ3JvYmVydCIsImEiOiJja20yOWFtZ2UyaWZoMm5uNmFlZjNlNTh6In0.pGJMbQVtu5ql3lU-NQbJCw';

// Places I have lived
const liveStops = [
  // Miami
  {"lng":-80.20239957886486,"lat":25.77545151041714},
  // Georgia
  {"lng":-83.63442110771206,"lat":33.65996868846754},
  // Maine
  {"lng":-69.4754857307313,"lat":45.25507070564859},
  // Detroit
  {"lng":-83.74082437791003,"lat":42.26938669121594},
  // Doral
  {"lng":-80.32767064108975,"lat":25.680127570978954},
  // Detroit
  {"lng":-83.74082437791003,"lat":42.26938669121594},
  // Czech Republic
  {"lng":14.412673371919823,"lat":50.06405179269129},
  // Auburn Hills
  {"lng":-83.21253754533052,"lat":42.66900399341404},
  // Detroit
  {"lng":-83.74082437791003,"lat":42.26938669121594},
  // New York City
  {"lng":-73.99195350898134,"lat":40.72296831683096},
  // Detroit
  {"lng":-83.74082437791003,"lat":42.26938669121594},
  // Miami
  {"lng":-80.20239957886486,"lat":25.77545151041714},
  // Boston
  {"lng":-71.05940633948683,"lat":42.35939970279358},
  // Detroit
  {"lng":-83.74082437791003,"lat":42.26938669121594},
  // Miami
  {"lng":-80.20239957886486,"lat":25.77545151041714},
];

// Creation of map 
let map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: {"lng":-42.41474818226925,"lat":34.8717512331589},
  zoom: 2,
});

// First marker (relates to where I have lived).
let marker = new mapboxgl.Marker().setLngLat([-80.20239957886486, 25.77545151041714]).addTo(map);

// Button #1: Cycle through the places Rob has lived.  
let counter = 0;
function move() {
  setTimeout(() => {
    if(counter === liveStops.length) return; 
    marker.setLngLat(liveStops[counter]);
    counter++;
    move();
  }, 1000)
}

// Get bus data from MBTA. 
async function getBusLocations(){
  const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
  const response = await fetch(url); 
  const json = await response.json(); 
  return json.data;
}

// Create array of all bus markers. 
var busMarkers = [];


async function run(){
// Remove any existing bus markers.
  if (busMarkers!==null) {
    for (var j = busMarkers.length - 1; j >= 0; j--) {
      busMarkers[j].remove();
    }
};
// Pull bus data and add markers. 
  const locations = await getBusLocations();
  let i = 0;
  while (i< locations.length){
    console.log(locations[0].attributes.latitude); 
    let marker2 = new mapboxgl.Marker().setLngLat([locations[i].attributes.longitude, locations[i].attributes.latitude]).addTo(map);
    busMarkers.push(marker2);
    i++;
  }  
  setTimeout(run, 15000); 
};

// Etc.
if (typeof module !== 'undefined') {
  module.exports = { move };
}

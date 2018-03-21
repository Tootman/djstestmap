var mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
var mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZGFuc2ltbW9ucyIsImEiOiJjamRsc2NieTEwYmxnMnhsN3J5a3FoZ3F1In0.m0ct-AGSmSX2zaCMbXl0-w';

var greyscale   = L.tileLayer(mbUrl, {id: 'mapbox.light', attribution: mbAttr});
var streets  = L.tileLayer(mbUrl, {id: 'mapbox.streets',   attribution: mbAttr});
var layer  = L.tileLayer(mbUrl, {id: 'mapbox.satellite',   attribution: mbAttr});


// var grayscale = L.tileLayer(mapboxUrl, {id: 'MapID', attribution: mapboxAttribution}),
    // streets   = L.tileLayer(mapboxUrl, {id: 'MapID', attribution: mapboxAttribution}),
 // layer = L.tileLayer(mbUrl,	{id: 'mapbox.satellite',  	attribution: mbAttr  });






 var map = L.map('map', {
 	center: [39.73, -104.99],
 	zoom: 10,
 	layers: [layer, streets, greyscale]
 });

 var baseMaps = {
    "Greyscale": greyscale,
    "Streets": streets,
    "Sattalite map": layer
};

//
//var overlayMaps = {
 //   "Cities": cities
//};



L.control.layers(baseMaps).addTo(map);

var baseMaps = {
	"<span style='color: gray'>Grayscale</span>": layer

};



/*
var map = L.map('map').setView([51.4379409,-0.3185518], 18);
var layer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZGFuc2ltbW9ucyIsImEiOiJjamRsc2NieTEwYmxnMnhsN3J5a3FoZ3F1In0.m0ct-AGSmSX2zaCMbXl0-w', {
	maxZoom: 22,

	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	id: 'mapbox.satellite',
	accessToken: 'pk.eyJ1IjoiZGFuc2ltbW9ucyIsImEiOiJjamRsc2NieTEwYmxnMnhsN3J5a3FoZ3F1In0.m0ct-AGSmSX2zaCMbXl0-w',
	useCache: true,
	crossOrigin: true
});

*/




/*
var layer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZGFuc2ltbW9ucyIsImEiOiJjamRsc2NieTEwYmxnMnhsN3J5a3FoZ3F1In0.m0ct-AGSmSX2zaCMbXl0-w', {
	maxZoom: 22,
	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	id: 'mapbox.satellite',
	accessToken: 'pk.eyJ1IjoiZGFuc2ltbW9ucyIsImEiOiJjamRsc2NieTEwYmxnMnhsN3J5a3FoZ3F1In0.m0ct-AGSmSX2zaCMbXl0-w',
	useCache: true,
	crossOrigin: true
});

*/


// Listen to cache hits and misses and spam the console
// The cache hits and misses are only from this layer, not from the WMS layer.
layer.on('tilecachehit',function(ev){
	console.log('Cache hit: ', ev.url);
});
layer.on('tilecachemiss',function(ev){
	console.log('Cache miss: ', ev.url);
});
layer.on('tilecacheerror',function(ev){
	console.log('Cache error: ', ev.tile, ev.error);
});

layer.addTo(map);

var wmsLayer = L.tileLayer.wms("http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi", {
	layers: 'nexrad-n0r-900913',
	format: 'image/png',
	transparent: true,
	attribution: "Weather data © 2012 IEM Nexrad",

	useCache: true,
			maxAge: 30 * 1000,	// 30 seconds
			crossOrigin: true
		});

wmsLayer.addTo(map);

var lc = L.control.locate({
	position: 'topright',
	strings: {
		title: "Show me where I am, yo!"
	}
}).addTo(map);



// Seed the base layer, for the whole world, for zoom levels 0 through 4.
function seed() {
	var bbox = L.latLngBounds(L.latLng(-85,-180), L.latLng(85,180));
	layer.seed( bbox, 0, 4 );
}
// Display seed progress on console
layer.on('seedprogress', function(seedData){
	var percent = 100 - Math.floor(seedData.remainingLength / seedData.queueLength * 100);
	console.log('Seeding ' + percent + '% done');
});
layer.on('seedend', function(seedData){
	console.log('Cache seeding complete');
});


var sidebar = L.control.sidebar('sidebar', {
	position: 'left',
	closeButton: 'true'
});

map.addControl(sidebar);

var sidebarMarker = L.marker([51.4379409, -0.3185518],
	{title:'My only marker'}
	).addTo(map).on('click', function () {
		sidebar.setContent("HEllo " + sidebarMarker.options.title);
		sidebar.toggle();
		console.log ("clicked");

	});

	var sidebarMarker2 = L.marker([51.4389529, -0.3195528],
		{title:'marker2'}
		).addTo(map).on('click', function () {
			sidebar.setContent("HEllo " + sidebarMarker2.options.title);
			sidebar.toggle();
			console.log ("clicked");

		});
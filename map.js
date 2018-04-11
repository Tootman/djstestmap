"use strict";

// Overview: when a feature on the geo layer is clicked it's feature object is copied to 'selectedFeature', which is watched by knowckout,
// and binded to elements on the flyout form
//
//
//
//
var App = {}; // wrapper namespace with knockout (ko) observables
App.selectedFeature  = {
    asset: ko.observable(),
    description: ko.observable(),
    condition: ko.observable(),
    instructions: ko.observable(),
    jobDone: ko.observable()
};

ko.applyBindings(App);

App.mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
App.mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZGFuc2ltbW9ucyIsImEiOiJjamRsc2NieTEwYmxnMnhsN3J5a3FoZ3F1In0.m0ct-AGSmSX2zaCMbXl0-w';

App.greyscaleLayer = L.tileLayer(App.mbUrl, { id: 'mapbox.light', attribution: App.mbAttr, maxZoom: 22 });
App.streetsLayer = L.tileLayer(App.mbUrl, { id: 'mapbox.streets', attribution: App.mbAttr, maxZoom: 22 });
App.satLayer = L.tileLayer(App.mbUrl, { id: 'mapbox.satellite', attribution: App.mbAttr, maxZoom: 22 });

App.myLayerGroup = L.layerGroup();


// create map with 3 layers
App.map = L.map('map', {
    center: [51.4379409, -0.3185518],
    zoom: 20,
    maxZoom: 22,
    layers: [App.satLayer, App.streetsLayer, App.greyscaleLayer]
});

// group of basemap layers
App.baseMaps = {
    "Greyscale": App.greyscaleLayer,
    "Streets": App.streetsLayer,
    "Satallite map": App.satLayer
};

// group of overlay layers
App.overlayMaps = {
    "My Features": App.myLayerGroup
};

// Add the layers control
L.control.layers(App.baseMaps, App.overlayMaps).addTo(App.map);


// -----------------------------

/*
var myData = loadJSON('ham-green-demo.json',
         function(data) { console.log(data); },
         function(xhr) { console.error(xhr); }
);

console.log("myData: " + myData);
*/

// -------------------------
var data = 8;
console.log("init data val: " + data);

fetch('ham-green-demo.json')
    .then(
        function(response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                return;
            }

            // Examine the text in the response
            // access data eg App.geoData.features[5].properties.Asset
            response.json().then(function(data) {
                console.log(data);
                App.geoData = data;
                console.log("App.myData inside func: " + App.geoData);
                App.geoLayer = L.geoJson(data, {

                    onEachFeature: function(feature, layer) {
                        console.log(feature.properties.Asset);

                        layer.on('click', function() {
                            whenGeoFeatureClicked(feature);
                            //App.selectedFeature (feature); // ie sent to object that is watched by knockout
                            App.selectedFeature.asset(feature.properties.Asset);
                            console.log("clicked: " + feature.properties.Asset);
                        });
                    }
                });
                App.map.addLayer(App.geoLayer);
                App.myLayerGroup.addLayer(App.geoLayer);
                //L.control.addOverlay(layer, name)
            });
        }
    )
    .catch(function(err) {
        console.log('Fetch Error :-S', err);
    });

console.log("final data val: " + data);
console.log("App.myData: " + App.geoData);



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

/*
layer.on('tilecachehit', function(ev) {
    console.log('Cache hit: ', ev.url);
});
layer.on('tilecachemiss', function(ev) {
    console.log('Cache miss: ', ev.url);
});
layer.on('tilecacheerror', function(ev) {
    console.log('Cache error: ', ev.tile, ev.error);
});

layer.addTo(App.map);

*/

/*
App.wmsLayer = L.tileLayer.wms("http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi", {
    layers: 'nexrad-n0r-900913',
    format: 'image/png',
    transparent: true,
    attribution: "Weather data © 2012 IEM Nexrad",

    useCache: true,
    maxAge: 30 * 1000, // 30 seconds
    crossOrigin: true
});

// App.wmsLayer.addTo(map);
*/

App.lc = L.control.locate({
    position: 'topright',
    strings: {
        title: "Show me where I am, yo!"
    }
}).addTo(App.map);


// Seed the base layer, for the whole world, for zoom levels 0 through 4.
/*
function seed() {
    bbox = L.latLngBounds(L.latLng(-85, -180), L.latLng(85, 180));
    layer.seed(App.bbox, 0, 4);
}
// Display seed progress on console
layer.on('seedprogress', function(seedData) {
    var percent = 100 - Math.floor(seedData.remainingLength / seedData.queueLength * 100);
    console.log('Seeding ' + percent + '% done');
});
layer.on('seedend', function(seedData) {
    console.log('Cache seeding complete');
});
*/

// sidebar plugin
App.sidebar = L.control.sidebar('sidebar', {
    position: 'left',
    closeButton: 'true'
});
App.map.addControl(App.sidebar);

// window.onload = function() {

/*
App.sidebarMarker = L.marker([51.4379409, -0.3185518], { title: 'Litter Bin' }).addTo(App.myLayerGroup).on('click', function() {
    //sidebar.setContent("Information,  instructions, option to edit or take photo -  everything regarding the " + sidebarMarker.options.title);

    App.sidebar.setContent(document.getElementById("test-div").innerHTML);
    // console.log("test-div: " + document.querySelector("test-div"));

    App.sidebar.toggle();
    console.log("clicked marker");
});

App.sidebarMarker2 = L.marker([51.4389529, -0.3195528], { title: 'Bench' }).addTo(App.myLayerGroup).on('click', function() {
    App.sidebar.setContent(document.getElementById("test-div").innerHTML);
    App.sidebar.toggle();
    console.log("clicked marker2");
    console.log("App.myData: " + App.myData);
});
*/

L.Control.watermark = L.Control.extend({
    onAdd: (e) => {
        App.watermark = L.DomUtil.create('IMG', 'custom-control');
        App.watermark.src = 'ORCL-logo-cropped.png';
        App.watermark.style.opacity = 0.3;
        App.watermark.style.background = "none";
        // watermark.style.width = '200px';
        return App.watermark;
    },
    onRemove: (e) => {
        // Nothing to do here
    }
});
L.control.watermark = (opts) => { return new L.Control.watermark(opts) };
L.control.watermark({ position: 'bottomright' }).addTo(App.map);
L.control.scale().addTo(App.map);

L.Control.myControl = L.Control.extend({
    onAdd: (e) => {
        const myControl_div = L.DomUtil.create('div', 'custom-control');
        myControl_div.onclick = function() {
            console.log("custom control clicked!");
            alert("Load Shapefile or do something else");
        }
        return myControl_div;
    },
    onRemove: (e) => {
        // Nothing to do here
    }
});

L.control.myControl = (opts) => { return new L.Control.myControl(opts) };
L.control.myControl({ position: 'bottomright' }).addTo(App.map);

function initGeoLayers() {
    console.log("initGeoLayers called");
}

function whenGeoFeatureClicked(feature) {
    App.sidebar.setContent(document.getElementById("test-div").innerHTML);
    App.sidebar.toggle();
}


// --------------------------------------------- helpers ------




/*
function loadJSON(path, success, error)
{
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success)
                     success(JSON.parse(xhr.responseText));
            } else {
                if (error)
                    error(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}
*/
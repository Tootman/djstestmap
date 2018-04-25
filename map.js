"use strict";
// Overview: when a feature on the geo layer is clicked it is assigned to  App.selectedFeature for interaction

let App = {
    mbAttr: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    mbUrl: 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZGFuc2ltbW9ucyIsImEiOiJjamRsc2NieTEwYmxnMnhsN3J5a3FoZ3F1In0.m0ct-AGSmSX2zaCMbXl0-w'
};



// -- instantiate map objects (layers etc)
// App.greyscaleLayer = L.tileLayer(App.mbUrl, { id: 'mapbox.light', attribution: App.mbAttr, maxZoom: 22 }); //djs!
App.streetsLayer = L.tileLayer(App.mbUrl, { id: 'mapbox.streets', attribution: App.mbAttr, maxZoom: 22 });
// App.satLayer = L.tileLayer(App.mbUrl, { id: 'mapbox.satellite', attribution: App.mbAttr, maxZoom: 22 }); //djs!


// create map with 3 layers
App.map = L.map('map', {
    center: [51.4384332, -0.3147865],
    zoom: 18,
    maxZoom: 22,
    // layers: [App.satLayer] //djs
    layers: [App.streetsLayer] //djs
});



// -------------------- GPS location plugin
App.lc = L.control.locate({
    position: 'topright',
    strings: {
        title: "My location (will use GPS if available)"
    }
}).addTo(App.map);


let debugControl_div;
//debugControl_div.innerHTML += "<br>";
// debugControl_div.style = "background-color:white";


App.map.on('locationfound', onLocationFound);
App.map.on('locationerror', onLocationError);

function onLocationFound(e) {
    debugToMap("type: " + e.type + ", accuracy: " + e.accuracy + "<br>");
    console.log("location success");
    console.log(e);
};

function onLocationError() {
    debugToMap("location failed");
};


function debugToMap(message) {
    let d = new Date();

    debugControl_div.innerHTML += d.getMinutes() + ":" + d.getSeconds() + " " + message + "<br>";
}

L.Control.debugControl = L.Control.extend({
    onAdd: (e) => {
        debugControl_div = L.DomUtil.create('div');
        debugControl_div.onclick = function() {
            console.log("debug control clicked!");

            //alert("Load Shapefile or do something else");
        }

        debugControl_div.style = "background-color:white; max-width:50vw";
        return debugControl_div;
    }
});
L.control.debugControl = (opts) => { return new L.Control.debugControl(opts) };
L.control.debugControl({
    position: 'bottomleft'
}).addTo(App.map);




"use strict";
// Overview: when a feature on the geo layer is clicked it is assigned to  App.selectedFeature for interaction

//
var App = {
    mbAttr: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    mbUrl: 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZGFuc2ltbW9ucyIsImEiOiJjamRsc2NieTEwYmxnMnhsN3J5a3FoZ3F1In0.m0ct-AGSmSX2zaCMbXl0-w',
    taskCompleteStyle: {
        fillColor: 'grey',
        color: 'black'
    },
    taskNotCompleteStyle: {
        fillColor: 'red',
        color: 'red'
    },
    whenGeoFeatureClicked: function() {
        let p = App.selectedFeature.properties;
        App.sidebar.setContent(document.getElementById("form-template").innerHTML);
        document.getElementById('form-asset').value = p.Asset;
        document.getElementById('form-description').value = p.description;
        document.getElementById('form-instructions').value = p.instructions;
        document.getElementById('form-condition').value = p.condition;
        document.getElementById('form-height').value = p.height;
        document.getElementById('task-completed-input').checked = p.taskCompleted;
        console.log(" read task completed: " + p.taskCompleted)
        App.sidebar.show();
    },
    submitForm: function() {
        let p = App.selectedFeature.properties;
        p.Asset = document.getElementById('form-asset').value
        p.description = document.getElementById('form-description').value;
        p.instructions = document.getElementById('form-instructions').value;
        p.condition = document.getElementById('form-condition').value;
        p.height = document.getElementById('form-height').value;
        p.taskCompleted = document.getElementById('task-completed-input').checked;
        console.log(" write task completed: " + p.taskCompleted)
        App.sidebar.hide();
        this.assignTaskCompletedStyle(this.selectedLayer, p);
        this.map.closePopup();
        this.selectedFeature = null;
        console.log("toGeo: " + JSON.stringify(this.geoLayer.toGeoJSON()));
        localStorage.setItem("geoJSON", JSON.stringify(this.geoLayer.toGeoJSON()));

    },
    assignTaskCompletedStyle: function(layer, featureProperty) {
        if (featureProperty.taskCompleted == true) {
            layer.setStyle(this.taskCompleteStyle);
        } else {
            layer.setStyle(this.taskNotCompleteStyle);
        }
    },
    loadGeoJSONLayer: function(myFile) {
        fetch(myFile)
            .then(
                function(response) {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                            response.status);
                        return;
                    }
                    response.json().then(function(data) {
                        App.setupGeoLayer(data);
                        console.log("fetch called!");
                    })
                }
            )
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
            });
    }
};


App.setupGeoLayer = function(myJSONdata) {
    // 
    App.geoLayer = L.geoJson(myJSONdata, {
        onEachFeature: function(feature, layer) {
            console.log(feature.properties.Asset);
            console.log("clicked: " + feature.properties.Asset);
            App.assignTaskCompletedStyle(layer, feature.properties);
            layer.on('click', function() {
                App.selectedFeature = feature; // expose selected feature and layer 
                App.selectedLayer = layer;
                App.whenGeoFeatureClicked();
            });
            if (feature.properties && feature.properties.Asset) {
                layer.bindPopup(feature.properties.Asset);
            }
        },
        style: function(feature) {
            return {
                //color: 'red',
                //fillColor: "red",
                fillOpacity: 0.6
            };
        },
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng, {
                radius: 8,
                //color: 'red',
               // fillColor: 'red',
                stroke: false,
                weight: 2,
                opacity: 1,
                weight: 4,
                fillOpacity: 1
            });
        },
        interactive: true
    });
    App.map.addLayer(App.geoLayer);
    App.myLayerGroup.addLayer(App.geoLayer);
};


// -- instantiate map objects (layers etc)

App.greyscaleLayer = L.tileLayer(App.mbUrl, { id: 'mapbox.light', attribution: App.mbAttr, maxZoom: 22 });
App.streetsLayer = L.tileLayer(App.mbUrl, { id: 'mapbox.streets', attribution: App.mbAttr, maxZoom: 22 });
App.satLayer = L.tileLayer(App.mbUrl, { id: 'mapbox.satellite', attribution: App.mbAttr, maxZoom: 22 });
App.myLayerGroup = L.layerGroup();

// create map with 3 layers
App.map = L.map('map', {
    center: [51.4384332, -0.3147865],
    zoom: 18,
    maxZoom: 22,
    layers: [App.satLayer, App.streetsLayer, App.greyscaleLayer]
});

// create group of basemap layers
App.baseMaps = {
    "Greyscale": App.greyscaleLayer,
    "Streets": App.streetsLayer,
    "Satallite map": App.satLayer
};

// create group of overlay layers
App.overlayMaps = {
    "Ham Green": App.myLayerGroup
};

if (localStorage.getItem("geoJSON") == null) {
    App.loadGeoJSONLayer("ham-green-demo.json");
    console.log("no localstoge so retrieving fresh file");
} else {
    console.log("reading json from Local storage");
    App.setupGeoLayer(JSON.parse(localStorage.getItem("geoJSON")));
}


//  ------------------------ instantiate leaflet controls

// Add the layers control
L.control.layers(App.baseMaps, App.overlayMaps).addTo(App.map);

// ------sidebar controll plugin
App.sidebar = L.control.sidebar('sidebar', {
    position: 'left',
    closeButton: 'true',
    autoPan: false
});
App.map.addControl(App.sidebar);

// -------------------- GPS location plugin
App.lc = L.control.locate({
    position: 'topright',
    strings: {
        title: "My location (will use GPS if available)"
    }
}).addTo(App.map);

// ------------------------------------------- logo watermark ------------ 
L.Control.watermark = L.Control.extend({
    onAdd: (e) => {
        App.watermark = L.DomUtil.create('IMG', 'custom-control');
        App.watermark.src = 'ORCL-logo-cropped.png';
        App.watermark.style.opacity = 0.3;
        App.watermark.style.background = "none";
        return App.watermark;
    }
});
L.control.watermark = (opts) => { return new L.Control.watermark(opts) };
L.control.watermark({ position: 'bottomright' }).addTo(App.map);

// ----------------------------------- other  ---------
L.control.scale().addTo(App.map);

// --------------------------------------------- my custom control
L.Control.myControl = L.Control.extend({
    onAdd: (e) => {
        const myControl_div = L.DomUtil.create('div', 'custom-control');
        myControl_div.onclick = function() {
            console.log("custom control clicked!");
            App.sidebar.setContent(document.getElementById("settings-template").innerHTML);
            App.sidebar.show();
            //alert("Load Shapefile or do something else");


        }
        return myControl_div;
    }
});
L.control.myControl = (opts) => { return new L.Control.myControl(opts) };
L.control.myControl({
    position: 'bottomright'
}).addTo(App.map);

// ---------------------------------- map events ---

App.map.on('click', onMapClick);

function onMapClick(e) {
    //App.sidebar.hide();
    console.log(e);
};

App.map.on('popupclose', function(e) {
    App.sidebar.hide();
    App.selectedFeature = null;
});
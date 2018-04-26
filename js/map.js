"use strict";
// Overview: when a feature on the geo layer is clicked it is assigned to  App.selectedFeature for interaction

let App = {
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
    settings: {
        demoJSONmapdata: 'ham-green-demo.json',
        uploadjsonURL: 'https://geo.danieljsimmons.uk/dan1/upload/uploadjson.php',
        assetConditionOptions: [6, 5, 4, 3, 2, 1, "n/a"]
    },
    whenGeoFeatureClicked: function() {
        function renderSideBar() {
            App.sidebar.setContent(document.getElementById("form-template").innerHTML)
            const cond = document.getElementById('form-condition')
            let options = App.settings.assetConditionOptions;
            options.forEach(function(item) {
                let opt = document.createElement('option');
                opt.innerText = item
                cond.appendChild(opt)
            });
        }

        let p = App.selectedFeature.properties;
        renderSideBar()
        document.getElementById('form-asset').value = p.Asset
        document.getElementById('form-description').value = p.description
        document.getElementById('form-instructions').value = p.instructions;
        document.getElementById('form-condition').value = p.condition;
        document.getElementById('form-height').value = p.height;
        document.getElementById('task-completed-input').checked = p.taskCompleted;
        if (p.photo !== null && p.photo !== undefined) {
            this.getPhoto(p.photo);
        }
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
            layer.setStyle(myMap.settings.symbology.taskCompleteStyle);
        } else {
            layer.setStyle(myMap.settings.symbology.taskNotCompleteStyle);
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
    },
    resetMap: function() {
        localStorage.removeItem("geoJSON");
        App.geoLayer = {};
        App.loadGeoJSONLayer(demoJSONmapdata);
    },
    getPhoto: function(photoURL) {
        fetch(photoURL)
            .then(res => res.blob()) // Gets the response and returns it as a blob
            .then(blob => {
                console.log("blob!");
                const objectURL = URL.createObjectURL(blob);
                const myImage = new Image(350);
                myImage.src = objectURL;
                myImage.css = "width:500px";
                //document.getElementById('fetch').appendChild(myImage)
                document.getElementById('photo-div').appendChild(myImage);
            });
    },
    uploadChanges: function() {
        const url = App.settings.uploadjsonURL;
        fetch(url, {
                method: 'POST', // or 'PUT'
                body: "name=" + JSON.stringify(this.geoLayer.toGeoJSON()), // data can be `string` or {object}!
                headers: {
                    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                }
            }).then(res => {
                console.log("json sent ok apparently!");
            })
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));
    },

    initSettingsControl: function() {
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
    },

    setupGeoLayer: function(myJSONdata) {
        // 
        App.geoLayer = L.geoJson(myJSONdata, {
            onEachFeature: function(feature, layer) {
                console.log("clicked: " + feature.properties.Asset);
                App.assignTaskCompletedStyle(layer, feature.properties);
                layer.on('click', function() {
                    App.selectedFeature = feature; // expose selected feature and layer 
                    App.selectedLayer = layer;
                    App.whenGeoFeatureClicked();
                });
                //layer.bindPopup("<button> Edit</button>");
                layer.bindTooltip(feature.properties.Asset, { className: 'tool-tip-class' });

            },
            style: function(feature) {
                return {
                    fillOpacity: 0.6
                };
            },
            pointToLayer: function(feature, latlng) {
                return L.circleMarker(latlng, {
                    radius: 8,
                    stroke: false,
                    weight: 2,
                    opacity: 1,
                    weight: 4,
                    fillOpacity: 1
                });
            },
            interactive: true
        });
        // App.map.addLayer(App.geoLayer);
        App.myLayerGroup.addLayer(App.geoLayer);
    }
};

let myMap = {
    settings: {
        symbology: {
            taskCompleteStyle: {
                fillColor: 'grey',
                color: 'black'
            },
            taskNotCompleteStyle: {
                fillColor: 'red',
                color: 'red'
            }
        }
    }
}




function initLogoWatermark() {
    L.Control.watermark = L.Control.extend({
        onAdd: (e) => {
            const watermark = L.DomUtil.create('IMG', 'custom-control');
            watermark.src = 'ORCL-logo-cropped.png';
            watermark.style.opacity = 0.3;
            watermark.style.background = "none";
            return watermark;
        }
    });
    L.control.watermark = (opts) => { return new L.Control.watermark(opts) };
    L.control.watermark({ position: 'bottomright' }).addTo(App.map);
}

function initDebugControl() {
    let debugControl_div;
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
}


// -- instantiate map objects (layers etc)
function setupBaseLayer() {
    App.greyscaleLayer = L.tileLayer(App.mbUrl, { id: 'mapbox.light', attribution: App.mbAttr, maxZoom: 22 });
    App.streetsLayer = L.tileLayer(App.mbUrl, { id: 'mapbox.streets', attribution: App.mbAttr, maxZoom: 22 });
    App.satLayer = L.tileLayer(App.mbUrl, { id: 'mapbox.satellite', attribution: App.mbAttr, maxZoom: 22 });
    App.myLayerGroup = L.layerGroup();

    // create map with 3 layers
    App.map = L.map('map', {
        center: [51.4384332, -0.3147865],
        zoom: 18,
        maxZoom: 22,
        layers: [App.streetsLayer, App.myLayerGroup] // loads with this layer initially
    });

    // create group of basemap layers
    App.baseMaps = {
        "Greyscale": App.greyscaleLayer,
        "Streets": App.streetsLayer,
        "Satellite": App.satLayer
    };

    // create group of overlay layers
    App.overlayMaps = {
        "Ham Green": App.myLayerGroup
    };
}

// --------------------------------------- setup controls  

setupBaseLayer()
initDebugControl()
App.initSettingsControl()
L.control.scale().addTo(App.map)
initLogoWatermark()
setupSideBar()
checkLocalStorage() // loads GeoJSON Browser's local storage if available otherwise loads local (initial) file

L.control.layers(App.baseMaps, App.overlayMaps).addTo(App.map);

function checkLocalStorage() {
    if (localStorage.getItem("geoJSON") == null) {
        App.loadGeoJSONLayer(App.settings.demoJSONmapdata);
        console.log("no localstoge so retrieving fresh file");
    } else {
        console.log("reading json from Local storage");
        App.setupGeoLayer(JSON.parse(localStorage.getItem("geoJSON")));
    }
}

//  ------------------------ instantiate leaflet controls


// ------sidebar controll plugin
function setupSideBar() {
    App.sidebar = L.control.sidebar('sidebar', {
        position: 'left',
        closeButton: 'true',
        autoPan: false
    });
    App.map.addControl(App.sidebar);
}

// -------------------- GPS location plugin
App.lc = L.control.locate({
    position: 'topright',
    strings: {
        title: "My location (will use GPS if available)"
    },
    //setView: 'Once'
    // layer: App.myLayerGroup
}).addTo(App.map);

// ------------------------------------------- logo watermark ------------ 


// --------------------------------------------- my custom control -----


// ------------------------------------------ temp control testing location problem ---


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
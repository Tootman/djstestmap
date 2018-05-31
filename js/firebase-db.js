// Get a reference to the database service
// Initialize Firebase

var config = {
    apiKey: "AIzaSyB977vJdWTGA-JJ03xotQkeu8X4_Ds_BLQ",
    authDomain: "fir-realtime-db-24299.firebaseapp.com",
    databaseURL: "https://fir-realtime-db-24299.firebaseio.com",
    projectId: "fir-realtime-db-24299",
    storageBucket: "fir-realtime-db-24299.appspot.com",
    messagingSenderId: "546067641349"
};

firebase.initializeApp(config);
database = firebase.database();
myOb = {} // after



document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        // document ready

        console.log("ok ready")
    }
};


// literall writing to db: 
//database.ref('users/settings').set({ color: 'red', size: 'large' })

// literal reading database, using a callback on database data change
// database.ref('users/').on('value', function(snapshot) {
//     console.log(snapshot)
//});

// literal reading database, poling the datase for a snapshot
//database.ref('/users/settings').once('value').then(function(snapshot) {
//    console.log(snapshot.val().color)
//});

// retriveMapIndex()

function exportMapWithRelated() {
    //
    const mapRefPath = "App/Maps/-LBlxVOu7-67DEsWi7yP"
    let relDataSnap = {}
    let mapSnap = {}
    let mapToExport = {}
    /*
    const relDataPath = String(mapRefPath + "/Related")
    relatedData = database.ref(relDataPath).once('value').then(
        function(snapshot) {
            relDataSnap = snapshot.val()
            console.log("path: ", relDataPath)
            console.log("val: ", relDataSnap)

        }).then(
        database.ref(mapRefPath).once('value').then(
            function(snapshot) {
                const mapDataSnap = snapshot.val()
                console.log("path: ", mapRefPath)
                console.log("val: ", mapDataSnap)

            })
    );
    */
    database.ref(mapRefPath).once('value').then(
        function(snapshot) {
            mapSnap = snapshot.val()
            console.log("path: ", mapRefPath)
            console.log("val: ", mapSnap)

            //mapToExport.Geo.features = attachRelatedtoFeatures(mapSnap)
            mapToExport = attachRelatedtoFeatures(mapSnap)
            //saveShp(mapToExport.Geo)
            console.log("Map to export:", mapToExport)
            writeJSONtoFile(mapToExport.Geo)
        });

    /*  // iterates through each feature  - but some feature may not have relate so wasteful
    function attachRelatedtoFeatures(mapSnapShot) {
        const featureSet = mapSnapShot.Geo.features
        const relatedDataSet = mapSnapShot.Related
        featureSet.forEach(function(feature) {
            // console.log(feature.properties['OBJECTID'])
            objectID = feature.properties['OBJECTID']
            relDataID = String(objectID + feature.geometry.type)
            console.log(relDataID)
            //debugger;
            relDataSet = relatedDataSet[relDataID]
            lastRelDataItem = getLastRelDataItem(relDataSet)
            console.log(lastRelDataItem)
        })
    }
    const  getLastRelDataItem = myRelDataSet=>{
        const keys = Object.keys(myRelDataSet)
        const lastDataItem = myRelDataSet[keys(keys.length -1)]
        console.log("hello from lastRelDataItem:", lastDataItem)
    }
    */

    // iterates through each feature  - but some feature may not have relate so wasteful
    function attachRelatedtoFeatures(mapSnapShot) {
        // return the snapshot modified with related data added
        const featureSet = mapSnapShot.Geo.features
        const related = mapSnapShot.Related
        //const newMapSnapShot = {} // will include latest related
        //featureSet.forEach(function(relDataVal,relDataKey) {
        /*
        for (relDataSet in related) {
            //console.log(relDataSubSet, relatedDataSet[relDataSubSet])
            const rel = 
            getFeatureForRelData(relDataSet)
        }
        */
        const ObtoRelLookUp = createObIDtoRelIDLookup(featureSet, related)
        console.log(ObtoRelLookUp)
        const relKeys = Object.keys(related)
        relKeys.forEach(function(key) {
            const lastItem = getLastRelDataItem(related[key])
            console.log("key: ", key, "value: ", lastItem)
            // fetch the matching feature
            const matchingFeature = featureSet[ObtoRelLookUp[key]]
            console.log("matching feature:", matchingFeature)
            addNewPropsToFeature(matchingFeature, lastItem)
        })
        // console.log(feature.properties['OBJECTID'])
        //objectID = feature.properties['OBJECTID']
        //relDataID = String(objectID + feature.geometry.type)

        //console.log(relDataVal,relDataKey)
        //debugger;
        //relDataSet = relatedDataSet[relDataID]
        //lastRelDataItem = getLastRelDataItem(relDataSet)
        //console.log(lastRelDataItem)
        return mapSnapShot;
    }

    /*
    const getLastRelDataItem = myRelDataSet => {
        const keys = Object.keys(myRelDataSet)
        const lastDataItem = myRelDataSet[keys(keys.length - 1)]
        console.log("hello from lastRelDataItem:", lastDataItem)
    }
    */

    const getLastRelDataItem = RelDataSet => {
        const sortedKeys = Object.keys(RelDataSet).sort()
        const lastDataItem = RelDataSet[sortedKeys[sortedKeys.length - 1]]
        //console.log("hello from lastRelDataItem:", lastDataItem)
        return lastDataItem
    }

    const addNewPropsToFeature = (feature, relatedPropSet) => {
        const propSet = Object.keys(relatedPropSet)
        propSet.forEach(prop => {
            try {
                feature.properties[prop] = relatedPropSet[prop]
            } catch {
                console.log("couldn attach related data for ", prop)
            }
        })
        return feature;
    }


    const getFeatureForRelData = relData => {
        console.log("from getFeat:", relData)

    }
    const createObIDtoRelIDLookup = (featureSet, related) => {
        console.log("hello from lookup")
        // iterate through the feature set and return a new array 

        //array = []
        dict = {}
        featureSet.forEach(function(item, key) {
            obID = String(item.properties.OBJECTID + item.geometry.type)

            dict[obID] = key
        })
        return dict;
    }

    const saveShp = (geoJSON) => {
        console.log("saveShp GoeJSON:", geoJSON)
        shpwrite.download(geoJSON)
    }

    const writeJSONtoFile = (geoJSON) => {
        const file = new Blob([JSON.stringify(geoJSON)], {
            type: 'application/json'
        })
        const url = URL.createObjectURL(file)
        const a = document.createElement('a')
        a.href = url
        a.download = "shapefile-download.json"
        a.click()
    }
}


function getMapGeo(path) {

}



function fetchOnce() {
    nodePath = "App/RelatedData/-LBlxVOu7-67DEsWi7yP"
    database.ref(nodePath).once('value')
        .then(function(snapshot) {
            console.log("snap: ", snapshot)
            console.log("snap val: ", snapshot.val())
            myOb = snapshot.val()
        }).catch(function(error) {
            console.log("My Error: " + error.message);
        })
}



function retriveMapIndex() {
    database.ref('/App/Mapindex').once('value')
        .then(function(snapshot) {
            console.log(snapshot)
            console.log(snapshot.val())
            displayMapIndeces(snapshot)
        }).catch(function(error) {
            console.log("My Error: " + error.message);
        })
}

function displayMapIndeces(snapshot) {

    snapshot.val().forEach(
        function(item) {
            const btn = document.createElement("button")
            console.log(item.description)
            btn.setAttribute("value", item.name)
            btn.setAttribute("title", item.description)
            btn.innerHTML = item.name
            maplist.appendChild(btn);
        }
    )
}


function loadJSONFromFile(myFile) {
    fetch(myFile)
        .then(
            function(response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                response.json().then(function(data) {
                    console.log("ok - fetched!")
                    console.log("data");
                    sendToDB("/App/Maps", data)
                    return data;
                })
            }
        )
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        });
}

function sendToDB(nodePath, data) {
    database.ref(nodePath).set({
        "1": data
    });
}

//loadJSONFromFile("ham-green-demo.json")

function btnLogin() {
    const userEmail = document.getElementById('email').value
    const pass = document.getElementById('password').value
    firebase.auth().signInWithEmailAndPassword(userEmail, pass)
        .then(function(user) {
            console.log(user, "signed in!")
        })
        .catch(function(error) {
            console.log("sorry not signed in Error: " + error)

        });
}


function btnLogout() {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        console.log("successfully signed out")
    }, function(error) {
        // An error happened.
        console.log("problem signing out - error: ", error)
    });
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;

        console.log("user status: " + displayName, email, uid, providerData)
        // ...
    } else {
        // User is signed out.
        // ...
        console.log("user not signed in")
    }
});


function writeData(nodePath) {
    // let userId = document.getElementById('user_id').value
    // let name = document.getElementById('user_name').value

    //
    database.ref(nodePath).set({
        username: name
    });
}

function readDataOnce() {
    let nodePath = '/users/settings'
    let myProperty = 'color'
    database.ref(nodePath).once('value').then(function(snapshot) {
        // console.log(snapshot.val().[myProperty])
        // eg console.log(snapshot.val().color)
    });
}




function pushUpOldestFirst(nodePath, data) {
    // takes in array of Related data to be pushed, reverses order then counts backwards
    // so that oldest data is processed first. It removes the successfully uploaded items from the array
    let d = data.reverse()
    console.log("length: " + d.length)
    for (i = d.length - 1; i >= 0; --i) {
        console.log("iterating: " + i)
        database.ref(nodePath).push(d[i])
            .then(function() {
                d.splice(i, 1); // Remove item from list is successfully pushed
            })
            .catch(function(error) {
                console.log("error in pushing to database: " + error)
            })
    }
    return d.reverse() // return the new list with any unpushed records in original order
}

/*
    function PushAllUnsyncedRelatedData(nodePath, data) {
        data.forEach(item) {
            database.ref(nodePath).push(item)
            .catch (function (error){
                console.log("Error! " + error)
            })
        }
    }
    */

var myList = [] // temp var to expose to global
createNewDataRecord = function() {
    const rec = { myTimeStamp: Date() }
    myList.push(rec)
}

function uploadRelatedData() {
    const nodePath = "App/test/Maps/"
    //myList = pushUpOldestFirst(myList)
    myList = { timestamp: Date() }
    if (navigator.onLine === true) {
        myList = pushUpOldestFirst(nodePath, myList)
        console.log("navigator online")
    } else {
        console.log("sorry offline - try later")
    }

}

function onlineStatus(status) {
    AppOnline = true
}


function testRelatedData() {
    const nodePath = "App/test/Maps/djs/"
    let Ob = { myTimeStamp: Date() }
    database.ref(nodePath).push(Ob)
        .then(function() {
            console.log("ok pushed")
        })
        .catch(function(error) {
            console.log("error in pushing to database: " + error)
        })
}


window.addEventListener('online', function() { console.log("Online!") });
window.addEventListener('offline', function() { console.log("Offline!") });
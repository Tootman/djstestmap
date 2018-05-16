# djstestmap

## Features ##
 - Registered users login - to allow Editing maps and adding related data
  - Two demo maps available 
  - Save Map to Firebase database
   - Symbology: if 'completed' is false then set symbology to Highlight color, else set to grey
   - Related Data
    - - Add Related data to selected feature
    - - Is user is connected to network then Upload dRelated data to Firebase (using OBJECTID as key)
    - - Store queue of unSynced modified features, and attempt upload when user next connected to network

## TODO/  Major bugs ##

  - Issue with exporting shapefile polygons to GeoJSON using QGIS - Polygon geometry must now follow RH rule - need to look into - some maps are now broken
   - Navigator location API now not working as expected - GPS not starting 


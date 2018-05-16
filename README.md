# djstestmap

## Features ##
 - Registered users login - to allow Editing maps and adding related data
  - Two demo maps available 
  - Save Map to Firebase database
   - Symbology based on feature property value
   - Related Data
    - - Add Related data to selected feature
    - - Uploads related data to Firebase, when user is connected to network (using OBJECTID as key), and Store queue of unSynced related data, and attempt upload when user next connected to network (sending in chronological order)

## Bugs and issues ##

  - Issue with exporting shapefile polygons to GeoJSON using QGIS - Polygon geometry must now follow RH rule - need to look into - some maps are now broken
   - Navigator location API now not working as expected - GPS not starting 


## Todo ##
 - Import ShapeFile(s)
  - Export shapeFile(s)
  - console/ UI for inspecting/viewing related Data,
  - Exporting Related Spreadsheet 
  - Populating the source map with set of Related Data and exporting as new shapefile


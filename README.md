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

##Usage ##
 - Open the settings and select one of the demo maps.
  - click on a feature to open the feature editor window, you can Modify a map feature (this will be locked down in future), mark it as completed, or Add Related Data
   - If you are a registered user, and you have logged in, you can save the changes back to the database
    - You can see which tasks you have completed because they change from Red to Grey upon completion


## Todo ##
 - Restructure Map JSON object, and js code so that Map meta info (eg SymbologyProperty, relatedDataproperty, GNSSSettings, siteNotes, dateCreated, Equipment, Staff, lastModified, lockedForEditing, featureKeyProperty and  LabelProperty ), is stored under the map's key, not in the MapIndex
 - Import ShapeFile(s)
  - Export shapeFile(s)
  - console/ UI for inspecting/viewing related Data,
  - Exporting Related Spreadsheet 
  - Populating the source map with set of Related Data and exporting as new shapefile
   - Add photo to Related Data 

## Notes ##
 - See Google slides for Schematics ,documentation

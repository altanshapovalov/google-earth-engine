// 1) Site coords ======================================================================
var siteCoords_features = [
//ee.Feature(ee.Geometry.Point(-48.82830, 67.06650), {name: 'KAN M'})]; // weather station KANM
//ee.Feature(ee.Geometry.Point(-49.9482, 67.0957), {name: 'KAN L'})]; // weather station KANL
ee.Feature(ee.Geometry.Point(-47.0255, 67.0007), {name: 'KAN U'})]; // weather station KANU
//ee.Feature(ee.Geometry.Point(-24.0829, 79.9109), {name: 'KPC L'})]; // weather station 
//ee.Feature(ee.Geometry.Point(-25.1666, 79.8345), {name: 'KPC U'})]; // weather station KANU
//ee.Feature(ee.Geometry.Point(-49.5337, 64.4829), {name: 'NUK L'})]; // weather station 
//ee.Feature(ee.Geometry.Point(-46.852, 61.03), {name: 'QAS L'})]; // weather station 
//ee.Feature(ee.Geometry.Point(-46.8195, 61.1752), {name: 'QAS U'})]; // weather station 
//ee.Feature(ee.Geometry.Point(-26.8176, 72.2258), {name: 'SCO L'})]; // weather station 
//ee.Feature(ee.Geometry.Point(-27.2578, 72.3942), {name: 'SCO U'})]; // weather station 
//ee.Feature(ee.Geometry.Point(-68.2667, 76.3998), {name: 'THU L'})]; // weather station 
//ee.Feature(ee.Geometry.Point(-68.1483, 76.4193), {name: 'THU U'})]; // weather station 
//ee.Feature(ee.Geometry.Point(-54.2955, 72.8932), {name: 'UPE L'})]; // weather station 
//ee.Feature(ee.Geometry.Point(-53.5748, 72.8882), {name: 'UPE U'})]; // weather station 

// 2) Creates a FeatureCollection from coords ==========================================
var pt_collection = ee.FeatureCollection(siteCoords_features);
print('Point', pt_collection);
Map.addLayer(pt_collection); // add point to the map
Map.centerObject(pt_collection, 10);


// 3) Modis Collection =================================================================
var startDate  = ee.Date.fromYMD(2010,1,1); // 2009 for KANL+KANM, 2010 for KANU
var endDate    = ee.Date.fromYMD(2022,1,1);
var dataset    = ee.ImageCollection('MODIS/006/MOD10A1')
                  .filterDate(startDate, endDate)
                  .filterBounds(pt_collection.geometry())
                   .select('Snow_Albedo_Daily_Tile'); // specify the band (dataset)
                   
                   
// 4) show some info ===================================================================
//print("Collection",dataset);


// 5) here comes the magic =============================================================
var geometry = pt_collection.geometry();
var extractData = function(img){
    var stats = img.reduceRegion({
      geometry: geometry,
      scale: 30,
      reducer: ee.Reducer.first()});

    return ee.Feature(geometry, {
      value: stats.get('Snow_Albedo_Daily_Tile'), 
      hourStart: img.get('system:time_start'),
      hourEnd : img.get('system:time_end'),
      date: img.get('system:index'),
      lat: geometry.coordinates().get(0),
      lon: geometry.coordinates().get(1),
      });
    
};

var outputData = dataset.map(extractData);
//print('output',outputData);

// 6) Export ===========================================================================
var exportTask = Export.table.toDrive({
  collection: outputData,
  description: 'albedo_modis_2013_2023_kpcl',
  folder: 'modis_albedo',
  fileNamePrefix: 'albedo_modis_2013_2023_kpcl',
  fileFormat: 'CSV'
});

  

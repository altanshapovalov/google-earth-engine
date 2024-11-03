// 1) Site coords ======================================================================
var siteCoords_features = [
//ee.Feature(ee.Geometry.Point(-49.9513, 67.0955), {name: 'KAN L'})]; // weather station KANL
//ee.Feature(ee.Geometry.Point(-48.8355, 67.067), {name: 'KAN M'})]; // weather station KANM
//ee.Feature(ee.Geometry.Point(-47.0253, 67.0003), {name: 'KAN U'})]; // weather station KANU
//ee.Feature(ee.Geometry.Point(-24.0828, 79.9108), {name: 'KPC L'})]; // weather station KPCL
//ee.Feature(ee.Geometry.Point(-25.1662, 79.8347), {name: 'KPC U'})]; // weather station KPCU
//ee.Feature(ee.Geometry.Point(-49.5358, 64.4822), {name: 'NUK L'})]; // weather station NUKL
//ee.Feature(ee.Geometry.Point(-49.2692, 64.5108), {name: 'NUK U'})]; // weather station NUKU
//ee.Feature(ee.Geometry.Point(-46.8493, 61.0308), {name: 'QAS L'})]; // weather station QASL
//ee.Feature(ee.Geometry.Point(-46.8195, 61.1753), {name: 'QAS U'})]; // weather station QASU
//ee.Feature(ee.Geometry.Point(-26.8182, 72.223), {name: 'SCO L'})]; // weather station SCOL
//ee.Feature(ee.Geometry.Point(-27.2333, 72.3933), {name: 'SCO U'})]; // weather station SCOU
//ee.Feature(ee.Geometry.Point(-68.2665, 76.3998), {name: 'THU L'})]; // weather station THUL
//ee.Feature(ee.Geometry.Point(-68.1463, 76.4197), {name: 'THU U'})]; // weather station THUU
//ee.Feature(ee.Geometry.Point(-54.2955, 72.8932), {name: 'UPE L'})]; // weather station UPEL
ee.Feature(ee.Geometry.Point(-53.5783, 72.8878), {name: 'UPE U'})]; // weather station UPEU


// 2) Creates a FeatureCollection from coords ==========================================
var pt_collection = ee.FeatureCollection(siteCoords_features);
print('Point', pt_collection);
Map.addLayer(pt_collection); // add point to the map
Map.centerObject(pt_collection, 10);

// 3) Modis Collection =================================================================
var startDate  = ee.Date.fromYMD(2009,1,1); // 2009 for KANL+KANM, 2010 for KANU
var endDate    = ee.Date.fromYMD(2023,1,1);
var dataset    = ee.ImageCollection('MODIS/061/MCD43A3')
                  .filterDate(startDate, endDate)
                  .filterBounds(pt_collection.geometry()) // extract just the location
                   .select('Albedo_BSA_shortwave'); // specify the band (dataset)
                   
// 4) here comes the magic =============================================================
var geometry = pt_collection.geometry();
var extractData = function(img){
    var stats = img.reduceRegion({
      geometry: geometry,
      scale: 500,
      reducer: ee.Reducer.mean()});

    return ee.Feature(geometry, {
      value: stats.get('Albedo_BSA_shortwave'), 
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
  description: 'alb',
  folder: 'modis_albedo',
  fileNamePrefix: 'alb',
  fileFormat: 'CSV'
});






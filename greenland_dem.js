// Attempting to retrieve a DEM of Greenland for the 1st figure of my manuscript (map of AWSs)

var dataset = ee.Image('OSU/GIMP/DEM');
var elevation = dataset.select('elevation');
var elevationVis = {
  min: 0.0,
  max: 2000.0,
};

// Define the region of interest
//var roi = ee.Geometry.Rectangle([-51, 66, -46, 68]); // KAN
var roi = ee.Geometry.Rectangle([-69, 76.1, -67, 76.7]); // THU
//var roi = ee.Geometry.Rectangle([-55.5, 72.7, -52, 73.2]); // UPE
//var roi = ee.Geometry.Rectangle([-49.9, 64.2, -48.7, 64.8]); // NUK
//var roi = ee.Geometry.Rectangle([-47.5, 60.8, -46, 61.5]); // QAS 
//var roi = ee.Geometry.Rectangle([-31.5, 71, -20, 74.3]); // SCO 
//var roi = ee.Geometry.Rectangle([-30, 78.5, -20, 81]); // KPC

// Export the DEM as a GeoTIFF
Export.image.toDrive({
 image: elevation,
 description: 'Greenland_DEM',
 scale: 30, // Adjust scale as needed
 region: roi,
 maxPixels: 1e13,
 fileFormat: 'GeoTIFF',
});

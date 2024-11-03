**READ FIRST:** brief descriptions of scripts in this repository

**1. albedo_mcd43a3_5_10_kms.js** – download gridded (5 & 10 km) albedo data from NASA’s MCD43A3 product. 1) Specify weather station coordinates, 2) create a feature collection from coordinates, 3) access MODIS imagery, 4) specify spatial resolution, and 5) export data. 

**2. albedo_mcd43a3_single_pixel.js** – similar to “1. albedo_mcd43a3_5_10_kms.js” but tailored for a single pixel rather than a grid. 

**3. greenland_dem.js** – retrieve a DEM of Greenland so that it can then be manipulated in QGIS to create one of the first figures in my thesis manuscript. 1) Specify the publicly available DEM source, 2) specify region of interest, and 3) export the DEM as a GeoTIFF. 

**4. modis_albedo.js** – similar to “1. albedo_mcd43a3_5_10_kms.js” but extract albedo data from a different NASA product (MOD10A1).

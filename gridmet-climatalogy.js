// ==============================================================================
// 1. Define Parameters & Thresholds
// ==============================================================================
var startYear = 2016;
var endYear = 2025; // This defines the years included in your multi-year climatology
var GDD_BASE_TEMP_C = 10.0;
var HSD_THRESHOLD_C = 30.0;
var FROST_THRESHOLD_C = 0.0;

var years = ee.List.sequence(startYear, endYear);
var months = ee.List.sequence(1, 12);

// Load the GRIDMET dataset
var gridmet = ee.ImageCollection("IDAHO_EPSCOR/GRIDMET");

// ==============================================================================
// 2. Load and Configure the CIESIN Water Mask
// ==============================================================================
// The CIESIN mask is an ImageCollection, we grab the first (and only) image
var gpwDataset = ee.ImageCollection('CIESIN/GPWv411/GPW_Water_Mask');
var gpwMask = ee.Image(gpwDataset.select('water_mask').first());

// Create binary conditions matching the xarray logic
// 1 = partial water/land, 2 = total land
var isLand = gpwMask.eq(1).or(gpwMask.eq(2)); 

// 3 = Ocean (we want everything that is NOT 3 to mirror ~is_ocean)
var notOcean = gpwMask.neq(3);

// ==============================================================================
// 3. Map over Years and Months to Calculate Indicators
// ==============================================================================
var monthlyIndicators = ee.ImageCollection.fromImages(
  years.map(function(year) {
    return months.map(function(month) {
      
      // Filter the collection to the specific year and month
      var monthCol = gridmet.filter(ee.Filter.calendarRange(year, year, 'year'))
                            .filter(ee.Filter.calendarRange(month, month, 'month'));
      
      // Map over each daily image in that month
      var dailyMetrics = monthCol.map(function(img) {
        // Convert Kelvin to Celsius
        var tmax = img.select('tmmx').subtract(273.15);
        var tmin = img.select('tmmn').subtract(273.15);
        var tmean = tmax.add(tmin).divide(2);
        
        // --- Calculate raw daily contributions ---
        var rawGDD = tmean.subtract(GDD_BASE_TEMP_C).max(0);
        var rawHSD = tmax.gt(HSD_THRESHOLD_C);
        var rawFrost = tmin.lt(FROST_THRESHOLD_C);
        
        // --- Apply 'is_land' condition ---
        // Multiply by 'isLand' (1 or 0). 
        // If it's not land, it becomes 0 (mirroring xr.where(is_land, ..., 0))
        var dailyGDD = rawGDD.multiply(isLand).rename('gdd');
        var dailyHSD = rawHSD.multiply(isLand).rename('hsd');
        var dailyFrost = rawFrost.multiply(isLand).rename('frost_days');
        
        return img.addBands([dailyGDD, dailyHSD, dailyFrost]);
      });
      
      // Sum the daily metrics to get the monthly totals
      var monthlySum = dailyMetrics.select(['gdd', 'hsd', 'frost_days']).sum();
      
      // --- Apply final Ocean Mask ---
      // This applies the ~is_ocean logic, converting Ocean to NoData (NaN)
      // but keeping inland water (0) with a value of 0.
      monthlySum = monthlySum.updateMask(notOcean);
      
      // Return the image with time properties
      return monthlySum
        .set('system:time_start', ee.Date.fromYMD(year, month, 1).millis())
        .set('year', year)
        .set('month', month);
    });
  }).flatten()
);

// ==============================================================================
// 4. Visualization & Output Checks
// ==============================================================================

var vizJuly = ee.Image(monthlyIndicators.filterDate('2020-07-01', '2020-07-31').first());

// Visualization parameters
var gddVis = {
  min: 0,
  max: 600,
  palette: ['#ffffcc', '#a1dab4', '#41b6c4', '#2c7fb8', '#253494']
};

var gpwVis = {
  min: 0,
  max: 3,
  palette: ['005ce6', '00ffc5', 'bed2ff', 'aed0f1']
};

Map.setCenter(-88.6, 26.4, 5); // Focused on the Gulf Coast to check ocean boundaries

// Add the base mask first to verify boundaries
Map.addLayer(gpwMask, gpwVis, 'CIESIN Base Mask', false);
// Add the calculated indicator
Map.addLayer(vizJuly.select('gdd'), gddVis, 'July 2020 GDD (Masked)', false);

// ==============================================================================
// 5. Compute Multi-Year Climatology & Export to Google Drive
// ==============================================================================

// Create a bounding box for Alabama (Slightly buffered for safe interpolation later)
var alabamaRegion = ee.Geometry.Rectangle([-88.5, 30.1, -84.8, 35.1]);

// Map over months 1-12 to calculate the multi-year climatology
var climatologyCol = ee.ImageCollection.fromImages(months.map(function(m) {
  // Get all years for this specific month
  var monthImages = monthlyIndicators.filter(ee.Filter.eq('month', m));
  
  // Calculate Mean across the years
  var meanImg = monthImages.select(['gdd', 'hsd', 'frost_days'])
                           .mean()
                           .rename(['gdd_mean', 'hsd_mean', 'frost_days_mean']);
                           
  // Calculate Standard Deviation across the years
  var stdImg = monthImages.select(['gdd', 'hsd', 'frost_days'])
                          .reduce(ee.Reducer.stdDev())
                          .rename(['gdd_std', 'hsd_std', 'frost_days_std']);
  
  // Combine into a single image per month
  return meanImg.addBands(stdImg)
                .set('month', m);
}));

// Export each month's climatology as a separate task
months.evaluate(function(monthList) {
  monthList.forEach(function(m) {
    // Extract the specific month's image
    var imgToExport = ee.Image(climatologyCol.filter(ee.Filter.eq('month', m)).first());
    
    // Format the month number with a leading zero (e.g., '01', '12')
    var monthStr = (m < 10) ? '0' + m : m.toString();
    
    Export.image.toDrive({
      image: imgToExport,
      description: 'GRIDMET_Climatology_Month_' + monthStr,
      folder: 'GRIDMET_AgroClim_Climatologies', 
      scale: 4000, 
      region: alabamaRegion,
      maxPixels: 1e10,
      fileFormat: 'GeoTIFF'
    });
  });
});
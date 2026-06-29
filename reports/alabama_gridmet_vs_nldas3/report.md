# Alabama GRIDMET vs NLDAS3 Comparison Report

## Indicator Definitions and Method

- **Growing Degree Days (GDD)**: calculated from daily mean temperature using base threshold **10 deg C**.
  Contribution per day is `max(((Tmax + Tmin)/2 - 10), 0)`. Monthly GDD is the sum of daily contributions.
- **Heat Stress Days (HSD)**: count of days where **Tmax > 30 deg C**.
- **Frost Days**: count of days where **Tmin < 0 deg C**.
- **Climatology period**: **2016-2025** (10 years).
- **GRIDMET data access**: Google Earth Engine.
- **NLDAS-3 data access**: AWS S3.

## FROST_DAYS Mean Maps

Representative monthly mean maps (months 01, 04, 07, 10):

### Month 01
![frost_days_mean_01](maps/map_frost_days_mean_month_01.png)

### Month 04
![frost_days_mean_04](maps/map_frost_days_mean_month_04.png)

### Month 07
![frost_days_mean_07](maps/map_frost_days_mean_month_07.png)

### Month 10
![frost_days_mean_10](maps/map_frost_days_mean_month_10.png)

## FROST_DAYS Distribution Plots

![distribution_frost_days](maps/distribution_frost_days.png)

## GDD Mean Maps

Representative monthly mean maps (months 01, 04, 07, 10):

### Month 01
![gdd_mean_01](maps/map_gdd_mean_month_01.png)

### Month 04
![gdd_mean_04](maps/map_gdd_mean_month_04.png)

### Month 07
![gdd_mean_07](maps/map_gdd_mean_month_07.png)

### Month 10
![gdd_mean_10](maps/map_gdd_mean_month_10.png)

## GDD Distribution Plots

![distribution_gdd](maps/distribution_gdd.png)

## HSD Mean Maps

Representative monthly mean maps (months 01, 04, 07, 10):

### Month 01
![hsd_mean_01](maps/map_hsd_mean_month_01.png)

### Month 04
![hsd_mean_04](maps/map_hsd_mean_month_04.png)

### Month 07
![hsd_mean_07](maps/map_hsd_mean_month_07.png)

### Month 10
![hsd_mean_10](maps/map_hsd_mean_month_10.png)

## HSD Distribution Plots

![distribution_hsd](maps/distribution_hsd.png)

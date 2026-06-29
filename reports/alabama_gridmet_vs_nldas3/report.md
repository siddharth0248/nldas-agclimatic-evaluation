# Alabama GRIDMET vs NLDAS3 Comparison Report

This report was generated from county-level monthly climatology outputs.

## Correlation Summary

| variable | stat | n_pairs | pearson_r | pearson_p | spearman_rho | spearman_p |
| --- | --- | --- | --- | --- | --- | --- |
| frost_days | mean | 804 | 0.9854493080908996 | 0.0 | 0.9770527216881627 | 0.0 |
| frost_days | std | 804 | 0.9685398201181341 | 0.0 | 0.9724394477407075 | 0.0 |
| gdd | mean | 804 | 0.9964499846476351 | 0.0 | 0.9964354261119392 | 0.0 |
| gdd | std | 804 | 0.8087273197370157 | 4.909903516177681e-187 | 0.8061652782782097 | 5.791854865563331e-185 |
| hsd | mean | 804 | 0.9857798837276889 | 0.0 | 0.9554726983544756 | 0.0 |
| hsd | std | 804 | 0.9039555785028848 | 4.0472608824991285e-298 | 0.9086930078709649 | 1.6922871083912036e-306 |

## FROST_DAYS (mean)

Representative monthly maps:

### Month 01
![frost_days_mean_01](maps/map_frost_days_mean_month_01.png)

### Month 04
![frost_days_mean_04](maps/map_frost_days_mean_month_04.png)

### Month 07
![frost_days_mean_07](maps/map_frost_days_mean_month_07.png)

### Month 10
![frost_days_mean_10](maps/map_frost_days_mean_month_10.png)

## FROST_DAYS (std)

Representative monthly maps:

### Month 01
![frost_days_std_01](maps/map_frost_days_std_month_01.png)

### Month 04
![frost_days_std_04](maps/map_frost_days_std_month_04.png)

### Month 07
![frost_days_std_07](maps/map_frost_days_std_month_07.png)

### Month 10
![frost_days_std_10](maps/map_frost_days_std_month_10.png)

## GDD (mean)

Representative monthly maps:

### Month 01
![gdd_mean_01](maps/map_gdd_mean_month_01.png)

### Month 04
![gdd_mean_04](maps/map_gdd_mean_month_04.png)

### Month 07
![gdd_mean_07](maps/map_gdd_mean_month_07.png)

### Month 10
![gdd_mean_10](maps/map_gdd_mean_month_10.png)

## GDD (std)

Representative monthly maps:

### Month 01
![gdd_std_01](maps/map_gdd_std_month_01.png)

### Month 04
![gdd_std_04](maps/map_gdd_std_month_04.png)

### Month 07
![gdd_std_07](maps/map_gdd_std_month_07.png)

### Month 10
![gdd_std_10](maps/map_gdd_std_month_10.png)

## HSD (mean)

Representative monthly maps:

### Month 01
![hsd_mean_01](maps/map_hsd_mean_month_01.png)

### Month 04
![hsd_mean_04](maps/map_hsd_mean_month_04.png)

### Month 07
![hsd_mean_07](maps/map_hsd_mean_month_07.png)

### Month 10
![hsd_mean_10](maps/map_hsd_mean_month_10.png)

## HSD (std)

Representative monthly maps:

### Month 01
![hsd_std_01](maps/map_hsd_std_month_01.png)

### Month 04
![hsd_std_04](maps/map_hsd_std_month_04.png)

### Month 07
![hsd_std_07](maps/map_hsd_std_month_07.png)

### Month 10
![hsd_std_10](maps/map_hsd_std_month_10.png)

## Output Files

- `maps/`: map PNGs for every month, variable, and stat
- `tables/`: CSVs for county-month values and summaries

import { TemperatureRecord, RainfallRecord, SectorEmission, TopEmitterCountry, GlobeHotspot } from '../types/climate';

// Historical Global Temperature Anomalies (1880 - 2024) + IPCC Projections (2025 - 2050)
// Baseline 1951-1980 mean. Source: NASA GISS & NOAA NCEI
export const historicalTemperatureData: TemperatureRecord[] = [
  { year: 1880, globalAnomaly: -0.16, landAnomaly: -0.22, oceanAnomaly: -0.13, co2Ppm: 290.8, fiveYearMean: -0.17 },
  { year: 1890, globalAnomaly: -0.35, landAnomaly: -0.42, oceanAnomaly: -0.31, co2Ppm: 294.5, fiveYearMean: -0.32 },
  { year: 1900, globalAnomaly: -0.08, landAnomaly: -0.09, oceanAnomaly: -0.07, co2Ppm: 295.7, fiveYearMean: -0.13 },
  { year: 1910, globalAnomaly: -0.43, landAnomaly: -0.51, oceanAnomaly: -0.38, co2Ppm: 300.1, fiveYearMean: -0.40 },
  { year: 1920, globalAnomaly: -0.26, landAnomaly: -0.32, oceanAnomaly: -0.22, co2Ppm: 303.4, fiveYearMean: -0.28 },
  { year: 1930, globalAnomaly: -0.13, landAnomaly: -0.16, oceanAnomaly: -0.11, co2Ppm: 307.5, fiveYearMean: -0.15 },
  { year: 1940, globalAnomaly: 0.12, landAnomaly: 0.18, oceanAnomaly: 0.08, co2Ppm: 310.7, fiveYearMean: 0.09 },
  { year: 1950, globalAnomaly: -0.18, landAnomaly: -0.25, oceanAnomaly: -0.14, co2Ppm: 311.3, fiveYearMean: -0.12 },
  { year: 1960, globalAnomaly: -0.03, landAnomaly: -0.04, oceanAnomaly: -0.02, co2Ppm: 316.9, fiveYearMean: -0.01 },
  { year: 1970, globalAnomaly: 0.03, landAnomaly: 0.05, oceanAnomaly: 0.02, co2Ppm: 325.7, fiveYearMean: 0.02 },
  { year: 1980, globalAnomaly: 0.26, landAnomaly: 0.34, oceanAnomaly: 0.21, co2Ppm: 338.8, fiveYearMean: 0.22 },
  { year: 1985, globalAnomaly: 0.13, landAnomaly: 0.18, oceanAnomaly: 0.10, co2Ppm: 346.1, fiveYearMean: 0.21 },
  { year: 1990, globalAnomaly: 0.45, landAnomaly: 0.61, oceanAnomaly: 0.35, co2Ppm: 354.4, fiveYearMean: 0.38 },
  { year: 1995, globalAnomaly: 0.45, landAnomaly: 0.68, oceanAnomaly: 0.31, co2Ppm: 360.8, fiveYearMean: 0.42 },
  { year: 2000, globalAnomaly: 0.40, landAnomaly: 0.58, oceanAnomaly: 0.29, co2Ppm: 369.5, fiveYearMean: 0.51 },
  { year: 2005, globalAnomaly: 0.67, landAnomaly: 0.96, oceanAnomaly: 0.49, co2Ppm: 379.8, fiveYearMean: 0.64 },
  { year: 2010, globalAnomaly: 0.72, landAnomaly: 1.05, oceanAnomaly: 0.52, co2Ppm: 389.9, fiveYearMean: 0.70 },
  { year: 2015, globalAnomaly: 0.90, landAnomaly: 1.34, oceanAnomaly: 0.64, co2Ppm: 400.8, fiveYearMean: 0.89 },
  { year: 2016, globalAnomaly: 1.02, landAnomaly: 1.54, oceanAnomaly: 0.71, co2Ppm: 404.2, fiveYearMean: 0.95 },
  { year: 2017, globalAnomaly: 0.93, landAnomaly: 1.41, oceanAnomaly: 0.64, co2Ppm: 406.6, fiveYearMean: 0.98 },
  { year: 2018, globalAnomaly: 0.85, landAnomaly: 1.25, oceanAnomaly: 0.60, co2Ppm: 408.5, fiveYearMean: 1.01 },
  { year: 2019, globalAnomaly: 0.98, landAnomaly: 1.46, oceanAnomaly: 0.69, co2Ppm: 411.4, fiveYearMean: 1.04 },
  { year: 2020, globalAnomaly: 1.02, landAnomaly: 1.59, oceanAnomaly: 0.68, co2Ppm: 414.2, fiveYearMean: 1.07 },
  { year: 2021, globalAnomaly: 0.85, landAnomaly: 1.32, oceanAnomaly: 0.57, co2Ppm: 416.5, fiveYearMean: 1.10 },
  { year: 2022, globalAnomaly: 0.89, landAnomaly: 1.39, oceanAnomaly: 0.59, co2Ppm: 418.6, fiveYearMean: 1.14 },
  { year: 2023, globalAnomaly: 1.17, landAnomaly: 1.82, oceanAnomaly: 0.79, co2Ppm: 421.1, fiveYearMean: 1.20 },
  { year: 2024, globalAnomaly: 1.28, landAnomaly: 1.95, oceanAnomaly: 0.86, co2Ppm: 426.2, fiveYearMean: 1.25 },
  // Projected Scenarios (IPCC AR6 SSP1-2.6 vs SSP2-4.5 vs SSP5-8.5)
  { year: 2025, globalAnomaly: 1.31, landAnomaly: 2.01, oceanAnomaly: 0.88, co2Ppm: 428.5, fiveYearMean: 1.28, ssp1_26: 1.31, ssp2_45: 1.31, ssp5_85: 1.31 },
  { year: 2030, globalAnomaly: 1.45, landAnomaly: 2.20, oceanAnomaly: 0.98, co2Ppm: 440.0, fiveYearMean: 1.40, ssp1_26: 1.39, ssp2_45: 1.48, ssp5_85: 1.62 },
  { year: 2035, globalAnomaly: 1.58, landAnomaly: 2.38, oceanAnomaly: 1.08, co2Ppm: 452.0, fiveYearMean: 1.52, ssp1_26: 1.45, ssp2_45: 1.65, ssp5_85: 1.95 },
  { year: 2040, globalAnomaly: 1.72, landAnomaly: 2.58, oceanAnomaly: 1.18, co2Ppm: 465.0, fiveYearMean: 1.65, ssp1_26: 1.50, ssp2_45: 1.83, ssp5_85: 2.35 },
  { year: 2045, globalAnomaly: 1.86, landAnomaly: 2.79, oceanAnomaly: 1.29, co2Ppm: 478.0, fiveYearMean: 1.78, ssp1_26: 1.52, ssp2_45: 2.02, ssp5_85: 2.80 },
  { year: 2050, globalAnomaly: 2.01, landAnomaly: 3.01, oceanAnomaly: 1.41, co2Ppm: 492.0, fiveYearMean: 1.93, ssp1_26: 1.54, ssp2_45: 2.24, ssp5_85: 3.32 },
];

// Precipitation & Rainfall Variability (1960 - 2024)
export const rainfallTrendData: RainfallRecord[] = [
  { year: 1960, globalPrecipAnomalyMm: -4.2, extremeDroughtIndex: 22, extremeFloodIndex: 18, monsoonVolatilityScore: 28 },
  { year: 1965, globalPrecipAnomalyMm: -1.8, extremeDroughtIndex: 25, extremeFloodIndex: 20, monsoonVolatilityScore: 31 },
  { year: 1970, globalPrecipAnomalyMm: 3.1, extremeDroughtIndex: 28, extremeFloodIndex: 24, monsoonVolatilityScore: 34 },
  { year: 1975, globalPrecipAnomalyMm: 8.5, extremeDroughtIndex: 24, extremeFloodIndex: 29, monsoonVolatilityScore: 37 },
  { year: 1980, globalPrecipAnomalyMm: -6.4, extremeDroughtIndex: 35, extremeFloodIndex: 27, monsoonVolatilityScore: 40 },
  { year: 1985, globalPrecipAnomalyMm: -2.1, extremeDroughtIndex: 38, extremeFloodIndex: 30, monsoonVolatilityScore: 44 },
  { year: 1990, globalPrecipAnomalyMm: 5.7, extremeDroughtIndex: 42, extremeFloodIndex: 38, monsoonVolatilityScore: 49 },
  { year: 1995, globalPrecipAnomalyMm: 9.3, extremeDroughtIndex: 45, extremeFloodIndex: 43, monsoonVolatilityScore: 53 },
  { year: 2000, globalPrecipAnomalyMm: 12.8, extremeDroughtIndex: 51, extremeFloodIndex: 49, monsoonVolatilityScore: 59 },
  { year: 2005, globalPrecipAnomalyMm: 14.6, extremeDroughtIndex: 58, extremeFloodIndex: 56, monsoonVolatilityScore: 65 },
  { year: 2010, globalPrecipAnomalyMm: 22.4, extremeDroughtIndex: 64, extremeFloodIndex: 68, monsoonVolatilityScore: 72 },
  { year: 2015, globalPrecipAnomalyMm: 18.2, extremeDroughtIndex: 73, extremeFloodIndex: 71, monsoonVolatilityScore: 78 },
  { year: 2018, globalPrecipAnomalyMm: 26.5, extremeDroughtIndex: 78, extremeFloodIndex: 77, monsoonVolatilityScore: 82 },
  { year: 2020, globalPrecipAnomalyMm: 29.8, extremeDroughtIndex: 82, extremeFloodIndex: 84, monsoonVolatilityScore: 86 },
  { year: 2022, globalPrecipAnomalyMm: 31.4, extremeDroughtIndex: 87, extremeFloodIndex: 89, monsoonVolatilityScore: 90 },
  { year: 2023, globalPrecipAnomalyMm: 35.6, extremeDroughtIndex: 91, extremeFloodIndex: 94, monsoonVolatilityScore: 93 },
  { year: 2024, globalPrecipAnomalyMm: 38.2, extremeDroughtIndex: 94, extremeFloodIndex: 97, monsoonVolatilityScore: 96 },
];

// Global Greenhouse Gas Emissions by Economic Sector (IPCC WG3)
export const sectorEmissionsData: SectorEmission[] = [
  {
    sector: 'Electricity & Heat Production',
    percentage: 34,
    gigatons: 18.7,
    color: '#ef4444',
    iconName: 'Zap',
    description: 'Coal, oil, and natural gas power plants supplying residential, commercial, and industrial grids.'
  },
  {
    sector: 'Industry & Manufacturing',
    percentage: 24,
    gigatons: 13.2,
    color: '#f97316',
    iconName: 'Factory',
    description: 'Steel, cement, chemicals, minerals, and metallurgy processing producing direct emissions.'
  },
  {
    sector: 'Agriculture & Forestry (AFOLU)',
    percentage: 22,
    gigatons: 12.1,
    color: '#84cc16',
    iconName: 'Trees',
    description: 'Deforestation, livestock enteric fermentation (methane), fertilizer application, and peat degradation.'
  },
  {
    sector: 'Transportation',
    percentage: 15,
    gigatons: 8.3,
    color: '#06b6d4',
    iconName: 'Truck',
    description: 'Road passenger & freight vehicles, commercial aviation, international maritime shipping, and rail.'
  },
  {
    sector: 'Buildings & Residential',
    percentage: 5,
    gigatons: 2.75,
    color: '#a855f7',
    iconName: 'Building',
    description: 'Direct on-site combustion for heating, cooking furnaces, and refrigerant leaks.'
  }
];

// Top Global Emitter Nations & Per Capita Comparison
export const topEmitterCountries: TopEmitterCountry[] = [
  { country: 'China', emissionsGt: 12.6, perCapitaTons: 8.9, sharePct: 29.2, pledgeTarget: 'Carbon neutrality by 2060' },
  { country: 'United States', emissionsGt: 4.8, perCapitaTons: 14.4, sharePct: 11.2, pledgeTarget: 'Net zero GHG by 2050' },
  { country: 'India', emissionsGt: 2.9, perCapitaTons: 2.0, sharePct: 6.8, pledgeTarget: 'Net zero emissions by 2070' },
  { country: 'European Union (27)', emissionsGt: 2.8, perCapitaTons: 6.2, sharePct: 6.5, pledgeTarget: '55% cut by 2030, net zero 2050' },
  { country: 'Russia', emissionsGt: 1.9, perCapitaTons: 13.1, sharePct: 4.4, pledgeTarget: 'Carbon neutrality by 2060' },
  { country: 'Japan', emissionsGt: 1.0, perCapitaTons: 8.0, sharePct: 2.3, pledgeTarget: '46% reduction by 2030' },
  { country: 'Rest of World', emissionsGt: 17.1, perCapitaTons: 4.3, sharePct: 39.6, pledgeTarget: 'Varied NDCs under Paris Accords' }
];

// Key 3D Earth Hotspots for Globe Explorer
export const globeHotspots: GlobeHotspot[] = [
  {
    id: 'arctic-cap',
    title: 'Arctic Ice Sheet & Permafrost',
    lat: 75.0,
    lng: 0.0,
    category: 'extreme_warming',
    summary: 'Warming at nearly 4x the global average (Arctic Amplification), leading to rapid albedo loss and methane venting from melting permafrost.',
    anomalyText: '+3.4°C Arctic Anomaly',
    riskLevel: 'Critical',
    imagePlaceholder: '🧊'
  },
  {
    id: 'amazon-basin',
    title: 'Amazon Rainforest Basin',
    lat: -3.4653,
    lng: -62.2159,
    category: 'critical_ecosystem',
    summary: 'Experiencing intense droughts, forest fragmentation, and wildfire encroachment, nearing the tipping point where it flips from a carbon sink to a carbon source.',
    anomalyText: '17% Deforested (20-25% Threshold)',
    riskLevel: 'Critical',
    imagePlaceholder: '🌳'
  },
  {
    id: 'great-barrier-reef',
    title: 'Great Barrier Reef, Australia',
    lat: -18.2871,
    lng: 147.6992,
    category: 'critical_ecosystem',
    summary: 'Successive mass marine heatwaves have caused 5 widespread coral bleaching events since 2016 due to ocean thermal stress and acidification.',
    anomalyText: '73% Reef Impacted by Bleaching',
    riskLevel: 'Severe',
    imagePlaceholder: '🐠'
  },
  {
    id: 'greenland-ice',
    title: 'Greenland Ice Sheet',
    lat: 72.0,
    lng: -40.0,
    category: 'sea_level',
    summary: 'Losing an average of 270 billion metric tons of ice annually, adding ~0.8mm of global sea-level rise per year with accelerating meltwater velocity.',
    anomalyText: '270 Gt/yr Net Ice Loss',
    riskLevel: 'Critical',
    imagePlaceholder: '🏔️'
  },
  {
    id: 'gulf-stream-amoc',
    title: 'Atlantic Meridional Overturning Circulation (AMOC)',
    lat: 40.0,
    lng: -30.0,
    category: 'critical_ecosystem',
    summary: 'Freshwater dilution from melting glaciers is destabilizing ocean conveyor currents, threatening catastrophic winter chills in Europe and shifting tropical monsoon belts.',
    anomalyText: 'Weakest State in 1,000+ Years',
    riskLevel: 'Severe',
    imagePlaceholder: '🌊'
  },
  {
    id: 'sunderbans-delta',
    title: 'Ganges-Brahmaputra Delta & Sundarbans',
    lat: 21.9497,
    lng: 89.1833,
    category: 'sea_level',
    summary: 'World’s most densely inhabited delta facing extreme storm surges, salinity intrusion into freshwater aquifers, and rising tidal inundation.',
    anomalyText: '25+ Million Vulnerable Inhabitants',
    riskLevel: 'Critical',
    imagePlaceholder: '🛶'
  },
  {
    id: 'east-asia-industrial',
    title: 'East Asia Industrial Megabasin',
    lat: 34.0,
    lng: 115.0,
    category: 'megacity_emissions',
    summary: 'High density of coal power stations, heavy metal smelters, and megacities contributing significant regional PM2.5 aerosols and thermal heat island effects.',
    anomalyText: 'Peak Regional Carbon Density',
    riskLevel: 'Severe',
    imagePlaceholder: '🏭'
  },
  {
    id: 'congo-basin',
    title: 'Congo Peatland & Rainforest',
    lat: -0.228,
    lng: 23.658,
    category: 'critical_ecosystem',
    summary: 'Second largest tropical rainforest on Earth holding 30 billion tons of locked carbon in peatlands, currently threatened by timber exploitation and agricultural conversion.',
    anomalyText: '30 Gt Locked Soil Carbon',
    riskLevel: 'Moderate',
    imagePlaceholder: '🌿'
  }
];

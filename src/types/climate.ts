export type PageTab = 
  | 'home' 
  | 'dashboard' 
  | 'globe' 
  | 'map' 
  | 'awareness' 
  | 'actions' 
  | 'about'
  | 'login'
  | 'register'
  | 'my-dashboard'
  | 'my-history'
  | 'saved-cities'
  | 'profile'
  | 'report'
  | 'admin';

// --- AI Climate Insight Types ---
export interface ClimateInsightData {
  currentCondition: 'Favorable' | 'Moderate' | 'Stressed' | 'Severe' | 'Critical';
  currentConditionColor: string;
  keyObservation: string;
  airQualitySummary: string;
  temperatureSummary: string;
  rainfallSummary: string;
  climateRiskSummary: string;
  recommendedActions: string[];
  isAiGenerated: boolean;
  modelName: string;
  timestamp: string;
  confidenceScore: number;
}

// --- Live Weather & AQI Types ---
export interface CitySearchResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
  countryCode?: string;
}

export interface ForecastDay {
  date: string;
  dayName: string;
  tempMax: number;
  tempMin: number;
  precipitationSum: number;
  precipitationProbability: number;
  weatherCode: number;
  weatherDescription: string;
}

export interface LiveWeatherData {
  cityName: string;
  country: string;
  latitude: number;
  longitude: number;
  currentTemp: number;
  feelsLikeTemp: number;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  weatherCode: number;
  weatherDescription: string;
  isDay: boolean;
  forecast: ForecastDay[];
  lastUpdated: string;
}

export type LiveAQICategory = 'Good' | 'Moderate' | 'Poor' | 'Very Poor' | 'Hazardous';

export interface LiveAqiData {
  usAqi: number;
  europeanAqi: number;
  category: LiveAQICategory;
  pm25: number;   // µg/m³
  pm10: number;   // µg/m³
  no2: number;    // µg/m³
  so2: number;    // µg/m³
  co: number;     // µg/m³
  ozone: number;  // µg/m³
  uvIndex: number;
  healthAdvice: string;
}

export type ClimateRiskCategory = 'Very Low' | 'Low' | 'Moderate' | 'High' | 'Very High';

export interface ClimateRiskFactor {
  name: string;
  score: number;      // 0-100
  weight: number;     // percentage
  description: string;
  severity: 'Very Low' | 'Low' | 'Moderate' | 'High' | 'Very High';
}

export interface ClimateRiskScoreData {
  overallScore: number; // 0 - 100
  category: ClimateRiskCategory;
  categoryColor: string;
  factors: ClimateRiskFactor[];
  summary: string;
  recommendations: string[];
}

export interface CompleteCityEnvironmentData {
  weather: LiveWeatherData;
  aqi: LiveAqiData;
  riskScore: ClimateRiskScoreData;
  isLiveApi: boolean;
}

// --- Historical & Educational Types ---
export interface TemperatureRecord {
  year: number;
  globalAnomaly: number;     // °C anomaly compared to 1951-1980 baseline
  landAnomaly: number;
  oceanAnomaly: number;
  co2Ppm: number;            // Atmospheric CO2 ppm
  fiveYearMean: number;
  ssp1_26?: number;          // Paris Agreement aligned projection
  ssp2_45?: number;          // Middle of the road
  ssp5_85?: number;          // Fossil-fueled development
}

export interface RainfallRecord {
  year: number;
  globalPrecipAnomalyMm: number;
  extremeDroughtIndex: number;  // 0 - 100 severity
  extremeFloodIndex: number;    // 0 - 100 severity
  monsoonVolatilityScore: number;
}

export type AQICategory = 'Good' | 'Moderate' | 'Poor' | 'Unhealthy' | 'Hazardous';

export interface CityAQIData {
  id: string;
  cityName: string;
  country: string;
  coordinates: [number, number];
  currentAQI: number;
  category: AQICategory;
  pm25: number;
  pm10: number;
  no2: number;
  o3: number;
  co: number;
  dominantPollutant: string;
  historicalTrend: { month: string; aqi: number }[];
  healthRecommendation: string;
}

export interface CityClimateProfile {
  id: string;
  cityName: string;
  country: string;
  continent: 'North America' | 'Europe' | 'Asia' | 'Africa' | 'South America' | 'Oceania';
  coordinates: [number, number];
  currentTempC: number;
  tempAnomalyC: number;
  aqi: number;
  aqiCategory: AQICategory;
  seaLevelRiskScore: number;
  annualCo2PerCapitaTons: number;
  urbanGreenCanopyPct: number;
  climateZone: string;
  keyVulnerability: string;
  adaptationStrategy: string;
}

export interface SectorEmission {
  sector: string;
  percentage: number;
  gigatons: number;
  color: string;
  iconName: string;
  description: string;
}

export interface TopEmitterCountry {
  country: string;
  emissionsGt: number;
  perCapitaTons: number;
  sharePct: number;
  pledgeTarget: string;
}

export interface ClimateHabit {
  id: string;
  title: string;
  category: 'Electricity Usage' | 'Public Transport' | 'Recycling' | 'Plastic Usage' | 'Water Conservation' | 'Tree Planting' | 'Renewable Energy';
  impactKgCo2Year: number;
  points: number;
  icon: string;
  description: string;
  easyTip: string;
  actionGuidance: string;
}

export interface GlobeHotspot {
  id: string;
  title: string;
  lat: number;
  lng: number;
  category: 'critical_ecosystem' | 'extreme_warming' | 'sea_level' | 'megacity_emissions';
  summary: string;
  anomalyText: string;
  riskLevel: 'Moderate' | 'Severe' | 'Critical';
  imagePlaceholder: string;
}

import { 
  CitySearchResult, 
  LiveWeatherData, 
  LiveAqiData, 
  LiveAQICategory, 
  ForecastDay, 
  ClimateRiskScoreData, 
  ClimateRiskCategory, 
  ClimateRiskFactor,
  CompleteCityEnvironmentData 
} from '../types/climate';

// Preset popular cities for instant selection
export const POPULAR_CITIES: CitySearchResult[] = [
  { id: 1850147, name: 'Tokyo', latitude: 35.6895, longitude: 139.6917, country: 'Japan', admin1: 'Tokyo' },
  { id: 2643743, name: 'London', latitude: 51.5085, longitude: -0.1257, country: 'United Kingdom', admin1: 'England' },
  { id: 5128581, name: 'New York', latitude: 40.7143, longitude: -74.006, country: 'United States', admin1: 'New York' },
  { id: 1261481, name: 'New Delhi', latitude: 28.6358, longitude: 77.2245, country: 'India', admin1: 'Delhi' },
  { id: 4164138, name: 'Miami', latitude: 25.7743, longitude: -80.1937, country: 'United States', admin1: 'Florida' },
  { id: 2988507, name: 'Paris', latitude: 48.8534, longitude: 2.3488, country: 'France', admin1: 'Île-de-France' },
  { id: 360630, name: 'Cairo', latitude: 30.0626, longitude: 31.2497, country: 'Egypt', admin1: 'Cairo' },
  { id: 2147714, name: 'Sydney', latitude: -33.8679, longitude: 151.2073, country: 'Australia', admin1: 'New South Wales' },
  { id: 3448439, name: 'São Paulo', latitude: -23.5475, longitude: -46.6361, country: 'Brazil', admin1: 'São Paulo' },
  { id: 1880252, name: 'Singapore', latitude: 1.2897, longitude: 103.8501, country: 'Singapore', admin1: 'Central' }
];

// WMO Weather code interpreter
export const decodeWeatherCode = (code: number): { text: string; iconType: string } => {
  if (code === 0) return { text: 'Clear Sky', iconType: 'sun' };
  if (code === 1) return { text: 'Mainly Clear', iconType: 'sun' };
  if (code === 2) return { text: 'Partly Cloudy', iconType: 'cloud-sun' };
  if (code === 3) return { text: 'Overcast', iconType: 'cloud' };
  if ([45, 48].includes(code)) return { text: 'Foggy / Haze', iconType: 'cloud-fog' };
  if ([51, 53, 55].includes(code)) return { text: 'Light Drizzle', iconType: 'cloud-drizzle' };
  if ([61, 63, 65].includes(code)) return { text: 'Rain Showers', iconType: 'cloud-rain' };
  if ([66, 67].includes(code)) return { text: 'Freezing Rain', iconType: 'cloud-snow' };
  if ([71, 73, 75, 77].includes(code)) return { text: 'Snowfall', iconType: 'cloud-snow' };
  if ([80, 81, 82].includes(code)) return { text: 'Heavy Rain Deluge', iconType: 'cloud-rain' };
  if ([85, 86].includes(code)) return { text: 'Heavy Snow Showers', iconType: 'cloud-snow' };
  if ([95, 96, 99].includes(code)) return { text: 'Thunderstorm with Gusts', iconType: 'cloud-lightning' };
  return { text: 'Moderate Conditions', iconType: 'cloud' };
};

// Map AQI number to Category & Color
export const categorizeAQI = (usAqi: number): { category: LiveAQICategory; advice: string } => {
  if (usAqi <= 50) {
    return {
      category: 'Good',
      advice: 'Air quality is satisfactory with minimal or no risk. Ideal for outdoor recreation.'
    };
  } else if (usAqi <= 100) {
    return {
      category: 'Moderate',
      advice: 'Air quality is acceptable. Very sensitive individuals may experience mild respiratory symptoms.'
    };
  } else if (usAqi <= 150) {
    return {
      category: 'Poor',
      advice: 'Sensitive groups (children, elderly, asthma patients) should reduce prolonged outdoor exertion.'
    };
  } else if (usAqi <= 200) {
    return {
      category: 'Very Poor',
      advice: 'Health alert: Increased risk for all individuals. Limit intense outdoor activities.'
    };
  } else {
    return {
      category: 'Hazardous',
      advice: 'Emergency health warning: Entire population is likely affected. Wear N95 masks and run indoor air filters.'
    };
  }
};

// Calculate 0-100 Climate Risk Score using empirical weather & AQI variables
export const calculateClimateRiskScore = (
  temp: number,
  humidity: number,
  windSpeed: number,
  precipSum: number,
  usAqi: number,
  pm25: number,
  uvIndex: number,
  latitude: number
): ClimateRiskScoreData => {
  // 1. Thermal Stress Factor (25% weight)
  // Optimal temp ~18-24°C. Severe heat (>35°C) or freezing (<0°C) increases score
  let heatScore = 15;
  if (temp > 38) heatScore = 95;
  else if (temp > 33) heatScore = 75;
  else if (temp > 28) heatScore = 50;
  else if (temp < -5) heatScore = 65;
  else if (temp < 5) heatScore = 40;
  else heatScore = 20;

  // 2. Air Pollution Risk Factor (25% weight)
  let aqiScore = Math.min(100, Math.round((usAqi / 300) * 100));

  // 3. Hydrological / Precipitation Volatility Factor (20% weight)
  let hydroScore = 20;
  if (precipSum > 50) hydroScore = 90; // Flash flood alert
  else if (precipSum > 25) hydroScore = 65;
  else if (precipSum === 0 && temp > 30) hydroScore = 60; // Arid drought stress
  else if (precipSum > 5) hydroScore = 35;

  // 4. Extreme Storm / Wind Severity Factor (15% weight)
  let stormScore = 15;
  if (windSpeed > 60) stormScore = 90; // Gale/Storm
  else if (windSpeed > 35) stormScore = 60;
  else if (windSpeed > 20) stormScore = 35;

  // 5. Climate / Latitudinal Vulnerability Factor (15% weight)
  // Tropical and sub-polar zones have elevated vulnerability
  const absLat = Math.abs(latitude);
  let geoScore = 30;
  if (absLat < 20) geoScore = 65; // Tropics
  else if (absLat > 60) geoScore = 70; // Arctic/Sub-arctic
  else geoScore = 35; // Temperate

  // Weighted overall calculation (0 - 100)
  const overallScore = Math.min(
    100,
    Math.max(
      5,
      Math.round(
        heatScore * 0.25 +
        aqiScore * 0.25 +
        hydroScore * 0.20 +
        stormScore * 0.15 +
        geoScore * 0.15
      )
    )
  );

  let category: ClimateRiskCategory = 'Moderate';
  let categoryColor = 'text-amber-400 bg-amber-500/10 border-amber-500/30';

  if (overallScore <= 20) {
    category = 'Very Low';
    categoryColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
  } else if (overallScore <= 40) {
    category = 'Low';
    categoryColor = 'text-teal-400 bg-teal-500/10 border-teal-500/30';
  } else if (overallScore <= 60) {
    category = 'Moderate';
    categoryColor = 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
  } else if (overallScore <= 80) {
    category = 'High';
    categoryColor = 'text-orange-400 bg-orange-500/10 border-orange-500/30';
  } else {
    category = 'Very High';
    categoryColor = 'text-rose-400 bg-rose-500/10 border-rose-500/30';
  }

  const getSeverity = (s: number): ClimateRiskCategory => {
    if (s <= 20) return 'Very Low';
    if (s <= 40) return 'Low';
    if (s <= 60) return 'Moderate';
    if (s <= 80) return 'High';
    return 'Very High';
  };

  const factors: ClimateRiskFactor[] = [
    {
      name: 'Air Pollution & Aerosols',
      score: aqiScore,
      weight: 25,
      description: `PM2.5 concentration is ${pm25} µg/m³, AQI is ${usAqi}.`,
      severity: getSeverity(aqiScore)
    },
    {
      name: 'Thermal Stress & Heat Index',
      score: heatScore,
      weight: 25,
      description: `Surface temp is ${temp}°C with ${humidity}% relative humidity.`,
      severity: getSeverity(heatScore)
    },
    {
      name: 'Hydrological Volatility (Flood/Drought)',
      score: hydroScore,
      weight: 20,
      description: `Cumulative precipitation forecast is ${precipSum} mm.`,
      severity: getSeverity(hydroScore)
    },
    {
      name: 'Storm & Wind Intensity',
      score: stormScore,
      weight: 15,
      description: `Current sustained wind speed is ${windSpeed} km/h.`,
      severity: getSeverity(stormScore)
    },
    {
      name: 'Geographic Vulnerability',
      score: geoScore,
      weight: 15,
      description: `Latitude ${latitude.toFixed(2)}° exposure zone.`,
      severity: getSeverity(geoScore)
    }
  ];

  const recommendations: string[] = [];
  if (aqiScore > 50) recommendations.push('Deploy HEPA filtration indoors and minimize roadside physical exertion.');
  if (heatScore > 50) recommendations.push('Activate cool-roof reflective measures and stay hydrated during peak afternoon sun.');
  if (hydroScore > 50) recommendations.push('Maintain urban stormwater drainage and rain catchment systems.');
  if (recommendations.length === 0) {
    recommendations.push('Maintain active municipal urban greening and energy-efficiency standards.');
  }

  return {
    overallScore,
    category,
    categoryColor,
    factors,
    summary: `Climate vulnerability is categorized as ${category} (${overallScore}/100) based on live meteorological and ambient air quality factors.`,
    recommendations
  };
};

// Search Cities with Open-Meteo Geocoding API
export const searchCitiesApi = async (query: string): Promise<CitySearchResult[]> => {
  if (!query || query.trim().length < 2) return [];

  try {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query.trim())}&count=8&language=en&format=json`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Geocoding search failed');
    const data = await res.json();
    if (data && data.results && Array.isArray(data.results)) {
      return data.results.map((r: any) => ({
        id: r.id,
        name: r.name,
        latitude: r.latitude,
        longitude: r.longitude,
        country: r.country || '',
        admin1: r.admin1 || '',
        countryCode: r.country_code || '',
      }));
    }
    return [];
  } catch (err) {
    console.warn('Geocoding API network error, falling back to cached list:', err);
    return POPULAR_CITIES.filter(
      (c) =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.country.toLowerCase().includes(query.toLowerCase())
    );
  }
};

// Fetch Live Weather, Forecast, AQI, and Compute Climate Risk Score
export const fetchLiveCityData = async (
  lat: number,
  lon: number,
  cityName: string,
  country: string
): Promise<CompleteCityEnvironmentData> => {
  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max&timezone=auto`;
  const aqiUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=european_aqi,us_aqi,pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,uv_index&timezone=auto`;

  try {
    const [weatherRes, aqiRes] = await Promise.all([
      fetch(weatherUrl),
      fetch(aqiUrl)
    ]);

    if (!weatherRes.ok || !aqiRes.ok) {
      throw new Error('Failed to fetch from Open-Meteo API');
    }

    const weatherJson = await weatherRes.json();
    const aqiJson = await aqiRes.json();

    const currentW = weatherJson.current || {};
    const dailyW = weatherJson.daily || {};
    const currentA = aqiJson.current || {};

    // Build 7-day forecast array
    const forecastDays: ForecastDay[] = [];
    if (dailyW.time && Array.isArray(dailyW.time)) {
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      for (let i = 0; i < Math.min(7, dailyW.time.length); i++) {
        const dObj = new Date(dailyW.time[i]);
        const dayName = i === 0 ? 'Today' : days[dObj.getDay()];
        const wCode = dailyW.weather_code?.[i] ?? 0;
        forecastDays.push({
          date: dailyW.time[i],
          dayName,
          tempMax: Math.round(dailyW.temperature_2m_max?.[i] ?? 20),
          tempMin: Math.round(dailyW.temperature_2m_min?.[i] ?? 14),
          precipitationSum: dailyW.precipitation_sum?.[i] ?? 0,
          precipitationProbability: dailyW.precipitation_probability_max?.[i] ?? 10,
          weatherCode: wCode,
          weatherDescription: decodeWeatherCode(wCode).text
        });
      }
    }

    const currentWeatherCode = currentW.weather_code ?? 0;
    const weatherData: LiveWeatherData = {
      cityName,
      country,
      latitude: lat,
      longitude: lon,
      currentTemp: Math.round((currentW.temperature_2m ?? 22) * 10) / 10,
      feelsLikeTemp: Math.round((currentW.apparent_temperature ?? 22) * 10) / 10,
      humidity: Math.round(currentW.relative_humidity_2m ?? 50),
      windSpeed: Math.round(currentW.wind_speed_10m ?? 12),
      precipitation: currentW.precipitation ?? 0,
      weatherCode: currentWeatherCode,
      weatherDescription: decodeWeatherCode(currentWeatherCode).text,
      isDay: currentW.is_day === 1,
      forecast: forecastDays,
      lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const usAqi = Math.round(currentA.us_aqi ?? 45);
    const { category, advice } = categorizeAQI(usAqi);

    const aqiData: LiveAqiData = {
      usAqi,
      europeanAqi: Math.round(currentA.european_aqi ?? 30),
      category,
      pm25: Math.round((currentA.pm2_5 ?? 10.2) * 10) / 10,
      pm10: Math.round((currentA.pm10 ?? 22.4) * 10) / 10,
      no2: Math.round((currentA.nitrogen_dioxide ?? 15.6) * 10) / 10,
      so2: Math.round((currentA.sulphur_dioxide ?? 4.2) * 10) / 10,
      co: Math.round((currentA.carbon_monoxide ?? 280) * 10) / 10,
      ozone: Math.round((currentA.ozone ?? 48.1) * 10) / 10,
      uvIndex: Math.round((currentA.uv_index ?? 4) * 10) / 10,
      healthAdvice: advice
    };

    // Calculate Climate Risk Score (0-100)
    const precip7DaySum = forecastDays.reduce((acc, curr) => acc + curr.precipitationSum, 0);
    const riskScore = calculateClimateRiskScore(
      weatherData.currentTemp,
      weatherData.humidity,
      weatherData.windSpeed,
      precip7DaySum,
      aqiData.usAqi,
      aqiData.pm25,
      aqiData.uvIndex,
      lat
    );

    return {
      weather: weatherData,
      aqi: aqiData,
      riskScore,
      isLiveApi: true
    };
  } catch (err) {
    console.warn(`Error fetching live data for ${cityName}, returning calibrated fallback:`, err);
    
    // Graceful offline fallback
    const fallbackWeather: LiveWeatherData = {
      cityName,
      country,
      latitude: lat,
      longitude: lon,
      currentTemp: 24.5,
      feelsLikeTemp: 25.2,
      humidity: 58,
      windSpeed: 14,
      precipitation: 0.2,
      weatherCode: 2,
      weatherDescription: 'Partly Cloudy',
      isDay: true,
      forecast: [
        { date: '2026-08-29', dayName: 'Today', tempMax: 26, tempMin: 18, precipitationSum: 0.2, precipitationProbability: 15, weatherCode: 2, weatherDescription: 'Partly Cloudy' },
        { date: '2026-08-30', dayName: 'Sun', tempMax: 27, tempMin: 19, precipitationSum: 0.0, precipitationProbability: 5, weatherCode: 1, weatherDescription: 'Mainly Clear' },
        { date: '2026-08-31', dayName: 'Mon', tempMax: 25, tempMin: 17, precipitationSum: 3.4, precipitationProbability: 60, weatherCode: 61, weatherDescription: 'Rain Showers' },
        { date: '2026-09-01', dayName: 'Tue', tempMax: 24, tempMin: 16, precipitationSum: 1.2, precipitationProbability: 40, weatherCode: 2, weatherDescription: 'Partly Cloudy' },
        { date: '2026-09-02', dayName: 'Wed', tempMax: 26, tempMin: 18, precipitationSum: 0.0, precipitationProbability: 10, weatherCode: 0, weatherDescription: 'Clear Sky' },
        { date: '2026-09-03', dayName: 'Thu', tempMax: 28, tempMin: 19, precipitationSum: 0.0, precipitationProbability: 10, weatherCode: 1, weatherDescription: 'Mainly Clear' },
        { date: '2026-09-04', dayName: 'Fri', tempMax: 27, tempMin: 18, precipitationSum: 0.5, precipitationProbability: 20, weatherCode: 2, weatherDescription: 'Partly Cloudy' },
      ],
      lastUpdated: 'Live Simulation (Offline Fallback)'
    };

    const fallbackAqi: LiveAqiData = {
      usAqi: 55,
      europeanAqi: 35,
      category: 'Moderate',
      pm25: 14.2,
      pm10: 28.5,
      no2: 22.1,
      so2: 5.4,
      co: 320,
      ozone: 42.0,
      uvIndex: 5.5,
      healthAdvice: 'Air quality is acceptable for most healthy adults.'
    };

    const fallbackRisk = calculateClimateRiskScore(24.5, 58, 14, 5.3, 55, 14.2, 5.5, lat);

    return {
      weather: fallbackWeather,
      aqi: fallbackAqi,
      riskScore: fallbackRisk,
      isLiveApi: false
    };
  }
};

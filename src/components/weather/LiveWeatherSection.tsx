import React, { useState, useEffect } from 'react';
import { 
  searchCitiesApi, 
  fetchLiveCityData, 
  POPULAR_CITIES 
} from '../../services/weatherApi';
import { CompleteCityEnvironmentData, CitySearchResult } from '../../types/climate';
import { useAuth } from '../../context/AuthContext';
import { 
  Sun, 
  Cloud, 
  CloudSun, 
  CloudRain, 
  CloudLightning, 
  CloudSnow, 
  CloudFog, 
  CloudDrizzle, 
  Wind, 
  Droplets, 
  Thermometer, 
  Search, 
  MapPin, 
  RefreshCw, 
  Radio, 
  Calendar, 
  Umbrella,
  Loader2,
  AlertCircle,
  Star,
  StarOff,
  LogIn
} from 'lucide-react';

interface LiveWeatherSectionProps {
  onCityDataLoaded?: (data: CompleteCityEnvironmentData) => void;
  initialCity?: CitySearchResult;
}

export const LiveWeatherSection: React.FC<LiveWeatherSectionProps> = ({
  onCityDataLoaded,
  initialCity = POPULAR_CITIES[0] // Tokyo
}) => {
  const { isAuthenticated, saveCityLocation, removeCityLocation, isCitySaved, setActiveTab } = useAuth() as any;
  const [selectedCity, setSelectedCity] = useState<CitySearchResult>(initialCity);
  const [cityData, setCityData] = useState<CompleteCityEnvironmentData | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<CitySearchResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSavingCity, setIsSavingCity] = useState(false);

  // Load city environmental data whenever selected city changes
  useEffect(() => {
    let isMounted = true;
    const loadCity = async () => {
      setIsLoading(true);
      setErrorMsg(null);
      try {
        const data = await fetchLiveCityData(
          selectedCity.latitude,
          selectedCity.longitude,
          selectedCity.name,
          selectedCity.country
        );
        if (isMounted) {
          setCityData(data);
          if (onCityDataLoaded) {
            onCityDataLoaded(data);
          }
        }
      } catch (err) {
        if (isMounted) {
          setErrorMsg('Unable to fetch live weather. Showing cached data.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadCity();
    return () => {
      isMounted = false;
    };
  }, [selectedCity]);

  // Debounced search handler
  useEffect(() => {
    if (!searchQuery || searchQuery.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      const results = await searchCitiesApi(searchQuery);
      setSearchResults(results);
      setIsSearching(false);
    }, 350);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const getWeatherIcon = (code: number, isLarge = false) => {
    const sizeClass = isLarge ? 'w-10 h-10' : 'w-6 h-6';
    if (code === 0 || code === 1) return <Sun className={`${sizeClass} text-amber-400 animate-spin-slow`} />;
    if (code === 2) return <CloudSun className={`${sizeClass} text-yellow-300`} />;
    if (code === 3) return <Cloud className={`${sizeClass} text-slate-300`} />;
    if ([45, 48].includes(code)) return <CloudFog className={`${sizeClass} text-slate-400`} />;
    if ([51, 53, 55].includes(code)) return <CloudDrizzle className={`${sizeClass} text-cyan-400`} />;
    if ([61, 63, 65, 80, 81, 82].includes(code)) return <CloudRain className={`${sizeClass} text-cyan-400`} />;
    if ([71, 73, 75, 77, 85, 86].includes(code)) return <CloudSnow className={`${sizeClass} text-blue-200`} />;
    if ([95, 96, 99].includes(code)) return <CloudLightning className={`${sizeClass} text-rose-400 animate-pulse`} />;
    return <CloudSun className={`${sizeClass} text-emerald-400`} />;
  };

  return (
    <div className="space-y-6">
      {/* 1. Header & Live Search Bar */}
      <div className="glass-panel p-5 rounded-2xl border border-climate-border space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono font-bold">
                <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                <span>LIVE WEATHER API</span>
              </span>
              <span className="text-xs text-slate-400 hidden md:inline">Open-Meteo Public Meteorological Feed</span>
            </div>
            <h3 className="text-base font-bold text-white">
              Real-Time Atmospheric Weather & 7-Day Forecast
            </h3>
          </div>

          {/* Quick Refresh Button */}
          <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
            <button
              onClick={() => setSelectedCity({ ...selectedCity })}
              disabled={isLoading}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-climate-dark border border-climate-border text-xs text-slate-300 hover:text-white hover:border-emerald-500/40 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-emerald-400' : ''}`} />
              <span>Refresh</span>
            </button>

            {/* Save City Button */}
            {cityData && (
              isAuthenticated ? (
                isCitySaved(cityData.weather.cityName, cityData.weather.country) ? (
                  <button
                    onClick={async () => {
                      setIsSavingCity(true);
                      await removeCityLocation(cityData.weather.cityName, cityData.weather.country);
                      setIsSavingCity(false);
                    }}
                    disabled={isSavingCity}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-xs text-amber-300 hover:bg-amber-500/30 transition-colors"
                  >
                    {isSavingCity ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <StarOff className="w-3.5 h-3.5" />}
                    <span>Remove Favorite</span>
                  </button>
                ) : (
                  <button
                    onClick={async () => {
                      setIsSavingCity(true);
                      await saveCityLocation(
                        cityData.weather.cityName,
                        cityData.weather.country,
                        cityData.weather.latitude,
                        cityData.weather.longitude
                      );
                      setIsSavingCity(false);
                    }}
                    disabled={isSavingCity}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-xs text-emerald-300 hover:bg-emerald-500/30 transition-colors"
                  >
                    {isSavingCity ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Star className="w-3.5 h-3.5" />}
                    <span>⭐ Save City</span>
                  </button>
                )
              ) : (
                <button
                  onClick={() => {/* navigate handled outside */}}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-climate-dark border border-climate-border text-xs text-slate-400 hover:text-white hover:border-emerald-500/40 transition-colors"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Login to Save City</span>
                </button>
              )
            )}
          </div>
        </div>

        {/* Search Box with Autocomplete Dropdown */}
        <div className="relative">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search any global city by name (e.g. Kyoto, Vancouver, Madrid, Mumbai, Cairo)..."
              className="w-full bg-climate-darker border border-climate-border rounded-xl pl-10 pr-10 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors shadow-inner"
            />
            {isSearching && (
              <Loader2 className="w-4 h-4 text-emerald-400 animate-spin absolute right-3.5 top-1/2 -translate-y-1/2" />
            )}
          </div>

          {/* Dropdown Results */}
          {searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 z-30 mt-1.5 bg-climate-darker/95 border border-emerald-500/40 rounded-xl shadow-2xl overflow-hidden backdrop-blur-xl max-h-60 overflow-y-auto divide-y divide-white/5">
              {searchResults.map((city) => (
                <button
                  key={`${city.id}-${city.name}`}
                  onClick={() => {
                    setSelectedCity(city);
                    setSearchQuery('');
                    setSearchResults([]);
                  }}
                  className="w-full px-4 py-2.5 flex items-center justify-between text-left hover:bg-emerald-500/15 transition-colors text-xs"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="font-bold text-white">{city.name}</span>
                    {city.admin1 && <span className="text-slate-400 text-[11px]">({city.admin1})</span>}
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {city.country}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Popular City Quick Chips */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[11px] text-slate-400 font-semibold mr-1">Popular Hubs:</span>
          {POPULAR_CITIES.map((c) => {
            const isSelected = selectedCity.name === c.name;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCity(c)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                  isSelected
                    ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-500/50 shadow-sm'
                    : 'bg-climate-dark/80 text-slate-300 border border-climate-border hover:bg-white/5'
                }`}
              >
                {c.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Live Current Weather Card */}
      {isLoading ? (
        <div className="glass-panel p-8 rounded-3xl border border-climate-border flex flex-col items-center justify-center space-y-3 min-h-[260px]">
          <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
          <p className="text-xs text-slate-400 font-mono">Fetching real-time atmospheric conditions from satellite and station feeds...</p>
        </div>
      ) : errorMsg && !cityData ? (
        <div className="glass-panel p-6 rounded-2xl border border-rose-500/40 text-center space-y-2">
          <AlertCircle className="w-6 h-6 text-rose-400 mx-auto" />
          <p className="text-xs text-rose-300">{errorMsg}</p>
        </div>
      ) : cityData ? (
        <div className="space-y-6">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0a2016] via-[#071911] to-[#040e09] border-2 border-emerald-500/40 shadow-2xl relative overflow-hidden">
            
            {/* Background ambient lighting */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left: City Info & Primary Temp */}
              <div className="lg:col-span-6 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-climate-dark border border-climate-border text-emerald-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                      {cityData.weather.cityName}
                    </h2>
                    <span className="text-xs text-emerald-400 font-medium">
                      {cityData.weather.country} • Lat {cityData.weather.latitude.toFixed(2)}°, Lon {cityData.weather.longitude.toFixed(2)}°
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-5 pt-2">
                  <div className="text-5xl sm:text-6xl font-black font-mono text-white tracking-tight leading-none">
                    {cityData.weather.currentTemp}°<span className="text-2xl sm:text-3xl font-sans text-emerald-400 font-bold">C</span>
                  </div>

                  <div className="flex flex-col items-start justify-center pl-4 border-l border-white/10 space-y-1">
                    <div className="flex items-center gap-2">
                      {getWeatherIcon(cityData.weather.weatherCode, false)}
                      <span className="text-sm font-bold text-slate-200">
                        {cityData.weather.weatherDescription}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">
                      Feels like: <strong className="text-amber-300">{cityData.weather.feelsLikeTemp}°C</strong>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Real-time station sync: {cityData.weather.lastUpdated}</span>
                </div>
              </div>

              {/* Right: 4-Metric Sensor Grid */}
              <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                
                {/* Feels Like */}
                <div className="p-3.5 rounded-2xl bg-climate-dark/80 border border-climate-border text-center space-y-1">
                  <span className="text-[10px] text-slate-400 font-medium flex items-center justify-center gap-1">
                    <Thermometer className="w-3.5 h-3.5 text-rose-400" /> Feels Like
                  </span>
                  <div className="text-lg font-black font-mono text-white">{cityData.weather.feelsLikeTemp}°C</div>
                  <span className="text-[9px] text-slate-500 block">Apparent Temp</span>
                </div>

                {/* Humidity */}
                <div className="p-3.5 rounded-2xl bg-climate-dark/80 border border-climate-border text-center space-y-1">
                  <span className="text-[10px] text-slate-400 font-medium flex items-center justify-center gap-1">
                    <Droplets className="w-3.5 h-3.5 text-cyan-400" /> Humidity
                  </span>
                  <div className="text-lg font-black font-mono text-cyan-300">{cityData.weather.humidity}%</div>
                  <span className="text-[9px] text-slate-500 block">Moisture Ratio</span>
                </div>

                {/* Wind Speed */}
                <div className="p-3.5 rounded-2xl bg-climate-dark/80 border border-climate-border text-center space-y-1">
                  <span className="text-[10px] text-slate-400 font-medium flex items-center justify-center gap-1">
                    <Wind className="w-3.5 h-3.5 text-teal-400" /> Wind Speed
                  </span>
                  <div className="text-lg font-black font-mono text-teal-300">{cityData.weather.windSpeed}</div>
                  <span className="text-[9px] text-slate-500 block">km/h velocity</span>
                </div>

                {/* Rainfall / Precip */}
                <div className="p-3.5 rounded-2xl bg-climate-dark/80 border border-climate-border text-center space-y-1">
                  <span className="text-[10px] text-slate-400 font-medium flex items-center justify-center gap-1">
                    <Umbrella className="w-3.5 h-3.5 text-blue-400" /> Rainfall
                  </span>
                  <div className="text-lg font-black font-mono text-blue-300">{cityData.weather.precipitation}</div>
                  <span className="text-[9px] text-slate-500 block">mm (current)</span>
                </div>

              </div>

            </div>
          </div>

          {/* 3. 7-Day Meteorological Forecast Cards */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-400" />
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                  7-Day Meteorological Outlook & Rain Probability
                </h4>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">High / Low Forecast</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {cityData.weather.forecast.map((day, idx) => (
                <div
                  key={day.date}
                  className={`p-3.5 rounded-2xl border flex flex-col justify-between items-center text-center space-y-2 transition-all hover:scale-105 shadow-md ${
                    idx === 0
                      ? 'bg-emerald-500/15 border-emerald-500/50'
                      : 'bg-climate-dark/70 border-climate-border/80 hover:bg-white/5'
                  }`}
                >
                  <span className="text-xs font-bold text-slate-300">{day.dayName}</span>

                  <div className="p-2 rounded-xl bg-climate-dark/90 border border-climate-border">
                    {getWeatherIcon(day.weatherCode, false)}
                  </div>

                  <div className="text-[11px] text-slate-400 line-clamp-1 h-4 leading-tight">
                    {day.weatherDescription}
                  </div>

                  <div className="flex items-center gap-1.5 font-mono text-xs font-bold">
                    <span className="text-rose-400">{day.tempMax}°</span>
                    <span className="text-slate-500">/</span>
                    <span className="text-cyan-400">{day.tempMin}°</span>
                  </div>

                  <div className="pt-2 border-t border-white/5 w-full flex items-center justify-center gap-1 text-[10px] text-slate-400 font-mono">
                    <Droplets className="w-3 h-3 text-cyan-400" />
                    <span>{day.precipitationProbability}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

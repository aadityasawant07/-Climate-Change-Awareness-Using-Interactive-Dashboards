import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { PageTab } from '../../types/climate';
import { 
  searchCitiesApi, 
  fetchLiveCityData 
} from '../../services/weatherApi';
import { 
  CitySearchResult, 
  CompleteCityEnvironmentData 
} from '../../types/climate';
import { 
  MapPin, 
  Trash2, 
  Search, 
  Loader2, 
  Plus, 
  Thermometer, 
  Wind, 
  Droplets, 
  ExternalLink,
  Radio,
  Sparkles
} from 'lucide-react';

interface SavedCitiesViewProps {
  setActiveTab: (tab: PageTab) => void;
}

export const SavedCitiesView: React.FC<SavedCitiesViewProps> = ({ setActiveTab }) => {
  const { savedCities, removeCityLocation, saveCityLocation } = useAuth();

  const [cityTelemetryMap, setCityTelemetryMap] = useState<Record<string, CompleteCityEnvironmentData>>({});
  const [loadingTelemetry, setLoadingTelemetry] = useState<boolean>(true);

  // Search input state for adding new city
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<CitySearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Load telemetry for all saved cities
  useEffect(() => {
    let isMounted = true;
    const loadAll = async () => {
      setLoadingTelemetry(true);
      const newMap: Record<string, CompleteCityEnvironmentData> = {};
      await Promise.all(
        savedCities.map(async (city) => {
          try {
            const data = await fetchLiveCityData(city.latitude, city.longitude, city.cityName, city.country);
            newMap[`${city.cityName}-${city.country}`] = data;
          } catch (err) {
            console.error(`Failed live data for ${city.cityName}:`, err);
          }
        })
      );
      if (isMounted) {
        setCityTelemetryMap(newMap);
        setLoadingTelemetry(false);
      }
    };

    if (savedCities.length > 0) {
      loadAll();
    } else {
      setLoadingTelemetry(false);
    }

    return () => {
      isMounted = false;
    };
  }, [savedCities]);

  // Debounced search handler
  useEffect(() => {
    if (!searchQuery || searchQuery.trim().length < 2) {
      setSearchResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      setIsSearching(true);
      const res = await searchCitiesApi(searchQuery);
      setSearchResults(res);
      setIsSearching(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleAddCity = async (city: CitySearchResult) => {
    setSearchQuery('');
    setSearchResults([]);
    await saveCityLocation(city.name, city.country, city.latitude, city.longitude, city.admin1);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-climate-border flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <MapPin className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              My Saved Climate Observatories
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            Real-time atmospheric telemetry and air quality index for your pinned favorite cities.
          </p>
        </div>

        <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 self-start md:self-auto">
          {savedCities.length} Locations Pinned
        </span>
      </div>

      {/* Add New City Search Bar */}
      <div className="relative glass-panel p-4 rounded-2xl border border-climate-border">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search and add a new city to your favorites (e.g. Kyoto, Vancouver, Sydney, Rome)..."
            className="w-full bg-climate-darker border border-climate-border rounded-xl pl-10 pr-10 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
          {isSearching && (
            <Loader2 className="w-4 h-4 text-emerald-400 animate-spin absolute right-3.5 top-1/2 -translate-y-1/2" />
          )}
        </div>

        {/* Dropdown Results */}
        {searchResults.length > 0 && (
          <div className="absolute top-full left-4 right-4 z-30 mt-1.5 bg-climate-darker/95 border border-emerald-500/40 rounded-xl shadow-2xl overflow-hidden backdrop-blur-xl max-h-52 overflow-y-auto divide-y divide-white/5">
            {searchResults.map((city) => (
              <button
                key={`${city.id}-${city.name}`}
                onClick={() => handleAddCity(city)}
                className="w-full px-4 py-2.5 flex items-center justify-between text-left hover:bg-emerald-500/20 text-xs text-white"
              >
                <div className="flex items-center gap-2">
                  <Plus className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="font-bold">{city.name}</span>
                  {city.admin1 && <span className="text-slate-400 text-[11px]">({city.admin1})</span>}
                </div>
                <span className="text-emerald-400 font-mono text-[11px]">{city.country}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Saved Cities Grid */}
      {savedCities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedCities.map((city) => {
            const telemetry = cityTelemetryMap[`${city.cityName}-${city.country}`];

            return (
              <div
                key={city.id}
                className="glass-panel p-6 rounded-3xl border border-climate-border hover:border-cyan-500/40 transition-all space-y-4 shadow-xl relative group flex flex-col justify-between"
              >
                <div>
                  {/* Top City Header */}
                  <div className="flex items-start justify-between border-b border-white/10 pb-3">
                    <div className="pr-6">
                      <div className="flex items-center gap-1.5 text-cyan-400 font-mono text-[11px]">
                        <Radio className="w-3 h-3 animate-pulse" />
                        <span>LIVE TELEMETRY</span>
                      </div>
                      <h4 className="text-xl font-black text-white mt-0.5">{city.cityName}</h4>
                      <span className="text-xs text-slate-400">{city.country}</span>
                    </div>

                    <button
                      onClick={() => removeCityLocation(city.cityName, city.country)}
                      className="p-1.5 rounded-lg bg-climate-dark border border-climate-border text-slate-400 hover:text-rose-400 hover:border-rose-500/40 transition-colors"
                      title="Remove city"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Live Weather Metrics */}
                  {telemetry ? (
                    <div className="space-y-4 pt-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-4xl font-black font-mono text-white">
                            {telemetry.weather.currentTemp}°C
                          </div>
                          <span className="text-[11px] text-slate-400">{telemetry.weather.weatherDescription}</span>
                        </div>

                        <div className="text-right">
                          <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Air Quality</span>
                          <span className={`text-xl font-black font-mono ${
                            telemetry.aqi.usAqi > 150 ? 'text-rose-400' : telemetry.aqi.usAqi > 100 ? 'text-amber-400' : 'text-emerald-400'
                          }`}>
                            AQI {telemetry.aqi.usAqi}
                          </span>
                          <span className="text-[10px] text-slate-400 block">{telemetry.aqi.category}</span>
                        </div>
                      </div>

                      {/* Sensor Micro-Grid */}
                      <div className="grid grid-cols-3 gap-2 text-center text-xs">
                        <div className="p-2.5 rounded-xl bg-climate-dark/80 border border-climate-border">
                          <span className="text-[10px] text-slate-400 block">Humidity</span>
                          <span className="font-mono font-bold text-cyan-300">{telemetry.weather.humidity}%</span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-climate-dark/80 border border-climate-border">
                          <span className="text-[10px] text-slate-400 block">Wind</span>
                          <span className="font-mono font-bold text-teal-300">{telemetry.weather.windSpeed} km/h</span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-climate-dark/80 border border-climate-border">
                          <span className="text-[10px] text-slate-400 block">Risk Score</span>
                          <span className="font-mono font-bold text-rose-400">{telemetry.riskScore.overallScore}/100</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="py-8 text-center space-y-2">
                      <Loader2 className="w-5 h-5 text-cyan-400 animate-spin mx-auto" />
                      <span className="text-xs text-slate-400 font-mono">Fetching telemetry...</span>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Coordinates: {city.latitude.toFixed(2)}°, {city.longitude.toFixed(2)}°</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="glass-panel p-12 rounded-3xl border border-climate-border text-center space-y-3">
          <MapPin className="w-10 h-10 text-cyan-400 mx-auto opacity-60" />
          <h3 className="text-lg font-bold text-white">No Cities Pinned Yet</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Pin cities to monitor their real-time weather, AQI, and climate risk score directly on your personal dashboard!
          </p>
        </div>
      )}
    </div>
  );
};

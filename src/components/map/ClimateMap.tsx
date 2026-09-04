import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import L from 'leaflet';
import { globalCitiesClimateProfiles } from '../../data/locationData';
import { CityClimateProfile, CitySearchResult } from '../../types/climate';
import { searchCitiesApi, fetchLiveCityData } from '../../services/weatherApi';
import { 
  MapPin, 
  Thermometer, 
  Wind, 
  Waves, 
  ShieldAlert, 
  Search, 
  Filter, 
  Loader2, 
  Radio, 
  Layers 
} from 'lucide-react';

const createCustomPinIcon = (color: string) => {
  return new L.DivIcon({
    className: 'custom-leaflet-pin',
    html: `<div style="
      background: ${color};
      width: 14px;
      height: 14px;
      border-radius: 50%;
      border: 2px solid #ffffff;
      box-shadow: 0 0 12px ${color};
    "></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });
};

interface ClimateMapProps {
  onSelectCity?: (city: CityClimateProfile) => void;
}

export const ClimateMap: React.FC<ClimateMapProps> = ({ onSelectCity }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<CitySearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedContinent, setSelectedContinent] = useState<string>('All');
  const [colorMode, setColorMode] = useState<'aqi' | 'risk' | 'temp'>('risk');

  // Custom dynamically pinned city from search
  const [customPinnedCity, setCustomPinnedCity] = useState<{
    name: string;
    country: string;
    lat: number;
    lon: number;
    temp: number;
    aqi: number;
    riskScore: number;
    riskCat: string;
  } | null>(null);

  const handleSearch = async (val: string) => {
    setSearchQuery(val);
    if (!val || val.trim().length < 2) {
      setSearchResults([]);
      return;
    }
    setIsSearching(true);
    const res = await searchCitiesApi(val);
    setSearchResults(res);
    setIsSearching(false);
  };

  const handleSelectSearchResult = async (city: CitySearchResult) => {
    setSearchQuery('');
    setSearchResults([]);
    try {
      const live = await fetchLiveCityData(city.latitude, city.longitude, city.name, city.country);
      setCustomPinnedCity({
        name: city.name,
        country: city.country,
        lat: city.latitude,
        lon: city.longitude,
        temp: live.weather.currentTemp,
        aqi: live.aqi.usAqi,
        riskScore: live.riskScore.overallScore,
        riskCat: live.riskScore.category,
      });
    } catch (err) {
      console.error('Failed to pin searched city:', err);
    }
  };

  const filteredCities = globalCitiesClimateProfiles.filter((city) => {
    const matchesContinent =
      selectedContinent === 'All' || city.continent === selectedContinent;
    return matchesContinent;
  });

  const getMarkerColor = (city: CityClimateProfile) => {
    if (colorMode === 'risk') {
      // Risk score: 0-20 (green), 21-40 (teal), 41-60 (yellow), 61-80 (orange), 81-100 (rose)
      const risk = (city.tempAnomalyC * 20 + city.aqi * 0.2 + city.seaLevelRiskScore * 0.3);
      if (risk > 65) return '#f43f5e';
      if (risk > 45) return '#f59e0b';
      if (risk > 25) return '#14b8a6';
      return '#10b981';
    } else if (colorMode === 'aqi') {
      if (city.aqi > 200) return '#a855f7';
      if (city.aqi > 100) return '#f43f5e';
      if (city.aqi > 50) return '#f59e0b';
      return '#10b981';
    } else {
      if (city.tempAnomalyC > 1.8) return '#ef4444';
      if (city.tempAnomalyC > 1.3) return '#f59e0b';
      return '#10b981';
    }
  };

  return (
    <div className="space-y-4">
      {/* Search & Filter Controls */}
      <div className="glass-panel p-4 rounded-2xl border border-climate-border flex flex-wrap items-center justify-between gap-3">
        
        {/* Search input with autocompletion */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search & pin any city on the map (e.g. Cairo, Sydney, Berlin)..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full bg-climate-darker border border-climate-border rounded-xl pl-9 pr-8 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
          {isSearching && (
            <Loader2 className="w-3.5 h-3.5 text-emerald-400 animate-spin absolute right-3 top-1/2 -translate-y-1/2" />
          )}

          {/* Autocomplete Dropdown */}
          {searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 z-30 mt-1 bg-climate-darker/95 border border-emerald-500/40 rounded-xl shadow-2xl overflow-hidden backdrop-blur-xl max-h-48 overflow-y-auto divide-y divide-white/5">
              {searchResults.map((city) => (
                <button
                  key={`${city.id}-${city.name}`}
                  onClick={() => handleSelectSearchResult(city)}
                  className="w-full px-3 py-2 text-left text-xs hover:bg-emerald-500/20 text-white flex justify-between"
                >
                  <span className="font-semibold">{city.name} {city.admin1 && `(${city.admin1})`}</span>
                  <span className="text-emerald-400 font-mono">{city.country}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Color Mode Switcher */}
        <div className="flex items-center gap-1 bg-climate-darker p-1 rounded-xl border border-climate-border">
          <button
            onClick={() => setColorMode('risk')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              colorMode === 'risk' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            🛡️ Climate Risk
          </button>
          <button
            onClick={() => setColorMode('aqi')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              colorMode === 'aqi' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            💨 AQI Severity
          </button>
          <button
            onClick={() => setColorMode('temp')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              colorMode === 'temp' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            🔥 Temperature
          </button>
        </div>

        {/* Continent Filter */}
        <select
          value={selectedContinent}
          onChange={(e) => setSelectedContinent(e.target.value)}
          className="bg-climate-darker border border-climate-border rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
        >
          <option value="All">All Continents</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="North America">North America</option>
          <option value="South America">South America</option>
          <option value="Africa">Africa</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>

      {/* Map Container */}
      <div className="w-full h-[520px] rounded-3xl overflow-hidden glass-panel border border-climate-border relative shadow-2xl">
        <MapContainer
          center={[22, 10]}
          zoom={2}
          minZoom={2}
          maxZoom={10}
          scrollWheelZoom={true}
          style={{ width: '100%', height: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CARTO</a> OpenStreetMap'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png"
          />

          {/* Render Default Cities */}
          {filteredCities.map((city) => {
            const markerColor = getMarkerColor(city);
            const pinIcon = createCustomPinIcon(markerColor);
            return (
              <React.Fragment key={city.id}>
                <CircleMarker
                  center={city.coordinates}
                  radius={12 + city.tempAnomalyC * 3}
                  pathOptions={{
                    color: markerColor,
                    fillColor: markerColor,
                    fillOpacity: 0.3,
                    weight: 1.5,
                  }}
                />

                <Marker position={city.coordinates} icon={pinIcon}>
                  <Popup>
                    <div className="p-1 space-y-2 text-slate-100 font-sans min-w-[210px]">
                      <div className="flex items-center justify-between border-b border-white/10 pb-1">
                        <span className="font-bold text-sm text-emerald-400">{city.cityName}</span>
                        <span className="text-[10px] text-slate-400 font-medium">{city.country}</span>
                      </div>

                      <div className="space-y-1 text-xs font-mono">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-300 flex items-center gap-1">
                            <Thermometer className="w-3 h-3 text-rose-400" /> Temperature:
                          </span>
                          <span className="font-bold text-white">{city.currentTempC}°C (+{city.tempAnomalyC}°C)</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-slate-300 flex items-center gap-1">
                            <Wind className="w-3 h-3 text-amber-400" /> Air Quality:
                          </span>
                          <span className="font-bold text-amber-400">AQI {city.aqi} ({city.aqiCategory})</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-slate-300 flex items-center gap-1">
                            <Waves className="w-3 h-3 text-cyan-400" /> Sea Level Risk:
                          </span>
                          <span className="font-bold text-cyan-400">{city.seaLevelRiskScore}/100</span>
                        </div>
                      </div>

                      <div className="text-[11px] text-slate-300 pt-1 border-t border-white/10 leading-snug">
                        <strong className="text-emerald-300">Vulnerability: </strong>
                        {city.keyVulnerability}
                      </div>

                      {onSelectCity && (
                        <button
                          onClick={() => onSelectCity(city)}
                          className="w-full mt-2 py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors"
                        >
                          Select for Comparison
                        </button>
                      )}
                    </div>
                  </Popup>
                </Marker>
              </React.Fragment>
            );
          })}

          {/* Render Searched & Pinned Custom City */}
          {customPinnedCity && (
            <React.Fragment>
              <CircleMarker
                center={[customPinnedCity.lat, customPinnedCity.lon]}
                radius={20}
                pathOptions={{
                  color: '#38bdf8',
                  fillColor: '#38bdf8',
                  fillOpacity: 0.4,
                  weight: 2,
                }}
              />
              <Marker
                position={[customPinnedCity.lat, customPinnedCity.lon]}
                icon={createCustomPinIcon('#38bdf8')}
              >
                <Popup>
                  <div className="p-1 space-y-2 text-slate-100 font-sans min-w-[210px]">
                    <div className="flex items-center justify-between border-b border-white/10 pb-1">
                      <span className="font-bold text-sm text-cyan-400">📍 {customPinnedCity.name}</span>
                      <span className="text-[10px] text-slate-400">{customPinnedCity.country}</span>
                    </div>
                    <div className="space-y-1 text-xs font-mono">
                      <div className="flex justify-between">
                        <span>Live Temperature:</span>
                        <strong className="text-white">{customPinnedCity.temp}°C</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Live AQI:</span>
                        <strong className="text-amber-400">{customPinnedCity.aqi}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Climate Risk:</span>
                        <strong className="text-rose-400">{customPinnedCity.riskScore}/100 ({customPinnedCity.riskCat})</strong>
                      </div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            </React.Fragment>
          )}
        </MapContainer>

        {/* Legend Box */}
        <div className="absolute bottom-4 left-4 z-[1000] bg-climate-dark/95 backdrop-blur-md border border-climate-border p-3.5 rounded-2xl shadow-2xl text-xs space-y-2 pointer-events-auto">
          <div className="font-bold text-slate-200 text-[11px] uppercase tracking-wider">
            {colorMode === 'risk' ? 'Climate Risk Scale' : colorMode === 'aqi' ? 'Air Quality Scale' : 'Temperature Anomaly'}
          </div>
          
          <div className="flex items-center gap-3 font-mono text-[10px]">
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span className="text-slate-300">Very Low / Good</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span className="text-slate-300">Moderate</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span className="text-slate-300">Severe / High</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

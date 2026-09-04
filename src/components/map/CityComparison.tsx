import React, { useState, useEffect } from 'react';
import { 
  POPULAR_CITIES, 
  searchCitiesApi, 
  fetchLiveCityData 
} from '../../services/weatherApi';
import { 
  CitySearchResult, 
  CompleteCityEnvironmentData 
} from '../../types/climate';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { 
  Scale, 
  Search, 
  MapPin, 
  Thermometer, 
  Wind, 
  Droplets, 
  Umbrella, 
  ShieldAlert, 
  ArrowRightLeft, 
  Loader2,
  CheckCircle2,
  TrendingUp
} from 'lucide-react';

export const CityComparison: React.FC = () => {
  const [cityASelection, setCityASelection] = useState<CitySearchResult>(POPULAR_CITIES[3]); // New Delhi
  const [cityBSelection, setCityBSelection] = useState<CitySearchResult>(POPULAR_CITIES[1]); // London

  const [cityAData, setCityAData] = useState<CompleteCityEnvironmentData | null>(null);
  const [cityBData, setCityBData] = useState<CompleteCityEnvironmentData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Search states for City A
  const [searchQueryA, setSearchQueryA] = useState<string>('');
  const [resultsA, setResultsA] = useState<CitySearchResult[]>([]);
  const [isSearchingA, setIsSearchingA] = useState<boolean>(false);

  // Search states for City B
  const [searchQueryB, setSearchQueryB] = useState<string>('');
  const [resultsB, setResultsB] = useState<CitySearchResult[]>([]);
  const [isSearchingB, setIsSearchingB] = useState<boolean>(false);

  // Fetch data for both cities
  useEffect(() => {
    let isMounted = true;
    const fetchBoth = async () => {
      setLoading(true);
      try {
        const [dataA, dataB] = await Promise.all([
          fetchLiveCityData(cityASelection.latitude, cityASelection.longitude, cityASelection.name, cityASelection.country),
          fetchLiveCityData(cityBSelection.latitude, cityBSelection.longitude, cityBSelection.name, cityBSelection.country),
        ]);
        if (isMounted) {
          setCityAData(dataA);
          setCityBData(dataB);
        }
      } catch (err) {
        console.error('Failed to compare cities:', err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    fetchBoth();
    return () => {
      isMounted = false;
    };
  }, [cityASelection, cityBSelection]);

  // Debounced search for City A
  useEffect(() => {
    if (!searchQueryA || searchQueryA.trim().length < 2) {
      setResultsA([]);
      return;
    }
    const timer = setTimeout(async () => {
      setIsSearchingA(true);
      const res = await searchCitiesApi(searchQueryA);
      setResultsA(res);
      setIsSearchingA(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQueryA]);

  // Debounced search for City B
  useEffect(() => {
    if (!searchQueryB || searchQueryB.trim().length < 2) {
      setResultsB([]);
      return;
    }
    const timer = setTimeout(async () => {
      setIsSearchingB(true);
      const res = await searchCitiesApi(searchQueryB);
      setResultsB(res);
      setIsSearchingB(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQueryB]);

  // Swap City A and City B
  const handleSwap = () => {
    const temp = cityASelection;
    setCityASelection(cityBSelection);
    setCityBSelection(temp);
  };

  // Prepare Comparative Chart Datasets
  const comparisonBarData = (cityAData && cityBData) ? [
    {
      metric: 'Temperature (°C)',
      [cityAData.weather.cityName]: cityAData.weather.currentTemp,
      [cityBData.weather.cityName]: cityBData.weather.currentTemp,
    },
    {
      metric: 'Air Quality (AQI)',
      [cityAData.weather.cityName]: cityAData.aqi.usAqi,
      [cityBData.weather.cityName]: cityBData.aqi.usAqi,
    },
    {
      metric: 'Humidity (%)',
      [cityAData.weather.cityName]: cityAData.weather.humidity,
      [cityBData.weather.cityName]: cityBData.weather.humidity,
    },
    {
      metric: 'Wind Speed (km/h)',
      [cityAData.weather.cityName]: cityAData.weather.windSpeed,
      [cityBData.weather.cityName]: cityBData.weather.windSpeed,
    },
    {
      metric: 'Climate Risk (0-100)',
      [cityAData.weather.cityName]: cityAData.riskScore.overallScore,
      [cityBData.weather.cityName]: cityBData.riskScore.overallScore,
    },
  ] : [];

  const pollutantComparisonData = (cityAData && cityBData) ? [
    { pollutant: 'PM2.5', [cityAData.weather.cityName]: cityAData.aqi.pm25, [cityBData.weather.cityName]: cityBData.aqi.pm25 },
    { pollutant: 'PM10', [cityAData.weather.cityName]: cityAData.aqi.pm10, [cityBData.weather.cityName]: cityBData.aqi.pm10 },
    { pollutant: 'NO₂', [cityAData.weather.cityName]: cityAData.aqi.no2, [cityBData.weather.cityName]: cityBData.aqi.no2 },
    { pollutant: 'SO₂', [cityAData.weather.cityName]: cityAData.aqi.so2, [cityBData.weather.cityName]: cityBData.aqi.so2 },
    { pollutant: 'Ozone (O₃)', [cityAData.weather.cityName]: cityAData.aqi.ozone, [cityBData.weather.cityName]: cityBData.aqi.ozone },
  ] : [];

  return (
    <div className="space-y-8">
      {/* 1. Header & Dual Search Pickers */}
      <div className="glass-panel p-6 rounded-3xl border border-climate-border space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white">
              Dual-City Real-Time Climate & Environmental Comparison
            </h3>
            <p className="text-xs text-slate-400">
              Select any two global cities to compare live temperature, AQI, atmospheric pollutants, and composite climate risk scores.
            </p>
          </div>
        </div>

        {/* Dual City Search Controls */}
        <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
          
          {/* City A Input */}
          <div className="md:col-span-5 relative space-y-1.5">
            <label className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
              City A (Primary)
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={`Search City A (Current: ${cityASelection.name})...`}
                value={searchQueryA}
                onChange={(e) => setSearchQueryA(e.target.value)}
                className="w-full bg-climate-darker border border-emerald-500/40 rounded-xl pl-9 pr-8 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
              />
              {isSearchingA && (
                <Loader2 className="w-3.5 h-3.5 text-emerald-400 animate-spin absolute right-3 top-1/2 -translate-y-1/2" />
              )}
            </div>

            {/* Dropdown A */}
            {resultsA.length > 0 && (
              <div className="absolute top-full left-0 right-0 z-30 mt-1 bg-climate-darker/95 border border-emerald-500/40 rounded-xl shadow-2xl overflow-hidden backdrop-blur-xl max-h-48 overflow-y-auto divide-y divide-white/5">
                {resultsA.map((city) => (
                  <button
                    key={`A-${city.id}`}
                    onClick={() => {
                      setCityASelection(city);
                      setSearchQueryA('');
                      setResultsA([]);
                    }}
                    className="w-full px-3 py-2 text-left text-xs hover:bg-emerald-500/20 text-white flex justify-between"
                  >
                    <span>{city.name} {city.admin1 && `(${city.admin1})`}</span>
                    <span className="text-emerald-400 font-mono">{city.country}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Swap Button */}
          <div className="md:col-span-1 flex justify-center pt-5">
            <button
              onClick={handleSwap}
              className="p-2.5 rounded-full bg-climate-dark border border-climate-border hover:border-emerald-500 text-slate-300 hover:text-white transition-all hover:rotate-180"
              title="Swap Cities"
            >
              <ArrowRightLeft className="w-4 h-4" />
            </button>
          </div>

          {/* City B Input */}
          <div className="md:col-span-5 relative space-y-1.5">
            <label className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block">
              City B (Comparison)
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={`Search City B (Current: ${cityBSelection.name})...`}
                value={searchQueryB}
                onChange={(e) => setSearchQueryB(e.target.value)}
                className="w-full bg-climate-darker border border-cyan-500/40 rounded-xl pl-9 pr-8 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
              {isSearchingB && (
                <Loader2 className="w-3.5 h-3.5 text-cyan-400 animate-spin absolute right-3 top-1/2 -translate-y-1/2" />
              )}
            </div>

            {/* Dropdown B */}
            {resultsB.length > 0 && (
              <div className="absolute top-full left-0 right-0 z-30 mt-1 bg-climate-darker/95 border border-cyan-500/40 rounded-xl shadow-2xl overflow-hidden backdrop-blur-xl max-h-48 overflow-y-auto divide-y divide-white/5">
                {resultsB.map((city) => (
                  <button
                    key={`B-${city.id}`}
                    onClick={() => {
                      setCityBSelection(city);
                      setSearchQueryB('');
                      setResultsB([]);
                    }}
                    className="w-full px-3 py-2 text-left text-xs hover:bg-cyan-500/20 text-white flex justify-between"
                  >
                    <span>{city.name} {city.admin1 && `(${city.admin1})`}</span>
                    <span className="text-cyan-400 font-mono">{city.country}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* 2. Side-by-Side Live Metric Comparison Cards */}
      {loading ? (
        <div className="glass-panel p-12 rounded-3xl border border-climate-border flex flex-col items-center justify-center space-y-3">
          <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
          <p className="text-xs text-slate-400 font-mono">Fetching live comparison telemetry from meteorological satellites...</p>
        </div>
      ) : cityAData && cityBData ? (
        <div className="space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Card City A */}
            <div className="glass-panel p-6 sm:p-7 rounded-3xl border-2 border-emerald-500/50 bg-emerald-950/10 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase tracking-wider">
                    City A
                  </span>
                  <h4 className="text-2xl font-black text-white mt-1">{cityAData.weather.cityName}</h4>
                  <span className="text-xs text-slate-400">{cityAData.weather.country}</span>
                </div>

                <div className="text-right">
                  <div className="text-4xl font-black font-mono text-emerald-400">
                    {cityAData.weather.currentTemp}°C
                  </div>
                  <span className="text-[11px] text-slate-400">{cityAData.weather.weatherDescription}</span>
                </div>
              </div>

              {/* Core Metrics Rows */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-2xl bg-climate-dark/80 border border-climate-border">
                  <span className="text-[11px] text-slate-400 block mb-1">Air Quality (AQI)</span>
                  <div className="text-xl font-bold font-mono text-amber-400">{cityAData.aqi.usAqi}</div>
                  <span className="text-[10px] text-slate-500 block">{cityAData.aqi.category}</span>
                </div>

                <div className="p-3 rounded-2xl bg-climate-dark/80 border border-climate-border">
                  <span className="text-[11px] text-slate-400 block mb-1">Climate Risk (0-100)</span>
                  <div className="text-xl font-bold font-mono text-rose-400">{cityAData.riskScore.overallScore}</div>
                  <span className="text-[10px] text-slate-500 block">{cityAData.riskScore.category} Risk</span>
                </div>

                <div className="p-3 rounded-2xl bg-climate-dark/80 border border-climate-border">
                  <span className="text-[11px] text-slate-400 block mb-1">Relative Humidity</span>
                  <div className="text-lg font-bold font-mono text-cyan-300">{cityAData.weather.humidity}%</div>
                </div>

                <div className="p-3 rounded-2xl bg-climate-dark/80 border border-climate-border">
                  <span className="text-[11px] text-slate-400 block mb-1">Wind Speed</span>
                  <div className="text-lg font-bold font-mono text-teal-300">{cityAData.weather.windSpeed} km/h</div>
                </div>
              </div>

              {/* Pollutant Micro-Bar */}
              <div className="p-3.5 rounded-2xl bg-climate-dark/60 border border-climate-border text-xs space-y-1.5">
                <span className="font-bold text-slate-300 block">Pollutants Breakdown:</span>
                <div className="flex flex-wrap gap-2 text-[11px] font-mono">
                  <span className="bg-white/5 px-2 py-0.5 rounded text-slate-300">PM2.5: <strong className="text-rose-400">{cityAData.aqi.pm25}</strong></span>
                  <span className="bg-white/5 px-2 py-0.5 rounded text-slate-300">PM10: <strong className="text-amber-400">{cityAData.aqi.pm10}</strong></span>
                  <span className="bg-white/5 px-2 py-0.5 rounded text-slate-300">NO₂: <strong className="text-cyan-400">{cityAData.aqi.no2}</strong></span>
                  <span className="bg-white/5 px-2 py-0.5 rounded text-slate-300">O₃: <strong className="text-teal-400">{cityAData.aqi.ozone}</strong></span>
                </div>
              </div>
            </div>

            {/* Card City B */}
            <div className="glass-panel p-6 sm:p-7 rounded-3xl border-2 border-cyan-500/50 bg-cyan-950/10 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 uppercase tracking-wider">
                    City B
                  </span>
                  <h4 className="text-2xl font-black text-white mt-1">{cityBData.weather.cityName}</h4>
                  <span className="text-xs text-slate-400">{cityBData.weather.country}</span>
                </div>

                <div className="text-right">
                  <div className="text-4xl font-black font-mono text-cyan-400">
                    {cityBData.weather.currentTemp}°C
                  </div>
                  <span className="text-[11px] text-slate-400">{cityBData.weather.weatherDescription}</span>
                </div>
              </div>

              {/* Core Metrics Rows */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-2xl bg-climate-dark/80 border border-climate-border">
                  <span className="text-[11px] text-slate-400 block mb-1">Air Quality (AQI)</span>
                  <div className="text-xl font-bold font-mono text-amber-400">{cityBData.aqi.usAqi}</div>
                  <span className="text-[10px] text-slate-500 block">{cityBData.aqi.category}</span>
                </div>

                <div className="p-3 rounded-2xl bg-climate-dark/80 border border-climate-border">
                  <span className="text-[11px] text-slate-400 block mb-1">Climate Risk (0-100)</span>
                  <div className="text-xl font-bold font-mono text-rose-400">{cityBData.riskScore.overallScore}</div>
                  <span className="text-[10px] text-slate-500 block">{cityBData.riskScore.category} Risk</span>
                </div>

                <div className="p-3 rounded-2xl bg-climate-dark/80 border border-climate-border">
                  <span className="text-[11px] text-slate-400 block mb-1">Relative Humidity</span>
                  <div className="text-lg font-bold font-mono text-cyan-300">{cityBData.weather.humidity}%</div>
                </div>

                <div className="p-3 rounded-2xl bg-climate-dark/80 border border-climate-border">
                  <span className="text-[11px] text-slate-400 block mb-1">Wind Speed</span>
                  <div className="text-lg font-bold font-mono text-teal-300">{cityBData.weather.windSpeed} km/h</div>
                </div>
              </div>

              {/* Pollutant Micro-Bar */}
              <div className="p-3.5 rounded-2xl bg-climate-dark/60 border border-climate-border text-xs space-y-1.5">
                <span className="font-bold text-slate-300 block">Pollutants Breakdown:</span>
                <div className="flex flex-wrap gap-2 text-[11px] font-mono">
                  <span className="bg-white/5 px-2 py-0.5 rounded text-slate-300">PM2.5: <strong className="text-rose-400">{cityBData.aqi.pm25}</strong></span>
                  <span className="bg-white/5 px-2 py-0.5 rounded text-slate-300">PM10: <strong className="text-amber-400">{cityBData.aqi.pm10}</strong></span>
                  <span className="bg-white/5 px-2 py-0.5 rounded text-slate-300">NO₂: <strong className="text-cyan-400">{cityBData.aqi.no2}</strong></span>
                  <span className="bg-white/5 px-2 py-0.5 rounded text-slate-300">O₃: <strong className="text-teal-400">{cityBData.aqi.ozone}</strong></span>
                </div>
              </div>
            </div>

          </div>

          {/* 3. Comparison Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Primary Metrics Bar Chart */}
            <div className="lg:col-span-7 glass-panel p-6 rounded-3xl border border-climate-border space-y-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>Direct Environmental Metrics Comparison</span>
              </h4>

              <div className="w-full h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={comparisonBarData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1b4332" opacity={0.3} />
                    <XAxis dataKey="metric" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                    <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#060d0a', borderColor: '#2d6a4f', borderRadius: '12px', fontSize: '11px' }}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                    <Bar dataKey={cityAData.weather.cityName} fill="#10b981" radius={[4, 4, 0, 0]} />
                    <Bar dataKey={cityBData.weather.cityName} fill="#06b6d4" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Pollutant Breakdown Bar Chart */}
            <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-climate-border space-y-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Wind className="w-4 h-4 text-amber-400" />
                <span>Ambient Pollutant Levels (µg/m³)</span>
              </h4>

              <div className="w-full h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={pollutantComparisonData} layout="vertical" margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1b4332" opacity={0.3} horizontal={false} />
                    <XAxis type="number" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                    <YAxis dataKey="pollutant" type="category" stroke="#64748b" tick={{ fill: '#f1f5f9', fontSize: 11 }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#060d0a', borderColor: '#2d6a4f', borderRadius: '12px', fontSize: '11px' }}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                    <Bar dataKey={cityAData.weather.cityName} fill="#10b981" radius={[0, 4, 4, 0]} />
                    <Bar dataKey={cityBData.weather.cityName} fill="#06b6d4" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

        </div>
      ) : null}
    </div>
  );
};

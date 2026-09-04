import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { aqiCategories, cityAqiList } from '../../data/aqiData';
import { CityAQIData } from '../../types/climate';
import { Wind, ShieldAlert, HeartPulse, Activity, ChevronRight } from 'lucide-react';

export const AqiCardSection: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<CityAQIData>(cityAqiList[0]);

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Good':
        return 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10';
      case 'Moderate':
        return 'text-yellow-400 border-yellow-500/40 bg-yellow-500/10';
      case 'Poor':
        return 'text-amber-400 border-amber-500/40 bg-amber-500/10';
      case 'Unhealthy':
        return 'text-rose-400 border-rose-500/40 bg-rose-500/10';
      case 'Hazardous':
        return 'text-purple-400 border-purple-500/40 bg-purple-500/10';
      default:
        return 'text-slate-400 border-slate-700 bg-slate-800';
    }
  };

  const getGaugeDeg = (aqi: number) => {
    // Clamp AQI to max 400 for a 180-deg gauge
    const clamped = Math.min(400, Math.max(0, aqi));
    return (clamped / 400) * 180;
  };

  return (
    <div className="space-y-6">
      {/* 1. AQI Standard Categories Legend Cards */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Wind className="w-4 h-4 text-emerald-400" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Air Quality Index (AQI) Categorization Standard
          </h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {aqiCategories.map((item) => (
            <div
              key={item.category}
              className={`p-3 rounded-xl border ${item.borderColor} bg-climate-dark/70 transition-all hover:scale-[1.02] flex flex-col justify-between`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className={`text-xs font-bold ${item.textColor}`}>{item.category}</span>
                <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-slate-300">
                  {item.range}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Interactive City AQI Monitor Panel */}
      <div className="glass-panel p-6 rounded-2xl grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: City List Selector */}
        <div className="lg:col-span-4 space-y-2 border-b lg:border-b-0 lg:border-r border-climate-border pb-4 lg:pb-0 lg:pr-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Monitored Megacities
            </h4>
            <span className="text-[10px] text-slate-400">Live Simulation</span>
          </div>

          <div className="space-y-1.5 max-h-80 overflow-y-auto pr-1">
            {cityAqiList.map((city) => {
              const isSelected = selectedCity.id === city.id;
              return (
                <button
                  key={city.id}
                  onClick={() => setSelectedCity(city)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all text-left ${
                    isSelected
                      ? 'bg-emerald-500/15 border-emerald-500/50 shadow-sm'
                      : 'bg-climate-dark/50 border-climate-border/60 hover:bg-white/5 hover:border-climate-border'
                  }`}
                >
                  <div>
                    <div className="font-bold text-sm text-white">{city.cityName}</div>
                    <div className="text-[11px] text-slate-400">{city.country}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-md border font-mono ${getCategoryColor(city.category)}`}>
                      AQI {city.currentAQI}
                    </span>
                    <ChevronRight className={`w-4 h-4 text-slate-400 ${isSelected ? 'text-emerald-400 translate-x-0.5' : ''}`} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Selected City Pollutant Breakdown & Health Advisory */}
        <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
          {/* Header Info */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white">{selectedCity.cityName}, {selectedCity.country}</h3>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${getCategoryColor(selectedCity.category)}`}>
                  {selectedCity.category} Air Quality
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Dominant atmospheric pollutant: <span className="text-emerald-400 font-semibold">{selectedCity.dominantPollutant}</span>
              </p>
            </div>

            {/* Current AQI Large Badge */}
            <div className="flex items-center gap-3 bg-climate-dark/80 border border-climate-border px-4 py-2 rounded-2xl">
              <div className="text-center">
                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Current AQI</div>
                <div className="text-3xl font-black font-mono text-white leading-none mt-1">
                  {selectedCity.currentAQI}
                </div>
              </div>
            </div>
          </div>

          {/* 5-Pollutant Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            <div className="p-2.5 rounded-xl bg-climate-dark/80 border border-climate-border text-center">
              <span className="text-[10px] text-slate-400 block mb-1">PM2.5 (Fine)</span>
              <span className="text-sm font-bold font-mono text-rose-400">{selectedCity.pm25}</span>
              <span className="text-[9px] text-slate-500 block">µg/m³</span>
            </div>
            <div className="p-2.5 rounded-xl bg-climate-dark/80 border border-climate-border text-center">
              <span className="text-[10px] text-slate-400 block mb-1">PM10 (Coarse)</span>
              <span className="text-sm font-bold font-mono text-amber-400">{selectedCity.pm10}</span>
              <span className="text-[9px] text-slate-500 block">µg/m³</span>
            </div>
            <div className="p-2.5 rounded-xl bg-climate-dark/80 border border-climate-border text-center">
              <span className="text-[10px] text-slate-400 block mb-1">NO₂ (Dioxide)</span>
              <span className="text-sm font-bold font-mono text-cyan-400">{selectedCity.no2}</span>
              <span className="text-[9px] text-slate-500 block">ppb</span>
            </div>
            <div className="p-2.5 rounded-xl bg-climate-dark/80 border border-climate-border text-center">
              <span className="text-[10px] text-slate-400 block mb-1">O₃ (Ozone)</span>
              <span className="text-sm font-bold font-mono text-teal-400">{selectedCity.o3}</span>
              <span className="text-[9px] text-slate-500 block">ppb</span>
            </div>
            <div className="p-2.5 rounded-xl bg-climate-dark/80 border border-climate-border text-center col-span-2 sm:col-span-1">
              <span className="text-[10px] text-slate-400 block mb-1">CO (Monoxide)</span>
              <span className="text-sm font-bold font-mono text-purple-400">{selectedCity.co}</span>
              <span className="text-[9px] text-slate-500 block">ppm</span>
            </div>
          </div>

          {/* Monthly Historical Seasonality Chart */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-300">12-Month AQI Seasonality Curve</span>
              <span className="text-[10px] text-slate-400">Peak inversions during winter</span>
            </div>
            <div className="w-full h-32">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={selectedCity.historicalTrend} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="cityAqiGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1b4332" opacity={0.3} />
                  <XAxis dataKey="month" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                  <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#060d0a', borderColor: '#2d6a4f', borderRadius: '8px', fontSize: '11px' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="aqi"
                    stroke="#10b981"
                    strokeWidth={2}
                    fill="url(#cityAqiGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Health Recommendation Card */}
          <div className="p-3.5 rounded-xl bg-climate-dark/90 border border-emerald-500/30 flex items-start gap-3 text-xs">
            <HeartPulse className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white block mb-0.5">Health Guidance & Protective Action:</span>
              <p className="text-slate-300 leading-relaxed">{selectedCity.healthRecommendation}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

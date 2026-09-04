import React, { useState } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Cell,
  ReferenceLine,
} from 'recharts';
import { rainfallTrendData } from '../../data/climateData';
import { CloudRain, Waves, SunMedium } from 'lucide-react';

export const RainfallChart: React.FC = () => {
  const [viewMode, setViewMode] = useState<'anomaly' | 'extremes'>('anomaly');

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-climate-darker/95 border border-climate-border p-3.5 rounded-xl shadow-2xl backdrop-blur-md text-xs font-mono">
          <p className="font-bold text-white text-sm mb-1.5">Year: {label}</p>
          <p className="text-cyan-400 flex items-center justify-between gap-4">
            <span>Precipitation Anomaly:</span>
            <span className="font-bold">{data.globalPrecipAnomalyMm > 0 ? `+${data.globalPrecipAnomalyMm}` : data.globalPrecipAnomalyMm} mm</span>
          </p>
          <p className="text-amber-400 flex items-center justify-between gap-4">
            <span>Drought Severity Index:</span>
            <span>{data.extremeDroughtIndex} / 100</span>
          </p>
          <p className="text-blue-400 flex items-center justify-between gap-4">
            <span>Extreme Flood Index:</span>
            <span>{data.extremeFloodIndex} / 100</span>
          </p>
          <p className="text-purple-400 flex items-center justify-between gap-4 pt-1 border-t border-white/10 mt-1">
            <span>Monsoon Volatility Score:</span>
            <span>{data.monsoonVolatilityScore} / 100</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between">
      {/* Header & Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <CloudRain className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-white">Global Precipitation & Extreme Hydrology</h3>
            <span className="text-xs px-2 py-0.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full font-mono">
              1960 – 2024
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Global precipitation volatility anomalies and frequency of simultaneous extreme droughts and deluge floods.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1.5 bg-climate-dark/70 border border-climate-border p-1 rounded-xl">
          <button
            onClick={() => setViewMode('anomaly')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              viewMode === 'anomaly'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Precipitation Anomaly
          </button>
          <button
            onClick={() => setViewMode('extremes')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              viewMode === 'extremes'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Drought vs Flood Indices
          </button>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="w-full h-80 sm:h-96">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={rainfallTrendData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1b4332" opacity={0.4} />

            <XAxis
              dataKey="year"
              stroke="#64748b"
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              tickLine={{ stroke: '#1b4332' }}
            />
            <YAxis
              stroke="#64748b"
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              tickLine={{ stroke: '#1b4332' }}
              tickFormatter={(v) => (viewMode === 'anomaly' ? `${v}mm` : `${v}`)}
            />

            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
              formatter={(value) => <span className="text-slate-300">{value}</span>}
            />

            {viewMode === 'anomaly' ? (
              <>
                <ReferenceLine y={0} stroke="#64748b" strokeDasharray="4 4" />
                <Bar dataKey="globalPrecipAnomalyMm" name="Global Precip Anomaly (mm)" radius={[4, 4, 0, 0]}>
                  {rainfallTrendData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.globalPrecipAnomalyMm >= 0 ? '#06b6d4' : '#f59e0b'}
                    />
                  ))}
                </Bar>
                <Line
                  type="monotone"
                  dataKey="monsoonVolatilityScore"
                  name="Hydrological Volatility Index"
                  stroke="#a855f7"
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: '#a855f7' }}
                />
              </>
            ) : (
              <>
                <Bar dataKey="extremeDroughtIndex" name="Drought Severity (0-100)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                <Bar dataKey="extremeFloodIndex" name="Extreme Flood Intensity (0-100)" fill="#0284c7" radius={[4, 4, 0, 0]} />
                <Line
                  type="monotone"
                  dataKey="monsoonVolatilityScore"
                  name="Overall Volatility Trend"
                  stroke="#10b981"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: '#10b981' }}
                />
              </>
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Hydrological Impact Explanations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
        <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-800/30 flex items-start gap-2.5">
          <Waves className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold text-cyan-300">Intensified Deluges:</span> A warmer atmosphere causes rapid cloudburst precipitation events, overwhelming municipal storm drains and river catchments.
          </div>
        </div>

        <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-800/30 flex items-start gap-2.5">
          <SunMedium className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold text-amber-300">Flash Mega-Droughts:</span> Higher heat accelerates surface evapotranspiration, rapidly depleting soil moisture reserves and agricultural reservoirs.
          </div>
        </div>
      </div>
    </div>
  );
};

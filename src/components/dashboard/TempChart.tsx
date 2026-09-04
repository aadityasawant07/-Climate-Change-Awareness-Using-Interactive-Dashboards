import React, { useState } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ReferenceLine,
  CartesianGrid,
} from 'recharts';
import { historicalTemperatureData } from '../../data/climateData';
import { Thermometer, Eye, AlertTriangle, Layers } from 'lucide-react';

interface TempChartProps {
  startYear?: number;
  endYear?: number;
}

export const TempChart: React.FC<TempChartProps> = ({ startYear = 1880, endYear = 2050 }) => {
  const [showScenarios, setShowScenarios] = useState<boolean>(true);
  const [showLandOcean, setShowLandOcean] = useState<boolean>(false);

  const filteredData = historicalTemperatureData.filter(
    (d) => d.year >= startYear && d.year <= endYear
  );

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      return (
        <div className="bg-climate-darker/95 border border-climate-border p-4 rounded-xl shadow-2xl backdrop-blur-md text-xs font-mono">
          <p className="font-bold text-white text-sm mb-2">Year: {label}</p>
          <div className="space-y-1">
            <p className="text-rose-400 flex items-center justify-between gap-4">
              <span>Global Anomaly:</span>
              <span className="font-bold">{dataPoint.globalAnomaly > 0 ? `+${dataPoint.globalAnomaly}` : dataPoint.globalAnomaly}°C</span>
            </p>
            <p className="text-emerald-400 flex items-center justify-between gap-4">
              <span>5-Year Rolling Mean:</span>
              <span>{dataPoint.fiveYearMean > 0 ? `+${dataPoint.fiveYearMean}` : dataPoint.fiveYearMean}°C</span>
            </p>
            <p className="text-amber-400 flex items-center justify-between gap-4">
              <span>Atmospheric CO₂:</span>
              <span>{dataPoint.co2Ppm} ppm</span>
            </p>
            {showLandOcean && (
              <>
                <p className="text-orange-300 flex items-center justify-between gap-4">
                  <span>Land Anomaly:</span>
                  <span>+{dataPoint.landAnomaly}°C</span>
                </p>
                <p className="text-blue-300 flex items-center justify-between gap-4">
                  <span>Ocean Anomaly:</span>
                  <span>+{dataPoint.oceanAnomaly}°C</span>
                </p>
              </>
            )}
            {dataPoint.ssp5_85 && (
              <div className="pt-2 border-t border-white/10 mt-2 space-y-0.5 text-[11px]">
                <p className="text-rose-300 font-bold">IPCC AR6 Projections (2050):</p>
                <p className="text-emerald-300">SSP1-2.6 (Paris 1.5°C): +{dataPoint.ssp1_26}°C</p>
                <p className="text-yellow-300">SSP2-4.5 (Middle-Road): +{dataPoint.ssp2_45}°C</p>
                <p className="text-rose-400">SSP5-8.5 (Fossil-Fuel): +{dataPoint.ssp5_85}°C</p>
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between">
      {/* Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30">
              <Thermometer className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-white">Global Surface Temperature Anomalies</h3>
            <span className="text-xs px-2 py-0.5 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-full font-mono">
              1880 – 2050
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Compared to 1951-1980 baseline mean temperature. Source: NASA GISS Surface Temperature Analysis (GISTEMP v4).
          </p>
        </div>

        {/* View Toggles */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowLandOcean(!showLandOcean)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
              showLandOcean
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-climate-dark/60 text-slate-400 border-climate-border hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Land vs Ocean</span>
          </button>

          <button
            onClick={() => setShowScenarios(!showScenarios)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
              showScenarios
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                : 'bg-climate-dark/60 text-slate-400 border-climate-border hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>IPCC Projections</span>
          </button>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="w-full h-80 sm:h-96">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={filteredData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="tempAnomalyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="ssp5Gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0} />
              </linearGradient>
            </defs>

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
              tickFormatter={(v) => `${v > 0 ? `+${v}` : v}°C`}
              domain={[-0.8, 3.5]}
            />

            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
              formatter={(value) => <span className="text-slate-300">{value}</span>}
            />

            {/* Reference baseline & Paris 1.5C line */}
            <ReferenceLine y={0} stroke="#64748b" strokeDasharray="4 4" label={{ value: '1951-1980 Baseline (0°C)', fill: '#64748b', fontSize: 10, position: 'insideBottomRight' }} />
            <ReferenceLine y={1.5} stroke="#f59e0b" strokeDasharray="5 5" label={{ value: '1.5°C Paris Threshold', fill: '#f59e0b', fontSize: 10, position: 'insideTopRight' }} />

            {/* Historical Anomaly Fill & Line */}
            <Area
              type="monotone"
              dataKey="globalAnomaly"
              name="Global Temperature Anomaly (°C)"
              stroke="#ef4444"
              strokeWidth={2.5}
              fill="url(#tempAnomalyGradient)"
            />

            <Line
              type="monotone"
              dataKey="fiveYearMean"
              name="5-Yr Smoothed Trend"
              stroke="#10b981"
              strokeWidth={2}
              dot={false}
            />

            {/* Land vs Ocean Split Lines */}
            {showLandOcean && (
              <>
                <Line
                  type="monotone"
                  dataKey="landAnomaly"
                  name="Land Anomaly"
                  stroke="#fb923c"
                  strokeWidth={1.8}
                  strokeDasharray="3 3"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="oceanAnomaly"
                  name="Ocean Anomaly"
                  stroke="#38bdf8"
                  strokeWidth={1.8}
                  strokeDasharray="3 3"
                  dot={false}
                />
              </>
            )}

            {/* IPCC Projections */}
            {showScenarios && (
              <>
                <Line
                  type="monotone"
                  dataKey="ssp1_26"
                  name="SSP1-2.6 (Strong Mitigation)"
                  stroke="#34d399"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="ssp2_45"
                  name="SSP2-4.5 (Middle of the Road)"
                  stroke="#facc15"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="ssp5_85"
                  name="SSP5-8.5 (High Emissions)"
                  stroke="#f43f5e"
                  strokeWidth={2.5}
                  strokeDasharray="4 4"
                  dot={false}
                />
              </>
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Alert Note */}
      <div className="mt-4 p-3 rounded-xl bg-climate-dark/70 border border-rose-500/20 flex items-start gap-3 text-xs text-slate-300">
        <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
        <p>
          <span className="font-bold text-rose-300">Critical Observation:</span> 2024 was recorded as the warmest year in 175 years of instrumental data (+1.28°C anomaly). Land surfaces are warming roughly 60% faster than ocean surfaces (+1.95°C vs +0.86°C).
        </p>
      </div>
    </div>
  );
};

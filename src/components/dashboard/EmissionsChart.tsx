import React, { useState } from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';
import { sectorEmissionsData, topEmitterCountries } from '../../data/climateData';
import { Factory, PieChart as PieIcon, BarChart2, Zap, Truck, Trees, Building } from 'lucide-react';

export const EmissionsChart: React.FC = () => {
  const [tab, setTab] = useState<'sectors' | 'countries'>('sectors');

  const sectorIconMap: Record<string, React.ReactNode> = {
    Zap: <Zap className="w-3.5 h-3.5 text-red-400" />,
    Factory: <Factory className="w-3.5 h-3.5 text-orange-400" />,
    Trees: <Trees className="w-3.5 h-3.5 text-lime-400" />,
    Truck: <Truck className="w-3.5 h-3.5 text-cyan-400" />,
    Building: <Building className="w-3.5 h-3.5 text-purple-400" />,
  };

  const CustomSectorTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-climate-darker/95 border border-climate-border p-3.5 rounded-xl shadow-2xl backdrop-blur-md text-xs font-mono">
          <p className="font-bold text-white text-sm mb-1">{data.sector}</p>
          <p className="text-emerald-400 font-bold">Global Share: {data.percentage}%</p>
          <p className="text-slate-300">Annual Output: ~{data.gigatons} Gt CO₂e</p>
          <p className="text-[11px] text-slate-400 mt-2 max-w-xs">{data.description}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Factory className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-white">Global Greenhouse Gas Emissions Breakdown</h3>
            <span className="text-xs px-2 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full font-mono">
              IPCC WG3 & GCP
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Total anthropogenic emissions: ~53.8 Gigatons CO₂-equivalent per year.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center gap-1.5 bg-climate-dark/70 border border-climate-border p-1 rounded-xl">
          <button
            onClick={() => setTab('sectors')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              tab === 'sectors'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <PieIcon className="w-3.5 h-3.5" />
            <span>By Sector</span>
          </button>
          <button
            onClick={() => setTab('countries')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              tab === 'countries'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span>Top Emitters</span>
          </button>
        </div>
      </div>

      {/* Content depending on Tab */}
      {tab === 'sectors' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Donut Chart */}
          <div className="lg:col-span-6 h-64 sm:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sectorEmissionsData}
                  dataKey="percentage"
                  nameKey="sector"
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={95}
                  paddingAngle={4}
                >
                  {sectorEmissionsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#060d0a" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip content={<CustomSectorTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Sector Legend Cards */}
          <div className="lg:col-span-6 space-y-2">
            {sectorEmissionsData.map((sec) => (
              <div
                key={sec.sector}
                className="p-2.5 rounded-xl bg-climate-dark/60 border border-climate-border/80 flex items-center justify-between text-xs hover:bg-white/5 transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: sec.color }}
                  />
                  <div>
                    <span className="font-semibold text-white block">{sec.sector}</span>
                    <span className="text-[11px] text-slate-400">~{sec.gigatons} Gt CO₂e/yr</span>
                  </div>
                </div>
                <div className="text-right font-mono font-bold text-sm" style={{ color: sec.color }}>
                  {sec.percentage}%
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topEmitterCountries} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1b4332" opacity={0.3} horizontal={false} />
                <XAxis type="number" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} tickFormatter={(v) => `${v} Gt`} />
                <YAxis dataKey="country" type="category" stroke="#64748b" tick={{ fill: '#f1f5f9', fontSize: 11 }} width={90} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#060d0a', borderColor: '#2d6a4f', borderRadius: '8px', fontSize: '11px' }}
                  formatter={(v: any, name: string) => [
                    name === 'emissionsGt' ? `${v} Gt CO₂/yr` : `${v} tons/person`,
                    name === 'emissionsGt' ? 'Total Annual Emissions' : 'Per Capita Footprint'
                  ]}
                />
                <Bar dataKey="emissionsGt" name="Total Emissions (Gt)" fill="#f97316" radius={[0, 4, 4, 0]} />
                <Bar dataKey="perCapitaTons" name="Per Capita (Tons)" fill="#06b6d4" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <p className="text-[11px] text-slate-400">
            Note the distinction between <span className="text-amber-400 font-semibold">Gross Territorial Emissions</span> (China, USA lead) and <span className="text-cyan-400 font-semibold">Per-Capita Footprints</span> (USA: 14.4 t/person vs India: 2.0 t/person).
          </p>
        </div>
      )}
    </div>
  );
};

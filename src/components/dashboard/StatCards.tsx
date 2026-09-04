import React from 'react';
import { Thermometer, CloudRain, Wind, Activity, ArrowUpRight, Flame } from 'lucide-react';

export const StatCards: React.FC = () => {
  const stats = [
    {
      label: 'Global Temperature Anomaly',
      value: '+1.28°C',
      subtext: 'Above pre-industrial baseline (1850-1900)',
      change: '+0.11°C in last decade',
      isBad: true,
      icon: <Thermometer className="w-5 h-5 text-rose-400" />,
      colorClass: 'from-rose-500/10 to-transparent border-rose-500/30 text-rose-400',
    },
    {
      label: 'Atmospheric CO₂ Concentration',
      value: '426.2 ppm',
      subtext: 'Highest level in over 3 million years (Pliocene)',
      change: '+2.4 ppm annual growth rate',
      isBad: true,
      icon: <Flame className="w-5 h-5 text-amber-400" />,
      colorClass: 'from-amber-500/10 to-transparent border-amber-500/30 text-amber-400',
    },
    {
      label: 'Global Precipitation Anomaly',
      value: '+38.2 mm',
      subtext: 'Atmospheric moisture holding capacity surge',
      change: '+7% moisture per 1°C warming',
      isBad: true,
      icon: <CloudRain className="w-5 h-5 text-cyan-400" />,
      colorClass: 'from-cyan-500/10 to-transparent border-cyan-500/30 text-cyan-400',
    },
    {
      label: 'Global Mean Air Quality Risk',
      value: '94% Population',
      subtext: 'Breathes air exceeding WHO PM2.5 safe guidelines',
      change: '7 Million premature deaths/yr',
      isBad: true,
      icon: <Wind className="w-5 h-5 text-purple-400" />,
      colorClass: 'from-purple-500/10 to-transparent border-purple-500/30 text-purple-400',
    },
    {
      label: 'Arctic Sea Ice Minimum Extent',
      value: '-12.6% / decade',
      subtext: 'September minimum ice sheet area loss',
      change: '2.1M sq km lost since 1979',
      isBad: true,
      icon: <Activity className="w-5 h-5 text-teal-400" />,
      colorClass: 'from-teal-500/10 to-transparent border-teal-500/30 text-teal-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {stats.map((stat, i) => (
        <div
          key={i}
          className={`glass-panel p-4 rounded-2xl bg-gradient-to-b ${stat.colorClass} border transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-300 line-clamp-1">{stat.label}</span>
            <div className="p-2 rounded-xl bg-climate-dark/70 border border-climate-border">
              {stat.icon}
            </div>
          </div>

          <div>
            <div className="text-2xl font-black text-white tracking-tight font-mono mb-1">
              {stat.value}
            </div>
            <p className="text-[11px] text-slate-400 leading-snug line-clamp-2 mb-2">
              {stat.subtext}
            </p>
          </div>

          <div className="pt-2 border-t border-white/5 flex items-center gap-1 text-[11px] font-medium text-rose-400">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>{stat.change}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

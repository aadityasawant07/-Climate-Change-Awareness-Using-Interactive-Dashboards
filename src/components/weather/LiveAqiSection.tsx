import React from 'react';
import { LiveAqiData, LiveAQICategory } from '../../types/climate';
import { 
  Wind, 
  ShieldAlert, 
  HeartPulse, 
  Activity, 
  Radio, 
  Sun, 
  Sparkles, 
  AlertTriangle,
  Info
} from 'lucide-react';

interface LiveAqiSectionProps {
  aqiData: LiveAqiData;
  cityName: string;
  country: string;
}

export const LiveAqiSection: React.FC<LiveAqiSectionProps> = ({
  aqiData,
  cityName,
  country,
}) => {
  const getCategoryStyles = (category: LiveAQICategory) => {
    switch (category) {
      case 'Good':
        return {
          textColor: 'text-emerald-400',
          bgColor: 'bg-emerald-500/10',
          borderColor: 'border-emerald-500/40',
          glowClass: 'shadow-emerald-500/20',
          barColor: 'from-emerald-600 to-teal-400',
        };
      case 'Moderate':
        return {
          textColor: 'text-yellow-400',
          bgColor: 'bg-yellow-500/10',
          borderColor: 'border-yellow-500/40',
          glowClass: 'shadow-yellow-500/20',
          barColor: 'from-yellow-600 to-amber-400',
        };
      case 'Poor':
        return {
          textColor: 'text-amber-400',
          bgColor: 'bg-amber-500/10',
          borderColor: 'border-amber-500/40',
          glowClass: 'shadow-amber-500/20',
          barColor: 'from-amber-600 to-orange-400',
        };
      case 'Very Poor':
        return {
          textColor: 'text-rose-400',
          bgColor: 'bg-rose-500/10',
          borderColor: 'border-rose-500/40',
          glowClass: 'shadow-rose-500/20',
          barColor: 'from-rose-600 to-red-500',
        };
      case 'Hazardous':
        return {
          textColor: 'text-purple-400',
          bgColor: 'bg-purple-500/10',
          borderColor: 'border-purple-500/40',
          glowClass: 'shadow-purple-500/20',
          barColor: 'from-purple-600 to-rose-600',
        };
      default:
        return {
          textColor: 'text-slate-400',
          bgColor: 'bg-slate-800',
          borderColor: 'border-slate-700',
          glowClass: '',
          barColor: 'from-slate-600 to-slate-400',
        };
    }
  };

  const styles = getCategoryStyles(aqiData.category);

  const pollutants = [
    { name: 'PM2.5', label: 'Fine Particulates', value: aqiData.pm25, unit: 'µg/m³', desc: 'Penetrates deep into lungs & bloodstream', safeThreshold: 15, isExceeded: aqiData.pm25 > 15 },
    { name: 'PM10', label: 'Coarse Dust', value: aqiData.pm10, unit: 'µg/m³', desc: 'Inhalable particulate dust & pollen', safeThreshold: 45, isExceeded: aqiData.pm10 > 45 },
    { name: 'NO₂', label: 'Nitrogen Dioxide', value: aqiData.no2, unit: 'µg/m³', desc: 'Combustion emissions from vehicles', safeThreshold: 25, isExceeded: aqiData.no2 > 25 },
    { name: 'SO₂', label: 'Sulfur Dioxide', value: aqiData.so2, unit: 'µg/m³', desc: 'Power plants & industrial smelting', safeThreshold: 40, isExceeded: aqiData.so2 > 40 },
    { name: 'CO', label: 'Carbon Monoxide', value: aqiData.co, unit: 'µg/m³', desc: 'Incomplete fossil fuel combustion', safeThreshold: 4000, isExceeded: aqiData.co > 4000 },
    { name: 'O₃', label: 'Surface Ozone', value: aqiData.ozone, unit: 'µg/m³', desc: 'Ground photochemical smog oxidant', safeThreshold: 100, isExceeded: aqiData.ozone > 100 },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Header & Live AQI Status Hero Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0d2218] via-[#081a11] to-[#040e09] border-2 border-emerald-500/40 shadow-2xl relative overflow-hidden">
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          
          {/* Left AQI Overview */}
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono font-bold">
                <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                <span>LIVE AIR QUALITY FEED</span>
              </span>
              <span className="text-xs text-slate-400">Copernicus Atmosphere Service (CAMS)</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {cityName} Ambient Air Quality
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Continuous monitoring of respirable aerosols, nitrogen oxides, sulfur dioxides, and photochemical ozone for <strong className="text-white">{cityName}, {country}</strong>.
            </p>

            {/* Health Advice Callout */}
            <div className={`p-3.5 rounded-2xl ${styles.bgColor} border ${styles.borderColor} flex items-start gap-3 text-xs`}>
              <HeartPulse className={`w-5 h-5 ${styles.textColor} shrink-0 mt-0.5`} />
              <div>
                <span className="font-bold text-white block mb-0.5">Health Guidance:</span>
                <p className="text-slate-300 leading-relaxed">{aqiData.healthAdvice}</p>
              </div>
            </div>
          </div>

          {/* Right AQI Meter Badge */}
          <div className="flex flex-col items-center justify-center p-6 rounded-3xl bg-climate-dark/90 border border-climate-border text-center min-w-[220px] shadow-xl space-y-2">
            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">US Air Quality Index</span>
            
            <div className={`text-6xl font-black font-mono tracking-tight ${styles.textColor} leading-none`}>
              {aqiData.usAqi}
            </div>

            <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${styles.bgColor} ${styles.textColor} ${styles.borderColor}`}>
              {aqiData.category}
            </div>

            <div className="pt-2 border-t border-white/10 w-full flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>European AQI:</span>
              <span className="font-bold text-white">{aqiData.europeanAqi}</span>
            </div>

            <div className="w-full flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span className="flex items-center gap-1">
                <Sun className="w-3.5 h-3.5 text-amber-400" /> UV Index:
              </span>
              <span className="font-bold text-amber-300">{aqiData.uvIndex}</span>
            </div>
          </div>

        </div>

      </div>

      {/* 2. Standard AQI Category Scale Legend */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {[
          { cat: 'Good', range: '0–50', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30', desc: 'Clean air with minimal health risk' },
          { cat: 'Moderate', range: '51–100', color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30', desc: 'Acceptable; slight risk for sensitive individuals' },
          { cat: 'Poor', range: '101–150', color: 'text-amber-400 bg-amber-500/10 border-amber-500/30', desc: 'Sensitive groups experience breathing irritation' },
          { cat: 'Very Poor', range: '151–200', color: 'text-rose-400 bg-rose-500/10 border-rose-500/30', desc: 'Unhealthy for all members of public' },
          { cat: 'Hazardous', range: '201+', color: 'text-purple-400 bg-purple-500/10 border-purple-500/30', desc: 'Emergency health alert for entire population' },
        ].map((item) => (
          <div
            key={item.cat}
            className={`p-3 rounded-2xl border ${item.color} flex flex-col justify-between space-y-1`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold">{item.cat}</span>
              <span className="text-[10px] font-mono font-bold bg-white/5 px-1.5 py-0.5 rounded">{item.range}</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-snug">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* 3. Multi-Pollutant Sensory Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wind className="w-4 h-4 text-emerald-400" />
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Real-Time Atmospheric Pollutant Breakdown
            </h4>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">Micrograms per cubic meter (µg/m³)</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {pollutants.map((p) => (
            <div
              key={p.name}
              className="glass-panel p-4 rounded-2xl border border-climate-border hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-2 shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-extrabold text-white text-sm font-mono">{p.name}</span>
                  {p.isExceeded ? (
                    <span className="text-[9px] font-bold text-rose-400 bg-rose-500/10 border border-rose-500/30 px-1 py-0.5 rounded">
                      Elevated
                    </span>
                  ) : (
                    <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-1 py-0.5 rounded">
                      Safe
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-slate-400">{p.label}</div>
              </div>

              <div>
                <div className="text-2xl font-black font-mono text-white tracking-tight">
                  {p.value} <span className="text-[10px] text-slate-400 font-sans">{p.unit}</span>
                </div>
                <p className="text-[10px] text-slate-400 leading-tight mt-1 line-clamp-2">
                  {p.desc}
                </p>
              </div>

              <div className="pt-2 border-t border-white/5 text-[10px] text-slate-500 font-mono flex items-center justify-between">
                <span>WHO Limit:</span>
                <span className="font-bold text-slate-300">&le;{p.safeThreshold}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

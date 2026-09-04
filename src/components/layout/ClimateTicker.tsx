import React, { useEffect, useState } from 'react';
import { Flame, Clock, Gauge, TrendingUp } from 'lucide-react';

export const ClimateTicker: React.FC = () => {
  // Live simulated carbon clock countdown to 1.5°C threshold
  // Based on IPCC remaining carbon budget ~250 Gt CO2 at ~42 Gt/year
  const [timeLeft, setTimeLeft] = useState<{ years: number; days: number; hours: number; minutes: number; seconds: number }>({
    years: 4,
    days: 218,
    hours: 14,
    minutes: 32,
    seconds: 40,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        } else {
          return { ...prev, years: prev.years - 1, days: 364, hours: 23, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-climate-darker/90 border-b border-climate-border/60 py-1.5 px-4 backdrop-blur-md text-xs">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Global Indicators */}
        <div className="flex flex-wrap items-center gap-4 text-slate-300">
          <div className="flex items-center gap-1.5 font-mono">
            <Flame className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
            <span className="text-slate-400">Atmospheric CO₂:</span>
            <span className="font-bold text-rose-400">426.2 ppm</span>
            <span className="text-[10px] text-rose-500 font-semibold">(+2.4 ppm/yr)</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 font-mono">
            <Gauge className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-400">Global Temp Anomaly:</span>
            <span className="font-bold text-amber-400">+1.28°C</span>
            <span className="text-[10px] text-slate-500">(vs 1850-1900)</span>
          </div>

          <div className="hidden md:flex items-center gap-1.5 font-mono">
            <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-slate-400">Sea Level Rate:</span>
            <span className="font-bold text-cyan-400">3.7 mm/yr</span>
          </div>
        </div>

        {/* Right: Climate Countdown Clock */}
        <div className="flex items-center gap-2 font-mono">
          <div className="flex items-center gap-1 text-emerald-400 font-semibold text-[11px]">
            <Clock className="w-3.5 h-3.5 text-emerald-400 animate-pulse-slow" />
            <span className="hidden lg:inline text-slate-300">Time Left to 1.5°C Budget:</span>
          </div>
          <div className="bg-climate-card border border-emerald-500/30 px-2 py-0.5 rounded text-[11px] font-bold text-emerald-300 tracking-wider">
            {timeLeft.years}y {timeLeft.days}d {String(timeLeft.hours).padStart(2, '0')}h : {String(timeLeft.minutes).padStart(2, '0')}m : {String(timeLeft.seconds).padStart(2, '0')}s
          </div>
        </div>
      </div>
    </div>
  );
};

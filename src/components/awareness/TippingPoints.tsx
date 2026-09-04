import React from 'react';
import { planetaryTippingPoints } from '../../data/educationalData';
import { AlertOctagon, Clock, Gauge, ShieldAlert } from 'lucide-react';

export const TippingPoints: React.FC = () => {
  return (
    <div className="glass-panel p-6 rounded-2xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30">
          <AlertOctagon className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white">Planetary Climate Tipping Points (Critical Thresholds)</h3>
          <p className="text-xs text-slate-400">
            Self-perpetuating irreversible thresholds identified by the IPCC and Earth Commission scientists.
          </p>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {planetaryTippingPoints.map((tp) => (
          <div
            key={tp.id}
            className={`p-5 rounded-2xl bg-climate-dark/80 border ${tp.severityColor} flex flex-col justify-between space-y-4 hover:bg-white/5 transition-all shadow-lg`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/5 text-slate-300">
                  {tp.currentStatus}
                </span>
                <span className="text-xs font-mono font-bold text-rose-400">
                  {tp.thresholdEstimate}
                </span>
              </div>

              <h4 className="font-bold text-sm text-white leading-snug mb-2">
                {tp.name}
              </h4>

              <p className="text-xs text-slate-300 leading-relaxed">
                {tp.impactDescription}
              </p>
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Timescale: {tp.timescale}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

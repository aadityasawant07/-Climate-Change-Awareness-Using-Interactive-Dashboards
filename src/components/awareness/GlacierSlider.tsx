import React, { useState } from 'react';
import { glacierCaseStudies } from '../../data/educationalData';
import { MountainSnow, SlidersHorizontal, MapPin, Eye } from 'lucide-react';

export const GlacierSlider: React.FC = () => {
  const [activeStudyIndex, setActiveStudyIndex] = useState<number>(0);
  const [sliderPosition, setSliderPosition] = useState<number>(50);

  const study = glacierCaseStudies[activeStudyIndex];

  return (
    <div className="glass-panel p-6 rounded-2xl space-y-6">
      {/* Header & Case Study Picker */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <MountainSnow className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-white">Visual Glacier Retreat & Cryosphere Loss Slider</h3>
          </div>
          <p className="text-xs text-slate-400">
            Interactive comparative time-series of vanishing glaciers and ice fields across the globe.
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-climate-dark/80 border border-climate-border p-1 rounded-xl">
          {glacierCaseStudies.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveStudyIndex(idx);
                setSliderPosition(50);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeStudyIndex === idx
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Visual Split View Comparison */}
      <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-climate-border bg-[#061017] select-none">
        
        {/* Under Layer: Modern Status (After Melt) */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#172015] via-[#10241e] to-[#1e3a29] flex flex-col justify-between p-6">
          <div className="flex justify-end">
            <span className="bg-rose-500/80 backdrop-blur-md text-white font-mono text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              {study.currentYear} (Present Day)
            </span>
          </div>
          <div className="max-w-md bg-climate-darker/90 backdrop-blur-md p-4 rounded-xl border border-rose-500/30 text-xs">
            <div className="text-rose-400 font-bold mb-1">State in {study.currentYear}:</div>
            <p className="text-slate-300 leading-relaxed">{study.currentStatus}</p>
            <div className="mt-2 text-rose-300 font-mono font-bold">
              Ice Volume Depleted: ~{study.iceVolumeLossPct}%
            </div>
          </div>
        </div>

        {/* Top Layer: Historic Pristine Glacier (Before Melt) */}
        <div
          className="absolute inset-0 bg-gradient-to-tr from-[#1e293b] via-[#38bdf8]/30 to-[#f0f9ff]/40 flex flex-col justify-between p-6 overflow-hidden"
          style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
        >
          <div className="flex justify-start">
            <span className="bg-cyan-600/80 backdrop-blur-md text-white font-mono text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              {study.initialYear} (Historic Baseline)
            </span>
          </div>
          <div className="max-w-md bg-climate-darker/90 backdrop-blur-md p-4 rounded-xl border border-cyan-500/30 text-xs">
            <div className="text-cyan-400 font-bold mb-1">State in {study.initialYear}:</div>
            <p className="text-slate-300 leading-relaxed">{study.initialStatus}</p>
            <div className="mt-2 text-cyan-300 font-mono font-bold">
              Pristine Glacial Mass
            </div>
          </div>
        </div>

        {/* Vertical Divider Handle Line */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] cursor-ew-resize flex items-center justify-center pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="w-8 h-8 rounded-full bg-climate-darker border-2 border-white flex items-center justify-center text-white shadow-xl">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
        </div>

        {/* Transparent Drag Range Input Overlay */}
        <input
          type="range"
          min={0}
          max={100}
          value={sliderPosition}
          onChange={(e) => setSliderPosition(Number(e.target.value))}
          className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-20"
        />
      </div>

      {/* Case Study Details & Facts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <div className="p-4 rounded-xl bg-climate-dark/80 border border-climate-border space-y-1">
          <span className="text-[11px] text-slate-400 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" /> Location
          </span>
          <div className="font-bold text-sm text-white">{study.location}</div>
        </div>

        <div className="p-4 rounded-xl bg-climate-dark/80 border border-climate-border space-y-1">
          <span className="text-[11px] text-slate-400">Total Ice Volume Loss</span>
          <div className="font-mono font-bold text-sm text-rose-400">-{study.iceVolumeLossPct}% Vanished</div>
        </div>

        <div className="p-4 rounded-xl bg-climate-dark/80 border border-climate-border space-y-1">
          <span className="text-[11px] text-slate-400">Observational Time Span</span>
          <div className="font-mono font-bold text-sm text-emerald-400">{study.currentYear - study.initialYear} Years Recorded</div>
        </div>
      </div>
    </div>
  );
};

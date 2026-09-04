import React, { useState } from 'react';
import { Sun, Flame, Sparkles, RefreshCw } from 'lucide-react';

export const GreenhouseSimulator: React.FC = () => {
  // CO2 ppm slider state (from pre-industrial 280 ppm to extreme 600 ppm)
  const [co2Ppm, setCo2Ppm] = useState<number>(426);

  // Derived physics values (simplified radiative forcing: ΔF = 5.35 * ln(C/C0))
  const radiativeForcing = Math.round((5.35 * Math.log(co2Ppm / 280)) * 100) / 100;
  const equilibriumTemp = Math.round((14.0 + radiativeForcing * 0.8) * 10) / 10;
  const trappedHeatPct = Math.min(95, Math.round(55 + (co2Ppm - 280) * 0.12));

  return (
    <div className="glass-panel p-6 rounded-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Sun className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-white">Interactive Greenhouse Effect & Radiative Forcing Simulator</h3>
          </div>
          <p className="text-xs text-slate-400">
            Simulate how varying atmospheric CO₂ concentrations alter Earth’s energy balance and planetary temperature.
          </p>
        </div>

        <button
          onClick={() => setCo2Ppm(426)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-climate-dark border border-climate-border text-xs text-slate-300 hover:text-white"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset to 2026 Level (426 ppm)</span>
        </button>
      </div>

      {/* Interactive Controls & Live Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Slider & Presets */}
        <div className="lg:col-span-6 space-y-4">
          <div>
            <div className="flex items-center justify-between text-xs font-mono mb-2">
              <span className="text-slate-300 font-bold">Atmospheric CO₂ Concentration:</span>
              <span className="text-xl font-black text-rose-400">{co2Ppm} ppm</span>
            </div>

            <input
              type="range"
              min={280}
              max={600}
              step={5}
              value={co2Ppm}
              onChange={(e) => setCo2Ppm(Number(e.target.value))}
              className="w-full h-2.5 bg-climate-dark rounded-lg appearance-none cursor-pointer accent-emerald-500 border border-climate-border"
            />

            <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>280 ppm (Pre-industrial 1850)</span>
              <span>426 ppm (Today)</span>
              <span>600 ppm (High Emissions)</span>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap gap-2 pt-2">
            <button
              onClick={() => setCo2Ppm(280)}
              className="px-2.5 py-1 rounded-lg bg-climate-dark border border-climate-border hover:border-emerald-500 text-[11px] text-slate-300"
            >
              1850 Baseline (280 ppm)
            </button>
            <button
              onClick={() => setCo2Ppm(350)}
              className="px-2.5 py-1 rounded-lg bg-climate-dark border border-climate-border hover:border-emerald-500 text-[11px] text-slate-300"
            >
              Hansen Safe Target (350 ppm)
            </button>
            <button
              onClick={() => setCo2Ppm(426)}
              className="px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/50 text-[11px] text-emerald-300"
            >
              Current 2026 (426 ppm)
            </button>
            <button
              onClick={() => setCo2Ppm(550)}
              className="px-2.5 py-1 rounded-lg bg-rose-500/20 border border-rose-500/50 text-[11px] text-rose-300"
            >
              2x CO₂ Benchmark (560 ppm)
            </button>
          </div>
        </div>

        {/* Live Gauges */}
        <div className="lg:col-span-6 grid grid-cols-3 gap-3">
          <div className="p-3.5 rounded-2xl bg-climate-dark/80 border border-climate-border text-center">
            <span className="text-[11px] text-slate-400 block mb-1">Radiative Forcing</span>
            <span className="text-xl font-bold font-mono text-rose-400">+{radiativeForcing}</span>
            <span className="text-[10px] text-slate-500 block">Watts / m²</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-climate-dark/80 border border-climate-border text-center">
            <span className="text-[11px] text-slate-400 block mb-1">Equilibrium Temp</span>
            <span className="text-xl font-bold font-mono text-amber-400">+{equilibriumTemp}°C</span>
            <span className="text-[10px] text-slate-500 block">Global Mean</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-climate-dark/80 border border-climate-border text-center">
            <span className="text-[11px] text-slate-400 block mb-1">Trapped Thermal IR</span>
            <span className="text-xl font-bold font-mono text-cyan-400">{trappedHeatPct}%</span>
            <span className="text-[10px] text-slate-500 block">Absorption Ratio</span>
          </div>
        </div>
      </div>

      {/* Visual Mechanism Diagram */}
      <div className="relative p-6 rounded-2xl bg-gradient-to-b from-[#0a1820] to-[#060e0a] border border-climate-border overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          
          {/* Incoming Solar */}
          <div className="text-center space-y-2 max-w-[200px]">
            <div className="w-12 h-12 mx-auto rounded-full bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center text-yellow-400 shadow-lg shadow-yellow-500/20">
              <Sun className="w-6 h-6 animate-spin-slow" />
            </div>
            <div className="font-bold text-xs text-white">1. Solar Irradiance</div>
            <p className="text-[11px] text-slate-400">Shortwave UV & Visible sunlight penetrates atmosphere (~340 W/m²)</p>
          </div>

          {/* Atmosphere Trap Barrier */}
          <div className="flex-1 w-full border-y md:border-y-0 md:border-x border-emerald-500/30 py-4 md:px-6 text-center space-y-2 bg-emerald-950/20 rounded-xl">
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-emerald-400">
              <Sparkles className="w-4 h-4" />
              <span>Tropospheric Greenhouse Gas Blanket ({co2Ppm} ppm CO₂)</span>
            </div>
            <p className="text-xs text-slate-300 max-w-md mx-auto">
              Gases (CO₂, CH₄, H₂O vapor, N₂O) resonate at infrared wavelengths, absorbing thermal radiation emitted by Earth’s surface and re-radiating heat back in all directions.
            </p>
          </div>

          {/* Trapped Re-radiation */}
          <div className="text-center space-y-2 max-w-[200px]">
            <div className="w-12 h-12 mx-auto rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 shadow-lg shadow-rose-500/20">
              <Flame className="w-6 h-6 animate-pulse" />
            </div>
            <div className="font-bold text-xs text-white">3. Trapped Thermal IR</div>
            <p className="text-[11px] text-slate-400">+{radiativeForcing} W/m² extra heat retained in oceans and biosphere</p>
          </div>

        </div>
      </div>
    </div>
  );
};

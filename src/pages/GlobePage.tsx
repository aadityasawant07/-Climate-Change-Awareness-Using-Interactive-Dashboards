import React, { useState } from 'react';
import { EarthGlobe3D } from '../components/3d/EarthGlobe3D';
import { globeHotspots } from '../data/climateData';
import { GlobeHotspot } from '../types/climate';
import { Globe2, Layers, AlertTriangle, Info, MapPin, Sparkles } from 'lucide-react';

export const GlobePage: React.FC = () => {
  const [selectedHotspot, setSelectedHotspot] = useState<GlobeHotspot | null>(null);

  return (
    <div className="space-y-8 py-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-climate-border">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Globe2 className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              3D Planetary Earth Explorer
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            Interactive WebGL 3D Globe with thermal anomaly layers, greenhouse gas plumes, and critical ecological tipping zones.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-full font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>WebGL Acceleration Active</span>
        </div>
      </div>

      {/* Main 3D Canvas & Side Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left 3D Globe Interactive Canvas */}
        <div className="lg:col-span-8 space-y-4">
          <EarthGlobe3D
            heightClass="h-[550px] sm:h-[650px]"
            onHotspotSelect={(hotspot) => setSelectedHotspot(hotspot)}
          />

          <div className="p-4 rounded-2xl bg-climate-dark/80 border border-climate-border flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Use mouse drag to freely rotate • Mouse wheel to zoom • Click markers for details</span>
            </div>
          </div>
        </div>

        {/* Right Hotspots List & Insights */}
        <div className="lg:col-span-4 space-y-4">
          <div className="glass-panel p-5 rounded-2xl border border-climate-border">
            <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-400" />
              <span>Global Ecological Hotspots</span>
            </h3>
            <p className="text-[11px] text-slate-400 mb-4">
              Select any regional climate crisis zone to inspect critical anomalies.
            </p>

            <div className="space-y-2.5 max-h-[560px] overflow-y-auto pr-1">
              {globeHotspots.map((hotspot) => (
                <div
                  key={hotspot.id}
                  onClick={() => setSelectedHotspot(hotspot)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    selectedHotspot?.id === hotspot.id
                      ? 'bg-emerald-500/20 border-emerald-500/50 shadow-md'
                      : 'bg-climate-dark/60 border-climate-border/80 hover:bg-white/5 hover:border-climate-border'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{hotspot.imagePlaceholder}</span>
                      <h4 className="font-bold text-xs text-white leading-tight">{hotspot.title}</h4>
                    </div>
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                        hotspot.riskLevel === 'Critical'
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {hotspot.riskLevel}
                    </span>
                  </div>

                  <div className="text-[11px] font-mono text-emerald-400 font-semibold mb-1">
                    {hotspot.anomalyText}
                  </div>

                  <p className="text-[11px] text-slate-400 leading-snug line-clamp-2">
                    {hotspot.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

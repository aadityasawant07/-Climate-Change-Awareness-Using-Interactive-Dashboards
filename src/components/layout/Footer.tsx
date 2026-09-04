import React from 'react';
import { PageTab } from '../../types/climate';
import { useAuth } from '../../context/AuthContext';
import { Leaf, Heart, ExternalLink, GraduationCap, ShieldCheck } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: PageTab) => void;
  onOpenCepTour?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenCepTour }) => {
  const { isAdmin } = useAuth();

  const handleNav = (tab: PageTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#040a07] border-t border-climate-border/80 text-slate-400 text-xs py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Project Branding */}
        <div className="space-y-3 md:col-span-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Leaf className="w-4 h-4" />
            </div>
            <span className="text-base font-bold text-white tracking-tight">EcoPulse</span>
          </div>
          <p className="text-slate-400 leading-relaxed text-xs">
            An interactive 3D environmental intelligence platform for climate awareness, real-time meteorological monitoring, automated AI insights, and carbon footprint reduction.
          </p>
          <div className="pt-2 text-[11px] text-emerald-400 font-mono flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4" />
            <span>Capstone Engineering Project (CEP)</span>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="space-y-2">
          <h4 className="text-white font-semibold text-xs uppercase tracking-wider">Platform Modules</h4>
          <ul className="space-y-1.5">
            <li>
              <button onClick={() => handleNav('home')} className="hover:text-emerald-400 transition-colors">
                Home & 3D Globe
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('dashboard')} className="hover:text-emerald-400 transition-colors">
                Live Telemetry Dashboard
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('map')} className="hover:text-emerald-400 transition-colors">
                GIS Map & City Comparison
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('awareness')} className="hover:text-emerald-400 transition-colors">
                7 Climate Science Pillars
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('actions')} className="hover:text-emerald-400 transition-colors">
                Action Score Calculator
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('report')} className="hover:text-emerald-400 transition-colors">
                Official Climate Report
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('about')} className="hover:text-emerald-400 transition-colors">
                About & CEP Academic Report
              </button>
            </li>
            {isAdmin && (
              <li>
                <button onClick={() => handleNav('admin')} className="text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Console</span>
                </button>
              </li>
            )}
          </ul>
        </div>

        {/* Scientific Data Provenance */}
        <div className="space-y-2">
          <h4 className="text-white font-semibold text-xs uppercase tracking-wider">Data Provenance</h4>
          <ul className="space-y-1.5">
            <li className="flex items-center gap-1">
              <span className="text-slate-300">NASA GISTEMP v4 (Historical Temp)</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </li>
            <li className="flex items-center gap-1">
              <span className="text-slate-300">NOAA NCEI (Precipitation & Drought)</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </li>
            <li className="flex items-center gap-1">
              <span className="text-slate-300">Open-Meteo (Real-Time Weather & AQI)</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </li>
            <li className="flex items-center gap-1">
              <span className="text-slate-300">IPCC Sixth Assessment Report (AR6)</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </li>
            <li className="flex items-center gap-1">
              <span className="text-slate-300">Mauna Loa Observatory (CO₂ Keeling)</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </li>
          </ul>
        </div>

        {/* UN SDG & Tech */}
        <div className="space-y-3">
          <h4 className="text-white font-semibold text-xs uppercase tracking-wider">UN SDG Alignment</h4>
          <div className="flex flex-wrap gap-1.5">
            <span className="px-2 py-1 bg-emerald-950/60 border border-emerald-800/40 text-emerald-300 rounded text-[11px]">
              SDG 13: Climate Action
            </span>
            <span className="px-2 py-1 bg-emerald-950/60 border border-emerald-800/40 text-emerald-300 rounded text-[11px]">
              SDG 7: Clean Energy
            </span>
            <span className="px-2 py-1 bg-emerald-950/60 border border-emerald-800/40 text-emerald-300 rounded text-[11px]">
              SDG 11: Sustainable Cities
            </span>
            <span className="px-2 py-1 bg-emerald-950/60 border border-emerald-800/40 text-emerald-300 rounded text-[11px]">
              SDG 15: Life on Land
            </span>
          </div>

          {onOpenCepTour && (
            <button
              onClick={onOpenCepTour}
              className="mt-2 w-full py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Launch College CEP Tour</span>
            </button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-climate-border/40 flex flex-wrap items-center justify-between gap-4 text-[11px]">
        <div>
          &copy; 2026 Climate Change Awareness Dashboard. Open educational platform.
        </div>
        <div className="flex items-center gap-1 text-slate-400">
          <span>Engineered for College CEP Evaluation</span>
          <Heart className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500" />
        </div>
      </div>
    </footer>
  );
};

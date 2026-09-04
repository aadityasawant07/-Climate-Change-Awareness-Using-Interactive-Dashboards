import React from 'react';
import { PageTab } from '../types/climate';
import { EarthGlobe3D } from '../components/3d/EarthGlobe3D';
import { 
  BarChart3, 
  Sparkles, 
  Globe2, 
  MapPin, 
  ShieldAlert, 
  TrendingUp, 
  Trees, 
  Wind, 
  ArrowRight, 
  CheckCircle2, 
  GraduationCap,
  FileText,
  Radio,
  Layers,
  Thermometer
} from 'lucide-react';

interface HomePageProps {
  setActiveTab: (tab: PageTab) => void;
  onOpenCepTour?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ setActiveTab, onOpenCepTour }) => {
  return (
    <div className="space-y-16 pb-12">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-6 sm:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span>REAL-TIME CLIMATE INTELLIGENCE</span>
              </span>

              <span className="text-[11px] font-mono text-slate-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                CEP 2026 Presentation Hub
              </span>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.15]">
                Understand Climate. <br />
                <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                  Measure Your Impact.
                </span> <br />
                Take Action.
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                EcoPulse is an interactive 3D environmental intelligence platform empowering students, researchers, and citizens with real-time weather, ambient AQI, automated AI climate insights, and personalized carbon mitigation tracking.
              </p>
            </div>

            {/* Live Indicator Badges Row */}
            <div className="grid grid-cols-3 gap-2.5 max-w-lg font-mono text-xs">
              <div className="p-3 rounded-2xl bg-climate-dark/80 border border-climate-border text-center">
                <span className="text-[10px] text-slate-400 block mb-0.5">Atmospheric CO₂</span>
                <strong className="text-emerald-400 text-sm">426.2 ppm</strong>
                <span className="text-[9px] text-slate-500 block">+2.4 ppm/yr</span>
              </div>
              <div className="p-3 rounded-2xl bg-climate-dark/80 border border-climate-border text-center">
                <span className="text-[10px] text-slate-400 block mb-0.5">Global Anomaly</span>
                <strong className="text-rose-400 text-sm">+1.28°C</strong>
                <span className="text-[9px] text-slate-500 block">vs Baseline</span>
              </div>
              <div className="p-3 rounded-2xl bg-climate-dark/80 border border-climate-border text-center">
                <span className="text-[10px] text-slate-400 block mb-0.5">Live Data API</span>
                <strong className="text-cyan-400 text-sm">Open-Meteo</strong>
                <span className="text-[9px] text-slate-500 block">Keyless Sync</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  setActiveTab('dashboard');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-emerald-950/50 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <BarChart3 className="w-4 h-4" />
                <span>Explore Live Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setActiveTab('actions');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-5 py-3.5 rounded-2xl bg-climate-dark border border-emerald-500/40 hover:border-emerald-400 text-emerald-300 font-bold text-xs sm:text-sm shadow-lg transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Calculate My Climate Score</span>
              </button>

              {onOpenCepTour && (
                <button
                  onClick={onOpenCepTour}
                  className="px-4 py-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 hover:border-amber-400 text-amber-300 font-bold text-xs transition-all flex items-center gap-1.5"
                >
                  <GraduationCap className="w-4 h-4 text-amber-400" />
                  <span>CEP Tour</span>
                </button>
              )}
            </div>

          </div>

          {/* Hero Right 3D Globe Interactive Canvas */}
          <div className="lg:col-span-6 h-[440px] sm:h-[500px] w-full rounded-3xl overflow-hidden glass-panel border border-climate-border relative shadow-2xl">
            <EarthGlobe3D />
            <div className="absolute bottom-4 left-4 z-20 pointer-events-auto bg-climate-dark/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-climate-border text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-slate-300 font-mono text-[11px]">Interactive WebGL 3D Globe</span>
              <button
                onClick={() => setActiveTab('globe')}
                className="text-emerald-400 font-bold text-[11px] hover:underline ml-1"
              >
                Expand &rarr;
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 2. HOW IT WORKS 5-STEP SECTION */}
      <section className="space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase">
            End-To-End Environmental Journey
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            How the EcoPulse Platform Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            From global satellite telemetry to individual carbon mitigation pledges in five intuitive steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          
          {/* Step 1 */}
          <div
            onClick={() => setActiveTab('dashboard')}
            className="glass-panel p-5 rounded-3xl border border-climate-border hover:border-emerald-500/50 cursor-pointer transition-all hover:scale-105 space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <span className="text-xs font-mono font-black text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                01
              </span>
              <h3 className="font-extrabold text-sm text-white">Explore Climate Data</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Query any global city to view real-time temperature, wind, humidity, and 7-day weather outlooks.
              </p>
            </div>
            <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
              <span>View telemetry</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Step 2 */}
          <div
            onClick={() => setActiveTab('map')}
            className="glass-panel p-5 rounded-3xl border border-climate-border hover:border-cyan-500/50 cursor-pointer transition-all hover:scale-105 space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <span className="text-xs font-mono font-black text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                02
              </span>
              <h3 className="font-extrabold text-sm text-white">Understand Risks</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Analyze 0–100 Climate Risk Scores and GIS colored hazard maps comparing AQI and sea level risks.
              </p>
            </div>
            <span className="text-[11px] font-bold text-cyan-400 flex items-center gap-1">
              <span>Inspect GIS map</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Step 3 */}
          <div
            onClick={() => setActiveTab('actions')}
            className="glass-panel p-5 rounded-3xl border border-climate-border hover:border-amber-500/50 cursor-pointer transition-all hover:scale-105 space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <span className="text-xs font-mono font-black text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                03
              </span>
              <h3 className="font-extrabold text-sm text-white">Calculate Impact</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Assess personal habits across 7 categories to compute your sustainability action score and eco-grade.
              </p>
            </div>
            <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1">
              <span>Take assessment</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Step 4 */}
          <div
            onClick={() => setActiveTab('my-dashboard')}
            className="glass-panel p-5 rounded-3xl border border-climate-border hover:border-purple-500/50 cursor-pointer transition-all hover:scale-105 space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <span className="text-xs font-mono font-black text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                04
              </span>
              <h3 className="font-extrabold text-sm text-white">Track Progress</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Monitor your score trajectory over time, manage saved observatories, and unlock stewardship badges.
              </p>
            </div>
            <span className="text-[11px] font-bold text-purple-400 flex items-center gap-1">
              <span>My dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Step 5 */}
          <div
            onClick={() => setActiveTab('report')}
            className="glass-panel p-5 rounded-3xl border border-climate-border hover:border-teal-500/50 cursor-pointer transition-all hover:scale-105 space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <span className="text-xs font-mono font-black text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">
                05
              </span>
              <h3 className="font-extrabold text-sm text-white">Generate Reports</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Generate and print verified 9-section climate audits with mitigation guidance for academic review.
              </p>
            </div>
            <span className="text-[11px] font-bold text-teal-400 flex items-center gap-1">
              <span>Generate report</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

        </div>
      </section>

      {/* 3. CORE MODULE PREVIEW GRID */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Module 1: AI Climate Insights */}
        <div
          onClick={() => setActiveTab('dashboard')}
          className="glass-panel p-6 sm:p-7 rounded-3xl border border-climate-border hover:border-emerald-500/40 cursor-pointer transition-all space-y-4 group shadow-xl"
        >
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              AI ENGINE v2.4
            </span>
          </div>
          <div>
            <h3 className="text-lg font-black text-white group-hover:text-emerald-300 transition-colors">
              Automated Climate Insights
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mt-1">
              Synthesizes live temperature, AQI, and risk factors into concise ecological summaries and prioritized action checklists.
            </p>
          </div>
          <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-emerald-400">
            <span>Explore insights</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </div>
        </div>

        {/* Module 2: Climate Map & Compare */}
        <div
          onClick={() => setActiveTab('map')}
          className="glass-panel p-6 sm:p-7 rounded-3xl border border-climate-border hover:border-cyan-500/40 cursor-pointer transition-all space-y-4 group shadow-xl"
        >
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 group-hover:scale-110 transition-transform">
              <MapPin className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              LEAFLET GIS
            </span>
          </div>
          <div>
            <h3 className="text-lg font-black text-white group-hover:text-cyan-300 transition-colors">
              Interactive GIS Map & Comparison
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mt-1">
              Compare any two global cities side-by-side with real-time pollutant comparisons, humidity, and composite risk indicators.
            </p>
          </div>
          <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-cyan-400">
            <span>Open map</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </div>
        </div>

        {/* Module 3: 7 Science Modules */}
        <div
          onClick={() => setActiveTab('awareness')}
          className="glass-panel p-6 sm:p-7 rounded-3xl border border-climate-border hover:border-amber-500/40 cursor-pointer transition-all space-y-4 group shadow-xl"
        >
          <div className="flex items-center justify-between">
            <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 group-hover:scale-110 transition-transform">
              <Trees className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
              IPCC SCIENCE
            </span>
          </div>
          <div>
            <h3 className="text-lg font-black text-white group-hover:text-amber-300 transition-colors">
              7 Core Science Pillars
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mt-1">
              Explore interactive modules for Global Warming, Deforestation, Air Pollution, Rising Oceans, and Tipping Points.
            </p>
          </div>
          <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-amber-400">
            <span>Learn science</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </div>
        </div>

      </section>

    </div>
  );
};

import React from 'react';
import { 
  Info, 
  GraduationCap, 
  Code2, 
  Database, 
  Target, 
  Users, 
  CheckCircle2, 
  Sparkles, 
  ExternalLink,
  Award,
  Globe2,
  Leaf,
  AlertTriangle,
  Compass,
  Layers,
  Cpu,
  FileText
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-12 py-4 max-w-5xl mx-auto">
      
      {/* 1. Header Banner */}
      <div className="glass-panel p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#0c2419] via-[#091b12] to-[#040e09] border-2 border-emerald-500/40 shadow-2xl relative overflow-hidden">
        <div className="flex items-center gap-2 mb-3">
          <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <GraduationCap className="w-5 h-5" />
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            College Capstone Engineering Project (CEP) • Academic Submission
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          Climate Change Awareness Using Interactive Dashboards
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed mt-3">
          An enterprise-grade, data-driven web application designed to bridge the gap between abstract climate science and public ecological literacy through interactive 3D WebGL visualizations, real-time meteorological feeds, multi-city climate risk indices, automated AI insights, and personalized carbon mitigation tracking.
        </p>

        <div className="flex flex-wrap items-center gap-2 pt-6 text-xs text-emerald-300 font-mono">
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
            React 18 + TypeScript
          </span>
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
            Three.js WebGL 3D Globe
          </span>
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
            Open-Meteo Weather & AQI APIs
          </span>
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
            Recharts & Leaflet GIS
          </span>
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
            IndexedDB Database
          </span>
        </div>
      </div>

      {/* 2. Problem Statement & Project Objectives */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Problem Statement */}
        <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-climate-border space-y-3">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
            <AlertTriangle className="w-4 h-4" />
            <span>Problem Statement</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            While international scientific institutions (such as the IPCC, NASA, and NOAA) generate vast volumes of empirical climate datasets, this information is typically presented in dense technical reports that are inaccessible to the general public, students, and municipal decision-makers.
          </p>
          <p className="text-xs text-slate-300 leading-relaxed">
            Consequently, there is a profound disconnect between global climate trends and individual understanding of localized atmospheric hazards, air quality degradation, and personal carbon footprint mitigation.
          </p>
        </div>

        {/* Project Objectives */}
        <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-climate-border space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <Target className="w-4 h-4" />
            <span>Core Engineering Objectives</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Democratize Scientific Data:</strong> Present real-time and historical climate records via intuitive, responsive visualizations.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Spatial 3D Comprehension:</strong> Offer interactive WebGL planetary globes showing thermal anomalies and sea level threats.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Actionable Behavioral Impact:</strong> Provide an educational Climate Action Score calculator and personalized carbon savings pledges.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Automated Early Warning:</strong> Implement threshold-based environmental alerts and AI climate insight summaries.</span>
            </li>
          </ul>
        </div>

      </div>

      {/* 3. Comprehensive Key Features Grid */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-climate-border space-y-6">
        <div className="flex items-center gap-2 text-cyan-400 font-bold text-base">
          <Layers className="w-5 h-5" />
          <span>Key Implemented Platform Capabilities</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-climate-dark/80 border border-climate-border space-y-1.5">
            <span className="font-bold text-white block">🌦️ Real-Time Weather & 7-Day Forecast</span>
            <p className="text-slate-400">Live temperature, feels-like index, humidity, wind velocity, and rainfall via Open-Meteo public APIs.</p>
          </div>

          <div className="p-4 rounded-2xl bg-climate-dark/80 border border-climate-border space-y-1.5">
            <span className="font-bold text-white block">💨 Real-Time AQI & Multi-Pollutants</span>
            <p className="text-slate-400">Continuous PM2.5, PM10, NO2, SO2, CO, O3, and UV Index tracking with US EPA 5-tier categorization.</p>
          </div>

          <div className="p-4 rounded-2xl bg-climate-dark/80 border border-climate-border space-y-1.5">
            <span className="font-bold text-white block">🌍 Interactive 3D WebGL Earth Globe</span>
            <p className="text-slate-400">Three.js orbital globe featuring rotating cloud layers, atmospheric glow, and regional hotspot inspection.</p>
          </div>

          <div className="p-4 rounded-2xl bg-climate-dark/80 border border-climate-border space-y-1.5">
            <span className="font-bold text-white block">⚖️ Dual-City Live Comparison</span>
            <p className="text-slate-400">Direct side-by-side meteorological, pollutant, and risk score comparison across any two global cities.</p>
          </div>

          <div className="p-4 rounded-2xl bg-climate-dark/80 border border-climate-border space-y-1.5">
            <span className="font-bold text-white block">🤖 Automated AI Climate Insights</span>
            <p className="text-slate-400">Multi-variable ecological reasoning engine generating current condition ratings and action checklists.</p>
          </div>

          <div className="p-4 rounded-2xl bg-climate-dark/80 border border-climate-border space-y-1.5">
            <span className="font-bold text-white block">🔔 Environmental Alert Center</span>
            <p className="text-slate-400">Automated alerts for high AQI, extreme heat waves, severe rainfall, and high composite climate risks.</p>
          </div>

          <div className="p-4 rounded-2xl bg-climate-dark/80 border border-climate-border space-y-1.5">
            <span className="font-bold text-white block">📄 9-Section Climate Report Generator</span>
            <p className="text-slate-400">Compiles formal climate health audits with print-to-PDF formatting and verified academic footnotes.</p>
          </div>

          <div className="p-4 rounded-2xl bg-climate-dark/80 border border-climate-border space-y-1.5">
            <span className="font-bold text-white block">👤 Personal Dashboard & History</span>
            <p className="text-slate-400">Score-over-time trajectory charts, saved observatory cities, and 7 planetary stewardship badges.</p>
          </div>

          <div className="p-4 rounded-2xl bg-climate-dark/80 border border-climate-border space-y-1.5">
            <span className="font-bold text-white block">🛡️ Admin Analytics & Data Export</span>
            <p className="text-slate-400">Platform KPIs, score distribution charts, alert resolution workflows, and 1-click CSV dataset exports.</p>
          </div>
        </div>
      </div>

      {/* 4. Technical Architecture & Engineering Stack */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-climate-border space-y-6">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
          <Code2 className="w-5 h-5" />
          <span>Technical Architecture & Engineering Stack</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-climate-dark/80 border border-climate-border space-y-2">
            <div className="font-bold text-white flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-emerald-400" />
              <span>Frontend Core</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              React 18 with TypeScript, Vite HMR bundler, Tailwind CSS design system, and Lucide vector icons.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-climate-dark/80 border border-climate-border space-y-2">
            <div className="font-bold text-white flex items-center gap-1.5">
              <Globe2 className="w-4 h-4 text-cyan-400" />
              <span>3D & Spatial GIS</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Three.js custom procedural WebGL globe shaders, Leaflet 1.9, and CartoDB Dark Matter tile services.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-climate-dark/80 border border-climate-border space-y-2">
            <div className="font-bold text-white flex items-center gap-1.5">
              <Database className="w-4 h-4 text-amber-400" />
              <span>Persistence & Auth</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Client-side IndexedDB & LocalStorage engine with SHA-256 password hashing (Web Crypto API) and role authorization.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-climate-dark/80 border border-climate-border space-y-2">
            <div className="font-bold text-white flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>APIs & Analytics</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Open-Meteo Geocoding, Forecast, and Air Quality public REST APIs; Recharts responsive charting engine.
            </p>
          </div>
        </div>
      </div>

      {/* 5. Limitations & Future Scope */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Limitations */}
        <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-climate-border space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <AlertTriangle className="w-4 h-4" />
            <span>Current Project Limitations</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">•</span>
              <span><strong>Educational Scoring Model:</strong> The 0–100 Climate Risk Score and Climate Action Score are simplified heuristic models designed for awareness, not official scientific or municipal hazard determinations.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">•</span>
              <span><strong>API Rate Limits:</strong> Real-time feeds rely on free Open-Meteo endpoints which are subject to public network latency and availability.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 font-bold">•</span>
              <span><strong>Client-Side Storage:</strong> User credentials and history are managed via browser IndexedDB and LocalStorage.</span>
            </li>
          </ul>
        </div>

        {/* Future Scope */}
        <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-climate-border space-y-3">
          <div className="flex items-center gap-2 text-teal-400 font-bold text-sm">
            <Compass className="w-4 h-4" />
            <span>Future Scope & Extensions</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">•</span>
              <span><strong>IoT Microclimate Sensor Network:</strong> Integrating hardware IoT sensors (ESP32/Arduino) for hyperlocal neighborhood air quality logging.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">•</span>
              <span><strong>Satellite Synthetic Aperture Radar (SAR):</strong> High-resolution satellite raster overlays for urban flood inundation and forest canopy loss.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-teal-400 font-bold">•</span>
              <span><strong>Verified Carbon Offset Marketplace:</strong> Linking action score achievements with certified reforestation and renewable credit registries.</span>
            </li>
          </ul>
        </div>

      </div>

      {/* 6. Scientific Provenance & Credits */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-climate-border space-y-4">
        <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
          <Database className="w-5 h-5" />
          <span>Scientific Data Sources, APIs & Library Credits</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-climate-dark/80 border border-climate-border space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white">NASA GISTEMP v4</span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Historical</span>
            </div>
            <p className="text-slate-400">Global and regional surface temperature anomaly series (1880–2024).</p>
          </div>

          <div className="p-3.5 rounded-xl bg-climate-dark/80 border border-climate-border space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white">NOAA Global Monitoring Laboratory</span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Historical</span>
            </div>
            <p className="text-slate-400">Mauna Loa atmospheric carbon dioxide (CO₂) Keeling curve measurements.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-climate-dark/80 border border-climate-border space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white">Open-Meteo Weather & Air Quality API</span>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">Live API</span>
            </div>
            <p className="text-slate-400">Real-time global meteorological forecasts, apparent temperature, and CAMS air quality.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-climate-dark/80 border border-climate-border space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white">IPCC AR6 Working Group I & III</span>
              <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">Projections</span>
            </div>
            <p className="text-slate-400">Shared Socioeconomic Pathways (SSP1-2.6, SSP2-4.5, SSP5-8.5) and sectoral emission shares.</p>
          </div>
        </div>
      </div>

    </div>
  );
};

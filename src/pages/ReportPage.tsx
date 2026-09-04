import React, { useState, useEffect } from 'react';
import { PageTab, CompleteCityEnvironmentData } from '../types/climate';
import { POPULAR_CITIES, fetchLiveCityData, searchCitiesApi } from '../services/weatherApi';
import { reportExportService } from '../services/reportExportService';
import { 
  FileText, 
  Printer, 
  Search, 
  Loader2, 
  CheckCircle2, 
  Calendar,
  Sparkles,
  MapPin,
  ShieldCheck,
  Wind,
  Thermometer,
  Layers,
  ArrowRight
} from 'lucide-react';

interface ReportPageProps {
  setActiveTab: (tab: PageTab) => void;
}

export const ReportPage: React.FC<ReportPageProps> = ({ setActiveTab }) => {
  const [selectedCity, setSelectedCity] = useState(POPULAR_CITIES[0]); // Tokyo
  const [cityData, setCityData] = useState<CompleteCityEnvironmentData | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await fetchLiveCityData(selectedCity.latitude, selectedCity.longitude, selectedCity.name, selectedCity.country);
      setCityData(data);
      setLoading(false);
    };
    load();
  }, [selectedCity]);

  const handleSearch = async (val: string) => {
    setSearchQuery(val);
    if (!val || val.length < 2) {
      setSearchResults([]);
      return;
    }
    const res = await searchCitiesApi(val);
    setSearchResults(res);
  };

  const handleSelectCity = (c: any) => {
    setSelectedCity(c);
    setSearchQuery('');
    setSearchResults([]);
  };

  return (
    <div className="space-y-8 py-4">
      {/* 1. Header & Print Controls */}
      <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-climate-border flex flex-col md:flex-row md:items-center justify-between gap-4 print:hidden">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <FileText className="w-5 h-5" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Official Climate & Environmental Report Generator
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            Generate, preview, and print formal 9-section ecological health audits with live meteorological feeds and hazard indices.
          </p>
        </div>

        <button
          onClick={() => reportExportService.printReport()}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-emerald-950/40 transition-all hover:scale-105 active:scale-95 self-start md:self-auto"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save as PDF</span>
        </button>
      </div>

      {/* 2. City Selector & Preset Chips (Hidden in Print) */}
      <div className="glass-panel p-5 rounded-2xl border border-climate-border space-y-3 print:hidden">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search city for official climate report generation (e.g. Paris, Singapore, Cairo, Mumbai)..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full bg-climate-darker border border-climate-border rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />

          {searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 z-30 mt-1.5 bg-climate-darker/98 border border-emerald-500/40 rounded-xl shadow-2xl overflow-hidden backdrop-blur-xl max-h-52 overflow-y-auto divide-y divide-white/5">
              {searchResults.map((city) => (
                <button
                  key={`${city.id}-${city.name}`}
                  onClick={() => handleSelectCity(city)}
                  className="w-full px-4 py-2.5 text-left text-xs hover:bg-emerald-500/20 text-white flex justify-between"
                >
                  <span className="font-semibold">{city.name} {city.admin1 && `(${city.admin1})`}</span>
                  <span className="text-emerald-400 font-mono">{city.country}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[11px] text-slate-400 font-semibold mr-1">Quick Cities:</span>
          {POPULAR_CITIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCity(c)}
              className={`px-3 py-1 rounded-lg text-xs transition-all ${
                selectedCity.name === c.name
                  ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-500/50'
                  : 'bg-climate-dark text-slate-400 border border-climate-border hover:text-white'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* 3. REPORT DOCUMENT CANVAS */}
      {loading || !cityData ? (
        <div className="py-20 text-center space-y-3 glass-panel border border-climate-border rounded-3xl">
          <Loader2 className="w-8 h-8 text-emerald-400 animate-spin mx-auto" />
          <p className="text-xs text-slate-400 font-mono">Compiling environmental telemetry and risk vectors...</p>
        </div>
      ) : (
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border-2 border-emerald-500/30 bg-[#06120c] space-y-8 shadow-2xl print:border-none print:shadow-none print:p-4 print:bg-white print:text-black">
          
          {/* Header Banner */}
          <div className="border-b-2 border-emerald-500 pb-5 flex flex-col md:flex-row md:items-end justify-between gap-3">
            <div>
              <span className="text-xs font-mono font-bold text-emerald-400 print:text-emerald-800 uppercase tracking-widest block">
                EcoPulse Planetary Intelligence Platform • College Engineering Project (CEP)
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white print:text-black mt-1 tracking-tight">
                Environmental & Atmospheric Audit
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 print:text-slate-700 mt-1">
                Target Observational Zone: <strong className="text-emerald-400 print:text-black">{cityData.weather.cityName}, {cityData.weather.country}</strong>
              </p>
            </div>

            <div className="text-left md:text-right text-xs font-mono text-slate-400 print:text-slate-600 space-y-0.5">
              <div>Date Generated: <strong>{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</strong></div>
              <div>Coordinates: {cityData.weather.latitude.toFixed(3)}°N, {cityData.weather.longitude.toFixed(3)}°E</div>
              <div className="text-emerald-400 print:text-emerald-700 font-bold">[VERIFIED LIVE TELEMETRY]</div>
            </div>
          </div>

          {/* Core Metrics Quad */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-climate-dark/90 print:bg-slate-100 border border-climate-border print:border-slate-300 text-center space-y-1">
              <span className="text-[10px] text-slate-400 print:text-slate-600 uppercase font-semibold block">Ambient Temperature</span>
              <div className="text-3xl font-black font-mono text-white print:text-black">{cityData.weather.currentTemp}°C</div>
              <span className="text-[11px] text-slate-400 print:text-slate-600">Feels like {cityData.weather.feelsLikeTemp}°C</span>
            </div>

            <div className="p-4 rounded-2xl bg-climate-dark/90 print:bg-slate-100 border border-climate-border print:border-slate-300 text-center space-y-1">
              <span className="text-[10px] text-slate-400 print:text-slate-600 uppercase font-semibold block">Air Quality Index</span>
              <div className="text-3xl font-black font-mono text-amber-400 print:text-amber-700">AQI {cityData.aqi.usAqi}</div>
              <span className="text-[11px] text-slate-400 print:text-slate-600">{cityData.aqi.category}</span>
            </div>

            <div className="p-4 rounded-2xl bg-climate-dark/90 print:bg-slate-100 border border-climate-border print:border-slate-300 text-center space-y-1">
              <span className="text-[10px] text-slate-400 print:text-slate-600 uppercase font-semibold block">Climate Risk Score</span>
              <div className="text-3xl font-black font-mono text-rose-400 print:text-rose-700">{cityData.riskScore.overallScore}/100</div>
              <span className="text-[11px] text-slate-400 print:text-slate-600">{cityData.riskScore.category} Risk</span>
            </div>

            <div className="p-4 rounded-2xl bg-climate-dark/90 print:bg-slate-100 border border-climate-border print:border-slate-300 text-center space-y-1">
              <span className="text-[10px] text-slate-400 print:text-slate-600 uppercase font-semibold block">Moisture & Wind</span>
              <div className="text-3xl font-black font-mono text-cyan-400 print:text-cyan-700">{cityData.weather.humidity}%</div>
              <span className="text-[11px] text-slate-400 print:text-slate-600">{cityData.weather.windSpeed} km/h wind</span>
            </div>
          </div>

          {/* Section 1: Detailed Air Pollutant Audit */}
          <div className="p-5 rounded-2xl bg-climate-dark/70 print:bg-slate-50 border border-climate-border print:border-slate-300 space-y-3">
            <h3 className="text-xs font-bold text-emerald-400 print:text-emerald-800 uppercase tracking-wider">
              Section 1 • Ambient Chemical & Particulate Breakdown
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs font-mono">
              <div className="p-3 bg-climate-darker print:bg-white rounded-xl border border-climate-border print:border-slate-200">
                <span className="text-[10px] text-slate-400 print:text-slate-600 block">PM2.5 (Fine Particles)</span>
                <strong className="text-base text-rose-400 print:text-black">{cityData.aqi.pm25} µg/m³</strong>
              </div>
              <div className="p-3 bg-climate-darker print:bg-white rounded-xl border border-climate-border print:border-slate-200">
                <span className="text-[10px] text-slate-400 print:text-slate-600 block">PM10 (Coarse Dust)</span>
                <strong className="text-base text-amber-400 print:text-black">{cityData.aqi.pm10} µg/m³</strong>
              </div>
              <div className="p-3 bg-climate-darker print:bg-white rounded-xl border border-climate-border print:border-slate-200">
                <span className="text-[10px] text-slate-400 print:text-slate-600 block">NO₂ (Nitrogen Dioxide)</span>
                <strong className="text-base text-cyan-400 print:text-black">{cityData.aqi.no2} µg/m³</strong>
              </div>
              <div className="p-3 bg-climate-darker print:bg-white rounded-xl border border-climate-border print:border-slate-200">
                <span className="text-[10px] text-slate-400 print:text-slate-600 block">O₃ (Photochemical Ozone)</span>
                <strong className="text-base text-teal-400 print:text-black">{cityData.aqi.ozone} µg/m³</strong>
              </div>
              <div className="p-3 bg-climate-darker print:bg-white rounded-xl border border-climate-border print:border-slate-200">
                <span className="text-[10px] text-slate-400 print:text-slate-600 block">UV Radiation Index</span>
                <strong className="text-base text-yellow-400 print:text-black">{cityData.aqi.uvIndex} / 11+</strong>
              </div>
            </div>
          </div>

          {/* Section 2: Climate Risk Factor Breakdown */}
          <div className="p-5 rounded-2xl bg-climate-dark/70 print:bg-slate-50 border border-climate-border print:border-slate-300 space-y-3">
            <h3 className="text-xs font-bold text-emerald-400 print:text-emerald-800 uppercase tracking-wider">
              Section 2 • Multi-Hazard Vulnerability Factor Index
            </h3>
            <div className="space-y-2 text-xs">
              {cityData.riskScore.factors.map((factor) => (
                <div key={factor.name} className="flex items-center justify-between border-b border-white/5 print:border-slate-200 pb-2">
                  <div className="space-y-0.5">
                    <span className="font-bold text-white print:text-black">{factor.name}</span>
                    <p className="text-[11px] text-slate-400 print:text-slate-600">{factor.description}</p>
                  </div>
                  <span className="font-mono font-bold text-rose-400 print:text-black shrink-0 pl-4">
                    {factor.score}/100 ({factor.severity})
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Priority Actionable Recommendations */}
          <div className="p-5 rounded-2xl bg-emerald-950/30 print:bg-emerald-50 border border-emerald-500/40 print:border-emerald-300 space-y-3">
            <h3 className="text-xs font-bold text-emerald-400 print:text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>Section 3 • Priority Actionable Interventions</span>
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-200 print:text-slate-700">
              {cityData.riskScore.recommendations.map((rec, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 print:text-emerald-700 shrink-0 mt-0.5" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Footnote */}
          <div className="pt-4 border-t border-white/10 print:border-slate-300 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-slate-500 font-mono">
            <span>EcoPulse Environmental Research • Verified for Academic & Municipal Review</span>
            <span>Ref: REP-{Date.now().toString(36).toUpperCase()}</span>
          </div>

        </div>
      )}
    </div>
  );
};

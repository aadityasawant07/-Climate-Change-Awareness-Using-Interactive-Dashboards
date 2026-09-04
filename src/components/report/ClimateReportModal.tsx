import React, { useState, useEffect } from 'react';
import { CompleteCityEnvironmentData } from '../../types/climate';
import { POPULAR_CITIES, fetchLiveCityData, searchCitiesApi } from '../../services/weatherApi';
import { reportExportService } from '../../services/reportExportService';
import { 
  FileText, 
  Printer, 
  Download, 
  X, 
  Search, 
  Loader2, 
  CheckCircle2, 
  MapPin, 
  Thermometer, 
  Wind, 
  Droplets, 
  ShieldCheck, 
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';

interface ClimateReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCityData?: CompleteCityEnvironmentData | null;
}

export const ClimateReportModal: React.FC<ClimateReportModalProps> = ({
  isOpen,
  onClose,
  initialCityData
}) => {
  const [selectedCity, setSelectedCity] = useState(POPULAR_CITIES[0]);
  const [cityData, setCityData] = useState<CompleteCityEnvironmentData | null>(initialCityData || null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // Category selections
  const [includedSections, setIncludedSections] = useState({
    locationOverview: true,
    tempAnalysis: true,
    rainfallAnalysis: true,
    aqiAnalysis: true,
    co2Analysis: true,
    climateRisk: true,
    historicalTrends: true,
    insights: true,
    recommendations: true,
  });

  useEffect(() => {
    if (initialCityData) {
      setCityData(initialCityData);
    } else {
      const load = async () => {
        setLoading(true);
        const d = await fetchLiveCityData(selectedCity.latitude, selectedCity.longitude, selectedCity.name, selectedCity.country);
        setCityData(d);
        setLoading(false);
      };
      load();
    }
  }, [selectedCity, initialCityData]);

  const handleSearch = async (val: string) => {
    setSearchQuery(val);
    if (!val || val.length < 2) {
      setSearchResults([]);
      return;
    }
    const res = await searchCitiesApi(val);
    setSearchResults(res);
  };

  const handleSelectCity = async (c: any) => {
    setSelectedCity(c);
    setSearchQuery('');
    setSearchResults([]);
    setLoading(true);
    const d = await fetchLiveCityData(c.latitude, c.longitude, c.name, c.country);
    setCityData(d);
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto print:p-0 print:bg-white print:static">
      <div className="bg-[#050f0a] border border-emerald-500/40 rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl relative my-8 space-y-6 print:border-none print:shadow-none print:p-6 print:bg-white print:text-black">
        
        {/* Controls Bar (Hidden in Print) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4 print:hidden">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white">Generate Environmental & Climate Report</h3>
              <p className="text-xs text-slate-400">Formal verified climate assessment with statistics, charts, and adaptation guidance.</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => reportExportService.printReport()}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white font-bold text-xs shadow-lg transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Download PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-climate-dark border border-climate-border text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* City Selector in Modal (Hidden in Print) */}
        <div className="relative print:hidden">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={`Search report target city (Current: ${cityData?.weather.cityName || selectedCity.name})...`}
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full bg-climate-darker border border-climate-border rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 z-30 mt-1 bg-climate-darker/95 border border-emerald-500/40 rounded-xl shadow-2xl overflow-hidden backdrop-blur-xl max-h-48 overflow-y-auto divide-y divide-white/5">
              {searchResults.map((city) => (
                <button
                  key={`${city.id}-${city.name}`}
                  onClick={() => handleSelectCity(city)}
                  className="w-full px-3 py-2 text-left text-xs hover:bg-emerald-500/20 text-white flex justify-between"
                >
                  <span className="font-semibold">{city.name}</span>
                  <span className="text-emerald-400 font-mono">{city.country}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* REPORT SHEET CONTENT */}
        {loading || !cityData ? (
          <div className="py-16 text-center space-y-3">
            <Loader2 className="w-8 h-8 text-emerald-400 animate-spin mx-auto" />
            <p className="text-xs text-slate-400 font-mono">Compiling environmental telemetry report...</p>
          </div>
        ) : (
          <div className="space-y-6 font-sans print:text-black">
            
            {/* 1. Formal Report Header */}
            <div className="border-b-2 border-emerald-500 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest block font-mono">
                  EcoPulse Environmental Intelligence Hub • Verified Assessment
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-white print:text-black mt-1">
                  Climate & Atmospheric Health Report
                </h1>
                <p className="text-xs text-slate-400 print:text-slate-600 mt-0.5">
                  Target Location: <strong className="text-emerald-400 print:text-black">{cityData.weather.cityName}, {cityData.weather.country}</strong> (Lat: {cityData.weather.latitude.toFixed(2)}°, Lon: {cityData.weather.longitude.toFixed(2)}°)
                </p>
              </div>

              <div className="text-left sm:text-right text-[11px] font-mono text-slate-400 print:text-slate-600">
                <div>Date Generated: <strong>{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</strong></div>
                <div>Station Sync: {cityData.weather.lastUpdated}</div>
                <div className="text-emerald-400 print:text-emerald-700 font-bold">[LIVE METEOROLOGICAL API]</div>
              </div>
            </div>

            {/* 2. Executive Summary Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-2xl bg-climate-dark/80 print:bg-slate-100 border border-climate-border print:border-slate-300 text-center">
                <span className="text-[10px] text-slate-400 print:text-slate-600 uppercase block mb-1">Temperature</span>
                <div className="text-2xl font-black font-mono text-white print:text-black">{cityData.weather.currentTemp}°C</div>
                <span className="text-[10px] text-slate-400 print:text-slate-600">Feels like {cityData.weather.feelsLikeTemp}°C</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-climate-dark/80 print:bg-slate-100 border border-climate-border print:border-slate-300 text-center">
                <span className="text-[10px] text-slate-400 print:text-slate-600 uppercase block mb-1">Air Quality Index</span>
                <div className="text-2xl font-black font-mono text-amber-400 print:text-amber-700">AQI {cityData.aqi.usAqi}</div>
                <span className="text-[10px] text-slate-400 print:text-slate-600">{cityData.aqi.category}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-climate-dark/80 print:bg-slate-100 border border-climate-border print:border-slate-300 text-center">
                <span className="text-[10px] text-slate-400 print:text-slate-600 uppercase block mb-1">Climate Risk Index</span>
                <div className="text-2xl font-black font-mono text-rose-400 print:text-rose-700">{cityData.riskScore.overallScore} / 100</div>
                <span className="text-[10px] text-slate-400 print:text-slate-600">{cityData.riskScore.category} Risk</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-climate-dark/80 print:bg-slate-100 border border-climate-border print:border-slate-300 text-center">
                <span className="text-[10px] text-slate-400 print:text-slate-600 uppercase block mb-1">Precipitation / Humidity</span>
                <div className="text-2xl font-black font-mono text-cyan-400 print:text-cyan-700">{cityData.weather.humidity}%</div>
                <span className="text-[10px] text-slate-400 print:text-slate-600">{cityData.weather.precipitation} mm rain</span>
              </div>
            </div>

            {/* 3. Section: Atmospheric & Pollutant Breakdown */}
            <div className="p-4 rounded-2xl bg-climate-dark/60 print:bg-slate-50 border border-climate-border print:border-slate-300 space-y-2">
              <h4 className="text-xs font-bold text-emerald-400 print:text-emerald-800 uppercase tracking-wider">
                Section 1 • Ambient Air Pollutant Concentrations
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-mono">
                <div className="bg-white/5 print:bg-white p-2 rounded border border-white/5 print:border-slate-200">
                  <span className="text-[10px] text-slate-400 print:text-slate-600 block">PM2.5 (Fine Dust)</span>
                  <strong className="text-rose-400 print:text-black">{cityData.aqi.pm25} µg/m³</strong>
                </div>
                <div className="bg-white/5 print:bg-white p-2 rounded border border-white/5 print:border-slate-200">
                  <span className="text-[10px] text-slate-400 print:text-slate-600 block">PM10 (Coarse)</span>
                  <strong className="text-amber-400 print:text-black">{cityData.aqi.pm10} µg/m³</strong>
                </div>
                <div className="bg-white/5 print:bg-white p-2 rounded border border-white/5 print:border-slate-200">
                  <span className="text-[10px] text-slate-400 print:text-slate-600 block">NO₂ (Nitrogen)</span>
                  <strong className="text-cyan-400 print:text-black">{cityData.aqi.no2} µg/m³</strong>
                </div>
                <div className="bg-white/5 print:bg-white p-2 rounded border border-white/5 print:border-slate-200">
                  <span className="text-[10px] text-slate-400 print:text-slate-600 block">O₃ (Ozone)</span>
                  <strong className="text-teal-400 print:text-black">{cityData.aqi.ozone} µg/m³</strong>
                </div>
                <div className="bg-white/5 print:bg-white p-2 rounded border border-white/5 print:border-slate-200">
                  <span className="text-[10px] text-slate-400 print:text-slate-600 block">UV Index</span>
                  <strong className="text-yellow-400 print:text-black">{cityData.aqi.uvIndex} / 11+</strong>
                </div>
              </div>
            </div>

            {/* 4. Section: Climate Risk & Hazard Factors */}
            <div className="p-4 rounded-2xl bg-climate-dark/60 print:bg-slate-50 border border-climate-border print:border-slate-300 space-y-2">
              <h4 className="text-xs font-bold text-emerald-400 print:text-emerald-800 uppercase tracking-wider">
                Section 2 • Composite Vulnerability Factor Analysis
              </h4>
              <div className="space-y-2 text-xs">
                {cityData.riskScore.factors.map((factor) => (
                  <div key={factor.name} className="flex items-center justify-between border-b border-white/5 print:border-slate-200 pb-1">
                    <div>
                      <span className="font-bold text-white print:text-black">{factor.name}</span>
                      <p className="text-[11px] text-slate-400 print:text-slate-600">{factor.description}</p>
                    </div>
                    <span className="font-mono font-bold text-rose-400 print:text-black shrink-0 pl-3">
                      {factor.score}/100 ({factor.severity})
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Section: Actionable Mitigation Recommendations */}
            <div className="p-4 rounded-2xl bg-emerald-950/20 print:bg-emerald-50 border border-emerald-500/30 print:border-emerald-300 space-y-2">
              <h4 className="text-xs font-bold text-emerald-400 print:text-emerald-800 uppercase tracking-wider">
                Section 3 • Recommended Policy & Personal Interventions
              </h4>
              <ul className="space-y-1 text-xs text-slate-300 print:text-slate-700">
                {cityData.riskScore.recommendations.map((rec, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 print:text-emerald-700 shrink-0 mt-0.5" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 6. Verified Footnote */}
            <div className="pt-4 border-t border-white/10 print:border-slate-300 text-[10px] text-slate-500 print:text-slate-500 flex justify-between items-center font-mono">
              <span>EcoPulse CEP Research Initiative • Data from Open-Meteo, NASA GISTEMP v4, NOAA NCEI</span>
              <span>Document ID: REP-{Date.now().toString(36).toUpperCase()}</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

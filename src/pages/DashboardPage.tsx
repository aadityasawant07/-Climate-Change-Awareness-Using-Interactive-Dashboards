import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LiveWeatherSection } from '../components/weather/LiveWeatherSection';
import { LiveAqiSection } from '../components/weather/LiveAqiSection';
import { ClimateRiskScoreCard } from '../components/weather/ClimateRiskScoreCard';
import { ClimateInsightsCard } from '../components/insights/ClimateInsightsCard';
import { ClimateReportModal } from '../components/report/ClimateReportModal';
import { StatCards } from '../components/dashboard/StatCards';
import { TempChart } from '../components/dashboard/TempChart';
import { RainfallChart } from '../components/dashboard/RainfallChart';
import { EmissionsChart } from '../components/dashboard/EmissionsChart';
import { CompleteCityEnvironmentData } from '../types/climate';
import { historicalTemperatureData } from '../data/climateData';
import { TemperatureRecord } from '../types/climate';
import { 
  BarChart3, 
  Calendar, 
  Download, 
  RefreshCcw, 
  Check, 
  Radio, 
  Layers, 
  Database, 
  TrendingUp,
  Filter,
  FileText,
  Sparkles
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { evaluateCityAlerts } = useAuth();
  const [startYear, setStartYear] = useState<number>(1880);
  const [endYear, setEndYear] = useState<number>(2050);
  const [activeMetricTab, setActiveMetricTab] = useState<'all' | 'live-weather' | 'live-aqi' | 'insights' | 'temperature' | 'rainfall' | 'emissions'>('all');
  const [selectedDataType, setSelectedDataType] = useState<'all' | 'historical' | 'projections'>('all');
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);
  const [reportModalOpen, setReportModalOpen] = useState<boolean>(false);

  // Live environmental telemetry state received from LiveWeatherSection
  const [activeCityEnv, setActiveCityEnv] = useState<CompleteCityEnvironmentData | null>(null);

  const handleCityDataLoaded = (data: CompleteCityEnvironmentData) => {
    setActiveCityEnv(data);
    evaluateCityAlerts(data);
  };

  // Export filtered temperature dataset to CSV
  const handleExportCSV = () => {
    const filtered = historicalTemperatureData.filter(
      (d: TemperatureRecord) => d.year >= startYear && d.year <= endYear
    );
    const headers = ['Year', 'GlobalAnomaly_C', 'LandAnomaly_C', 'OceanAnomaly_C', 'CO2_PPM', 'FiveYearMean_C'];
    const rows = filtered.map((d: TemperatureRecord) => [
      d.year,
      d.globalAnomaly,
      d.landAnomaly,
      d.oceanAnomaly,
      d.co2Ppm,
      d.fiveYearMean
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e: (string | number)[]) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `climate_dataset_${startYear}_${endYear}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 3000);
  };

  return (
    <div className="space-y-10 py-4">
      
      {/* 1. Dashboard Header & Data Provenance Banner */}
      <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-climate-border flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Interactive Climate Intelligence Dashboard
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              LIVE API (Real-Time)
            </span>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
              HISTORICAL (NASA/NOAA 1880-2024)
            </span>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
              IPCC AR6 PROJECTIONS
            </span>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
              AI CLIMATE INSIGHTS
            </span>
          </div>
        </div>

        {/* Action Buttons: Report Generator & CSV Export */}
        <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto">
          <button
            onClick={() => setReportModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-950/40 transition-all active:scale-95"
          >
            <FileText className="w-4 h-4" />
            <span>Generate Climate Report</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-climate-dark border border-climate-border hover:border-emerald-500/40 text-slate-300 hover:text-white font-bold text-xs transition-all active:scale-95"
          >
            {copiedNotification ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Exported!</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Export CSV</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. Global Metric Filters Bar */}
      <div className="glass-panel p-5 rounded-2xl border border-climate-border flex flex-wrap items-center justify-between gap-4">
        
        {/* Timeline Sliders */}
        <div className="flex flex-wrap items-center gap-4 flex-1 min-w-[280px]">
          <div className="flex items-center gap-2 text-xs text-slate-300 font-semibold">
            <Calendar className="w-4 h-4 text-emerald-400" />
            <span>Timeline Range:</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-slate-400">From:</span>
              <select
                value={startYear}
                onChange={(e) => setStartYear(Number(e.target.value))}
                className="bg-climate-dark border border-climate-border rounded-xl px-2.5 py-1.5 text-xs text-emerald-300 font-mono focus:outline-none focus:border-emerald-500"
              >
                {[1880, 1900, 1920, 1950, 1970, 1990, 2000, 2010].map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-slate-400">To:</span>
              <select
                value={endYear}
                onChange={(e) => setEndYear(Number(e.target.value))}
                className="bg-climate-dark border border-climate-border rounded-xl px-2.5 py-1.5 text-xs text-emerald-300 font-mono focus:outline-none focus:border-emerald-500"
              >
                {[2000, 2010, 2020, 2024, 2030, 2040, 2050].map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Data Type Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={selectedDataType}
            onChange={(e: any) => setSelectedDataType(e.target.value)}
            className="bg-climate-dark border border-climate-border rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
          >
            <option value="all">All Data Series</option>
            <option value="historical">Empirical Historical Only</option>
            <option value="projections">IPCC Projections Only</option>
          </select>
        </div>

        {/* Metric Quick Tabs */}
        <div className="flex flex-wrap items-center gap-1 bg-climate-dark/80 p-1 rounded-xl border border-climate-border">
          {[
            { id: 'all', label: 'All Modules' },
            { id: 'live-weather', label: 'Live Weather' },
            { id: 'live-aqi', label: 'Live AQI' },
            { id: 'insights', label: 'AI Insights' },
            { id: 'temperature', label: 'Temperature' },
            { id: 'rainfall', label: 'Rainfall' },
            { id: 'emissions', label: 'CO₂ Emissions' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveMetricTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeMetricTab === tab.id
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Real-Time Live Weather Feed & Forecast Section */}
      {(activeMetricTab === 'all' || activeMetricTab === 'live-weather') && (
        <section className="space-y-4">
          <LiveWeatherSection onCityDataLoaded={handleCityDataLoaded} />
        </section>
      )}

      {/* 4. AI Climate Insights Card */}
      {activeCityEnv && (activeMetricTab === 'all' || activeMetricTab === 'insights') && (
        <section className="space-y-4">
          <ClimateInsightsCard cityData={activeCityEnv} />
        </section>
      )}

      {/* 5. Real-Time Live AQI Section */}
      {activeCityEnv && (activeMetricTab === 'all' || activeMetricTab === 'live-aqi') && (
        <section className="space-y-4">
          <LiveAqiSection
            aqiData={activeCityEnv.aqi}
            cityName={activeCityEnv.weather.cityName}
            country={activeCityEnv.weather.country}
          />
        </section>
      )}

      {/* 6. Empirical Climate Risk Score Card (0-100) */}
      {activeCityEnv && (activeMetricTab === 'all' || activeMetricTab === 'live-weather') && (
        <section className="space-y-4">
          <ClimateRiskScoreCard
            riskData={activeCityEnv.riskScore}
            cityName={activeCityEnv.weather.cityName}
            country={activeCityEnv.weather.country}
          />
        </section>
      )}

      {/* 7. Historical Empirical Stat Cards */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
            [HISTORICAL BASELINE] Global Planetary Health Indicators (NASA / NOAA)
          </span>
        </div>
        <StatCards />
      </section>

      {/* 8. Historical Charts Section */}
      <div className="space-y-10">
        
        {/* Temperature Trends Chart */}
        {(activeMetricTab === 'all' || activeMetricTab === 'temperature') && (
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>A. Historical Temperature Trends (1880–2024) & IPCC AR6 Projections</span>
              </h2>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                NASA GISTEMP v4 Verified
              </span>
            </div>
            <TempChart startYear={startYear} endYear={endYear} />
          </section>
        )}

        {/* Rainfall & Precipitation Hydrology */}
        {(activeMetricTab === 'all' || activeMetricTab === 'rainfall') && (
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>B. Global Precipitation Anomaly & Extreme Drought/Flood Volatility</span>
              </h2>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                NOAA NCEI Precipitation Series
              </span>
            </div>
            <RainfallChart />
          </section>
        )}

        {/* Greenhouse Gas Emissions Chart */}
        {(activeMetricTab === 'all' || activeMetricTab === 'emissions') && (
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>C. Global Greenhouse Gas (CO₂) Emissions & Sectoral Shares</span>
              </h2>
              <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                IPCC WG3 & Global Carbon Project
              </span>
            </div>
            <EmissionsChart />
          </section>
        )}

      </div>

      {/* Standalone Report Modal */}
      <ClimateReportModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        initialCityData={activeCityEnv}
      />
    </div>
  );
};

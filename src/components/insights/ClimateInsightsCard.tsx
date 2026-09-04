import React, { useState, useEffect } from 'react';
import { CompleteCityEnvironmentData, ClimateInsightData } from '../../types/climate';
import { aiInsightsService } from '../../services/aiInsightsService';
import { 
  Sparkles, 
  BrainCircuit, 
  CheckCircle2, 
  ShieldAlert, 
  Wind, 
  Thermometer, 
  Droplets, 
  ShieldCheck, 
  Loader2, 
  RefreshCw,
  Cpu
} from 'lucide-react';

interface ClimateInsightsCardProps {
  cityData: CompleteCityEnvironmentData;
}

export const ClimateInsightsCard: React.FC<ClimateInsightsCardProps> = ({ cityData }) => {
  const [insights, setInsights] = useState<ClimateInsightData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchInsights = async () => {
    setLoading(true);
    try {
      const res = await aiInsightsService.generateInsights(cityData);
      setInsights(res);
    } catch (err) {
      console.error('Failed to generate insights:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, [cityData]);

  return (
    <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-climate-border bg-gradient-to-r from-[#071911] via-[#05130d] to-[#040e09] shadow-2xl relative overflow-hidden space-y-6">
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
              <span>Automated Climate Intelligence Summary</span>
            </h3>
          </div>
          <div className="flex flex-wrap items-center gap-2 pt-0.5">
            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
              insights?.isAiGenerated 
                ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
            }`}>
              {insights?.isAiGenerated ? '🤖 AI-GENERATED INSIGHT' : '⚡ RULE-BASED METEOROLOGY ENGINE'}
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              Model: {insights?.modelName || 'Deterministic Engine v2.4'}
            </span>
          </div>
        </div>

        <button
          onClick={fetchInsights}
          disabled={loading}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-climate-dark border border-climate-border text-xs text-slate-300 hover:text-white hover:border-emerald-500/40 transition-colors self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-emerald-400' : ''}`} />
          <span>Regenerate Analysis</span>
        </button>
      </div>

      {loading || !insights ? (
        <div className="py-12 flex flex-col items-center justify-center space-y-3">
          <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
          <p className="text-xs text-slate-400 font-mono">Synthesizing multi-variable atmospheric telemetry...</p>
        </div>
      ) : (
        <div className="space-y-6 relative z-10">
          
          {/* Top Status Banner */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Current Condition Badge */}
            <div className="md:col-span-4 p-4 rounded-2xl bg-climate-dark/80 border border-climate-border flex flex-col justify-between space-y-2">
              <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                Overall Ecological Condition
              </span>
              <div className="flex items-center gap-3">
                <span className={`text-2xl font-black font-mono px-3 py-1 rounded-xl border ${insights.currentConditionColor}`}>
                  {insights.currentCondition}
                </span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">
                Calculated at {insights.timestamp} (Confidence: {insights.confidenceScore}%)
              </span>
            </div>

            {/* Key Observation Callout */}
            <div className="md:col-span-8 p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 flex flex-col justify-center space-y-1.5">
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Primary Key Observation</span>
              </span>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                {insights.keyObservation}
              </p>
            </div>
          </div>

          {/* Environmental Factor Analysis Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Air Quality */}
            <div className="p-3.5 rounded-2xl bg-climate-dark/70 border border-climate-border space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                <Wind className="w-4 h-4" />
                <span>Air Quality Assessment</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {insights.airQualitySummary}
              </p>
            </div>

            {/* Temperature Stress */}
            <div className="p-3.5 rounded-2xl bg-climate-dark/70 border border-climate-border space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-400">
                <Thermometer className="w-4 h-4" />
                <span>Thermal Stress Index</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {insights.temperatureSummary}
              </p>
            </div>

            {/* Climate Vulnerability */}
            <div className="p-3.5 rounded-2xl bg-climate-dark/70 border border-climate-border space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
                <ShieldCheck className="w-4 h-4" />
                <span>Risk & Hydrology Analysis</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {insights.climateRiskSummary}
              </p>
            </div>
          </div>

          {/* Actionable Recommendations List */}
          <div className="p-5 rounded-2xl bg-climate-dark/90 border border-emerald-500/30 space-y-3">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <Cpu className="w-4 h-4" />
              <span>Recommended Environmental & Personal Mitigation Actions:</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {insights.recommendedActions.map((action, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-snug">{action}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

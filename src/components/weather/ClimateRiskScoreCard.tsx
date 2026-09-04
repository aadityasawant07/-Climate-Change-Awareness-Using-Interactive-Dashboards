import React from 'react';
import { ClimateRiskScoreData, ClimateRiskCategory } from '../../types/climate';
import { 
  ShieldAlert, 
  Flame, 
  Wind, 
  CloudRain, 
  Compass, 
  Activity, 
  CheckCircle2, 
  AlertTriangle,
  Lightbulb
} from 'lucide-react';

interface ClimateRiskScoreCardProps {
  riskData: ClimateRiskScoreData;
  cityName: string;
  country: string;
}

export const ClimateRiskScoreCard: React.FC<ClimateRiskScoreCardProps> = ({
  riskData,
  cityName,
  country,
}) => {
  const getCategoryStyles = (category: ClimateRiskCategory) => {
    switch (category) {
      case 'Very Low':
        return {
          textColor: 'text-emerald-400',
          bgColor: 'bg-emerald-500/10',
          borderColor: 'border-emerald-500/40',
          barGradient: 'from-emerald-500 to-teal-400',
        };
      case 'Low':
        return {
          textColor: 'text-teal-400',
          bgColor: 'bg-teal-500/10',
          borderColor: 'border-teal-500/40',
          barGradient: 'from-teal-500 to-emerald-400',
        };
      case 'Moderate':
        return {
          textColor: 'text-yellow-400',
          bgColor: 'bg-yellow-500/10',
          borderColor: 'border-yellow-500/40',
          barGradient: 'from-yellow-500 to-amber-500',
        };
      case 'High':
        return {
          textColor: 'text-orange-400',
          bgColor: 'bg-orange-500/10',
          borderColor: 'border-orange-500/40',
          barGradient: 'from-orange-500 to-rose-500',
        };
      case 'Very High':
        return {
          textColor: 'text-rose-400',
          bgColor: 'bg-rose-500/10',
          borderColor: 'border-rose-500/40',
          barGradient: 'from-rose-500 to-purple-600',
        };
      default:
        return {
          textColor: 'text-slate-400',
          bgColor: 'bg-slate-800',
          borderColor: 'border-slate-700',
          barGradient: 'from-slate-600 to-slate-400',
        };
    }
  };

  const styles = getCategoryStyles(riskData.category);

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-climate-border space-y-6">
      
      {/* 1. Header & Overall Score Gauge */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/5">
        
        {/* Left Explanation */}
        <div className="space-y-3 max-w-xl">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                Empirical Environmental Vulnerability Index
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {cityName} Climate Risk Score
              </h3>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            A comprehensive climate vulnerability score calibrated on a <strong>0–100 scale</strong>, synthesizing ambient air pollution hazards, heat wave severity, precipitation volatility, storm risks, and geographical exposure.
          </p>

          <div className="flex items-center gap-1.5 text-[11px] font-mono text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-xl border border-amber-500/20">
            <span>ℹ️ <strong>Educational Climate Score:</strong> Simplified heuristic model calibrated for public awareness, not an official governmental risk determination.</span>
          </div>

          {/* Scale Categories Bar */}
          <div className="space-y-1.5 pt-2">
            <div className="w-full h-3 rounded-full bg-climate-dark border border-climate-border overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${styles.barGradient} rounded-full transition-all duration-700`}
                style={{ width: `${riskData.overallScore}%` }}
              />
            </div>
            <div className="grid grid-cols-5 text-[10px] font-mono text-center text-slate-400 pt-0.5">
              <span className="text-emerald-400">0-20 Very Low</span>
              <span className="text-teal-400">21-40 Low</span>
              <span className="text-yellow-400">41-60 Mod</span>
              <span className="text-orange-400">61-80 High</span>
              <span className="text-rose-400">81-100 V.High</span>
            </div>
          </div>
        </div>

        {/* Right Large Circular/Arc Badge */}
        <div className="flex flex-col items-center justify-center p-6 rounded-3xl bg-climate-dark/90 border border-climate-border text-center min-w-[220px] shadow-xl space-y-2">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Overall Risk Score</span>
          
          <div className={`text-6xl font-black font-mono tracking-tight ${styles.textColor} leading-none`}>
            {riskData.overallScore}
            <span className="text-lg font-normal text-slate-500 font-sans">/100</span>
          </div>

          <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${styles.bgColor} ${styles.textColor} ${styles.borderColor}`}>
            {riskData.category} Risk
          </div>

          <div className="pt-2 text-[11px] text-slate-400 leading-snug">
            {cityName}, {country}
          </div>
        </div>

      </div>

      {/* 2. Main Risk Drivers Breakdown Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span>Key Factors Driving Climate Vulnerability</span>
          </h4>
          <span className="text-[11px] text-slate-500 font-mono">Weighted Environmental Assessment</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {riskData.factors.map((factor) => {
            const factorStyles = getCategoryStyles(factor.severity);
            return (
              <div
                key={factor.name}
                className="p-4 rounded-2xl bg-climate-dark/70 border border-climate-border space-y-2 hover:bg-white/5 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-white">{factor.name}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${factorStyles.bgColor} ${factorStyles.textColor} ${factorStyles.borderColor}`}>
                    {factor.severity}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Factor Score:</span>
                  <span className={`font-bold ${factorStyles.textColor}`}>{factor.score} / 100</span>
                </div>

                <div className="w-full h-1.5 rounded-full bg-climate-darker overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${factorStyles.barGradient} rounded-full`}
                    style={{ width: `${factor.score}%` }}
                  />
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
                  {factor.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Actionable Adaptation Recommendations */}
      <div className="p-4 rounded-2xl bg-climate-dark/90 border border-emerald-500/30 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
          <Lightbulb className="w-4 h-4" />
          <span>Recommended Municipal & Individual Adaptation Pathways</span>
        </div>

        <ul className="space-y-1.5 text-xs text-slate-300">
          {riskData.recommendations.map((rec, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{rec}</span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};

import React, { useState } from 'react';
import { educationalTopicsList, EducationalTopic } from '../../data/educationalData';
import { 
  Flame, 
  Trees, 
  Wind, 
  Factory, 
  Waves, 
  CloudLightning, 
  MountainSnow, 
  X, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle,
  Lightbulb,
  Sparkles
} from 'lucide-react';

export const CausesEffectsGrid: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<EducationalTopic | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame': return <Flame className="w-5 h-5 text-rose-400" />;
      case 'Trees': return <Trees className="w-5 h-5 text-lime-400" />;
      case 'Wind': return <Wind className="w-5 h-5 text-teal-400" />;
      case 'Factory': return <Factory className="w-5 h-5 text-amber-400" />;
      case 'Waves': return <Waves className="w-5 h-5 text-cyan-400" />;
      case 'CloudLightning': return <CloudLightning className="w-5 h-5 text-purple-400" />;
      case 'MountainSnow': return <MountainSnow className="w-5 h-5 text-blue-300" />;
      default: return <Sparkles className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <span>7 Core Pillars of Planetary Climate Science</span>
        </h3>
        <p className="text-xs text-slate-400">
          Click any card to explore simple explanations, empirical statistics, primary causes, environmental effects, and individual action checklists.
        </p>
      </div>

      {/* Grid of 7 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {educationalTopicsList.map((topic) => (
          <div
            key={topic.id}
            onClick={() => setSelectedTopic(topic)}
            className="glass-panel p-5 rounded-3xl border border-climate-border hover:border-emerald-500/50 cursor-pointer transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between group shadow-xl"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-2xl bg-climate-dark border border-climate-border group-hover:border-emerald-500/40 transition-colors">
                  {getIcon(topic.iconName)}
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase tracking-wider">
                  {topic.badge}
                </span>
              </div>

              <h4 className="font-extrabold text-sm sm:text-base text-white group-hover:text-emerald-300 transition-colors mb-2">
                {topic.title}
              </h4>

              <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-4">
                {topic.shortExplanation}
              </p>
            </div>

            <div className="pt-3 border-t border-white/5 space-y-2">
              <div className="text-[11px] font-mono text-emerald-400 bg-climate-dark/80 px-2.5 py-1.5 rounded-xl border border-climate-border line-clamp-1">
                📊 {topic.keyStatistics[0]}
              </div>

              <div className="flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-emerald-400 transition-colors pt-1">
                <span>Explore full report</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Modal Popup */}
      {selectedTopic && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-climate-card border border-emerald-500/50 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in duration-200 my-8">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedTopic(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-climate-dark border border-climate-border text-slate-400 hover:text-white hover:border-emerald-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-4 pr-10">
              <div className="p-3 rounded-2xl bg-climate-dark border border-climate-border">
                {getIcon(selectedTopic.iconName)}
              </div>
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase tracking-wider">
                  {selectedTopic.badge}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-1">{selectedTopic.title}</h3>
              </div>
            </div>

            {/* Detailed Explanation */}
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-6 bg-climate-dark/60 p-4 rounded-2xl border border-climate-border">
              {selectedTopic.detailedExplanation}
            </p>

            {/* 1. Key Statistics */}
            <div className="space-y-2 mb-4">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <span>Key Empirical Statistics</span>
              </h4>
              <div className="space-y-1.5">
                {selectedTopic.keyStatistics.map((stat, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-climate-dark/80 border border-amber-500/20 text-xs font-mono text-amber-300">
                    • {stat}
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Main Causes & Effects (2 Columns) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Causes */}
              <div className="p-4 rounded-2xl bg-climate-dark/80 border border-rose-500/30 space-y-2">
                <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                  Primary Causes:
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {selectedTopic.mainCauses.map((cause, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-rose-400 font-bold">•</span>
                      <span>{cause}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Effects */}
              <div className="p-4 rounded-2xl bg-climate-dark/80 border border-cyan-500/30 space-y-2">
                <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  Planetary & Human Effects:
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {selectedTopic.effects.map((effect, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-cyan-400 font-bold">•</span>
                      <span>{effect}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 3. What Individuals Can Do */}
            <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 space-y-2 mb-6">
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-emerald-400" />
                <span>What Individuals Can Do:</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-200">
                {selectedTopic.individualActions.map((action, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => setSelectedTopic(null)}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow-lg shadow-emerald-950/40"
            >
              Close Science Module
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { allAchievements } from '../../data/achievementsData';
import { Award, Lock, Sparkles, CheckCircle2 } from 'lucide-react';

export const AchievementsGrid: React.FC = () => {
  const { unlockedAchievements } = useAuth();

  const unlockedCount = unlockedAchievements.length;
  const progressPct = Math.round((unlockedCount / allAchievements.length) * 100);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-climate-border flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Award className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Planetary Stewardship Badges & Milestones
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            Earn verifiable eco-badges by taking climate assessments, adopting sustainable habits, and exploring global telemetry.
          </p>
        </div>

        {/* Progress Badge */}
        <div className="flex items-center gap-3 bg-climate-dark/90 border border-amber-500/40 px-4 py-2 rounded-2xl shadow-xl">
          <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Total Progress</div>
            <div className="text-sm font-black font-mono text-amber-300">
              {unlockedCount} / {allAchievements.length} Badges ({progressPct}%)
            </div>
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {allAchievements.map((badge) => {
          const unlockedRecord = unlockedAchievements.find((a) => a.badgeKey === badge.key);
          const isUnlocked = !!unlockedRecord;

          return (
            <div
              key={badge.key}
              className={`p-6 rounded-3xl border transition-all flex flex-col justify-between space-y-4 shadow-xl ${
                isUnlocked
                  ? 'glass-panel border-emerald-500/50 bg-emerald-950/20 hover:scale-105 shadow-emerald-950/30'
                  : 'bg-climate-dark/40 border-climate-border/60 opacity-50 grayscale hover:opacity-70'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-climate-dark border border-climate-border flex items-center justify-center text-2xl shadow-lg">
                    {badge.icon}
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${
                    isUnlocked
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}>
                    {badge.category}
                  </span>
                </div>

                <h4 className="text-base font-extrabold text-white mb-1">
                  {badge.title}
                </h4>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {badge.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
                {isUnlocked ? (
                  <span className="flex items-center gap-1 text-emerald-400 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Unlocked</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-slate-500 font-medium">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Locked</span>
                  </span>
                )}

                {isUnlocked && unlockedRecord && (
                  <span className="text-slate-500 text-[10px]">
                    {new Date(unlockedRecord.unlockedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

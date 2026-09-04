import React from 'react';
import { ClimateScoreCalculator } from '../components/actions/ClimateScoreCalculator';
import { DailyHabitTracker } from '../components/actions/DailyHabitTracker';
import { Sparkles, HeartHandshake, CheckCircle2, ShieldCheck, Award } from 'lucide-react';

export const ActionsPage: React.FC = () => {
  return (
    <div className="space-y-12 py-4">
      {/* 1. Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-climate-border">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Sustainable Habits & Climate Action Score
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            Assess your personal environmental footprint, take meaningful climate pledges, track daily habits, and generate your verifiable certificate.
          </p>
        </div>
      </div>

      {/* 2. Main Interactive Climate Score Calculator */}
      <section className="space-y-4">
        <ClimateScoreCalculator />
      </section>

      {/* 3. Daily Habit Streak Tracker */}
      <section className="space-y-4">
        <DailyHabitTracker />
      </section>
    </div>
  );
};

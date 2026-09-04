import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { PageTab } from '../../types/climate';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { 
  Sparkles, 
  TrendingUp, 
  Award, 
  MapPin, 
  Calendar, 
  ArrowRight, 
  Trees, 
  CheckCircle2, 
  ShieldCheck,
  User,
  Plus
} from 'lucide-react';

interface PersonalDashboardProps {
  setActiveTab: (tab: PageTab) => void;
}

export const PersonalDashboard: React.FC<PersonalDashboardProps> = ({ setActiveTab }) => {
  const { user, historyRecords, savedCities, unlockedAchievements } = useAuth();

  // Compute stats from history
  const latestRecord = historyRecords[0] || null;
  const currentScore = latestRecord ? latestRecord.score : 0;
  const bestScore = historyRecords.length > 0 ? Math.max(...historyRecords.map((r) => r.score)) : 0;
  const avgScore = historyRecords.length > 0 ? Math.round(historyRecords.reduce((acc, r) => acc + r.score, 0) / historyRecords.length) : 0;
  const totalCo2Saved = historyRecords.reduce((acc, r) => acc + r.co2SavedKg, 0);

  // Prepare chronological chart data (oldest to newest)
  const chartData = [...historyRecords].reverse().map((r) => {
    const d = new Date(r.createdAt);
    return {
      date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      score: r.score,
      grade: r.grade,
      co2Saved: r.co2SavedKg,
    };
  });

  return (
    <div className="space-y-8">
      {/* 1. Welcome Hero Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0a2418] via-[#071b12] to-[#040e09] border-2 border-emerald-500/40 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <Sparkles className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Personal Climate Command Center
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Welcome back, {user?.name}! 👋
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Track your individual carbon footprint mitigation, review past sustainability assessments, and monitor your saved climate observatories.
            </p>
          </div>

          {/* Quick Action Button */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('actions')}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-xl shadow-emerald-950/50 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>New Assessment</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. KPI Summary Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Current Score */}
        <div className="glass-panel p-5 rounded-2xl border border-emerald-500/30 bg-emerald-950/10 space-y-1">
          <span className="text-[11px] text-slate-400 block">Current Action Score</span>
          <div className="text-3xl font-black font-mono text-emerald-400">
            {currentScore} <span className="text-sm font-sans text-slate-500">/ 100</span>
          </div>
          <span className="text-[10px] text-emerald-300 font-mono">
            {latestRecord ? `Grade: ${latestRecord.grade}` : 'Take first assessment'}
          </span>
        </div>

        {/* Best Score */}
        <div className="glass-panel p-5 rounded-2xl border border-amber-500/30 bg-amber-950/10 space-y-1">
          <span className="text-[11px] text-slate-400 block">All-Time Best Score</span>
          <div className="text-3xl font-black font-mono text-amber-300">
            {bestScore} <span className="text-sm font-sans text-slate-500">/ 100</span>
          </div>
          <span className="text-[10px] text-amber-300/80 font-mono">Peak Milestone</span>
        </div>

        {/* Average Score */}
        <div className="glass-panel p-5 rounded-2xl border border-cyan-500/30 bg-cyan-950/10 space-y-1">
          <span className="text-[11px] text-slate-400 block">Average Score</span>
          <div className="text-3xl font-black font-mono text-cyan-300">
            {avgScore} <span className="text-sm font-sans text-slate-500">/ 100</span>
          </div>
          <span className="text-[10px] text-cyan-300/80 font-mono">{historyRecords.length} Assessments</span>
        </div>

        {/* Saved Cities */}
        <div className="glass-panel p-5 rounded-2xl border border-purple-500/30 bg-purple-950/10 space-y-1">
          <span className="text-[11px] text-slate-400 block">Saved Cities</span>
          <div className="text-3xl font-black font-mono text-purple-300">
            {savedCities.length}
          </div>
          <span className="text-[10px] text-purple-300/80 font-mono">Pinned Hubs</span>
        </div>
      </div>

      {/* 2.5 Personalized Dynamic Recommendations Card */}
      <div className="glass-panel p-6 rounded-3xl border border-emerald-500/40 bg-gradient-to-r from-[#071b12] to-[#040e09] space-y-3 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Sparkles className="w-4 h-4 text-emerald-400" />
            </div>
            <h3 className="text-sm font-bold text-white">Personalized Climate Action Recommendations</h3>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            Tailored for {user?.name}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          <div className="p-3.5 rounded-2xl bg-climate-dark/70 border border-climate-border space-y-1">
            <span className="text-[10px] text-emerald-400 font-mono font-bold uppercase block">📈 Progress Trajectory</span>
            <p className="text-xs text-slate-200 font-medium">
              {historyRecords.length > 1 && historyRecords[0].score > historyRecords[1].score
                ? `Your sustainability score improved by +${historyRecords[0].score - historyRecords[1].score} points compared to your previous assessment.`
                : latestRecord
                ? `Your current Climate Action Score is ${currentScore}/100 with ${latestRecord.co2SavedKg} kg CO₂ avoided per year.`
                : 'Complete your first assessment to establish your baseline carbon mitigation score.'}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-climate-dark/70 border border-climate-border space-y-1">
            <span className="text-[10px] text-amber-400 font-mono font-bold uppercase block">⚡ Highest Opportunity</span>
            <p className="text-xs text-slate-200 font-medium">
              {latestRecord?.recommendations[0] || 'Switch home electricity to certified green energy tariffs and replace old incandescent fixtures.'}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-climate-dark/70 border border-climate-border space-y-1">
            <span className="text-[10px] text-cyan-400 font-mono font-bold uppercase block">🚲 High-Impact Action</span>
            <p className="text-xs text-slate-200 font-medium">
              {latestRecord?.recommendations[1] || 'Opt for public transit, cycling, or walking twice more per week to eliminate ~240 kg of fuel emissions.'}
            </p>
          </div>
        </div>
      </div>

      {/* 3. Score Over Time Progress Chart */}
      <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-climate-border space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>Climate Action Score Over Time</span>
            </h3>
            <p className="text-xs text-slate-400">
              Visual trajectory tracking your sustainability score improvement over consecutive assessments.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('my-history')}
            className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
          >
            <span>View full history</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {chartData.length > 0 ? (
          <div className="w-full h-64 sm:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="userScoreGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1b4332" opacity={0.3} />
                <XAxis dataKey="date" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#060d0a', borderColor: '#2d6a4f', borderRadius: '12px', fontSize: '11px' }}
                  formatter={(val: any) => [`Score: ${val} / 100`, 'Climate Action Index']}
                />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#10b981"
                  strokeWidth={3}
                  fill="url(#userScoreGrad)"
                  dot={{ r: 5, fill: '#10b981', stroke: '#060d0a', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-climate-dark/60 border border-climate-border text-center space-y-2">
            <p className="text-xs text-slate-400">No assessment scores recorded yet.</p>
            <button
              onClick={() => setActiveTab('actions')}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors"
            >
              Take Your First Climate Assessment
            </button>
          </div>
        )}
      </div>

      {/* 4. Two Columns: Saved Cities & Unlocked Achievements Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Saved Cities Preview */}
        <div className="lg:col-span-6 glass-panel p-6 rounded-3xl border border-climate-border space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span>Saved Climate Locations ({savedCities.length})</span>
            </h3>
            <button
              onClick={() => setActiveTab('saved-cities')}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
            >
              Manage all
            </button>
          </div>

          {savedCities.length > 0 ? (
            <div className="space-y-2.5">
              {savedCities.slice(0, 3).map((city) => (
                <div
                  key={city.id}
                  className="p-3.5 rounded-2xl bg-climate-dark/80 border border-climate-border flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-climate-darker border border-climate-border text-cyan-400">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-xs sm:text-sm text-white">{city.cityName}</div>
                      <div className="text-[11px] text-slate-400">{city.country}</div>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono font-bold bg-white/5 text-emerald-400 px-2.5 py-1 rounded-lg border border-white/10">
                    Lat {city.latitude.toFixed(1)}°
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-climate-dark/60 border border-climate-border text-center space-y-2">
              <p className="text-xs text-slate-400">No favorite cities saved yet.</p>
              <button
                onClick={() => setActiveTab('dashboard')}
                className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold"
              >
                Browse Weather Dashboard & Save Cities &rarr;
              </button>
            </div>
          )}
        </div>

        {/* Right: Unlocked Achievements Preview */}
        <div className="lg:col-span-6 glass-panel p-6 rounded-3xl border border-climate-border space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Unlocked Eco Badges ({unlockedAchievements.length} / 7)</span>
            </h3>
            <span className="text-[11px] text-slate-400 font-mono">Gamified Milestones</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {[
              { key: 'first_step', title: 'First Step', icon: '🌱' },
              { key: 'eco_recycler', title: 'Eco Recycler', icon: '♻️' },
              { key: 'green_traveler', title: 'Green Traveler', icon: '🚲' },
              { key: 'tree_champion', title: 'Tree Champion', icon: '🌳' },
              { key: 'clean_energy', title: 'Clean Energy', icon: '⚡' },
              { key: 'climate_hero', title: 'Climate Hero', icon: '🔥' },
            ].map((b) => {
              const isUnlocked = unlockedAchievements.some((a) => a.badgeKey === b.key);
              return (
                <div
                  key={b.key}
                  className={`p-3 rounded-2xl border text-center space-y-1 transition-all ${
                    isUnlocked
                      ? 'bg-emerald-950/30 border-emerald-500/50 shadow-md'
                      : 'bg-climate-dark/40 border-climate-border/60 opacity-40 grayscale'
                  }`}
                >
                  <div className="text-2xl">{b.icon}</div>
                  <div className="text-[11px] font-bold text-white leading-tight">{b.title}</div>
                  <span className={`text-[9px] block font-mono font-bold ${isUnlocked ? 'text-emerald-400' : 'text-slate-500'}`}>
                    {isUnlocked ? 'Unlocked' : 'Locked'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

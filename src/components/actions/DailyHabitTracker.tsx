import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Flame, Sparkles, Trophy, Calendar } from 'lucide-react';

interface DailyTask {
  id: string;
  label: string;
  category: string;
}

const dailyTasks: DailyTask[] = [
  { id: 'dt-1', label: 'Turned off standby appliances / lights when leaving room', category: 'Energy' },
  { id: 'dt-2', label: 'Carried a reusable water flask & shopping tote bag', category: 'Waste' },
  { id: 'dt-3', label: 'Ate at least one entirely plant-based meal today', category: 'Diet' },
  { id: 'dt-4', label: 'Walked, cycled, or took public transit instead of solo car', category: 'Transit' },
  { id: 'dt-5', label: 'Took a short (<5 min) water-saving shower', category: 'Water' },
];

export const DailyHabitTracker: React.FC = () => {
  const [completedTaskIds, setCompletedTaskIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('eco_daily_tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [streakDays, setStreakDays] = useState<number>(() => {
    const saved = localStorage.getItem('eco_streak_days');
    return saved ? Number(saved) : 5;
  });

  useEffect(() => {
    localStorage.setItem('eco_daily_tasks', JSON.stringify(completedTaskIds));
  }, [completedTaskIds]);

  useEffect(() => {
    localStorage.setItem('eco_streak_days', String(streakDays));
  }, [streakDays]);

  const toggleTask = (id: string) => {
    if (completedTaskIds.includes(id)) {
      setCompletedTaskIds(completedTaskIds.filter((t) => t !== id));
    } else {
      const updated = [...completedTaskIds, id];
      setCompletedTaskIds(updated);
      if (updated.length === dailyTasks.length) {
        setStreakDays((prev) => prev + 1);
      }
    }
  };

  const progressPct = Math.round((completedTaskIds.length / dailyTasks.length) * 100);

  return (
    <div className="glass-panel p-6 rounded-2xl space-y-5">
      {/* Header with Streak Counter */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Calendar className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-white">Daily Sustainable Habit Streak</h3>
          </div>
          <p className="text-xs text-slate-400">
            Micro-actions build lifelong planetary conservation habits.
          </p>
        </div>

        {/* Streak Badge */}
        <div className="flex items-center gap-2 bg-climate-dark/90 border border-amber-500/40 px-3.5 py-1.5 rounded-2xl shadow-lg shadow-amber-900/20">
          <Flame className="w-5 h-5 text-amber-400 fill-amber-400 animate-bounce" />
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Active Streak</div>
            <div className="text-sm font-black font-mono text-amber-300 leading-none">
              {streakDays} Days Strong!
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-slate-300">Today's Daily Completion:</span>
          <span className="font-bold text-emerald-400">{completedTaskIds.length}/{dailyTasks.length} Done ({progressPct}%)</span>
        </div>
        <div className="w-full h-2 rounded-full bg-climate-dark overflow-hidden border border-climate-border">
          <div
            className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-2">
        {dailyTasks.map((task) => {
          const isDone = completedTaskIds.includes(task.id);
          return (
            <div
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                isDone
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-white'
                  : 'bg-climate-dark/60 border-climate-border text-slate-300 hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                {isDone ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-500 shrink-0" />
                )}
                <span className={`text-xs ${isDone ? 'line-through text-slate-400' : 'font-medium'}`}>
                  {task.label}
                </span>
              </div>

              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/5 text-emerald-400 border border-white/10 uppercase tracking-wider">
                {task.category}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

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
  Calendar, 
  Trash2, 
  TrendingUp, 
  Sparkles, 
  CheckCircle2, 
  Award, 
  Plus 
} from 'lucide-react';

interface ScoreHistoryViewProps {
  setActiveTab: (tab: PageTab) => void;
}

export const ScoreHistoryView: React.FC<ScoreHistoryViewProps> = ({ setActiveTab }) => {
  const { historyRecords, deleteHistoryRecord } = useAuth();

  // Chart data from oldest to newest
  const chartData = [...historyRecords].reverse().map((r) => {
    const d = new Date(r.createdAt);
    return {
      date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      score: r.score,
      grade: r.grade,
      co2Saved: r.co2SavedKg,
    };
  });

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-climate-border flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Calendar className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              My Climate Action Assessment History
            </h2>
          </div>
          <p className="text-xs text-slate-400">
            Review your past sustainability score logs, carbon savings, and tailored recommendations.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('actions')}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-950/40 transition-all flex items-center gap-2 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Assessment</span>
        </button>
      </div>

      {/* Progress Chart */}
      {chartData.length > 0 && (
        <div className="glass-panel p-6 rounded-3xl border border-climate-border space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>Score Trajectory Over Time</span>
            </h3>
            <span className="text-[11px] text-slate-500 font-mono">{historyRecords.length} Assessments Logged</span>
          </div>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="historyScoreGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1b4332" opacity={0.3} />
                <XAxis dataKey="date" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 10 }} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#060d0a', borderColor: '#2d6a4f', borderRadius: '12px', fontSize: '11px' }}
                />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#10b981"
                  strokeWidth={3}
                  fill="url(#historyScoreGrad)"
                  dot={{ r: 5, fill: '#10b981' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* History Records List */}
      <div className="space-y-4">
        {historyRecords.length > 0 ? (
          historyRecords.map((record) => {
            const formattedDate = new Date(record.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            });

            return (
              <div
                key={record.id}
                className="glass-panel p-6 rounded-3xl border border-climate-border hover:border-emerald-500/40 transition-all space-y-4 shadow-xl relative group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl font-black font-mono text-emerald-400">
                      {record.score}
                      <span className="text-sm font-normal text-slate-500 font-sans">/100</span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                          Grade: {record.grade}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">
                          -{record.co2SavedKg} kg CO₂ / yr
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500 font-mono mt-0.5 block">
                        {formattedDate}
                      </span>
                    </div>
                  </div>

                  {/* Delete Record Button */}
                  <button
                    onClick={() => deleteHistoryRecord(record.id)}
                    className="p-2 rounded-xl bg-climate-dark border border-climate-border text-slate-400 hover:text-rose-400 hover:border-rose-500/40 transition-colors self-end sm:self-auto"
                    title="Delete record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Recommendations */}
                {record.recommendations.length > 0 && (
                  <div className="space-y-1.5 pt-1 text-xs">
                    <span className="font-bold text-slate-300 block">Personalized Action Steps:</span>
                    <ul className="space-y-1 text-slate-400">
                      {record.recommendations.map((rec, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="glass-panel p-12 rounded-3xl border border-climate-border text-center space-y-3">
            <Sparkles className="w-10 h-10 text-emerald-400 mx-auto opacity-60" />
            <h3 className="text-lg font-bold text-white">No Assessment History Yet</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Take the interactive Climate Action assessment to calculate your score, save results, and watch your progress over time!
            </p>
            <button
              onClick={() => setActiveTab('actions')}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors"
            >
              Start Assessment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

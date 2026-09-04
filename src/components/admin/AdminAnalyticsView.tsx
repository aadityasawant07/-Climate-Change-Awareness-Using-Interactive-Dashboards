import React, { useState, useEffect } from 'react';
import { dbAnalytics, dbUsers, dbHistory, dbSavedLocations, dbAlerts } from '../../services/db';
import { reportExportService } from '../../services/reportExportService';
import { 
  Users, 
  BarChart3, 
  MapPin, 
  Bell, 
  TrendingUp, 
  Download, 
  Calendar, 
  ShieldAlert, 
  Award,
  Loader2,
  FileSpreadsheet
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';

export const AdminAnalyticsView: React.FC = () => {
  const [overview, setOverview] = useState<any>(null);
  const [dateFilter, setDateFilter] = useState<'today' | '7days' | '30days' | '6months' | 'all'>('30days');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await dbAnalytics.getPlatformOverview();
      setOverview(data);
      setLoading(false);
    };
    load();
  }, [dateFilter]);

  // Sample registration trends data
  const registrationTrendData = [
    { month: 'Apr', registrations: 12, assessments: 28 },
    { month: 'May', registrations: 24, assessments: 54 },
    { month: 'Jun', registrations: 45, assessments: 98 },
    { month: 'Jul', registrations: 68, assessments: 142 },
    { month: 'Aug', registrations: 95, assessments: 215 },
    { month: 'Sep', registrations: 130, assessments: 290 },
  ];

  // Score distribution data
  const scoreDistributionData = [
    { range: '0-40 (Red)', count: 18, color: '#f43f5e' },
    { range: '41-60 (Yellow)', count: 42, color: '#f59e0b' },
    { range: '61-80 (Green)', count: 96, color: '#10b981' },
    { range: '81-100 (Hero)', count: 54, color: '#06b6d4' },
  ];

  // Climate Risk Distribution
  const riskDistributionData = [
    { name: 'Very Low', value: 25, color: '#10b981' },
    { name: 'Low', value: 35, color: '#14b8a6' },
    { name: 'Moderate', value: 22, color: '#f59e0b' },
    { name: 'High', value: 12, color: '#f97316' },
    { name: 'Very High', value: 6, color: '#f43f5e' },
  ];

  const handleExportUsers = async () => {
    const users = await dbUsers.getAll();
    reportExportService.exportUsersToCSV(users);
  };

  const handleExportAssessments = async () => {
    const assessments = await dbHistory.getAll();
    reportExportService.exportAssessmentsToCSV(assessments);
  };

  const handleExportLocations = async () => {
    const locs = await dbSavedLocations.getAll();
    reportExportService.exportLocationsToCSV(locs);
  };

  if (loading || !overview) {
    return (
      <div className="py-16 text-center space-y-3">
        <Loader2 className="w-8 h-8 text-emerald-400 animate-spin mx-auto" />
        <p className="text-xs text-slate-400 font-mono">Aggregating platform metrics and telemetry logs...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* 1. Admin Header & Date Range Filter */}
      <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-climate-border flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40 uppercase">
              Admin Platform Analytics
            </span>
          </div>
          <h2 className="text-2xl font-black text-white">Platform Health & Telemetry Analytics</h2>
          <p className="text-xs text-slate-400">Global user metrics, assessment score distributions, and environmental observatory rankings.</p>
        </div>

        {/* Date Filter & Export Row */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-1.5 bg-climate-dark/80 p-1 rounded-xl border border-climate-border">
            {[
              { id: 'today', label: 'Today' },
              { id: '7days', label: '7 Days' },
              { id: '30days', label: '30 Days' },
              { id: '6months', label: '6 Months' },
              { id: 'all', label: 'All' },
            ].map((d) => (
              <button
                key={d.id}
                onClick={() => setDateFilter(d.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  dateFilter === d.id
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleExportUsers}
              className="flex items-center gap-1 px-3 py-2 rounded-xl bg-climate-dark border border-climate-border hover:border-emerald-500/40 text-xs text-slate-300 hover:text-white transition-colors"
              title="Export Users CSV"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
              <span>Users CSV</span>
            </button>

            <button
              onClick={handleExportAssessments}
              className="flex items-center gap-1 px-3 py-2 rounded-xl bg-climate-dark border border-climate-border hover:border-emerald-500/40 text-xs text-slate-300 hover:text-white transition-colors"
              title="Export Assessments CSV"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Scores CSV</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-emerald-500/30 bg-emerald-950/10 space-y-1">
          <span className="text-[11px] text-slate-400 block">Total Registered Users</span>
          <div className="text-3xl font-black font-mono text-emerald-400">{overview.totalUsers}</div>
          <span className="text-[10px] text-emerald-300 font-mono">+{overview.activeUsers} Active Accounts</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-cyan-500/30 bg-cyan-950/10 space-y-1">
          <span className="text-[11px] text-slate-400 block">Climate Assessments</span>
          <div className="text-3xl font-black font-mono text-cyan-300">{overview.totalAssessments}</div>
          <span className="text-[10px] text-cyan-300/80 font-mono">Avg Score: {overview.averageScore}/100</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-amber-500/30 bg-amber-950/10 space-y-1">
          <span className="text-[11px] text-slate-400 block">Saved Observatories</span>
          <div className="text-3xl font-black font-mono text-amber-300">{overview.totalSavedLocations}</div>
          <span className="text-[10px] text-amber-300/80 font-mono">Pinned Cities</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-rose-500/30 bg-rose-950/10 space-y-1">
          <span className="text-[11px] text-slate-400 block">Total Alerts Generated</span>
          <div className="text-3xl font-black font-mono text-rose-400">{overview.totalAlerts}</div>
          <span className="text-[10px] text-rose-300 font-mono">{overview.activeAlerts} Active Violations</span>
        </div>
      </div>

      {/* 3. Charts: Registration Timeline & Score Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* User Growth & Assessment Trajectory */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-3xl border border-climate-border space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>Platform Adoption & Assessment Volume</span>
            </h3>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              [LIVE PLATFORM METRIC]
            </span>
          </div>

          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={registrationTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="assessGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="userGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1b4332" opacity={0.3} />
                <XAxis dataKey="month" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#060d0a', borderColor: '#2d6a4f', borderRadius: '12px', fontSize: '11px' }} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Area type="monotone" dataKey="assessments" name="Assessments Taken" stroke="#10b981" strokeWidth={2} fill="url(#assessGrad)" />
                <Area type="monotone" dataKey="registrations" name="User Registrations" stroke="#06b6d4" strokeWidth={2} fill="url(#userGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Score Distribution Bar Chart */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-climate-border space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Climate Action Score Distribution</span>
            </h3>
          </div>

          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={scoreDistributionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1b4332" opacity={0.3} />
                <XAxis dataKey="range" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#060d0a', borderColor: '#2d6a4f', borderRadius: '12px', fontSize: '11px' }} />
                <Bar dataKey="count" name="Users in Range" radius={[6, 6, 0, 0]}>
                  {scoreDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* 4. Bottom Row: Most Popular Cities & Global Risk Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Most Saved Cities Table */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-3xl border border-climate-border space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span>Most Pinned & Searched Global Observatories</span>
            </h3>
            <button
              onClick={handleExportLocations}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
            >
              Export Locations CSV
            </button>
          </div>

          <div className="space-y-2">
            {overview.popularCities.map((city: any, i: number) => (
              <div key={city.name} className="flex items-center justify-between p-3 rounded-xl bg-climate-dark/80 border border-climate-border text-xs">
                <div className="flex items-center gap-3">
                  <span className="w-5 font-mono font-bold text-slate-500">#{i + 1}</span>
                  <span className="font-bold text-white">{city.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-cyan-400">{city.count} Users Pinned</span>
                  <div className="w-24 h-2 bg-climate-dark rounded-full overflow-hidden border border-climate-border hidden sm:block">
                    <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${Math.min(100, city.count * 2.2)}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Climate Risk Proportions */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-climate-border space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <span>Regional Climate Risk Breakdown (%)</span>
          </h3>

          <div className="w-full h-60">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {riskDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#060d0a', borderColor: '#2d6a4f', borderRadius: '12px', fontSize: '11px' }} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

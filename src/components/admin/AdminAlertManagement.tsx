import React, { useState, useEffect } from 'react';
import { dbAlerts } from '../../services/db';
import { ClimateAlertRecord, AlertSeverity } from '../../types/user';
import { reportExportService } from '../../services/reportExportService';
import { 
  ShieldAlert, 
  Trash2, 
  CheckCircle2, 
  Search, 
  Filter, 
  Download, 
  AlertTriangle, 
  Wind, 
  Thermometer, 
  CloudRain, 
  Loader2,
  RefreshCw
} from 'lucide-react';

export const AdminAlertManagement: React.FC = () => {
  const [alerts, setAlerts] = useState<ClimateAlertRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [severityFilter, setSeverityFilter] = useState<'all' | AlertSeverity>('all');
  const [searchLocation, setSearchLocation] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'resolved'>('all');

  const loadAlerts = async () => {
    setLoading(true);
    const data = await dbAlerts.getAll();
    setAlerts(data);
    setLoading(false);
  };

  useEffect(() => {
    loadAlerts();
  }, []);

  const handleToggleResolve = async (id: string, currentStatus: boolean) => {
    await dbAlerts.markResolved(id, !currentStatus);
    await loadAlerts();
  };

  const handleDelete = async (id: string) => {
    await dbAlerts.delete(id);
    await loadAlerts();
  };

  const handleExportCSV = () => {
    reportExportService.exportAlertsToCSV(alerts);
  };

  const filtered = alerts.filter(a => {
    const matchSev = severityFilter === 'all' || a.severity === severityFilter;
    const matchLoc = !searchLocation || a.location.toLowerCase().includes(searchLocation.toLowerCase());
    const matchStatus = statusFilter === 'all' || (statusFilter === 'resolved' ? a.resolved : !a.resolved);
    return matchSev && matchLoc && matchStatus;
  });

  const criticalCount = alerts.filter(a => a.severity === 'critical' && !a.resolved).length;
  const highCount = alerts.filter(a => a.severity === 'high' && !a.resolved).length;
  const moderateCount = alerts.filter(a => a.severity === 'moderate' && !a.resolved).length;
  const resolvedCount = alerts.filter(a => a.resolved).length;

  return (
    <div className="space-y-6">
      {/* 1. Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/40 text-center space-y-1">
          <span className="text-[11px] text-slate-400 block uppercase">Critical Active</span>
          <div className="text-2xl sm:text-3xl font-black font-mono text-rose-400">{criticalCount}</div>
          <span className="text-[10px] text-rose-300">Requires Intervention</span>
        </div>

        <div className="p-4 rounded-2xl bg-orange-950/20 border border-orange-500/40 text-center space-y-1">
          <span className="text-[11px] text-slate-400 block uppercase">High Severity</span>
          <div className="text-2xl sm:text-3xl font-black font-mono text-orange-400">{highCount}</div>
          <span className="text-[10px] text-orange-300">Hazard Breaches</span>
        </div>

        <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/40 text-center space-y-1">
          <span className="text-[11px] text-slate-400 block uppercase">Moderate Advisories</span>
          <div className="text-2xl sm:text-3xl font-black font-mono text-amber-400">{moderateCount}</div>
          <span className="text-[10px] text-amber-300">Elevated Stress</span>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/40 text-center space-y-1">
          <span className="text-[11px] text-slate-400 block uppercase">Resolved Alerts</span>
          <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400">{resolvedCount}</div>
          <span className="text-[10px] text-emerald-300">Mitigated / Cleared</span>
        </div>
      </div>

      {/* 2. Controls & Search Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-climate-border flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 flex-1 min-w-[240px]">
          <div className="relative flex-1 min-w-[180px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter by city or country..."
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="w-full bg-climate-darker border border-climate-border rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <select
            value={severityFilter}
            onChange={(e: any) => setSeverityFilter(e.target.value)}
            className="bg-climate-darker border border-climate-border rounded-xl px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
          >
            <option value="all">All Severities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="moderate">Moderate</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e: any) => setStatusFilter(e.target.value)}
            className="bg-climate-darker border border-climate-border rounded-xl px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active Only</option>
            <option value="resolved">Resolved Only</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadAlerts}
            className="p-2 rounded-xl bg-climate-dark border border-climate-border text-slate-300 hover:text-white"
            title="Refresh"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Alerts CSV</span>
          </button>
        </div>
      </div>

      {/* 3. Alerts Table */}
      {loading ? (
        <div className="py-12 text-center space-y-2">
          <Loader2 className="w-6 h-6 text-emerald-400 animate-spin mx-auto" />
          <span className="text-xs text-slate-400 font-mono">Loading alert records...</span>
        </div>
      ) : filtered.length > 0 ? (
        <div className="space-y-2.5">
          {filtered.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                alert.resolved
                  ? 'bg-climate-dark/40 border-climate-border/60 opacity-60'
                  : alert.severity === 'critical'
                  ? 'bg-rose-950/20 border-rose-500/40'
                  : 'bg-climate-dark/80 border-climate-border'
              }`}
            >
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                    alert.severity === 'critical'
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                      : alert.severity === 'high'
                      ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40'
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                  }`}>
                    {alert.severity}
                  </span>
                  <span className="font-extrabold text-sm text-white">{alert.title}</span>
                  {alert.resolved && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase">
                      Resolved
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-300">{alert.description}</p>
                <div className="text-[11px] text-slate-400 font-mono flex items-center gap-3">
                  <span>📍 {alert.location}</span>
                  <span>• {new Date(alert.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleToggleResolve(alert.id, alert.resolved)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    alert.resolved
                      ? 'bg-climate-dark border border-climate-border text-slate-300 hover:text-white'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{alert.resolved ? 'Reopen' : 'Resolve'}</span>
                </button>

                <button
                  onClick={() => handleDelete(alert.id)}
                  className="p-2 rounded-xl bg-climate-dark border border-climate-border text-slate-400 hover:text-rose-400 transition-colors"
                  title="Delete Alert"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-panel p-12 text-center space-y-2 border border-climate-border rounded-3xl">
          <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto opacity-70" />
          <h4 className="text-sm font-bold text-white">No Matching Alerts</h4>
          <p className="text-xs text-slate-400">All alerts match the selected filter criteria.</p>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ClimateAlertRecord, AlertSeverity, AlertType } from '../../types/user';
import { 
  Bell, 
  X, 
  Trash2, 
  CheckCheck, 
  AlertTriangle, 
  Thermometer, 
  Wind, 
  CloudRain, 
  ShieldAlert,
  CheckCircle2,
  Filter
} from 'lucide-react';

interface AlertsListModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AlertsListModal: React.FC<AlertsListModalProps> = ({ isOpen, onClose }) => {
  const { alerts, markAlertAsRead, markAllAlertsAsRead, deleteAlert, resolveAlert } = useAuth();
  const [severityFilter, setSeverityFilter] = useState<'all' | AlertSeverity>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | AlertType>('all');

  if (!isOpen) return null;

  const filteredAlerts = alerts.filter(a => {
    const matchSev = severityFilter === 'all' || a.severity === severityFilter;
    const matchType = typeFilter === 'all' || a.type === typeFilter;
    return matchSev && matchType;
  });

  const getAlertIcon = (type: AlertType) => {
    switch (type) {
      case 'aqi': return <Wind className="w-5 h-5 text-amber-400" />;
      case 'heat': return <Thermometer className="w-5 h-5 text-rose-400" />;
      case 'rainfall': return <CloudRain className="w-5 h-5 text-cyan-400" />;
      case 'risk': return <ShieldAlert className="w-5 h-5 text-purple-400" />;
      default: return <Bell className="w-5 h-5 text-emerald-400" />;
    }
  };

  const getSeverityBadge = (sev: AlertSeverity) => {
    switch (sev) {
      case 'critical':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/40 uppercase">Critical Alert</span>;
      case 'high':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/40 uppercase">High Alert</span>;
      case 'moderate':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 uppercase">Advisory</span>;
      default:
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 uppercase">Info</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-climate-card border border-emerald-500/40 rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in duration-200 my-8 space-y-6">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Bell className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white">Environmental Alert Center</h3>
              <p className="text-xs text-slate-400">Real-time alerts triggered by threshold violations in AQI, heat, and storm volatility.</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-climate-dark border border-climate-border text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Controls & Mark All Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-climate-dark/80 p-3 rounded-2xl border border-climate-border">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 text-xs text-slate-400 font-semibold">
              <Filter className="w-3.5 h-3.5" />
              <span>Severity:</span>
            </div>
            <select
              value={severityFilter}
              onChange={(e: any) => setSeverityFilter(e.target.value)}
              className="bg-climate-darker border border-climate-border rounded-xl px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              <option value="all">All Severities</option>
              <option value="critical">Critical Only</option>
              <option value="high">High Only</option>
              <option value="moderate">Moderate Only</option>
            </select>

            <select
              value={typeFilter}
              onChange={(e: any) => setTypeFilter(e.target.value)}
              className="bg-climate-darker border border-climate-border rounded-xl px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              <option value="all">All Categories</option>
              <option value="aqi">Air Quality (AQI)</option>
              <option value="heat">Extreme Heat</option>
              <option value="rainfall">Precipitation</option>
              <option value="risk">Climate Risk</option>
            </select>
          </div>

          <button
            onClick={markAllAlertsAsRead}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-climate-dark border border-climate-border text-xs text-slate-300 hover:text-white hover:border-emerald-500/40 transition-colors"
          >
            <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Mark All as Read</span>
          </button>
        </div>

        {/* Alerts List */}
        <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
          {filteredAlerts.length > 0 ? (
            filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                onClick={() => !alert.read && markAlertAsRead(alert.id)}
                className={`p-4 rounded-2xl border transition-all space-y-2 relative group ${
                  alert.read
                    ? 'bg-climate-dark/60 border-climate-border/80'
                    : 'bg-emerald-950/25 border-emerald-500/40 shadow-md'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-climate-darker border border-climate-border shrink-0 mt-0.5">
                      {getAlertIcon(alert.type)}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-extrabold text-sm text-white">{alert.title}</span>
                        {getSeverityBadge(alert.severity)}
                        {!alert.read && (
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        )}
                      </div>
                      <span className="text-[11px] text-emerald-400 font-mono block">
                        📍 {alert.location} • {new Date(alert.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteAlert(alert.id);
                      }}
                      className="p-1.5 rounded-lg bg-climate-dark border border-climate-border text-slate-400 hover:text-rose-400 hover:border-rose-500/40 transition-colors"
                      title="Delete Alert"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed pl-11">
                  {alert.description}
                </p>

                <div className="pl-11 pt-1 text-[11px] text-emerald-300 font-medium flex items-center gap-1">
                  <strong>Guidance:</strong> {alert.recommendedAction}
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto opacity-70" />
              <h4 className="text-sm font-bold text-white">No Active Alerts</h4>
              <p className="text-xs text-slate-400">All environmental parameters are within standard thresholds.</p>
            </div>
          )}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors"
        >
          Close Alert Center
        </button>

      </div>
    </div>
  );
};

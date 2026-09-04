import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { AlertsListModal } from './AlertsListModal';
import { Bell, AlertTriangle, Wind, Thermometer, CloudRain, ExternalLink, CheckCheck } from 'lucide-react';

export const NotificationBell: React.FC = () => {
  const { alerts, unreadAlertCount, markAlertAsRead, markAllAlertsAsRead } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="relative p-2 rounded-xl bg-climate-dark border border-climate-border hover:border-emerald-500/40 text-slate-300 hover:text-white transition-colors"
          title="Environmental Alerts"
        >
          <Bell className="w-4 h-4" />
          {unreadAlertCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-rose-500 px-1 text-[9px] font-black font-mono text-white ring-2 ring-[#060d0a] animate-pulse">
              {unreadAlertCount > 9 ? '9+' : unreadAlertCount}
            </span>
          )}
        </button>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-climate-darker/98 border border-climate-border rounded-2xl shadow-2xl overflow-hidden backdrop-blur-2xl z-50 divide-y divide-white/5 animate-in slide-in-from-top-2">
            
            {/* Header */}
            <div className="p-3.5 flex items-center justify-between bg-climate-dark/60">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-white">Climate Alerts</span>
                {unreadAlertCount > 0 && (
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 font-bold">
                    {unreadAlertCount} New
                  </span>
                )}
              </div>

              {unreadAlertCount > 0 && (
                <button
                  onClick={() => markAllAlertsAsRead()}
                  className="text-[10px] text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
                >
                  <CheckCheck className="w-3 h-3" />
                  <span>Mark Read</span>
                </button>
              )}
            </div>

            {/* List Preview */}
            <div className="max-h-64 overflow-y-auto divide-y divide-white/5">
              {alerts.length > 0 ? (
                alerts.slice(0, 4).map((alert) => (
                  <div
                    key={alert.id}
                    onClick={() => {
                      if (!alert.read) markAlertAsRead(alert.id);
                    }}
                    className={`p-3 text-xs cursor-pointer hover:bg-white/5 transition-colors space-y-1 ${
                      !alert.read ? 'bg-emerald-950/20' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white truncate max-w-[200px]">{alert.title}</span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {new Date(alert.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 line-clamp-1">{alert.description}</p>
                    <span className="text-[10px] text-emerald-400 font-mono block">📍 {alert.location}</span>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-xs text-slate-400">
                  No active environmental alerts.
                </div>
              )}
            </div>

            {/* Footer / View All */}
            <div className="p-2.5 bg-climate-dark/60 text-center">
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  setModalOpen(true);
                }}
                className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center justify-center gap-1.5 w-full py-1 rounded-lg hover:bg-emerald-500/10 transition-colors"
              >
                <span>Open Full Alert Center ({alerts.length})</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>

          </div>
        )}
      </div>

      {/* Full Alerts Modal */}
      <AlertsListModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

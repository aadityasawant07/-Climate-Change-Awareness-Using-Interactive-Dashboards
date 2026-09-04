import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { PageTab } from '../types/climate';
import { AdminAnalyticsView } from '../components/admin/AdminAnalyticsView';
import { AdminAlertManagement } from '../components/admin/AdminAlertManagement';
import { 
  ShieldCheck, 
  BarChart3, 
  Bell, 
  Download, 
  Lock, 
  Sparkles, 
  Users,
  FileSpreadsheet
} from 'lucide-react';

interface AdminPageProps {
  setActiveTab: (tab: PageTab) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ setActiveTab }) => {
  const { user, isAdmin, loginAdmin } = useAuth();
  const [innerTab, setInnerTab] = useState<'analytics' | 'alerts'>('analytics');

  if (!user || !isAdmin) {
    return (
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-purple-500/40 text-center max-w-lg mx-auto space-y-6 my-12 shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mx-auto">
          <Lock className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase">
            Restricted Admin Area
          </span>
          <h2 className="text-2xl font-black text-white tracking-tight">Administrator Access Required</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            This management console is restricted to verified EcoPulse environmental platform administrators.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={async () => {
              await loginAdmin();
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-950/40 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Sign In as Demo Admin (Dr. Lin)</span>
          </button>

          <button
            onClick={() => setActiveTab('home')}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-climate-dark border border-climate-border text-slate-300 font-bold text-xs hover:text-white transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 py-4">
      {/* Admin Navigation Header */}
      <div className="glass-panel p-4 rounded-2xl border border-purple-500/30 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-black text-white">Administrator Command Center</h1>
            <span className="text-[11px] text-purple-300 font-mono">Authenticated as: {user.name} ({user.email})</span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 bg-climate-dark/80 p-1 rounded-xl border border-climate-border">
          <button
            onClick={() => setInnerTab('analytics')}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              innerTab === 'analytics'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Platform Analytics</span>
          </button>

          <button
            onClick={() => setInnerTab('alerts')}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              innerTab === 'alerts'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            <span>Alert Management</span>
          </button>
        </div>
      </div>

      {/* Active Tab View */}
      {innerTab === 'analytics' && <AdminAnalyticsView />}
      {innerTab === 'alerts' && <AdminAlertManagement />}
    </div>
  );
};

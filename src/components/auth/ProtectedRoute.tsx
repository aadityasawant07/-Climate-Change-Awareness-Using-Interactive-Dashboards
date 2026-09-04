import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { PageTab } from '../../types/climate';
import { ShieldAlert, LogIn, Sparkles } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  setActiveTab: (tab: PageTab) => void;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, setActiveTab }) => {
  const { isAuthenticated, isLoadingAuth, loginDemo } = useAuth();

  if (isLoadingAuth) {
    return (
      <div className="glass-panel p-12 rounded-3xl border border-climate-border flex flex-col items-center justify-center space-y-3 my-8">
        <span className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
        <p className="text-xs text-slate-400 font-mono">Verifying secure environmental credentials...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-emerald-500/40 text-center max-w-lg mx-auto space-y-6 my-12 shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-black text-white tracking-tight">Authentication Required</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Please log in or create a free EcoPulse account to access your personal dashboard, assessment history, saved cities, and unlocked achievements.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => setActiveTab('login')}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-950/40 transition-all flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In</span>
          </button>

          <button
            onClick={async () => {
              await loginDemo();
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-climate-dark border border-emerald-500/40 hover:border-emerald-400 text-emerald-300 font-bold text-xs transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>Use Demo Account</span>
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

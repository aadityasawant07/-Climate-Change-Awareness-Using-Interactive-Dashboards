import React, { useState } from 'react';
import { LoginForm } from '../components/auth/LoginForm';
import { RegisterForm } from '../components/auth/RegisterForm';
import { PageTab } from '../types/climate';
import { Leaf } from 'lucide-react';

interface LoginPageProps {
  setActiveTab: (tab: PageTab) => void;
  initialView?: 'login' | 'register';
}

export const LoginPage: React.FC<LoginPageProps> = ({ setActiveTab, initialView = 'login' }) => {
  const [view, setView] = useState<'login' | 'register'>(initialView);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center py-10 px-4 space-y-6">
      {/* Branding Header */}
      <div className="text-center space-y-1 mb-2">
        <div className="flex items-center justify-center gap-2 text-emerald-400 mb-3">
          <Leaf className="w-6 h-6" />
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">EcoPulse</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          {view === 'login' ? 'Sign In to Your Account' : 'Create Your EcoPulse Account'}
        </h1>
        <p className="text-xs text-slate-400 max-w-md">
          {view === 'login'
            ? 'Access your personal climate dashboard, saved cities, and assessment history.'
            : 'Track your environmental impact, save progress, and earn eco-badges.'}
        </p>
      </div>

      {view === 'login' ? (
        <LoginForm
          onSuccess={() => setActiveTab('my-dashboard')}
          onSwitchToRegister={() => setView('register')}
        />
      ) : (
        <RegisterForm
          onSuccess={() => setActiveTab('my-dashboard')}
          onSwitchToLogin={() => setView('login')}
        />
      )}
    </div>
  );
};

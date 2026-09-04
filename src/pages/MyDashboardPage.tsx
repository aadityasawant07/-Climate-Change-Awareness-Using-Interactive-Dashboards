import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import { PersonalDashboard } from '../components/personal/PersonalDashboard';
import { ScoreHistoryView } from '../components/personal/ScoreHistoryView';
import { SavedCitiesView } from '../components/personal/SavedCitiesView';
import { AchievementsGrid } from '../components/personal/AchievementsGrid';
import { PageTab } from '../types/climate';
import { LayoutDashboard, Calendar, MapPin, Award } from 'lucide-react';

interface MyDashboardPageProps {
  setActiveTab: (tab: PageTab) => void;
}

export const MyDashboardPage: React.FC<MyDashboardPageProps> = ({ setActiveTab }) => {
  const [innerTab, setInnerTab] = useState<'overview' | 'history' | 'cities' | 'achievements'>('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'history', label: 'My History', icon: <Calendar className="w-4 h-4" /> },
    { id: 'cities', label: 'Saved Cities', icon: <MapPin className="w-4 h-4" /> },
    { id: 'achievements', label: 'Badges', icon: <Award className="w-4 h-4" /> },
  ] as const;

  return (
    <ProtectedRoute setActiveTab={setActiveTab}>
      <div className="space-y-6 py-4">
        {/* Inner Tab Navigation */}
        <div className="glass-panel p-1.5 rounded-2xl border border-climate-border inline-flex flex-wrap gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setInnerTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                innerTab === tab.id
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Inner Tab Content */}
        {innerTab === 'overview' && <PersonalDashboard setActiveTab={setActiveTab} />}
        {innerTab === 'history' && <ScoreHistoryView setActiveTab={setActiveTab} />}
        {innerTab === 'cities' && <SavedCitiesView setActiveTab={setActiveTab} />}
        {innerTab === 'achievements' && <AchievementsGrid />}
      </div>
    </ProtectedRoute>
  );
};

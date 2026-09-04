import React from 'react';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import { ScoreHistoryView } from '../components/personal/ScoreHistoryView';
import { PageTab } from '../types/climate';

interface HistoryPageProps {
  setActiveTab: (tab: PageTab) => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({ setActiveTab }) => (
  <ProtectedRoute setActiveTab={setActiveTab}>
    <div className="py-4">
      <ScoreHistoryView setActiveTab={setActiveTab} />
    </div>
  </ProtectedRoute>
);

import React from 'react';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import { SavedCitiesView } from '../components/personal/SavedCitiesView';
import { PageTab } from '../types/climate';

interface SavedCitiesPageProps {
  setActiveTab: (tab: PageTab) => void;
}

export const SavedCitiesPage: React.FC<SavedCitiesPageProps> = ({ setActiveTab }) => (
  <ProtectedRoute setActiveTab={setActiveTab}>
    <div className="py-4">
      <SavedCitiesView setActiveTab={setActiveTab} />
    </div>
  </ProtectedRoute>
);

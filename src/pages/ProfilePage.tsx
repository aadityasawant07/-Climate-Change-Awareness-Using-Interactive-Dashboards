import React from 'react';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import { ProfileView } from '../components/personal/ProfileView';
import { PageTab } from '../types/climate';

interface ProfilePageProps {
  setActiveTab: (tab: PageTab) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ setActiveTab }) => (
  <ProtectedRoute setActiveTab={setActiveTab}>
    <div className="py-4">
      <ProfileView setActiveTab={setActiveTab} />
    </div>
  </ProtectedRoute>
);

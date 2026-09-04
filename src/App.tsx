import React, { useState } from 'react';
import { PageTab } from './types/climate';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/layout/Navbar';
import { ClimateTicker } from './components/layout/ClimateTicker';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/layout/Toast';
import { CepDemoTourModal } from './components/demo/CepDemoTourModal';

// Core Public Pages
import { HomePage } from './pages/HomePage';
import { DashboardPage } from './pages/DashboardPage';
import { GlobePage } from './pages/GlobePage';
import { MapPage } from './pages/MapPage';
import { AwarenessPage } from './pages/AwarenessPage';
import { ActionsPage } from './pages/ActionsPage';
import { AboutPage } from './pages/AboutPage';

// Authenticated & Personal Pages
import { LoginPage } from './pages/LoginPage';
import { MyDashboardPage } from './pages/MyDashboardPage';
import { HistoryPage } from './pages/HistoryPage';
import { SavedCitiesPage } from './pages/SavedCitiesPage';
import { ProfilePage } from './pages/ProfilePage';
import { ReportPage } from './pages/ReportPage';
import { AdminPage } from './pages/AdminPage';

export function App() {
  const [activeTab, setActiveTab] = useState<PageTab>('home');
  const [cepTourOpen, setCepTourOpen] = useState<boolean>(false);

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-[#060d0a] text-slate-100 selection:bg-emerald-500 selection:text-black">
        {/* Live Atmospheric CO2 & 1.5°C Budget Climate Clock Ticker */}
        <ClimateTicker />

        {/* Main Glassmorphic Navigation Bar */}
        <Navbar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          onOpenCepTour={() => setCepTourOpen(true)}
        />

        {/* Page Content Body */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          {activeTab === 'home' && (
            <HomePage 
              setActiveTab={setActiveTab} 
              onOpenCepTour={() => setCepTourOpen(true)}
            />
          )}
          {activeTab === 'dashboard' && <DashboardPage />}
          {activeTab === 'globe' && <GlobePage />}
          {activeTab === 'map' && <MapPage />}
          {activeTab === 'awareness' && <AwarenessPage />}
          {activeTab === 'actions' && <ActionsPage />}
          {activeTab === 'about' && <AboutPage />}

          {/* Auth & Personal Tabs */}
          {activeTab === 'login' && <LoginPage setActiveTab={setActiveTab} initialView="login" />}
          {activeTab === 'register' && <LoginPage setActiveTab={setActiveTab} initialView="register" />}
          {activeTab === 'my-dashboard' && <MyDashboardPage setActiveTab={setActiveTab} />}
          {activeTab === 'my-history' && <HistoryPage setActiveTab={setActiveTab} />}
          {activeTab === 'saved-cities' && <SavedCitiesPage setActiveTab={setActiveTab} />}
          {activeTab === 'profile' && <ProfilePage setActiveTab={setActiveTab} />}

          {/* New Major Pages */}
          {activeTab === 'report' && <ReportPage setActiveTab={setActiveTab} />}
          {activeTab === 'admin' && <AdminPage setActiveTab={setActiveTab} />}
        </main>

        {/* Global Floating Toast Notifications */}
        <ToastContainer />

        {/* Guided College Presentation Demo Tour Modal */}
        <CepDemoTourModal
          isOpen={cepTourOpen}
          onClose={() => setCepTourOpen(false)}
          setActiveTab={setActiveTab}
        />

        {/* Footer with CEP College Documentation and Verified Sources */}
        <Footer setActiveTab={setActiveTab} />
      </div>
    </AuthProvider>
  );
}

export default App;

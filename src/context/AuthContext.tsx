import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  UserProfile, 
  AssessmentHistoryRecord, 
  SavedCityRecord, 
  UserAchievementRecord,
  ClimateAlertRecord,
  BadgeKey
} from '../types/user';
import { CompleteCityEnvironmentData } from '../types/climate';
import { authService } from '../services/authService';
import { dbHistory, dbSavedLocations, dbAchievements, dbAlerts } from '../services/db';
import { aiInsightsService } from '../services/aiInsightsService';

interface ToastInfo {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface AuthContextType {
  user: Omit<UserProfile, 'passwordHash'> | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoadingAuth: boolean;
  historyRecords: AssessmentHistoryRecord[];
  savedCities: SavedCityRecord[];
  unlockedAchievements: UserAchievementRecord[];
  alerts: ClimateAlertRecord[];
  unreadAlertCount: number;
  toasts: ToastInfo[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
  login: (email: string, pass: string, remember?: boolean) => Promise<void>;
  register: (name: string, email: string, pass: string) => Promise<void>;
  loginDemo: () => Promise<void>;
  loginAdmin: () => Promise<void>;
  logout: () => void;
  updateProfileName: (name: string) => Promise<void>;
  changeUserPassword: (oldPass: string, newPass: string) => Promise<void>;
  saveAssessmentResult: (
    score: number,
    grade: string,
    co2SavedKg: number,
    treesEquivalent: number,
    answers: string[],
    recommendations: string[]
  ) => Promise<AssessmentHistoryRecord | null>;
  deleteHistoryRecord: (recordId: string) => Promise<boolean>;
  saveCityLocation: (cityName: string, country: string, lat: number, lon: number, admin1?: string) => Promise<boolean>;
  removeCityLocation: (cityName: string, country: string) => Promise<boolean>;
  isCitySaved: (cityName: string, country: string) => boolean;
  markAlertAsRead: (alertId: string) => Promise<void>;
  markAllAlertsAsRead: () => Promise<void>;
  deleteAlert: (alertId: string) => Promise<void>;
  resolveAlert: (alertId: string) => Promise<void>;
  evaluateCityAlerts: (cityData: CompleteCityEnvironmentData) => Promise<void>;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Omit<UserProfile, 'passwordHash'> | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(true);
  const [historyRecords, setHistoryRecords] = useState<AssessmentHistoryRecord[]>([]);
  const [savedCities, setSavedCities] = useState<SavedCityRecord[]>([]);
  const [unlockedAchievements, setUnlockedAchievements] = useState<UserAchievementRecord[]>([]);
  const [alerts, setAlerts] = useState<ClimateAlertRecord[]>([]);
  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Fetch all user-specific data from DB
  const refreshUserData = useCallback(async () => {
    if (!user) {
      setHistoryRecords([]);
      setSavedCities([]);
      setUnlockedAchievements([]);
      // Unauthenticated visitors still get global alerts
      const globalAlerts = await dbAlerts.getAll();
      setAlerts(globalAlerts);
      return;
    }

    try {
      const [hist, cities, ach, userAlerts] = await Promise.all([
        dbHistory.getByUserId(user.id),
        dbSavedLocations.getByUserId(user.id),
        dbAchievements.getByUserId(user.id),
        dbAlerts.getByUserId(user.id),
      ]);
      setHistoryRecords(hist);
      setSavedCities(cities);
      setUnlockedAchievements(ach);
      setAlerts(userAlerts);
    } catch (err) {
      console.error('Failed to load user data:', err);
    }
  }, [user]);

  // Initial session restoration on app load
  useEffect(() => {
    const restoreSession = async () => {
      setIsLoadingAuth(true);
      try {
        const session = await authService.getCurrentSession();
        if (session) {
          setUser(session.user);
        }
      } catch (err) {
        console.error('Session restore failed:', err);
      } finally {
        setIsLoadingAuth(false);
      }
    };
    restoreSession();
  }, []);

  // Refresh user data when user changes
  useEffect(() => {
    refreshUserData();
  }, [user, refreshUserData]);

  // Login handler
  const login = async (email: string, pass: string, remember = true) => {
    const session = await authService.login(email, pass, remember);
    setUser(session.user);
    showToast(`Welcome back, ${session.user.name}!`, 'success');
  };

  // Register handler
  const register = async (name: string, email: string, pass: string) => {
    const newUser = await authService.register(name, email, pass, 'user');
    const session = await authService.login(email, pass, true);
    setUser(session.user);
    showToast(`Account created successfully! Welcome to EcoPulse, ${newUser.name}!`, 'success');
  };

  // 1-Click Demo Login
  const loginDemo = async () => {
    const session = await authService.seedDemoAccount();
    setUser(session.user);
    showToast('Logged in with Demo Account (Alex Johnson)', 'info');
  };

  // 1-Click Admin Demo Login
  const loginAdmin = async () => {
    const session = await authService.seedAdminAccount();
    setUser(session.user);
    showToast('Logged in as Administrator (Dr. Sarah Lin)', 'info');
  };

  // Logout handler
  const logout = () => {
    authService.logout();
    setUser(null);
    setHistoryRecords([]);
    setSavedCities([]);
    setUnlockedAchievements([]);
    showToast('You have successfully logged out.', 'info');
  };

  // Profile updates
  const updateProfileName = async (name: string) => {
    if (!user) throw new Error('Not logged in');
    const updated = await authService.updateProfile(user.id, name);
    setUser({ ...user, name: updated.name });
    showToast('Your display name has been updated.', 'success');
  };

  const changeUserPassword = async (oldPass: string, newPass: string) => {
    if (!user) throw new Error('Not logged in');
    await authService.changePassword(user.id, oldPass, newPass);
    showToast('Password changed successfully!', 'success');
  };

  // Save Climate Assessment & Check Achievements
  const saveAssessmentResult = async (
    score: number,
    grade: string,
    co2SavedKg: number,
    treesEquivalent: number,
    answers: string[],
    recommendations: string[]
  ): Promise<AssessmentHistoryRecord | null> => {
    if (!user) return null;

    const newRecord: AssessmentHistoryRecord = {
      id: `hist_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      userId: user.id,
      score,
      grade,
      co2SavedKg,
      treesEquivalent,
      answers,
      recommendations,
      createdAt: new Date().toISOString()
    };

    const saved = await dbHistory.create(newRecord);
    await refreshUserData();
    showToast(`Climate Action Result saved! Score: ${score}/100`, 'success');

    // Check and trigger achievements
    const checkBadge = async (badgeKey: BadgeKey, reason: string) => {
      const unlocked = await dbAchievements.unlock(user.id, badgeKey);
      if (unlocked) {
        showToast(`🏆 Badge Unlocked: ${reason}!`, 'success');
      }
    };

    await checkBadge('first_step', 'First Step (Completed Assessment)');
    if (score >= 80) await checkBadge('climate_hero', 'Climate Hero (Score 80+)');
    if (answers.some((a) => a.includes('recy'))) await checkBadge('eco_recycler', 'Eco Recycler');
    if (answers.some((a) => a.includes('trans'))) await checkBadge('green_traveler', 'Green Traveler');
    if (answers.some((a) => a.includes('nature') || a.includes('tree'))) await checkBadge('tree_champion', 'Tree Champion');
    if (answers.some((a) => a.includes('solar') || a.includes('renew'))) await checkBadge('clean_energy', 'Clean Energy Pioneer');

    await refreshUserData();
    return saved;
  };

  // Delete Assessment Record
  const deleteHistoryRecord = async (recordId: string): Promise<boolean> => {
    if (!user) return false;
    const deleted = await dbHistory.delete(recordId, user.id);
    if (deleted) {
      await refreshUserData();
      showToast('Assessment history record deleted.', 'info');
    }
    return deleted;
  };

  // Save City Location
  const saveCityLocation = async (
    cityName: string,
    country: string,
    lat: number,
    lon: number,
    admin1?: string
  ): Promise<boolean> => {
    if (!user) {
      showToast('Please log in to save favorite cities.', 'info');
      return false;
    }

    const newCity: SavedCityRecord = {
      id: `loc_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      userId: user.id,
      cityName,
      country,
      latitude: lat,
      longitude: lon,
      admin1,
      createdAt: new Date().toISOString()
    };

    await dbSavedLocations.create(newCity);
    await refreshUserData();
    showToast(`⭐ ${cityName}, ${country} saved to your favorites!`, 'success');

    // Check Global Observer badge if 3+ cities saved
    const updatedCities = await dbSavedLocations.getByUserId(user.id);
    if (updatedCities.length >= 3) {
      const unlocked = await dbAchievements.unlock(user.id, 'global_observer');
      if (unlocked) {
        showToast('🏆 Badge Unlocked: Global Observer (Saved 3+ Cities)!', 'success');
        await refreshUserData();
      }
    }

    return true;
  };

  // Remove City Location
  const removeCityLocation = async (cityName: string, country: string): Promise<boolean> => {
    if (!user) return false;
    const removed = await dbSavedLocations.remove(user.id, cityName, country);
    if (removed) {
      await refreshUserData();
      showToast(`Removed ${cityName} from favorites.`, 'info');
    }
    return removed;
  };

  // Check if City is saved
  const isCitySaved = (cityName: string, country: string): boolean => {
    if (!user) return false;
    return savedCities.some(
      (c) =>
        c.cityName.toLowerCase() === cityName.toLowerCase() &&
        c.country.toLowerCase() === country.toLowerCase()
    );
  };

  // Alerts Management
  const markAlertAsRead = async (alertId: string) => {
    await dbAlerts.markAsRead(alertId);
    await refreshUserData();
  };

  const markAllAlertsAsRead = async () => {
    if (user) {
      await dbAlerts.markAllAsRead(user.id);
    }
    await refreshUserData();
    showToast('All alerts marked as read.', 'info');
  };

  const deleteAlert = async (alertId: string) => {
    await dbAlerts.delete(alertId);
    await refreshUserData();
    showToast('Alert deleted.', 'info');
  };

  const resolveAlert = async (alertId: string) => {
    await dbAlerts.markResolved(alertId, true);
    await refreshUserData();
    showToast('Alert marked as resolved.', 'success');
  };

  // Automated Alert Evaluation on Live Telemetry
  const evaluateCityAlerts = async (cityData: CompleteCityEnvironmentData) => {
    const newAlerts = aiInsightsService.evaluateAlertTriggers(cityData, user?.id);
    for (const alert of newAlerts) {
      await dbAlerts.create(alert);
    }
    if (newAlerts.length > 0) {
      await refreshUserData();
    }
  };

  const unreadAlertCount = alerts.filter((a) => !a.read).length;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        isLoadingAuth,
        historyRecords,
        savedCities,
        unlockedAchievements,
        alerts,
        unreadAlertCount,
        toasts,
        showToast,
        removeToast,
        login,
        register,
        loginDemo,
        loginAdmin,
        logout,
        updateProfileName,
        changeUserPassword,
        saveAssessmentResult,
        deleteHistoryRecord,
        saveCityLocation,
        removeCityLocation,
        isCitySaved,
        markAlertAsRead,
        markAllAlertsAsRead,
        deleteAlert,
        resolveAlert,
        evaluateCityAlerts,
        refreshUserData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};

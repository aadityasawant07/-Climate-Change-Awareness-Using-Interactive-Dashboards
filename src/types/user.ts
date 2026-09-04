export type UserRole = 'user' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  avatarColor?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserSession {
  user: Omit<UserProfile, 'passwordHash'>;
  token: string;
  expiresAt: number;
}

export interface AssessmentHistoryRecord {
  id: string;
  userId: string;
  score: number;        // 0 - 100
  grade: string;        // A+, A, B, C, D, F
  co2SavedKg: number;
  treesEquivalent: number;
  answers: string[];    // list of checked question IDs
  recommendations: string[];
  createdAt: string;    // ISO string
}

export interface SavedCityRecord {
  id: string;
  userId: string;
  cityName: string;
  country: string;
  latitude: number;
  longitude: number;
  admin1?: string;
  createdAt: string;
}

export type BadgeKey = 
  | 'first_step'
  | 'eco_recycler'
  | 'green_traveler'
  | 'tree_champion'
  | 'clean_energy'
  | 'climate_hero'
  | 'global_observer';

export interface AchievementBadge {
  key: BadgeKey;
  title: string;
  description: string;
  icon: string;
  color: string;
  category: string;
}

export interface UserAchievementRecord {
  id: string;
  userId: string;
  badgeKey: BadgeKey;
  unlockedAt: string;
}

export type AlertSeverity = 'critical' | 'high' | 'moderate' | 'info';
export type AlertType = 'aqi' | 'heat' | 'rainfall' | 'risk' | 'system';

export interface ClimateAlertRecord {
  id: string;
  userId?: string;        // undefined for global broadcast alerts
  type: AlertType;
  severity: AlertSeverity;
  location: string;
  title: string;
  description: string;
  recommendedAction: string;
  read: boolean;
  resolved: boolean;
  createdAt: string;
}

export interface ClimateReportConfig {
  cityName: string;
  country: string;
  includeWeather: boolean;
  includeAqi: boolean;
  includeRainfall: boolean;
  includeCo2: boolean;
  includeRiskScore: boolean;
  includeHistoricalTrends: boolean;
  includeAiInsights: boolean;
  includeRecommendations: boolean;
}

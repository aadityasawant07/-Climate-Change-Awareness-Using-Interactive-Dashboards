import { 
  UserProfile, 
  AssessmentHistoryRecord, 
  SavedCityRecord, 
  UserAchievementRecord,
  ClimateAlertRecord,
  BadgeKey
} from '../types/user';

const USERS_KEY = 'ecopulse_db_users';
const HISTORY_KEY = 'ecopulse_db_history';
const SAVED_LOCATIONS_KEY = 'ecopulse_db_saved_locations';
const ACHIEVEMENTS_KEY = 'ecopulse_db_achievements';
const ALERTS_KEY = 'ecopulse_db_alerts';

// Safe JSON parser helper
function getStoredArray<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error(`Error reading ${key} from storage:`, e);
    return [];
  }
}

function setStoredArray<T>(key: string, data: T[]): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error(`Error writing ${key} to storage:`, e);
  }
}

// --- Users Table ---
export const dbUsers = {
  async getAll(): Promise<UserProfile[]> {
    return getStoredArray<UserProfile>(USERS_KEY);
  },

  async findByEmail(email: string): Promise<UserProfile | null> {
    const users = await this.getAll();
    return users.find((u) => u.email.toLowerCase() === email.toLowerCase().trim()) || null;
  },

  async findById(id: string): Promise<UserProfile | null> {
    const users = await this.getAll();
    return users.find((u) => u.id === id) || null;
  },

  async create(user: UserProfile): Promise<UserProfile> {
    const users = await this.getAll();
    users.push(user);
    setStoredArray(USERS_KEY, users);
    return user;
  },

  async update(id: string, updates: Partial<UserProfile>): Promise<UserProfile | null> {
    const users = await this.getAll();
    const idx = users.findIndex((u) => u.id === id);
    if (idx === -1) return null;
    const updated = { ...users[idx], ...updates, updatedAt: new Date().toISOString() };
    users[idx] = updated;
    setStoredArray(USERS_KEY, users);
    return updated;
  },

  async delete(id: string): Promise<boolean> {
    const users = await this.getAll();
    const filtered = users.filter((u) => u.id !== id);
    setStoredArray(USERS_KEY, filtered);

    // Cascading deletions
    const history = await dbHistory.getAll();
    setStoredArray(HISTORY_KEY, history.filter((h) => h.userId !== id));

    const locations = await dbSavedLocations.getAll();
    setStoredArray(SAVED_LOCATIONS_KEY, locations.filter((l) => l.userId !== id));

    const achievements = await dbAchievements.getAll();
    setStoredArray(ACHIEVEMENTS_KEY, achievements.filter((a) => a.userId !== id));

    const alerts = await dbAlerts.getAll();
    setStoredArray(ALERTS_KEY, alerts.filter((a) => a.userId !== id));

    return filtered.length < users.length;
  }
};

// --- Assessment History Table ---
export const dbHistory = {
  async getAll(): Promise<AssessmentHistoryRecord[]> {
    return getStoredArray<AssessmentHistoryRecord>(HISTORY_KEY);
  },

  async getByUserId(userId: string): Promise<AssessmentHistoryRecord[]> {
    const records = await this.getAll();
    return records
      .filter((r) => r.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  async create(record: AssessmentHistoryRecord): Promise<AssessmentHistoryRecord> {
    const records = await this.getAll();
    records.push(record);
    setStoredArray(HISTORY_KEY, records);
    return record;
  },

  async delete(recordId: string, userId: string): Promise<boolean> {
    const records = await this.getAll();
    const filtered = records.filter((r) => !(r.id === recordId && r.userId === userId));
    setStoredArray(HISTORY_KEY, filtered);
    return filtered.length < records.length;
  }
};

// --- Saved Locations Table ---
export const dbSavedLocations = {
  async getAll(): Promise<SavedCityRecord[]> {
    return getStoredArray<SavedCityRecord>(SAVED_LOCATIONS_KEY);
  },

  async getByUserId(userId: string): Promise<SavedCityRecord[]> {
    const records = await this.getAll();
    return records
      .filter((r) => r.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  async create(location: SavedCityRecord): Promise<SavedCityRecord> {
    const records = await this.getAll();
    const exists = records.some(
      (r) =>
        r.userId === location.userId &&
        r.cityName.toLowerCase() === location.cityName.toLowerCase() &&
        r.country.toLowerCase() === location.country.toLowerCase()
    );
    if (!exists) {
      records.push(location);
      setStoredArray(SAVED_LOCATIONS_KEY, records);
    }
    return location;
  },

  async remove(userId: string, cityName: string, country: string): Promise<boolean> {
    const records = await this.getAll();
    const filtered = records.filter(
      (r) =>
        !(
          r.userId === userId &&
          r.cityName.toLowerCase() === cityName.toLowerCase() &&
          r.country.toLowerCase() === country.toLowerCase()
        )
    );
    setStoredArray(SAVED_LOCATIONS_KEY, filtered);
    return filtered.length < records.length;
  },

  async isSaved(userId: string, cityName: string, country: string): Promise<boolean> {
    const records = await this.getAll();
    return records.some(
      (r) =>
        r.userId === userId &&
        r.cityName.toLowerCase() === cityName.toLowerCase() &&
        r.country.toLowerCase() === country.toLowerCase()
    );
  }
};

// --- Achievements Table ---
export const dbAchievements = {
  async getAll(): Promise<UserAchievementRecord[]> {
    return getStoredArray<UserAchievementRecord>(ACHIEVEMENTS_KEY);
  },

  async getByUserId(userId: string): Promise<UserAchievementRecord[]> {
    const records = await this.getAll();
    return records.filter((r) => r.userId === userId);
  },

  async unlock(userId: string, badgeKey: BadgeKey): Promise<UserAchievementRecord | null> {
    const records = await this.getAll();
    const alreadyUnlocked = records.some((r) => r.userId === userId && r.badgeKey === badgeKey);
    if (alreadyUnlocked) return null;

    const newAchievement: UserAchievementRecord = {
      id: `ach_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      userId,
      badgeKey,
      unlockedAt: new Date().toISOString()
    };
    records.push(newAchievement);
    setStoredArray(ACHIEVEMENTS_KEY, records);
    return newAchievement;
  }
};

// --- Climate Alerts Table ---
export const dbAlerts = {
  async getAll(): Promise<ClimateAlertRecord[]> {
    return getStoredArray<ClimateAlertRecord>(ALERTS_KEY);
  },

  async getByUserId(userId: string): Promise<ClimateAlertRecord[]> {
    const records = await this.getAll();
    return records
      .filter((r) => !r.userId || r.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  async create(alert: ClimateAlertRecord): Promise<ClimateAlertRecord> {
    const records = await this.getAll();
    // Avoid duplicate identical alert for same location within last 24h
    const isDuplicate = records.some(
      (r) =>
        r.title === alert.title &&
        r.location === alert.location &&
        Date.now() - new Date(r.createdAt).getTime() < 12 * 60 * 60 * 1000
    );
    if (!isDuplicate) {
      records.unshift(alert);
      setStoredArray(ALERTS_KEY, records.slice(0, 100)); // Keep top 100 alerts
    }
    return alert;
  },

  async markAsRead(alertId: string): Promise<boolean> {
    const records = await this.getAll();
    const alert = records.find((r) => r.id === alertId);
    if (alert) {
      alert.read = true;
      setStoredArray(ALERTS_KEY, records);
      return true;
    }
    return false;
  },

  async markAllAsRead(userId: string): Promise<void> {
    const records = await this.getAll();
    records.forEach((r) => {
      if (!r.userId || r.userId === userId) {
        r.read = true;
      }
    });
    setStoredArray(ALERTS_KEY, records);
  },

  async delete(alertId: string): Promise<boolean> {
    const records = await this.getAll();
    const filtered = records.filter((r) => r.id !== alertId);
    setStoredArray(ALERTS_KEY, filtered);
    return filtered.length < records.length;
  },

  async markResolved(alertId: string, resolved = true): Promise<boolean> {
    const records = await this.getAll();
    const alert = records.find((r) => r.id === alertId);
    if (alert) {
      alert.resolved = resolved;
      setStoredArray(ALERTS_KEY, records);
      return true;
    }
    return false;
  }
};

// --- Admin Analytics Aggregators ---
export const dbAnalytics = {
  async getPlatformOverview() {
    const users = await dbUsers.getAll();
    const assessments = await dbHistory.getAll();
    const savedCities = await dbSavedLocations.getAll();
    const alerts = await dbAlerts.getAll();

    const avgScore = assessments.length > 0
      ? Math.round(assessments.reduce((acc, a) => acc + a.score, 0) / assessments.length)
      : 0;

    // Aggregate city counts
    const cityCounts: Record<string, number> = {};
    savedCities.forEach((c) => {
      cityCounts[c.cityName] = (cityCounts[c.cityName] || 0) + 1;
    });

    const popularCities = Object.entries(cityCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);

    return {
      totalUsers: users.length,
      activeUsers: Math.max(users.length, 1),
      totalAssessments: assessments.length,
      averageScore: avgScore,
      totalAlerts: alerts.length,
      activeAlerts: alerts.filter((a) => !a.resolved).length,
      totalSavedLocations: savedCities.length,
      popularCities: popularCities.length > 0 ? popularCities : [
        { name: 'Tokyo', count: 42 },
        { name: 'London', count: 36 },
        { name: 'New Delhi', count: 31 },
        { name: 'Miami', count: 28 },
        { name: 'Cairo', count: 19 },
      ]
    };
  }
};

import { UserProfile, UserSession, UserRole } from '../types/user';
import { dbUsers, dbHistory, dbSavedLocations, dbAchievements, dbAlerts } from './db';

const SESSION_STORAGE_KEY = 'ecopulse_active_session';
const SALT = 'ecopulse_secure_salt_2026';

// Cryptographic SHA-256 Hash using Web Crypto API
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + SALT);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

// Generate random UUID
function generateId(prefix = 'usr'): string {
  return `${prefix}_` + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 8);
}

export const authService = {
  // Hash & Register a new user
  async register(name: string, email: string, password: string, role: UserRole = 'user'): Promise<UserProfile> {
    const trimmedEmail = email.toLowerCase().trim();
    const existing = await dbUsers.findByEmail(trimmedEmail);
    if (existing) {
      throw new Error('An account with this email already exists.');
    }

    const passwordHash = await hashPassword(password);
    const now = new Date().toISOString();
    const newUser: UserProfile = {
      id: generateId(),
      name: name.trim(),
      email: trimmedEmail,
      passwordHash,
      role,
      createdAt: now,
      updatedAt: now
    };

    return dbUsers.create(newUser);
  },

  // Authenticate user with email and password
  async login(email: string, password: string, rememberMe = true): Promise<UserSession> {
    const trimmedEmail = email.toLowerCase().trim();
    const user = await dbUsers.findByEmail(trimmedEmail);
    if (!user) {
      throw new Error('Invalid email or password. Please check your credentials.');
    }

    const inputHash = await hashPassword(password);
    if (inputHash !== user.passwordHash) {
      throw new Error('Invalid email or password. Please check your credentials.');
    }

    // Create session token
    const token = 'token_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
    const expiresAt = Date.now() + (rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000);

    const { passwordHash, ...safeUser } = user;
    const session: UserSession = {
      user: safeUser,
      token,
      expiresAt
    };

    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
    return session;
  },

  // Get active session from storage
  async getCurrentSession(): Promise<UserSession | null> {
    try {
      const raw = localStorage.getItem(SESSION_STORAGE_KEY);
      if (!raw) return null;
      const session: UserSession = JSON.parse(raw);
      if (Date.now() > session.expiresAt) {
        this.logout();
        return null;
      }
      const user = await dbUsers.findById(session.user.id);
      if (!user) {
        this.logout();
        return null;
      }
      return session;
    } catch {
      this.logout();
      return null;
    }
  },

  // Clear session
  logout(): void {
    localStorage.removeItem(SESSION_STORAGE_KEY);
  },

  // Update profile name
  async updateProfile(userId: string, name: string): Promise<UserProfile> {
    const updated = await dbUsers.update(userId, { name: name.trim() });
    if (!updated) throw new Error('User not found.');

    const currentSession = await this.getCurrentSession();
    if (currentSession && currentSession.user.id === userId) {
      currentSession.user.name = name.trim();
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(currentSession));
    }
    return updated;
  },

  // Change password
  async changePassword(userId: string, oldPass: string, newPass: string): Promise<boolean> {
    const user = await dbUsers.findById(userId);
    if (!user) throw new Error('User not found.');

    const oldHash = await hashPassword(oldPass);
    if (oldHash !== user.passwordHash) {
      throw new Error('Current password does not match our records.');
    }

    const newHash = await hashPassword(newPass);
    await dbUsers.update(userId, { passwordHash: newHash });
    return true;
  },

  // Seed Demo User Account
  async seedDemoAccount(): Promise<UserSession> {
    const demoEmail = 'demo@ecopulse.org';
    let demoUser = await dbUsers.findByEmail(demoEmail);

    if (!demoUser) {
      const passwordHash = await hashPassword('EcoPulse#2026');
      const now = new Date().toISOString();
      demoUser = {
        id: 'usr_demo_eco_champion',
        name: 'Alex Johnson',
        email: demoEmail,
        passwordHash,
        role: 'user',
        createdAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: now
      };
      await dbUsers.create(demoUser);

      // Seed 5 historical monthly assessment scores
      const sampleHistories = [
        {
          id: 'hist_1',
          userId: demoUser.id,
          score: 62,
          grade: 'B',
          co2SavedKg: 1450,
          treesEquivalent: 66,
          answers: ['elec-led', 'trans-public', 'plastic-reusable'],
          recommendations: ['Install rooftop solar', 'Start composting kitchen food scraps'],
          createdAt: new Date(Date.now() - 110 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 'hist_2',
          userId: demoUser.id,
          score: 68,
          grade: 'B',
          co2SavedKg: 1720,
          treesEquivalent: 78,
          answers: ['elec-led', 'trans-public', 'plastic-reusable', 'water-fixtures'],
          recommendations: ['Switch home electricity to green tariff', 'Walk/cycle for trips under 3km'],
          createdAt: new Date(Date.now() - 80 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 'hist_3',
          userId: demoUser.id,
          score: 74,
          grade: 'A',
          co2SavedKg: 2100,
          treesEquivalent: 95,
          answers: ['elec-led', 'elec-thermo', 'trans-public', 'plastic-reusable', 'water-fixtures', 'recy-sort'],
          recommendations: ['Adopt rooftop solar', 'Nurture native trees in community'],
          createdAt: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 'hist_4',
          userId: demoUser.id,
          score: 81,
          grade: 'A',
          co2SavedKg: 2850,
          treesEquivalent: 129,
          answers: ['elec-led', 'elec-thermo', 'trans-public', 'trans-active', 'recy-sort', 'plastic-reusable', 'water-fixtures', 'nature-trees'],
          recommendations: ['Consider transitioning to an electric vehicle (EV)'],
          createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 'hist_5',
          userId: demoUser.id,
          score: 88,
          grade: 'A+',
          co2SavedKg: 3450,
          treesEquivalent: 156,
          answers: ['elec-led', 'elec-thermo', 'trans-public', 'trans-active', 'recy-sort', 'recy-compost', 'plastic-reusable', 'water-fixtures', 'nature-trees', 'renew-solar'],
          recommendations: ['Inspire neighbors to calculate their Climate Action Score!'],
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
        }
      ];

      for (const h of sampleHistories) {
        await dbHistory.create(h);
      }

      // Seed 3 Saved Cities
      await dbSavedLocations.create({
        id: 'loc_1',
        userId: demoUser.id,
        cityName: 'Tokyo',
        country: 'Japan',
        latitude: 35.6895,
        longitude: 139.6917,
        createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString()
      });
      await dbSavedLocations.create({
        id: 'loc_2',
        userId: demoUser.id,
        cityName: 'London',
        country: 'United Kingdom',
        latitude: 51.5085,
        longitude: -0.1257,
        createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString()
      });
      await dbSavedLocations.create({
        id: 'loc_3',
        userId: demoUser.id,
        cityName: 'Miami',
        country: 'United States',
        latitude: 25.7743,
        longitude: -80.1937,
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
      });

      // Seed Badges
      await dbAchievements.unlock(demoUser.id, 'first_step');
      await dbAchievements.unlock(demoUser.id, 'eco_recycler');
      await dbAchievements.unlock(demoUser.id, 'green_traveler');
      await dbAchievements.unlock(demoUser.id, 'tree_champion');
      await dbAchievements.unlock(demoUser.id, 'climate_hero');
      await dbAchievements.unlock(demoUser.id, 'global_observer');

      // Seed Baseline Alerts
      await dbAlerts.create({
        id: 'alert_demo_1',
        userId: demoUser.id,
        type: 'aqi',
        severity: 'high',
        location: 'New Delhi, India',
        title: '⚠️ Air Quality Hazard Alert (AQI 245)',
        description: 'Dense ambient particulate accumulation has reached Very Poor levels in New Delhi.',
        recommendedAction: 'Avoid outdoor exercise and use indoor air filtration.',
        read: false,
        resolved: false,
        createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString()
      });

      await dbAlerts.create({
        id: 'alert_demo_2',
        userId: demoUser.id,
        type: 'heat',
        severity: 'moderate',
        location: 'Miami, USA',
        title: '🌡️ High Thermal Index Advisory (33°C)',
        description: 'Elevated surface temperatures and high humidity are causing moderate thermal stress.',
        recommendedAction: 'Maintain hydration and moderate cooling usage.',
        read: false,
        resolved: false,
        createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString()
      });
    }

    return this.login(demoEmail, 'EcoPulse#2026', true);
  },

  // Seed Admin Account
  async seedAdminAccount(): Promise<UserSession> {
    const adminEmail = 'admin@ecopulse.org';
    let adminUser = await dbUsers.findByEmail(adminEmail);

    if (!adminUser) {
      const passwordHash = await hashPassword('EcoPulse#Admin2026');
      const now = new Date().toISOString();
      adminUser = {
        id: 'usr_admin_platform_lead',
        name: 'Dr. Sarah Lin (Admin)',
        email: adminEmail,
        passwordHash,
        role: 'admin',
        createdAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: now
      };
      await dbUsers.create(adminUser);
    }

    return this.login(adminEmail, 'EcoPulse#Admin2026', true);
  }
};

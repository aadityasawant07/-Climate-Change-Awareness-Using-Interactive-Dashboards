import { AchievementBadge, BadgeKey } from '../types/user';

export const allAchievements: AchievementBadge[] = [
  {
    key: 'first_step',
    title: 'First Step',
    description: 'Complete your first personal Climate Action Score assessment.',
    icon: '🌱',
    color: 'from-emerald-500 to-teal-400',
    category: 'Assessment'
  },
  {
    key: 'eco_recycler',
    title: 'Eco Recycler',
    description: 'Adopt waste segregation, composting, or circular repair practices.',
    icon: '♻️',
    color: 'from-cyan-500 to-blue-400',
    category: 'Waste Reduction'
  },
  {
    key: 'green_traveler',
    title: 'Green Traveler',
    description: 'Pledge to use public transit, cycling, or walking for daily journeys.',
    icon: '🚲',
    color: 'from-lime-500 to-emerald-400',
    category: 'Mobility'
  },
  {
    key: 'tree_champion',
    title: 'Tree Champion',
    description: 'Choose native tree planting and urban reforestation initiatives.',
    icon: '🌳',
    color: 'from-green-600 to-emerald-400',
    category: 'Biosphere'
  },
  {
    key: 'clean_energy',
    title: 'Clean Energy Pioneer',
    description: 'Adopt rooftop solar or 100% green electricity grid tariffs.',
    icon: '⚡',
    color: 'from-amber-400 to-yellow-500',
    category: 'Energy'
  },
  {
    key: 'climate_hero',
    title: 'Climate Hero',
    description: 'Attain an elite Climate Action Score of 80 or higher.',
    icon: '🔥',
    color: 'from-rose-500 to-orange-500',
    category: 'Mastery'
  },
  {
    key: 'global_observer',
    title: 'Global Observer',
    description: 'Save 3 or more global cities to your favorite telemetry list.',
    icon: '🌍',
    color: 'from-purple-500 to-indigo-500',
    category: 'Exploration'
  }
];

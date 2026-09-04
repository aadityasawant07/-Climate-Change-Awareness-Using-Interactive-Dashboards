import { ClimateHabit } from '../types/climate';

export const climateHabitsList: ClimateHabit[] = [
  // Home Energy
  {
    id: 'switch-led',
    title: 'Switch Entire Home to LED & Smart Lighting',
    category: 'Home Energy',
    impactKgCo2Year: 180,
    points: 8,
    icon: 'Lightbulb',
    description: 'LEDs consume up to 85% less electricity than incandescent bulbs and last 25 times longer.',
    easyTip: 'Replace the 5 most-used light fittings in your living room and kitchen first.'
  },
  {
    id: 'smart-thermostat',
    title: 'Optimize Heating & Cooling by 2°C',
    category: 'Home Energy',
    impactKgCo2Year: 320,
    points: 12,
    icon: 'Thermometer',
    description: 'Adjusting your AC/Thermostat by 2°C (cooler in winter, warmer in summer) saves up to 10% on energy bills.',
    easyTip: 'Set AC to 24-25°C in summer. Use ceiling fans to create a breeze effect.'
  },
  {
    id: 'rooftop-solar',
    title: 'Install Rooftop Solar / Choose Green Energy Provider',
    category: 'Home Energy',
    impactKgCo2Year: 1450,
    points: 25,
    icon: 'Sun',
    description: 'Powers your household with zero-emission photovoltaic solar or 100% certified grid renewables.',
    easyTip: 'Switch your utility tariff to 100% green renewable electricity if renting or unable to install solar.'
  },
  {
    id: 'unplug-vampire-loads',
    title: 'Eliminate Phantom / Standby Power Drain',
    category: 'Home Energy',
    impactKgCo2Year: 120,
    points: 6,
    icon: 'PlugZap',
    description: 'Standby electronics (TVs, chargers, consoles) consume 5-10% of household electricity when not in use.',
    easyTip: 'Use a master switch power strip for your entertainment system and home office.'
  },

  // Mobility
  {
    id: 'public-transport',
    title: 'Use Public Transit (Metro, Bus, Train) for Daily Commutes',
    category: 'Mobility',
    impactKgCo2Year: 920,
    points: 20,
    icon: 'Bus',
    description: 'A single commuter riding the metro instead of driving alone prevents nearly 1 ton of CO₂ annually.',
    easyTip: 'Start with 2 days per week transit commute or use park-and-ride.'
  },
  {
    id: 'bicycle-walking',
    title: 'Walk or Cycle for Trips Under 3 km',
    category: 'Mobility',
    impactKgCo2Year: 450,
    points: 14,
    icon: 'Bike',
    description: 'Short car journeys produce disproportionately high emissions because cold engines run inefficiently.',
    easyTip: 'Keep a bicycle or e-scooter ready for neighborhood grocery runs and errands.'
  },
  {
    id: 'carpool-ride-share',
    title: 'Carpool with Colleagues or Neighbors',
    category: 'Mobility',
    impactKgCo2Year: 600,
    points: 15,
    icon: 'Car',
    description: 'Doubling vehicle occupancy immediately cuts your per-passenger tailpipe emissions by 50%.',
    easyTip: 'Create a neighborhood or workplace carpool group for rush-hour commutes.'
  },
  {
    id: 'electric-vehicle',
    title: 'Transition to Electric Vehicle (EV) or Hybrid',
    category: 'Mobility',
    impactKgCo2Year: 1800,
    points: 24,
    icon: 'Zap',
    description: 'EVs produce zero direct tailpipe emissions and are 3-4x more energy efficient than internal combustion engines.',
    easyTip: 'Look into local government EV subsidies and workplace charging amenities.'
  },

  // Diet & Waste
  {
    id: 'plant-rich-diet',
    title: 'Adopt a Plant-Rich Diet / Meatless Days',
    category: 'Diet & Waste',
    impactKgCo2Year: 780,
    points: 18,
    icon: 'Salad',
    description: 'Plant proteins produce 10-50x fewer greenhouse gas emissions per gram of protein than ruminant beef and lamb.',
    easyTip: 'Participate in "Meatless Mondays" and swap dairy milk with oat or soy milk.'
  },
  {
    id: 'zero-food-waste',
    title: 'Cut Household Food Waste to Zero',
    category: 'Diet & Waste',
    impactKgCo2Year: 370,
    points: 12,
    icon: 'Trash2',
    description: 'Food rotting in landfills produces methane. 1/3 of all food produced globally is wasted.',
    easyTip: 'Plan weekly meals, freeze leftovers, and keep an "Eat Me First" bin in the fridge.'
  },
  {
    id: 'say-no-single-use-plastic',
    title: 'Eliminate Single-Use Plastics & Carry Reusables',
    category: 'Diet & Waste',
    impactKgCo2Year: 140,
    points: 8,
    icon: 'ShoppingBag',
    description: '99% of plastics are made from petroleum fossil fuels. Reusable tote bags and metal flasks prevent landfill plastic.',
    easyTip: 'Keep reusable cloth bags in your backpack and a stainless steel water bottle with you.'
  },
  {
    id: 'home-composting',
    title: 'Compost Organic Kitchen Scraps',
    category: 'Diet & Waste',
    impactKgCo2Year: 210,
    points: 10,
    icon: 'Sparkles',
    description: 'Aerobic composting prevents methane production and turns kitchen waste into rich organic soil nutrients.',
    easyTip: 'Use a compact countertop bokashi bin or backyard compost tumbler.'
  },

  // Nature & Community
  {
    id: 'plant-native-trees',
    title: 'Plant and Nurture Native Trees & Garden Flora',
    category: 'Nature & Community',
    impactKgCo2Year: 250,
    points: 15,
    icon: 'Trees',
    description: 'A mature tree absorbs ~22 kg of CO₂ each year while cooling the local microclimate and supporting pollinators.',
    easyTip: 'Join a community tree plantation drive or nurture potted native plants on your balcony.'
  },
  {
    id: 'water-conservation',
    title: 'Install Low-Flow Water Aerators & Fix Leaks',
    category: 'Nature & Community',
    impactKgCo2Year: 160,
    points: 8,
    icon: 'Droplets',
    description: 'Treating, pumping, and heating municipal water requires enormous electrical power.',
    easyTip: 'Install $5 faucet aerators and take 5-minute showers instead of 10-minute ones.'
  },
  {
    id: 'buy-secondhand-repair',
    title: 'Embrace Circular Economy: Repair, Reuse & Thrift',
    category: 'Nature & Community',
    impactKgCo2Year: 310,
    points: 10,
    icon: 'RefreshCw',
    description: 'Extending the lifespan of clothing, furniture, and electronics avoids embodied manufacturing carbon.',
    easyTip: 'Repair damaged items before replacing them and explore refurbished electronics.'
  },
  {
    id: 'spread-climate-awareness',
    title: 'Advocate & Share Climate Knowledge in Community',
    category: 'Nature & Community',
    impactKgCo2Year: 500,
    points: 15,
    icon: 'Megaphone',
    description: 'Individual social multiplier effect: inspiring 5 friends to adopt sustainable habits multiplies total impact.',
    easyTip: 'Share this interactive dashboard with friends, classmates, and family members!'
  }
];

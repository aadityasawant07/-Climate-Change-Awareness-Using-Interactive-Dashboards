export interface EducationalTopic {
  id: string;
  title: string;
  shortExplanation: string;
  detailedExplanation: string;
  keyStatistics: string[];
  mainCauses: string[];
  effects: string[];
  individualActions: string[];
  iconName: string;
  badge: string;
}

export const educationalTopicsList: EducationalTopic[] = [
  {
    id: 'global-warming',
    title: '1. Global Warming',
    badge: 'Core Driver',
    iconName: 'Flame',
    shortExplanation: 'The long-term heating of Earth’s climate system driven by human activity since the pre-industrial period.',
    detailedExplanation: 'Global warming refers to the steady increase in global mean surface temperatures caused primarily by the build-up of heat-trapping greenhouse gases in the atmosphere. Since 1880, average global temperatures have climbed by more than 1.28°C, with recent years setting all-time high records.',
    keyStatistics: [
      '+1.28°C global temperature anomaly in 2024 (warmest year in 175-year record)',
      'Land masses warming ~60% faster than ocean surfaces (+1.95°C vs +0.86°C)',
      '1.5°C threshold carbon budget expected to deplete before 2030'
    ],
    mainCauses: [
      'Combustion of fossil fuels (coal, oil, gas) for electricity generation and transportation',
      'Industrial manufacturing (steel, cement, chemical synthesis)',
      'Agricultural emissions including ruminant livestock methane and synthetic fertilizers'
    ],
    effects: [
      'Shifts in global precipitation belts leading to simultaneous mega-droughts and severe flooding',
      'Accelerating loss of polar sea ice and continental ice sheets',
      'Massive coral reef bleaching and marine heatwaves'
    ],
    individualActions: [
      'Switch household electricity supplier to 100% certified renewable energy',
      'Set home thermostat 2°C cooler in winter and 2°C warmer in summer',
      'Walk, cycle, or use electric/public transit for daily commutes'
    ]
  },
  {
    id: 'deforestation',
    title: '2. Deforestation & Forest Degradation',
    badge: 'Biosphere Threat',
    iconName: 'Trees',
    shortExplanation: 'The massive clearing of tropical rainforests and ancient woodlands, destroying Earth’s natural carbon lungs.',
    detailedExplanation: 'Forests cover 31% of the land area on our planet, absorbing over 2.6 billion metric tons of carbon dioxide annually. Deforestation not only halts this vital natural carbon absorption, but burning and rotting slashed trees immediately releases centuries of stored biomass carbon back into the atmosphere.',
    keyStatistics: [
      '10 million hectares of forest destroyed globally every single year',
      'Amazon rainforest is 17% deforested, nearing the critical 20-25% tipping point',
      'Responsible for ~11% of all anthropogenic greenhouse gas emissions'
    ],
    mainCauses: [
      'Commercial agriculture: cattle ranching, soybean production, and palm oil plantations',
      'Illegal logging for timber and paper products',
      'Urban sprawl, infrastructure expansion, and mineral mining operations'
    ],
    effects: [
      'Extinction of critical wildlife species and catastrophic biodiversity loss',
      'Disruption of atmospheric water vapor transport (atmospheric rivers & regional rainfall)',
      'Severe topsoil erosion, desertification, and increased vulnerability to wildfires'
    ],
    individualActions: [
      'Choose FSC-certified sustainable wood and paper products',
      'Adopt a plant-rich diet and reduce consumption of feedlot beef linked to deforestation',
      'Support native reforestation and tree-planting community campaigns'
    ]
  },
  {
    id: 'air-pollution',
    title: '3. Air Pollution & Toxic Smog',
    badge: 'Public Health Crisis',
    iconName: 'Wind',
    shortExplanation: 'The contamination of ambient air by fine aerosols, toxic particulates, and noxious combustion gases.',
    detailedExplanation: 'Air pollution and climate change are deeply interconnected: burning fossil fuels simultaneously produces climate-warming CO₂ and lethal microscopic aerosols like PM2.5, nitrogen dioxide (NO₂), and ground-level ozone (O₃) that penetrate deep into the human cardiovascular system.',
    keyStatistics: [
      '94% of the global population breathes air exceeding WHO safe PM2.5 limits',
      'Causes over 7 million premature deaths annually from cardiopulmonary diseases',
      'Economic cost of health damage from air pollution exceeds $8.1 trillion per year'
    ],
    mainCauses: [
      'Coal-fired thermal power stations and heavy manufacturing plants',
      'Tailpipe exhaust from petrol and diesel internal combustion vehicles',
      'Agricultural crop residue burning and municipal waste incineration'
    ],
    effects: [
      'Surge in asthma, cardiovascular strokes, lung cancer, and reduced child lung development',
      'Formation of acid rain that damages aquatic ecosystems, forests, and building infrastructure',
      'Ground-level ozone damages agricultural crop yields, reducing wheat and soybean productivity'
    ],
    individualActions: [
      'Transition to an electric vehicle (EV) or rely on electrified public transit',
      'Eliminate open burning of leaf litter, plastics, and household waste',
      'Use indoor HEPA air purification and advocate for municipal Ultra Low Emission Zones (ULEZ)'
    ]
  },
  {
    id: 'carbon-emissions',
    title: '4. Carbon Emissions (CO₂ & Greenhouse Gases)',
    badge: 'Radiative Forcing',
    iconName: 'Factory',
    shortExplanation: 'Over 53 billion tons of greenhouse gases emitted annually, destabilizing Earth’s radiative balance.',
    detailedExplanation: 'Atmospheric carbon dioxide levels have skyrocketed from pre-industrial levels of ~280 ppm in 1850 to 426.2 ppm today—the highest concentration in over 3 million years. This greenhouse gas blanket traps outgoing infrared radiation, driving planetary warming.',
    keyStatistics: [
      'Atmospheric CO₂ is at 426.2 ppm (growing at +2.4 ppm per year)',
      '53.8 Gigatons of total greenhouse gas equivalent (CO₂e) emitted globally in 2024',
      'Energy sector produces 34% of global emissions, Industry produces 24%'
    ],
    mainCauses: [
      'Energy generation from fossil fuels (coal, petroleum oil, natural gas)',
      'Heavy industrial metallurgy, chemical synthesis, and Portland cement production',
      'Aviation, shipping, and road freight transportation networks'
    ],
    effects: [
      'Trapping ~1.3 W/m² of excess net radiative forcing energy in Earth’s climate system',
      'Severe ocean warming with 90% of excess trapped heat absorbed by seawater',
      'Accelerating planetary feedback loops like permafrost thaw and ice-albedo loss'
    ],
    individualActions: [
      'Audit household carbon footprint and install rooftop solar or energy-efficient heat pumps',
      'Reduce commercial aviation flights and opt for electric rail travel where feasible',
      'Support carbon offset initiatives and purchase energy-star rated appliances'
    ]
  },
  {
    id: 'rising-sea-levels',
    title: '5. Rising Sea Levels',
    badge: 'Coastal Threat',
    iconName: 'Waves',
    shortExplanation: 'The ocean is rising at an accelerating rate of 3.7+ mm/year due to thermal expansion and ice runoff.',
    detailedExplanation: 'Sea level rise is driven by two main physical processes: the thermal expansion of seawater as it absorbs heat (warm water expands), and the meltwater runoff from land-based ice sheets and mountain glaciers in Greenland and Antarctica pouring into oceans.',
    keyStatistics: [
      'Global sea levels have risen 21–24 cm since 1880',
      'Current rate of rise has surged to 3.7+ mm per year (double the 20th century rate)',
      'Over 600 million people live in low-elevation coastal zones vulnerable to inundation'
    ],
    mainCauses: [
      'Thermal expansion of warming ocean water (absorbing 90% of global excess heat)',
      'Rapid meltwater discharge from the Greenland and Antarctic ice sheets',
      'Widespread melting of mountain glaciers worldwide'
    ],
    effects: [
      'Chronic "Sunny Day" tidal flooding in coastal cities like Miami, Venice, and Jakarta',
      'Salinity intrusion into freshwater rivers and agricultural groundwater aquifers',
      'Destruction of coastal wetland ecosystems, mangrove forests, and beach barrier islands'
    ],
    individualActions: [
      'Support the restoration of natural living shorelines, salt marshes, and coastal mangroves',
      'Encourage municipal zoning laws that prevent construction in high-risk floodplain zones',
      'Conserve water to reduce pressure on municipal coastal freshwater aquifers'
    ]
  },
  {
    id: 'extreme-weather',
    title: '6. Extreme Weather Intensification',
    badge: 'Atmospheric Volatility',
    iconName: 'CloudLightning',
    shortExplanation: 'Higher atmospheric heat energy fuels supercharged hurricanes, intense atmospheric rivers, and deadly heatwaves.',
    detailedExplanation: 'Thermodynamics dictates that for every 1°C of warming, the atmosphere holds ~7% more water vapor. This increased capacity supercharges the hydrological cycle, causing record-breaking downpours and Category 5 tropical cyclones, while rapidly drying out soils in arid regions into catastrophic mega-droughts.',
    keyStatistics: [
      '5x increase in the frequency of extreme 50-year heatwaves',
      'Category 4 and 5 hurricane frequency has doubled since 1980',
      'Weather-related disasters have increased 5-fold over the past 50 years'
    ],
    mainCauses: [
      'Elevated sea surface temperatures providing immense thermodynamic fuel to tropical storms',
      'Jet stream destabilization and atmospheric blocking patterns causing stagnant heat domes',
      'Intensified evapotranspiration that rapidly dehydrates topsoil and vegetation'
    ],
    effects: [
      'Devastating flash flooding overwhelming city storm drains and river basins',
      'Longer, more catastrophic wildfire seasons across North America, Australia, and the Mediterranean',
      'Massive agricultural crop failures and economic disruption of global food supply chains'
    ],
    individualActions: [
      'Implement rainwater harvesting and permeable pavement to mitigate urban runoff',
      'Create home emergency preparedness plans for extreme storms and heatwaves',
      'Plant shade trees around residences to reduce urban heat island temperatures by up to 5°C'
    ]
  },
  {
    id: 'melting-glaciers',
    title: '7. Melting Glaciers & Ice Sheet Loss',
    badge: 'Cryosphere Collapse',
    iconName: 'MountainSnow',
    shortExplanation: 'Earth is losing over 1.2 trillion tons of ice every year, threatening freshwater supplies for billions.',
    detailedExplanation: 'Glaciers act as natural frozen freshwater towers for humanity, storing 69% of Earth’s total freshwater. As atmospheric and ocean temperatures climb, glaciers in the Himalayas, European Alps, Andes, and Polar Ice Sheets are retreating at unprecedented rates, posing catastrophic risks for seasonal river flows.',
    keyStatistics: [
      'Greenland ice sheet losing 270 billion tons of net ice mass every single year',
      'European Alpine glaciers have lost over 60% of their volume since 1850',
      'Himalayan Hindu-Kush glaciers could lose up to 75% of their mass by 2100 under high emissions'
    ],
    mainCauses: [
      'Direct atmospheric warming accelerating summer ice ablation and surface melting',
      'Warm ocean currents eroding floating glacial ice tongues and ice shelves from underneath',
      'Deposition of dark soot (black carbon) reducing glacier surface reflectivity (albedo)'
    ],
    effects: [
      'Critical seasonal drinking water and irrigation shortages for over 1.9 billion downstream people',
      'Risk of catastrophic Glacial Lake Outburst Floods (GLOFs) destroying mountain villages',
      'Permanent loss of paleoclimate ice core scientific records spanning hundreds of thousands of years'
    ],
    individualActions: [
      'Minimize black carbon emissions by avoiding wood-burning stoves and fossil fuel vehicles',
      'Conserve municipal water to protect seasonal river catchments',
      'Advocate for strong international climate policies to maintain the 1.5°C Paris warming target'
    ]
  }
];

export interface TippingPoint {
  id: string;
  name: string;
  thresholdEstimate: string;
  currentStatus: 'Approaching' | 'Critical' | 'Triggered' | 'Active Risk';
  impactDescription: string;
  timescale: string;
  severityColor: string;
}

export const planetaryTippingPoints: TippingPoint[] = [
  {
    id: 'greenland',
    name: 'Greenland Ice Sheet Collapse',
    thresholdEstimate: '1.5°C (1.0°C – 2.0°C)',
    currentStatus: 'Active Risk',
    impactDescription: 'Complete disintegration would eventually cause up to 7 meters of permanent global sea level rise, submerging thousands of coastal cities.',
    timescale: 'Centuries to Millennia',
    severityColor: 'text-amber-400 border-amber-500/30'
  },
  {
    id: 'amazon',
    name: 'Amazon Rainforest Dieback',
    thresholdEstimate: '2.0°C – 3.0°C (or 20-25% deforestation)',
    currentStatus: 'Critical',
    impactDescription: 'Self-sustaining rainfall recycling fails, transitioning massive swathes of rainforest into dry savanna, releasing up to 90 Gt of CO₂.',
    timescale: 'Decades',
    severityColor: 'text-rose-400 border-rose-500/30'
  },
  {
    id: 'amoc',
    name: 'Atlantic Meridional Overturning Circulation (AMOC) Slowdown',
    thresholdEstimate: '1.4°C – 3.0°C',
    currentStatus: 'Approaching',
    impactDescription: 'Conveyor belt collapse would cause dramatic cooling across Northern Europe, disrupt global monsoons, and trigger 1m faster sea level rise in North America.',
    timescale: 'Decades to a century',
    severityColor: 'text-purple-400 border-purple-500/30'
  },
  {
    id: 'permafrost',
    name: 'Boreal Permafrost Abrupt Thaw',
    thresholdEstimate: '1.5°C – 2.5°C',
    currentStatus: 'Active Risk',
    impactDescription: 'Uncontrolled release of gigatons of ancient methane and CO₂ creating an irreversible planetary warming accelerator loop.',
    timescale: 'Decades to Centuries',
    severityColor: 'text-amber-400 border-amber-500/30'
  },
  {
    id: 'corals',
    name: 'Tropical Coral Reef Die-off',
    thresholdEstimate: '1.5°C (70-90% loss) / 2.0°C (>99% loss)',
    currentStatus: 'Critical',
    impactDescription: 'Loss of nursery habitat for 25% of all marine species, endangering coastal livelihoods and fisheries for 500+ million people.',
    timescale: 'Current Decades',
    severityColor: 'text-rose-400 border-rose-500/30'
  }
];

export interface GlacierCaseStudy {
  id: string;
  name: string;
  location: string;
  initialYear: number;
  currentYear: number;
  initialStatus: string;
  currentStatus: string;
  iceVolumeLossPct: number;
  description: string;
}

export const glacierCaseStudies: GlacierCaseStudy[] = [
  {
    id: 'muir-glacier',
    name: 'Muir Glacier, Glacier Bay',
    location: 'Alaska, USA',
    initialYear: 1941,
    currentYear: 2024,
    initialStatus: 'Glacier thickness was over 700 meters, filling the entire inlet with towering blue ice walls directly abutting tidewater.',
    currentStatus: 'Glacier has retreated more than 50 kilometers inland, completely grounding out of tidewater, replaced by dense spruce forest.',
    iceVolumeLossPct: 88,
    description: 'One of the most documented photographic proofs of 20th-century glacial retreat recorded by the US Geological Survey (USGS).'
  },
  {
    id: 'rhone-glacier',
    name: 'Rhône Glacier, Swiss Alps',
    location: 'Valais, Switzerland',
    initialYear: 1870,
    currentYear: 2024,
    initialStatus: 'Massive glacial tongue covered the valley basin, feeding the headwaters of the iconic Rhône River across France and Switzerland.',
    currentStatus: 'Retreated over 1.4 km; locals now cover the glacier ice cave with UV-reflective thermal blankets every summer to slow the melt.',
    iceVolumeLossPct: 65,
    description: 'European Alpine glaciers have lost over 60% of their total volume since 1850 and are projected to lose >80% by 2050.'
  },
  {
    id: 'kilimanjaro-ice',
    name: 'Furtwängler Glacier, Mount Kilimanjaro',
    location: 'Tanzania, Africa',
    initialYear: 1912,
    currentYear: 2024,
    initialStatus: 'A continuous pristine ice cap spanned the entire volcanic caldera summit of Africa’s highest peak.',
    currentStatus: 'Over 85% of the ice field has vanished into isolated remnant ice pillars, projected to disappear completely before 2035.',
    iceVolumeLossPct: 92,
    description: 'A striking tropical glacier disappearance directly observable by astronauts and satellite radar altimeters.'
  }
];

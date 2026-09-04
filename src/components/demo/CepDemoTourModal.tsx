import React, { useState } from 'react';
import { PageTab } from '../../types/climate';
import { 
  GraduationCap, 
  X, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Globe2, 
  BarChart3, 
  ShieldAlert, 
  Sparkles, 
  Award, 
  FileText, 
  MapPin,
  ExternalLink
} from 'lucide-react';

interface CepDemoTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  setActiveTab: (tab: PageTab) => void;
}

interface TourStep {
  stepNumber: number;
  title: string;
  subtitle: string;
  description: string;
  targetTab: PageTab;
  highlights: string[];
  icon: React.ReactNode;
}

export const CepDemoTourModal: React.FC<CepDemoTourModalProps> = ({
  isOpen,
  onClose,
  setActiveTab,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const tourSteps: TourStep[] = [
    {
      stepNumber: 1,
      title: 'Step 1: Global City Selection & Search',
      subtitle: 'Select or query any global city for live telemetry',
      description: 'The platform integrates Open-Meteo public meteorological and air quality APIs to fetch live weather, apparent temperature, and fine particulate matter for any coordinates on Earth.',
      targetTab: 'dashboard',
      highlights: [
        'Search box with debounced geocoding autocompletion',
        'Quick presets for global megacities (Tokyo, London, New Delhi, Miami)',
        'Explicit provenance tags identifying [LIVE DATA API]'
      ],
      icon: <MapPin className="w-6 h-6 text-emerald-400" />
    },
    {
      stepNumber: 2,
      title: 'Step 2: Real-Time Weather & AQI Telemetry',
      subtitle: 'Atmospheric conditions and multi-pollutant breakdown',
      description: 'Observe exact temperature, feels-like metrics, humidity, wind velocity, precipitation, and multi-pollutant concentrations (PM2.5, PM10, NO2, SO2, O3, and UV Index) categorized according to US EPA & WHO standards.',
      targetTab: 'dashboard',
      highlights: [
        '7-day daily meteorological high/low forecasts',
        '5-tier standard AQI classification (Good, Moderate, Poor, Very Poor, Hazardous)',
        'Localized health advisories for vulnerable populations'
      ],
      icon: <Globe2 className="w-6 h-6 text-cyan-400" />
    },
    {
      stepNumber: 3,
      title: 'Step 3: Planetary Climate Trends & Historical Charts',
      subtitle: 'Empirical NASA/NOAA records vs. IPCC AR6 projections',
      description: 'Interactive Recharts dashboards visualize global temperature anomalies (1880–2024), rainfall volatility, and CO2 emissions with interactive filters for timeline ranges, locations, and data provenance.',
      targetTab: 'dashboard',
      highlights: [
        'NASA GISTEMP v4 temperature anomaly trendlines',
        'IPCC AR6 scenario projections (SSP1-2.6, SSP2-4.5, SSP5-8.5)',
        '1-Click CSV dataset export'
      ],
      icon: <BarChart3 className="w-6 h-6 text-teal-400" />
    },
    {
      stepNumber: 4,
      title: 'Step 4: Empirical Climate Risk Score (0–100)',
      subtitle: 'Multi-hazard environmental vulnerability algorithm',
      description: 'The system computes an empirical 0–100 composite risk score by weighting air pollution (25%), thermal stress (25%), hydrological volatility (20%), storm intensity (15%), and geographic exposure (15%).',
      targetTab: 'dashboard',
      highlights: [
        'Categorized: Very Low, Low, Moderate, High, Very High',
        'Factor breakdown progress meters',
        'Automated AI and rule-based environmental insight summary'
      ],
      icon: <ShieldAlert className="w-6 h-6 text-amber-400" />
    },
    {
      stepNumber: 5,
      title: 'Step 5: Climate Action Assessment Calculator',
      subtitle: 'Individual sustainability score and carbon mitigation index',
      description: 'Users evaluate personal environmental habits across 7 core areas: Electricity, Public Transit, Recycling, Plastic avoidance, Water conservation, Tree planting, and Renewable energy.',
      targetTab: 'actions',
      highlights: [
        'Calculates 0–100 score, eco-grade (A+ to F), and CO2 avoided (kg/yr)',
        'Printable Certificate of Climate Pledge with confetti celebration',
        'Works standalone with no login required, or saves to account'
      ],
      icon: <Sparkles className="w-6 h-6 text-emerald-400" />
    },
    {
      stepNumber: 6,
      title: 'Step 6: Dynamic Personalized Recommendations',
      subtitle: 'Tailored action plans based on unchecked assessment items',
      description: 'The recommendation engine analyzes unchecked questions and local environmental conditions to generate high-impact habit suggestions to boost the user’s score.',
      targetTab: 'actions',
      highlights: [
        'Quantified carbon savings per recommended action',
        'Immediate feedback for unchecked habits',
        'Synchronized directly with personal profile history'
      ],
      icon: <CheckCircle2 className="w-6 h-6 text-lime-400" />
    },
    {
      stepNumber: 7,
      title: 'Step 7: Personal Progress & Gamified Badges',
      subtitle: 'Track score trajectory over time and earn eco-milestones',
      description: 'Review score improvement trends on interactive area charts, manage pinned observatory cities, and unlock 7 planetary stewardship badges.',
      targetTab: 'my-dashboard',
      highlights: [
        'Score Over Time historical trajectory chart',
        'Saved Cities telemetry grid with 1-click removal',
        '7 Unlocked/Locked Badges (First Step, Eco Recycler, Climate Hero)'
      ],
      icon: <Award className="w-6 h-6 text-yellow-400" />
    },
    {
      stepNumber: 8,
      title: 'Step 8: Generate Verified Climate Report',
      subtitle: 'Export formal 9-section environmental report to PDF / Print',
      description: 'Compile a comprehensive assessment document with meteorological observations, pollutant breakdowns, hazard risk factors, and recommended interventions for presentation and archiving.',
      targetTab: 'report',
      highlights: [
        'Professional styling suitable for academic & governmental review',
        '1-Click Print and Download PDF',
        'Document ID verification and data provenance footnotes'
      ],
      icon: <FileText className="w-6 h-6 text-blue-400" />
    }
  ];

  if (!isOpen) return null;

  const currentStep = tourSteps[currentStepIndex];

  const handleNext = () => {
    if (currentStepIndex < tourSteps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleJumpToFeature = () => {
    setActiveTab(currentStep.targetTab);
    onClose();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-climate-card border-2 border-emerald-500/50 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in duration-200 my-8 space-y-6">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-950/40">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase">
                  College Capstone (CEP) Demo Tour
                </span>
              </div>
              <h3 className="text-xl font-black text-white mt-0.5">8-Step Evaluator Presentation Flow</h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-climate-dark border border-climate-border text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar (8 Steps) */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-emerald-400 font-bold">Step {currentStep.stepNumber} of {tourSteps.length}</span>
            <span className="text-slate-400">{Math.round(((currentStepIndex + 1) / tourSteps.length) * 100)}% Completed</span>
          </div>

          <div className="grid grid-cols-8 gap-1.5 h-2">
            {tourSteps.map((s, idx) => (
              <div
                key={s.stepNumber}
                onClick={() => setCurrentStepIndex(idx)}
                className={`h-full rounded-full cursor-pointer transition-all ${
                  idx <= currentStepIndex
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                    : 'bg-climate-dark border border-climate-border'
                }`}
                title={`Jump to Step ${s.stepNumber}`}
              />
            ))}
          </div>
        </div>

        {/* Active Step Content Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-[#071a11] to-[#040e09] border border-emerald-500/30 space-y-4">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-climate-dark border border-climate-border shrink-0">
              {currentStep.icon}
            </div>
            <div>
              <h4 className="text-lg font-black text-white">{currentStep.title}</h4>
              <p className="text-xs text-emerald-400 font-medium">{currentStep.subtitle}</p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            {currentStep.description}
          </p>

          <div className="space-y-1.5 pt-2 border-t border-white/5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Key Technical Features:
            </span>
            <ul className="space-y-1 text-xs text-slate-300">
              {currentStep.highlights.map((h, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handlePrev}
              disabled={currentStepIndex === 0}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-climate-dark border border-climate-border text-xs text-slate-300 hover:text-white disabled:opacity-40 disabled:pointer-events-none transition-colors flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            <button
              onClick={handleNext}
              disabled={currentStepIndex === tourSteps.length - 1}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs disabled:opacity-40 disabled:pointer-events-none transition-colors flex items-center justify-center gap-1.5 shadow-md"
            >
              <span>Next Step</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={handleJumpToFeature}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 text-white font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <span>Open & Demo This Feature</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};

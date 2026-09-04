import React, { useState, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { CertificateModal } from './CertificateModal';
import { useAuth } from '../../context/AuthContext';
import { 
  Sparkles, 
  Lightbulb, 
  Bus, 
  RefreshCw, 
  ShoppingBag, 
  Droplets, 
  Trees, 
  Sun, 
  Check, 
  Award, 
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Save,
  Loader2,
  LogIn
} from 'lucide-react';

interface QuizQuestion {
  id: string;
  category: 'Electricity Usage' | 'Public Transport' | 'Recycling' | 'Plastic Usage' | 'Water Conservation' | 'Tree Planting' | 'Renewable Energy';
  question: string;
  points: number;
  co2SavedKg: number;
  recommendationIfUnchecked: string;
  iconName: string;
}

const quizQuestions: QuizQuestion[] = [
  // 1. Electricity Usage
  {
    id: 'elec-led',
    category: 'Electricity Usage',
    question: 'I use energy-efficient LED bulbs and turn off appliances/lights when leaving rooms.',
    points: 12,
    co2SavedKg: 180,
    recommendationIfUnchecked: 'Replace incandescent lighting with LEDs and eliminate standby phantom power loads to save ~180 kg CO₂/yr.',
    iconName: 'Lightbulb'
  },
  {
    id: 'elec-thermo',
    category: 'Electricity Usage',
    question: 'I moderate heating and cooling by 2°C (24-25°C in summer, 20°C in winter).',
    points: 13,
    co2SavedKg: 320,
    recommendationIfUnchecked: 'Adjust your thermostat by 2°C to reduce residential HVAC energy load by up to 10%.',
    iconName: 'Lightbulb'
  },

  // 2. Public Transport
  {
    id: 'trans-public',
    category: 'Public Transport',
    question: 'I regularly use public transit (metro, train, electric bus) or carpool instead of driving alone.',
    points: 18,
    co2SavedKg: 850,
    recommendationIfUnchecked: 'Shift 2–3 commute days per week to public transit or carpooling to cut tailpipe emissions by over 850 kg CO₂/yr.',
    iconName: 'Bus'
  },
  {
    id: 'trans-active',
    category: 'Public Transport',
    question: 'I walk or cycle for neighborhood errands and short journeys under 3 kilometers.',
    points: 12,
    co2SavedKg: 400,
    recommendationIfUnchecked: 'Keep a bicycle or walk for short trips to avoid disproportionate cold-engine vehicle emissions.',
    iconName: 'Bus'
  },

  // 3. Recycling
  {
    id: 'recy-sort',
    category: 'Recycling',
    question: 'I rigorously segregate dry recyclables (paper, metals, glass, cardboard) from wet garbage.',
    points: 12,
    co2SavedKg: 280,
    recommendationIfUnchecked: 'Set up distinct household bins for paper, plastics, and glass to support the circular economy.',
    iconName: 'RefreshCw'
  },
  {
    id: 'recy-compost',
    category: 'Recycling',
    question: 'I compost organic food scraps or repair and thrift broken household goods before discarding.',
    points: 10,
    co2SavedKg: 220,
    recommendationIfUnchecked: 'Start composting kitchen food scraps to eliminate landfill methane generation.',
    iconName: 'RefreshCw'
  },

  // 4. Plastic Usage
  {
    id: 'plastic-reusable',
    category: 'Plastic Usage',
    question: 'I carry reusable cloth tote bags, a refillable water flask, and refuse single-use plastic cutlery.',
    points: 15,
    co2SavedKg: 160,
    recommendationIfUnchecked: 'Carry a stainless steel flask and tote bag to eliminate ~160 kg of petroleum-based plastic lifecycle emissions.',
    iconName: 'ShoppingBag'
  },

  // 5. Water Conservation
  {
    id: 'water-fixtures',
    category: 'Water Conservation',
    question: 'I take short showers (<5 mins), fix faucet leaks promptly, and turn off taps while brushing/soaping.',
    points: 14,
    co2SavedKg: 190,
    recommendationIfUnchecked: 'Install low-flow aerators and limit showers to under 5 minutes to conserve energy used in municipal water pumping.',
    iconName: 'Droplets'
  },

  // 6. Tree Planting & Green Cover
  {
    id: 'nature-trees',
    category: 'Tree Planting',
    question: 'I actively plant/nurture native trees, potted garden flora, or support local reforestation drives.',
    points: 16,
    co2SavedKg: 250,
    recommendationIfUnchecked: 'Plant native flora on your balcony or join weekend community tree-planting campaigns to create natural carbon sinks.',
    iconName: 'Trees'
  },

  // 7. Renewable Energy Usage
  {
    id: 'renew-solar',
    category: 'Renewable Energy',
    question: 'I have rooftop solar installed, use solar water heaters, or subscribe to a green utility tariff.',
    points: 20,
    co2SavedKg: 1200,
    recommendationIfUnchecked: 'Explore rooftop solar incentives or switch your utility account to 100% green renewable power to save over 1.2 tons of CO₂/yr.',
    iconName: 'Sun'
  }
];

export const ClimateScoreCalculator: React.FC = () => {
  const { isAuthenticated, saveAssessmentResult } = useAuth();
  // Default selected habits
  const [selectedIds, setSelectedIds] = useState<string[]>([
    'elec-led',
    'trans-public',
    'plastic-reusable',
    'water-fixtures'
  ]);

  const [userName, setUserName] = useState<string>('');
  const [showCertificate, setShowCertificate] = useState<boolean>(false);
  const [isSavingResult, setIsSavingResult] = useState<boolean>(false);
  const [resultSaved, setResultSaved] = useState<boolean>(false);

  const toggleQuestion = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Score Calculation
  const { score, totalCo2, grade, statusColor, categoryText, recommendations, treesEquivalent } = useMemo(() => {
    const totalMaxPoints = quizQuestions.reduce((acc, q) => acc + q.points, 0);
    const selectedPoints = quizQuestions
      .filter((q) => selectedIds.includes(q.id))
      .reduce((acc, q) => acc + q.points, 0);

    const calculatedScore = Math.min(100, Math.round((selectedPoints / totalMaxPoints) * 100));
    
    const co2Saved = quizQuestions
      .filter((q) => selectedIds.includes(q.id))
      .reduce((acc, q) => acc + q.co2SavedKg, 0);

    let g = 'F';
    let color = 'text-rose-400 bg-rose-500/10 border-rose-500/30';
    let cat = 'Red Category (Needs High Action)';

    if (calculatedScore >= 75) {
      g = calculatedScore >= 90 ? 'A+' : 'A';
      color = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      cat = 'Green Category (Planetary Champion)';
    } else if (calculatedScore >= 45) {
      g = calculatedScore >= 60 ? 'B' : 'C';
      color = 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      cat = 'Yellow Category (Moderate Action)';
    }

    const recs = quizQuestions
      .filter((q) => !selectedIds.includes(q.id))
      .map((q) => q.recommendationIfUnchecked);

    const trees = Math.round(co2Saved / 22);

    return {
      score: calculatedScore,
      totalCo2: co2Saved,
      grade: g,
      statusColor: color,
      categoryText: cat,
      recommendations: recs.length > 0 ? recs : ['Congratulations! You have adopted all premier sustainable practices!'],
      treesEquivalent: trees
    };
  }, [selectedIds]);

  const handleGenerateCertificate = () => {
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#10b981', '#34d399', '#06b6d4', '#f59e0b'],
    });
    setShowCertificate(true);
  };

  const categories = [
    'Electricity Usage',
    'Public Transport',
    'Recycling',
    'Plastic Usage',
    'Water Conservation',
    'Tree Planting',
    'Renewable Energy'
  ];

  return (
    <div className="space-y-8">
      {/* 1. Header & Live Score Dashboard */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0a2318] via-[#071911] to-[#040e09] border-2 border-emerald-500/40 shadow-2xl relative overflow-hidden">
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Score Overview */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <Sparkles className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Individual Sustainability Index • No Login Required
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              My Climate Action Score: <span className="text-emerald-400 font-mono">{score} / 100</span>
            </h2>

            <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-300 bg-emerald-500/10 px-2.5 py-1 rounded-xl border border-emerald-500/20">
              <span>🌱 <strong>Educational Climate Score:</strong> Simplified heuristic model quantifying individual lifestyle carbon mitigation potential.</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
              Answer the questions across <strong>7 core categories</strong> below to compute your personal carbon mitigation index and receive custom recommendations.
            </p>

            {/* Visual Progress Bar */}
            <div className="space-y-1.5 pt-2">
              <div className="w-full h-3 rounded-full bg-climate-dark border border-climate-border overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${
                    score >= 75
                      ? 'from-emerald-500 to-teal-400'
                      : score >= 45
                      ? 'from-amber-500 to-yellow-400'
                      : 'from-rose-500 to-orange-400'
                  } rounded-full transition-all duration-500`}
                  style={{ width: `${score}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className={`font-bold px-2 py-0.5 rounded-full border ${statusColor}`}>
                  {categoryText}
                </span>
                <span className="text-slate-400">
                  {selectedIds.length} of {quizQuestions.length} Practices Adopted
                </span>
              </div>
            </div>
          </div>

          {/* Right Summary Badges */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-climate-dark/80 border border-emerald-500/30 text-center">
              <span className="text-[11px] text-slate-400 block mb-1">Eco Grade</span>
              <span className="text-3xl font-black font-mono text-amber-300">{grade}</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Rating</span>
            </div>

            <div className="p-4 rounded-2xl bg-climate-dark/80 border border-emerald-500/30 text-center">
              <span className="text-[11px] text-slate-400 block mb-1">CO₂ Avoided</span>
              <span className="text-2xl font-black font-mono text-cyan-400">-{totalCo2}</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">kg CO₂ / year</span>
            </div>

            <div className="p-4 rounded-2xl bg-climate-dark/80 border border-emerald-500/30 text-center">
              <span className="text-[11px] text-slate-400 block mb-1">Trees Equivalent</span>
              <span className="text-2xl font-black font-mono text-emerald-400">+{treesEquivalent}</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Trees Planted</span>
            </div>

            <div className="p-4 rounded-2xl bg-climate-dark/80 border border-emerald-500/30 text-center flex flex-col justify-center items-center">
              <span className="text-[11px] text-slate-400 block mb-1">Action Status</span>
              <span className="text-xs font-bold text-slate-200">
                {score >= 75 ? 'Excellent' : score >= 45 ? 'Developing' : 'Starting'}
              </span>
            </div>
          </div>

        </div>

        {/* Certificate Generator Row */}
        <div className="mt-6 pt-6 border-t border-emerald-500/20 flex flex-wrap items-center justify-between gap-4">
          <input
            type="text"
            placeholder="Enter your name for Certificate of Climate Action..."
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="bg-climate-dark border border-emerald-500/30 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 w-full max-w-sm"
          />

          <button
            onClick={handleGenerateCertificate}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-950/40 transition-all hover:scale-105 active:scale-95"
          >
            <Award className="w-4 h-4" />
            <span>Generate Certificate</span>
          </button>

          {/* Save Result to Personal Dashboard */}
          {isAuthenticated ? (
            <button
              onClick={async () => {
                setIsSavingResult(true);
                await saveAssessmentResult(score, grade, totalCo2, treesEquivalent, selectedIds, recommendations.slice(0, 5));
                setResultSaved(true);
                setIsSavingResult(false);
                confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 }, colors: ['#10b981', '#06b6d4'] });
                setTimeout(() => setResultSaved(false), 5000);
              }}
              disabled={isSavingResult || resultSaved}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs shadow-lg transition-all hover:scale-105 active:scale-95 ${
                resultSaved
                  ? 'bg-emerald-900/60 border border-emerald-500 text-emerald-300 cursor-default'
                  : 'bg-climate-dark border border-emerald-500/50 hover:border-emerald-400 text-emerald-300'
              }`}
            >
              {isSavingResult ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : resultSaved ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span>{resultSaved ? 'Saved to Dashboard!' : 'Save My Result'}</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-climate-dark/60 border border-slate-600 text-slate-400 text-xs">
              <LogIn className="w-3.5 h-3.5" />
              <span>Login to save results to your dashboard</span>
            </div>
          )}
        </div>

      </div>

      {/* 2. Interactive 7-Category Questions Grid */}
      <div className="space-y-6">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span>7 Core Action Areas: Check All That Apply</span>
          </h3>
          <p className="text-xs text-slate-400">
            Click any habit you currently practice or pledge to adopt today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quizQuestions.map((item) => {
            const isChecked = selectedIds.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => toggleQuestion(item.id)}
                className={`p-5 rounded-3xl border cursor-pointer transition-all duration-200 select-none shadow-lg flex items-start justify-between gap-4 ${
                  isChecked
                    ? 'bg-emerald-950/30 border-emerald-500 shadow-emerald-900/10'
                    : 'glass-panel border-climate-border hover:border-emerald-500/40'
                }`}
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white/5 text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
                      {item.category}
                    </span>
                    <span className="text-[10px] font-mono text-cyan-400">
                      +{item.points} Pts • -{item.co2SavedKg} kg CO₂
                    </span>
                  </div>

                  <p className={`text-xs sm:text-sm leading-relaxed ${isChecked ? 'text-white font-semibold' : 'text-slate-300'}`}>
                    {item.question}
                  </p>
                </div>

                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 transition-colors ${
                  isChecked ? 'bg-emerald-500 border-emerald-500 text-black' : 'border-slate-600 bg-climate-dark'
                }`}>
                  {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Personalized Recommendations Based on Unchecked Answers */}
      <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-emerald-500/30 space-y-4">
        <div className="flex items-center gap-2 text-emerald-400">
          <Lightbulb className="w-5 h-5" />
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">
            Personalized Climate Action Recommendations For You
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {recommendations.map((rec, idx) => (
            <div key={idx} className="p-3.5 rounded-2xl bg-climate-dark/80 border border-climate-border flex items-start gap-2.5 text-xs text-slate-300">
              <span className="text-emerald-400 font-bold">•</span>
              <span className="leading-relaxed">{rec}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Certificate Modal */}
      {showCertificate && (
        <CertificateModal
          userName={userName}
          score={score}
          grade={grade}
          co2SavedKg={totalCo2}
          treesEquivalent={treesEquivalent}
          onClose={() => setShowCertificate(false)}
        />
      )}
    </div>
  );
};

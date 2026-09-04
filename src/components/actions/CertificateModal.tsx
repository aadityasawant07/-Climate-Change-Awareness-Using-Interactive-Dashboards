import React, { useRef } from 'react';
import { Award, Leaf, X, Download, Printer, CheckCircle, ShieldCheck } from 'lucide-react';

interface CertificateModalProps {
  userName: string;
  score: number;
  grade: string;
  co2SavedKg: number;
  treesEquivalent: number;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  userName,
  score,
  grade,
  co2SavedKg,
  treesEquivalent,
  onClose,
}) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-climate-card border border-emerald-500/50 rounded-3xl max-w-2xl w-full p-8 shadow-2xl relative animate-in fade-in zoom-in duration-300">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-xl bg-climate-dark border border-climate-border transition-colors print:hidden"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Container (Styled for print and on-screen presentation) */}
        <div
          ref={certificateRef}
          className="p-8 rounded-2xl bg-gradient-to-b from-[#0b2418] via-[#081b12] to-[#040e09] border-4 border-emerald-500/60 shadow-2xl relative overflow-hidden text-center space-y-6"
        >
          {/* Certificate Corner Ornaments */}
          <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-emerald-400/80 rounded-tl-lg" />
          <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-emerald-400/80 rounded-tr-lg" />
          <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-emerald-400/80 rounded-bl-lg" />
          <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-emerald-400/80 rounded-br-lg" />

          {/* Badge & Seal */}
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-emerald-600 to-teal-400 p-1 shadow-lg shadow-emerald-900/50 flex items-center justify-center">
            <div className="w-full h-full bg-climate-darker rounded-full flex items-center justify-center text-emerald-400">
              <Award className="w-8 h-8" />
            </div>
          </div>

          <div>
            <span className="text-[11px] font-bold text-emerald-400 tracking-[0.3em] uppercase block mb-1">
              Certificate of Climate Action & Sustainability Pledge
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Planetary Climate Guardian Award
            </h2>
          </div>

          <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
            This certificate is formally presented to acknowledge dedication to environmental conservation, carbon footprint reduction, and proactive climate stewardship.
          </p>

          {/* User Name */}
          <div className="py-2 border-b-2 border-emerald-500/40 max-w-sm mx-auto">
            <span className="text-xl sm:text-2xl font-black text-emerald-300 tracking-wide font-sans">
              {userName || 'Eco Champion'}
            </span>
          </div>

          {/* Achievement Stats Grid */}
          <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto pt-2">
            <div className="p-3 rounded-xl bg-climate-dark/80 border border-emerald-500/30">
              <span className="text-[10px] text-slate-400 block mb-0.5">Action Score</span>
              <span className="text-xl font-bold font-mono text-emerald-400">{score}/100</span>
            </div>
            <div className="p-3 rounded-xl bg-climate-dark/80 border border-emerald-500/30">
              <span className="text-[10px] text-slate-400 block mb-0.5">Eco Grade</span>
              <span className="text-xl font-bold font-mono text-amber-400">{grade}</span>
            </div>
            <div className="p-3 rounded-xl bg-climate-dark/80 border border-emerald-500/30">
              <span className="text-[10px] text-slate-400 block mb-0.5">CO₂ Prevented</span>
              <span className="text-xl font-bold font-mono text-cyan-400">{co2SavedKg} kg/yr</span>
            </div>
          </div>

          {/* Signatures & Issue Date */}
          <div className="pt-6 border-t border-white/10 flex items-center justify-between text-left text-[11px] text-slate-400 max-w-lg mx-auto">
            <div>
              <div className="text-white font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Verified by EcoPulse 3D</span>
              </div>
              <div className="text-[10px]">Climate Awareness Initiative</div>
            </div>

            <div className="text-right">
              <div className="text-slate-300 font-mono">{currentDate}</div>
              <div className="text-[10px] text-emerald-400 font-mono">ID: CEP-ECO-{Math.floor(100000 + Math.random() * 900000)}</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-6 print:hidden">
          <span className="text-xs text-slate-400">
            🌱 Equivalent to planting <strong>{treesEquivalent} trees</strong> each year!
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-climate-dark border border-climate-border hover:border-emerald-500/50 text-xs font-semibold text-white transition-all shadow-sm"
            >
              <Printer className="w-4 h-4 text-emerald-400" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white transition-all shadow-lg shadow-emerald-900/30"
            >
              Done
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

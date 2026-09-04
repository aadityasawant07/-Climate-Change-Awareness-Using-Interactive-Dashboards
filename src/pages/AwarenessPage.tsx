import React from 'react';
import { GreenhouseSimulator } from '../components/awareness/GreenhouseSimulator';
import { CausesEffectsGrid } from '../components/awareness/CausesEffectsGrid';
import { GlacierSlider } from '../components/awareness/GlacierSlider';
import { TippingPoints } from '../components/awareness/TippingPoints';
import { BookOpen, Sparkles, Lightbulb, HelpCircle } from 'lucide-react';

export const AwarenessPage: React.FC = () => {
  return (
    <div className="space-y-14 py-4">
      {/* 1. Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-climate-border">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
              <BookOpen className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Climate Awareness & Science Education Hub
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            Interactive visual educational modules on the greenhouse effect, primary drivers, planetary impacts, cryosphere loss, and critical tipping points.
          </p>
        </div>
      </div>

      {/* 2. Greenhouse Effect Interactive Simulator */}
      <section className="space-y-4">
        <GreenhouseSimulator />
      </section>

      {/* 3. Causes, Effects & Feedback Loops Grid */}
      <section className="space-y-4">
        <CausesEffectsGrid />
      </section>

      {/* 4. Vanishing Glaciers Before/After Slider */}
      <section className="space-y-4">
        <GlacierSlider />
      </section>

      {/* 5. 9 Planetary Tipping Points */}
      <section className="space-y-4">
        <TippingPoints />
      </section>
    </div>
  );
};

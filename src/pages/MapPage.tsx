import React, { useState } from 'react';
import { ClimateMap } from '../components/map/ClimateMap';
import { CityComparison } from '../components/map/CityComparison';
import { CityClimateProfile } from '../types/climate';
import { MapPin, Scale, Compass, Globe, Info } from 'lucide-react';

export const MapPage: React.FC = () => {
  const [selectedCityForDetail, setSelectedCityForDetail] = useState<CityClimateProfile | null>(null);

  return (
    <div className="space-y-12 py-4">
      {/* 1. Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-climate-border">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <MapPin className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Climate Map & Urban Comparison Hub
            </h1>
          </div>
          <p className="text-xs text-slate-400">
            Explore regional climate vulnerabilities, sea level inundation risks, and compare resilience initiatives across global cities.
          </p>
        </div>
      </div>

      {/* 2. Interactive 2D Leaflet Climate Map */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>Global Climate Vulnerability Map</span>
            </h2>
            <p className="text-xs text-slate-400">
              Click any city pin on the map to inspect live simulated weather, AQI, and local climate adaptation projects.
            </p>
          </div>
        </div>

        <ClimateMap onSelectCity={(city) => setSelectedCityForDetail(city)} />
      </section>

      {/* 3. Multi-City Comparison Tool */}
      <section className="space-y-4">
        <CityComparison />
      </section>
    </div>
  );
};

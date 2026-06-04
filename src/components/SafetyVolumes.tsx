'use client';

import { Ruler, Gauge, Activity, ShieldAlert, Ghost, Zap } from 'lucide-react';

export function SafetyVolumes() {
  const features = [
    {
      icon: <Ruler className="w-8 h-8" />,
      title: '1. Proximity',
      text: 'The closer an object gets, the more the system restricts movement, expanding the protective bubble in real time as assets approach each other.',
    },
    {
      icon: <Gauge className="w-8 h-8" />,
      title: '2. Speed',
      text: 'Safety bubbles scale with velocity. Faster machines get larger protective buffers to ensure a safe, calculated separation distance.',
    },
    {
      icon: <ShieldAlert className="w-8 h-8" />,
      title: '3. Asset Sensitivity',
      text: 'Bubbles are tailored to the specific morphology of each asset. For humans, the system is optimized for ISO/TS 15066 safety thresholds.',
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: '4. Hive Redundancy',
      text: 'Combining humanoid vision with existing data sources creates a high-confidence spatial map, minimizing safety zones to keep work moving.',
    },
    {
      icon: <Ghost className="w-8 h-8" />,
      title: '5. Ghost Assets',
      text: "Tracks moving machines that aren't broadcasting data. Using humanoid vision, the system projects safety bubbles over untracked equipment automatically.",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: '6. Real-Time Dynamics',
      text: 'As conditions change, the system adjusts safety parameters dynamically, keeping the workspace secure without requiring manual resets.',
    },
  ];

  return (
    <section id="volumes" className="py-40 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mb-24">
          <span className="tech-label text-primary">Spatial Logic</span>
          <h2 className="text-5xl font-headline font-bold leading-tight mt-4">
            Dynamic Spatial Awareness.
          </h2>
          <p className="text-slate-500 text-lg mt-6">
            SafeHive calculates protective bubbles for every asset every 10ms, ensuring deterministic safety without physical fences.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-slate-50 p-10 space-y-8 group transition-all border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1"
            >
              <div className="text-primary p-4 bg-primary/5 inline-block rounded-sm transition-transform group-hover:scale-110 shadow-sm border border-primary/10">
                {feature.icon}
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-headline font-bold">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed text-xs font-medium">{feature.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

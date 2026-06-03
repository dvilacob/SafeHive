'use client';

import { Ruler, Gauge, Activity, ShieldAlert, Ghost } from 'lucide-react';

export function SafetyVolumes() {
  const features = [
    {
      icon: <Ruler className="w-8 h-8" />,
      title: '1. Proximity',
      text: 'The closer an object gets, the more the system restricts movement. Safety volumes dynamically scale based on real-time distance—expanding into a larger protective buffer as objects approach each other.',
    },
    {
      icon: <Gauge className="w-8 h-8" />,
      title: '2. Speed',
      text: 'Safety volume is a function of velocity. The faster a machine moves, the larger the protective bubble required to guarantee a safe stop. This ensures a safe separation distance for all parties involved.',
    },
    {
      icon: <ShieldAlert className="w-8 h-8" />,
      title: '3. Body Volumes Sensitivity',
      text: 'Configure a master safety volume split into independent body-part sub-volumes (e.g., higher sensitivity for fast hands, lower for the torso). For human proximity, these zones automatically enforce ISO/TS 15066 Power and Force Limiting (PFL) profiles, ensuring potential impact forces never exceed regulated safety thresholds.',
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: '4. Redundancy (The Hive)',
      text: 'Position confidence dictates the volume footprint. Redundant tracking from multiple sources utilizing native humanoid vision paired with ceiling access points builds a high-certainty spatial model. More sources = higher confidence = smaller, tighter safety volumes.',
    },
    {
      icon: <Ghost className="w-8 h-8" />,
      title: '5. Ghost Assets',
      text: 'Generates dynamic ghost volumes over blind assets by processing vision data from the humanoid hive. Cross-referencing this data via black-channel communication projects a real-time safety shield to throttle legacy equipment without rewiring.',
    },
  ];

  return (
    <section id="volumes" className="py-40 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mb-24">
          <span className="tech-label text-primary">Spatial Logic</span>
          <h2 className="text-5xl font-headline font-bold leading-tight mt-4">
            Real-Time Safety Dynamic Volumes.
          </h2>
          <p className="text-slate-500 text-lg mt-6">
            The spatial grid calculates safety shells for every asset every 10ms, ensuring deterministic
            protection without the constraints of physical barriers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
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

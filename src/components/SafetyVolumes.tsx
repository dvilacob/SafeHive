"use client"

import { Ruler, Gauge, Activity } from "lucide-react";

export function SafetyVolumes() {
  const features = [
    {
      icon: <Ruler className="w-8 h-8" />,
      title: "1. Proximity",
      text: "The closer an object gets, the more the system restricts movement. Safety volumes dynamically scale based on real-time distance—expanding into a larger protective buffer as objects approach each other."
    },
    {
      icon: <Gauge className="w-8 h-8" />,
      title: "2. Speed",
      text: "Safety volume is a function of velocity. The faster a machine moves, the larger the protective bubble required to guarantee a safe stop. This ensures a safe separation distance for all parties involved."
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: "3. Certainty (The Hive)",
      text: "Position confidence dictates the volume footprint. Redundant tracking from multiple onboard humanoid cameras (NVIDIA/YOLO) and smart wearable trackers builds a high-certainty spatial model. More sources = higher confidence = smaller, tighter safety volumes."
    }
  ];

  return (
    <section id="volumes" className="py-40 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mb-24">
          <span className="tech-label text-primary">Spatial Logic</span>
          <h2 className="text-5xl font-headline font-bold leading-tight mt-4">Real-Time Volumetric Logic.</h2>
          <p className="text-slate-500 text-lg mt-6">
            The spatial grid calculates safety shells for every asset every 10ms, ensuring deterministic protection without the constraints of physical barriers.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-px bg-slate-100 border border-slate-100">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white p-12 space-y-8 group transition-colors hover:bg-slate-50">
              <div className="text-primary p-4 bg-primary/5 inline-block rounded-sm transition-transform group-hover:scale-110">
                {feature.icon}
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-headline font-bold">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">
                  {feature.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
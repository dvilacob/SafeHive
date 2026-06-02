"use client"

import { Ruler, Gauge, Share2, Sparkles } from "lucide-react";

export function SafetyVolumes() {
  const features = [
    {
      icon: <Ruler className="w-8 h-8" />,
      title: "1. Proximity",
      text: "The closer an object gets, the more the system restricts movement. Our safety volumes dynamically scale based on real-time distance—expanding into a larger protective buffer as objects get closer to one another."
    },
    {
      icon: <Gauge className="w-8 h-8" />,
      title: "2. Speed",
      text: "Safety volume is a direct function of velocity. The faster a machine moves, the larger its and the others' protective bubbles expand to guarantee a safe stopping distance for all parties involved."
    },
    {
      icon: <Share2 className="w-8 h-8" />,
      title: "3. Redundancy (The Hive)",
      text: "Confidence comes from redundancy. The number of active sources reporting positions increases system certainty. More sources = higher confidence = smaller, tighter safety volumes."
    }
  ];

  return (
    <section id="volumes" className="py-40 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-4 sticky top-32 space-y-6">
            <span className="tech-label">Spatial Logic</span>
            <h2 className="text-5xl font-headline font-bold leading-tight">The Integrated Safety Standard</h2>
            <p className="text-slate-500 text-lg">
              Dynamic safety infrastructure powered by safety-rated communication protocols and real-time mesh positioning.
            </p>
          </div>

          <div className="lg:col-span-8 space-y-12">
            <div className="grid gap-1">
              {features.map((feature, idx) => (
                <div key={idx} className="group relative p-12 bg-slate-50 border border-slate-100 hover:bg-white hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
                  <div className="flex gap-10 items-start">
                    <div className="text-primary opacity-20 group-hover:opacity-100 transition-opacity">
                      {feature.icon}
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-2xl font-headline font-bold">{feature.title}</h3>
                      <p className="text-slate-500 leading-relaxed max-w-xl">
                        {feature.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-12 border-2 border-dashed border-primary/20 bg-primary/[0.02] space-y-6 relative overflow-hidden group">
              <div className="flex items-center gap-4">
                <Sparkles size={24} className="text-primary" />
                <h4 className="text-xl font-headline font-bold">The Roadmap: Pure Algorithmic Awareness</h4>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed max-w-2xl">
                While we currently utilize safety-rated Mobile Adapter Nodes for legacy equipment and Smart Vests for human tracking, these are interim solutions. As our deterministic recognition algorithms evolve, the hardware burden will vanish, leaving only the native communication integrated within your humanoid fleet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
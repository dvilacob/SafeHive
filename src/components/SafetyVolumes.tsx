"use client"

import { Ruler, Gauge, Share2, Sparkles } from "lucide-react";

export function SafetyVolumes() {
  const features = [
    {
      icon: <Ruler className="w-8 h-8 text-primary" />,
      title: "1. Proximity",
      text: "The closer an object gets, the more the system restricts movement. Our safety volumes dynamically scale based on real-time distance—expanding into a larger protective buffer as objects get closer to one another."
    },
    {
      icon: <Gauge className="w-8 h-8 text-primary" />,
      title: "2. Speed",
      text: "Safety volume is a direct function of velocity. The faster a machine moves, the larger its and the others' protective bubbles expand to guarantee a safe stopping distance for all parties involved."
    },
    {
      icon: <Share2 className="w-8 h-8 text-primary" />,
      title: "3. Redundancy (The Hive)",
      text: "Confidence comes from redundancy. The number of active sources reporting positions increases system certainty. More sources = higher confidence = smaller, tighter safety volumes."
    }
  ];

  return (
    <section id="volumes" className="py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-headline font-bold text-slate-900">The Integrated Safety Standard</h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Dynamic safety infrastructure powered by safety-rated communication protocols and real-time mesh positioning.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-stretch mb-24">
          {features.map((feature, idx) => (
            <div key={idx} className="p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 flex flex-col items-center text-center md:items-start md:text-left transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 duration-300">
              <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center border border-slate-100 shadow-sm mb-8">
                {feature.icon}
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-headline font-bold text-slate-900">{feature.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {feature.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Roadmap Insight */}
        <div className="max-w-4xl mx-auto p-10 rounded-[2.5rem] bg-primary/5 border border-primary/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl -z-10 group-hover:bg-primary/10 transition-colors" />
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-16 h-16 shrink-0 bg-white rounded-2xl flex items-center justify-center shadow-sm text-primary">
              <Sparkles size={32} />
            </div>
            <div className="space-y-4">
              <h4 className="text-xl font-headline font-bold text-slate-900">The Roadmap: Pure Algorithmic Awareness</h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                While we currently utilize safety-rated Mobile Adapter Nodes for legacy equipment and Smart Vests for human tracking, these are interim solutions. As our deterministic recognition algorithms evolve, the hardware burden will vanish, leaving only the native communication integrated within your humanoid fleet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

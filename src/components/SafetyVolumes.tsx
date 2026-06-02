"use client"

import { Ruler, Gauge, Share2 } from "lucide-react";

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
      text: "Safety volume is a direct function of velocity. The faster a machine or humanoid moves, the larger its protective bubble expands to guarantee a safe stopping distance."
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
          <h2 className="text-4xl lg:text-5xl font-headline font-bold text-slate-900">How Safety Volumes Work</h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Our deterministic logic replaces static fences with adaptive shells that move with your assets.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-16 lg:gap-24 items-start">
          {features.map((feature, idx) => (
            <div key={idx} className="space-y-8 flex flex-col items-center text-center md:items-start md:text-left">
              <div className="w-20 h-20 rounded-3xl bg-slate-50 flex items-center justify-center border border-slate-100 shadow-sm transition-transform hover:scale-105 duration-300">
                {feature.icon}
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-headline font-bold text-slate-900">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed">
                  {feature.text}
                </p>
                {idx === 2 && (
                  <div className="mt-8 p-6 rounded-2xl bg-primary/5 border border-primary/10 text-sm text-primary font-medium leading-relaxed italic">
                    "Our patented system creates unmatched redundancy through a 'Hive' of robots sharing onboard camera sensor data. Read the next section to see how it works live."
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
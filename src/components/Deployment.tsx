
"use client"

import { Power, Map, Unlink, Lock, ShieldCheck } from "lucide-react";

export function Deployment() {
  const steps = [
    {
      icon: <Power className="w-8 h-8 lg:w-10 lg:h-10" />,
      title: "Power On",
      body: "Mount the Control Hub enclosure and initialize system power."
    },
    {
      icon: <Map className="w-8 h-8 lg:w-10 lg:h-10" />,
      title: "Map Coverage",
      body: "Position Perimeter Access Points (APs) to anchor the spatial grid."
    },
    {
      icon: <Unlink className="w-8 h-8 lg:w-10 lg:h-10" />,
      title: "Connect Sources",
      body: "Securely pair all available data sources—including humanoids, external cameras, safety sensors, and auxiliary information feeds—directly to the Hive over-the-air."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 lg:w-10 lg:h-10" />,
      title: "Profiles Sensitivity",
      body: "Assign specific sensitivity profiles based on the morphology and mechanical weaknesses of each asset. For human interaction areas, the system automatically applies ISO/TS 15066 safety limits to protect vulnerable body parts."
    },
    {
      icon: <Lock className="w-8 h-8 lg:w-10 lg:h-10" />,
      title: "Lock Logic",
      body: "Run the automated grid heartbeat check and lock safety profiles."
    }
  ];

  return (
    <section id="deployment" className="py-20 lg:py-40 bg-slate-50 border-y border-slate-100">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mb-12 lg:mb-24 space-y-4">
          <span className="tech-label">Implementation</span>
          <h2 className="text-3xl lg:text-5xl font-headline font-bold">Zero Rewiring Deployment.</h2>
          <p className="text-slate-500 text-base lg:text-lg">Five steps from installation to a deterministic spatial safety grid.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-1 shadow-2xl shadow-slate-200">
          {steps.map((step, idx) => (
            <div key={idx} className="relative bg-white p-8 lg:p-12 border border-slate-100 group hover:bg-primary transition-colors duration-500">
              <div className="space-y-8 lg:space-y-12">
                <div className="flex justify-between items-start">
                  <span className="font-mono text-3xl lg:text-4xl font-bold opacity-10 group-hover:opacity-20 transition-opacity">0{idx + 1}</span>
                  <div className="text-primary group-hover:text-white transition-colors">{step.icon}</div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg lg:text-xl font-headline font-bold group-hover:text-white transition-colors uppercase tracking-widest">{step.title}</h3>
                  <p className="text-xs lg:text-sm text-slate-500 leading-relaxed group-hover:text-white/80 transition-colors">{step.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

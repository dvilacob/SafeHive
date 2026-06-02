"use client"

import { Power, Map, Link2, Unlink, Lock } from "lucide-react";

export function Deployment() {
  const steps = [
    {
      icon: <Power className="w-6 h-6" />,
      title: "Power On",
      body: "Mount the Hub enclosure to the wall and turn it on."
    },
    {
      icon: <Map className="w-6 h-6" />,
      title: "Map Coverage",
      body: "Position overhead APs to establish your wireless safety grid."
    },
    {
      icon: <Unlink className="w-6 h-6" />,
      title: "Connect Assets",
      body: "Equip legacy machines with nodes and workers with vests."
    },
    {
      icon: <Link2 className="w-6 h-6" />,
      title: "Link Hive",
      body: "Use the browser-based tool to pair devices over the air."
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Lock Configuration",
      body: "Set profiles, run the heartbeat check, and lock the system."
    }
  ];

  return (
    <section id="deployment" className="py-32 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-headline font-bold text-slate-900">How It Works</h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">Zero coding. Zero rewiring. Just Five Steps to Absolute Safety.</p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute top-10 left-0 w-full h-0.5 bg-slate-200 hidden lg:block" />
          
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="relative group text-center lg:text-left">
                <div className="flex flex-col items-center lg:items-start space-y-8">
                  <div className="w-20 h-20 rounded-full bg-white border-4 border-slate-50 flex items-center justify-center text-primary shadow-lg z-10 group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>
                  <div className="space-y-3 px-4 lg:px-0">
                    <div className="text-primary font-bold text-[10px] uppercase tracking-[0.2em]">Step 0{idx + 1}</div>
                    <h3 className="text-xl font-headline font-bold text-slate-900">{step.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{step.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
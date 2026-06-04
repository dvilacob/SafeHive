
"use client"

import { Power, LayoutGrid, Eye, Lock, ShieldCheck } from "lucide-react";

export function Deployment() {
  const steps = [
    {
      icon: <Power className="w-8 h-8 lg:w-10 lg:h-10" />,
      title: "Mount the Hub",
      body: "Secure the Control Hub and power the system."
    },
    {
      icon: <LayoutGrid className="w-8 h-8 lg:w-10 lg:h-10" />,
      title: "Anchor the Grid",
      body: "Position Access Points to define your safety area."
    },
    {
      icon: <Eye className="w-8 h-8 lg:w-10 lg:h-10" />,
      title: "Sync the Vision",
      body: "Wirelessly pair your cameras and humanoids."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 lg:w-10 lg:h-10" />,
      title: "Profile the Assets",
      body: "Assign safety sensitivities based on who is in the room."
    },
    {
      icon: <Lock className="w-8 h-8 lg:w-10 lg:h-10" />,
      title: "Lock & Protect",
      body: "Check the grid heartbeat and go live."
    }
  ];

  return (
    <section id="deployment" className="py-20 lg:py-40 bg-slate-50 border-y border-slate-100">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mb-12 lg:mb-24 space-y-4">
          <h2 className="text-3xl lg:text-5xl font-headline font-bold text-slate-900 tracking-tight">Activate Your Spatial Safety Grid.</h2>
          <p className="text-slate-500 text-base lg:text-lg">Five steps to activate your spatial Safety grid</p>
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

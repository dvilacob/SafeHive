"use client"

import { Ruler, Gauge, Activity, Shield, Zap, Navigation } from "lucide-react";

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

  const anatomyZones = [
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Torso & Core Module",
      desc: "Houses the primary global proximity shell. Maintains the master center-of-mass safety state."
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Articulated Arms & End-Effectors",
      desc: "Project fast-reacting, localized directional safety bubbles that track velocity vectors during manipulation tasks."
    },
    {
      icon: <Navigation className="w-5 h-5" />,
      title: "Mobile Base/Legs",
      desc: "Projects wide, forward-facing tracking cones that adjust dynamically based on travel velocity and braking distance."
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

        <div className="grid lg:grid-cols-3 gap-8 mb-32">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-slate-50 p-12 space-y-8 group transition-all border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1">
              <div className="text-primary p-4 bg-primary/5 inline-block rounded-sm transition-transform group-hover:scale-110 shadow-sm border border-primary/10">
                {feature.icon}
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-headline font-bold">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm font-medium">
                  {feature.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Distributed Anatomy Visual */}
        <div className="max-w-7xl mx-auto border-t border-slate-100 pt-32">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
              <div className="space-y-4">
                <span className="tech-label text-primary">Distributed Safety Architecture</span>
                <h2 className="text-4xl font-headline font-bold">Body-Part Independent Volumes.</h2>
                <p className="text-slate-500 text-lg leading-relaxed">
                  Unlike traditional systems that treat a humanoid as a single static block, SafeHive calculates independent directional vectors for every major kinematic joint.
                </p>
              </div>

              <div className="space-y-8">
                {anatomyZones.map((zone, i) => (
                  <div key={i} className="flex gap-6 items-start p-6 bg-slate-50 border border-slate-100 group hover:bg-white hover:border-primary/20 transition-all">
                    <div className="p-3 bg-white text-primary border border-slate-100 shadow-sm group-hover:scale-110 transition-transform">
                      {zone.icon}
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-headline font-bold text-slate-900">{zone.title}</h4>
                      <p className="text-sm text-slate-500 leading-relaxed font-medium">{zone.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative aspect-square bg-slate-900 overflow-hidden flex items-center justify-center p-12">
              <div className="absolute inset-0 bg-blueprint opacity-10" />
              
              {/* Simplified Humanoid Schematic Representation */}
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Arms Bubbles */}
                <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full border border-sky-400/30 bg-sky-400/5 animate-pulse-glow" />
                <div className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full border border-sky-400/30 bg-sky-400/5 animate-pulse-glow" />
                
                {/* Torso Shell */}
                <div className="absolute top-1/3 w-48 h-64 border-2 border-primary/50 bg-primary/5 rounded-3xl" />
                
                {/* Leg Tracking Cones */}
                <div className="absolute bottom-1/4 left-1/3 w-16 h-32 bg-gradient-to-t from-primary/20 to-transparent skew-x-12" />
                <div className="absolute bottom-1/4 right-1/3 w-16 h-32 bg-gradient-to-t from-primary/20 to-transparent -skew-x-12" />

                <div className="relative z-10 font-mono text-[9px] text-primary/70 font-bold space-y-4 text-center">
                   <div className="p-2 border border-primary/20 bg-black/50 backdrop-blur-sm">END-EFFECTOR VECTOR [ACTIVE]</div>
                   <div className="p-2 border border-primary/20 bg-black/50 backdrop-blur-sm">CORE PROXIMITY [SIL 3]</div>
                   <div className="p-2 border border-primary/20 bg-black/50 backdrop-blur-sm">KINEMATIC BRAKING ZONE</div>
                </div>
              </div>

              {/* Technical Callout Labels */}
              <div className="absolute top-12 right-12 text-[10px] font-mono text-white/50 space-y-1 text-right">
                <div>SYSTEM: HIVE-OS v2.4</div>
                <div className="text-primary">MODE: SSM (SPEED & SEPARATION)</div>
                <div>CERT: ISO/TS 15066</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

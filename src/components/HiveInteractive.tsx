"use client"

import { useState, useMemo } from 'react';
import { Slider } from "@/components/ui/slider";
import { Bot, Activity, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export function HiveInteractive() {
  const [redundancy, setRedundancy] = useState(3);
  const [speed, setSpeed] = useState(500); // mm/s
  const [proximity, setProximity] = useState(150); // mm distance

  const state = useMemo(() => {
    // Redundancy constraint logic
    const isCollabEnabled = redundancy >= 3;
    const isSafeCrawlActive = redundancy <= 2;
    
    // Effective speed capped during Fallback
    const effectiveSpeed = isSafeCrawlActive ? Math.min(speed, 250) : speed;
    
    const speedFactor = effectiveSpeed / 1000; 
    const confidenceFactor = 150 / Math.max(1, redundancy);

    const baseScale = 0.8;
    const protectiveRadius = (60 + confidenceFactor) * (1 + speedFactor) * baseScale;
    const collabRadius = isCollabEnabled ? (protectiveRadius + 50 * (1 + speedFactor) * baseScale) : 0;
    const warningRadius = (isCollabEnabled ? collabRadius : protectiveRadius) + 60 * (1 + speedFactor) * baseScale;

    let currentZone = "OUTSIDE";
    if (proximity < protectiveRadius) {
      currentZone = "PROTECTIVE";
    } else if (isCollabEnabled && proximity < collabRadius) {
      currentZone = "COLLABORATIVE";
    } else if (proximity < warningRadius) {
      currentZone = "WARNING";
    }

    // Performance Level (PL) logic based on redundancy
    let badgeText = "PLd Cat 2 (Standard)";
    let badgeColor = "text-primary border-primary bg-primary/5";
    let statusDesc = "Optimized dynamic proximity footprint in mm";

    if (redundancy <= 2) {
      badgeText = "PLb Cat 1 (Low Confidence)";
      badgeColor = "text-red-500 border-red-500 bg-red-50";
      statusDesc = "System enforces a macro fallback proximity buffer in mm, forcing a safe-crawl state under 250mm/s";
    } else if (redundancy === 5) {
      badgeText = "PLd Cat 3 (Deterministic Certainty)";
      badgeColor = "text-emerald-600 border-emerald-600 bg-emerald-50";
      statusDesc = "Minimum footprint in mm optimized tightly to the physical asset boundaries";
    }

    return {
      currentZone,
      badgeText,
      badgeColor,
      statusDesc,
      isCollabEnabled,
      isSafeCrawlActive,
      effectiveSpeed,
      radii: {
        warning: warningRadius,
        collaborative: collabRadius,
        protective: protectiveRadius
      }
    };
  }, [redundancy, speed, proximity]);

  return (
    <section id="hive" className="py-40 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mb-24">
          <span className="tech-label text-primary">Simulation Engine</span>
          <h2 className="text-5xl font-headline font-bold text-slate-900 leading-tight mt-4">The Hive Engine & Fallback States.</h2>
          <p className="text-slate-500 text-lg mt-6 font-medium">
            Observe how spatial confidence dictates behavior in real-time. The system calculates physical safety volumes every 10ms based on real-time redundancy and kinematics.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 max-w-7xl mx-auto items-stretch">
          <div className="lg:col-span-8 flex flex-col gap-8">
            <div className="bg-slate-50 border border-slate-100 p-8 md:p-12 space-y-12 flex-1 relative overflow-hidden flex flex-col justify-center min-h-[600px]">
               <div className="absolute top-8 left-8 z-30 flex flex-col gap-2">
                 <div className={cn("px-4 py-1.5 font-mono text-[10px] font-bold border rounded-full uppercase tracking-widest transition-all w-fit shadow-sm", state.badgeColor)}>
                   {state.badgeText}
                 </div>
                 <div className="text-[10px] font-bold text-slate-400 max-w-[200px] leading-tight mt-1 uppercase tracking-widest">
                   {state.statusDesc}
                 </div>
               </div>

               <div className="relative flex items-center justify-center h-full min-h-[300px]">
                  <div className="absolute inset-0 bg-blueprint-fine opacity-30" />
                  
                  <div className="relative flex items-center justify-center">
                    <div className="absolute rounded-full border border-sky-400/30 bg-sky-400/5 transition-all duration-300"
                      style={{ width: state.radii.warning * 2, height: state.radii.warning * 2 }} />
                    {state.isCollabEnabled && (
                      <div className="absolute rounded-full border border-yellow-400/30 bg-yellow-400/5 transition-all duration-300"
                        style={{ width: state.radii.collaborative * 2, height: state.radii.collaborative * 2 }} />
                    )}
                    <div className={cn("absolute rounded-full border border-red-500/30 bg-red-500/5 transition-all duration-300", state.currentZone === "PROTECTIVE" && "border-red-500/50 bg-red-500/10 animate-pulse")}
                      style={{ width: state.radii.protective * 2, height: state.radii.protective * 2 }} />

                    <div className="relative z-10">
                      <div className="w-16 h-16 bg-slate-900 text-white rounded-sm flex items-center justify-center flex-col gap-1 border border-white/10 shadow-xl">
                        <Bot size={24} />
                        <span className="text-[8px] font-bold uppercase opacity-50">Humanoid</span>
                      </div>
                    </div>

                    <div className="absolute z-20 transition-all duration-300 flex flex-col items-center gap-1"
                      style={{ transform: `translateX(${proximity}px)` }}>
                      <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center shadow-lg">
                        <Activity size={20} />
                      </div>
                      <span className="text-[8px] font-bold uppercase text-primary">Worker</span>
                    </div>
                  </div>
               </div>

               <div className="space-y-10 max-w-xl mx-auto relative z-30 bg-white/95 p-6 md:p-8 border shadow-xl rounded-sm">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <label className="tech-label text-slate-900">Active Reporting Sources</label>
                        <span className="text-sm font-bold text-primary">{redundancy} SOURCES</span>
                      </div>
                      <Slider value={[redundancy]} onValueChange={(v) => setRedundancy(v[0])} max={5} min={1} step={1} />
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <label className="tech-label text-slate-900">System Velocity</label>
                        <span className={cn("text-sm font-bold text-primary", state.isSafeCrawlActive && "text-red-500")}>
                          {state.effectiveSpeed} mm/s {state.isSafeCrawlActive && "(CAPPED)"}
                        </span>
                      </div>
                      <Slider value={[speed]} onValueChange={(v) => setSpeed(v[0])} max={1500} min={100} step={50} />
                    </div>
                  </div>
                  
                  <div className="space-y-4 max-w-sm mx-auto">
                    <div className="flex justify-between items-center">
                      <label className="tech-label text-slate-900">Worker Proximity</label>
                      <span className="text-sm font-bold text-primary">{proximity} mm</span>
                    </div>
                    <Slider value={[proximity]} onValueChange={(v) => setProximity(v[0])} max={300} min={10} step={5} />
                  </div>
               </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-slate-900 text-white p-8 md:p-12 flex flex-col justify-between border border-slate-800 shadow-2xl">
            <div className="space-y-8">
              <h3 className="text-xl font-headline font-bold italic text-white tracking-widest pb-6 border-b border-white/10 uppercase">
                HUMANOID-01 BEHAVIOR MAP
              </h3>

              <div className="space-y-4">
                {[
                  { id: 'WARNING', label: 'Warning Shell (Outer)', action: 'Nominal speed maintained (Optional 10% speed reduction command sent based on trajectory).', color: 'text-sky-400' },
                  { id: 'COLLABORATIVE', label: 'Collaborative Shell (Middle)', action: 'System overrides and dynamically broadcasts a regulated safe speed command (<250mm/s) directly to the asset\'s control loop, restricting joint torque for co-working.', color: 'text-yellow-400', disabled: !state.isCollabEnabled },
                  { id: 'PROTECTIVE', label: 'Protective Shell (Inner)', action: 'System issues an immediate, fail-safe hardware brake command via safety-rated black-channel communication.', color: 'text-red-500' }
                ].map((zone) => (
                  <div key={zone.id} className={cn("space-y-3 p-6 border transition-all duration-500 rounded-sm",
                      state.currentZone === zone.id ? "bg-white/10 border-white/30 scale-[1.02] shadow-xl" : "bg-white/5 border-white/5 opacity-40",
                      zone.disabled && "hidden")}>
                    <div className="flex items-center gap-3">
                      <div className={cn("w-2 h-2 rounded-full", zone.color.replace('text', 'bg'))} />
                      <span className={cn("font-bold text-xs uppercase tracking-widest", zone.color)}>{zone.label}</span>
                    </div>
                    <p className="text-sm text-slate-400 font-medium leading-relaxed">{zone.action}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-white/10 space-y-4">
               <div className="p-4 bg-primary/10 border border-primary/20 flex flex-col gap-2 rounded-sm">
                  <div className="flex gap-2 items-center">
                    <ShieldCheck className="text-primary" size={16} />
                    <span className="text-[10px] text-primary font-bold uppercase tracking-widest">Deterministic Safety Logic</span>
                  </div>
                  <div className="text-lg font-headline font-bold tracking-tight text-white italic">
                    (Vh + Vr) x Tr + T_stop + C
                  </div>
                  <div className="text-[9px] text-slate-400 font-medium leading-relaxed mt-2 uppercase tracking-widest">
                    The safety loop is evaluated locally at the asset level using cross-referenced spatial data from the hive mind.
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

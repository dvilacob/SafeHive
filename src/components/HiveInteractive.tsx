"use client"

import { useState, useMemo } from 'react';
import { Slider } from "@/components/ui/slider";
import { Bot, Activity, AlertCircle, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

export function HiveInteractive() {
  const [redundancy, setRedundancy] = useState(3);
  const [speed, setSpeed] = useState(500); // mm/s
  const [proximity, setProximity] = useState(1000); // mm distance

  const state = useMemo(() => {
    // Logic based on requirements:
    // If redundancy < 2, Collaborative zone is disabled (system treats it as a gap between warning and protective).
    const isCollabEnabled = redundancy >= 2;
    
    // Volume base sizes grow with speed (S = v*t + d_stop)
    // Here we use speed to scale the overall shell multipliers
    const speedMultiplier = 1 + (speed / 1000); 
    
    // Confidence Factor (C) based on redundancy (Inverse)
    const confidenceFactor = 100 / Math.max(1, redundancy);

    // Shell thresholds (visual radius in px)
    const protectiveRadius = (100 + confidenceFactor) * speedMultiplier;
    const collabRadius = isCollabEnabled ? (protectiveRadius + 80 * speedMultiplier) : 0;
    const warningRadius = (isCollabEnabled ? collabRadius : protectiveRadius) + 100 * speedMultiplier;

    // Determine current state based on proximity
    let currentZone = "OUTSIDE";
    if (proximity < protectiveRadius) {
      currentZone = "PROTECTIVE";
    } else if (isCollabEnabled && proximity < collabRadius) {
      currentZone = "COLLABORATIVE";
    } else if (proximity < warningRadius) {
      currentZone = "WARNING";
    }

    // Badge mapping
    let badgeText = "PLd Cat 2 (Standard)";
    let badgeColor = "text-primary border-primary bg-primary/5";
    if (redundancy < 2) {
      badgeText = "PLb Cat 1 (Low Confidence)";
      badgeColor = "text-red-500 border-red-500 bg-red-50";
    } else if (redundancy === 5) {
      badgeText = "PLd Cat 3 (High Confidence)";
      badgeColor = "text-emerald-600 border-emerald-600 bg-emerald-50";
    }

    return {
      currentZone,
      badgeText,
      badgeColor,
      isCollabEnabled,
      radii: {
        warning: warningRadius,
        collaborative: collabRadius,
        protective: protectiveRadius
      }
    };
  }, [redundancy, speed, proximity]);

  return (
    <section id="hive" className="py-40 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mb-24">
          <span className="tech-label text-primary">Simulation Engine</span>
          <h2 className="text-5xl font-headline font-bold text-slate-900 leading-tight mt-4">The Hive Engine & Fallback States.</h2>
          <p className="text-slate-500 text-lg mt-6">
            Observe how position confidence dictates the safety volume footprint. Adjust reporting sources to see real-time state transitions.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 max-w-7xl mx-auto items-stretch">
          <div className="lg:col-span-8 flex flex-col gap-8">
            <div className="bg-slate-50 border border-slate-100 p-12 space-y-12 flex-1 relative overflow-hidden flex flex-col justify-center">
               <div className="absolute top-8 left-8 z-20">
                 <div className={cn("px-4 py-1.5 font-mono text-[10px] font-bold border rounded-full uppercase tracking-widest transition-all", state.badgeColor)}>
                   {state.badgeText}
                 </div>
               </div>

               <div className="relative flex items-center justify-center h-[500px]">
                  <div className="absolute inset-0 bg-blueprint-fine opacity-30" />
                  
                  {/* Dynamic Shells */}
                  <div className="relative flex items-center justify-center">
                    <div 
                      className="absolute rounded-full border border-sky-400/20 bg-sky-400/5 transition-all duration-300"
                      style={{ width: state.radii.warning * 2, height: state.radii.warning * 2 }}
                    />
                    {state.isCollabEnabled && (
                      <div 
                        className="absolute rounded-full border border-yellow-400/20 bg-yellow-400/5 transition-all duration-300"
                        style={{ width: state.radii.collaborative * 2, height: state.radii.collaborative * 2 }}
                      />
                    )}
                    <div 
                      className={cn("absolute rounded-full border border-red-500/20 bg-red-500/5 transition-all duration-300", state.currentZone === "PROTECTIVE" && "border-red-500/40 bg-red-500/10 animate-pulse")}
                      style={{ width: state.radii.protective * 2, height: state.radii.protective * 2 }}
                    />

                    {/* Robot Asset */}
                    <div className="relative z-10">
                      <div className="w-16 h-16 bg-slate-900 text-white rounded-sm flex items-center justify-center flex-col gap-1 border border-white/10">
                        <Bot size={24} />
                        <span className="text-[8px] font-bold uppercase opacity-50">Humanoid</span>
                      </div>
                    </div>

                    {/* Moving Worker Asset */}
                    <div 
                      className="absolute z-20 transition-all duration-300 flex flex-col items-center gap-1"
                      style={{ transform: `translateX(${proximity}px)` }}
                    >
                      <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center shadow-lg">
                        <Activity size={20} />
                      </div>
                      <span className="text-[8px] font-bold uppercase text-primary">Worker</span>
                    </div>
                  </div>
               </div>

               <div className="space-y-10 max-w-xl mx-auto relative z-20 bg-white/80 p-8 border backdrop-blur">
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <label className="tech-label text-slate-900">Redundancy (Sources)</label>
                        <span className="text-sm font-bold text-primary italic">{redundancy}</span>
                      </div>
                      <Slider value={[redundancy]} onValueChange={(v) => setRedundancy(v[0])} max={5} min={1} step={1} />
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <label className="tech-label text-slate-900">Velocity (v)</label>
                        <span className="text-sm font-bold text-primary italic">{speed} mm/s</span>
                      </div>
                      <Slider value={[speed]} onValueChange={(v) => setSpeed(v[0])} max={1500} min={100} step={50} />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="tech-label text-slate-900">Proximity (Worker Distance)</label>
                      <span className="text-sm font-bold text-primary italic">{proximity} mm</span>
                    </div>
                    <Slider value={[proximity]} onValueChange={(v) => setProximity(v[0])} max={600} min={50} step={10} />
                  </div>
               </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-slate-900 text-white p-12 flex flex-col justify-between border border-slate-800 shadow-2xl">
            <div className="space-y-12">
              <div className="flex justify-between items-center border-b border-white/10 pb-6">
                <h3 className="text-xl font-headline font-bold flex items-center gap-3 italic">
                  <Terminal size={20} className="text-primary" />
                  HUMANOID-01 BEHAVIOR MAP
                </h3>
              </div>

              <div className="space-y-8">
                {[
                  { id: 'WARNING', label: 'Warning Shell (Outer)', action: 'Trigger haptic vibration alert on human vest. Nominal speed maintained.', color: 'text-sky-400' },
                  { id: 'COLLABORATIVE', label: 'Collaborative Shell (Middle)', action: 'Assets drop to safe speed (<250mm/s) and restrict joint torque.', color: 'text-yellow-400', disabled: !state.isCollabEnabled },
                  { id: 'PROTECTIVE', label: 'Protective Shell (Inner)', action: 'Immediate, fail-safe hardware brake engagement via black-channel.', color: 'text-red-500' }
                ].map((zone) => (
                  <div 
                    key={zone.id} 
                    className={cn(
                      "space-y-3 p-6 border transition-all",
                      state.currentZone === zone.id ? "bg-white/10 border-white/20 scale-[1.02]" : "bg-white/5 border-white/5 opacity-50",
                      zone.disabled && "hidden"
                    )}
                  >
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
               <div className="p-4 bg-primary/10 border border-primary/20 flex gap-3 items-start">
                  <AlertCircle className="text-primary shrink-0 mt-0.5" size={16} />
                  <p className="text-[10px] text-primary-foreground/70 font-bold uppercase tracking-widest leading-relaxed">
                    ISO 10218-2 Compliant Logic Active
                  </p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
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
    // Redundancy constraint: If < 2, Collaborative zone is disabled
    const isCollabEnabled = redundancy >= 2;
    
    // ISO/TS 15066 Logic: Speed (v) determines the size of the protective bubble.
    // As requested: The faster a machine/humanoid moves, the larger its and the others' bubbles expand.
    // We use a base scale derived from speed.
    const speedFactor = speed / 1000; 
    
    // Confidence Factor (C) is lower (better) with higher redundancy.
    const confidenceFactor = 150 / Math.max(1, redundancy);

    // Radii in pixels for the visualizer
    const protectiveRadius = (80 + confidenceFactor) * (1 + speedFactor);
    const collabRadius = isCollabEnabled ? (protectiveRadius + 70 * (1 + speedFactor)) : 0;
    const warningRadius = (isCollabEnabled ? collabRadius : protectiveRadius) + 90 * (1 + speedFactor);

    // Current State determination based on Proximity (Slider drives the distance)
    // The proximity value in mm is mapped to visual px relative to center.
    // Note: We use proximity directly to compare with shell boundaries.
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
    if (redundancy < 3) {
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
            Adjust redundancy, velocity, and distance to observe how the spatial grid dictates behavior in real-time.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 max-w-7xl mx-auto items-stretch">
          <div className="lg:col-span-8 flex flex-col gap-8">
            <div className="bg-slate-50 border border-slate-100 p-12 space-y-12 flex-1 relative overflow-hidden flex flex-col justify-center min-h-[600px]">
               <div className="absolute top-8 left-8 z-20">
                 <div className={cn("px-4 py-1.5 font-mono text-[10px] font-bold border rounded-full uppercase tracking-widest transition-all", state.badgeColor)}>
                   {state.badgeText}
                 </div>
               </div>

               <div className="relative flex items-center justify-center h-full">
                  <div className="absolute inset-0 bg-blueprint-fine opacity-30" />
                  
                  {/* Dynamic Shells */}
                  <div className="relative flex items-center justify-center">
                    {/* Warning Shell */}
                    <div 
                      className="absolute rounded-full border border-sky-400/30 bg-sky-400/5 transition-all duration-300"
                      style={{ width: state.radii.warning * 2, height: state.radii.warning * 2 }}
                    />
                    {/* Collaborative Shell */}
                    {state.isCollabEnabled && (
                      <div 
                        className="absolute rounded-full border border-yellow-400/30 bg-yellow-400/5 transition-all duration-300"
                        style={{ width: state.radii.collaborative * 2, height: state.radii.collaborative * 2 }}
                      />
                    )}
                    {/* Protective Shell */}
                    <div 
                      className={cn("absolute rounded-full border border-red-500/30 bg-red-500/5 transition-all duration-300", state.currentZone === "PROTECTIVE" && "border-red-500/50 bg-red-500/10 animate-pulse")}
                      style={{ width: state.radii.protective * 2, height: state.radii.protective * 2 }}
                    />

                    {/* Robot Asset */}
                    <div className="relative z-10">
                      <div className="w-16 h-16 bg-slate-900 text-white rounded-sm flex items-center justify-center flex-col gap-1 border border-white/10 shadow-xl">
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
                      <span className="text-[8px] font-bold uppercase text-primary font-bold">Worker</span>
                    </div>
                  </div>
               </div>

               <div className="space-y-10 max-w-xl mx-auto relative z-20 bg-white/90 p-8 border backdrop-blur-md shadow-lg">
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <label className="tech-label text-slate-900">Hive Redundancy</label>
                        <span className="text-sm font-bold text-primary">{redundancy} Sources</span>
                      </div>
                      <Slider value={[redundancy]} onValueChange={(v) => setRedundancy(v[0])} max={5} min={1} step={1} />
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <label className="tech-label text-slate-900">System Velocity</label>
                        <span className="text-sm font-bold text-primary">{speed} mm/s</span>
                      </div>
                      <Slider value={[speed]} onValueChange={(v) => setSpeed(v[0])} max={1500} min={100} step={50} />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="tech-label text-slate-900">Worker Proximity (Distance)</label>
                      <span className="text-sm font-bold text-primary">{proximity} mm</span>
                    </div>
                    <Slider value={[proximity]} onValueChange={(v) => setProximity(v[0])} max={600} min={20} step={10} />
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

              <div className="space-y-6">
                {[
                  { id: 'WARNING', label: 'Warning Shell (Outer)', action: 'Trigger haptic vibration alert on human vest. Nominal speed maintained.', color: 'text-sky-400' },
                  { id: 'COLLABORATIVE', label: 'Collaborative Shell (Middle)', action: 'Assets drop to safe speed (<250mm/s) and restrict joint torque.', color: 'text-yellow-400', disabled: !state.isCollabEnabled },
                  { id: 'PROTECTIVE', label: 'Protective Shell (Inner)', action: 'Immediate, fail-safe hardware brake engagement via black-channel.', color: 'text-red-500' }
                ].map((zone) => (
                  <div 
                    key={zone.id} 
                    className={cn(
                      "space-y-3 p-6 border transition-all duration-500",
                      state.currentZone === zone.id ? "bg-white/10 border-white/30 scale-[1.02] shadow-xl" : "bg-white/5 border-white/5 opacity-50",
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

                {state.currentZone === "OUTSIDE" && (
                  <div className="p-6 bg-white/5 border border-white/5">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Zone Status: Clear</span>
                    <p className="text-sm text-slate-400 mt-2">No intrusion detected in safety volumes.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-8 border-t border-white/10 space-y-4">
               <div className="p-4 bg-primary/10 border border-primary/20 flex gap-3 items-start rounded-sm">
                  <AlertCircle className="text-primary shrink-0 mt-0.5" size={16} />
                  <p className="text-[10px] text-primary-foreground/70 font-bold uppercase tracking-widest leading-relaxed">
                    Deterministic logic active: (V_H + V_R) × T_R + D_STOP + C
                  </p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client"

import { useState, useMemo } from 'react';
import { Slider } from "@/components/ui/slider";
import { Bot, Activity, AlertCircle, Terminal, ShieldCheck, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export function HiveInteractive() {
  const [redundancy, setRedundancy] = useState(3);
  const [speed, setSpeed] = useState(500); // mm/s
  const [proximity, setProximity] = useState(150); // mm distance (visual px)

  const state = useMemo(() => {
    // Redundancy constraint: If < 2, Collaborative zone is disabled and system enters Safe Crawl fallback
    const isCollabEnabled = redundancy >= 2;
    const isSafeCrawlActive = redundancy === 1;
    
    // Effective speed is capped during Safe Crawl fallback
    const effectiveSpeed = isSafeCrawlActive ? Math.min(speed, 250) : speed;
    
    // ISO/TS 15066 Logic: Speed determines the size of the protective bubble.
    // The faster agents move, the larger ALL protective bubbles expand.
    const speedFactor = effectiveSpeed / 1000; 
    
    // Confidence Factor (C) is lower (better) with higher redundancy.
    // At redundancy 1, C is very high.
    const confidenceFactor = 150 / Math.max(1, redundancy);

    // Radii in pixels for the visualizer (scaled to fit container)
    const baseScale = 0.8;
    const protectiveRadius = (60 + confidenceFactor) * (1 + speedFactor) * baseScale;
    const collabRadius = isCollabEnabled ? (protectiveRadius + 50 * (1 + speedFactor) * baseScale) : 0;
    const warningRadius = (isCollabEnabled ? collabRadius : protectiveRadius) + 60 * (1 + speedFactor) * baseScale;

    // Current State determination based on Proximity
    let currentZone = "OUTSIDE";
    if (proximity < protectiveRadius) {
      currentZone = "PROTECTIVE";
    } else if (isCollabEnabled && proximity < collabRadius) {
      currentZone = "COLLABORATIVE";
    } else if (proximity < warningRadius) {
      currentZone = "WARNING";
    }

    // Performance Level (PL) logic
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
          <p className="text-slate-500 text-lg mt-6">
            Adjust redundancy, velocity, and distance to observe how the spatial grid dictates behavior in real-time. Low redundancy triggers safety-rated fallback modes.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 max-w-7xl mx-auto items-stretch">
          <div className="lg:col-span-8 flex flex-col gap-8">
            <div className="bg-slate-50 border border-slate-100 p-8 md:p-12 space-y-12 flex-1 relative overflow-hidden flex flex-col justify-center min-h-[500px] md:min-h-[600px]">
               <div className="absolute top-8 left-8 z-30 flex flex-col gap-2">
                 <div className={cn("px-4 py-1.5 font-mono text-[10px] font-bold border rounded-full uppercase tracking-widest transition-all w-fit", state.badgeColor)}>
                   {state.badgeText}
                 </div>
                 {state.isSafeCrawlActive && (
                   <div className="px-4 py-1.5 font-mono text-[10px] font-bold border border-red-500 bg-red-500 text-white rounded-full uppercase tracking-widest animate-pulse">
                     FALLBACK: SAFE CRAWL ACTIVE
                   </div>
                 )}
               </div>

               <div className="relative flex items-center justify-center h-full min-h-[300px]">
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

                    {/* Moving Worker Asset - Constrained for visibility */}
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

               <div className="space-y-10 max-w-xl mx-auto relative z-30 bg-white/90 p-6 md:p-8 border backdrop-blur-md shadow-lg rounded-sm">
                  <div className="grid md:grid-cols-2 gap-8">
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
                        <span className={cn("text-sm font-bold text-primary", state.isSafeCrawlActive && "text-red-500")}>
                          {state.effectiveSpeed} mm/s {state.isSafeCrawlActive && "(Capped)"}
                        </span>
                      </div>
                      <Slider value={[speed]} onValueChange={(v) => setSpeed(v[0])} max={1500} min={100} step={50} />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="tech-label text-slate-900">Worker Proximity</label>
                      <span className="text-sm font-bold text-primary">{proximity} mm</span>
                    </div>
                    <Slider value={[proximity]} onValueChange={(v) => setProximity(v[0])} max={300} min={10} step={5} />
                  </div>
               </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-slate-900 text-white p-8 md:p-12 flex flex-col justify-between border border-slate-800 shadow-2xl relative">
            <div className="space-y-12">
              <div className="flex justify-between items-center border-b border-white/10 pb-6">
                <h3 className="text-xl font-headline font-bold flex items-center gap-3 italic">
                  <Terminal size={20} className="text-primary" />
                  HUMANOID-01 BEHAVIOR MAP
                </h3>
              </div>

              <div className="space-y-6">
                {state.isSafeCrawlActive && (
                  <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle size={14} className="text-red-500" />
                      <span className="text-xs font-bold text-red-500 uppercase tracking-widest">Fallback Engaged</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-medium">
                      Certainty Minimal: System automatically enforces a safe-crawl fallback state (&lt;250mm/s) due to low source redundancy.
                    </p>
                  </div>
                )}

                {[
                  { id: 'WARNING', label: 'Warning Shell (Outer)', action: 'Trigger haptic vibration alert on human vest. Nominal speed maintained.', color: 'text-sky-400' },
                  { id: 'COLLABORATIVE', label: 'Collaborative Shell (Middle)', action: 'Assets drop to safe speed (<250mm/s) and restrict joint torque.', color: 'text-yellow-400', disabled: !state.isCollabEnabled },
                  { id: 'PROTECTIVE', label: 'Protective Shell (Inner)', action: 'Immediate, fail-safe hardware brake engagement via black-channel.', color: 'text-red-500' }
                ].map((zone) => (
                  <div 
                    key={zone.id} 
                    className={cn(
                      "space-y-3 p-6 border transition-all duration-500 rounded-sm",
                      state.currentZone === zone.id ? "bg-white/10 border-white/30 scale-[1.02] shadow-xl" : "bg-white/5 border-white/5 opacity-40",
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
                  <div className="p-6 bg-white/5 border border-white/5 rounded-sm">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Zone Status: Clear</span>
                    <p className="text-sm text-slate-400 mt-2">No intrusion detected in safety volumes.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-8 border-t border-white/10 space-y-4">
               <div className="p-4 bg-primary/10 border border-primary/20 flex gap-3 items-start rounded-sm">
                  <ShieldCheck className="text-primary shrink-0 mt-0.5" size={16} />
                  <div className="space-y-1">
                    <p className="text-[10px] text-primary-foreground/70 font-bold uppercase tracking-widest leading-relaxed">
                      Deterministic Safety Logic
                    </p>
                    <p className="text-[9px] font-mono text-slate-500">(V_H + V_R) × T_R + D_STOP + C</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

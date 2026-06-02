"use client"

import { useState, useMemo } from 'react';
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Bot, User, Activity, ShieldCheck, Terminal, AlertCircle, Wifi } from "lucide-react";
import { cn } from "@/lib/utils";

export function HiveInteractive() {
  const [sources, setSources] = useState(3);
  const VIS_SIZE = 400; 

  const state = useMemo(() => {
    const isFallback = sources <= 1;
    const isOptimal = sources === 5;
    
    let statusText = "Standard Operating Mode";
    let badgeText = "PLd Cat 2 (Standard)";
    let badgeColor = "text-primary border-primary bg-primary/5";

    if (isFallback) {
      statusText = "Certainty Minimal: System automatically enforces a safe-crawl fallback state (<250mm/s).";
      badgeText = "Fallback (Safe-Crawl)";
      badgeColor = "text-red-500 border-red-500 bg-red-50";
    } else if (isOptimal) {
      statusText = "Deterministic Certainty: Position confidence verified across entire workspace.";
      badgeText = "PLd Cat 3 (Deterministic Certainty)";
      badgeColor = "text-emerald-600 border-emerald-600 bg-emerald-50";
    }

    const radiusBase = isFallback ? 180 : (160 - sources * 12);
    
    return {
      isFallback,
      isOptimal,
      statusText,
      badgeText,
      badgeColor,
      radii: {
        warning: radiusBase * 1.8,
        collaborative: radiusBase * 1.3,
        protective: radiusBase
      }
    };
  }, [sources]);

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
          {/* Controls & Visualization */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <div className="bg-slate-50 border border-slate-100 p-12 space-y-12 flex-1 relative overflow-hidden">
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
                      className="absolute rounded-full border border-sky-400/20 bg-sky-400/5 transition-all duration-500 ease-in-out"
                      style={{ width: state.radii.warning, height: state.radii.warning }}
                    />
                    <div 
                      className="absolute rounded-full border border-yellow-400/20 bg-yellow-400/5 transition-all duration-500 ease-in-out"
                      style={{ width: state.radii.collaborative, height: state.radii.collaborative }}
                    />
                    <div 
                      className={cn("absolute rounded-full border border-red-500/20 bg-red-500/5 transition-all duration-500 ease-in-out", state.isFallback && "border-red-500/40 bg-red-500/10 animate-pulse")}
                      style={{ width: state.radii.protective, height: state.radii.protective }}
                    />

                    {/* Assets */}
                    <div className="relative z-10 flex gap-12 items-center">
                      <div className="w-16 h-16 bg-slate-900 text-white rounded-sm flex items-center justify-center flex-col gap-1 border border-white/10">
                        <Bot size={24} />
                        <span className="text-[8px] font-bold uppercase opacity-50">Humanoid</span>
                      </div>
                      <div className="w-16 h-16 bg-slate-200 text-slate-400 rounded-sm flex items-center justify-center flex-col gap-1 border border-slate-300">
                        <Terminal size={24} />
                        <span className="text-[8px] font-bold uppercase">Blind Cobot</span>
                      </div>
                    </div>
                  </div>
               </div>

               <div className="space-y-6 max-w-md mx-auto relative z-20">
                  <div className="flex justify-between items-center">
                    <label className="tech-label text-slate-900">Active Reporting Sources</label>
                    <span className="text-2xl font-headline font-bold text-primary italic">{sources}</span>
                  </div>
                  <Slider value={[sources]} onValueChange={(v) => setSources(v[0])} max={5} min={1} step={1} className="py-2" />
                  <div className="p-4 bg-white border border-slate-200 flex gap-4 items-start">
                    <AlertCircle className={cn("shrink-0 mt-0.5", state.isFallback ? "text-red-500" : "text-primary")} size={18} />
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">{state.statusText}</p>
                  </div>
               </div>
            </div>
          </div>

          {/* Behavior Map */}
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
                  { id: 'COLLABORATIVE', label: 'Collaborative Shell (Middle)', action: 'Assets drop to safe speed (<250mm/s) and restrict joint torque.', color: 'text-yellow-400' },
                  { id: 'PROTECTIVE', label: 'Protective Shell (Inner)', action: 'Immediate, fail-safe hardware brake engagement via black-channel.', color: 'text-red-500' }
                ].map((zone) => (
                  <div key={zone.id} className="space-y-3 p-6 bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
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
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>COORD_SYSTEM: WGS84</span>
                <span className="flex items-center gap-2">
                  <Activity size={12} className="text-primary animate-pulse" />
                  DETERMINISTIC_LOCK
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client"

import { useState } from 'react';
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, User, Activity, ShieldCheck, Wifi, Signal, Zap, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function HiveInteractive() {
  const [sources, setSources] = useState(3);
  const [speed, setSpeed] = useState(50);
  const [proximity, setProximity] = useState(20);

  // Formula-driven logic: S = (v * tr) + d_stop + C
  // v (speed) increases size. 
  // C (Confidence/Sources) decreases size.
  // Proximity increases perceived risk (visual indicator).
  
  const calculateSizes = () => {
    const baseScale = (1 + speed / 80) / (0.8 + sources / 3.5);
    const proximityModifier = 1 + (proximity / 150); // Volume slightly grows as proximity gets tighter to account for reaction margin
    
    return {
      inner: 80 * baseScale * proximityModifier,
      middle: 140 * baseScale * proximityModifier,
      outer: 200 * baseScale * proximityModifier,
    };
  };

  const sizes = calculateSizes();
  
  const getSafetyLevel = (s: number) => {
    if (s <= 1) return { badge: "PLb Cat 1 (Low Confidence)", color: "text-red-500" };
    if (s <= 2) return { badge: "PLb Cat 2 (Standard)", color: "text-orange-500" };
    if (s <= 3) return { badge: "PLc Cat 2 (Medium)", color: "text-yellow-500" };
    if (s <= 4) return { badge: "PLd Cat 2 (Optimized)", color: "text-green-500" };
    return { badge: "PLd Cat 3 (Maximum)", color: "text-primary" };
  };

  const level = getSafetyLevel(sources);

  // Determine which shell is being breached based on proximity slider
  const getBreachStatus = () => {
    // Proximity 0-100 mapping to spatial distance
    if (proximity > 80) return "PROTECTIVE_BREACH";
    if (proximity > 50) return "COLLABORATIVE_BREACH";
    if (proximity > 20) return "WARNING_BREACH";
    return "CLEAR";
  };

  const status = getBreachStatus();

  return (
    <section id="hive" className="py-32 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-headline font-bold text-slate-900">The Hive Engine</h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Dynamic safety volumes respond to real-time physics. Adjust the variables below to see the Hive's deterministic logic in action.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          {/* Left Panel: The Simulation Controls */}
          <div className="bg-white rounded-[2.5rem] border border-slate-200 p-10 shadow-sm flex flex-col justify-between">
            <div className="space-y-10">
              {/* Redundancy Slider */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Hive Redundancy (Sources)</label>
                  <span className="text-lg font-headline font-bold text-primary">{sources}</span>
                </div>
                <Slider value={[sources]} onValueChange={(v) => setSources(v[0])} max={5} min={1} step={1} className="py-2" />
                <p className="text-[10px] text-slate-400">Reduces Confidence Factor (C) &rarr; Shrinks Volume</p>
              </div>

              {/* Speed Slider */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Asset Velocity (v)</label>
                  <span className="text-lg font-headline font-bold text-primary">{speed}%</span>
                </div>
                <Slider value={[speed]} onValueChange={(v) => setSpeed(v[0])} max={100} min={0} step={1} className="py-2" />
                <p className="text-[10px] text-slate-400">Increases Response Distance &rarr; Grows Volume</p>
              </div>

              {/* Proximity Slider */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Worker Proximity (Distance)</label>
                  <span className="text-lg font-headline font-bold text-primary">{proximity}% Closer</span>
                </div>
                <Slider value={[proximity]} onValueChange={(v) => setProximity(v[0])} max={100} min={0} step={1} className="py-2" />
                <p className="text-[10px] text-slate-400">Reduced separation reduces margin &rarr; Grows Volume</p>
              </div>
            </div>

            <div className="relative aspect-square rounded-[2rem] bg-slate-50 border border-slate-100 overflow-hidden flex items-center justify-center mt-12">
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
              
              {/* Visualization Container */}
              <div className="relative flex items-center justify-center w-full h-full">
                
                {/* Warning Shell (Outer) */}
                <div 
                  className={cn("absolute rounded-full border border-sky-400/20 bg-sky-400/5 transition-all duration-500 ease-out flex items-center justify-center", 
                    status === "WARNING_BREACH" && "bg-sky-400/10 border-sky-400/40"
                  )}
                  style={{ width: sizes.outer, height: sizes.outer }}
                >
                   <span className="absolute -top-4 text-[8px] font-bold text-sky-400 opacity-50 uppercase">Warning</span>
                </div>

                {/* Collaborative Shell (Middle) */}
                <div 
                  className={cn("absolute rounded-full border border-yellow-400/20 bg-yellow-400/5 transition-all duration-500 ease-out flex items-center justify-center",
                    status === "COLLABORATIVE_BREACH" && "bg-yellow-400/10 border-yellow-400/40 shadow-[0_0_20px_rgba(250,204,21,0.1)]"
                  )}
                  style={{ width: sizes.middle, height: sizes.middle }}
                >
                   <span className="absolute -top-4 text-[8px] font-bold text-yellow-500 opacity-50 uppercase">Collaborative</span>
                </div>

                {/* Protective Shell (Inner) */}
                <div 
                  className={cn("absolute rounded-full border border-red-500/20 bg-red-500/5 transition-all duration-500 ease-out flex items-center justify-center",
                    status === "PROTECTIVE_BREACH" && "bg-red-500/20 border-red-500/60 shadow-[0_0_30px_rgba(239,68,68,0.2)]"
                  )}
                  style={{ width: sizes.inner, height: sizes.inner }}
                >
                   <span className="absolute -top-4 text-[8px] font-bold text-red-500 opacity-50 uppercase">Protective</span>
                </div>
                
                {/* Humanoid Asset */}
                <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 shadow-xl flex items-center justify-center text-slate-800 z-10 transition-transform duration-500" style={{ transform: status === "PROTECTIVE_BREACH" ? "scale(0.95)" : "scale(1)" }}>
                  <Bot size={28} className={cn("transition-colors", status === "PROTECTIVE_BREACH" ? "text-red-500" : "text-slate-800")} />
                </div>

                {/* Worker Asset (Moves relative to proximity) */}
                <div 
                  className="absolute transition-all duration-500 flex flex-col items-center gap-1 z-20"
                  style={{ right: `${25 - (proximity / 3)}%`, opacity: 0.8 }}
                >
                  <div className="w-8 h-8 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-primary">
                    <User size={16} />
                  </div>
                  <span className="text-[8px] font-bold text-slate-400 uppercase">Worker</span>
                </div>
              </div>

              {/* Status HUD Overlay */}
              <div className="absolute top-6 left-6 right-6 flex justify-between items-start pointer-events-none">
                <Badge variant="outline" className={cn("bg-white border-primary/20 px-3 py-1 font-bold", level.color)}>
                  {level.badge}
                </Badge>
              </div>
            </div>
          </div>

          {/* Right Panel: The Behavior Map & Live Metrics */}
          <Card className="rounded-[2.5rem] border-slate-200 shadow-sm overflow-hidden h-full flex flex-col">
            <CardHeader className="bg-slate-50 border-b border-slate-100 p-8">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl font-headline font-bold text-slate-900 flex items-center gap-2">
                  <Activity size={20} className="text-primary" />
                  SSET · HUMAN-VOL-01
                </CardTitle>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-green-500 uppercase">
                  <ShieldCheck size={12} /> Live Engine
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-8 flex-1">
              <div className="space-y-6">
                {/* Warning Shell Card */}
                <div className={cn("p-6 rounded-2xl border transition-all duration-300", 
                  status === "WARNING_BREACH" ? "bg-sky-400/5 border-sky-400/30 ring-1 ring-sky-400/20" : "bg-white border-slate-100"
                )}>
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 rounded-full bg-sky-400 mt-1.5 shrink-0" />
                    <div className="space-y-1">
                      <h4 className="font-headline font-bold text-slate-900">Warning Shell (Outer)</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">Trigger haptic vibration alert on the human's vest. Humanoid maintains nominal speed.</p>
                      {status === "WARNING_BREACH" && (
                        <div className="pt-2 flex items-center gap-2 text-[10px] font-bold text-sky-600 animate-pulse">
                          <Wifi size={10} /> TRANSMITTING HAPTIC SIGNAL
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Collaborative Shell Card */}
                <div className={cn("p-6 rounded-2xl border transition-all duration-300", 
                  status === "COLLABORATIVE_BREACH" ? "bg-yellow-400/5 border-yellow-400/30 ring-1 ring-yellow-400/20" : "bg-white border-slate-100"
                )}>
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 rounded-full bg-yellow-400 mt-1.5 shrink-0" />
                    <div className="space-y-1">
                      <h4 className="font-headline font-bold text-slate-900">Collaborative Shell (Middle)</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">Humanoid instantly drops to a regulated safe speed (&lt;250mm/s) and restricts joint torque for co-working.</p>
                      {status === "COLLABORATIVE_BREACH" && (
                        <div className="pt-2 flex items-center gap-2 text-[10px] font-bold text-yellow-600 animate-pulse">
                          <Zap size={10} /> SPEED & TORQUE LIMITED
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Protective Shell Card */}
                <div className={cn("p-6 rounded-2xl border transition-all duration-300", 
                  status === "PROTECTIVE_BREACH" ? "bg-red-500/5 border-red-500/30 ring-1 ring-red-500/20" : "bg-white border-slate-100"
                )}>
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0" />
                    <div className="space-y-1">
                      <h4 className="font-headline font-bold text-slate-900">Protective Shell (Inner)</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">Trigger immediate, fail-safe hardware brake engagement. System lock until perimeter clearance check.</p>
                      {status === "PROTECTIVE_BREACH" && (
                        <div className="pt-2 flex items-center gap-2 text-[10px] font-bold text-red-600 animate-pulse">
                          <AlertCircle size={10} /> HARDWARE BRAKE ENGAGED
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-slate-100 grid grid-cols-2 gap-8">
                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Confidence (C)</div>
                  <div className="text-sm font-bold text-slate-900">± {(20 / sources).toFixed(1)} mm</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Stopping Dist</div>
                  <div className="text-sm font-bold text-slate-900">{(speed * 1.5).toFixed(0)} mm</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

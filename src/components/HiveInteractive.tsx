"use client"

import { useState } from 'react';
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, User, Activity, ShieldCheck, Wifi, Zap, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function HiveInteractive() {
  const [sources, setSources] = useState(3);
  const [speed, setSpeed] = useState(50);
  const [proximity, setProximity] = useState(10); // 0 (far) to 100 (contact)

  // Collaborative shell availability
  const isCollaborativeEnabled = sources >= 2;

  // Formula-driven logic: S = (v * tr) + d_stop + C
  // Higher speed = Bigger volumes (Safety buffer needs more space)
  // Higher sources = Smaller volumes (Better confidence reduces C)
  const calculateSizes = () => {
    const baseScale = (0.8 + speed / 100) / (0.5 + sources / 5);
    
    return {
      inner: 100 * baseScale,
      middle: 180 * baseScale,
      outer: 260 * baseScale,
    };
  };

  const sizes = calculateSizes();
  
  // State detection based on proximity slider and volume diameters
  // Proximity maps to a radial distance in the visualization
  const getBreachStatus = () => {
    // If redundancy is low, skip collaborative
    if (proximity > 75) return "PROTECTIVE_BREACH";
    if (proximity > 45) {
      return isCollaborativeEnabled ? "COLLABORATIVE_BREACH" : "PROTECTIVE_BREACH";
    }
    if (proximity > 15) return "WARNING_BREACH";
    return "CLEAR";
  };

  const status = getBreachStatus();

  const getSafetyLevel = () => {
    if (sources < 2) return { badge: "PLb Cat 1 (Low Confidence)", color: "text-red-500" };
    if (sources < 3) return { badge: "PLc Cat 2 (Medium)", color: "text-yellow-500" };
    if (sources < 5) return { badge: "PLd Cat 2 (Optimized)", color: "text-green-500" };
    return { badge: "PLd Cat 3 (Maximum)", color: "text-primary" };
  };

  const level = getSafetyLevel();

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
          <div className="bg-white rounded-[2.5rem] border border-slate-200 p-10 shadow-sm flex flex-col">
            <div className="space-y-10 mb-12">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Hive Redundancy (Sources)</label>
                  <span className="text-lg font-headline font-bold text-primary">{sources}</span>
                </div>
                <Slider value={[sources]} onValueChange={(v) => setSources(v[0])} max={5} min={1} step={1} className="py-2" />
                <div className="flex justify-between items-center">
                  <p className="text-[10px] text-slate-400">Confidence Factor (C)</p>
                  {!isCollaborativeEnabled && <Badge variant="destructive" className="text-[8px] h-4">COLLABORATIVE DISABLED</Badge>}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Asset Velocity (v)</label>
                  <span className="text-lg font-headline font-bold text-primary">{speed}%</span>
                </div>
                <Slider value={[speed]} onValueChange={(v) => setSpeed(v[0])} max={100} min={10} step={1} className="py-2" />
                <p className="text-[10px] text-slate-400">Velocity changes volume width &rarr; Higher speed = Larger Buffer</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Worker Approaching (Proximity)</label>
                  <span className="text-lg font-headline font-bold text-primary">{proximity}% Deep</span>
                </div>
                <Slider value={[proximity]} onValueChange={(v) => setProximity(v[0])} max={100} min={0} step={1} className="py-2" />
                <p className="text-[10px] text-slate-400">Move the worker into the safety shells</p>
              </div>
            </div>

            <div className="relative flex-1 aspect-square rounded-[2rem] bg-slate-50 border border-slate-100 overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
              
              <div className="relative flex items-center justify-center w-full h-full">
                
                {/* Warning Shell (Outer) */}
                <div 
                  className={cn("absolute rounded-full border border-sky-400/20 bg-sky-400/5 transition-all duration-300 ease-out flex items-center justify-center", 
                    status === "WARNING_BREACH" && "bg-sky-400/10 border-sky-400/40"
                  )}
                  style={{ width: sizes.outer, height: sizes.outer }}
                >
                   <span className="absolute -top-4 text-[8px] font-bold text-sky-400 opacity-50 uppercase">Warning</span>
                </div>

                {/* Collaborative Shell (Middle) - Only visible if sources >= 2 */}
                {isCollaborativeEnabled && (
                  <div 
                    className={cn("absolute rounded-full border border-yellow-400/20 bg-yellow-400/5 transition-all duration-300 ease-out flex items-center justify-center",
                      status === "COLLABORATIVE_BREACH" && "bg-yellow-400/10 border-yellow-400/40 shadow-[0_0_20px_rgba(250,204,21,0.1)]"
                    )}
                    style={{ width: sizes.middle, height: sizes.middle }}
                  >
                     <span className="absolute -top-4 text-[8px] font-bold text-yellow-500 opacity-50 uppercase">Collaborative</span>
                  </div>
                )}

                {/* Protective Shell (Inner) */}
                <div 
                  className={cn("absolute rounded-full border border-red-500/20 bg-red-500/5 transition-all duration-300 ease-out flex items-center justify-center",
                    status === "PROTECTIVE_BREACH" && "bg-red-500/20 border-red-500/60 shadow-[0_0_30px_rgba(239,68,68,0.2)]"
                  )}
                  style={{ width: sizes.inner, height: sizes.inner }}
                >
                   <span className="absolute -top-4 text-[8px] font-bold text-red-500 opacity-50 uppercase">Protective</span>
                </div>
                
                {/* Humanoid Asset */}
                <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 shadow-xl flex items-center justify-center text-slate-800 z-10 transition-transform duration-300" style={{ transform: status === "PROTECTIVE_BREACH" ? "scale(0.95)" : "scale(1)" }}>
                  <Bot size={32} className={cn("transition-colors", status === "PROTECTIVE_BREACH" ? "text-red-500" : "text-slate-800")} />
                </div>

                {/* Worker Asset (Moves relative to proximity slider) */}
                <div 
                  className="absolute transition-all duration-300 flex flex-col items-center gap-1 z-20"
                  style={{ transform: `translateX(${150 - (proximity * 2)}px)`, opacity: 1 }}
                >
                  <div className={cn("w-10 h-10 rounded-full bg-white border-2 flex items-center justify-center shadow-lg transition-colors", 
                    status === "PROTECTIVE_BREACH" ? "border-red-500 text-red-500" : 
                    status === "COLLABORATIVE_BREACH" ? "border-yellow-500 text-yellow-500" :
                    status === "WARNING_BREACH" ? "border-sky-500 text-sky-500" : "border-slate-200 text-slate-400"
                  )}>
                    <User size={20} />
                  </div>
                  <span className="text-[8px] font-bold uppercase tracking-tighter">Worker</span>
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
                  SSET · HUMANOID-01
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
                  !isCollaborativeEnabled ? "opacity-40 grayscale pointer-events-none bg-slate-50 border-slate-100" :
                  status === "COLLABORATIVE_BREACH" ? "bg-yellow-400/5 border-yellow-400/30 ring-1 ring-yellow-400/20" : "bg-white border-slate-100"
                )}>
                  <div className="flex items-start gap-4">
                    <div className={cn("w-2 h-2 rounded-full mt-1.5 shrink-0", isCollaborativeEnabled ? "bg-yellow-400" : "bg-slate-300")} />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-headline font-bold text-slate-900">Collaborative Shell (Middle)</h4>
                        {!isCollaborativeEnabled && <span className="text-[8px] text-red-500 font-bold uppercase">(Inactive)</span>}
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">Humanoid instantly drops to a regulated safe speed (&lt;250mm/s) and restricts joint torque for co-working.</p>
                      {status === "COLLABORATIVE_BREACH" && isCollaborativeEnabled && (
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
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active State</div>
                  <div className="text-sm font-bold text-slate-900">
                    {status === "PROTECTIVE_BREACH" ? "PROTECTIVE" : 
                     status === "COLLABORATIVE_BREACH" ? "COLLABORATIVE" :
                     status === "WARNING_BREACH" ? "WARNING" : "NOMINAL"}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

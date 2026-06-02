"use client"

import { useState, useMemo } from 'react';
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, User, Activity, ShieldCheck, Wifi, Zap, AlertCircle, Info, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function HiveInteractive() {
  const [sources, setSources] = useState(3);
  const [speed, setSpeed] = useState(50); 
  const [proximity, setProximity] = useState(10); 

  const isCollaborativeEnabled = sources >= 3;
  const VIS_SIZE = 400; 

  const engine = useMemo(() => {
    const velocityFactor = 0.6 + (speed / 80); 
    const confidenceFactor = 1.4 - (sources * 0.12); 
    
    const baseDiameter = 100;
    const protective = baseDiameter * velocityFactor * confidenceFactor;
    const collaborative = protective * 1.5;
    const warning = protective * 2.2;

    const workerDistFromCenter = (VIS_SIZE / 2) * (1 - (proximity / 100) * 0.85);

    let status: 'CLEAR' | 'WARNING' | 'COLLABORATIVE' | 'PROTECTIVE' = 'CLEAR';
    
    if (workerDistFromCenter <= protective / 2) {
      status = 'PROTECTIVE';
    } else if (isCollaborativeEnabled && workerDistFromCenter <= collaborative / 2) {
      status = 'COLLABORATIVE';
    } else if (workerDistFromCenter <= warning / 2) {
      status = 'WARNING';
    }

    return {
      radii: { protective, collaborative, warning },
      workerDist: workerDistFromCenter,
      status
    };
  }, [speed, sources, proximity, isCollaborativeEnabled]);

  const { status, radii, workerDist } = engine;

  const getSafetyLevel = () => {
    if (sources <= 2) return { badge: "PLb Cat 1", color: "text-red-500", bg: "bg-red-50" };
    if (sources <= 4) return { badge: "PLd Cat 2 (Standard)", color: "text-primary", bg: "bg-primary/5" };
    return { badge: "PLd Cat 3 (High Confidence)", color: "text-emerald-600", bg: "bg-emerald-50" };
  };

  const level = getSafetyLevel();

  return (
    <section id="hive" className="py-40 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-blueprint opacity-10" />
      
      <div className="container mx-auto px-6 relative">
        <div className="max-w-4xl mb-24 space-y-4">
          <span className="tech-label text-primary">Simulation Engine</span>
          <h2 className="text-6xl font-headline font-bold text-white tracking-tighter">The Hive Mind.</h2>
          <p className="text-slate-400 text-xl max-w-2xl leading-relaxed">
            Speed and Separation Monitoring (SSM) rendered in real-time. Adjust factory variables to see spatial safety volumes adapt instantly.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch max-w-7xl mx-auto">
          {/* Controls */}
          <div className="lg:col-span-3 space-y-12">
            <div className="space-y-10">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <label className="tech-label">Redundancy (Sources)</label>
                  <span className="text-xl font-headline font-bold text-primary">{sources}</span>
                </div>
                <Slider value={[sources]} onValueChange={(v) => setSources(v[0])} max={5} min={1} step={1} className="py-2" />
                <div className="p-4 bg-white/5 border border-white/10 rounded-sm">
                   <p className="text-[10px] text-slate-400 leading-tight">Impacts Confidence Factor (C). Sources &lt; 3 disables collaborative zone.</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center text-left">
                  <label className="tech-label">Relative Speed (V_H + V_R)</label>
                  <span className="text-xl font-headline font-bold text-primary">{speed}%</span>
                </div>
                <Slider value={[speed]} onValueChange={(v) => setSpeed(v[0])} max={100} min={10} step={1} className="py-2" />
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <label className="tech-label">Proximity (Approach)</label>
                  <span className="text-xl font-headline font-bold text-primary">{proximity}%</span>
                </div>
                <Slider value={[proximity]} onValueChange={(v) => setProximity(v[0])} max={100} min={0} step={1} className="py-2" />
              </div>
            </div>
          </div>

          {/* Visualization */}
          <div className="lg:col-span-5 relative flex items-center justify-center bg-black/40 border border-white/10 rounded-sm overflow-hidden min-h-[500px]">
            <div className="absolute top-4 left-4 z-20">
              <div className={cn("px-4 py-1.5 font-mono text-[10px] font-bold border rounded-full", level.color, level.bg, "border-current")}>
                {level.badge}
              </div>
            </div>

            <div className="relative flex items-center justify-center w-full h-full">
              {/* Shells */}
              <div 
                className={cn("absolute rounded-full border border-sky-400/30 bg-sky-400/5 transition-all duration-300", 
                  status === "WARNING" && "bg-sky-400/10 border-sky-400/60"
                )}
                style={{ width: radii.warning, height: radii.warning }}
              />

              {isCollaborativeEnabled && (
                <div 
                  className={cn("absolute rounded-full border border-yellow-400/30 bg-yellow-400/5 transition-all duration-300",
                    status === "COLLABORATIVE" && "bg-yellow-400/10 border-yellow-400/60"
                  )}
                  style={{ width: radii.collaborative, height: radii.collaborative }}
                />
              )}

              <div 
                className={cn("absolute rounded-full border border-red-500/30 bg-red-500/5 transition-all duration-300",
                  status === "PROTECTIVE" && "bg-red-500/20 border-red-500/80"
                )}
                style={{ width: radii.protective, height: radii.protective }}
              />
              
              {/* Asset Icons */}
              <div className="relative z-10 w-20 h-20 bg-slate-800 border border-white/20 rounded-sm flex items-center justify-center">
                <Bot size={40} className={cn("transition-colors", status === "PROTECTIVE" ? "text-red-500" : "text-white")} />
              </div>

              <div 
                className="absolute transition-all duration-300 flex flex-col items-center z-20"
                style={{ transform: `translateX(${workerDist}px)` }}
              >
                <div className={cn("w-12 h-12 rounded-full bg-white border-2 flex items-center justify-center shadow-2xl transition-all", 
                  status === "PROTECTIVE" ? "border-red-500 text-red-500" : 
                  status === "COLLABORATIVE" ? "border-yellow-500 text-yellow-500" :
                  status === "WARNING" ? "border-sky-500 text-sky-500" : "border-slate-800 text-slate-800"
                )}>
                  <User size={24} />
                </div>
              </div>
            </div>
          </div>

          {/* Behavior Map */}
          <div className="lg:col-span-4 bg-slate-800/50 border border-white/10 rounded-sm p-10 flex flex-col justify-between">
            <div className="space-y-10">
              <div className="flex justify-between items-center border-b border-white/10 pb-6">
                <h3 className="text-xl font-headline font-bold flex items-center gap-3 italic">
                  <Terminal size={20} className="text-primary" />
                  HUMANOID-01 BEHAVIOR MAP
                </h3>
              </div>

              <div className="space-y-6">
                {[
                  { id: 'WARNING', label: 'Warning Shell', action: 'Haptic alert pulse to Smart Vest', color: 'text-sky-400' },
                  { id: 'COLLABORATIVE', label: 'Collaborative Shell', action: 'Drop to Safe Speed (<250mm/s) & Limit Torque', color: 'text-yellow-400' },
                  { id: 'PROTECTIVE', label: 'Protective Shell', action: 'Hard Brake Engagement (E-Stop)', color: 'text-red-500' }
                ].map((zone) => (
                  <div key={zone.id} className={cn("p-6 border transition-all duration-300", 
                    status === zone.id ? "bg-white/5 border-white/40 shadow-lg" : "bg-transparent border-white/5 opacity-50"
                  )}>
                    <div className="flex items-start gap-4">
                      <div className={cn("w-1.5 h-1.5 rounded-full mt-2", zone.color.replace('text', 'bg'))} />
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className={cn("font-bold text-xs uppercase tracking-widest", zone.color)}>{zone.label}</span>
                          {zone.id === 'COLLABORATIVE' && !isCollaborativeEnabled && <span className="text-[10px] text-red-500 font-bold uppercase">(Disabled)</span>}
                        </div>
                        <p className="text-sm text-slate-300 font-medium">{zone.action}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-500">
              <span>S-DISTANCE: ± {(radii.protective / 4).toFixed(2)} MM</span>
              <span className="flex items-center gap-2">
                <Activity size={12} className={status !== 'CLEAR' ? 'text-primary animate-pulse' : ''} />
                SYSTEM {status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
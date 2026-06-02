"use client"

import { useState, useMemo } from 'react';
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, User, Activity, ShieldCheck, Wifi, Zap, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function HiveInteractive() {
  const [sources, setSources] = useState(3);
  const [speed, setSpeed] = useState(50); // Combined velocity (v_h + v_r)
  const [proximity, setProximity] = useState(10); // 0 (far) to 100 (contact)

  // Collaborative shell availability
  const isCollaborativeEnabled = sources >= 2;

  // Visual/Logic Synchronization Constants
  const VIS_SIZE = 400; // Visualization area px

  // Dynamic Physics Calculation based on ISO 10218-2 / ISO/TS 15066
  const engine = useMemo(() => {
    // S = (v_h + v_r) * tr + d_stop + C
    // Higher speed expands the volumes for all parties
    const velocityFactor = 0.5 + (speed / 100); 
    // Higher redundancy reduces C (confidence factor), shrinking the required safety volume
    const confidenceFactor = 1.4 - (sources * 0.15); 
    
    const baseDiameter = 80;
    // Protective Shell corresponds to the absolute minimum safe distance (S)
    const protective = baseDiameter * velocityFactor * confidenceFactor;
    // Collaborative Shell adds a buffer for speed/torque reduction
    const collaborative = protective * 1.6;
    // Warning Shell is the outer notification boundary
    const warning = protective * 2.4;

    // Worker's radial position relative to center
    // As proximity increases (0 to 100), the distance from center decreases (far to contact)
    const workerDistFromCenter = (VIS_SIZE / 2) * (1 - (proximity / 100) * 0.9);

    // Determination of State based on spatial intersection
    let status: 'CLEAR' | 'WARNING' | 'COLLABORATIVE' | 'PROTECTIVE' = 'CLEAR';
    
    // We check zones from inner to outer
    if (workerDistFromCenter <= protective / 2) {
      status = 'PROTECTIVE';
    } else if (isCollaborativeEnabled && workerDistFromCenter <= collaborative / 2) {
      status = 'COLLABORATIVE';
    } else if (workerDistFromCenter <= warning / 2) {
      status = 'WARNING';
    }

    return {
      radii: {
        protective,
        collaborative,
        warning
      },
      workerDist: workerDistFromCenter,
      status
    };
  }, [speed, sources, proximity, isCollaborativeEnabled]);

  const { status, radii, workerDist } = engine;

  const getSafetyLevel = () => {
    if (sources < 2) return { badge: "PLb Cat 1 (Reduced Confidence)", color: "text-red-500" };
    if (sources < 3) return { badge: "PLc Cat 2 (Medium)", color: "text-yellow-500" };
    if (sources < 5) return { badge: "PLd Cat 2 (Standard)", color: "text-green-500" };
    return { badge: "PLd Cat 3 (Maximum)", color: "text-primary" };
  };

  const level = getSafetyLevel();

  return (
    <section id="hive" className="py-32 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-headline font-bold text-slate-900">The Hive Engine</h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Speed and Separation Monitoring (SSM) in real-time. Adjust the variables to see ISO 10218-2 logic adapt to your factory floor.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-stretch max-w-6xl mx-auto">
          {/* Left Panel: The Simulation Controls */}
          <div className="bg-white rounded-[2.5rem] border border-slate-200 p-10 shadow-sm flex flex-col">
            <div className="space-y-10 mb-12">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Hive Redundancy (Sources)</label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger><Info size={12} className="text-slate-300" /></TooltipTrigger>
                        <TooltipContent>The number of active reporting sources (Robots/APs) verifying position.</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <span className="text-lg font-headline font-bold text-primary">{sources}</span>
                </div>
                <Slider value={[sources]} onValueChange={(v) => setSources(v[0])} max={5} min={1} step={1} className="py-2" />
                <div className="flex justify-between items-center">
                  <p className="text-[10px] text-slate-400">Impacts Confidence Factor (C)</p>
                  {!isCollaborativeEnabled && <Badge variant="destructive" className="text-[8px] h-4 uppercase tracking-tighter">Collaborative Mode Disabled</Badge>}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Relative Velocity (v_h + v_r)</label>
                  <span className="text-lg font-headline font-bold text-primary">{speed}%</span>
                </div>
                <Slider value={[speed]} onValueChange={(v) => setSpeed(v[0])} max={100} min={10} step={1} className="py-2" />
                <p className="text-[10px] text-slate-400">Higher relative speed increases the protective separation distance (S) for all agents.</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Human Separation (Proximity)</label>
                  <span className="text-lg font-headline font-bold text-primary">{proximity}% Approached</span>
                </div>
                <Slider value={[proximity]} onValueChange={(v) => setProximity(v[0])} max={100} min={0} step={1} className="py-2" />
                <p className="text-[10px] text-slate-400">Simulation of human operator movement towards the humanoid asset.</p>
              </div>
            </div>

            <div className="relative flex-1 aspect-square rounded-[2rem] bg-slate-50 border border-slate-100 overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
              
              <div className="relative flex items-center justify-center w-full h-full">
                
                {/* Warning Shell (Outer) */}
                <div 
                  className={cn("absolute rounded-full border border-sky-400/20 bg-sky-400/5 transition-all duration-300 ease-out flex items-center justify-center", 
                    status === "WARNING" && "bg-sky-400/10 border-sky-400/40"
                  )}
                  style={{ width: radii.warning, height: radii.warning }}
                >
                   <span className="absolute -top-4 text-[8px] font-bold text-sky-400 opacity-50 uppercase">Warning</span>
                </div>

                {/* Collaborative Shell (Middle) */}
                {isCollaborativeEnabled && (
                  <div 
                    className={cn("absolute rounded-full border border-yellow-400/20 bg-yellow-400/5 transition-all duration-300 ease-out flex items-center justify-center",
                      status === "COLLABORATIVE" && "bg-yellow-400/10 border-yellow-400/40 shadow-[0_0_20px_rgba(250,204,21,0.1)]"
                    )}
                    style={{ width: radii.collaborative, height: radii.collaborative }}
                  >
                     <span className="absolute -top-4 text-[8px] font-bold text-yellow-500 opacity-50 uppercase">Collaborative</span>
                  </div>
                )}

                {/* Protective Shell (Inner) */}
                <div 
                  className={cn("absolute rounded-full border border-red-500/20 bg-red-500/5 transition-all duration-300 ease-out flex items-center justify-center",
                    status === "PROTECTIVE" && "bg-red-500/20 border-red-500/60 shadow-[0_0_30px_rgba(239,68,68,0.2)]"
                  )}
                  style={{ width: radii.protective, height: radii.protective }}
                >
                   <span className="absolute -top-4 text-[8px] font-bold text-red-500 opacity-50 uppercase">Protective</span>
                </div>
                
                {/* Humanoid Asset */}
                <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 shadow-xl flex items-center justify-center text-slate-800 z-10 transition-transform duration-300" style={{ transform: status === "PROTECTIVE" ? "scale(0.95)" : "scale(1)" }}>
                  <Bot size={32} className={cn("transition-colors", status === "PROTECTIVE" ? "text-red-500" : "text-slate-800")} />
                </div>

                {/* Worker Asset (Moves relative to proximity) */}
                <div 
                  className="absolute transition-all duration-300 flex flex-col items-center gap-1 z-20"
                  style={{ transform: `translateX(${workerDist}px)`, opacity: 1 }}
                >
                  <div className={cn("w-10 h-10 rounded-full bg-white border-2 flex items-center justify-center shadow-lg transition-colors", 
                    status === "PROTECTIVE" ? "border-red-500 text-red-500" : 
                    status === "COLLABORATIVE" ? "border-yellow-500 text-yellow-500" :
                    status === "WARNING" ? "border-sky-500 text-sky-500" : "border-slate-200 text-slate-400"
                  )}>
                    <User size={20} />
                  </div>
                  <span className="text-[8px] font-bold uppercase tracking-tighter">Human</span>
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
                  HUMANOID-01 BEHAVIOR MAP
                </CardTitle>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-green-500 uppercase">
                  <ShieldCheck size={12} /> SSM LIVE
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-8 flex-1">
              <div className="space-y-6">
                {/* Warning Shell Card */}
                <div className={cn("p-6 rounded-2xl border transition-all duration-300", 
                  status === "WARNING" ? "bg-sky-400/5 border-sky-400/30 ring-1 ring-sky-400/20" : "bg-white border-slate-100"
                )}>
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 rounded-full bg-sky-400 mt-1.5 shrink-0" />
                    <div className="space-y-1">
                      <h4 className="font-headline font-bold text-slate-900">Warning Shell (Outer)</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">Trigger haptic vibration alert on the human's vest. Humanoid maintains nominal speed.</p>
                      {status === "WARNING" && (
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
                  status === "COLLABORATIVE" ? "bg-yellow-400/5 border-yellow-400/30 ring-1 ring-yellow-400/20" : "bg-white border-slate-100"
                )}>
                  <div className="flex items-start gap-4">
                    <div className={cn("w-2 h-2 rounded-full mt-1.5 shrink-0", isCollaborativeEnabled ? "bg-yellow-400" : "bg-slate-300")} />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-headline font-bold text-slate-900">Collaborative Shell (Middle)</h4>
                        {!isCollaborativeEnabled && <span className="text-[8px] text-red-500 font-bold uppercase">(Disabled: Low Confidence)</span>}
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">Humanoid instantly drops to a regulated safe speed (&lt;250mm/s) and restricts joint torque for co-working.</p>
                      {status === "COLLABORATIVE" && isCollaborativeEnabled && (
                        <div className="pt-2 flex items-center gap-2 text-[10px] font-bold text-yellow-600 animate-pulse">
                          <Zap size={10} /> REDUCED SPEED & TORQUE
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Protective Shell Card */}
                <div className={cn("p-6 rounded-2xl border transition-all duration-300", 
                  status === "PROTECTIVE" ? "bg-red-500/5 border-red-500/30 ring-1 ring-red-500/20" : "bg-white border-slate-100"
                )}>
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0" />
                    <div className="space-y-1">
                      <h4 className="font-headline font-bold text-slate-900">Protective Shell (Inner)</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">Trigger immediate, fail-safe hardware brake engagement. System lock until perimeter clearance check.</p>
                      {status === "PROTECTIVE" && (
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
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Intrusion Distance (C)</div>
                  <div className="text-sm font-bold text-slate-900">± {(radii.protective / 4).toFixed(1)} mm</div>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active State</div>
                  <div className="text-sm font-bold text-slate-900">
                    {status === "PROTECTIVE" ? "PROTECTIVE" : 
                     status === "COLLABORATIVE" ? "COLLABORATIVE" :
                     status === "WARNING" ? "WARNING" : "CLEAR"}
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

"use client"

import { useState, useMemo } from 'react';
import { Bot, User, ShieldCheck, Activity, Zap, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";

export function HiveInteractive() {
  const [hoveredShell, setHoveredShell] = useState<string | null>(null);
  const [proximity, setProximity] = useState(150); // mm
  const [speed, setSpeed] = useState(800); // mm/s
  const [redundancy, setRedundancy] = useState(3); // alpha/confidence

  const state = useMemo(() => {
    const baseScale = 0.5;
    const confidence = (6 - redundancy) * 15;
    const speedFactor = speed / 1000;
    
    const protectiveRadius = (50 + confidence) * (1 + speedFactor) * baseScale;
    const collaborativeRadius = protectiveRadius + (60 * (1 + speedFactor) * baseScale);
    const warningRadius = collaborativeRadius + (80 * (1 + speedFactor) * baseScale);

    let currentZone = "OUTSIDE";
    if (proximity < protectiveRadius) currentZone = "PROTECTIVE";
    else if (proximity < collaborativeRadius) currentZone = "COLLABORATIVE";
    else if (proximity < warningRadius) currentZone = "WARNING";

    return {
      currentZone,
      radii: {
        protective: protectiveRadius * 2,
        collaborative: collaborativeRadius * 2,
        warning: warningRadius * 2
      }
    };
  }, [proximity, speed, redundancy]);

  return (
    <section id="hive" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center mb-16 space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold uppercase tracking-widest text-primary">
            <Zap size={12} className="animate-pulse" />
            Deterministic Spatial Logic Grid v2.4
          </div>
          
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-headline font-bold text-white">The Hive Engine & Behavior Mapping</h2>
            <div className="relative inline-block">
              <div className="text-2xl md:text-4xl font-mono font-bold text-primary/90 bg-slate-900/50 backdrop-blur-sm px-8 py-4 border border-white/5 rounded-sm">
                S = Σ [ (V<sub>h</sub> · T<sub>r</sub>) + (V<sub>r</sub> · T<sub>b</sub>) + (α<sub>zone</sub> · C) ]
              </div>
              <div className="mt-2 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                Where α<sub>zone</sub> represents the specific ISO-compliant sensitivity tolerance allocated to each individual body segment.
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Visual Simulation Canvas */}
          <div className="lg:col-span-7 bg-slate-900/40 border border-white/5 rounded-sm p-8 relative min-h-[500px] flex flex-col group">
            <div className="absolute top-4 left-4 flex gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-tighter">Latency</span>
                <span className="text-xs font-mono font-bold text-emerald-400">{'<'}12MS</span>
              </div>
              <div className="flex flex-col gap-1 border-l border-white/10 pl-4">
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-tighter">Signal Integrity</span>
                <span className="text-xs font-mono font-bold text-emerald-400">99.999%</span>
              </div>
              <div className="flex flex-col gap-1 border-l border-white/10 pl-4">
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-tighter">Determinism</span>
                <span className="text-xs font-mono font-bold text-primary">SIL 3 / PLd</span>
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center relative">
              {/* Floor Grid Circle */}
              <div className="absolute w-[400px] h-[400px] border border-white/5 rounded-full" />
              <div className="absolute w-[200px] h-[200px] border border-white/5 rounded-full" />
              
              {/* Distance Line */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <line 
                  x1="50%" y1="50%" x2={`calc(50% + ${proximity * 1.5}px)`} y2="50%" 
                  stroke="rgba(0, 102, 255, 0.3)" strokeWidth="1" strokeDasharray="4 4" 
                />
                <text 
                  x={`calc(50% + ${(proximity * 1.5) / 2}px)`} y="48%" 
                  fill="rgba(0, 102, 255, 0.8)" fontSize="10" className="font-mono font-bold text-center"
                >
                  {proximity}mm
                </text>
              </svg>

              {/* Safety Shells */}
              <div className={cn(
                "absolute rounded-full border-2 transition-all duration-500 ease-out",
                (state.currentZone === "WARNING" || hoveredShell === "WARNING") ? "border-sky-400 bg-sky-400/10 scale-[1.02]" : "border-sky-400/20 bg-sky-400/5",
                "border-dashed"
              )} style={{ width: state.radii.warning * 3, height: state.radii.warning * 3 }} />

              <div className={cn(
                "absolute rounded-full border-2 transition-all duration-500 ease-out",
                (state.currentZone === "COLLABORATIVE" || hoveredShell === "COLLABORATIVE") ? "border-yellow-400 bg-yellow-400/10 scale-[1.02]" : "border-yellow-400/20 bg-yellow-400/5"
              )} style={{ width: state.radii.collaborative * 3, height: state.radii.collaborative * 3 }} />

              <div className={cn(
                "absolute rounded-full border-2 transition-all duration-500 ease-out",
                (state.currentZone === "PROTECTIVE" || hoveredShell === "PROTECTIVE") ? "border-red-500 bg-red-500/10 scale-[1.05] animate-pulse" : "border-red-500/20 bg-red-500/5"
              )} style={{ width: state.radii.protective * 3, height: state.radii.protective * 3 }} />

              {/* Assets */}
              <div className="relative z-20 flex flex-col items-center gap-2">
                <div className="w-16 h-16 bg-slate-900 border border-white/20 rounded-sm flex flex-col items-center justify-center text-white shadow-2xl">
                  <Bot size={32} className="text-primary" />
                  <span className="text-[8px] font-mono mt-1 opacity-50">HUMANOID-01</span>
                </div>
              </div>

              <div 
                className="absolute z-30 transition-all duration-300 flex flex-col items-center gap-2"
                style={{ transform: `translateX(${proximity * 1.5}px)` }}
              >
                <div className="w-12 h-12 bg-primary border border-white/20 rounded-full flex items-center justify-center text-white shadow-2xl">
                  <User size={24} />
                </div>
                <span className="text-[8px] font-mono font-bold uppercase text-primary">Worker</span>
              </div>
            </div>

            {/* Sim Controls Overlay */}
            <div className="mt-auto grid grid-cols-3 gap-6 bg-slate-950/80 p-6 border-t border-white/5">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-mono text-slate-400 uppercase">Worker Proximity</label>
                  <span className="text-xs font-mono font-bold text-white">{proximity}mm</span>
                </div>
                <Slider value={[proximity]} onValueChange={(v) => setProximity(v[0])} max={250} min={10} step={5} />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-mono text-slate-400 uppercase">System Velocity</label>
                  <span className="text-xs font-mono font-bold text-white">{speed}mm/s</span>
                </div>
                <Slider value={[speed]} onValueChange={(v) => setSpeed(v[0])} max={1500} min={100} step={50} />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-mono text-slate-400 uppercase">Hive Redundancy</label>
                  <span className="text-xs font-mono font-bold text-white">{redundancy} Sources</span>
                </div>
                <Slider value={[redundancy]} onValueChange={(v) => setRedundancy(v[0])} max={5} min={1} step={1} />
              </div>
            </div>
          </div>

          {/* Safety Specification Pillars */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="p-4 bg-slate-900 border border-white/5 mb-2">
              <h3 className="text-xs font-mono font-bold text-white uppercase tracking-[0.2em] flex items-center gap-2">
                <Activity size={14} className="text-primary" />
                ASSET · HUMANOID-01 · BEHAVIOR MAP
              </h3>
            </div>

            {[
              {
                id: 'WARNING',
                title: 'Outer Shell (Speed & Proximity Engine)',
                subtitle: 'Nominal Speed Maintained',
                body: 'The Outer Warning Shell acts as a direct function of velocity. The system continuously tracks Proximity. The faster a machine moves, the larger this protective bubble dynamically scales to guarantee a safe stop separation distance, expanding into a larger protective buffer as objects approach.',
                color: 'border-sky-400/50 hover:bg-sky-400/5',
                icon: <Info className="text-sky-400" size={18} />
              },
              {
                id: 'COLLABORATIVE',
                title: 'Middle Shell (Body Volumes Sensitivity)',
                subtitle: 'Collaborative Execution Mode (<250 mm/s)',
                body: 'When the Collaborative Shell is breached, the engine applies independent Body Volumes Sensitivity. The system automatically enforces ISO/TS 15066 Power and Force Limiting (PFL) profiles—allocating localized sensitivity tolerances (a_zone) to specific body segments (e.g., higher sensitivity for fast hands, lower for the torso) to dynamically restrict joint torque and regulate safe co-working speeds.',
                color: 'border-yellow-400/50 hover:bg-yellow-400/5',
                icon: <Activity className="text-yellow-400" size={18} />
              },
              {
                id: 'PROTECTIVE',
                title: 'Inner Shell & System Core (Hive Redundancy & Fallback)',
                subtitle: 'Immediate Fail-Safe Brake (10ms Latency)',
                body: 'Governed by Redundancy (The Hive). Position confidence dictates the exact volume footprint. Cross-referencing data from multiple native spatial agents stabilizes the model. If tracking confidence drops or the Inner Shell is breached, the system issues an immediate, fail-safe hardware brake command via safety-rated black-channel communication.',
                color: 'border-red-500/50 hover:bg-red-500/5',
                icon: <ShieldCheck className="text-red-500" size={18} />
              }
            ].map((card) => (
              <div 
                key={card.id}
                onMouseEnter={() => setHoveredShell(card.id)}
                onMouseLeave={() => setHoveredShell(null)}
                className={cn(
                  "p-6 bg-slate-900/40 border transition-all duration-300 cursor-default rounded-sm flex flex-col gap-4",
                  card.color,
                  state.currentZone === card.id ? "bg-white/5 ring-1 ring-white/10" : "opacity-60"
                )}
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-headline font-bold text-white uppercase tracking-wider">{card.title}</h4>
                    <p className="text-[10px] font-mono font-bold text-primary italic uppercase tracking-widest">{card.subtitle}</p>
                  </div>
                  <div className="shrink-0">{card.icon}</div>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-medium">
                  {card.body}
                </p>
                {state.currentZone === card.id && (
                  <div className="mt-2 pt-2 border-t border-white/5 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9px] font-mono font-bold text-emerald-500 uppercase">Active Operational State</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

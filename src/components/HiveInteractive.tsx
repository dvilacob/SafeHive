"use client"

import { useState } from 'react';
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, User, Activity, ShieldCheck, Wifi, Signal } from "lucide-react";
import { cn } from "@/lib/utils";

export function HiveInteractive() {
  const [sources, setSources] = useState(1);

  const getSafetyLevel = (s: number) => {
    if (s === 1) return { badge: "PLb Cat 1 (Low Confidence)", size: 280, color: "bg-red-400" };
    if (s === 2) return { badge: "PLb Cat 2 (Standard)", size: 240, color: "bg-orange-400" };
    if (s === 3) return { badge: "PLc Cat 2 (Medium Confidence)", size: 200, color: "bg-yellow-400" };
    if (s === 4) return { badge: "PLd Cat 2 (Optimized)", size: 160, color: "bg-green-400" };
    return { badge: "PLd Cat 3 (High Confidence / Optimized Throughput)", size: 120, color: "bg-primary" };
  };

  const level = getSafetyLevel(sources);

  return (
    <section id="hive" className="py-32 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-headline font-bold text-slate-900">The Hive: Redundancy in Action</h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            The more sources that see an asset, the tighter the safety bubble can be, maximizing your factory's speed.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Panel: The Slider Simulation */}
          <div className="bg-white rounded-[2.5rem] border border-slate-200 p-12 shadow-sm space-y-12">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold uppercase tracking-widest text-slate-400">Add Redundancy (Active Reporting Sources)</label>
                <span className="text-2xl font-headline font-bold text-primary">{sources} Sources</span>
              </div>
              <Slider 
                value={[sources]} 
                onValueChange={(v) => setSources(v[0])} 
                max={5} 
                min={1} 
                step={1}
                className="py-4"
              />
            </div>

            <div className="relative aspect-square rounded-[2rem] bg-slate-50 border border-slate-100 overflow-hidden flex items-center justify-center">
              {/* Mesh background */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
              
              {/* Dynamic Volume Visualization */}
              <div className="relative flex items-center justify-center">
                <div 
                  className={cn("absolute rounded-full border border-primary/20 bg-primary/5 transition-all duration-700 ease-out flex items-center justify-center")}
                  style={{ width: level.size, height: level.size }}
                >
                  <div className="absolute -top-6 text-[10px] font-bold text-primary uppercase tracking-tighter opacity-50">Protective Shell</div>
                </div>
                
                <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 shadow-xl flex items-center justify-center text-slate-800 z-10">
                  <Bot size={32} />
                </div>
              </div>

              {/* Status HUD */}
              <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Safety Performance</div>
                  <Badge variant="outline" className={cn("bg-white text-primary border-primary/20 px-3 py-1 font-bold")}>
                    {level.badge}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className={cn("w-1.5 h-6 rounded-full transition-all duration-500", i < sources ? "bg-primary" : "bg-slate-200")} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: The Behavior Map */}
          <Card className="rounded-[2.5rem] border-slate-200 shadow-sm overflow-hidden h-full">
            <CardHeader className="bg-slate-50 border-b border-slate-100 p-8">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl font-headline font-bold text-slate-900 flex items-center gap-2">
                  <Activity size={20} className="text-primary" />
                  SSET · HUMANOID-01 · Behavior Map
                </CardTitle>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-green-500 uppercase">
                  <ShieldCheck size={12} /> Live Tracking
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-10">
              <div className="space-y-8">
                <div className="flex gap-6 group">
                  <div className="w-1.5 rounded-full bg-slate-200 group-hover:bg-primary/40 transition-colors" />
                  <div className="space-y-2">
                    <h4 className="text-lg font-headline font-bold text-slate-900">Warning Shell (Outer)</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">Trigger haptic vibration alert on the human's vest. Humanoid maintains nominal speed.</p>
                  </div>
                </div>

                <div className="flex gap-6 group">
                  <div className="w-1.5 rounded-full bg-yellow-400" />
                  <div className="space-y-2">
                    <h4 className="text-lg font-headline font-bold text-slate-900">Collaborative Shell (Middle)</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">Humanoid instantly drops to a regulated safe speed (&lt;250mm/s) and restricts joint torque for co-working.</p>
                  </div>
                </div>

                <div className="flex gap-6 group">
                  <div className="w-1.5 rounded-full bg-red-500" />
                  <div className="space-y-2">
                    <h4 className="text-lg font-headline font-bold text-slate-900">Protective Shell (Inner)</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">Trigger immediate, fail-safe hardware brake engagement. System lock until perimeter clearance check.</p>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-slate-100 grid grid-cols-2 gap-8">
                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Comms</div>
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                    <Wifi size={14} className="text-primary" /> Multi-Path Mesh
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Signal Strength</div>
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                    <Signal size={14} className="text-primary" /> -42 dBm (Excellent)
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
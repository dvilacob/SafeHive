"use client"

import { useState } from 'react';
import { Bot, User, Activity, ShieldCheck, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export function HiveInteractive() {
  const [activeShell, setActiveShell] = useState("outer");

  return (
    <section id="hive" className="py-20 bg-[#F8F9FA] border-y border-slate-200 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto bg-white border border-slate-200 shadow-sm overflow-hidden">
          
          <div className="grid lg:grid-cols-10 h-full">
            
            {/* 1. Minimalist Blueprint Canvas (Left Column - 45% Width) */}
            <div className="lg:col-span-4 bg-white border-r border-slate-100 p-8 relative min-h-[400px] flex flex-col justify-center overflow-hidden">
              {/* Technical Grid Background */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
              />
              
              <div className="relative flex items-center justify-center">
                {/* Concentric Shells */}
                <div className={cn(
                  "absolute rounded-full border border-dashed border-blue-400/40 transition-all duration-500",
                  activeShell === 'outer' ? "w-[300px] h-[300px] bg-blue-50/30 border-blue-400/80" : "w-[260px] h-[260px]"
                )} />
                <div className={cn(
                  "absolute rounded-full border border-amber-400/40 transition-all duration-500",
                  activeShell === 'middle' ? "w-[200px] h-[200px] bg-amber-50/30 border-amber-400/80" : "w-[180px] h-[180px]"
                )} />
                <div className={cn(
                  "absolute rounded-full border border-red-500/40 transition-all duration-500",
                  activeShell === 'inner' ? "w-[100px] h-[100px] bg-red-50/30 border-red-500/80" : "w-[90px] h-[90px]"
                )} />

                {/* Humanoid Anchor */}
                <div className="relative z-10 w-12 h-12 bg-white border border-slate-200 rounded shadow-sm flex items-center justify-center">
                  <Bot size={20} className="text-slate-900" />
                  <span className="absolute -top-6 text-[8px] font-mono font-bold text-slate-400 tracking-widest uppercase">Humanoid</span>
                </div>

                {/* Worker Asset */}
                <div className="absolute transition-all duration-500" style={{ transform: 'translateX(140px)' }}>
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center text-white shadow-lg">
                      <User size={14} />
                    </div>
                    <span className="text-[8px] font-mono font-bold text-slate-900 uppercase">Worker</span>
                  </div>
                </div>

                {/* Distance Indicator */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <line x1="50%" y1="50%" x2="calc(50% + 140px)" y2="50%" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" />
                  <text x="calc(50% + 70px)" y="48%" textAnchor="middle" fill="#94a3b8" fontSize="9" className="font-mono">150 mm</text>
                </svg>
              </div>
            </div>

            {/* 2. Compact Tabbed Specifications (Right Column - 55% Width) */}
            <div className="lg:col-span-6 p-10 flex flex-col justify-between">
              <div className="space-y-8">
                <div className="space-y-2">
                  <div className="text-2xl font-mono font-bold text-slate-900 tracking-tight">
                    S = Σ[(V<sub>h</sub> · T<sub>r</sub>) + (V<sub>r</sub> · T<sub>b</sub>) + (a<sub>zone</sub> · C)]
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Where a_zone allocation dictates individual body segment sensitivity per ISO/TS 15066.
                  </p>
                </div>

                <Tabs defaultValue="outer" onValueChange={setActiveShell} className="w-full">
                  <TabsList className="w-full h-auto p-0 bg-transparent border-b border-slate-100 rounded-none mb-6 gap-8">
                    <TabsTrigger value="outer" className="px-0 py-2 border-b-2 border-transparent data-[state=active]:border-blue-400 data-[state=active]:bg-transparent rounded-none text-[11px] font-bold uppercase tracking-widest">Outer Shell</TabsTrigger>
                    <TabsTrigger value="middle" className="px-0 py-2 border-b-2 border-transparent data-[state=active]:border-amber-400 data-[state=active]:bg-transparent rounded-none text-[11px] font-bold uppercase tracking-widest">Middle Shell</TabsTrigger>
                    <TabsTrigger value="inner" className="px-0 py-2 border-b-2 border-transparent data-[state=active]:border-red-500 data-[state=active]:bg-transparent rounded-none text-[11px] font-bold uppercase tracking-widest">Inner Shell</TabsTrigger>
                  </TabsList>
                  
                  <div className="min-h-[100px]">
                    <TabsContent value="outer" className="mt-0 data-[state=active]:animate-in data-[state=active]:fade-in-50">
                      <div className="flex gap-4">
                        <div className="w-1 h-12 bg-blue-400 rounded-full" />
                        <div className="space-y-2">
                          <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900">Warning State / Nominal Speed</h4>
                          <p className="text-xs text-slate-500 leading-relaxed font-medium">
                            Scaling is a direct function of velocity. The bubble dynamically expands to guarantee a safe stop separation distance as objects approach.
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="middle" className="mt-0 data-[state=active]:animate-in data-[state=active]:fade-in-50">
                      <div className="flex gap-4">
                        <div className="w-1 h-12 bg-amber-400 rounded-full" />
                        <div className="space-y-2">
                          <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900">Collaborative State / Speed &lt;250 mm/s</h4>
                          <p className="text-xs text-slate-500 leading-relaxed font-medium">
                            Enforces ISO/TS 15066 Power & Force Limiting profiles, adjusting joint torque restrictions based on localized body segment tolerances (a_zone).
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="inner" className="mt-0 data-[state=active]:animate-in data-[state=active]:fade-in-50">
                      <div className="flex gap-4">
                        <div className="w-1 h-12 bg-red-500 rounded-full" />
                        <div className="space-y-2">
                          <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900">Protective State / Fail-Safe Brake</h4>
                          <p className="text-xs text-slate-500 leading-relaxed font-medium">
                            Driven by Hive Redundancy. If spatial tracking confidence drops or the inner shell boundary is breached, a hardware brake command triggers within 10ms.
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                  </div>
                </Tabs>
              </div>

              {/* Engineering Micro-Badges (Bottom Status Bar) */}
              <div className="pt-8 flex items-center gap-6">
                {[
                  { icon: <Zap size={10} />, label: "LATENCY: <12ms" },
                  { icon: <Activity size={10} />, label: "INTEGRITY: 99.999%" },
                  { icon: <ShieldCheck size={10} />, label: "DETERMINISM: SIL 3 / PLd" }
                ].map((badge, i) => (
                  <div key={i} className="flex items-center gap-2 text-[9px] font-bold text-slate-400 tracking-widest uppercase">
                    {badge.icon}
                    {badge.label}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
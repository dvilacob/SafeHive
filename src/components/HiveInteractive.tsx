'use client';

import { useState, useMemo, useEffect } from 'react';
import { Bot, User, Activity, ShieldCheck, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

export function HiveInteractive() {
  const [activeShell, setActiveShell] = useState('outer');

  // Interactive States
  const [proximity, setProximity] = useState(400); // mm
  const [speed, setSpeed] = useState(500); // mm/s
  const [redundancy, setRedundancy] = useState(3); // 1-5 sources

  // Visual scaling factor
  const SCALE = 0.48;

  // Dynamic Shell Calculations (Visual Radii in px)
  const shells = useMemo(() => {
    const baseScale = speed / 10;
    const confidenceBuffer = (6 - redundancy) * 15;

    const inner = (50 + baseScale) * SCALE;
    const middle = inner + (60 + confidenceBuffer) * SCALE;
    const outer = middle + (80 + confidenceBuffer) * SCALE;

    return { inner, middle, outer };
  }, [speed, redundancy, SCALE]);

  // Determine active state based on proximity vs shells (Logic in mm)
  const currentZone = useMemo(() => {
    const baseScale = speed / 10;
    const confidenceBuffer = (6 - redundancy) * 15;

    const rawInner = 50 + baseScale;
    const rawMiddle = rawInner + 60 + confidenceBuffer;
    const rawOuter = rawMiddle + 80 + confidenceBuffer;

    if (proximity <= rawInner) return 'inner';
    if (proximity <= rawMiddle) return 'middle';
    return 'outer';
  }, [proximity, speed, redundancy]);

  // Sync active tab with the physical zone of the worker
  useEffect(() => {
    setActiveShell(currentZone);
  }, [currentZone]);

  return (
    <section id="hive" className="py-24 bg-[#F8F9FA] border-y border-slate-200 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto bg-white border border-slate-200 shadow-sm overflow-hidden rounded-sm">
          <div className="grid lg:grid-cols-10 h-full">
            {/* 1. Minimalist Blueprint Canvas (Left Column) */}
            <div className="lg:col-span-5 bg-white border-r border-slate-100 p-12 relative min-h-[600px] flex flex-col items-center justify-center overflow-hidden">
              {/* Technical Grid Background */}
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage:
                    'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />

              <div className="relative w-full h-full flex items-center justify-center">
                {/* Concentric Shells (Visualized as Circles) */}
                <div
                  className={cn(
                    'absolute rounded-full border border-dashed border-blue-400/40 transition-all duration-300',
                    activeShell === 'outer' && 'bg-blue-50/40 border-blue-400/80'
                  )}
                  style={{ width: shells.outer * 2, height: shells.outer * 2 }}
                />
                <div
                  className={cn(
                    'absolute rounded-full border border-amber-400/40 transition-all duration-300',
                    activeShell === 'middle' && 'bg-amber-50/40 border-amber-400/80'
                  )}
                  style={{ width: shells.middle * 2, height: shells.middle * 2 }}
                />
                <div
                  className={cn(
                    'absolute rounded-full border border-red-500/40 transition-all duration-300',
                    activeShell === 'inner' && 'bg-red-50/40 border-red-500/80'
                  )}
                  style={{ width: shells.inner * 2, height: shells.inner * 2 }}
                />

                {/* Humanoid Anchor */}
                <div className="relative z-10 w-16 h-16 bg-white border border-slate-200 rounded shadow-md flex items-center justify-center">
                  <Bot size={28} className="text-slate-900" />
                  <span className="absolute -top-8 text-[10px] font-mono font-bold text-slate-400 tracking-widest uppercase">
                    Humanoid
                  </span>
                </div>

                {/* Worker Asset */}
                <div
                  className="absolute transition-all duration-300"
                  style={{ transform: `translateX(${proximity * SCALE}px)` }}
                >
                  <div className="flex flex-col items-center gap-1.5">
                    <div
                      className={cn(
                        'w-12 h-12 rounded-full flex items-center justify-center text-white shadow-xl transition-colors',
                        activeShell === 'inner'
                          ? 'bg-red-600'
                          : activeShell === 'middle'
                            ? 'bg-amber-500'
                            : 'bg-blue-500'
                      )}
                    >
                      <User size={20} />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-slate-900 uppercase tracking-tighter">
                      Worker
                    </span>
                  </div>
                </div>

                {/* Distance Indicator */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <line
                    x1="50%"
                    y1="50%"
                    x2={`calc(50% + ${proximity * SCALE}px)`}
                    y2="50%"
                    stroke="#cbd5e1"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                  <text
                    x={`calc(50% + ${(proximity * SCALE) / 2}px)`}
                    y="47%"
                    textAnchor="middle"
                    fill="#94a3b8"
                    fontSize="12"
                    className="font-mono font-bold"
                  >
                    {proximity} mm
                  </text>
                </svg>
              </div>

              {/* Slider Controls Overlay */}
              <div className="absolute bottom-8 left-8 right-8 grid grid-cols-1 md:grid-cols-3 gap-6 bg-white/95 backdrop-blur-md p-6 border border-slate-200 shadow-lg">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      Proximity (Vh)
                    </Label>
                    <span className="text-xs font-mono font-bold text-slate-900">{proximity}mm</span>
                  </div>
                  <Slider
                    value={[proximity]}
                    onValueChange={v => setProximity(v[0])}
                    min={50}
                    max={500}
                    step={10}
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      Speed (Vr)
                    </Label>
                    <span className="text-xs font-mono font-bold text-slate-900">{speed}mm/s</span>
                  </div>
                  <Slider
                    value={[speed]}
                    onValueChange={v => setSpeed(v[0])}
                    min={100}
                    max={1500}
                    step={50}
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      Certainty (C)
                    </Label>
                    <span className="text-xs font-mono font-bold text-slate-900">{redundancy} Src</span>
                  </div>
                  <Slider
                    value={[redundancy]}
                    onValueChange={v => setRedundancy(v[0])}
                    min={1}
                    max={5}
                    step={1}
                  />
                </div>
              </div>
            </div>

            {/* 2. Compact Tabbed Specifications (Right Column) */}
            <div className="lg:col-span-5 p-12 flex flex-col justify-between bg-white">
              <div className="space-y-10">
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-900">
                    Real-Time Safety Dynamic Volumes Calculation
                  </h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    Calculated dynamically by combining individual body-part sensitivity volumes with real-time speed separation boundaries.
                  </p>
                </div>

                <Tabs value={activeShell} onValueChange={setActiveShell} className="w-full">
                  <TabsList className="w-full h-auto p-0 bg-transparent border-b border-slate-100 rounded-none mb-8 gap-6 overflow-x-auto flex-nowrap justify-start scrollbar-hide">
                    <TabsTrigger
                      value="outer"
                      className="px-0 py-3 border-b-2 border-transparent data-[state=active]:border-blue-400 data-[state=active]:bg-transparent rounded-none text-[11px] font-bold uppercase tracking-[0.2em] transition-all"
                    >
                      Outer Shell
                    </TabsTrigger>
                    <TabsTrigger
                      value="middle"
                      className="px-0 py-3 border-b-2 border-transparent data-[state=active]:border-amber-400 data-[state=active]:bg-transparent rounded-none text-[11px] font-bold uppercase tracking-[0.2em] transition-all"
                    >
                      Middle Shell
                    </TabsTrigger>
                    <TabsTrigger
                      value="inner"
                      className="px-0 py-3 border-b-2 border-transparent data-[state=active]:border-red-500 data-[state=active]:bg-transparent rounded-none text-[11px] font-bold uppercase tracking-[0.2em] transition-all"
                    >
                      Inner Shell
                    </TabsTrigger>
                  </TabsList>

                  <div className="min-h-[180px]">
                    <TabsContent value="outer" className="mt-0 space-y-4">
                      <div className="flex gap-6">
                        <div className="w-1.5 h-20 bg-blue-400 rounded-full shrink-0" />
                        <div className="space-y-3">
                          <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900">
                            Warning State / Nominal Speed
                          </h4>
                          <p className="text-sm text-slate-500 leading-relaxed font-medium">
                            Scaling is a direct function of velocity. The bubble dynamically expands to
                            guarantee a safe stop separation distance as objects approach.
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="middle" className="mt-0 space-y-4">
                      <div className="flex gap-6">
                        <div className="w-1.5 h-20 bg-amber-400 rounded-full shrink-0" />
                        <div className="space-y-3">
                          <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900">
                            Collaborative State / Speed &lt;250 mm/s
                          </h4>
                          <p className="text-sm text-slate-500 leading-relaxed font-medium">
                            Enforces ISO/TS 15066 Power & Force Limiting profiles, adjusting collaborative speed restrictions based on localized body segment tolerances (a_zone).
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="inner" className="mt-0 space-y-4">
                      <div className="flex gap-6">
                        <div className="w-1.5 h-20 bg-red-500 rounded-full shrink-0" />
                        <div className="space-y-3">
                          <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900">
                            Protective State / Fail-Safe Brake
                          </h4>
                          <p className="text-sm text-slate-500 leading-relaxed font-medium">
                            Driven by Hive Redundancy. If spatial tracking confidence drops or the inner shell
                            boundary is breached, a hardware brake command triggers within 10ms.
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                  </div>
                </Tabs>
              </div>

              {/* Engineering Micro-Badges (Bottom Status Bar) */}
              <div className="pt-10 flex items-center gap-8 border-t border-slate-50">
                {[
                  { icon: <Zap size={14} />, label: 'LATENCY: <12ms' },
                  { icon: <Activity size={14} />, label: 'INTEGRITY: 99.999%' },
                  { icon: <ShieldCheck size={14} />, label: 'DETERMINISM: SIL 3 / PLd' },
                ].map((badge, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 text-[10px] font-bold text-slate-400 tracking-widest uppercase"
                  >
                    <span className="text-primary">{badge.icon}</span>
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

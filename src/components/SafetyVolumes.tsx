'use client';

import { useState, useMemo, useEffect } from 'react';
import { Ruler, Gauge, ShieldAlert, RefreshCw, Bot, User, Target } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

export function SafetyVolumes() {
  // Interaction State
  const [proximity, setProximity] = useState(400); // mm
  const [speed, setSpeed] = useState(500); // mm/s
  const [redundancy, setRedundancy] = useState(3); // 1-5 sensors
  const [is3D, setIs3D] = useState(true);
  const [activeShell, setActiveShell] = useState('outer');
  const [visualScale, setVisualScale] = useState(0.48);

  useEffect(() => {
    const handleResize = () => {
      setVisualScale(window.innerWidth < 640 ? 0.3 : 0.48);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const boundaries = useMemo(() => {
    const baseScale = speed / 10;
    const confidenceBuffer = (6 - redundancy) * 15;
    const rawInner = 50 + baseScale;
    const rawMiddle = rawInner + 60 + confidenceBuffer;
    const rawOuter = rawMiddle + 80 + confidenceBuffer;
    return { rawInner, rawMiddle, rawOuter };
  }, [speed, redundancy]);

  const shells = useMemo(() => {
    const inner = boundaries.rawInner * visualScale;
    const middle = (boundaries.rawInner + 60 + (6 - redundancy) * 15) * visualScale;
    const outer = (boundaries.rawInner + 140 + (6 - redundancy) * 30) * visualScale;
    return { inner, middle, outer };
  }, [boundaries, visualScale, redundancy]);

  const currentZone = useMemo(() => {
    if (proximity <= boundaries.rawInner) return 'inner';
    if (proximity <= boundaries.rawMiddle) return 'middle';
    return 'outer';
  }, [proximity, boundaries]);

  useEffect(() => {
    setActiveShell(currentZone);
  }, [currentZone]);

  const handleTabChange = (val: string) => {
    setActiveShell(val);
    if (val === 'inner') {
      setProximity(Math.max(50, boundaries.rawInner - 20));
    } else if (val === 'middle') {
      setProximity((boundaries.rawInner + boundaries.rawMiddle) / 2);
    } else if (val === 'outer') {
      setProximity(Math.min(500, boundaries.rawMiddle + 40));
    }
  };

  const telemetry = [
    {
      icon: <Ruler className="w-4 h-4" />,
      label: 'PROXIMITY',
      value: 'Dynamic Tracking',
      subtext: 'Calculates real-time separation distance between the humanoid, the worker, and surrounding machinery.',
    },
    {
      icon: <Gauge className="w-4 h-4" />,
      label: 'SPEED',
      value: 'Velocity Scaled',
      subtext: 'Automatically shrinks or expands protective volumes based on the live velocity vectors of different equipment.',
    },
    {
      icon: <ShieldAlert className="w-4 h-4" />,
      label: 'MORPHOLOGY',
      value: 'ISO/TS 15066 Active',
      subtext: 'Tailors protective bubble zones to human body segments and localized impact thresholds.',
    },
    {
      icon: <RefreshCw className="w-4 h-4" />,
      label: 'HIVE INTEGRITY',
      value: 'Fused Spatial Mapping',
      subtext: 'Merges external sensor maps with humanoid vision to anchor safety bubbles over tracked and untracked machinery alike.',
    },
  ];

  const getVoxelPath = (radius: number, noise: number = 0.1) => {
    const points = 12;
    let path = "";
    for (let i = 0; i < points; i++) {
      const angle = (i / points) * Math.PI * 2;
      const n = (Math.sin(angle * 3) + Math.cos(angle * 2)) * noise * radius;
      const r = radius + n;
      const x = Math.cos(angle) * r;
      const y = Math.sin(angle) * r;
      path += `${i === 0 ? 'M' : 'L'} ${x} ${y} `;
    }
    return path + "Z";
  };

  return (
    <section id="volumes" className="py-24 bg-white border-b border-slate-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-blueprint-fine opacity-[0.03] pointer-events-none" />
      <div className="container mx-auto px-6 relative">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col lg:flex-row lg:items-start gap-16 justify-between">
            <div className="max-w-xl space-y-4">
              <span className="tech-label text-primary">Spatial Calibration Engine</span>
              <h2 className="text-3xl lg:text-5xl font-headline font-bold tracking-tight text-slate-900 leading-[1.1]">
                Continuous <br />
                <span className="text-primary italic">Volume Calibration.</span>
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed font-medium">
                SafeHive continuously resizes each protective shield by cross-referencing live operational data.
              </p>
            </div>

            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {telemetry.map((item, idx) => (
                <div key={idx} className="p-6 border border-slate-100 rounded-sm hover:border-primary/20 hover:bg-slate-50 transition-all group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-6 h-6 rounded-sm bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-primary transition-all">
                      {item.icon}
                    </div>
                    <span className="tech-label text-[8px] text-slate-400">{item.label}</span>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-slate-900 uppercase tracking-tight">
                      {item.value}
                    </div>
                    <p className="text-[10px] text-slate-500 font-medium leading-tight">
                      {item.subtext}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Simulation Dashboard */}
          <div className="max-w-6xl mx-auto bg-white border border-slate-200 shadow-sm overflow-hidden rounded-sm">
            <div className="grid lg:grid-cols-10 h-full">
              
              <div className="lg:col-span-6 bg-white border-b lg:border-b-0 lg:border-r border-slate-100 p-6 lg:p-12 relative min-h-[450px] lg:min-h-[650px] flex flex-col items-center justify-center overflow-hidden">
                
                {/* 2D/3D Toggle */}
                <div className="absolute top-6 right-6 z-[60] flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-100 shadow-sm">
                  <Label htmlFor="view-mode" className={cn("text-[10px] font-bold uppercase tracking-wider transition-colors", !is3D ? "text-slate-900" : "text-slate-400")}>2D</Label>
                  <Switch id="view-mode" checked={is3D} onCheckedChange={setIs3D} className="data-[state=checked]:bg-primary" />
                  <Label htmlFor="view-mode" className={cn("text-[10px] font-bold uppercase tracking-wider transition-colors", is3D ? "text-primary font-black" : "text-slate-400")}>3D</Label>
                </div>

                <div className={cn("relative w-full flex-1 flex items-center justify-center transition-all duration-700 ease-in-out", is3D ? "perspective-[1000px] rotate-x-[55deg] rotate-z-[-35deg] scale-110" : "scale-90")}>
                  {is3D && <div className="absolute inset-[-200%] bg-blueprint-fine opacity-20 pointer-events-none z-0" />}

                  <div className="relative flex items-center justify-center">
                    {/* Outer Shell */}
                    <div className={cn('absolute transition-all duration-500 flex items-center justify-center', is3D ? "z-0" : "rounded-full border border-dashed border-blue-400/40")} style={{ width: shells.outer * 2, height: shells.outer * 2, transform: is3D ? 'translateZ(0px)' : 'none' }}>
                      <svg viewBox="-150 -150 300 300" className={cn("w-full h-full transition-opacity", activeShell === 'outer' ? "opacity-100" : "opacity-20")}>
                        <path d={getVoxelPath(140, 0.05)} fill="rgba(59, 130, 246, 0.08)" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="2" strokeDasharray="4 2" />
                      </svg>
                    </div>

                    {/* Middle Shell */}
                    <div className={cn('absolute transition-all duration-500 flex items-center justify-center', is3D ? "z-10" : "rounded-full border border-amber-400/40")} style={{ width: shells.middle * 2, height: shells.middle * 2, transform: is3D ? 'translateZ(20px)' : 'none' }}>
                      <svg viewBox="-150 -150 300 300" className={cn("w-full h-full transition-opacity", activeShell === 'middle' ? "opacity-100" : "opacity-30")}>
                        <path d={getVoxelPath(90, 0.1)} fill="rgba(245, 158, 11, 0.1)" stroke="rgba(245, 158, 11, 0.5)" strokeWidth="3" />
                      </svg>
                    </div>

                    {/* Inner Shell */}
                    <div className={cn('absolute transition-all duration-500 flex items-center justify-center', is3D ? "z-20" : "rounded-full border border-red-500/40")} style={{ width: shells.inner * 2, height: shells.inner * 2, transform: is3D ? 'translateZ(40px)' : 'none' }}>
                      <svg viewBox="-150 -150 300 300" className={cn("w-full h-full transition-opacity", activeShell === 'inner' ? "opacity-100" : "opacity-40")}>
                        <path d={getVoxelPath(50, 0.15)} fill="rgba(239, 68, 68, 0.2)" stroke="rgba(239, 68, 68, 0.6)" strokeWidth="4" />
                      </svg>
                    </div>

                    {/* Robot Humanoid */}
                    <div className={cn("relative z-40 transition-all duration-700", is3D ? "rotate-x-[-90deg] rotate-y-[-45deg] translate-y-[-50px]" : "")}>
                       <div className="relative h-24 lg:h-32 w-12 flex items-center justify-center">
                        <svg viewBox="0 0 40 100" className="h-full w-full drop-shadow-[0_0_15px_rgba(0,102,255,0.5)]">
                          <path d="M20 5C23 5 25 7 25 10C25 13 23 15 20 15C17 15 15 13 15 10C15 7 17 5 20 5ZM12 18H28C31 18 32 20 32 22V45C32 48 30 50 27 50H13C10 50 8 48 8 45V22C8 20 9 18 12 18ZM15 55H18V95H13V55H15ZM22 55H25V95H27V55H22Z" fill="currentColor" className="text-primary animate-pulse-glow" />
                          <circle cx="20" cy="10" r="1.5" fill="white" />
                          <path d="M12 22 L28 22" stroke="white" strokeWidth="0.5" opacity="0.3" />
                          <circle cx="12" cy="22" r="1" fill="white" />
                          <circle cx="28" cy="22" r="1" fill="white" />
                        </svg>
                        <div className="absolute bottom-0 w-8 h-2 bg-primary/20 blur-sm rounded-full" />
                      </div>
                    </div>

                    {/* Worker Asset */}
                    <div className={cn("absolute transition-all duration-500", activeShell === 'inner' ? "z-[100]" : "z-[35]")} style={{ transform: `translateX(${proximity * visualScale}px)` }}>
                      <div className={cn("flex flex-col items-center gap-1.5 transition-all duration-700", is3D ? "rotate-x-[-90deg] rotate-y-[-45deg] translate-y-[-40px]" : "")}>
                        <div className="relative h-20 lg:h-24 w-10 flex items-center justify-center">
                            <svg viewBox="0 0 40 100" className={cn("h-full w-full drop-shadow-2xl transition-colors", activeShell === 'inner' ? "text-red-600" : activeShell === 'middle' ? "text-amber-500" : "text-blue-500")}>
                              <path d="M20 18C23.3 18 26 15.3 26 12C26 8.7 23.3 6 20 6C16.7 6 14 8.7 14 12C14 15.3 16.7 18 20 18ZM28 20H12C9.8 20 8 21.8 8 24V46C8 48.2 9.8 50 12 50H15V94H25V50H28C30.2 50 32 48.2 32 46V24C32 21.8 30.2 20 28 20Z" fill="currentColor" />
                            </svg>
                         </div>
                        <span className={cn("text-[10px] font-mono font-bold uppercase tracking-tighter whitespace-nowrap", is3D ? "text-white bg-slate-900/80 px-1.5 py-0.5 rounded backdrop-blur-sm" : "text-slate-900")}>Worker</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Live Sliders Overlay */}
                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 bg-white/95 backdrop-blur-md p-6 border border-slate-200 shadow-xl rounded-sm z-[150] mt-8">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">PROXIMITY (mm)</Label>
                      <span className="text-[10px] font-mono font-bold text-slate-900">{proximity}</span>
                    </div>
                    <Slider value={[proximity]} onValueChange={(v) => setProximity(v[0])} min={50} max={500} step={10} className="py-2 cursor-pointer" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">SPEED (mm/s)</Label>
                      <span className="text-[10px] font-mono font-bold text-slate-900">{speed}</span>
                    </div>
                    <Slider value={[speed]} onValueChange={(v) => setSpeed(v[0])} min={100} max={1500} step={50} className="py-2 cursor-pointer" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">SENSORS</Label>
                      <span className="text-[10px] font-mono font-bold text-slate-900">{redundancy}</span>
                    </div>
                    <Slider value={[redundancy]} onValueChange={(v) => setRedundancy(v[0])} min={1} max={5} step={1} className="py-2 cursor-pointer" />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 p-8 lg:p-12 flex flex-col justify-between bg-white">
                <div className="space-y-6 lg:space-y-8">
                  <div className="space-y-3">
                    <h3 className="text-xl font-headline font-bold text-slate-900 uppercase">Dynamic Bubble Calculation</h3>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">
                      Calculated in real time by mapping safety thresholds against machine speed, separation distance, and active tracking redundancy.
                    </p>
                  </div>

                  <Tabs value={activeShell} onValueChange={handleTabChange} className="w-full">
                    <TabsList className="w-full h-auto p-0 bg-transparent border-b border-slate-100 rounded-none mb-6 gap-4 flex justify-start overflow-x-auto scrollbar-hide">
                      <TabsTrigger value="outer" className="px-0 py-3 border-b-2 border-transparent data-[state=active]:border-blue-400 data-[state=active]:bg-transparent rounded-none text-[10px] font-bold uppercase tracking-widest transition-all">Outer</TabsTrigger>
                      <TabsTrigger value="middle" className="px-0 py-3 border-b-2 border-transparent data-[state=active]:border-amber-400 data-[state=active]:bg-transparent rounded-none text-[10px] font-bold uppercase tracking-widest transition-all">Middle</TabsTrigger>
                      <TabsTrigger value="inner" className="px-0 py-3 border-b-2 border-transparent data-[state=active]:border-red-500 data-[state=active]:bg-transparent rounded-none text-[10px] font-bold uppercase tracking-widest transition-all">Inner</TabsTrigger>
                    </TabsList>

                    <div className="min-h-[160px]">
                      <TabsContent value="outer" className="mt-0 space-y-4">
                        <div className="flex gap-4">
                          <div className="w-1.5 h-16 bg-blue-400 rounded-full shrink-0" />
                          <div className="space-y-2">
                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-900">Nominal Speed Monitoring</h4>
                            <p className="text-xs text-slate-500 leading-relaxed font-medium">The machine maintains full production speed while scaling the outer perimeter to match stopping distances.</p>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="middle" className="mt-0 space-y-4">
                        <div className="flex gap-4">
                          <div className="w-1.5 h-16 bg-amber-400 rounded-full shrink-0" />
                          <div className="space-y-2">
                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-900">Collaborative State</h4>
                            <p className="text-xs text-slate-500 leading-relaxed font-medium">Enforces Power & Force Limiting profiles, adjusting speed based on human body segment tolerances.</p>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="inner" className="mt-0 space-y-4">
                        <div className="flex gap-4">
                          <div className="w-1.5 h-16 bg-red-500 rounded-full shrink-0" />
                          <div className="space-y-2">
                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-900">Immediate Safety Stop</h4>
                            <p className="text-xs text-slate-500 leading-relaxed font-medium">If the inner boundary is breached, an emergency brake command is issued within 10ms.</p>
                          </div>
                        </div>
                      </TabsContent>
                    </div>
                  </Tabs>
                </div>

                <div className="pt-8 border-t border-slate-50 flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[8px] font-mono font-bold text-slate-400 uppercase tracking-widest">Target ISO Rating</span>
                    <span className="text-[10px] font-bold text-slate-900">{redundancy >= 4 ? 'PLe / SIL 3' : redundancy >= 2 ? 'PLd / SIL 2' : 'PLc'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[8px] font-mono font-bold text-slate-400 uppercase">10ms Deterministic Loop Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

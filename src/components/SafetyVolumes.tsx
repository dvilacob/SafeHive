'use client';

import { useState, useMemo, useEffect } from 'react';
import { Ruler, Gauge, ShieldAlert, RefreshCw, Bot, User, Zap, Ghost, ShieldCheck } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

export function SafetyVolumes() {
  // Interaction State
  const [proximity, setProximity] = useState(400); // mm
  const [speed, setSpeed] = useState(500); // mm/s
  const [redundancy, setRedundancy] = useState(3); // 1-5 sensors
  const [activeShell, setActiveShell] = useState('outer');
  const [visualScale, setVisualScale] = useState(0.48);

  // 3D is now forced as per specification
  const is3D = true;

  useEffect(() => {
    const handleResize = () => {
      setVisualScale(window.innerWidth < 640 ? 0.35 : 0.55);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Logical boundaries in mm
  const boundaries = useMemo(() => {
    const baseScale = speed / 10;
    const confidenceBuffer = (6 - redundancy) * 20;
    
    const rawInner = 60 + baseScale;
    const rawMiddle = rawInner + 80 + confidenceBuffer;
    const rawOuter = rawMiddle + 100 + confidenceBuffer;
    
    return { rawInner, rawMiddle, rawOuter };
  }, [speed, redundancy]);

  // Visual radii in pixels
  const shells = useMemo(() => {
    return {
      inner: boundaries.rawInner * visualScale,
      middle: boundaries.rawMiddle * visualScale,
      outer: boundaries.rawOuter * visualScale,
    };
  }, [boundaries, visualScale]);

  // Derive active zone from proximity
  const currentZone = useMemo(() => {
    if (proximity <= boundaries.rawInner) return 'inner';
    if (proximity <= boundaries.rawMiddle) return 'middle';
    return 'outer';
  }, [proximity, boundaries]);

  // Sync state when sliding
  useEffect(() => {
    setActiveShell(currentZone);
  }, [currentZone]);

  // Handle Tab clicks: Snap proximity to zone center
  const handleTabChange = (val: string) => {
    setActiveShell(val);
    if (val === 'inner') {
      setProximity(boundaries.rawInner * 0.6);
    } else if (val === 'middle') {
      setProximity((boundaries.rawInner + boundaries.rawMiddle) / 2);
    } else if (val === 'outer') {
      setProximity((boundaries.rawMiddle + boundaries.rawOuter) / 2);
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
      label: 'SPEED CALIBRATION',
      value: 'Velocity Scaled',
      subtext: 'Automatically shrinks or expands protective volumes based on the live velocity vectors of different equipment.',
    },
    {
      icon: <ShieldAlert className="w-4 h-4" />,
      label: 'MORPHOLOGY',
      value: 'Asset Sensitivity',
      subtext: 'Tailors protective bubble zones to human body segments and localized impact thresholds.',
    },
    {
      icon: <RefreshCw className="w-4 h-4" />,
      label: 'HIVE INTEGRITY',
      value: 'Fused Spatial Mapping',
      subtext: 'Merges external sensor maps with humanoid vision to anchor safety bubbles over tracked and untracked machinery alike.',
    },
    {
      icon: <Ghost className="w-4 h-4" />,
      label: 'UN-NETWORKED HARDWARE',
      value: 'Ghost Assets',
      subtext: "Uses the humanoid's native computer vision to detect and project safety hulls over untracked moving machinery.",
    },
    {
      icon: <Zap className="w-4 h-4" />,
      label: 'LOOP SPEED',
      value: '10ms Deterministic',
      subtext: 'Continuously re-evaluates and refreshes spatial parameters across the entire active workspace environment.',
    },
  ];

  const getVoxelPath = (radius: number, noise: number = 0.08) => {
    const points = 16;
    let path = "";
    for (let i = 0; i < points; i++) {
      const angle = (i / points) * Math.PI * 2;
      const n = (Math.sin(angle * 4) + Math.cos(angle * 3)) * noise * radius;
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
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Header Section */}
          <div className="space-y-4">
            <h2 className="text-4xl lg:text-6xl font-headline font-bold tracking-tight text-slate-900 leading-none">
              DYNAMIC BUBBLE CALCULATION<span className="text-primary">.</span>
            </h2>
            <p className="text-slate-500 text-base lg:text-lg leading-relaxed font-medium max-w-5xl">
              SafeHive continuously resizes each protective shield based on the proximity and velocity of every machine and person in the factory, tracked by different sensors and the humanoid's own vision systems in a deterministic way.
            </p>
          </div>

          {/* Telemetry Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {telemetry.map((item, idx) => (
              <div key={idx} className="p-6 border border-slate-100 rounded-sm bg-slate-50/50 hover:border-primary/20 hover:bg-white transition-all group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-primary/40 group-hover:text-primary transition-colors">
                    {item.icon}
                  </div>
                  <span className="tech-label text-[10px] text-slate-400 font-bold tracking-widest uppercase">{item.label}</span>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-bold text-slate-900 uppercase tracking-tight">
                    {item.value}
                  </div>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    {item.subtext}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Simulation Dashboard */}
          <div className="max-w-6xl mx-auto bg-white border border-slate-200 shadow-sm overflow-hidden rounded-sm mt-12">
            <div className="grid lg:grid-cols-10 h-full">
              
              <div className="lg:col-span-6 bg-white border-b lg:border-b-0 lg:border-r border-slate-100 p-6 lg:p-8 relative min-h-[500px] lg:min-h-[600px] flex flex-col items-center justify-center overflow-hidden">
                
                {/* Simulation Canvas */}
                <div className="relative w-full flex-1 flex items-center justify-center transition-all duration-700 ease-in-out perspective-[1200px] rotate-x-[60deg] rotate-z-[-45deg] scale-110">
                  <div className="absolute inset-[-200%] bg-blueprint-fine opacity-20 pointer-events-none z-0" />

                  <div className="relative flex items-center justify-center">
                    {/* Outer Shell */}
                    <div className="absolute transition-all duration-500" style={{ width: shells.outer * 2, height: shells.outer * 2 }}>
                      <svg viewBox="-150 -150 300 300" className={cn("w-full h-full transition-opacity", activeShell === 'outer' ? "opacity-100" : "opacity-15")}>
                        <path d={getVoxelPath(140)} fill="rgba(59, 130, 246, 0.08)" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="2" strokeDasharray="4 2" />
                      </svg>
                    </div>

                    {/* Middle Shell */}
                    <div className="absolute transition-all duration-500" style={{ width: shells.middle * 2, height: shells.middle * 2 }}>
                      <svg viewBox="-150 -150 300 300" className={cn("w-full h-full transition-opacity", activeShell === 'middle' ? "opacity-100" : "opacity-25")}>
                        <path d={getVoxelPath(90, 0.12)} fill="rgba(245, 158, 11, 0.1)" stroke="rgba(245, 158, 11, 0.5)" strokeWidth="3" />
                      </svg>
                    </div>

                    {/* Inner Shell */}
                    <div className="absolute transition-all duration-500" style={{ width: shells.inner * 2, height: shells.inner * 2 }}>
                      <svg viewBox="-150 -150 300 300" className={cn("w-full h-full transition-opacity", activeShell === 'inner' ? "opacity-100" : "opacity-35")}>
                        <path d={getVoxelPath(50, 0.15)} fill="rgba(239, 68, 68, 0.2)" stroke="rgba(239, 68, 68, 0.6)" strokeWidth="4" />
                      </svg>
                    </div>

                    {/* Robot Humanoid Digital Twin */}
                    <div className="relative z-40 transition-all duration-700 rotate-z-[45deg] rotate-x-[-90deg] translate-y-[-60px]">
                       <div className="relative h-28 lg:h-36 w-14 flex items-center justify-center">
                        <svg viewBox="0 0 40 100" className="h-full w-full drop-shadow-[0_0_20px_rgba(0,102,255,0.4)]">
                          <path d="M20 5C23 5 25 7 25 10C25 13 23 15 20 15C17 15 15 13 15 10C15 7 17 5 20 5ZM10 18H30V48H26V95H14V48H10V18ZM16 22V44H24V22H16Z" fill="currentColor" className="text-primary animate-pulse-glow" />
                          <rect x="18" y="24" width="4" height="12" fill="white" opacity="0.4" />
                          <circle cx="15" cy="10" r="1" fill="white" />
                          <circle cx="25" cy="10" r="1" fill="white" />
                          <circle cx="10" cy="22" r="1.5" fill="#06b6d4" />
                          <circle cx="30" cy="22" r="1.5" fill="#06b6d4" />
                        </svg>
                        <div className="absolute bottom-0 w-10 h-2 bg-primary/20 blur-md rounded-full" />
                      </div>
                    </div>

                    {/* Human Worker Asset */}
                    <div 
                      className={cn("absolute transition-all duration-500 ease-out", activeShell === 'inner' ? "z-[100]" : "z-[35]")} 
                      style={{ transform: `translateX(${proximity * visualScale}px)` }}
                    >
                      <div className="flex flex-col items-center gap-2 transition-all duration-700 rotate-z-[45deg] rotate-x-[-90deg] translate-y-[-50px]">
                        <div className="relative h-24 lg:h-30 w-12 flex items-center justify-center">
                            <svg viewBox="0 0 40 100" className={cn("h-full w-full drop-shadow-2xl transition-colors duration-500", currentZone === 'inner' ? "text-red-600" : currentZone === 'middle' ? "text-amber-500" : "text-blue-500")}>
                              <path d="M20 18C23.3 18 26 15.3 26 12C26 8.7 23.3 6 20 6C16.7 6 14 8.7 14 12C14 15.3 16.7 18 20 18ZM28 20H12C9.8 20 8 21.8 8 24V46H12V94H28V46H32V24C32 21.8 30.2 20 28 20Z" fill="currentColor" />
                            </svg>
                         </div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-tighter whitespace-nowrap px-2 py-0.5 rounded backdrop-blur-md text-white bg-slate-900/80">
                          Worker
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interactive Sliders Overlay */}
                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 bg-white/95 backdrop-blur-md p-6 border border-slate-200 shadow-xl rounded-sm z-[150] mt-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Label className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">PROXIMITY (mm)</Label>
                      <span className="text-[10px] font-mono font-bold text-slate-900">{proximity}</span>
                    </div>
                    <Slider value={[proximity]} onValueChange={(v) => setProximity(v[0])} min={50} max={boundaries.rawOuter} step={5} className="py-2 cursor-pointer" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Label className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">SPEED (mm/s)</Label>
                      <span className="text-[10px] font-mono font-bold text-slate-900">{speed}</span>
                    </div>
                    <Slider value={[speed]} onValueChange={(v) => setSpeed(v[0])} min={100} max={1500} step={50} className="py-2 cursor-pointer" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Label className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">SENSORS</Label>
                      <span className="text-[10px] font-mono font-bold text-slate-900">{redundancy}</span>
                    </div>
                    <Slider value={[redundancy]} onValueChange={(v) => setRedundancy(v[0])} min={1} max={5} step={1} className="py-2 cursor-pointer" />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 p-6 lg:p-8 flex flex-col justify-between bg-white">
                <div className="space-y-8">
                  <Tabs value={activeShell} onValueChange={handleTabChange} className="w-full">
                    <TabsList className="w-full h-auto p-0 bg-transparent border-b border-slate-100 rounded-none mb-6 gap-4 flex justify-start overflow-x-auto scrollbar-hide">
                      <TabsTrigger value="outer" className="px-0 py-2 border-b-2 border-transparent data-[state=active]:border-blue-400 data-[state=active]:bg-transparent rounded-none text-xs font-bold uppercase tracking-widest transition-all">Outer Shell</TabsTrigger>
                      <TabsTrigger value="middle" className="px-0 py-2 border-b-2 border-transparent data-[state=active]:border-amber-400 data-[state=active]:bg-transparent rounded-none text-xs font-bold uppercase tracking-widest transition-all">Middle Shell</TabsTrigger>
                      <TabsTrigger value="inner" className="px-0 py-2 border-b-2 border-transparent data-[state=active]:border-red-500 data-[state=active]:bg-transparent rounded-none text-xs font-bold uppercase tracking-widest transition-all">Inner Shell</TabsTrigger>
                    </TabsList>

                    <div className="min-h-[140px]">
                      <TabsContent value="outer" className="mt-0 space-y-3">
                        <div className="flex gap-4">
                          <div className="w-1.5 h-16 bg-blue-400 rounded-full shrink-0" />
                          <div className="space-y-1">
                            <h4 className="text-sm font-bold uppercase tracking-tight text-slate-900">Nominal Speed Monitoring</h4>
                            <p className="text-xs text-slate-500 leading-relaxed font-medium">The machine maintains full production speed while scaling the outer perimeter to match required stopping distances.</p>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="middle" className="mt-0 space-y-3">
                        <div className="flex gap-4">
                          <div className="w-1.5 h-16 bg-amber-400 rounded-full shrink-0" />
                          <div className="space-y-1">
                            <h4 className="text-sm font-bold uppercase tracking-tight text-slate-900">Collaborative State</h4>
                            <p className="text-xs text-slate-500 leading-relaxed font-medium">Enforces ISO/TS 15066 Power & Force Limiting profiles, adjusting speed based on body segment tolerances.</p>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="inner" className="mt-0 space-y-3">
                        <div className="flex gap-4">
                          <div className="w-1.5 h-16 bg-red-500 rounded-full shrink-0" />
                          <div className="space-y-1">
                            <h4 className="text-sm font-bold uppercase tracking-tight text-slate-900">Immediate Safety Stop</h4>
                            <p className="text-xs text-slate-500 leading-relaxed font-medium">If the inner boundary is breached or tracking confidence falls, an emergency brake command is issued within 10ms.</p>
                          </div>
                        </div>
                      </TabsContent>
                    </div>
                  </Tabs>
                </div>

                <div className="pt-6 border-t border-slate-50 flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Target ISO Rating</span>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      <span className="text-sm font-bold text-slate-900">
                        {redundancy >= 4 ? 'PLe / SIL 3' : redundancy >= 2 ? 'PLd / SIL 2' : 'PLc'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">10ms Deterministic Loop Active</span>
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

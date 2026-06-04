'use client';

import { useState, useMemo, useEffect } from 'react';
import { Ruler, Gauge, ShieldAlert, RefreshCw, Bot, User, Zap, Ghost, ShieldCheck } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

export function SafetyVolumes() {
  const [proximity, setProximity] = useState(400); 
  const [speed, setSpeed] = useState(500); 
  const [redundancy, setRedundancy] = useState(3); 
  const [activeShell, setActiveShell] = useState('outer');
  const [visualScale, setVisualScale] = useState(0.55);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 480) {
        setVisualScale(0.28);
      } else if (window.innerWidth < 768) {
        setVisualScale(0.35);
      } else {
        setVisualScale(0.55);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeResizeListener?.('resize', handleResize);
  }, []);

  const boundaries = useMemo(() => {
    const baseScale = speed / 10;
    const confidenceBuffer = (6 - redundancy) * 20;
    const rawInner = 60 + baseScale;
    const rawMiddle = rawInner + 80 + confidenceBuffer;
    const rawOuter = rawMiddle + 100 + confidenceBuffer;
    return { rawInner, rawMiddle, rawOuter };
  }, [speed, redundancy]);

  const shells = useMemo(() => {
    return {
      inner: boundaries.rawInner * visualScale,
      middle: boundaries.rawMiddle * visualScale,
      outer: boundaries.rawOuter * visualScale,
    };
  }, [boundaries, visualScale]);

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
    if (val === 'inner') setProximity(boundaries.rawInner * 0.6);
    else if (val === 'middle') setProximity((boundaries.rawInner + boundaries.rawMiddle) / 2);
    else if (val === 'outer') setProximity((boundaries.rawMiddle + boundaries.rawOuter) / 2);
  };

  const getVoxelPath = (radius: number, noise: number = 0.08) => {
    const points = 16;
    let path = "";
    for (let i = 0; i <= points; i++) {
      const angle = (i / points) * Math.PI * 2;
      const n = (Math.sin(angle * 4) + Math.cos(angle * 3)) * noise * radius;
      const r = radius + n;
      const x = Math.cos(angle) * r;
      const y = Math.sin(angle) * r;
      path += `${i === 0 ? 'M' : 'L'} ${x} ${y} `;
    }
    return path;
  };

  const VolumetricEnvelope = ({ radius, color, isActive, noise }: { radius: number, color: string, isActive: boolean, noise: number }) => {
    const layers = [0, 40, 80, 120, 160]; 
    const maxZ = 160;
    
    return (
      <div className="absolute flex items-center justify-center transition-all duration-500" style={{ width: radius * 2, height: radius * 2 }}>
        <svg viewBox="-150 -150 300 300" className={cn("w-full h-full transition-opacity duration-500", isActive ? "opacity-100" : "opacity-15")}>
          {layers.map((z, idx) => (
            <path
              key={idx}
              d={getVoxelPath(140 * (radius / shells.outer), noise)}
              fill={idx === 0 ? `${color}10` : 'transparent'}
              stroke={color}
              strokeWidth={isActive ? 2 : 1}
              strokeOpacity={1 - (idx / layers.length * 0.5)}
              transform={`translate(0, ${-z})`}
              className="transition-all duration-700"
            />
          ))}
          <line x1="-140" y1="0" x2="-140" y2={-maxZ} stroke={color} strokeWidth="0.5" strokeOpacity="0.2" transform={`scale(${radius / shells.outer})`} />
          <line x1="140" y1="0" x2="140" y2={-maxZ} stroke={color} strokeWidth="0.5" strokeOpacity="0.2" transform={`scale(${radius / shells.outer})`} />
        </svg>
      </div>
    );
  };

  const telemetry = [
    { icon: <Ruler className="w-16 h-16" />, value: 'Proximity', subtext: 'Calculates real-time separation distance between the humanoid, the worker, and surrounding machinery.' },
    { icon: <Gauge className="w-16 h-16" />, value: 'Speed Calibration', subtext: 'Automatically scales protective volumes based on the live velocity vectors of different equipment.' },
    { icon: <ShieldAlert className="w-16 h-16" />, value: 'Component Sensitivity', subtext: 'Enforces ISO/TS 15066 force limits for human skin while dynamically shielding fragile, high-value machine sensors from impact.' },
    { icon: <RefreshCw className="w-16 h-16" />, value: 'Hive Redundancy', subtext: 'Merges external sensor maps with humanoid vision to anchor safety bubbles over tracked and untracked machinery alike.' },
    { icon: <Ghost className="w-16 h-16" />, value: 'Un-networked Hardware', subtext: "Identifies and projects safety hulls over legacy or untracked industrial equipment within the workspace." },
    { icon: <Zap className="w-16 h-16" />, value: 'Loop Speed', subtext: 'Continuously re-evaluates and refreshes spatial parameters across the entire active workspace environment.' },
  ];

  return (
    <section id="volumes" className="py-24 bg-white border-b border-slate-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-blueprint-fine opacity-[0.03] pointer-events-none" />
      <div className="container mx-auto px-6 relative">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="space-y-6 text-center max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-[7rem] font-headline font-bold tracking-tighter text-slate-900 leading-none">
              DYNAMIC BUBBLE CALCULATION<span className="text-primary">.</span>
            </h2>
            <p className="text-slate-500 text-base lg:text-xl leading-relaxed font-medium px-4 max-w-3xl mx-auto">
              SafeHive continuously resizes each protective shield based on the proximity and velocity of every machine and person in the factory, tracked by different sensors and the humanoid's own vision systems in a deterministic way.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {telemetry.map((item, idx) => (
              <div key={idx} className="p-8 lg:p-10 border border-slate-100 rounded-sm bg-slate-50/50 hover:border-primary/20 hover:bg-white transition-all group flex flex-col h-full shadow-sm hover:shadow-xl hover:shadow-primary/5">
                <div className="mb-6 lg:mb-8 text-primary group-hover:scale-105 transition-transform duration-500 flex justify-center">
                  {item.icon}
                </div>
                <div className="space-y-4 flex-1 text-center">
                  <div className="text-2xl lg:text-4xl font-headline font-bold text-slate-900 uppercase tracking-tight leading-none">
                    {item.value}
                  </div>
                  <p className="text-xs lg:text-sm text-slate-500 font-medium leading-relaxed">
                    {item.subtext}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-6xl mx-auto bg-white border border-slate-200 shadow-sm overflow-hidden rounded-sm mt-12">
            <div className="grid lg:grid-cols-10 h-full">
              <div className="lg:col-span-6 bg-white border-b lg:border-b-0 lg:border-r border-slate-100 p-6 lg:p-8 relative min-h-[500px] lg:min-h-[800px] flex flex-col items-center justify-center overflow-hidden">
                <div className="relative w-full flex-1 flex items-center justify-center transition-all duration-700 ease-in-out perspective-[1500px] rotate-x-[60deg] rotate-z-[-45deg] scale-100 lg:scale-110">
                  <div className="absolute inset-[-200%] bg-blueprint-fine opacity-20 pointer-events-none z-0" />
                  <div className="relative flex items-center justify-center">
                    <VolumetricEnvelope radius={shells.outer} color="#3b82f6" isActive={activeShell === 'outer'} noise={0.06} />
                    <VolumetricEnvelope radius={shells.middle} color="#f59e0b" isActive={activeShell === 'middle'} noise={0.1} />
                    <VolumetricEnvelope radius={shells.inner} color="#ef4444" isActive={activeShell === 'inner'} noise={0.14} />

                    {/* Robot Asset - Grounded */}
                    <div className="relative z-40 transition-all duration-700 rotate-z-[45deg] rotate-x-[-90deg] translate-y-0">
                       <div className="relative h-28 lg:h-48 w-14 flex items-center justify-center">
                        <svg viewBox="0 0 40 100" className="h-full w-full drop-shadow-[0_0_25px_rgba(0,102,255,0.4)]">
                          <path d="M20 5C23 5 25 7 25 10C25 13 23 15 20 15C17 15 15 13 15 10C15 7 17 5 20 5ZM10 18H30V48H26V95H14V48H10V18ZM16 22V44H24V22H16Z" fill="currentColor" className="text-primary animate-pulse-glow" />
                        </svg>
                        <div className="absolute bottom-0 w-10 h-3 bg-primary/20 blur-md rounded-full" />
                      </div>
                    </div>

                    {/* Worker Asset - Grounded */}
                    <div className={cn("absolute transition-all duration-500 ease-out", activeShell === 'inner' ? "z-[100]" : "z-[35]")} style={{ transform: `translateX(${proximity * visualScale}px)` }}>
                      <div className="flex flex-col items-center gap-2 transition-all duration-700 rotate-z-[45deg] rotate-x-[-90deg] translate-y-0">
                        <div className="relative h-24 lg:h-40 w-12 flex items-center justify-center">
                            <svg viewBox="0 0 40 100" className={cn("h-full w-full drop-shadow-2xl transition-colors duration-500", currentZone === 'inner' ? "text-red-600" : currentZone === 'middle' ? "text-amber-500" : "text-blue-500")}>
                              <path d="M20 18C23.3 18 26 15.3 26 12C26 8.7 23.3 6 20 6C16.7 6 14 8.7 14 12C14 15.3 16.7 18 20 18ZM28 20H12C9.8 20 8 21.8 8 24V46H12V94H28V46H32V24C32 21.8 30.2 20 28 20Z" fill="currentColor" />
                            </svg>
                         </div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-tighter whitespace-nowrap px-2 py-0.5 rounded backdrop-blur-md text-white bg-slate-900/80">Worker</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 bg-white/95 backdrop-blur-md p-6 lg:p-8 border border-slate-200 shadow-xl rounded-sm z-[150] mt-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Label className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">PROXIMITY</Label>
                      <span className="text-[10px] font-mono font-bold text-slate-900">{proximity}mm</span>
                    </div>
                    <Slider value={[proximity]} onValueChange={(v) => setProximity(v[0])} min={50} max={boundaries.rawOuter} step={5} className="py-2 cursor-pointer" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Label className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">SPEED</Label>
                      <span className="text-[10px] font-mono font-bold text-slate-900">{speed}mm/s</span>
                    </div>
                    <Slider value={[speed]} onValueChange={(v) => setSpeed(v[0])} min={100} max={1500} step={50} className="py-2 cursor-pointer" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Label className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">HIVE SENSORS</Label>
                      <span className="text-[10px] font-mono font-bold text-slate-900">{redundancy}</span>
                    </div>
                    <Slider value={[redundancy]} onValueChange={(v) => setRedundancy(v[0])} min={1} max={5} step={1} className="py-2 cursor-pointer" />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 p-8 lg:p-12 flex flex-col justify-between bg-white">
                <div className="space-y-10">
                  <Tabs value={activeShell} onValueChange={handleTabChange} className="w-full">
                    <TabsList className="w-full h-auto p-0 bg-transparent border-b border-slate-100 rounded-none mb-8 flex justify-between overflow-hidden">
                      <TabsTrigger value="outer" className="flex-1 px-0 py-5 border-b-2 border-transparent data-[state=active]:border-blue-400 data-[state=active]:bg-transparent rounded-none text-[10px] lg:text-xs font-bold uppercase tracking-widest transition-all">Outer</TabsTrigger>
                      <TabsTrigger value="middle" className="flex-1 px-0 py-5 border-b-2 border-transparent data-[state=active]:border-amber-400 data-[state=active]:bg-transparent rounded-none text-[10px] lg:text-xs font-bold uppercase tracking-widest transition-all">Middle</TabsTrigger>
                      <TabsTrigger value="inner" className="flex-1 px-0 py-5 border-b-2 border-transparent data-[state=active]:border-red-500 data-[state=active]:bg-transparent rounded-none text-[10px] lg:text-xs font-bold uppercase tracking-widest transition-all">Inner</TabsTrigger>
                    </TabsList>

                    <div className="min-h-[160px]">
                      <TabsContent value="outer" className="mt-0 space-y-4">
                        <div className="flex gap-5">
                          <div className="w-1.5 h-20 bg-blue-400 rounded-full shrink-0" />
                          <div className="space-y-3">
                            <h4 className="text-xl font-bold uppercase tracking-tight text-slate-900">Nominal Speed</h4>
                            <p className="text-sm text-slate-500 leading-relaxed font-medium">The machine maintains full production speed while scaling the outer perimeter to match required stopping distances.</p>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="middle" className="mt-0 space-y-4">
                        <div className="flex gap-5">
                          <div className="w-1.5 h-20 bg-amber-400 rounded-full shrink-0" />
                          <div className="space-y-3">
                            <h4 className="text-xl font-bold uppercase tracking-tight text-slate-900">Collaborative</h4>
                            <p className="text-sm text-slate-500 leading-relaxed font-medium">Enforces ISO/TS 15066 Power & Force Limiting profiles, adjusting speed based on body segment tolerances.</p>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="inner" className="mt-0 space-y-4">
                        <div className="flex gap-5">
                          <div className="w-1.5 h-20 bg-red-500 rounded-full shrink-0" />
                          <div className="space-y-3">
                            <h4 className="text-xl font-bold uppercase tracking-tight text-slate-900">E-Stop</h4>
                            <p className="text-sm text-slate-500 leading-relaxed font-medium">If the inner boundary is breached or tracking confidence falls, an emergency brake command is issued within 10ms.</p>
                          </div>
                        </div>
                      </TabsContent>
                    </div>
                  </Tabs>
                </div>

                <div className="pt-10 border-t border-slate-50 flex flex-col gap-6">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">ISO RATING</span>
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="w-6 h-6 text-emerald-500" />
                      <span className="text-lg lg:text-xl font-bold text-slate-900">
                        {redundancy >= 4 ? 'PLe / SIL 3' : redundancy >= 2 ? 'PLd / SIL 2' : 'PLc'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">Deterministic Loop Active</span>
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

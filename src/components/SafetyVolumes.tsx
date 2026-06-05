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
        setVisualScale(0.35);
      } else if (window.innerWidth < 768) {
        setVisualScale(0.45);
      } else {
        setVisualScale(0.55);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const boundaries = useMemo(() => {
    const baseScale = speed / 10;
    const confidenceBuffer = (6 - redundancy) * 20;
    const rawInner = 60 + baseScale + (confidenceBuffer * 0.5); 
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

  const VolumetricEnvelope = ({ radius, color, isActive }: { radius: number, color: string, isActive: boolean }) => {
    const ry = radius * 0.6; // Perspective ratio
    const h = 250; // Total height of cylinder
    const ribs = [0, 45, 90, 135, 180, 225, 270, 315];

    return (
      <g className={cn("transition-all duration-700", isActive ? "opacity-100" : "opacity-10")}>
        <defs>
          <linearGradient id={`grad-${color.replace('#', '')}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.25" />
            <stop offset="100%" stopColor={color} stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Cylinder Body */}
        <path
          d={`M -${radius},0 L -${radius},-${h} A ${radius},${ry} 0 0,1 ${radius},-${h} L ${radius},0 A ${radius},${ry} 0 0,1 -${radius},0`}
          fill={`url(#grad-${color.replace('#', '')})`}
          stroke={color}
          strokeWidth={isActive ? 0.8 : 0.4}
          strokeOpacity={isActive ? 0.3 : 0.1}
        />
        
        {/* Structural Ribs */}
        {ribs.map((angle) => {
          const rad = (angle * Math.PI) / 180;
          const x = Math.cos(rad) * radius;
          const y = Math.sin(rad) * ry;
          const isFront = angle >= 180; 
          return (
            <line
              key={angle}
              x1={x}
              y1={y}
              x2={x}
              y2={y - h}
              stroke={color}
              strokeWidth={isActive ? 0.6 : 0.3}
              strokeOpacity={isActive ? (isFront ? 0.5 : 0.15) : 0.05}
            />
          );
        })}

        {/* Top Cap */}
        <ellipse
          cx="0"
          cy={-h}
          rx={radius}
          ry={ry}
          fill={color}
          fillOpacity={isActive ? "0.1" : "0.02"}
          stroke={color}
          strokeWidth={isActive ? 1.5 : 0.4}
        />

        {/* Scanner Ring Effect */}
        {isActive && (
          <ellipse
            cx="0"
            cy={-h}
            rx={radius * 0.9}
            ry={ry * 0.9}
            fill="none"
            stroke={color}
            strokeWidth="0.5"
            strokeDasharray="4 4"
            className="animate-pulse"
          />
        )}

        {/* Base Ring */}
        <ellipse
          cx="0"
          cy="0"
          rx={radius}
          ry={ry}
          fill="none"
          stroke={color}
          strokeWidth={isActive ? 2 : 0.5}
          strokeDasharray="2 4"
          strokeOpacity={isActive ? 0.8 : 0.2}
        />
      </g>
    );
  };

  const telemetry = [
    { icon: <Ruler className="w-12 h-12 lg:w-16 lg:h-16" />, value: 'Proximity', subtext: 'Calculates real-time separation distance between the humanoid, the worker, and surrounding machinery.' },
    { icon: <Gauge className="w-12 h-12 lg:w-16 lg:h-16" />, value: 'Speed Calibration', subtext: 'Automatically scales protective volumes based on the live velocity vectors of different equipment.' },
    { icon: <ShieldAlert className="w-12 h-12 lg:w-16 lg:h-16" />, value: 'ADAPTIVE SAFETY SHIELDING', subtext: 'Helps you align with ISO standards by enforcing safe interaction limits, protecting sensitive equipment, and achieving the required PFH_D thresholds for modern safety architectures.' },
    { icon: <RefreshCw className="w-12 h-12 lg:w-16 lg:h-16" />, value: 'Hive Redundancy', subtext: "SafeHive blends factory sensor data with the robot's own eyes to lock a protective safety bubble around every machine, humanoid, and person on the floor." },
    { icon: <Ghost className="w-12 h-12 lg:w-16 lg:h-16" />, value: 'Un-networked Hardware', subtext: "Identifies and projects safety hulls over legacy or untracked industrial equipment within the workspace." },
    { icon: <Zap className="w-12 h-12 lg:w-16 lg:h-16" />, value: 'Loop Speed', subtext: 'Continuously re-evaluates and refreshes spatial parameters across the entire active workspace environment.' },
  ];

  return (
    <section id="volumes" className="py-12 lg:py-24 bg-white border-b border-slate-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-blueprint-fine opacity-[0.03] pointer-events-none" />
      <div className="container mx-auto px-6 relative">
        <div className="max-w-7xl mx-auto space-y-12 lg:space-y-20">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
            {telemetry.map((item, idx) => (
              <div key={idx} className="p-6 lg:p-10 border border-slate-100 rounded-sm bg-slate-50/50 hover:border-primary/20 hover:bg-white transition-all group flex flex-col h-full shadow-sm hover:shadow-xl hover:shadow-primary/5">
                <div className="mb-4 lg:mb-8 text-primary group-hover:scale-105 transition-transform duration-500 flex justify-center">
                  {item.icon}
                </div>
                <div className="space-y-2 lg:space-y-4 flex-1 text-center">
                  <div className="text-xl lg:text-3xl font-headline font-bold text-slate-900 uppercase tracking-tight leading-tight">
                    {item.value}
                  </div>
                  <p className="text-[10px] lg:text-sm text-slate-500 font-medium leading-relaxed">
                    {item.subtext}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-6xl mx-auto bg-white border border-slate-200 shadow-sm overflow-hidden rounded-sm">
            <div className="grid lg:grid-cols-10 h-full">
              <div className="lg:col-span-6 bg-white border-b lg:border-b-0 lg:border-r border-slate-100 p-4 lg:p-8 relative min-h-[450px] lg:min-h-[850px] flex flex-col items-center justify-center overflow-hidden">
                
                <div className="relative w-full flex-1 flex items-center justify-center transition-all duration-700 ease-in-out perspective-[1500px] rotate-x-[30deg] rotate-z-[-15deg] scale-100 lg:scale-110">
                  <div className="absolute inset-[-200%] bg-blueprint-fine opacity-20 pointer-events-none z-0" />
                  
                  <div className="relative w-full aspect-square max-w-[500px] flex items-center justify-center">
                    <svg viewBox="-300 -500 600 600" className="w-full h-full drop-shadow-2xl">
                      <VolumetricEnvelope radius={shells.outer} color="#3b82f6" isActive={activeShell === 'outer'} />
                      <VolumetricEnvelope radius={shells.middle} color="#f59e0b" isActive={activeShell === 'middle'} />
                      <VolumetricEnvelope radius={shells.inner} color="#ef4444" isActive={activeShell === 'inner'} />

                      {/* Humanoid Silhouette (2x Scale) */}
                      <g transform="translate(0, 0) scale(2)" className="text-primary transition-all duration-700">
                        <g transform="translate(-20, -100)">
                           <path d="M20 5C23 5 25 7 25 10C25 13 23 15 20 15C17 15 15 13 15 10C15 7 17 5 20 5ZM10 18H30V48H26V95H14V48H10V18ZM16 22V44H24V22H16Z" fill="currentColor" className="animate-pulse-glow" />
                        </g>
                      </g>

                      {/* Worker Silhouette (2x Scale) */}
                      <g transform={`translate(${proximity * visualScale}, 0) scale(2)`} className={cn("transition-all duration-500", currentZone === 'inner' ? "text-red-600" : currentZone === 'middle' ? "text-amber-500" : "text-blue-500")}>
                        <g transform="translate(-20, -100)">
                           <path d="M20 18C23.3 18 26 15.3 26 12C26 8.7 23.3 6 20 6C16.7 6 14 8.7 14 12C14 15.3 16.7 18 20 18ZM28 20H12C9.8 20 8 21.8 8 24V46H12V94H28V46H32V24C32 21.8 30.2 20 28 20Z" fill="currentColor" />
                        </g>
                      </g>
                    </svg>
                  </div>
                </div>

                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 bg-white/95 backdrop-blur-md p-4 lg:p-8 border border-slate-200 shadow-xl rounded-sm z-[150] mt-4">
                  <div className="space-y-2 lg:space-y-3">
                    <div className="flex justify-between items-center">
                      <Label className="text-[8px] lg:text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">PROXIMITY</Label>
                      <span className="text-[10px] font-mono font-bold text-slate-900">{proximity}mm</span>
                    </div>
                    <Slider value={[proximity]} onValueChange={(v) => setProximity(v[0])} min={50} max={boundaries.rawOuter} step={5} className="py-2 cursor-pointer" />
                  </div>
                  <div className="space-y-2 lg:space-y-3">
                    <div className="flex justify-between items-center">
                      <Label className="text-[8px] lg:text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">SPEED</Label>
                      <span className="text-[10px] font-mono font-bold text-slate-900">{speed}mm/s</span>
                    </div>
                    <Slider value={[speed]} onValueChange={(v) => setSpeed(v[0])} min={100} max={1500} step={50} className="py-2 cursor-pointer" />
                  </div>
                  <div className="space-y-2 lg:space-y-3">
                    <div className="flex justify-between items-center">
                      <Label className="text-[8px] lg:text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">HIVE SENSORS</Label>
                      <span className="text-[10px] font-mono font-bold text-slate-900">{redundancy}</span>
                    </div>
                    <Slider value={[redundancy]} onValueChange={(v) => setRedundancy(v[0])} min={1} max={5} step={1} className="py-2 cursor-pointer" />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 p-6 lg:p-12 flex flex-col justify-between bg-white">
                <div className="space-y-8 lg:space-y-10">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-headline font-bold text-slate-900 uppercase tracking-tight">Body-Aware Protective Volumes</h3>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">
                      SafeHive projects multi-segmented volumetric hulls that adapt to human morphology, ensuring higher precision than primitive geometric cylinders.
                    </p>
                  </div>

                  <Tabs value={activeShell} onValueChange={handleTabChange} className="w-full">
                    <TabsList className="w-full h-auto p-1.5 bg-slate-100 border border-slate-200 rounded-lg mb-6 lg:mb-8 flex justify-between gap-1 shadow-inner relative">
                      <TabsTrigger 
                        value="outer" 
                        className="flex-1 px-1 py-3 lg:py-4 border-b-2 border-transparent data-[state=active]:border-blue-400 data-[state=active]:bg-white data-[state=active]:shadow-lg hover:bg-slate-200/50 rounded-md text-[8px] lg:text-xs font-bold uppercase tracking-widest transition-all cursor-pointer group"
                      >
                        <span className="group-data-[state=active]:text-blue-600">Outer Shell</span>
                      </TabsTrigger>
                      <TabsTrigger 
                        value="middle" 
                        className="flex-1 px-1 py-3 lg:py-4 border-b-2 border-transparent data-[state=active]:border-amber-400 data-[state=active]:bg-white data-[state=active]:shadow-lg hover:bg-slate-200/50 rounded-md text-[8px] lg:text-xs font-bold uppercase tracking-widest transition-all cursor-pointer group"
                      >
                        <span className="group-data-[state=active]:text-amber-600">Middle Shell</span>
                      </TabsTrigger>
                      <TabsTrigger 
                        value="inner" 
                        className="flex-1 px-1 py-3 lg:py-4 border-b-2 border-transparent data-[state=active]:border-red-500 data-[state=active]:bg-white data-[state=active]:shadow-lg hover:bg-slate-200/50 rounded-md text-[8px] lg:text-xs font-bold uppercase tracking-widest transition-all cursor-pointer group"
                      >
                        <span className="group-data-[state=active]:text-red-600">Inner Shell</span>
                      </TabsTrigger>
                    </TabsList>

                    <div className="min-h-[140px] lg:min-h-[160px]">
                      <TabsContent value="outer" className="mt-0 space-y-3 lg:space-y-4">
                        <div className="flex gap-4 lg:gap-5">
                          <div className="w-1 h-16 lg:w-1.5 lg:h-20 bg-blue-400 rounded-full shrink-0" />
                          <div className="space-y-2 lg:space-y-3">
                            <h4 className="text-lg lg:text-xl font-bold uppercase tracking-tight text-slate-900">Nominal Speed</h4>
                            <p className="text-xs lg:text-sm text-slate-500 leading-relaxed font-medium">The machine maintains full production speed while scaling the outer perimeter to match required stopping distances.</p>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="middle" className="mt-0 space-y-3 lg:space-y-4">
                        <div className="flex gap-4 lg:gap-5">
                          <div className="w-1 h-16 lg:w-1.5 lg:h-20 bg-amber-400 rounded-full shrink-0" />
                          <div className="space-y-2 lg:space-y-3">
                            <h4 className="text-lg lg:text-xl font-bold uppercase tracking-tight text-slate-900">Collaborative</h4>
                            <p className="text-xs lg:text-sm text-slate-500 leading-relaxed font-medium">Enforces ISO/TS 15066 Power & Force Limiting profiles, adjusting speed on the surrounding affected agents based on body segment tolerances.</p>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="inner" className="mt-0 space-y-3 lg:space-y-4">
                        <div className="flex gap-4 lg:gap-5">
                          <div className="w-1 h-16 lg:w-1.5 lg:h-20 bg-red-500 rounded-full shrink-0" />
                          <div className="space-y-2 lg:space-y-3">
                            <h4 className="text-lg lg:text-xl font-bold uppercase tracking-tight text-slate-900">E-Stop</h4>
                            <p className="text-xs lg:text-sm text-slate-500 leading-relaxed font-medium">If the inner boundary is breached or tracking confidence falls, an emergency brake command is issued within 10ms to the surrounding affected agents.</p>
                          </div>
                        </div>
                      </TabsContent>
                    </div>
                  </Tabs>
                </div>

                <div className="pt-6 lg:pt-10 border-t border-slate-50 flex flex-col gap-4 lg:gap-6">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] lg:text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">ISO RATING</span>
                    <div className="flex items-center gap-2 lg:gap-3">
                      <ShieldCheck className="w-5 h-5 lg:w-6 lg:h-6 text-emerald-500" />
                      <span className="text-base lg:text-xl font-bold text-slate-900">
                        {redundancy >= 4 ? 'PLe / SIL 3' : redundancy >= 2 ? 'PLd / SIL 2' : 'PLc'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 lg:w-2.5 lg:h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9px] lg:text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">Deterministic Loop Active</span>
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

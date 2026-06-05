
'use client';

import { useState, useMemo, useEffect } from 'react';
import { Ruler, Gauge, ShieldAlert, RefreshCw, ShieldCheck, Zap, Ghost, Bot, User } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function SafetyVolumes() {
  const [proximity, setProximity] = useState(400); 
  const [speed, setSpeed] = useState(500); 
  const [redundancy, setRedundancy] = useState(3); 
  const [activeShell, setActiveShell] = useState('outer');
  const [is3D, setIs3D] = useState(true);
  const [visualScale, setVisualScale] = useState(0.55);

  const spatialVizImage = PlaceHolderImages.find(img => img.id === 'spatial-viz');

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

  const VolumetricEnvelope3D = ({ radius, color, isActive }: { radius: number, color: string, isActive: boolean }) => {
    const ry = radius * 0.45; 
    const h = 220; 

    return (
      <g className={cn("transition-all duration-700", isActive ? "opacity-100" : "opacity-10")}>
        <ellipse cx="0" cy="0" rx={radius} ry={ry} fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="4 2" />
        <path d={`M -${radius},0 L -${radius},-${h} A ${radius},${ry} 0 0,1 ${radius},-${h} L ${radius},0 A ${radius},${ry} 0 0,1 -${radius},0`} fill={color} fillOpacity={isActive ? "0.15" : "0.05"} stroke={color} strokeWidth="0.5" strokeOpacity="0.3" />
        <ellipse cx="0" cy={-h} rx={radius} ry={ry} fill={color} fillOpacity={isActive ? "0.1" : "0.02"} stroke={color} strokeWidth="1.5" />
        <ellipse cx="0" cy={-h} rx={radius * 0.8} ry={ry * 0.8} fill="none" stroke={color} strokeWidth="0.5" strokeDasharray="2 2" strokeOpacity="0.4" />
        <line x1={-radius} y1="0" x2={-radius} y2={-h} stroke={color} strokeWidth="0.5" strokeOpacity="0.4" />
        <line x1={radius} y1="0" x2={radius} y2={-h} stroke={color} strokeWidth="0.5" strokeOpacity="0.4" />
      </g>
    );
  };

  const RadarShell2D = ({ radius, color, isActive }: { radius: number, color: string, isActive: boolean }) => (
    <g className={cn("transition-all duration-700", isActive ? "opacity-100" : "opacity-10")}>
      <circle cx="0" cy="0" r={radius} fill={color} fillOpacity={isActive ? "0.1" : "0.02"} stroke={color} strokeWidth={isActive ? "2" : "1"} />
      {isActive && <circle cx="0" cy="0" r={radius} fill="none" stroke={color} strokeWidth="1" strokeDasharray="4 4" className="animate-pulse" />}
    </g>
  );

  const telemetryGrid = [
    { icon: <Ruler className="w-10 h-10 lg:w-14 lg:h-14" />, title: 'Proximity', description: 'Calculates real-time separation distance between the humanoid, the worker, and surrounding machinery.' },
    { icon: <Gauge className="w-10 h-10 lg:w-14 lg:h-14" />, title: 'Speed Calibration', description: 'Automatically scales protective volumes based on the live velocity vectors of different equipment.' },
    { icon: <ShieldAlert className="w-10 h-10 lg:w-14 lg:h-14" />, title: 'ADAPTIVE SAFETY SHIELDING', description: 'Helps you align with ISO standards by enforcing safe interaction limits, protecting sensitive equipment.' },
    { icon: <RefreshCw className="w-10 h-10 lg:w-14 lg:h-14" />, title: 'Hive Redundancy', description: "SafeHive blends factory sensor data with the robot's own eyes to lock a protective safety bubble." },
    { icon: <Ghost className="w-10 h-10 lg:w-14 lg:h-14" />, title: 'Legacy Hardware', description: "Identifies and projects safety hulls over legacy or untracked industrial equipment within the workspace." },
    { icon: <Zap className="w-10 h-10 lg:w-14 lg:h-14" />, title: 'Loop Speed', description: 'Continuously re-evaluates and refreshes spatial parameters across the entire active workspace.' },
  ];

  return (
    <section id="volumes" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {telemetryGrid.map((item, idx) => (
            <div key={idx} className="p-10 border border-slate-100 rounded-sm bg-white hover:border-primary/20 transition-all group flex flex-col shadow-sm">
              <div className="mb-6 text-primary group-hover:scale-110 transition-transform duration-500">
                {item.icon}
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-headline font-bold text-slate-900 uppercase tracking-tight">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white border border-slate-200 shadow-xl overflow-hidden rounded-sm">
          <div className="grid lg:grid-cols-10 h-full">
            
            <div className="lg:col-span-6 bg-white border-b lg:border-b-0 lg:border-r border-slate-100 p-8 relative min-h-[500px] lg:min-h-[750px] flex flex-col items-center justify-center">
              <div className="absolute inset-0 bg-blueprint-fine opacity-[0.03] pointer-events-none" />
              
              {/* View Mode Toggle */}
              <div className="absolute top-8 right-8 z-[60] flex items-center gap-3 bg-white/80 backdrop-blur-md p-2 rounded-full border border-slate-200 shadow-sm">
                <span className={cn("text-[10px] font-bold uppercase tracking-widest", !is3D ? "text-primary" : "text-slate-400")}>2D Radar</span>
                <Switch 
                  checked={is3D} 
                  onCheckedChange={setIs3D}
                  className="data-[state=checked]:bg-primary"
                />
                <span className={cn("text-[10px] font-bold uppercase tracking-widest", is3D ? "text-primary" : "text-slate-400")}>3D Volume</span>
              </div>

              <div className={cn("relative w-full h-full flex items-center justify-center transition-all duration-700", is3D ? "perspective-[1500px]" : "perspective-none")}>
                <svg viewBox="-300 -250 600 650" className="w-full h-full drop-shadow-2xl">
                  {/* Grid System */}
                  <g opacity="0.05">
                    {Array.from({length: 13}).map((_, i) => (
                      <line key={`v-${i}`} x1={-300 + i*50} y1="-500" x2={-300 + i*50} y2="400" stroke="#000" strokeWidth="1" />
                    ))}
                    {Array.from({length: 18}).map((_, i) => (
                      <line key={`h-${i}`} x1="-300" y1={-500 + i*50} x2="300" y2={-500 + i*50} stroke="#000" strokeWidth="1" />
                    ))}
                  </g>

                  {/* Shells and Silhouettes */}
                  {is3D ? (
                    <g transform="translate(0, 80)">
                      <VolumetricEnvelope3D radius={shells.outer} color="#3b82f6" isActive={activeShell === 'outer'} />
                      <VolumetricEnvelope3D radius={shells.middle} color="#f59e0b" isActive={activeShell === 'middle'} />
                      <VolumetricEnvelope3D radius={shells.inner} color="#ef4444" isActive={activeShell === 'inner'} />
                      
                      {/* Silhouettes - 3D View */}
                      <g transform="translate(-32, -152) scale(1.6)">
                        <path d="M20 5C23 5 25 7 25 10C25 13 23 15 20 15C17 15 15 13 15 10C15 7 17 5 20 5ZM12 18H28C31 18 32 20 32 22V45C32 48 30 50 27 50H13C10 50 8 48 8 45V22C8 20 9 18 12 18ZM15 55H18V95H13V55H15ZM22 55H25V95H27V55H22Z" fill="#0f172a" className="drop-shadow-[0_0_8px_rgba(0,102,255,0.3)]" />
                      </g>
                      <g transform={`translate(${proximity * visualScale - 32}, -152) scale(1.6)`}>
                        <path d="M20 18C23.3 18 26 15.3 26 12C26 8.7 23.3 6 20 6C16.7 6 14 8.7 14 12C14 15.3 16.7 18 20 18ZM28 20H12C9.8 20 8 21.8 8 24V46C8 48.2 9.8 50 12 50H15V94H25V50H28C30.2 50 32 48.2 32 46V24C32 21.8 30.2 20 28 20Z" fill={activeShell === 'inner' ? "#ef4444" : activeShell === 'middle' ? "#f59e0b" : "#3b82f6"} className="transition-colors duration-500" />
                      </g>
                      
                      {/* Marker lines - 3D specific */}
                      <g transform={`translate(${proximity * visualScale}, 0)`}>
                        <line x1="0" y1="20" x2="0" y2="-300" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 4" />
                        <circle cx="0" cy="0" r="4" fill="#cbd5e1" />
                      </g>
                    </g>
                  ) : (
                    <>
                      <RadarShell2D radius={shells.outer} color="#3b82f6" isActive={activeShell === 'outer'} />
                      <RadarShell2D radius={shells.middle} color="#f59e0b" isActive={activeShell === 'middle'} />
                      <RadarShell2D radius={shells.inner} color="#ef4444" isActive={activeShell === 'inner'} />
                      
                      {/* Top-Down Indicators - 2D View */}
                      <g>
                        <circle cx="0" cy="0" r="12" fill="#0f172a" stroke="white" strokeWidth="2" />
                        <Bot size={12} className="text-white" style={{ transform: 'translate(-6px, -6px)' }} />
                      </g>
                      <g transform={`translate(${proximity * visualScale}, 0)`}>
                        <circle cx="0" cy="0" r="10" fill={activeShell === 'inner' ? "#ef4444" : activeShell === 'middle' ? "#f59e0b" : "#3b82f6"} stroke="white" strokeWidth="2" className="transition-colors duration-500" />
                        <User size={10} className="text-white" style={{ transform: 'translate(-5px, -5px)' }} />
                        <line x1="0" y1="0" x2="-20" y2="0" stroke="white" strokeWidth="1" opacity="0.5" />
                        <circle cx="0" cy="0" r="4" fill="#cbd5e1" />
                      </g>
                    </>
                  )}
                </svg>
              </div>

              <div className="w-full max-w-2xl bg-white border border-slate-100 shadow-2xl p-6 lg:p-8 rounded-sm -mt-16 relative z-50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Label className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Proximity</Label>
                      <span className="text-xs font-mono font-bold">{proximity}mm</span>
                    </div>
                    <Slider value={[proximity]} onValueChange={(v) => setProximity(v[0])} min={50} max={600} step={5} className="py-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Label className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Speed</Label>
                      <span className="text-xs font-mono font-bold">{speed}mm/s</span>
                    </div>
                    <Slider value={[speed]} onValueChange={(v) => setSpeed(v[0])} min={100} max={1500} step={50} className="py-2" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Label className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Hive Sensors</Label>
                      <span className="text-xs font-mono font-bold">{redundancy}</span>
                    </div>
                    <Slider value={[redundancy]} onValueChange={(v) => setRedundancy(v[0])} min={1} max={5} step={1} className="py-2" />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 p-8 lg:p-12 flex flex-col justify-between bg-white overflow-y-auto">
              <div className="space-y-10">
                <Tabs value={activeShell} onValueChange={handleTabChange} className="w-full">
                  <TabsList className="w-full h-auto p-1.5 bg-slate-100/50 rounded-lg mb-8 flex gap-1 shadow-inner">
                    <TabsTrigger value="outer" className="flex-1 py-3 lg:py-4 data-[state=active]:bg-white data-[state=active]:shadow-md rounded-md text-[10px] lg:text-xs font-bold uppercase tracking-widest transition-all">Outer</TabsTrigger>
                    <TabsTrigger value="middle" className="flex-1 py-3 lg:py-4 data-[state=active]:bg-white data-[state=active]:shadow-md rounded-md text-[10px] lg:text-xs font-bold uppercase tracking-widest transition-all">Middle</TabsTrigger>
                    <TabsTrigger value="inner" className="flex-1 py-3 lg:py-4 data-[state=active]:bg-white data-[state=active]:shadow-md rounded-md text-[10px] lg:text-xs font-bold uppercase tracking-widest transition-all">Inner</TabsTrigger>
                  </TabsList>

                  <div className="min-h-[220px]">
                    <TabsContent value="outer" className="mt-0 space-y-8">
                      <div className="flex gap-6">
                        <div className="w-1.5 h-20 bg-blue-400 rounded-full shrink-0" />
                        <div className="space-y-3">
                          <h4 className="text-2xl font-headline font-bold uppercase tracking-tight text-slate-900">Nominal Speed</h4>
                          <p className="text-sm lg:text-base text-slate-500 leading-relaxed">The machine maintains full production speed while scaling the outer perimeter to match required stopping distances.</p>
                        </div>
                      </div>
                      {spatialVizImage && (
                        <div className="relative aspect-video rounded-sm overflow-hidden border border-slate-100 shadow-lg">
                          <Image
                            src={spatialVizImage.imageUrl}
                            alt={spatialVizImage.description}
                            fill
                            className="object-cover"
                            data-ai-hint={spatialVizImage.imageHint}
                          />
                        </div>
                      )}
                    </TabsContent>
                    <TabsContent value="middle" className="mt-0 space-y-8">
                      <div className="flex gap-6">
                        <div className="w-1.5 h-20 bg-amber-400 rounded-full shrink-0" />
                        <div className="space-y-3">
                          <h4 className="text-2xl font-headline font-bold uppercase tracking-tight text-slate-900">Collaborative</h4>
                          <p className="text-sm lg:text-base text-slate-500 leading-relaxed">Enforces ISO/TS 15066 Power & Force Limiting profiles, adjusting speed based on body segment tolerances.</p>
                        </div>
                      </div>
                      {spatialVizImage && (
                        <div className="relative aspect-video rounded-sm overflow-hidden border border-slate-100 shadow-lg">
                          <Image
                            src={spatialVizImage.imageUrl}
                            alt={spatialVizImage.description}
                            fill
                            className="object-cover"
                            data-ai-hint={spatialVizImage.imageHint}
                          />
                        </div>
                      )}
                    </TabsContent>
                    <TabsContent value="inner" className="mt-0 space-y-8">
                      <div className="flex gap-6">
                        <div className="w-1.5 h-20 bg-red-500 rounded-full shrink-0" />
                        <div className="space-y-3">
                          <h4 className="text-2xl font-headline font-bold uppercase tracking-tight text-slate-900">E-Stop</h4>
                          <p className="text-sm lg:text-base text-slate-500 leading-relaxed">If the inner boundary is breached or tracking confidence falls, an emergency brake command is issued within 10ms.</p>
                        </div>
                      </div>
                      {spatialVizImage && (
                        <div className="relative aspect-video rounded-sm overflow-hidden border border-slate-100 shadow-lg">
                          <Image
                            src={spatialVizImage.imageUrl}
                            alt={spatialVizImage.description}
                            fill
                            className="object-cover"
                            data-ai-hint={spatialVizImage.imageHint}
                          />
                        </div>
                      )}
                    </TabsContent>
                  </div>
                </Tabs>
              </div>

              <div className="pt-10 border-t border-slate-50 space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">ISO Rating</span>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-6 h-6 text-emerald-500" />
                    <span className="text-xl font-bold text-slate-900">
                      {redundancy >= 4 ? 'PLe / SIL 3' : redundancy >= 2 ? 'PLd / SIL 2' : 'PLc'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Deterministic Loop Active</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useState, useMemo, useEffect } from 'react';
import { Bot, User, ShieldCheck, Ruler, Gauge, ShieldAlert, RefreshCw, Ghost, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export function HiveInteractive() {
  const [activeShell, setActiveShell] = useState('outer');
  const [is3D, setIs3D] = useState(false);

  // Interactive States
  const [proximity, setProximity] = useState(400); // mm
  const [speed, setSpeed] = useState(500); // mm/s
  const [redundancy, setRedundancy] = useState(3); // 1-5 sensors

  // Animation states for telemetry tiles
  const [pulseProximity, setPulseProximity] = useState(false);
  const [pulseSpeed, setPulseSpeed] = useState(false);

  // Visual scaling factor
  const [visualScale, setVisualScale] = useState(0.48);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisualScale(0.3);
      } else {
        setVisualScale(0.48);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Shared boundary logic (in mm)
  const boundaries = useMemo(() => {
    const baseScale = speed / 10;
    const confidenceBuffer = (6 - redundancy) * 15;

    const rawInner = 50 + baseScale;
    const rawMiddle = rawInner + 60 + confidenceBuffer;
    const rawOuter = rawMiddle + 80 + confidenceBuffer;

    return { rawInner, rawMiddle, rawOuter };
  }, [speed, redundancy]);

  // Dynamic Shell Calculations (Visual Radii in px)
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

  const isoRating = useMemo(() => {
    if (redundancy >= 5) return "🛡️ Target ISO Rating: PLe / SIL 3 Capable";
    if (redundancy >= 3) return "🛡️ Target ISO Rating: PLd / SIL 2 Capable";
    return "🛡️ Target ISO Rating: PLc Capable";
  }, [redundancy]);

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

  const handleProximityChange = (val: number[]) => {
    setProximity(val[0]);
    setPulseProximity(true);
    setTimeout(() => setPulseProximity(false), 400);
  };

  const handleSpeedChange = (val: number[]) => {
    setSpeed(val[0]);
    setPulseSpeed(true);
    setTimeout(() => setPulseSpeed(false), 400);
  };

  return (
    <section id="hive" className="py-12 lg:py-24 bg-[#F8F9FA] border-y border-slate-200 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="max-w-6xl mx-auto bg-white border border-slate-200 shadow-sm overflow-hidden rounded-sm">
          <div className="grid lg:grid-cols-10 h-full">
            
            <div className="lg:col-span-5 bg-white border-b lg:border-b-0 lg:border-r border-slate-100 p-6 lg:p-12 relative min-h-[450px] lg:min-h-[700px] flex flex-col items-center justify-center overflow-hidden">
              
              <div className="absolute top-[5%] right-[5%] z-[60] flex items-center gap-2 bg-white/80 backdrop-blur-sm p-2 rounded-full border border-slate-100 shadow-sm">
                <Label htmlFor="view-mode" className={cn("text-[10px] font-bold uppercase tracking-wider transition-colors", !is3D ? "text-slate-900" : "text-slate-400")}>2D</Label>
                <Switch 
                  id="view-mode" 
                  checked={is3D} 
                  onCheckedChange={setIs3D}
                  className="data-[state=checked]:bg-primary"
                />
                <Label htmlFor="view-mode" className={cn("text-[10px] font-bold uppercase tracking-wider transition-colors", is3D ? "text-primary font-black" : "text-slate-400")}>3D</Label>
              </div>

              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

              <div className={cn("relative w-full h-full flex items-center justify-center transition-all duration-700 ease-in-out", is3D ? "perspective-[1000px] rotate-x-[55deg] rotate-z-[-35deg] scale-110" : "perspective-none rotate-0 scale-90 lg:scale-100")}>
                {is3D && <div className="absolute inset-[-200%] bg-blueprint-fine opacity-20 pointer-events-none z-0" />}

                <div className="relative flex items-center justify-center">
                  <div className={cn('absolute transition-all duration-500 flex items-center justify-center', is3D ? "z-0" : "rounded-full border border-dashed border-blue-400/40")} style={{ width: shells.outer * 2, height: shells.outer * 2, transform: is3D ? 'translateZ(0px)' : 'none' }}>
                    {is3D && (
                      <svg viewBox="-150 -150 300 300" className={cn("w-full h-full drop-shadow-2xl transition-opacity", activeShell === 'outer' ? "opacity-100" : "opacity-20")}>
                        <path d={getVoxelPath(140, 0.05)} fill="rgba(59, 130, 246, 0.08)" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="2" strokeDasharray="4 2" />
                      </svg>
                    )}
                    {!is3D && activeShell === 'outer' && <div className="absolute inset-0 bg-blue-50/40 border border-blue-400/80 rounded-full" />}
                  </div>

                  <div className={cn('absolute transition-all duration-500 flex items-center justify-center', is3D ? "z-10" : "rounded-full border border-amber-400/40")} style={{ width: shells.middle * 2, height: shells.middle * 2, transform: is3D ? 'translateZ(20px)' : 'none' }}>
                    {is3D && (
                      <svg viewBox="-150 -150 300 300" className={cn("w-full h-full drop-shadow-xl transition-opacity", activeShell === 'middle' ? "opacity-100" : "opacity-30")}>
                        <path d={getVoxelPath(90, 0.1)} fill="rgba(245, 158, 11, 0.1)" stroke="rgba(245, 158, 11, 0.5)" strokeWidth="3" />
                      </svg>
                    )}
                    {!is3D && activeShell === 'middle' && <div className="absolute inset-0 bg-amber-50/40 border border-amber-400/80 rounded-full" />}
                  </div>

                  <div className={cn('absolute transition-all duration-500 flex items-center justify-center', is3D ? "z-20" : "rounded-full border border-red-500/40")} style={{ width: shells.inner * 2, height: shells.inner * 2, transform: is3D ? 'translateZ(40px)' : 'none' }}>
                    {is3D && (
                      <svg viewBox="-150 -150 300 300" className={cn("w-full h-full drop-shadow-lg transition-opacity", activeShell === 'inner' ? "opacity-100" : "opacity-40")}>
                        <path d={getVoxelPath(50, 0.15)} fill="rgba(239, 68, 68, 0.2)" stroke="rgba(239, 68, 68, 0.6)" strokeWidth="4" />
                      </svg>
                    )}
                    {!is3D && activeShell === 'inner' && <div className="absolute inset-0 bg-red-50/40 border border-red-500/80 rounded-full" />}
                  </div>

                  <div className={cn("relative z-40 transition-all duration-700 ease-in-out", is3D ? "rotate-x-[-90deg] rotate-y-[-45deg] translate-y-[-50px]" : "")}>
                    {is3D ? (
                      <div className="relative h-24 lg:h-32 w-12 flex items-center justify-center">
                        <svg viewBox="0 0 40 100" className="h-full w-full drop-shadow-[0_0_15px_rgba(0,102,255,0.5)]">
                          {/* Robot Silhouette with joints */}
                          <path d="M20 5C23 5 25 7 25 10C25 13 23 15 20 15C17 15 15 13 15 10C15 7 17 5 20 5ZM12 18H28C31 18 32 20 32 22V45C32 48 30 50 27 50H13C10 50 8 48 8 45V22C8 20 9 18 12 18ZM15 55H18V95H13V55H15ZM22 55H25V95H27V55H22Z" fill="currentColor" className="text-primary animate-pulse-glow" />
                          <circle cx="20" cy="10" r="1.5" fill="white" />
                          <path d="M12 22 L28 22" stroke="white" strokeWidth="0.5" opacity="0.3" />
                          <circle cx="12" cy="22" r="1" fill="white" />
                          <circle cx="28" cy="22" r="1" fill="white" />
                        </svg>
                        <div className="absolute bottom-0 w-8 h-2 bg-primary/20 blur-sm rounded-full" />
                      </div>
                    ) : (
                      <div className="relative w-12 h-12 lg:w-16 lg:h-16 bg-white border border-slate-200 rounded shadow-md flex items-center justify-center group">
                        <Bot size={28} className="text-slate-900" />
                        <span className="absolute -top-8 text-[8px] font-mono font-bold text-slate-400 tracking-widest uppercase">Humanoid</span>
                      </div>
                    )}
                  </div>

                  <div className={cn("absolute transition-all duration-500", activeShell === 'inner' ? "z-[100]" : "z-[35]")} style={{ transform: `translateX(${proximity * visualScale}px)` }}>
                    <div className={cn("flex flex-col items-center gap-1.5 transition-all duration-700", is3D ? "rotate-x-[-90deg] rotate-y-[-45deg] translate-y-[-40px]" : "")}>
                      {is3D ? (
                         <div className="relative h-20 lg:h-24 w-10 flex items-center justify-center">
                            <svg viewBox="0 0 40 100" className={cn("h-full w-full drop-shadow-2xl transition-colors", activeShell === 'inner' ? "text-red-600" : activeShell === 'middle' ? "text-amber-500" : "text-blue-500")}>
                              {/* Human Silhouette */}
                              <path d="M20 18C23.3 18 26 15.3 26 12C26 8.7 23.3 6 20 6C16.7 6 14 8.7 14 12C14 15.3 16.7 18 20 18ZM28 20H12C9.8 20 8 21.8 8 24V46C8 48.2 9.8 50 12 50H15V94H25V50H28C30.2 50 32 48.2 32 46V24C32 21.8 30.2 20 28 20Z" fill="currentColor" />
                            </svg>
                         </div>
                      ) : (
                        <div className={cn('w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center text-white shadow-2xl transition-colors border-2 border-white', activeShell === 'inner' ? 'bg-red-600' : activeShell === 'middle' ? 'bg-amber-500' : 'bg-blue-500')}>
                          <User size={18} />
                        </div>
                      )}
                      <span className={cn("text-[8px] lg:text-[10px] font-mono font-bold uppercase tracking-tighter whitespace-nowrap", is3D ? "text-white bg-slate-900/80 px-1.5 py-0.5 rounded backdrop-blur-sm" : "text-slate-900")}>Worker</span>
                    </div>
                  </div>
                </div>

                {!is3D && (
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <line x1="50%" y1="50%" x2={`calc(50% + ${proximity * visualScale}px)`} y2="50%" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 4" />
                  </svg>
                )}
              </div>

              <div className="absolute bottom-4 left-4 right-4 lg:bottom-8 lg:left-8 lg:right-8 grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 bg-white/95 backdrop-blur-md p-4 lg:p-6 border border-slate-200 shadow-xl rounded-sm z-[150]">
                <div className="space-y-2 lg:space-y-3">
                  <div className="flex justify-between items-center">
                    <Label className="text-[8px] lg:text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">PROXIMITY</Label>
                  </div>
                  <Slider value={[proximity]} onValueChange={handleProximityChange} min={50} max={500} step={10} className="py-4 cursor-pointer" />
                </div>
                <div className="space-y-2 lg:space-y-3">
                  <div className="flex justify-between items-center">
                    <Label className="text-[8px] lg:text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">SPEED</Label>
                  </div>
                  <Slider value={[speed]} onValueChange={handleSpeedChange} min={100} max={1500} step={50} className="py-4 cursor-pointer" />
                </div>
                <div className="space-y-2 lg:space-y-3">
                  <div className="flex justify-between items-center">
                    <Label className="text-[8px] lg:text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">SENSORS</Label>
                    <span className="text-[10px] lg:text-xs font-mono font-bold text-slate-900">{redundancy}</span>
                  </div>
                  <Slider value={[redundancy]} onValueChange={(v) => setRedundancy(v[0])} min={1} max={5} step={1} className="py-4 cursor-pointer" />
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-between bg-white relative">
              <div className="space-y-6 lg:space-y-8">
                <div className="space-y-3">
                  <h3 className="text-xl font-headline font-bold text-slate-900 uppercase">Dynamic Bubble Calculation</h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    Calculated in real time by mapping body-part safety thresholds against current machine speed, separation distances, and the number of active sensors or cameras.
                  </p>
                </div>

                <Tabs value={activeShell} onValueChange={handleTabChange} className="w-full">
                  <TabsList className="w-full h-auto p-0 bg-transparent border-b border-slate-100 rounded-none mb-6 gap-4 lg:gap-6 overflow-x-auto flex-nowrap justify-start scrollbar-hide">
                    <TabsTrigger value="outer" className="px-0 py-3 border-b-2 border-transparent data-[state=active]:border-blue-400 data-[state=active]:bg-transparent rounded-none text-[9px] lg:text-[11px] font-bold uppercase tracking-[0.2em] transition-all">Outer Shell</TabsTrigger>
                    <TabsTrigger value="middle" className="px-0 py-3 border-b-2 border-transparent data-[state=active]:border-amber-400 data-[state=active]:bg-transparent rounded-none text-[9px] lg:text-[11px] font-bold uppercase tracking-[0.2em] transition-all">Middle Shell</TabsTrigger>
                    <TabsTrigger value="inner" className="px-0 py-3 border-b-2 border-transparent data-[state=active]:border-red-500 data-[state=active]:bg-transparent rounded-none text-[9px] lg:text-[11px] font-bold uppercase tracking-[0.2em] transition-all">Inner Shell</TabsTrigger>
                  </TabsList>

                  <div className="min-h-[100px]">
                    <TabsContent value="outer" className="mt-0 space-y-4">
                      <div className="flex gap-4 lg:gap-6">
                        <div className="w-1.5 h-16 lg:h-20 bg-blue-400 rounded-full shrink-0" />
                        <div className="space-y-2 lg:space-y-3">
                          <h4 className="text-[10px] lg:text-xs font-bold uppercase tracking-widest text-slate-900">Nominal Speed / Proximity Monitoring</h4>
                          <p className="text-xs lg:text-sm text-slate-500 leading-relaxed font-medium">The machine maintains full production speed while dynamically scaling the outer perimeter to match required stopping distances.</p>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="middle" className="mt-0 space-y-4">
                      <div className="flex gap-4 lg:gap-6">
                        <div className="w-1.5 h-16 lg:h-20 bg-amber-400 rounded-full shrink-0" />
                        <div className="space-y-2 lg:space-y-3">
                          <h4 className="text-[10px] lg:text-xs font-bold uppercase tracking-widest text-slate-900">Collaborative State / Speed &lt; 250 mm/s</h4>
                          <p className="text-xs lg:text-sm text-slate-500 leading-relaxed font-medium">Enforces ISO/TS 15066 Power & Force Limiting profiles, adjusting collaborative speed restrictions based on localized body segment tolerances.</p>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="inner" className="mt-0 space-y-4">
                      <div className="flex gap-4 lg:gap-6">
                        <div className="w-1.5 h-16 lg:h-20 bg-red-500 rounded-full shrink-0" />
                        <div className="space-y-2 lg:space-y-3">
                          <h4 className="text-[10px] lg:text-xs font-bold uppercase tracking-widest text-slate-900">Immediate Safety Stop</h4>
                          <p className="text-xs lg:text-sm text-slate-500 leading-relaxed font-medium">If the inner boundary is breached or tracking confidence falls below safe thresholds, an emergency brake command is issued within 10ms.</p>
                        </div>
                      </div>
                    </TabsContent>
                  </div>
                </Tabs>

                <div className="pt-6 border-t border-slate-100">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <TelemetryTile 
                      icon={<Ruler size={14} />} 
                      label="PROXIMITY" 
                      status="Dynamic Tracking" 
                      subtext="Real-time separation dist."
                      pulse={pulseProximity}
                    />
                    <TelemetryTile 
                      icon={<Gauge size={14} />} 
                      label="SPEED" 
                      status="Velocity Scaled" 
                      subtext="Live vector volumes"
                      pulse={pulseSpeed}
                    />
                    <TelemetryTile 
                      icon={<ShieldAlert size={14} />} 
                      label="MORPHOLOGY" 
                      status="ISO/TS 15066 Active" 
                      subtext="Body impact segments"
                    />
                    <TelemetryTile 
                      icon={<RefreshCw size={14} />} 
                      label="HIVE INTEGRITY" 
                      status={redundancy >= 4 ? "High Confidence" : "Sync Active"} 
                      subtext="Multi-sensor triangulation"
                      highlight={redundancy >= 4}
                    />
                    <TelemetryTile 
                      icon={<Ghost size={14} />} 
                      label="GHOST ASSETS" 
                      status="Onboard Vision" 
                      subtext="Native computer vision"
                    />
                    <TelemetryTile 
                      icon={<Zap size={14} />} 
                      label="LOOP SPEED" 
                      status="10ms Det." 
                      subtext="Continuous evaluation"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-8 lg:pt-10 flex flex-wrap items-center gap-4 lg:gap-8 border-t border-slate-50">
                <div className="flex items-center gap-2 text-[8px] lg:text-[10px] font-bold text-slate-400 tracking-widest uppercase">
                  {isoRating}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TelemetryTile({ icon, label, status, subtext, pulse, highlight }: { icon: any, label: string, status: string, subtext: string, pulse?: boolean, highlight?: boolean }) {
  return (
    <div className={cn(
      "p-3 border border-slate-50 rounded bg-slate-50/30 transition-all",
      pulse && "animate-pulse border-primary/30 bg-primary/5",
      highlight && "border-emerald-100 bg-emerald-50/30"
    )}>
      <div className="flex items-center gap-2 mb-1.5">
        <div className={cn("text-slate-400", highlight ? "text-emerald-500" : "")}>{icon}</div>
        <span className="text-[7px] font-bold text-slate-400 uppercase tracking-widest">{label}</span>
      </div>
      <div className="space-y-0.5">
        <div className={cn("text-[9px] font-bold text-slate-900 truncate", highlight ? "text-emerald-600" : "")}>{status}</div>
        <p className="text-[7px] text-slate-400 font-medium truncate">{subtext}</p>
      </div>
    </div>
  );
}

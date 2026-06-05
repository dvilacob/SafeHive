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

  // Shared boundary logic (in mm)
  const boundaries = useMemo(() => {
    const baseScale = speed / 10;
    const confidenceBuffer = (6 - redundancy) * 20;
    
    // The inner shell now correctly contracts with more sensors
    const rawInner = 60 + baseScale + (confidenceBuffer * 0.5); 
    const rawMiddle = rawInner + 80 + confidenceBuffer;
    const rawOuter = rawMiddle + 100 + confidenceBuffer;
    
    return { rawInner, rawMiddle, rawOuter };
  }, [speed, redundancy]);

  // Visual Radii in px
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
    const ry = radius * 0.45; // Isometric perspective ratio
    const h = 220; // Uniform height as requested

    return (
      <g className={cn("transition-all duration-700", isActive ? "opacity-100" : "opacity-10")}>
        {/* Base Ellipse */}
        <ellipse
          cx="0"
          cy="0"
          rx={radius}
          ry={ry}
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeDasharray="4 2"
        />
        
        {/* Cylinder Walls */}
        <path
          d={`M -${radius},0 L -${radius},-${h} A ${radius},${ry} 0 0,1 ${radius},-${h} L ${radius},0 A ${radius},${ry} 0 0,1 -${radius},0`}
          fill={color}
          fillOpacity={isActive ? "0.15" : "0.05"}
          stroke={color}
          strokeWidth="0.5"
          strokeOpacity="0.3"
        />

        {/* Top Ellipse */}
        <ellipse
          cx="0"
          cy={-h}
          rx={radius}
          ry={ry}
          fill={color}
          fillOpacity={isActive ? "0.1" : "0.02"}
          stroke={color}
          strokeWidth="1.5"
        />

        {/* Vertical Guide Lines */}
        <line x1={-radius} y1="0" x2={-radius} y2={-h} stroke={color} strokeWidth="0.5" strokeOpacity="0.4" />
        <line x1={radius} y1="0" x2={radius} y2={-h} stroke={color} strokeWidth="0.5" strokeOpacity="0.4" />
      </g>
    );
  };

  const telemetryGrid = [
    { icon: <Ruler className="w-10 h-10 lg:w-14 lg:h-14" />, title: 'Proximity', description: 'Calculates real-time separation distance between the humanoid, the worker, and surrounding machinery.' },
    { icon: <Gauge className="w-10 h-10 lg:w-14 lg:h-14" />, title: 'Speed Calibration', description: 'Automatically scales protective volumes based on the live velocity vectors of different equipment.' },
    { icon: <ShieldAlert className="w-10 h-10 lg:w-14 lg:h-14" />, title: 'ADAPTIVE SAFETY SHIELDING', description: 'Helps you align with ISO standards by enforcing safe interaction limits, protecting sensitive equipment, and achieving the required PFH_D thresholds.' },
    { icon: <RefreshCw className="w-10 h-10 lg:w-14 lg:h-14" />, title: 'Hive Redundancy', description: "SafeHive blends factory sensor data with the robot's own eyes to lock a protective safety bubble around every asset." },
    { icon: <Ghost className="w-10 h-10 lg:w-14 lg:h-14" />, title: 'Un-networked Hardware', description: "Identifies and projects safety hulls over legacy or untracked industrial equipment within the workspace." },
    { icon: <Zap className="w-10 h-10 lg:w-14 lg:h-14" />, title: 'Loop Speed', description: 'Continuously re-evaluates and refreshes spatial parameters across the entire active workspace environment.' },
  ];

  return (
    <section id="volumes" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Technical Grid (Top) */}
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

        {/* Interactive Visualization Board */}
        <div className="bg-white border border-slate-200 shadow-xl overflow-hidden rounded-sm">
          <div className="grid lg:grid-cols-10 h-full">
            
            {/* Visual Panel (Left) */}
            <div className="lg:col-span-6 bg-white border-b lg:border-b-0 lg:border-r border-slate-100 p-8 relative min-h-[500px] lg:min-h-[800px] flex flex-col items-center justify-center">
              <div className="absolute inset-0 bg-blueprint-fine opacity-[0.03] pointer-events-none" />
              
              <div className="relative w-full h-full flex items-center justify-center perspective-[1500px]">
                <svg viewBox="-300 -450 600 550" className="w-full h-full drop-shadow-2xl">
                  {/* Isometric Ground Grid */}
                  <g opacity="0.1">
                    {Array.from({length: 11}).map((_, i) => (
                      <line key={`v-${i}`} x1={-250 + i*50} y1="-120" x2={-250 + i*50} y2="120" stroke="#000" strokeWidth="0.5" />
                    ))}
                    {Array.from({length: 6}).map((_, i) => (
                      <line key={`h-${i}`} x1="-250" y1={-120 + i*48} x2="250" y2={-120 + i*48} stroke="#000" strokeWidth="0.5" />
                    ))}
                  </g>

                  {/* Cylinders */}
                  <VolumetricEnvelope radius={shells.outer} color="#3b82f6" isActive={activeShell === 'outer'} />
                  <VolumetricEnvelope radius={shells.middle} color="#f59e0b" isActive={activeShell === 'middle'} />
                  <VolumetricEnvelope radius={shells.inner} color="#ef4444" isActive={activeShell === 'inner'} />

                  {/* Robot Silhouette (2x Scale) */}
                  <g transform="translate(0, 0) scale(2)">
                    <g transform="translate(-10, -45)">
                      <Bot size={20} className="text-slate-900" />
                    </g>
                    <line x1="0" y1="0" x2="0" y2="-45" stroke="#000" strokeWidth="0.5" strokeOpacity="0.2" />
                  </g>

                  {/* Worker Silhouette (2x Scale) */}
                  <g transform={`translate(${proximity * visualScale}, 0) scale(2)`}>
                    <g transform="translate(-10, -45)">
                      <User size={20} className={cn("transition-colors duration-500", currentZone === 'inner' ? "text-red-600" : currentZone === 'middle' ? "text-amber-500" : "text-blue-500")} />
                    </g>
                    <line x1="0" y1="0" x2="0" y2="-45" stroke="#000" strokeWidth="0.5" strokeOpacity="0.2" />
                  </g>
                </svg>
              </div>

              {/* Slider Controls Card (Bottom Left Overlay) */}
              <div className="w-full max-w-2xl bg-white border border-slate-100 shadow-2xl p-6 lg:p-8 rounded-sm mt-4 relative z-50">
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

            {/* Content Panel (Right) */}
            <div className="lg:col-span-4 p-8 lg:p-12 flex flex-col justify-between bg-white">
              <div className="space-y-10">
                <Tabs value={activeShell} onValueChange={handleTabChange} className="w-full">
                  <TabsList className="w-full h-auto p-1.5 bg-slate-100/50 rounded-lg mb-8 flex gap-1 shadow-inner">
                    <TabsTrigger value="outer" className="flex-1 py-3 lg:py-4 data-[state=active]:bg-white data-[state=active]:shadow-md rounded-md text-[10px] lg:text-xs font-bold uppercase tracking-widest transition-all">Outer</TabsTrigger>
                    <TabsTrigger value="middle" className="flex-1 py-3 lg:py-4 data-[state=active]:bg-white data-[state=active]:shadow-md rounded-md text-[10px] lg:text-xs font-bold uppercase tracking-widest transition-all">Middle</TabsTrigger>
                    <TabsTrigger value="inner" className="flex-1 py-3 lg:py-4 data-[state=active]:bg-white data-[state=active]:shadow-md rounded-md text-[10px] lg:text-xs font-bold uppercase tracking-widest transition-all">Inner</TabsTrigger>
                  </TabsList>

                  <div className="min-h-[220px]">
                    <TabsContent value="outer" className="mt-0 space-y-6">
                      <div className="flex gap-6">
                        <div className="w-1.5 h-20 bg-blue-400 rounded-full shrink-0" />
                        <div className="space-y-3">
                          <h4 className="text-2xl font-headline font-bold uppercase tracking-tight text-slate-900">Nominal Speed</h4>
                          <p className="text-sm lg:text-base text-slate-500 leading-relaxed">The machine maintains full production speed while scaling the outer perimeter to match required stopping distances.</p>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="middle" className="mt-0 space-y-6">
                      <div className="flex gap-6">
                        <div className="w-1.5 h-20 bg-amber-400 rounded-full shrink-0" />
                        <div className="space-y-3">
                          <h4 className="text-2xl font-headline font-bold uppercase tracking-tight text-slate-900">Collaborative</h4>
                          <p className="text-sm lg:text-base text-slate-500 leading-relaxed">Enforces ISO/TS 15066 Power & Force Limiting profiles, adjusting speed based on body segment tolerances.</p>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="inner" className="mt-0 space-y-6">
                      <div className="flex gap-6">
                        <div className="w-1.5 h-20 bg-red-500 rounded-full shrink-0" />
                        <div className="space-y-3">
                          <h4 className="text-2xl font-headline font-bold uppercase tracking-tight text-slate-900">E-Stop</h4>
                          <p className="text-sm lg:text-base text-slate-500 leading-relaxed">If the inner boundary is breached or tracking confidence falls, an emergency brake command is issued within 10ms.</p>
                        </div>
                      </div>
                    </TabsContent>
                  </div>
                </Tabs>
              </div>

              {/* Status Footer (Bottom Right) */}
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

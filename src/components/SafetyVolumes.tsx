'use client';

import { useState, useMemo, useEffect } from 'react';
import { Ruler, Gauge, ShieldAlert, RefreshCw, Bot, User, Target } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

export function SafetyVolumes() {
  // Interaction State
  const [proximity, setProximity] = useState(400); // mm
  const [speed, setSpeed] = useState(500); // mm/s
  const [redundancy, setRedundancy] = useState(3); // 1-5 sensors
  const [is3D, setIs3D] = useState(true);
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

  const activeShell = useMemo(() => {
    if (proximity <= boundaries.rawInner) return 'inner';
    if (proximity <= boundaries.rawMiddle) return 'middle';
    return 'outer';
  }, [proximity, boundaries]);

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

          {/* Interactive Calculation Viewport */}
          <div className="relative w-full max-w-5xl mx-auto min-h-[500px] lg:min-h-[650px] bg-slate-50/50 border border-slate-100 rounded-sm overflow-hidden flex flex-col items-center justify-center p-6 lg:p-12">
            <div className="absolute inset-0 bg-blueprint opacity-[0.02] pointer-events-none" />
            
            {/* 2D/3D Toggle */}
            <div className="absolute top-6 right-6 z-[60] flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-100 shadow-sm">
              <Label htmlFor="view-mode" className={cn("text-[10px] font-bold uppercase tracking-wider transition-colors", !is3D ? "text-slate-900" : "text-slate-400")}>2D</Label>
              <Switch id="view-mode" checked={is3D} onCheckedChange={setIs3D} className="data-[state=checked]:bg-primary" />
              <Label htmlFor="view-mode" className={cn("text-[10px] font-bold uppercase tracking-wider transition-colors", is3D ? "text-primary font-black" : "text-slate-400")}>3D</Label>
            </div>

            <div className={cn("relative w-full flex-1 flex items-center justify-center transition-all duration-700 ease-in-out", is3D ? "perspective-[1000px] rotate-x-[55deg] rotate-z-[-35deg] scale-125" : "scale-90")}>
              <div className="relative flex items-center justify-center">
                {/* Outer Shell */}
                <div className={cn('absolute transition-all duration-500 flex items-center justify-center', !is3D && "rounded-full border border-dashed border-blue-400/40")} style={{ width: shells.outer * 2, height: shells.outer * 2 }}>
                  <svg viewBox="-150 -150 300 300" className={cn("w-full h-full transition-opacity", activeShell === 'outer' ? "opacity-100" : "opacity-20")}>
                    <path d={getVoxelPath(140, 0.05)} fill="rgba(59, 130, 246, 0.08)" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="2" strokeDasharray="4 2" />
                  </svg>
                </div>

                {/* Middle Shell */}
                <div className={cn('absolute transition-all duration-500 flex items-center justify-center', !is3D && "rounded-full border border-amber-400/40")} style={{ width: shells.middle * 2, height: shells.middle * 2 }}>
                  <svg viewBox="-150 -150 300 300" className={cn("w-full h-full transition-opacity", activeShell === 'middle' ? "opacity-100" : "opacity-30")}>
                    <path d={getVoxelPath(90, 0.1)} fill="rgba(245, 158, 11, 0.1)" stroke="rgba(245, 158, 11, 0.5)" strokeWidth="3" />
                  </svg>
                </div>

                {/* Inner Shell */}
                <div className={cn('absolute transition-all duration-500 flex items-center justify-center', !is3D && "rounded-full border border-red-500/40")} style={{ width: shells.inner * 2, height: shells.inner * 2 }}>
                  <svg viewBox="-150 -150 300 300" className={cn("w-full h-full transition-opacity", activeShell === 'inner' ? "opacity-100" : "opacity-40")}>
                    <path d={getVoxelPath(50, 0.15)} fill="rgba(239, 68, 68, 0.2)" stroke="rgba(239, 68, 68, 0.6)" strokeWidth="4" />
                  </svg>
                </div>

                {/* Central Humanoid (Robot) */}
                <div className={cn("relative z-40 transition-all duration-700", is3D ? "rotate-x-[-90deg] rotate-y-[-45deg] translate-y-[-50px]" : "")}>
                  <svg viewBox="0 0 40 100" className="h-24 lg:h-32 w-12 text-primary drop-shadow-[0_0_15px_rgba(0,102,255,0.4)] animate-pulse-glow">
                    <path d="M20 5C23 5 25 7 25 10C25 13 23 15 20 15C17 15 15 13 15 10C15 7 17 5 20 5ZM12 18H28C31 18 32 20 32 22V45C32 48 30 50 27 50H13C10 50 8 48 8 45V22C8 20 9 18 12 18ZM15 55H18V95H13V55H15ZM22 55H25V95H27V55H22Z" fill="currentColor" />
                  </svg>
                </div>

                {/* Worker Asset */}
                <div className={cn("absolute transition-all duration-500", activeShell === 'inner' ? "z-[100]" : "z-[35]")} style={{ transform: `translateX(${proximity * visualScale}px)` }}>
                  <div className={cn("flex flex-col items-center gap-1.5 transition-all duration-700", is3D ? "rotate-x-[-90deg] rotate-y-[-45deg] translate-y-[-40px]" : "")}>
                    <svg viewBox="0 0 40 100" className={cn("h-20 lg:h-24 w-10 transition-colors", activeShell === 'inner' ? "text-red-600" : activeShell === 'middle' ? "text-amber-500" : "text-blue-500")}>
                      <path d="M20 18C23.3 18 26 15.3 26 12C26 8.7 23.3 6 20 6C16.7 6 14 8.7 14 12C14 15.3 16.7 18 20 18ZM28 20H12C9.8 20 8 21.8 8 24V46C8 48.2 9.8 50 12 50H15V94H25V50H28C30.2 50 32 48.2 32 46V24C32 21.8 30.2 20 28 20Z" fill="currentColor" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Sliders Card */}
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

            {/* Status Footer */}
            <div className="absolute bottom-4 left-8 right-8 flex justify-between items-center pointer-events-none opacity-50">
               <div className="text-[8px] font-mono font-bold text-slate-400 uppercase tracking-widest">Target ISO Rating: {redundancy >= 4 ? 'PLe / SIL 3' : redundancy >= 2 ? 'PLd / SIL 2' : 'PLc'}</div>
               <div className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="text-[8px] font-mono font-bold text-slate-400 uppercase">10ms Deterministic Loop Active</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

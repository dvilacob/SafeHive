'use client';

import { Ruler, Gauge, ShieldAlert, RefreshCw, Ghost, Zap, Bot } from 'lucide-react';

export function SafetyVolumes() {
  const telemetry = [
    {
      icon: <Ruler className="w-4 h-4" />,
      label: 'PROXIMITY',
      value: 'Dynamic Tracking',
      subtext: 'Calculates real-time separation distance between assets.',
    },
    {
      icon: <Gauge className="w-4 h-4" />,
      label: 'SPEED',
      value: 'Velocity Scaled',
      subtext: 'Automatically resizes protective volumes based on speed.',
    },
    {
      icon: <ShieldAlert className="w-4 h-4" />,
      label: 'MORPHOLOGY',
      value: 'ISO/TS 15066',
      subtext: 'Tailors bubble zones to human body segment thresholds.',
    },
    {
      icon: <RefreshCw className="w-4 h-4" />,
      label: 'INTEGRITY',
      value: 'Multi-Sensor Sync',
      subtext: 'Cross-checks external cameras to prevent blind spots.',
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
        <div className="max-w-7xl mx-auto space-y-20">
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

          {/* 3D Static Schematic Graphic */}
          <div className="relative w-full max-w-4xl mx-auto h-[400px] bg-slate-50/50 border border-slate-100 rounded-sm overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-blueprint opacity-[0.02] pointer-events-none" />
            
            <div className="relative transform perspective-[1000px] rotate-x-[55deg] rotate-z-[-35deg] scale-125">
              {/* Outer Shell */}
              <svg viewBox="-150 -150 300 300" className="absolute w-[300px] h-[300px] -translate-x-1/2 -translate-y-1/2 opacity-20">
                <path d={getVoxelPath(140, 0.05)} fill="rgba(59, 130, 246, 0.1)" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="1" strokeDasharray="4 2" />
              </svg>

              {/* Middle Shell */}
              <svg viewBox="-150 -150 300 300" className="absolute w-[200px] h-[200px] -translate-x-1/2 -translate-y-1/2 opacity-30">
                <path d={getVoxelPath(90, 0.1)} fill="rgba(245, 158, 11, 0.15)" stroke="rgba(245, 158, 11, 0.5)" strokeWidth="2" />
              </svg>

              {/* Inner Shell */}
              <svg viewBox="-150 -150 300 300" className="absolute w-[120px] h-[120px] -translate-x-1/2 -translate-y-1/2 opacity-40">
                <path d={getVoxelPath(50, 0.15)} fill="rgba(239, 68, 68, 0.25)" stroke="rgba(239, 68, 68, 0.6)" strokeWidth="3" />
              </svg>

              {/* Central Humanoid (Static) */}
              <div className="absolute -translate-x-1/2 -translate-y-1/2 rotate-x-[-90deg] rotate-y-[-45deg] translate-y-[-40px]">
                <svg viewBox="0 0 40 100" className="h-32 w-16 text-primary drop-shadow-[0_0_15px_rgba(0,102,255,0.4)]">
                  <path d="M20 5C23 5 25 7 25 10C25 13 23 15 20 15C17 15 15 13 15 10C15 7 17 5 20 5ZM12 18H28C31 18 32 20 32 22V45C32 48 30 50 27 50H13C10 50 8 48 8 45V22C8 20 9 18 12 18ZM15 55H18V95H13V55H15ZM22 55H25V95H27V55H22Z" fill="currentColor" />
                </svg>
              </div>
            </div>

            {/* Labels */}
            <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
              <div className="space-y-1">
                <div className="tech-label text-slate-400">System State</div>
                <div className="text-xs font-mono font-bold text-primary uppercase">Volume Verification Active</div>
              </div>
              <div className="text-right space-y-1">
                <div className="tech-label text-slate-400">Projection Engine</div>
                <div className="text-[10px] font-mono font-bold text-slate-900">3D VOXEL-MAPPING v4.2</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

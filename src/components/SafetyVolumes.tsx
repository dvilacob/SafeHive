'use client';

import { Ruler, Gauge, ShieldAlert, RefreshCw, Ghost, Zap } from 'lucide-react';

export function SafetyVolumes() {
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
      value: 'ISO/TS 15066 Active',
      subtext: 'Tailors protective bubble zones to human body segments and localized impact thresholds.',
    },
    {
      icon: <RefreshCw className="w-4 h-4" />,
      label: 'HIVE INTEGRITY',
      value: 'Multi-Sensor Sync',
      subtext: 'Cross-checks overlapping external cameras and floor sensors to prevent blind spots or tracking drops.',
    },
    {
      icon: <Ghost className="w-4 h-4" />,
      label: 'UN-NETWORKED HARDWARE',
      value: 'Onboard Vision Scan',
      subtext: 'Uses the humanoid\'s native computer vision to detect and project safety hulls over untracked moving machinery.',
    },
    {
      icon: <Zap className="w-4 h-4" />,
      label: 'LOOP SPEED',
      value: '10ms Deterministic',
      subtext: 'Continuously re-evaluates and refreshes spatial parameters across the entire active workspace environment.',
    },
  ];

  return (
    <section id="volumes" className="py-24 bg-white border-b border-slate-100 relative">
      <div className="absolute inset-0 bg-blueprint-fine opacity-[0.03] pointer-events-none" />
      <div className="container mx-auto px-6 relative">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-start gap-16 justify-between">
          <div className="max-w-xl space-y-4 lg:sticky lg:top-32">
            <span className="tech-label text-primary">Spatial Calibration Engine</span>
            <h2 className="text-3xl lg:text-5xl font-headline font-bold tracking-tight text-slate-900 leading-[1.1]">
              Continuous <br />
              <span className="text-primary italic">Volume Calibration.</span>
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed font-medium">
              SafeHive continuously resizes each protective shield by cross-referencing live operational data.
            </p>
          </div>

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {telemetry.map((item, idx) => (
              <div key={idx} className="p-8 border border-slate-100 rounded-sm hover:border-primary/20 hover:bg-slate-50 transition-all group">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-sm bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:bg-white transition-all">
                    {item.icon}
                  </div>
                  <span className="tech-label text-[10px] text-slate-400">{item.label}</span>
                </div>
                <div className="space-y-2">
                  <div className="text-base font-headline font-bold text-slate-900 group-hover:text-primary transition-colors uppercase tracking-tight">
                    {item.value}
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                    {item.subtext}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

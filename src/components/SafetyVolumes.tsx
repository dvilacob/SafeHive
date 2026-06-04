'use client';

import { Ruler, Gauge, Activity, ShieldAlert, Ghost, Zap } from 'lucide-react';

export function SafetyVolumes() {
  const features = [
    {
      icon: <Ruler className="w-4 h-4" />,
      title: 'Proximity',
      text: 'Dynamic expansion buffer (S).',
    },
    {
      icon: <Gauge className="w-4 h-4" />,
      title: 'Speed',
      text: 'Scales volumes to velocity.',
    },
    {
      icon: <ShieldAlert className="w-4 h-4" />,
      title: 'Sensitivity',
      text: 'ISO/TS 15066 segments.',
    },
    {
      icon: <Activity className="w-4 h-4" />,
      title: 'Redundancy',
      text: 'Multi-sensor triangulation.',
    },
    {
      icon: <Ghost className="w-4 h-4" />,
      title: 'Ghost Assets',
      text: 'AI-vision projection.',
    },
    {
      icon: <Zap className="w-4 h-4" />,
      title: 'Real-Time',
      text: '10ms deterministic loop.',
    },
  ];

  return (
    <section id="volumes" className="py-20 lg:py-24 bg-white relative border-b border-slate-100">
      <div className="absolute inset-0 bg-blueprint-fine opacity-10 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-slate-100 pb-12">
            <div className="max-w-2xl space-y-4">
              <span className="tech-label text-primary">Calibration Engine</span>
              <h2 className="text-3xl lg:text-5xl font-headline font-bold tracking-tight">
                Continuous Volume Calibration.
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed">
                SafeHive continuously resizes each protective shield by cross-referencing live operational data.
              </p>
            </div>
            <div className="flex flex-col items-start md:items-end shrink-0">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Global Latency</span>
              <span className="text-2xl font-mono font-bold text-primary italic">8.2ms</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-10">
            {features.map((feature, idx) => (
              <div key={idx} className="space-y-4 group">
                <div className="w-8 h-8 rounded-sm bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-primary group-hover:border-primary/20 transition-all">
                  {feature.icon}
                </div>
                <div className="space-y-1">
                  <h3 className="text-[10px] font-headline font-bold uppercase tracking-[0.15em] text-slate-900">
                    {feature.title}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-medium leading-tight">
                    {feature.text}
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

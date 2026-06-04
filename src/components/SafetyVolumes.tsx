'use client';

import { Ruler, Gauge, Activity, ShieldAlert, Ghost, Zap } from 'lucide-react';

export function SafetyVolumes() {
  const features = [
    {
      icon: <Ruler className="w-5 h-5" />,
      title: 'Proximity',
      text: 'Dynamic expansion buffer (S) based on separation distance.',
    },
    {
      icon: <Gauge className="w-5 h-5" />,
      title: 'Speed',
      text: 'Scales safety volumes proportional to asset velocity vectors.',
    },
    {
      icon: <ShieldAlert className="w-5 h-5" />,
      title: 'Sensitivity',
      text: 'ISO/TS 15066 compliant thresholds for human interaction.',
    },
    {
      icon: <Activity className="w-5 h-5" />,
      title: 'Redundancy',
      text: 'Multi-sensor triangulation for high-confidence spatial maps.',
    },
    {
      icon: <Ghost className="w-5 h-5" />,
      title: 'Ghost Assets',
      text: 'Automated projection over un-networked hardware via AI vision.',
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: 'Real-Time',
      text: '10ms loop speed for deterministic environment refreshing.',
    },
  ];

  return (
    <section id="volumes" className="py-24 lg:py-32 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-blueprint-fine opacity-20" />
      
      <div className="container mx-auto px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-center">
            
            {/* Left: Technical Schematic */}
            <div className="lg:col-span-5 space-y-12">
              <div className="space-y-4">
                <span className="tech-label text-primary">Spatial Engine v4.2</span>
                <h2 className="text-4xl lg:text-5xl font-headline font-bold leading-tight">
                  Continuous Volume <br />Calibration.
                </h2>
                <p className="text-slate-500 text-lg leading-relaxed">
                  SafeHive continuously resizes each protective shield by cross-referencing live operational data.
                </p>
              </div>

              <div className="relative p-12 bg-slate-50 border border-slate-100 rounded-sm overflow-hidden group">
                <div className="absolute inset-0 bg-blueprint opacity-10" />
                
                {/* Visualizer Mockup */}
                <div className="relative h-64 flex items-center justify-center">
                  <div className="absolute w-48 h-48 border border-dashed border-primary/20 rounded-full animate-spin-slow" />
                  <div className="absolute w-32 h-32 border border-primary/40 rounded-full animate-pulse-glow" />
                  <div className="absolute w-16 h-16 bg-primary/10 border border-primary/60 rounded-full flex items-center justify-center">
                    <Zap className="text-primary w-6 h-6" />
                  </div>
                  
                  {/* Dynamic Labels */}
                  <div className="absolute top-0 right-0 flex flex-col items-end gap-1">
                    <span className="text-[8px] font-mono text-slate-400">CALC_LATENCY</span>
                    <span className="text-xs font-mono font-bold text-primary italic">8.2ms</span>
                  </div>
                  <div className="absolute bottom-0 left-0 flex flex-col items-start gap-1">
                    <span className="text-[8px] font-mono text-slate-400">SIGMA_CONFIDENCE</span>
                    <span className="text-xs font-mono font-bold text-emerald-500 italic">99.98%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Lean Parameters Grid */}
            <div className="lg:col-span-7">
              <div className="grid sm:grid-cols-2 gap-x-12 gap-y-10 lg:gap-y-14">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-5 group">
                    <div className="shrink-0 w-10 h-10 bg-white border border-slate-200 rounded-sm flex items-center justify-center text-primary shadow-sm group-hover:border-primary/30 group-hover:bg-primary/5 transition-all">
                      {feature.icon}
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="text-sm font-headline font-bold uppercase tracking-widest text-slate-900 group-hover:text-primary transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-[11px] lg:text-xs text-slate-500 leading-relaxed font-medium">
                        {feature.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

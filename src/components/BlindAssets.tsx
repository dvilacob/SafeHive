"use client"

import { Zap, ShieldCheck, Bot, Package } from "lucide-react";

export function BlindAssets() {
  return (
    <section className="py-40 bg-slate-50 border-y border-slate-100 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 skew-x-12 translate-x-1/2 -z-10" />
      
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-24 items-center max-w-7xl mx-auto">
          <div className="space-y-10">
            <div className="space-y-4">
              <span className="tech-label text-primary">Asset Orchestration</span>
              <h2 className="text-5xl font-headline font-bold leading-tight">Bring Spatial Awareness to Blind Assets.</h2>
            </div>
            
            <div className="space-y-8 text-slate-500 text-lg leading-relaxed">
              <p>
                By processing vision data from the humanoid hive and cross-referencing it via black-channel communication, we project a dynamic safety shield over blind assets—actively throttling their execution speeds in real-time based on human proximity, completely bypassing the need for complex hardware rewiring.
              </p>
              <p>
                This deterministic backbone extends awareness to standalone robots and legacy machines via our safety-rated bridge nodes, ensuring that "blind" equipment operates with the same spatial intelligence as native agents.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-6 border-t border-slate-200">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                  <Zap size={14} />
                  Zero Rewiring
                </div>
                <p className="text-xs text-slate-400">Integrated over existing ROS/WiFi networks using black-channel protocols.</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                  <ShieldCheck size={14} />
                  ISO Certified
                </div>
                <p className="text-xs text-slate-400">Compliant with SIL 3 / PLd probability thresholds for fail-safe operation.</p>
              </div>
            </div>
          </div>

          <div className="relative p-1 bg-white border border-slate-200 shadow-2xl overflow-hidden">
            <div className="aspect-square bg-slate-900 relative flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-blueprint opacity-10" />
              
              {/* Technical Schematic View */}
              <div className="relative w-full h-full p-12">
                {/* Robot Nodes Forming Triangle */}
                <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 group">
                  <div className="w-10 h-10 bg-primary/20 border border-primary/50 text-primary flex items-center justify-center rounded-sm">
                    <Bot size={20} />
                  </div>
                  <span className="text-[8px] font-mono text-primary/70">HIVE NODE A</span>
                </div>
                <div className="absolute top-1/4 right-1/4 translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 group">
                  <div className="w-10 h-10 bg-primary/20 border border-primary/50 text-primary flex items-center justify-center rounded-sm">
                    <Bot size={20} />
                  </div>
                  <span className="text-[8px] font-mono text-primary/70">HIVE NODE B</span>
                </div>
                <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 flex flex-col items-center gap-1 group">
                  <div className="w-10 h-10 bg-primary/20 border border-primary/50 text-primary flex items-center justify-center rounded-sm">
                    <Bot size={20} />
                  </div>
                  <span className="text-[8px] font-mono text-primary/70">HIVE NODE C</span>
                </div>

                {/* Blind Asset in Center */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="relative p-6 border-2 border-primary animate-pulse">
                    <div className="absolute -top-12 -left-12 w-24 h-24 border border-dashed border-primary/20 rounded-full animate-spin-slow" />
                    <Package className="text-white w-12 h-12" />
                    
                    {/* Bounding Box Labels */}
                    <div className="absolute -top-2 -left-2 w-2 h-2 bg-primary" />
                    <div className="absolute -top-2 -right-2 w-2 h-2 bg-primary" />
                    <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-primary" />
                    <div className="absolute -bottom-2 -right-2 w-2 h-2 bg-primary" />

                    {/* Telemetry Callout */}
                    <div className="absolute left-20 top-0 w-48 bg-white/5 border border-white/10 backdrop-blur-sm p-3 font-mono text-[9px] text-white space-y-1 pointer-events-none">
                      <div className="text-primary font-bold border-b border-white/10 pb-1 mb-1">ASSET ID: FKL-007 (Blind)</div>
                      <div className="flex justify-between"><span>CALCULATED POS:</span> <span className="text-primary">X: 14.2m, Y: 9.1m</span></div>
                      <div className="flex justify-between"><span>ORIENTATION:</span> <span>32°</span></div>
                      <div className="flex justify-between"><span>HIVE CONFIDENCE:</span> <span className="text-emerald-400">98.5%</span></div>
                    </div>
                  </div>
                </div>

                {/* Tracking Laser Lines (SVG) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <line x1="25%" y1="25%" x2="50%" y2="50%" stroke="rgba(0, 102, 255, 0.4)" strokeWidth="1" strokeDasharray="4 2" />
                  <line x1="75%" y1="25%" x2="50%" y2="50%" stroke="rgba(0, 102, 255, 0.4)" strokeWidth="1" strokeDasharray="4 2" />
                  <line x1="50%" y1="75%" x2="50%" y2="50%" stroke="rgba(0, 102, 255, 0.4)" strokeWidth="1" strokeDasharray="4 2" />
                </svg>
              </div>
            </div>
            
            <div className="p-8 bg-white border-t border-slate-200">
              <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-slate-400">
                <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> HIVE LINK ACTIVE | CROSS-REFERENCING SPATIAL DATA</span>
                <span className="flex gap-4">
                  <span>LATENCY: &lt;12MS</span>
                  <span>SIGNAL INTEGRITY: 99.999%</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client"

import { Zap, ShieldCheck, Share2 } from "lucide-react";

export function BlindAssets() {
  return (
    <section className="py-40 bg-slate-50 border-y border-slate-100 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 skew-x-12 translate-x-1/2 -z-10" />
      
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-24 items-center max-w-7xl mx-auto">
          <div className="space-y-10">
            <div className="space-y-4">
              <span className="tech-label text-primary">Asset Integration</span>
              <h2 className="text-5xl font-headline font-bold leading-tight">Bring Spatial Awareness to Blind Assets.</h2>
            </div>
            
            <div className="space-y-8 text-slate-500 text-lg leading-relaxed">
              <p>
                Humanoids feature integrated safety-rated communication. This deterministic backbone extends awareness to standalone robots and legacy machines via our safety-rated bridge nodes.
              </p>
              <p>
                By processing vision data from the humanoid hive and cross-referencing it via black-channel communication, we project a dynamic safety shield over blind assets without requiring complex new hardware or rewiring. These accessory nodes and vests will eventually be phased out as recognition algorithms for humans and objects reach deterministic safety levels.
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

          <div className="relative p-1 bg-white border border-slate-200 shadow-2xl">
            <div className="aspect-square bg-slate-900 relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-blueprint opacity-20" />
              <div className="relative z-10 text-center space-y-6">
                <div className="w-32 h-32 mx-auto border-2 border-primary/40 border-dashed rounded-full flex items-center justify-center animate-spin-slow">
                   <Share2 className="text-primary" size={48} />
                </div>
                <div className="space-y-2">
                  <div className="text-white font-headline font-bold text-xl tracking-widest">HIVE LINK ACTIVE</div>
                  <div className="text-primary text-[10px] font-bold uppercase tracking-[0.3em]">Cross-Referencing Spatial Data</div>
                </div>
              </div>
              
              {/* Decorative Data Nodes */}
              {[...Array(6)].map((_, i) => (
                <div 
                  key={i} 
                  className="absolute w-2 h-2 bg-primary rounded-full animate-pulse"
                  style={{
                    top: `${Math.random() * 80 + 10}%`,
                    left: `${Math.random() * 80 + 10}%`,
                    animationDelay: `${i * 0.5}s`
                  }}
                />
              ))}
            </div>
            
            <div className="p-8 bg-white border-t border-slate-200">
              <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-slate-400">
                <span>Latency: &lt;12ms</span>
                <span>Signal Integrity: 99.999%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
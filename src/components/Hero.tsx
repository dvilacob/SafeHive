"use client"

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-48 pb-32 overflow-hidden bg-blueprint">
      <div className="absolute top-0 left-0 w-full h-full bg-blueprint-fine -z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background -z-10" />
      
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center space-y-12">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/20">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">System Architecture v2.4.0</span>
          </div>

          <h1 className="text-7xl lg:text-[8.5rem] font-headline font-bold tracking-tighter leading-[0.85] text-slate-900">
            Spatial Safety for <br />
            <span className="text-primary italic">Spatial Agents.</span>
          </h1>

          <div className="max-w-3xl space-y-10">
            <p className="text-xl lg:text-2xl text-slate-500 font-medium leading-relaxed">
              Dynamic safety volumes that adapt to your factory floor. Actively orchestrate and throttle asset speeds in real-time to maintain true spatial safety awareness.
            </p>
            
            <p className="text-sm text-slate-400 font-semibold leading-relaxed max-w-2xl mx-auto border-t border-slate-100 pt-10">
              Designed for modern ISO standards: Achieving deterministic safety via &lt; 10⁻⁷ probability thresholds over black-channel safety-rated networks—completely bypassing the need for traditional dual-channel hardware.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 pt-6">
            <Button 
              size="lg" 
              className="h-16 px-12 text-lg font-bold rounded-none bg-primary hover:bg-primary/90 transition-all shadow-xl shadow-primary/20"
              onClick={() => document.getElementById('configurator')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Configure Infrastructure
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="h-16 px-12 text-lg font-bold rounded-none border-2 border-slate-200 hover:bg-white gap-3 transition-colors"
            >
              Architecture Spec <ArrowRight size={20} className="text-primary" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

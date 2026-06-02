"use client"

import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-48 pb-32 overflow-hidden bg-dot-pattern">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-white/80 to-white -z-10" />
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
            <ShieldCheck size={14} className="mr-1" />
            Safety-Rated Mesh Communication
          </div>
          <h1 className="text-6xl lg:text-8xl font-headline font-bold tracking-tight text-slate-900 leading-[1.05]">
            Spatial Safety for <br />
            <span className="text-primary italic">Spatial Agents.</span>
          </h1>
          <p className="text-xl lg:text-2xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Dynamic safety volumes that adapt to your factory floor. Orchestrate humanoids, mobile devices, and teams gaining safety awareness.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Button 
              size="lg" 
              className="rounded-full h-14 px-10 text-lg font-bold shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90"
              onClick={() => document.getElementById('configurator')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get Started
            </Button>
            <Button size="lg" variant="ghost" className="rounded-full h-14 px-10 text-lg font-semibold text-slate-600 hover:bg-slate-50 gap-2">
              Watch Demo <ArrowRight size={20} className="text-primary" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

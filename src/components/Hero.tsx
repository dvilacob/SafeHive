"use client"

import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Crosshair } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-40 pb-32 overflow-hidden bg-blueprint">
      <div className="absolute top-0 left-0 w-full h-full bg-blueprint-fine -z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background -z-10" />
      
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-start space-y-8">
            <div className="inline-flex items-center gap-3 px-3 py-1 rounded-sm bg-primary/10 border-l-2 border-primary">
              <Crosshair size={14} className="text-primary animate-pulse" />
              <span className="tech-label text-primary">Live Spatial Grid: v2.4.0</span>
            </div>

            <h1 className="text-7xl lg:text-9xl font-headline font-bold tracking-tighter leading-[0.9] text-slate-900">
              Spatial Safety for <br />
              <span className="text-primary italic">Spatial Agents.</span>
            </h1>

            <div className="max-w-2xl">
              <p className="text-xl lg:text-2xl text-slate-500 font-medium leading-relaxed">
                Dynamic safety volumes that adapt to your factory floor. Orchestrate humanoids, mobile devices, and teams gaining safety awareness.
              </p>
            </div>

            <div className="flex flex-wrap gap-6 pt-4">
              <Button 
                size="lg" 
                className="h-16 px-12 text-lg font-bold rounded-none bg-primary hover:bg-primary/90 transition-all"
                onClick={() => document.getElementById('configurator')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Configure Grid
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="h-16 px-12 text-lg font-bold rounded-none border-2 border-slate-200 hover:bg-white gap-3"
              >
                Technical Spec <ArrowRight size={20} className="text-primary" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
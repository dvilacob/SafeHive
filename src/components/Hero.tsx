"use client"

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Bot, User, Play, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

export function Hero() {
  const [isApproaching, setIsApproaching] = useState(false);
  const [speed, setSpeed] = useState(1500);
  const [status, setStatus] = useState("Nominal");

  useEffect(() => {
    if (isApproaching) {
      setSpeed(250);
      setStatus("Collaborative Speed");
    } else {
      setSpeed(1500);
      setStatus("Nominal");
    }
  }, [isApproaching]);

  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-[radial-gradient(circle_at_50%_-20%,rgba(247,198,17,0.1),transparent)]">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider">
            Industrial Safety 4.0
          </div>
          <h1 className="text-5xl lg:text-7xl font-headline tracking-tight text-white leading-[1.1]">
            Track everything and act on safety in <span className="text-primary italic">real-time</span>.
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Don't just shut down your whole factory when something goes wrong. SafeHive lets you see exactly where your robots, humans, and machines are, and only stops or slows down what is necessary. You don't even have to touch your current PLC setup.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-14 px-8 text-lg">
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="border-white/10 hover:bg-white/5 h-14 px-8 text-lg">
              Watch Demo
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="bg-zinc-900/50 border border-white/5 rounded-3xl p-8 backdrop-blur-xl shadow-2xl overflow-hidden aspect-square flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground uppercase font-bold tracking-widest">System Status</div>
                <div className={cn("text-lg font-headline font-bold transition-colors", status === "Nominal" ? "text-green-400" : "text-primary")}>
                  {status} {status !== "Nominal" && "(250mm/s)"}
                </div>
              </div>
              <div className="space-y-1 text-right">
                <div className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Joint Speed</div>
                <div className="text-lg font-headline font-bold text-white tabular-nums">{speed}mm/s</div>
              </div>
            </div>

            <div className="flex-1 relative bg-black/40 rounded-xl border border-white/5 grid-bg overflow-hidden flex items-center justify-center">
              {/* Grid background using CSS */}
              <style jsx>{`
                .grid-bg {
                  background-image: 
                    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
                  background-size: 40px 40px;
                }
              `}</style>

              {/* Simulation Elements */}
              <div className="relative w-full h-full flex items-center justify-center gap-32">
                {/* Robot */}
                <div className={cn(
                  "relative z-10 transition-all duration-1000 ease-in-out",
                  isApproaching ? "translate-x-12" : "translate-x-0"
                )}>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-[180px] h-[180px] rounded-full border border-sky-400/20 bg-sky-400/5" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] rounded-full border border-yellow-400/30 bg-yellow-400/5" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60px] h-[60px] rounded-full border border-red-500/40 bg-red-500/5 animate-pulse" />
                  </div>
                  <div className="w-12 h-12 bg-zinc-800 border border-white/10 rounded-lg flex items-center justify-center text-white relative shadow-lg">
                    <Bot size={24} />
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase text-muted-foreground whitespace-nowrap">Humanoid R-01</span>
                  </div>
                </div>

                {/* Human */}
                <div className={cn(
                  "relative z-10 transition-all duration-1000 ease-in-out",
                  isApproaching ? "-translate-x-12" : "translate-x-0"
                )}>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-[180px] h-[180px] rounded-full border border-sky-400/20 bg-sky-400/5" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] rounded-full border border-yellow-400/30 bg-yellow-400/5" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60px] h-[60px] rounded-full border border-red-500/40 bg-red-500/5 animate-pulse" />
                  </div>
                  <div className="w-12 h-12 bg-primary/20 border border-primary/40 rounded-full flex items-center justify-center text-primary relative shadow-lg">
                    <User size={24} />
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase text-muted-foreground whitespace-nowrap">Worker (Vest Active)</span>
                  </div>
                </div>

                {/* Connection Line */}
                <div className={cn(
                  "absolute h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent transition-all duration-1000",
                  isApproaching ? "w-16 opacity-100" : "w-0 opacity-0"
                )} />
              </div>

              {/* Controls */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4">
                <Button 
                  onClick={() => setIsApproaching(!isApproaching)}
                  className="bg-zinc-800 hover:bg-zinc-700 text-white gap-2 border border-white/10 shadow-lg"
                >
                  {isApproaching ? <RotateCcw size={18} /> : <Play size={18} />}
                  {isApproaching ? "Reset Simulation" : "Simulate Approach"}
                </Button>
              </div>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -z-10 -bottom-10 -right-10 w-64 h-64 bg-primary/10 blur-[100px] rounded-full" />
          <div className="absolute -z-10 -top-10 -left-10 w-64 h-64 bg-accent/10 blur-[100px] rounded-full" />
        </div>
      </div>
    </section>
  );
}

"use client"

import { useState } from 'react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bot, User, Wifi, Cloud, ShieldAlert, Zap, Radio, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export function Technology() {
  const [isBlocked, setIsBlocked] = useState(false);

  return (
    <section id="tech" className="py-24 space-y-32">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-4xl font-headline text-white">How the Tech Works</h2>
            <p className="text-muted-foreground text-lg">
              We replace guesswork with deterministic safety volumes and real-time mesh positioning.
            </p>
          </div>

          <div className="p-12 rounded-[2rem] bg-zinc-900 border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl -z-10 group-hover:bg-primary/10 transition-colors" />
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">The Universal Safety Formula</div>
            <div className="text-3xl lg:text-5xl font-headline font-bold text-white leading-tight">
              Safety Buffer <span className="text-primary">(S)</span> = (Asset Speed × Response Time) + Stopping Distance + <span className="text-accent">Confidence Factor (C)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h3 className="text-3xl font-headline text-white">The Hive Concept</h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              The Hive Mind: When a robot’s onboard sensors are blocked, it doesn't go blind. It instantly uses real-time position data shared by the ceiling access points and human vests. More data sources mean a lower Confidence Factor (C), making the safety bubble smaller so your factory stays fast.
            </p>
            
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-900 border border-white/5">
              <Switch id="block-vision" checked={isBlocked} onCheckedChange={setIsBlocked} />
              <Label htmlFor="block-vision" className="text-white font-medium flex items-center gap-2 cursor-pointer">
                {isBlocked ? <AlertTriangle className="text-accent w-4 h-4" /> : <ShieldAlert className="text-primary w-4 h-4" />}
                {isBlocked ? "Robot Vision Blocked (Obstruction)" : "Normal Line of Sight"}
              </Label>
            </div>
          </div>

          <div className="relative aspect-video bg-zinc-900 rounded-3xl border border-white/5 p-8 overflow-hidden flex items-center justify-center">
            {/* Mesh Background */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
            
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Nodes */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
                <div className="w-12 h-12 rounded-xl bg-zinc-800 border border-white/10 flex items-center justify-center text-primary shadow-lg animate-pulse-glow">
                  <Cloud size={24} />
                </div>
                <span className="text-[10px] uppercase font-bold text-muted-foreground">Ceiling AP</span>
              </div>

              <div className="absolute bottom-0 left-0 flex flex-col items-center gap-2 z-20">
                <div className="w-12 h-12 rounded-xl bg-zinc-800 border border-white/10 flex items-center justify-center text-white shadow-lg">
                  <Bot size={24} />
                </div>
                <span className="text-[10px] uppercase font-bold text-muted-foreground">Robot</span>
              </div>

              <div className="absolute bottom-0 right-0 flex flex-col items-center gap-2 z-20">
                <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary shadow-lg">
                  <User size={24} />
                </div>
                <span className="text-[10px] uppercase font-bold text-muted-foreground">Worker</span>
              </div>

              {/* Data Lines (SVG) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                {/* Robot to Worker (Direct) */}
                <line 
                  x1="15%" y1="85%" x2="85%" y2="85%" 
                  stroke={isBlocked ? "#EF4E0A" : "#F7C611"} 
                  strokeWidth="2" 
                  strokeDasharray="4 4"
                  className="transition-colors duration-500"
                />
                {isBlocked && (
                  <text x="50%" y="87%" textAnchor="middle" fill="#EF4E0A" fontSize="24" className="font-bold">✕</text>
                )}

                {/* Worker to AP */}
                <line 
                  x1="85%" y1="85%" x2="50%" y2="15%" 
                  stroke={isBlocked ? "#22c55e" : "#F7C611"} 
                  strokeWidth="2" 
                  strokeDasharray="4 4"
                  className={cn("transition-all duration-500", isBlocked && "stroke-[4px] brightness-125")}
                />

                {/* AP to Robot */}
                <line 
                  x1="50%" y1="15%" x2="15%" y2="85%" 
                  stroke={isBlocked ? "#22c55e" : "#F7C611"} 
                  strokeWidth="2" 
                  strokeDasharray="4 4"
                  className={cn("transition-all duration-500", isBlocked && "stroke-[4px] brightness-125")}
                />
              </svg>

              {/* Obstruction */}
              <div className={cn(
                "absolute bottom-12 left-1/2 -translate-x-1/2 w-20 h-32 bg-zinc-700/80 border border-white/10 rounded-lg transition-all duration-500 flex items-center justify-center",
                isBlocked ? "opacity-100 scale-100" : "opacity-0 scale-50 pointer-events-none"
              )}>
                <div className="text-[8px] font-bold text-muted-foreground uppercase text-center px-2">Physical Obstruction</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-24 items-start">
        <div className="bg-zinc-900 rounded-[2.5rem] border border-white/5 p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-sky-400/5 blur-[80px]" />
          <h3 className="text-2xl font-headline text-white mb-8">The Volume Technique</h3>
          
          <div className="relative aspect-square max-w-[300px] mx-auto flex items-center justify-center mb-8">
            <div className="absolute w-full h-full rounded-full border border-sky-400/30 bg-sky-400/5 flex items-center justify-center">
              <span className="absolute -top-6 text-[10px] font-bold text-sky-400 uppercase tracking-widest">Warning Shell</span>
            </div>
            <div className="absolute w-[70%] h-[70%] rounded-full border border-yellow-400/40 bg-yellow-400/5 flex items-center justify-center">
              <span className="absolute -top-6 text-[10px] font-bold text-yellow-400 uppercase tracking-widest">Collaborative Shell</span>
            </div>
            <div className="absolute w-[40%] h-[40%] rounded-full border border-accent/50 bg-accent/5 flex items-center justify-center">
              <span className="absolute -top-6 text-[10px] font-bold text-accent uppercase tracking-widest">Protective Shell</span>
            </div>
            <div className="relative w-12 h-12 rounded-lg bg-zinc-800 border border-white/20 flex items-center justify-center text-white z-10">
              <Zap size={20} />
            </div>
          </div>

          <ul className="space-y-4 pt-8">
            <li className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="w-3 h-3 rounded-full bg-sky-400/50" />
              <span className="text-white font-medium">Warning Shell</span> &rarr; Vest Vibrates
            </li>
            <li className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="w-3 h-3 rounded-full bg-yellow-400/50" />
              <span className="text-white font-medium">Collaborative Shell</span> &rarr; Slow Down & Limit Torque
            </li>
            <li className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="w-3 h-3 rounded-full bg-accent/50" />
              <span className="text-white font-medium">Protective Shell</span> &rarr; Immediate E-Stop
            </li>
          </ul>
        </div>

        <div className="space-y-8">
          <h3 className="text-3xl font-headline text-white">Behavioral Matrix</h3>
          <div className="border border-white/5 rounded-2xl overflow-hidden bg-zinc-900">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/5 text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
                  <th className="p-4">Event</th>
                  <th className="p-4">Target</th>
                  <th className="p-4">Response</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-white/5">
                <tr>
                  <td className="p-4 text-white">Human Vest enters Warning Shell</td>
                  <td className="p-4 text-muted-foreground">Humanoid</td>
                  <td className="p-4 text-muted-foreground">Vest vibrates; Humanoid keeps speed.</td>
                </tr>
                <tr>
                  <td className="p-4 text-white">Human Vest enters Collaborative Shell</td>
                  <td className="p-4 text-muted-foreground">Humanoid</td>
                  <td className="p-4 text-muted-foreground">Robot drops to 250mm/s and limits torque.</td>
                </tr>
                <tr>
                  <td className="p-4 text-white font-bold text-accent">Breach Protective Shell</td>
                  <td className="p-4 text-muted-foreground">Local Area</td>
                  <td className="p-4 text-accent font-medium">Hardware E-Stop triggers instantly.</td>
                </tr>
                <tr>
                  <td className="p-4 text-white">Network Signal Drops &gt; 20ms</td>
                  <td className="p-4 text-muted-foreground">Affected Asset</td>
                  <td className="p-4 text-muted-foreground">Asset enters Blind Mode (safe crawl).</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client"

import { useState } from 'react';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Package, Cpu, Send, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function Configurator() {
  const [area, setArea] = useState(1000);
  const [machines, setMachines] = useState(4);
  const [workers, setWorkers] = useState(10);

  // Pricing constants
  const HUB_COST = 12500;
  const AP_COST = 2200;
  const NODE_COST = 1500;
  const VEST_COST = 450;

  // Calculation Logic
  const apCount = Math.ceil(area / 500);
  const nodeCount = machines;
  const vestCount = workers;
  const totalCost = HUB_COST + (apCount * AP_COST) + (nodeCount * NODE_COST) + (vestCount * VEST_COST);

  return (
    <section id="configurator" className="py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-headline font-bold text-slate-900">Cost Configurator</h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">Calculate your safety grid investment with real-time hardware estimates.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 items-start max-w-6xl mx-auto">
          {/* Controls */}
          <div className="lg:col-span-2 space-y-12 bg-slate-50 border border-slate-200 p-10 lg:p-14 rounded-[2.5rem] shadow-sm">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <Label className="text-slate-900 text-lg font-bold">Total Work Area (m²)</Label>
                  <span className="text-2xl font-headline font-bold text-primary">{area} m²</span>
                </div>
                <Slider 
                  value={[area]} 
                  onValueChange={(v) => setArea(v[0])} 
                  max={10000} 
                  min={100} 
                  step={100}
                  className="py-4"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Label className="text-slate-900 text-lg font-bold">Non-Native Machines</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger><Info size={14} className="text-slate-400" /></TooltipTrigger>
                        <TooltipContent>Legacy machines (forklifts, AGVs) requiring Safety-Rated Mobile Adapter Nodes.</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input 
                    type="number" 
                    value={machines} 
                    onChange={(e) => setMachines(Math.max(0, parseInt(e.target.value) || 0))}
                    className="h-14 text-lg font-bold bg-white border-slate-200 rounded-2xl px-6"
                  />
                  <p className="text-xs text-slate-400">Requires Mobile Adapter Nodes.</p>
                </div>

                <div className="space-y-4">
                  <Label className="text-slate-900 text-lg font-bold">Human Personnel</Label>
                  <Input 
                    type="number" 
                    value={workers} 
                    onChange={(e) => setWorkers(Math.max(0, parseInt(e.target.value) || 0))}
                    className="h-14 text-lg font-bold bg-white border-slate-200 rounded-2xl px-6"
                  />
                  <p className="text-xs text-slate-400">Requires Smart Safety Vests.</p>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-primary/5 border border-primary/10 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Cpu size={20} />
                </div>
                <h4 className="text-lg font-headline font-bold text-slate-900">Deterministic Coverage Plan</h4>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">
                Based on your {area}m² facility, the SafeHive grid will utilize {apCount} Perimeter Access Points to maintain a safety heartbeat. {nodeCount} legacy assets will be integrated into the mesh via safety-rated adapter nodes, while {workers} workers receive real-time haptic alerts via smart vests.
              </p>
            </div>
          </div>

          {/* BOM Sidebar */}
          <div className="lg:col-span-1 bg-white border border-slate-200 rounded-[2.5rem] p-10 space-y-10 sticky top-28 shadow-xl shadow-slate-200/50">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-8">
              <Package className="text-primary" size={24} />
              <h3 className="text-xs font-headline font-bold text-slate-900 uppercase tracking-widest">Hardware Estimate</h3>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">SafeHive Control Hub</span>
                <span className="text-slate-900 font-bold shrink-0">1 x $12,500</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="text-slate-500 truncate">Perimeter Access Points</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="shrink-0"><Info size={12} className="text-slate-300" /></TooltipTrigger>
                      <TooltipContent>Overhead spatial grid anchors (APs) required for area coverage.</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <span className="text-slate-900 font-bold shrink-0 ml-2">{apCount} x $2,200</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Mobile Adapter Nodes</span>
                <span className="text-slate-900 font-bold shrink-0 ml-2">{nodeCount} x $1,500</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Smart Safety Vests</span>
                <span className="text-slate-900 font-bold shrink-0 ml-2">{vestCount} x $450</span>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-100 space-y-2">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-[0.2em]">Total Estimated Hardware</div>
              <div className="text-4xl font-headline font-bold text-slate-900 tabular-nums">${totalCost.toLocaleString()}</div>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full h-16 bg-primary hover:bg-primary/90 text-white font-bold text-lg rounded-2xl shadow-lg shadow-primary/20">
                  Request Quote
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white border-slate-200 text-slate-900 rounded-[2rem]">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-headline font-bold">Request Final Quote</DialogTitle>
                  <DialogDescription className="text-slate-500">
                    Submit your project details for a certified BOM export and site plan.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Alex Rivera" className="rounded-xl border-slate-200" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Work Email</Label>
                    <Input id="email" type="email" placeholder="alex@spatial-automation.com" className="rounded-xl border-slate-200" />
                  </div>
                </div>
                <DialogFooter>
                  <Button className="w-full h-14 bg-primary text-white font-bold rounded-xl">
                    <Send className="mr-2 h-4 w-4" />
                    Send Quote Request
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client"

import { useState } from 'react';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Package, Cpu, Send, Info, ListCheck } from "lucide-react";
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

  const HUB_COST = 12500;
  const AP_COST = 2200;
  const NODE_COST = 1500;
  const VEST_COST = 450;

  const apCount = Math.ceil(area / 500);
  const nodeCount = machines;
  const vestCount = workers;
  const totalCost = HUB_COST + (apCount * AP_COST) + (nodeCount * NODE_COST) + (vestCount * VEST_COST);

  return (
    <section id="configurator" className="py-40 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-20 items-start">
            
            <div className="lg:col-span-7 space-y-16">
              <div className="space-y-4">
                <span className="tech-label">BOM Calculator</span>
                <h2 className="text-6xl font-headline font-bold tracking-tighter">Hardware Configurator.</h2>
                <p className="text-slate-500 text-xl">Define your factory floor constraints to generate a baseline safety infrastructure estimate.</p>
              </div>

              <div className="space-y-12">
                <div className="space-y-8">
                  <div className="flex justify-between items-end">
                    <Label className="text-slate-900 text-lg font-bold">Total Work Area (m²)</Label>
                    <span className="text-4xl font-headline font-bold text-primary italic">{area} m²</span>
                  </div>
                  <Slider value={[area]} onValueChange={(v) => setArea(v[0])} max={10000} min={100} step={100} className="py-4" />
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-4">
                    <Label className="tech-label">Non-Native Machines</Label>
                    <Input 
                      type="number" 
                      value={machines} 
                      onChange={(e) => setMachines(Math.max(0, parseInt(e.target.value) || 0))}
                      className="h-20 text-3xl font-headline font-bold rounded-none border-2 border-slate-100 focus:border-primary transition-all px-8"
                    />
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Requires Mobile Adapter Nodes</p>
                  </div>

                  <div className="space-y-4">
                    <Label className="tech-label">Human Personnel</Label>
                    <Input 
                      type="number" 
                      value={workers} 
                      onChange={(e) => setWorkers(Math.max(0, parseInt(e.target.value) || 0))}
                      className="h-20 text-3xl font-headline font-bold rounded-none border-2 border-slate-100 focus:border-primary transition-all px-8"
                    />
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Requires Smart Safety Vests</p>
                  </div>
                </div>
              </div>

              <div className="p-12 border-2 border-slate-100 flex gap-8 items-start bg-slate-50">
                <ListCheck className="text-primary shrink-0" size={32} />
                <div className="space-y-2">
                  <h4 className="text-xl font-headline font-bold">Coverage Plan: Verified</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Based on your facility metrics, the grid will utilize {apCount} Perimeter Access Points (APs) to maintain a safety heartbeat. Legacy machines will be integrated via safety-rated adapter nodes, while workers receive real-time haptic feedback.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="sticky top-32 glass-panel p-12 space-y-10">
                <div className="flex justify-between items-center border-b border-slate-200 pb-8">
                  <h3 className="tech-label text-slate-900">Bill of Materials</h3>
                  <Package className="text-primary" size={24} />
                </div>

                <div className="space-y-6">
                  {[
                    { label: 'SafeHive Control Hub', qty: 1, unit: HUB_COST },
                    { label: 'Perimeter Access Points', qty: apCount, unit: AP_COST },
                    { label: 'Mobile Adapter Nodes', qty: nodeCount, unit: NODE_COST },
                    { label: 'Smart Safety Vests', qty: vestCount, unit: VEST_COST }
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center group">
                      <div className="space-y-1">
                        <span className="block text-sm font-bold text-slate-900">{item.label}</span>
                        <span className="block text-[10px] text-slate-400 uppercase tracking-widest">{item.qty} Unit(s) @ ${item.unit.toLocaleString()}</span>
                      </div>
                      <span className="text-sm font-mono font-bold text-slate-900">${(item.qty * item.unit).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-10 border-t border-slate-200 space-y-4">
                  <div className="flex justify-between items-end">
                    <span className="tech-label">Total Estimate</span>
                    <div className="text-5xl font-headline font-bold text-slate-900 tracking-tighter">${totalCost.toLocaleString()}</div>
                  </div>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full h-20 text-xl font-bold rounded-none bg-primary hover:bg-primary/90 transition-all shadow-2xl shadow-primary/20">
                        Request Site Plan
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="rounded-none border-4 border-slate-900">
                      <DialogHeader>
                        <DialogTitle className="text-3xl font-headline">Request Official BOM</DialogTitle>
                        <DialogDescription>Submit your facility coordinates for a certified hardware specification.</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-6 py-8">
                        <Input placeholder="Engineering Lead Name" className="h-14 rounded-none border-2" />
                        <Input placeholder="Corporate Email Address" className="h-14 rounded-none border-2" />
                      </div>
                      <DialogFooter>
                        <Button className="w-full h-16 rounded-none bg-primary font-bold text-lg">Send Request</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
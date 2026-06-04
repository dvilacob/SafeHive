
"use client"

import { useState } from 'react';
import Image from 'next/image';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, ListCheck, Monitor, Cpu, ShieldCheck } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
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

  // Phase 1 Hardware Costs
  const HUB_COST = 12500;
  const AP_COST = 2200;

  // Calculation logic for perimeter coverage
  const apCount = Math.ceil(area / 500);
  const totalCost = HUB_COST + (apCount * AP_COST);

  const hardwareImg = PlaceHolderImages.find(img => img.id === 'hardware-hub');

  return (
    <section id="configurator" className="py-20 lg:py-40 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            
            <div className="lg:col-span-7 space-y-10 lg:space-y-16">
              <div className="space-y-4">
                <span className="tech-label text-primary">Infrastructure Planning</span>
                <h2 className="text-4xl lg:text-6xl font-headline font-bold tracking-tighter">Architecture Configurator.</h2>
                <p className="text-slate-500 text-lg lg:text-xl max-w-2xl">Define facility constraints to generate a Phase 1 certified hardware specification for core spatial grid coverage.</p>
              </div>

              <div className="space-y-8 lg:space-y-12">
                <div className="space-y-6 lg:space-y-8">
                  <div className="flex justify-between items-end">
                    <Label className="text-slate-900 text-base lg:text-lg font-bold uppercase tracking-widest">Total Work Area (m²)</Label>
                    <span className="text-2xl lg:text-4xl font-headline font-bold text-primary italic">{area} m²</span>
                  </div>
                  <Slider value={[area]} onValueChange={(v) => setArea(v[0])} max={10000} min={100} step={100} className="py-4" />
                  
                  {hardwareImg && (
                    <div className="pt-8 group">
                      <div className="relative border border-slate-200 rounded-sm overflow-hidden bg-slate-50 shadow-inner group-hover:shadow-lg transition-all duration-500">
                        <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-white/90 backdrop-blur border border-slate-200 shadow-sm">
                          <span className="text-[8px] font-mono font-bold tracking-[0.2em] text-primary">UNIT SPEC: SH-CONTROL-HUB-v2</span>
                        </div>
                        <div className="relative aspect-[16/9] w-full">
                          <Image 
                            src={hardwareImg.imageUrl} 
                            alt={hardwareImg.description} 
                            fill
                            className="object-cover opacity-70 group-hover:opacity-100 transition-all duration-700 grayscale hover:grayscale-0"
                            data-ai-hint={hardwareImg.imageHint}
                          />
                        </div>
                        <div className="absolute bottom-4 right-4 z-20 flex gap-2">
                           <span className="px-2 py-1 bg-slate-900 text-white text-[7px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                             <Cpu size={10} />
                             NVIDIA JETSON AI EDGE
                           </span>
                           <span className="px-2 py-1 bg-primary text-white text-[7px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                             <ShieldCheck size={10} />
                             SAFETY PLC - BLACK CHANNEL GUARD
                           </span>
                        </div>
                      </div>
                      <p className="tech-label mt-4 text-slate-400">Fig 1.2: Deterministic SafeHive Processing Enclosure (Standard NEMA Interface)</p>
                    </div>
                  )}

                  <p className="text-xs lg:text-sm text-slate-400 font-medium leading-relaxed max-w-lg">
                    The spatial grid utilizes high-frequency anchors to establish the deterministic heartbeat. Phase 1 deployment focuses on establishing maximum coverage density for native spatial agents.
                  </p>
                </div>
              </div>

              <div className="p-6 lg:p-12 border border-slate-200 flex flex-col sm:flex-row gap-6 lg:gap-8 items-start bg-slate-50">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-primary/10 rounded-sm flex items-center justify-center text-primary shrink-0 shadow-sm border border-primary/10">
                  <ListCheck size={24} />
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg lg:text-xl font-headline font-bold uppercase tracking-widest">Core Coverage Verified</h4>
                  <p className="text-xs lg:text-sm text-slate-500 leading-relaxed max-w-lg">
                    Your facility requires {apCount} Perimeter Access Points (APs) to maintain a safety-rated spatial mesh. This configuration provides the deterministic backbone required for Phase 1 humanoid orchestration.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 w-full">
              <div className="sticky top-32 glass-panel p-6 lg:p-12 space-y-8 lg:space-y-10 border-slate-200 shadow-2xl">
                <div className="flex justify-between items-center border-b border-slate-100 pb-6 lg:pb-8">
                  <h3 className="tech-label text-slate-900">Phase 1 BOM</h3>
                  <Monitor className="text-primary" size={18} />
                </div>

                <div className="space-y-4 lg:space-y-6">
                  {[
                    { label: 'SafeHive Control Hub', qty: 1, unit: HUB_COST, desc: 'Central deterministic processing unit' },
                    { label: 'Perimeter Access Points (APs)', qty: apCount, unit: AP_COST, desc: 'Overhead spatial anchors' }
                  ].map((item, i) => (
                    <div key={i} className="flex flex-row justify-between items-center py-2 border-b border-slate-50 last:border-0 overflow-hidden">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <span className="text-[10px] lg:text-xs font-bold text-slate-900 truncate whitespace-nowrap">{item.label}</span>
                        <span className="text-[8px] lg:text-[9px] text-slate-400 uppercase tracking-widest font-mono whitespace-nowrap">({item.qty} × ${item.unit.toLocaleString('en-US')})</span>
                      </div>
                      <span className="text-[10px] lg:text-xs font-mono font-bold text-slate-900 shrink-0 ml-2 lg:ml-4">${(item.qty * item.unit).toLocaleString('en-US')}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-8 lg:pt-10 border-t border-slate-100 space-y-6 lg:space-y-8">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2">
                    <span className="tech-label text-slate-400">Phase 1 Hardware Estimate</span>
                    <div className="text-3xl lg:text-5xl font-headline font-bold text-slate-900 tracking-tighter whitespace-nowrap">${totalCost.toLocaleString('en-US')}</div>
                  </div>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full h-auto py-4 lg:py-6 px-6 lg:px-8 text-base lg:text-lg font-bold rounded-none bg-primary hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 gap-3 flex items-center justify-center uppercase tracking-widest">
                        Order
                        <ArrowRight size={18} className="shrink-0" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="rounded-none border-4 border-slate-900 w-[95vw] max-w-lg">
                      <DialogHeader>
                        <DialogTitle className="text-2xl lg:text-3xl font-headline">Order Phase 1 Site Spec</DialogTitle>
                        <DialogDescription>Our engineers will generate a verified Phase 1 site plan based on your facility area.</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 lg:space-y-6 py-6 lg:py-8">
                        <div className="space-y-2">
                          <Label className="tech-label">Lead Integration Engineer</Label>
                          <Input placeholder="Full Name" className="h-12 lg:h-14 rounded-none border-2" />
                        </div>
                        <div className="space-y-2">
                          <Label className="tech-label">Corporate Email Address</Label>
                          <Input placeholder="email@company.com" className="h-12 lg:h-14 rounded-none border-2" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button className="w-full h-14 lg:h-16 rounded-none bg-primary font-bold text-base lg:text-lg">Order</Button>
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

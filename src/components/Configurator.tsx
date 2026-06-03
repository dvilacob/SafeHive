"use client"

import { useState } from 'react';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, ListCheck, Monitor } from "lucide-react";
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

  return (
    <section id="configurator" className="py-40 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-20 items-start">
            
            <div className="lg:col-span-7 space-y-16">
              <div className="space-y-4">
                <span className="tech-label text-primary">Infrastructure Planning</span>
                <h2 className="text-6xl font-headline font-bold tracking-tighter">Architecture Configurator.</h2>
                <p className="text-slate-500 text-xl max-w-2xl">Define facility constraints to generate a Phase 1 certified hardware specification for core spatial grid coverage.</p>
              </div>

              <div className="space-y-12">
                <div className="space-y-8">
                  <div className="flex justify-between items-end">
                    <Label className="text-slate-900 text-lg font-bold uppercase tracking-widest">Total Work Area (m²)</Label>
                    <span className="text-4xl font-headline font-bold text-primary italic">{area} m²</span>
                  </div>
                  <Slider value={[area]} onValueChange={(v) => setArea(v[0])} max={10000} min={100} step={100} className="py-4" />
                  <p className="text-sm text-slate-400 font-medium leading-relaxed max-w-lg">
                    The spatial grid utilizes high-frequency anchors to establish the deterministic heartbeat. Phase 1 deployment focuses on establishing maximum coverage density for native spatial agents.
                  </p>
                </div>
              </div>

              <div className="p-12 border border-slate-200 flex gap-8 items-start bg-slate-50">
                <div className="w-12 h-12 bg-primary/10 rounded-sm flex items-center justify-center text-primary shrink-0 shadow-sm border border-primary/10">
                  <ListCheck size={24} />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-headline font-bold uppercase tracking-widest">Core Coverage Verified</h4>
                  <p className="text-sm text-slate-500 leading-relaxed max-w-lg">
                    Your facility requires {apCount} Perimeter Access Points (APs) to maintain a safety-rated spatial mesh. This configuration provides the deterministic backbone required for Phase 1 humanoid orchestration.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="sticky top-32 glass-panel p-12 space-y-10 border-slate-200 shadow-2xl">
                <div className="flex justify-between items-center border-b border-slate-100 pb-8">
                  <h3 className="tech-label text-slate-900">Phase 1 BOM</h3>
                  <Monitor className="text-primary" size={20} />
                </div>

                <div className="space-y-6">
                  {[
                    { label: 'SafeHive Control Hub', qty: 1, unit: HUB_COST, desc: 'Central deterministic processing unit' },
                    { label: 'Perimeter Access Points (APs)', qty: apCount, unit: AP_COST, desc: 'Overhead spatial anchors' }
                  ].map((item, i) => (
                    <div key={i} className="flex flex-row justify-between items-center py-2 border-b border-slate-50 last:border-0 overflow-hidden">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <span className="text-xs font-bold text-slate-900 truncate whitespace-nowrap">{item.label}</span>
                        <span className="text-[9px] text-slate-400 uppercase tracking-widest font-mono whitespace-nowrap">({item.qty} × ${item.unit.toLocaleString('en-US')})</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-900 shrink-0 ml-4">${(item.qty * item.unit).toLocaleString('en-US')}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-10 border-t border-slate-100 space-y-8">
                  <div className="flex justify-between items-end">
                    <span className="tech-label text-slate-400">Phase 1 Hardware Estimate</span>
                    <div className="text-5xl font-headline font-bold text-slate-900 tracking-tighter whitespace-nowrap">${totalCost.toLocaleString('en-US')}</div>
                  </div>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full h-auto py-6 px-8 text-lg font-bold rounded-none bg-primary hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 gap-3 flex items-center justify-center">
                        <span className="text-center whitespace-normal">Request Phase 1 Architecture Spec</span>
                        <ArrowRight size={20} className="shrink-0" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="rounded-none border-4 border-slate-900">
                      <DialogHeader>
                        <DialogTitle className="text-3xl font-headline">Request Site Specification</DialogTitle>
                        <DialogDescription>Our engineers will generate a verified Phase 1 site plan based on your facility area.</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-6 py-8">
                        <div className="space-y-2">
                          <Label className="tech-label">Lead Integration Engineer</Label>
                          <Input placeholder="Full Name" className="h-14 rounded-none border-2" />
                        </div>
                        <div className="space-y-2">
                          <Label className="tech-label">Corporate Email Address</Label>
                          <Input placeholder="email@company.com" className="h-14 rounded-none border-2" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button className="w-full h-16 rounded-none bg-primary font-bold text-lg">Generate Phase 1 Site Spec</Button>
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

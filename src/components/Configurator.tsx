"use client"

import { useState, useEffect } from 'react';
import * as SliderPrimitive from "@radix-ui/react-slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Monitor, Target } from "lucide-react";
import { cn } from "@/lib/utils";
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Phase 1 Hardware Costs
  const HUB_COST = 12500;
  const AP_COST = 2200;

  // Calculation logic for perimeter coverage
  const apCount = Math.ceil(area / 500);
  const totalCost = HUB_COST + (apCount * AP_COST);

  const formatPrice = (price: number) => {
    if (!mounted) return price.toString();
    return price.toLocaleString();
  };

  return (
    <section id="configurator" className="py-24 lg:py-48 bg-[#F8FAFC] relative overflow-hidden">
      {/* Dot Grid Background */}
      <div className="absolute inset-0 bg-dot-grid opacity-60 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-start">
            
            <div className="lg:col-span-7 space-y-12 lg:space-y-20">
              <div className="space-y-6">
                <h2 className="text-5xl lg:text-7xl font-headline font-bold tracking-tighter text-slate-900">
                  Hive Configurator<span className="text-primary">.</span>
                </h2>
                <p className="text-slate-500 text-lg lg:text-xl max-w-xl font-medium">
                  Define facility constraints to generate a deterministic Phase 1 site specification.
                </p>
              </div>

              <div className="space-y-12 lg:space-y-16">
                <div className="space-y-8">
                  <div className="flex justify-between items-baseline">
                    <Label className="text-slate-400 text-xs font-mono font-bold uppercase tracking-[0.3em]">TOTAL WORK AREA (m²)</Label>
                    <div className="text-4xl lg:text-5xl font-mono font-bold text-primary drop-shadow-[0_0_15px_rgba(0,102,255,0.15)]">
                      {area}
                      <span className="text-sm ml-2 text-slate-300 font-mono tracking-normal">M²</span>
                    </div>
                  </div>
                  
                  {/* Custom Industrial Slider */}
                  <SliderPrimitive.Root
                    value={[area]}
                    onValueChange={(v) => setArea(v[0])}
                    max={10000}
                    min={100}
                    step={100}
                    className="relative flex w-full touch-none select-none items-center py-6"
                  >
                    <SliderPrimitive.Track className="relative h-4 w-full grow overflow-hidden bg-slate-200/50 border border-slate-200 inner-shadow-recessed">
                      <SliderPrimitive.Range className="absolute h-full bg-primary/10" />
                    </SliderPrimitive.Track>
                    <SliderPrimitive.Thumb className="group relative block h-10 w-10 outline-none cursor-pointer">
                      <div className="absolute inset-0 flex items-center justify-center transition-transform duration-200 group-hover:scale-125 group-active:scale-95">
                        <Target className="text-primary fill-primary/10 w-full h-full drop-shadow-[0_0_10px_rgba(0,102,255,0.4)]" />
                      </div>
                    </SliderPrimitive.Thumb>
                  </SliderPrimitive.Root>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 w-full">
              <div className="bg-white border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative">
                {/* Panel Corner Accent */}
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/20 -translate-x-4 translate-y-4" />
                
                <div className="p-10 lg:p-12 space-y-10">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-8">
                    <h3 className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-slate-400">Bill of materials</h3>
                    <Monitor className="text-primary/40" size={16} />
                  </div>

                  <div className="space-y-6">
                    {[
                      { label: 'SafeHive Control Hub', qty: 1, unit: HUB_COST },
                      { label: 'Perimeter Access Points', qty: apCount, unit: AP_COST }
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-start text-xs">
                        <div className="flex flex-col gap-1">
                          <span className="font-bold text-slate-900 tracking-tight">{item.label}</span>
                          <span className="text-[9px] text-slate-400 font-mono uppercase">QTY: {item.qty} × ${formatPrice(item.unit)}</span>
                        </div>
                        <span className="font-mono font-bold text-slate-900 tabular-nums text-sm">${formatPrice(item.qty * item.unit)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-10 border-t border-slate-100 space-y-8">
                    <div className="flex justify-between items-end">
                      <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Total cost</span>
                      <div className="text-4xl lg:text-5xl font-mono font-bold text-slate-900 tracking-tighter tabular-nums">
                        ${formatPrice(totalCost)}
                      </div>
                    </div>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="group relative w-full h-20 bg-primary hover:bg-[#06b6d4] transition-colors duration-300 chamfered-button overflow-hidden">
                          <div className="relative z-10 flex items-center justify-center gap-4 text-white text-xs font-mono font-bold uppercase tracking-[0.3em]">
                            Order
                            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-2" />
                          </div>
                          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      </DialogTrigger>
                      <DialogContent className="rounded-none border-2 border-slate-900 w-[95vw] max-w-lg p-0 overflow-hidden">
                        <div className="p-8 space-y-6">
                          <DialogHeader>
                            <DialogTitle className="text-2xl font-headline font-bold uppercase tracking-tight">Order Phase 1 Site Spec</DialogTitle>
                            <DialogDescription className="font-medium text-slate-500">Our engineers will generate a verified Phase 1 site plan based on your facility area.</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-6 py-4">
                            <div className="space-y-2">
                              <Label className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">Lead Integration Engineer</Label>
                              <Input placeholder="FULL NAME" className="h-14 rounded-none border-slate-200 focus:border-primary focus:ring-0 text-sm font-mono" />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">Corporate Email Address</Label>
                              <Input placeholder="EMAIL@COMPANY.COM" className="h-14 rounded-none border-slate-200 focus:border-primary focus:ring-0 text-sm font-mono" />
                            </div>
                          </div>
                          <DialogFooter>
                            <button className="w-full h-16 bg-primary text-white font-mono font-bold uppercase tracking-[0.2em] chamfered-button hover:bg-[#06b6d4] transition-colors">
                              Submit Order
                            </button>
                          </DialogFooter>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
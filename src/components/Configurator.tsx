"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';
import * as SliderPrimitive from "@radix-ui/react-slider";
import { Label } from "@/components/ui/label";
import { ArrowRight, Monitor, Target, Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function Configurator() {
  const [area, setArea] = useState(1000);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const HUB_UNIT_COST = 12500;
  const AP_UNIT_COST = 2200;
  const ONBOARDING_COST = 5000;
  const SUBSCRIPTION_ANNUAL = 8500;

  const hubCount = Math.max(1, Math.ceil(area / 5000));
  const apCount = Math.ceil(area / 500);
  
  const dueNowTotal = (hubCount * HUB_UNIT_COST) + (apCount * AP_UNIT_COST) + ONBOARDING_COST;

  const hubImage = PlaceHolderImages.find(img => img.id === 'hardware-hub');

  const formatPrice = (price: number) => {
    if (!mounted) return price.toString();
    return price.toLocaleString();
  };

  return (
    <section id="configurator" className="py-20 lg:py-48 bg-[#F8FAFC] relative overflow-hidden">
      <div className="absolute inset-0 bg-dot-grid opacity-60 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative">
        <div className="max-w-7xl auto">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-24 items-start">
            
            <div className="lg:col-span-7 space-y-10 lg:space-y-16">
              <div className="space-y-4 lg:space-y-6">
                <h2 className="text-4xl lg:text-7xl font-headline font-bold tracking-tighter text-slate-900 leading-tight">
                  Hive Configurator<span className="text-primary">.</span>
                </h2>
                <p className="text-slate-500 text-sm lg:text-xl max-w-2xl font-medium leading-relaxed">
                  Specify your facility parameters to determine the infrastructure required to orchestrate your humanoid fleet and machines safely.
                </p>
              </div>

              {hubImage && (
                <div className="relative aspect-[4/3] sm:aspect-video lg:aspect-[16/9] w-full bg-slate-100 rounded-sm overflow-hidden border border-slate-200 shadow-xl group">
                  <Image 
                    src={hubImage.imageUrl} 
                    alt={hubImage.description}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    data-ai-hint={hubImage.imageHint}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 lg:bottom-6 lg:left-6 flex items-center gap-2 lg:gap-3">
                    <div className="bg-primary/90 backdrop-blur-md px-2 py-1 lg:px-3 lg:py-1.5 rounded-sm border border-white/20">
                      <span className="text-[8px] lg:text-[10px] font-mono font-bold text-white uppercase tracking-[0.2em]">SH-HUB-V2</span>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md px-2 py-1 lg:px-3 lg:py-1.5 rounded-sm border border-white/10">
                      <span className="text-[8px] lg:text-[10px] font-mono font-bold text-white uppercase tracking-[0.2em]">Safety-Rated</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-8 lg:space-y-12">
                <div className="space-y-6 lg:space-y-8">
                  <div className="flex flex-col sm:flex-row justify-between items-baseline gap-2">
                    <Label className="text-slate-400 text-[9px] lg:text-xs font-mono font-bold uppercase tracking-[0.3em]">TOTAL WORK AREA (m²)</Label>
                    <div className="text-4xl lg:text-6xl font-mono font-bold text-primary tabular-nums shrink-0">
                      {area}
                      <span className="text-xs lg:text-sm ml-2 text-slate-300 font-mono tracking-normal">M²</span>
                    </div>
                  </div>
                  
                  <div className="relative py-8 lg:py-10">
                    <SliderPrimitive.Root
                      value={[area]}
                      onValueChange={(v) => setArea(v[0])}
                      max={10000}
                      min={100}
                      step={100}
                      className="relative flex w-full touch-none select-none items-center cursor-pointer"
                    >
                      <SliderPrimitive.Track className="relative h-4 lg:h-6 w-full grow overflow-hidden bg-slate-200/50 border border-slate-200 rounded-full inner-shadow-recessed">
                        <SliderPrimitive.Range className="absolute h-full bg-primary/20" />
                      </SliderPrimitive.Track>
                      <SliderPrimitive.Thumb className="group relative block h-10 w-10 lg:h-14 lg:w-14 outline-none focus:ring-4 focus:ring-primary/20 rounded-full">
                        <div className="absolute inset-0 flex items-center justify-center transition-transform duration-200 group-hover:scale-110 group-active:scale-90">
                          <Target className="text-primary fill-white w-full h-full drop-shadow-[0_4px_16px_rgba(0,102,255,0.4)]" />
                        </div>
                      </SliderPrimitive.Thumb>
                    </SliderPrimitive.Root>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 w-full">
              <div className="bg-white border border-slate-200 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] relative rounded-sm">
                <div className="p-6 lg:p-14 space-y-8 lg:space-y-12">
                  <TooltipProvider>
                    <div className="space-y-8 lg:space-y-12">
                      <div className="space-y-4 lg:space-y-6">
                        <h3 className="text-[9px] lg:text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-primary border-b border-slate-100 pb-3 lg:pb-5">Initial Investment (CAPEX)</h3>
                        <div className="space-y-4 lg:space-y-6">
                          <div className="flex justify-between items-start text-xs lg:text-base">
                            <div className="flex flex-col gap-1.5">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-slate-900 tracking-tight">SafeHive Hub</span>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Info size={14} className="text-slate-300 hover:text-primary cursor-help" />
                                  </TooltipTrigger>
                                  <TooltipContent className="max-w-[280px] p-4 text-[11px] leading-relaxed font-medium bg-slate-900 text-white border-0 shadow-2xl">
                                    Includes Spatial Compute Core, Hardware Safety PLC, I/O Boards, and Secure Remote Gateway.
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                              <span className="text-[9px] lg:text-[10px] text-slate-400 font-mono uppercase">QTY: {hubCount} × ${formatPrice(HUB_UNIT_COST)}</span>
                            </div>
                            <span className="font-mono font-bold text-slate-900 tabular-nums">${formatPrice(hubCount * HUB_UNIT_COST)}</span>
                          </div>

                          <div className="flex justify-between items-start text-xs lg:text-base">
                            <div className="flex flex-col gap-1.5">
                              <span className="font-bold text-slate-900 tracking-tight">Perimeter Access Points</span>
                              <span className="text-[9px] lg:text-[10px] text-slate-400 font-mono uppercase">QTY: {apCount} × ${formatPrice(AP_UNIT_COST)}</span>
                            </div>
                            <span className="font-mono font-bold text-slate-900 tabular-nums">${formatPrice(apCount * AP_UNIT_COST)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TooltipProvider>

                  <div className="pt-8 lg:pt-12 border-t border-slate-100 space-y-6 lg:space-y-8">
                    <div className="space-y-4 lg:space-y-6">
                      <div className="flex justify-between items-end">
                        <span className="text-[9px] lg:text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.2em]">Due Now</span>
                        <div className="text-2xl lg:text-5xl font-mono font-bold text-slate-900 tracking-tighter tabular-nums">
                          ${formatPrice(dueNowTotal)}
                        </div>
                      </div>
                    </div>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="group relative w-full h-16 lg:h-24 bg-primary hover:bg-[#06b6d4] transition-all duration-300 rounded-sm overflow-hidden shadow-xl shadow-primary/20">
                          <div className="relative z-10 flex items-center justify-center gap-3 lg:gap-4 text-white text-[10px] lg:text-xs font-mono font-bold uppercase tracking-[0.4em]">
                            Generate Quote
                            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-2" />
                          </div>
                        </button>
                      </DialogTrigger>
                      <DialogContent className="rounded-none border-2 border-slate-900 w-[92vw] max-w-lg p-0 overflow-hidden shadow-2xl">
                        <DialogHeader className="p-6 lg:p-12 pb-0">
                          <DialogTitle className="text-xl lg:text-3xl font-headline font-bold uppercase tracking-tight">Order Site Spec</DialogTitle>
                          <DialogDescription className="font-medium text-slate-500 text-xs lg:text-base">Our engineers will generate a verified Phase 1 site plan.</DialogDescription>
                        </DialogHeader>
                        <div className="p-6 lg:p-12 space-y-4 lg:space-y-6 pt-2">
                          <div className="space-y-2">
                            <Label className="text-[9px] lg:text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">Integration Lead</Label>
                            <Input placeholder="FULL NAME" className="h-12 lg:h-16 rounded-none" />
                          </div>
                        </div>
                        <DialogFooter className="p-6 lg:p-12 pt-0">
                          <button className="w-full h-14 lg:h-20 bg-primary text-white font-mono font-bold uppercase tracking-[0.3em] rounded-sm">
                            Submit for Review
                          </button>
                        </DialogFooter>
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

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
  const recurringTotal = SUBSCRIPTION_ANNUAL;

  const hubImage = PlaceHolderImages.find(img => img.id === 'hardware-hub');

  const formatPrice = (price: number) => {
    if (!mounted) return price.toString();
    return price.toLocaleString();
  };

  return (
    <section id="configurator" className="py-24 lg:py-48 bg-[#F8FAFC] relative overflow-hidden">
      <div className="absolute inset-0 bg-dot-grid opacity-60 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-start">
            
            <div className="lg:col-span-7 space-y-12 lg:space-y-16">
              <div className="space-y-6">
                <h2 className="text-4xl lg:text-7xl font-headline font-bold tracking-tighter text-slate-900 leading-tight">
                  Hive Configurator<span className="text-primary">.</span>
                </h2>
                <p className="text-slate-500 text-base lg:text-xl max-w-2xl font-medium leading-relaxed">
                  Define your facility constraints to provide you with the infrastructure and the hub in order to orchestrate your humanoid fleet and machines safely.
                </p>
              </div>

              {hubImage && (
                <div className="relative aspect-[16/9] w-full bg-slate-100 rounded-sm overflow-hidden border border-slate-200 shadow-2xl group">
                  <Image 
                    src={hubImage.imageUrl} 
                    alt={hubImage.description}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    data-ai-hint={hubImage.imageHint}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent pointer-events-none" />
                  <div className="absolute bottom-6 left-6 flex items-center gap-3">
                    <div className="bg-primary/90 backdrop-blur-md px-3 py-1.5 rounded-sm border border-white/20">
                      <span className="text-[10px] font-mono font-bold text-white uppercase tracking-[0.2em]">Unit SH-HUB-V2</span>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-sm border border-white/10">
                      <span className="text-[10px] font-mono font-bold text-white uppercase tracking-[0.2em]">Safety-Rated</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-12">
                <div className="space-y-8">
                  <div className="flex justify-between items-baseline gap-4">
                    <Label className="text-slate-400 text-[10px] lg:text-xs font-mono font-bold uppercase tracking-[0.3em]">TOTAL WORK AREA (m²)</Label>
                    <div className="text-3xl lg:text-6xl font-mono font-bold text-primary tabular-nums shrink-0">
                      {area}
                      <span className="text-xs lg:text-sm ml-2 text-slate-300 font-mono tracking-normal">M²</span>
                    </div>
                  </div>
                  
                  <div className="relative py-10">
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

                  <div className="p-6 lg:p-8 bg-white border border-slate-100 rounded-sm space-y-3 shadow-sm">
                    <div className="flex items-center gap-2 text-[10px] lg:text-xs font-bold text-slate-400 uppercase tracking-widest">
                      <Monitor size={14} className="text-primary" />
                      Asset Configuration
                    </div>
                    <p className="text-xs lg:text-sm text-slate-500 font-medium leading-relaxed">
                      Default: <span className="text-slate-900 font-bold">ROS-Integrated Fleet</span> (Native spatial awareness via HIVE deterministic protocol)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 w-full">
              <div className="bg-white border border-slate-200 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] relative rounded-sm">
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/20 -translate-x-4 translate-y-4 hidden lg:block" />
                
                <div className="p-8 lg:p-14 space-y-10 lg:space-y-12">
                  <TooltipProvider>
                    <div className="space-y-10 lg:space-y-12">
                      <div className="space-y-6">
                        <div className="flex justify-between items-center border-b border-slate-100 pb-5">
                          <h3 className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-primary">Initial Investment (CAPEX)</h3>
                        </div>

                        <div className="space-y-6">
                          <div className="flex justify-between items-start text-xs lg:text-base">
                            <div className="flex flex-col gap-1.5">
                              <div className="flex items-center gap-2.5">
                                <span className="font-bold text-slate-900 tracking-tight">SafeHive Control Hub</span>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Info size={14} className="text-slate-300 hover:text-primary cursor-help" />
                                  </TooltipTrigger>
                                  <TooltipContent className="max-w-[280px] p-4 text-[11px] leading-relaxed font-medium bg-slate-900 text-white border-0">
                                    Includes Spatial Compute Core, Hardware Safety PLC, I/O Boards, Secure Remote Gateway, Managed Switch, and Power/UPS.
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                              <span className="text-[10px] text-slate-400 font-mono uppercase">QTY: {hubCount} × ${formatPrice(HUB_UNIT_COST)}</span>
                            </div>
                            <span className="font-mono font-bold text-slate-900 tabular-nums">${formatPrice(hubCount * HUB_UNIT_COST)}</span>
                          </div>

                          <div className="flex justify-between items-start text-xs lg:text-base">
                            <div className="flex flex-col gap-1.5">
                              <span className="font-bold text-slate-900 tracking-tight">Perimeter Access Points</span>
                              <span className="text-[10px] text-slate-400 font-mono uppercase">QTY: {apCount} × ${formatPrice(AP_UNIT_COST)}</span>
                            </div>
                            <span className="font-mono font-bold text-slate-900 tabular-nums">${formatPrice(apCount * AP_UNIT_COST)}</span>
                          </div>

                          <div className="flex justify-between items-start text-xs lg:text-base">
                            <div className="flex flex-col gap-1.5">
                              <div className="flex items-center gap-2.5">
                                <span className="font-bold text-slate-900 tracking-tight">Onboarding & API Support</span>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Info size={14} className="text-slate-300 hover:text-primary cursor-help" />
                                  </TooltipTrigger>
                                  <TooltipContent className="max-w-[280px] p-4 text-[11px] leading-relaxed font-medium bg-slate-900 text-white border-0">
                                    Engineering safety-loop validation and protocol handshake verification.
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                              <span className="text-[10px] text-slate-400 font-mono uppercase">QTY: 1 × ${formatPrice(ONBOARDING_COST)}</span>
                            </div>
                            <span className="font-mono font-bold text-slate-900 tabular-nums">${formatPrice(ONBOARDING_COST)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="flex justify-between items-center border-b border-slate-100 pb-5">
                          <h3 className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-amber-500">Annual Subscription (OPEX)</h3>
                        </div>

                        <div className="flex justify-between items-start text-xs lg:text-base">
                          <div className="flex flex-col gap-1.5">
                            <div className="flex items-center gap-2.5">
                              <span className="font-bold text-slate-900 tracking-tight">SafeHive Platform License</span>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Info size={14} className="text-slate-300 hover:text-primary cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent className="max-w-[280px] p-4 text-[11px] leading-relaxed font-medium bg-slate-900 text-white border-0">
                                  Includes Spatial Engine updates, Black Channel brokerage, and security patches.
                                </TooltipContent>
                              </Tooltip>
                            </div>
                            <span className="text-[10px] text-slate-400 font-mono uppercase">Annual Recurring</span>
                          </div>
                          <span className="font-mono font-bold text-slate-900 tabular-nums">${formatPrice(recurringTotal)}/yr</span>
                        </div>
                      </div>
                    </div>
                  </TooltipProvider>

                  <div className="pt-10 lg:pt-12 border-t border-slate-100 space-y-8">
                    <div className="space-y-6">
                      <div className="flex justify-between items-end">
                        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.2em]">Due Now</span>
                        <div className="text-3xl lg:text-5xl font-mono font-bold text-slate-900 tracking-tighter tabular-nums">
                          ${formatPrice(dueNowTotal)}
                        </div>
                      </div>
                      <div className="flex justify-between items-end border-t border-slate-50 pt-5">
                        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.2em]">Yearly Subscription</span>
                        <div className="text-xl lg:text-2xl font-mono font-bold text-amber-600 tabular-nums">
                          ${formatPrice(recurringTotal)}/yr
                        </div>
                      </div>
                    </div>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="group relative w-full h-18 lg:h-24 bg-primary hover:bg-[#06b6d4] transition-all duration-300 rounded-sm overflow-hidden shadow-xl shadow-primary/20">
                          <div className="relative z-10 flex items-center justify-center gap-4 text-white text-[11px] lg:text-xs font-mono font-bold uppercase tracking-[0.4em]">
                            Generate Quote
                            <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-2" />
                          </div>
                        </button>
                      </DialogTrigger>
                      <DialogContent className="rounded-none border-2 border-slate-900 w-[95vw] max-w-lg p-0 overflow-hidden">
                        <div className="p-8 lg:p-12 space-y-8">
                          <DialogHeader>
                            <DialogTitle className="text-2xl lg:text-3xl font-headline font-bold uppercase tracking-tight">Order Site Spec</DialogTitle>
                            <DialogDescription className="font-medium text-slate-500 text-sm lg:text-base">Our engineers will generate a verified Phase 1 site plan based on your facility area.</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-6 py-4">
                            <div className="space-y-2.5">
                              <Label className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">Lead Integration Engineer</Label>
                              <Input placeholder="FULL NAME" className="h-14 lg:h-16 rounded-none border-slate-200 focus:border-primary focus:ring-0 text-sm font-mono" />
                            </div>
                            <div className="space-y-2.5">
                              <Label className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">Corporate Email Address</Label>
                              <Input placeholder="EMAIL@COMPANY.COM" className="h-14 lg:h-16 rounded-none border-slate-200 focus:border-primary focus:ring-0 text-sm font-mono" />
                            </div>
                          </div>
                          <DialogFooter>
                            <button className="w-full h-16 lg:h-20 bg-primary text-white font-mono font-bold uppercase tracking-[0.3em] rounded-sm hover:bg-[#06b6d4] transition-all shadow-lg">
                              Submit for Review
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

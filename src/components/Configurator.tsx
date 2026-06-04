"use client"

import { useState, useEffect } from 'react';
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

export function Configurator() {
  const [area, setArea] = useState(1000);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Pricing Logic
  const HUB_UNIT_COST = 12500;
  const AP_UNIT_COST = 2200;
  const ONBOARDING_COST = 5000;
  const SUBSCRIPTION_ANNUAL = 8500;

  // Calculation logic
  const hubCount = Math.max(1, Math.ceil(area / 5000));
  const apCount = Math.ceil(area / 500);
  
  const dueNowTotal = (hubCount * HUB_UNIT_COST) + (apCount * AP_UNIT_COST) + ONBOARDING_COST;
  const recurringTotal = SUBSCRIPTION_ANNUAL;

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
                <div className="tech-label text-primary">System Planner v4.1</div>
                <h2 className="text-5xl lg:text-7xl font-headline font-bold tracking-tighter text-slate-900">
                  Hive Configurator<span className="text-primary">.</span>
                </h2>
                <p className="text-slate-500 text-lg lg:text-xl max-w-xl font-medium">
                  Define facility constraints to generate a safety-rated infrastructure order.
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

                  <div className="p-6 bg-white border border-slate-100 rounded-sm space-y-2">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      <Monitor size={12} className="text-primary" />
                      Asset Configuration
                    </div>
                    <p className="text-xs text-slate-500 font-medium">Default: <span className="text-slate-900 font-bold">ROS-Integrated Fleet</span> (Native spatial awareness via HIVE protocol)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 w-full">
              <div className="bg-white border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative">
                {/* Panel Corner Accent */}
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/20 -translate-x-4 translate-y-4" />
                
                <div className="p-10 lg:p-12 space-y-10">
                  <TooltipProvider>
                    <div className="space-y-10">
                      {/* Section A: Initial Investment */}
                      <div className="space-y-6">
                        <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                          <h3 className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-primary">Initial Investment (CAPEX)</h3>
                        </div>

                        <div className="space-y-4">
                          <div className="flex justify-between items-start text-xs">
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-slate-900 tracking-tight">SafeHive Control Hub</span>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Info size={12} className="text-slate-300 hover:text-primary cursor-help" />
                                  </TooltipTrigger>
                                  <TooltipContent className="max-w-[240px] p-3 text-[10px] leading-relaxed">
                                    Includes Spatial Compute Core, Hardware Safety PLC, I/O Boards, Secure Remote Gateway, Managed Switch, and Power/UPS.
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                              <span className="text-[9px] text-slate-400 font-mono uppercase">QTY: {hubCount} × ${formatPrice(HUB_UNIT_COST)}</span>
                            </div>
                            <span className="font-mono font-bold text-slate-900 tabular-nums text-sm">${formatPrice(hubCount * HUB_UNIT_COST)}</span>
                          </div>

                          <div className="flex justify-between items-start text-xs">
                            <div className="flex flex-col gap-1">
                              <span className="font-bold text-slate-900 tracking-tight">Perimeter Access Points</span>
                              <span className="text-[9px] text-slate-400 font-mono uppercase">QTY: {apCount} × ${formatPrice(AP_UNIT_COST)}</span>
                            </div>
                            <span className="font-mono font-bold text-slate-900 tabular-nums text-sm">${formatPrice(apCount * AP_UNIT_COST)}</span>
                          </div>

                          <div className="flex justify-between items-start text-xs">
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-slate-900 tracking-tight">Onboarding & API Support</span>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Info size={12} className="text-slate-300 hover:text-primary cursor-help" />
                                  </TooltipTrigger>
                                  <TooltipContent className="max-w-[240px] p-3 text-[10px] leading-relaxed">
                                    Engineering safety-loop validation and protocol handshake verification.
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                              <span className="text-[9px] text-slate-400 font-mono uppercase">QTY: 1 × ${formatPrice(ONBOARDING_COST)}</span>
                            </div>
                            <span className="font-mono font-bold text-slate-900 tabular-nums text-sm">${formatPrice(ONBOARDING_COST)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Section B: Recurring Cost */}
                      <div className="space-y-6">
                        <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                          <h3 className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-amber-500">Annual Subscription (OPEX)</h3>
                        </div>

                        <div className="flex justify-between items-start text-xs">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-900 tracking-tight">SafeHive Platform License</span>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Info size={12} className="text-slate-300 hover:text-primary cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent className="max-w-[240px] p-3 text-[10px] leading-relaxed">
                                  Includes Spatial Engine updates, Black Channel brokerage, and security patches.
                                </TooltipContent>
                              </Tooltip>
                            </div>
                            <span className="text-[9px] text-slate-400 font-mono uppercase">Annual Recurring</span>
                          </div>
                          <span className="font-mono font-bold text-slate-900 tabular-nums text-sm">${formatPrice(recurringTotal)}/yr</span>
                        </div>
                      </div>
                    </div>
                  </TooltipProvider>

                  <div className="pt-10 border-t border-slate-100 space-y-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-end">
                        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Due Now</span>
                        <div className="text-3xl lg:text-4xl font-mono font-bold text-slate-900 tracking-tighter tabular-nums">
                          ${formatPrice(dueNowTotal)}
                        </div>
                      </div>
                      <div className="flex justify-between items-end border-t border-slate-50 pt-4">
                        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Yearly Subscription</span>
                        <div className="text-xl font-mono font-bold text-amber-600 tabular-nums">
                          ${formatPrice(recurringTotal)}/yr
                        </div>
                      </div>
                    </div>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="group relative w-full h-20 bg-primary hover:bg-[#06b6d4] transition-colors duration-300 chamfered-button overflow-hidden">
                          <div className="relative z-10 flex items-center justify-center gap-4 text-white text-xs font-mono font-bold uppercase tracking-[0.3em]">
                            Generate Quote
                            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-2" />
                          </div>
                          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      </DialogTrigger>
                      <DialogContent className="rounded-none border-2 border-slate-900 w-[95vw] max-w-lg p-0 overflow-hidden">
                        <div className="p-8 space-y-6">
                          <DialogHeader>
                            <DialogTitle className="text-2xl font-headline font-bold uppercase tracking-tight">Order Site Spec</DialogTitle>
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

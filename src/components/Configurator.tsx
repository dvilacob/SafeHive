"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';
import * as SliderPrimitive from "@radix-ui/react-slider";
import { Label } from "@/components/ui/label";
import { ArrowRight, Target, Info } from "lucide-react";
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
  const hubCount = Math.max(1, Math.ceil(area / 5000));
  const apCount = Math.ceil(area / 500);
  const dueNowTotal = (hubCount * HUB_UNIT_COST) + (apCount * AP_UNIT_COST) + 5000;

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
              </div>

              {hubImage && (
                <div className="relative aspect-square sm:aspect-video lg:aspect-[16/9] w-full bg-slate-100 rounded-sm overflow-hidden border border-slate-200 shadow-xl group">
                  <Image src={hubImage.imageUrl} alt={hubImage.description} fill className="object-cover" data-ai-hint={hubImage.imageHint} />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <div className="bg-primary/90 backdrop-blur-md px-2 py-1 rounded-sm border border-white/20">
                      <span className="text-[7px] lg:text-[10px] font-mono font-bold text-white uppercase tracking-[0.2em]">SH-HUB-V2</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-8">
                <div className="flex flex-col sm:flex-row justify-between items-baseline gap-2">
                  <Label className="text-slate-400 text-[9px] font-mono font-bold uppercase tracking-[0.3em]">TOTAL WORK AREA (m²)</Label>
                  <div className="text-4xl lg:text-6xl font-mono font-bold text-primary tabular-nums shrink-0">{area}<span className="text-xs ml-2 text-slate-300">M²</span></div>
                </div>
                <SliderPrimitive.Root value={[area]} onValueChange={(v) => setArea(v[0])} max={10000} min={100} step={100} className="relative flex w-full touch-none select-none items-center cursor-pointer">
                  <SliderPrimitive.Track className="relative h-4 w-full bg-slate-200/50 border border-slate-200 rounded-full"><SliderPrimitive.Range className="absolute h-full bg-primary/20" /></SliderPrimitive.Track>
                  <SliderPrimitive.Thumb className="block h-10 w-10 outline-none"><Target className="text-primary fill-white w-full h-full" /></SliderPrimitive.Thumb>
                </SliderPrimitive.Root>
              </div>
            </div>

            <div className="lg:col-span-5 w-full">
              <div className="bg-white border border-slate-200 shadow-2xl p-6 lg:p-14 space-y-12 rounded-sm">
                <TooltipProvider>
                  <div className="space-y-8">
                    <h3 className="text-[9px] font-mono font-bold uppercase tracking-[0.4em] text-primary border-b pb-5">Investment (CAPEX)</h3>
                    <div className="space-y-6">
                      <div className="flex justify-between items-start text-xs lg:text-base">
                        <div className="flex items-center gap-2"><span className="font-bold">SafeHive Hub</span><Tooltip><TooltipTrigger asChild><Info size={14} className="text-slate-300 cursor-help" /></TooltipTrigger><TooltipContent className="p-4 text-[11px] bg-slate-900 text-white">Includes Spatial Compute Core and Safety PLC.</TooltipContent></Tooltip></div>
                        <span className="font-mono">${formatPrice(hubCount * HUB_UNIT_COST)}</span>
                      </div>
                      <div className="flex justify-between items-start text-xs lg:text-base">
                        <span className="font-bold">Access Points (QTY: {apCount})</span>
                        <span className="font-mono">${formatPrice(apCount * AP_UNIT_COST)}</span>
                      </div>
                    </div>
                  </div>
                </TooltipProvider>
                <div className="pt-8 border-t space-y-8">
                  <div className="flex justify-between items-end"><span className="text-[9px] font-mono font-bold text-slate-400 uppercase">Due Now</span><div className="text-2xl lg:text-5xl font-mono font-bold">${formatPrice(dueNowTotal)}</div></div>
                  <Dialog>
                    <DialogTrigger asChild><button className="w-full h-16 lg:h-24 bg-primary text-white text-[10px] font-mono font-bold uppercase tracking-[0.4em] hover:bg-primary/90 shadow-xl">Generate Quote <ArrowRight className="inline ml-2" /></button></DialogTrigger>
                    <DialogContent className="max-w-lg p-12"><DialogHeader><DialogTitle className="text-3xl font-headline font-bold">Request Spec</DialogTitle><DialogDescription>Our engineers will generate a verified site plan.</DialogDescription></DialogHeader><div className="space-y-4"><Label className="text-[10px] font-mono uppercase text-slate-400">Integration Lead</Label><Input placeholder="FULL NAME" className="h-16 rounded-none" /></div><DialogFooter><button className="w-full h-20 bg-primary text-white font-mono uppercase tracking-[0.3em]">Submit</button></DialogFooter></DialogContent>
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
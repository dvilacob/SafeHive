"use client"

import { useState, useEffect } from 'react';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Monitor } from "lucide-react";
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
    <section id="configurator" className="py-20 lg:py-40 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            
            <div className="lg:col-span-7 space-y-10 lg:space-y-16">
              <div className="space-y-4">
                <h2 className="text-4xl lg:text-6xl font-headline font-bold tracking-tighter">Hive Configurator.</h2>
                <p className="text-slate-500 text-lg lg:text-xl max-w-2xl">Define facility constraints to generate your order</p>
              </div>

              <div className="space-y-8 lg:space-y-12">
                <div className="space-y-6 lg:space-y-8">
                  <div className="flex justify-between items-end">
                    <Label className="text-slate-900 text-base lg:text-lg font-bold uppercase tracking-widest">Total Work Area (m²)</Label>
                    <span className="text-2xl lg:text-4xl font-headline font-bold text-primary italic">{area} m²</span>
                  </div>
                  <Slider value={[area]} onValueChange={(v) => setArea(v[0])} max={10000} min={100} step={100} className="py-4" />
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 w-full">
              <div className="sticky top-32 glass-panel p-0 overflow-hidden space-y-0 border-slate-200 shadow-2xl rounded-sm">
                
                <div className="p-8 lg:p-10 space-y-8">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-6">
                    <h3 className="tech-label text-slate-900 uppercase">Bill of materials</h3>
                    <Monitor className="text-primary" size={16} />
                  </div>

                  <div className="space-y-4">
                    {[
                      { label: 'SafeHive Control Hub', qty: 1, unit: HUB_COST },
                      { label: 'Perimeter Access Points (APs)', qty: apCount, unit: AP_COST }
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center text-xs">
                        <div className="flex flex-col gap-0.5">
                          <span className="font-bold text-slate-900">{item.label}</span>
                          <span className="text-[9px] text-slate-400 font-mono">({item.qty} × ${formatPrice(item.unit)})</span>
                        </div>
                        <span className="font-mono font-bold text-slate-900">${formatPrice(item.qty * item.unit)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-8 border-t border-slate-100 space-y-6">
                    <div className="flex justify-between items-end">
                      <span className="tech-label text-slate-400">Total</span>
                      <div className="text-3xl lg:text-5xl font-headline font-bold text-slate-900 tracking-tighter">${formatPrice(totalCost)}</div>
                    </div>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full h-16 text-base font-bold rounded-none bg-primary hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 gap-3 flex items-center justify-center uppercase tracking-widest">
                          Order
                          <ArrowRight size={18} />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="rounded-none border-4 border-slate-900 w-[95vw] max-w-lg">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-headline">Order Phase 1 Site Spec</DialogTitle>
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
                          <Button className="w-full h-16 rounded-none bg-primary font-bold text-lg">Order</Button>
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

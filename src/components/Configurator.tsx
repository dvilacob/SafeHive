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
  const [blindMachines, setBlindMachines] = useState(4);
  const [humans, setHumans] = useState(10);

  const HUB_COST = 12500;
  const AP_COST = 2200;
  const JETSON_COST = 3800;
  const VEST_COST = 450;

  const apCount = Math.ceil(area / 500);
  const jetsonCount = blindMachines;
  const vestCount = humans;
  const totalCost = HUB_COST + (apCount * AP_COST) + (jetsonCount * JETSON_COST) + (vestCount * VEST_COST);

  return (
    <section id="configurator" className="py-40 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-20 items-start">
            
            <div className="lg:col-span-7 space-y-16">
              <div className="space-y-4">
                <span className="tech-label text-primary">Infrastructure Planning</span>
                <h2 className="text-6xl font-headline font-bold tracking-tighter">Architecture Configurator.</h2>
                <p className="text-slate-500 text-xl max-w-2xl">Define facility constraints to generate a certified hardware specification for spatial awareness integration.</p>
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
                    <Label className="tech-label text-slate-900">Blind/Non-Native Machines</Label>
                    <Input 
                      type="number" 
                      value={blindMachines} 
                      onChange={(e) => setBlindMachines(Math.max(0, parseInt(e.target.value) || 0))}
                      className="h-20 text-3xl font-headline font-bold rounded-none border-2 border-slate-100 focus:border-primary transition-all px-8 bg-slate-50"
                    />
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Requires Black-Channel Jetson Modules</p>
                  </div>

                  <div className="space-y-4">
                    <Label className="tech-label text-slate-900">Humans (Wearable Assets)</Label>
                    <Input 
                      type="number" 
                      value={humans} 
                      onChange={(e) => setHumans(Math.max(0, parseInt(e.target.value) || 0))}
                      className="h-20 text-3xl font-headline font-bold rounded-none border-2 border-slate-100 focus:border-primary transition-all px-8 bg-slate-50"
                    />
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Equipped with Smart Vests / Xsens</p>
                  </div>
                </div>
              </div>

              <div className="p-12 border border-slate-200 flex gap-8 items-start bg-slate-50">
                <div className="w-12 h-12 bg-primary/10 rounded-sm flex items-center justify-center text-primary shrink-0">
                  <ListCheck size={24} />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-headline font-bold">Preliminary Coverage Verified</h4>
                  <p className="text-sm text-slate-500 leading-relaxed max-w-lg">
                    Infrastructure utilizes {apCount} Perimeter Access Points (APs) to establish the spatial heartbeat. Blind assets are integrated via Black-Channel Edge modules, ensuring no safety logic re-wiring is required.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="sticky top-32 glass-panel p-12 space-y-10 border-slate-200 shadow-2xl">
                <div className="flex justify-between items-center border-b border-slate-100 pb-8">
                  <h3 className="tech-label text-slate-900">Architecture BOM</h3>
                  <Monitor className="text-primary" size={20} />
                </div>

                <div className="space-y-8">
                  {[
                    { label: 'SafeHive Control Hub', qty: 1, unit: HUB_COST, desc: 'Central deterministic processing unit' },
                    { label: 'Perimeter Access Points (APs)', qty: apCount, unit: AP_COST, desc: 'Overhead spatial anchors' },
                    { label: 'Black-Channel Jetson Modules', qty: jetsonCount, unit: JETSON_COST, desc: 'Edge safety for blind machines' },
                    { label: 'Smart Safety Wearables', qty: vestCount, unit: VEST_COST, desc: 'Xsens / Haptic personnel trackers' }
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center group">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900">{item.label}</span>
                        <span className="text-[10px] text-slate-400 uppercase tracking-widest">{item.qty} x ${item.unit.toLocaleString()}</span>
                      </div>
                      <span className="text-sm font-mono font-bold text-slate-900">${(item.qty * item.unit).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-10 border-t border-slate-100 space-y-6">
                  <div className="flex justify-between items-end">
                    <span className="tech-label text-slate-400">Total Hardware Estimate</span>
                    <div className="text-5xl font-headline font-bold text-slate-900 tracking-tighter">${totalCost.toLocaleString()}</div>
                  </div>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full h-20 text-lg font-bold rounded-none bg-primary hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 gap-3">
                        Request Quote & Core Architecture Spec <ArrowRight size={20} />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="rounded-none border-4 border-slate-900">
                      <DialogHeader>
                        <DialogTitle className="text-3xl font-headline">Request Architecture Spec</DialogTitle>
                        <DialogDescription>Our engineers will generate a verified site plan based on these coordinates.</DialogDescription>
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
                        <Button className="w-full h-16 rounded-none bg-primary font-bold text-lg">Generate Site Specification</Button>
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
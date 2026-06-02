"use client"

import { useState, useEffect } from 'react';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, Package, Cpu, Send, FileDown, Loader2 } from "lucide-react";
import { aiConfigurationInsights } from '@/ai/flows/ai-configuration-insights-flow';
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
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  // Pricing constants per user requirements
  const HUB_COST = 12500;
  const AP_COST = 2200;
  const NODE_COST = 1500;
  const VEST_COST = 450;

  // Calculation Logic
  const apCount = Math.ceil(area / 500);
  const nodeCount = machines;
  const vestCount = workers;
  const totalCost = HUB_COST + (apCount * AP_COST) + (nodeCount * NODE_COST) + (vestCount * VEST_COST);

  useEffect(() => {
    const timer = setTimeout(async () => {
      setLoadingAi(true);
      try {
        const result = await aiConfigurationInsights({
          workplaceAreaSqMeters: area,
          nonNativeMachines: machines,
          nonNativeHumans: workers,
          perimeterAccessPoints: apCount,
          mobileNodes: nodeCount,
          mobileVests: vestCount,
          totalDataSources: apCount + nodeCount + vestCount,
          totalEstimatedHardwareCost: totalCost
        });
        setAiInsight(result.insights);
      } catch (err) {
        console.error("Failed to fetch AI insights", err);
      } finally {
        setLoadingAi(false);
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [area, machines, workers]);

  return (
    <section id="configurator" className="py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-headline font-bold text-slate-900">Cost Configurator</h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">Calculate your safety grid investment with real-time hardware estimates.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 items-start max-w-6xl mx-auto">
          {/* Controls */}
          <div className="lg:col-span-2 space-y-12 bg-slate-50 border border-slate-200 p-10 lg:p-14 rounded-[2.5rem] shadow-sm">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <Label className="text-slate-900 text-lg font-bold">Total Work Area (m²)</Label>
                  <span className="text-2xl font-headline font-bold text-primary">{area} m²</span>
                </div>
                <Slider 
                  value={[area]} 
                  onValueChange={(v) => setArea(v[0])} 
                  max={10000} 
                  min={100} 
                  step={100}
                  className="py-4"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <Label className="text-slate-900 text-lg font-bold">Non-Native Machines</Label>
                  <Input 
                    type="number" 
                    value={machines} 
                    onChange={(e) => setMachines(parseInt(e.target.value) || 0)}
                    className="h-14 text-lg font-bold bg-white border-slate-200 rounded-2xl px-6"
                  />
                  <p className="text-xs text-slate-400">Machines requiring Mobile Adapter Nodes.</p>
                </div>

                <div className="space-y-4">
                  <Label className="text-slate-900 text-lg font-bold">Humans</Label>
                  <Input 
                    type="number" 
                    value={workers} 
                    onChange={(e) => setWorkers(parseInt(e.target.value) || 0)}
                    className="h-14 text-lg font-bold bg-white border-slate-200 rounded-2xl px-6"
                  />
                  <p className="text-xs text-slate-400">Total human workers requiring Smart Vests.</p>
                </div>
              </div>
            </div>

            <div className="pt-10 border-t border-slate-200 space-y-6">
              <div className="flex items-center gap-3 text-slate-900">
                <Cpu className="text-primary" size={24} />
                <h4 className="text-xl font-headline font-bold">AI Configuration Analysis</h4>
              </div>
              <div className="p-8 rounded-3xl bg-white border border-slate-200 text-sm leading-relaxed text-slate-500 min-h-[140px] relative shadow-inner">
                {loadingAi && (
                  <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center rounded-3xl">
                    <Loader2 className="animate-spin text-primary" />
                  </div>
                )}
                {aiInsight || "Analyzing spatial coverage and confidence factors..."}
              </div>
            </div>
          </div>

          {/* BOM Sidebar */}
          <div className="lg:col-span-1 bg-white border border-slate-200 rounded-[2.5rem] p-10 space-y-10 sticky top-28 shadow-xl shadow-slate-200/50">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-8">
              <Package className="text-primary" size={24} />
              <h3 className="text-xl font-headline font-bold text-slate-900 uppercase tracking-widest">Bill of Materials</h3>
            </div>

            <div className="space-y-5 text-sm">
              <div className="flex justify-between items-center text-slate-500">
                <span>SafeHive Control Hub</span>
                <span className="text-slate-900 font-bold">1 x $12,500</span>
              </div>
              <div className="flex justify-between items-center text-slate-500">
                <span>Perimeter Access Points</span>
                <span className="text-slate-900 font-bold">{apCount} x $2,200</span>
              </div>
              <div className="flex justify-between items-center text-slate-500">
                <span>Mobile Adapter Nodes</span>
                <span className="text-slate-900 font-bold">{nodeCount} x $1,500</span>
              </div>
              <div className="flex justify-between items-center text-slate-500">
                <span>Smart Safety Vests</span>
                <span className="text-slate-900 font-bold">{vestCount} x $450</span>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-100 space-y-2">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-[0.2em]">Total Estimated Hardware</div>
              <div className="text-4xl font-headline font-bold text-slate-900 tabular-nums">${totalCost.toLocaleString()}</div>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full h-16 bg-primary hover:bg-primary/90 text-white font-bold text-lg rounded-2xl shadow-lg shadow-primary/20">
                  Request Quote
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white border-slate-200 text-slate-900 rounded-[2rem]">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-headline font-bold">Request Final Quote</DialogTitle>
                  <DialogDescription className="text-slate-500">
                    Submit your project details for a certified BOM export and site plan.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Alex Rivera" className="rounded-xl border-slate-200" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Work Email</Label>
                    <Input id="email" type="email" placeholder="alex@spatial-automation.com" className="rounded-xl border-slate-200" />
                  </div>
                </div>
                <DialogFooter>
                  <Button className="w-full h-14 bg-primary text-white font-bold rounded-xl">
                    <Send className="mr-2 h-4 w-4" />
                    Send Quote Request
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  );
}
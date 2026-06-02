"use client"

import { useState, useMemo, useEffect } from 'react';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, Package, Cpu, Zap, Send, FileDown, Loader2 } from "lucide-react";
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
  const [area, setArea] = useState(500);
  const [machines, setMachines] = useState(2);
  const [workers, setWorkers] = useState(5);
  const [isExporting, setIsExporting] = useState(false);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  // Pricing constants
  const HUB_COST = 12500;
  const AP_COST = 2200;
  const NODE_COST = 1500;
  const VEST_COST = 450;

  // Calculation Logic
  const apCount = Math.ceil(area / 500);
  const nodeCount = machines;
  const vestCount = workers;
  const totalDataSources = apCount + nodeCount + vestCount;
  
  const totalCost = HUB_COST + (apCount * AP_COST) + (nodeCount * NODE_COST) + (vestCount * VEST_COST);

  // Debounced AI Insight Fetch
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
          totalDataSources,
          totalEstimatedHardwareCost: totalCost
        });
        setAiInsight(result.insights);
      } catch (err) {
        console.error("Failed to fetch AI insights", err);
      } finally {
        setLoadingAi(false);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [area, machines, workers]);

  return (
    <section id="configurator" className="py-24 bg-zinc-950">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-headline text-white">Grid Configurator</h2>
          <p className="text-muted-foreground text-lg">Calculate your factory hardware needs in seconds.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Controls */}
          <div className="lg:col-span-2 space-y-8 bg-zinc-900/50 border border-white/5 p-8 lg:p-12 rounded-[2.5rem] shadow-2xl">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <Label className="text-white text-lg font-medium">Workplace Area (sq meters)</Label>
                  <span className="text-2xl font-headline font-bold text-primary">{area} m²</span>
                </div>
                <Slider 
                  value={[area]} 
                  onValueChange={(v) => setArea(v[0])} 
                  max={5000} 
                  min={50} 
                  step={50}
                  className="py-4"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <Label className="text-white text-lg font-medium">Machines without native SAFE ROS</Label>
                  <div className="flex items-center gap-4">
                    <Button 
                      variant="outline" 
                      onClick={() => setMachines(Math.max(0, machines - 1))}
                      className="h-12 w-12 rounded-xl text-xl font-bold"
                    >-</Button>
                    <Input 
                      type="number" 
                      value={machines} 
                      onChange={(e) => setMachines(parseInt(e.target.value) || 0)}
                      className="text-center h-12 text-lg font-bold bg-zinc-800 border-white/10"
                    />
                    <Button 
                      variant="outline" 
                      onClick={() => setMachines(machines + 1)}
                      className="h-12 w-12 rounded-xl text-xl font-bold"
                    >+</Button>
                  </div>
                  <p className="text-xs text-muted-foreground">Robots with SAFE ROS don't need nodes.</p>
                </div>

                <div className="space-y-4">
                  <Label className="text-white text-lg font-medium">Workers without SAFE ROS wearables</Label>
                  <div className="flex items-center gap-4">
                    <Button 
                      variant="outline" 
                      onClick={() => setWorkers(Math.max(0, workers - 1))}
                      className="h-12 w-12 rounded-xl text-xl font-bold"
                    >-</Button>
                    <Input 
                      type="number" 
                      value={workers} 
                      onChange={(e) => setWorkers(parseInt(e.target.value) || 0)}
                      className="text-center h-12 text-lg font-bold bg-zinc-800 border-white/10"
                    />
                    <Button 
                      variant="outline" 
                      onClick={() => setWorkers(workers + 1)}
                      className="h-12 w-12 rounded-xl text-xl font-bold"
                    >+</Button>
                  </div>
                  <p className="text-xs text-muted-foreground">Every worker on the floor needs a vest.</p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/5 space-y-6">
              <div className="flex items-center gap-3 text-white">
                <Cpu className="text-primary" size={24} />
                <h4 className="text-xl font-headline font-semibold">AI Configuration Analysis</h4>
              </div>
              <div className="p-6 rounded-2xl bg-black/40 border border-white/5 text-sm leading-relaxed text-muted-foreground min-h-[100px] relative">
                {loadingAi && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center rounded-2xl">
                    <Loader2 className="animate-spin text-primary" />
                  </div>
                )}
                {aiInsight || "Calculating optimal Hive Confidence Factor..."}
              </div>
            </div>
          </div>

          {/* BOM Sidebar */}
          <div className="lg:col-span-1 bg-zinc-900 border border-primary/20 rounded-[2.5rem] p-8 space-y-8 sticky top-24 shadow-[0_0_50px_rgba(247,198,17,0.05)]">
            <div className="flex items-center gap-3 border-b border-white/5 pb-6">
              <Package className="text-primary" size={24} />
              <h3 className="text-xl font-headline font-bold text-white uppercase tracking-wider">Bill of Materials</h3>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-center text-muted-foreground">
                <span>SafeHive Control Hub</span>
                <span className="text-white font-medium">1 x $12,500</span>
              </div>
              <div className="flex justify-between items-center text-muted-foreground">
                <span>Perimeter Access Points</span>
                <span className="text-white font-medium">{apCount} x $2,200</span>
              </div>
              <div className="flex justify-between items-center text-muted-foreground">
                <span>Mobile Adapter Nodes</span>
                <span className="text-white font-medium">{nodeCount} x $1,500</span>
              </div>
              <div className="flex justify-between items-center text-muted-foreground">
                <span>Smart Safety Vests</span>
                <span className="text-white font-medium">{vestCount} x $450</span>
              </div>
            </div>

            <div className="pt-8 border-t border-white/5 space-y-4">
              <div className="text-xs uppercase font-bold text-muted-foreground tracking-widest">Total Estimated Hardware</div>
              <div className="text-4xl font-headline font-bold text-white tabular-nums">${totalCost.toLocaleString()}</div>
              <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 text-xs text-primary leading-tight font-medium">
                Your system utilizes {totalDataSources} data sources. This optimizes your Hive Confidence Factor (C) for high-speed operation.
              </div>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg gap-2 shadow-xl shadow-primary/10">
                  <FileDown size={20} />
                  Export Quote Request
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-zinc-900 border-white/10 text-white">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-headline">Request Final Quote</DialogTitle>
                  <DialogDescription className="text-muted-foreground">
                    Complete this form to receive your detailed BOM export and final project quote.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="John Doe" className="bg-zinc-800 border-white/10" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Work Email</Label>
                    <Input id="email" type="email" placeholder="john@factory.com" className="bg-zinc-800 border-white/10" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    <Input id="company" placeholder="Acme Industrial Corp" className="bg-zinc-800 border-white/10" />
                  </div>
                </div>
                <DialogFooter>
                  <Button className="w-full h-12 bg-primary text-primary-foreground font-bold">
                    <Send className="mr-2 h-4 w-4" />
                    Send Project Details
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

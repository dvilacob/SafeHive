
"use client"

import { XCircle, CheckCircle2 } from "lucide-react";

export function Comparison() {
  return (
    <section className="py-24 bg-white border-t border-slate-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-headline font-bold tracking-tight text-slate-900 leading-tight">Safety-Rated Precision <br />vs. Standard Wi-Fi Guesswork</h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Traditional factory safety is fragile. SafeHive introduces deterministic communication.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* The Old Way */}
          <div className="relative group overflow-hidden">
            <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative p-10 rounded-[2.5rem] border border-slate-100 bg-slate-50 flex flex-col h-full">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500">
                  <XCircle size={28} />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-400">The Problem</div>
                  <h3 className="text-xl font-headline font-bold text-slate-900">Non-Deterministic Mesh</h3>
                </div>
              </div>
              <p className="text-slate-500 leading-relaxed flex-1">
                Standard industrial Wi-Fi isn't safety-rated. If a signal drops for 10ms, your PLC triggers a blanket E-Stop. Rewiring safety zones takes weeks of programming and manual laser-scanner recalibration.
              </p>
              <div className="mt-8 pt-6 border-t border-slate-200 text-xs text-red-400 font-bold uppercase tracking-widest">
                "We lose 15% throughput on standard Wi-Fi lag."
              </div>
            </div>
          </div>

          {/* The SafeHive Way */}
          <div className="relative group overflow-hidden">
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative p-10 rounded-[2.5rem] border border-primary/20 bg-white flex flex-col h-full shadow-xl shadow-primary/5">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <CheckCircle2 size={28} />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-primary">The Solution</div>
                  <h3 className="text-xl font-headline font-bold text-slate-900">Safety-Rated Integration</h3>
                </div>
              </div>
              <p className="text-slate-500 leading-relaxed flex-1">
                Humanoids feature integrated safety-rated comms. Legacy machines use our safety-rated bridge nodes. Every signal is 100% deterministic, allowing for dynamic logic changes without factory downtime.
              </p>
              <div className="mt-8 pt-6 border-t border-slate-200 text-xs text-primary font-bold uppercase tracking-widest">
                "Instant, verified safety logic at the edge."
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

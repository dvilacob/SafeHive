"use client"

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-slate-100">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20">
            <ShieldCheck className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-headline font-bold tracking-tight text-slate-900 leading-none">SafeHive</span>
            <span className="text-[9px] font-bold text-primary uppercase tracking-widest mt-1">Spatial Logic Grid</span>
          </div>
        </Link>
        
        <div className="hidden lg:flex items-center gap-12">
          <Link href="#volumes" className="text-[11px] font-bold uppercase tracking-widest text-slate-500 hover:text-primary transition-colors">Volumes</Link>
          <Link href="#hive" className="text-[11px] font-bold uppercase tracking-widest text-slate-500 hover:text-primary transition-colors">The Engine</Link>
          <Link href="#configurator" className="text-[11px] font-bold uppercase tracking-widest text-slate-500 hover:text-primary transition-colors">Configurator</Link>
          <Link href="#deployment" className="text-[11px] font-bold uppercase tracking-widest text-slate-500 hover:text-primary transition-colors">Deployment</Link>
        </div>

        <Button 
          onClick={() => document.getElementById('configurator')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-primary hover:bg-primary/90 text-white font-bold rounded-none px-8 h-12 shadow-lg shadow-primary/20"
        >
          Request Spec
        </Button>
      </div>
    </nav>
  );
}

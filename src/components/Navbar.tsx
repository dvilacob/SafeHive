"use client"

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-lg border-b border-slate-100">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
          </div>
          <span className="text-xl font-headline font-bold tracking-tight text-slate-900">SafeHive</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-10">
          <Link href="#volumes" className="text-sm font-medium text-slate-500 hover:text-primary transition-colors">Safety Volumes</Link>
          <Link href="#hive" className="text-sm font-medium text-slate-500 hover:text-primary transition-colors">The Hive</Link>
          <Link href="#configurator" className="text-sm font-medium text-slate-500 hover:text-primary transition-colors">Configurator</Link>
          <Link href="#deployment" className="text-sm font-medium text-slate-500 hover:text-primary transition-colors">Deployment</Link>
        </div>

        <Button 
          onClick={() => document.getElementById('configurator')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-primary hover:bg-primary/90 text-white font-semibold rounded-full px-6 shadow-sm"
        >
          Configure Grid
        </Button>
      </div>
    </nav>
  );
}
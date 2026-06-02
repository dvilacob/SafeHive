"use client"

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <ShieldCheck className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
          <span className="text-2xl font-headline font-bold tracking-tight text-white">SafeHive</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link href="#tech" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">Technology</Link>
          <Link href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">How it Works</Link>
          <Link href="#configurator" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">Configurator</Link>
          <Link href="#deployment" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">Deployment</Link>
          <Link href="#contact" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">Contact Sales</Link>
        </div>

        <Button 
          onClick={() => document.getElementById('configurator')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6"
        >
          Configure Grid
        </Button>
      </div>
    </nav>
  );
}

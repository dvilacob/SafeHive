"use client"

import Link from 'next/link';
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useState, useEffect } from 'react';

const HiveIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 12L12 6L7 3L2 6L2 12L7 15Z" />
    <path d="M12 12L12 6L17 3L22 6L22 12L17 15Z" />
    <path d="M12 12L7 15L7 21L12 24L17 21L17 15Z" />
  </svg>
);

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const links = [
    { href: "#volumes", label: "The Engine" },
    { href: "#configurator", label: "Configurator" },
    { href: "#deployment", label: "Deployment" },
    { href: "#faq", label: "FAQs" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-slate-100">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20">
            <HiveIcon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-headline font-bold tracking-tight text-slate-900 leading-none">SafeHive</span>
            <span className="text-[9px] font-bold text-primary uppercase tracking-widest mt-1">Spatial awareness</span>
          </div>
        </Link>
        
        <div className="hidden lg:flex items-center gap-12">
          {links.map(link => (
            <Link key={link.href} href={link.href} className="text-[11px] font-bold uppercase tracking-widest text-slate-500 hover:text-primary transition-colors">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="lg:hidden">
          {mounted && (
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button className="p-2 text-slate-900 focus:outline-none">
                  <Menu size={24} />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] border-l-0 shadow-2xl">
                <SheetHeader className="mb-8 border-b border-slate-100 pb-4">
                  <SheetTitle className="text-left text-xs uppercase tracking-widest text-slate-400 font-mono">System Navigation</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-8">
                  {links.map(link => (
                    <Link 
                      key={link.href} 
                      href={link.href} 
                      onClick={() => setOpen(false)}
                      className="text-lg font-headline font-bold uppercase tracking-widest text-slate-900 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>

        <div className="hidden lg:block w-32" /> 
      </div>
    </nav>
  );
}
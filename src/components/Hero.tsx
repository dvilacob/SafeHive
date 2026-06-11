
"use client"

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function Hero() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-main');

  return (
    <section className="relative pt-24 pb-16 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Blueprint Grids */}
      <div className="absolute top-0 left-0 w-full h-full bg-blueprint -z-10 opacity-40" />
      <div className="absolute top-0 left-0 w-full h-full bg-blueprint-fine -z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background -z-10" />
      
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center space-y-12 lg:space-y-20">
          <div className="text-center space-y-6 lg:space-y-12 max-w-5xl">
            <h1 className="text-4xl sm:text-7xl lg:text-[8.5rem] font-headline font-bold tracking-tighter leading-[1.1] lg:leading-[0.85] text-slate-900">
              Dynamic <br />
              <span className="text-primary italic">spatial awareness.</span>
            </h1>

            <p className="text-base lg:text-2xl text-slate-500 font-medium leading-relaxed mx-auto max-w-2xl px-4 lg:px-0">
              SafeHive replaces physical fences with an invisible safety bubble. It slows humanoids and machines when someone is near, and speeds them up the moment they leave to keep your production moving.
            </p>
          </div>

          {heroImage && (
            <div className="w-full relative px-4 lg:px-0">
              <div className="relative aspect-[16/9] w-full max-w-6xl mx-auto rounded-sm overflow-hidden border border-slate-200 shadow-2xl group">
                <Image 
                  src={heroImage.imageUrl} 
                  alt={heroImage.description}
                  fill
                  priority
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  data-ai-hint={heroImage.imageHint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent pointer-events-none" />
                
                {/* Technical HUD Overlay Elements */}
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                  <div className="bg-primary/80 backdrop-blur-md px-3 py-1.5 rounded-sm border border-white/20 inline-flex">
                    <span className="text-[10px] font-mono font-bold text-white uppercase tracking-[0.2em]">Live Stream: Factory Node 04</span>
                  </div>
                </div>

                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                  <div className="space-y-2">
                    <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-sm border border-white/10">
                      <span className="text-[10px] font-mono font-bold text-white uppercase tracking-[0.2em]">Spatial Mesh Active</span>
                    </div>
                  </div>
                  <div className="hidden lg:flex flex-col items-end gap-1">
                    <span className="text-[10px] font-mono font-bold text-white/60 uppercase tracking-widest">Latency: 8.4ms</span>
                    <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest">System Ready</span>
                  </div>
                </div>
              </div>
              
              {/* Decorative side accent for the frame */}
              <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-32 border-l border-y border-primary/20 hidden xl:block" />
              <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-32 border-r border-y border-primary/20 hidden xl:block" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

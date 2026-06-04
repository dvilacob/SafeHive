"use client"

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Blueprint Grids */}
      <div className="absolute top-0 left-0 w-full h-full bg-blueprint -z-10 opacity-40" />
      <div className="absolute top-0 left-0 w-full h-full bg-blueprint-fine -z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background -z-10" />
      
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center space-y-8 lg:space-y-12">
          <h1 className="text-4xl sm:text-6xl lg:text-[8.5rem] font-headline font-bold tracking-tighter leading-[1] lg:leading-[0.85] text-slate-900">
            Spatial Safety for <br />
            <span className="text-primary italic">Spatial Agents.</span>
          </h1>

          <div className="max-w-3xl space-y-8 lg:space-y-10">
            <p className="text-lg lg:text-2xl text-slate-500 font-medium leading-relaxed">
              SafeHive replaces physical fences with an invisible safety bubble. It slows humanoids and machines when someone is near, and speeds them up the moment they leave to keep your production moving.
            </p>
            
            <p className="text-xs lg:text-sm text-slate-400 font-semibold leading-relaxed max-w-2xl mx-auto border-t border-slate-100 pt-8 lg:pt-10">
              Designed for modern ISO standards: Achieving deterministic safety via &lt; 10⁻⁷ probability thresholds over black-channel safety-rated networks—completely bypassing the need for traditional dual-channel hardware.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

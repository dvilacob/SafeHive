"use client"

export function Hero() {
  return (
    <section className="relative pt-24 pb-16 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Blueprint Grids */}
      <div className="absolute top-0 left-0 w-full h-full bg-blueprint -z-10 opacity-40" />
      <div className="absolute top-0 left-0 w-full h-full bg-blueprint-fine -z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background -z-10" />
      
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center space-y-6 lg:space-y-12">
          <h1 className="text-4xl sm:text-7xl lg:text-[8.5rem] font-headline font-bold tracking-tighter leading-[1.1] lg:leading-[0.85] text-slate-900">
            Dynamic <br />
            <span className="text-primary italic">spatial awareness.</span>
          </h1>

          <div className="max-w-3xl space-y-6 lg:space-y-10">
            <p className="text-base lg:text-2xl text-slate-500 font-medium leading-relaxed mx-auto max-w-2xl px-4 lg:px-0">
              SafeHive replaces physical fences with an invisible safety bubble. It slows humanoids and machines when someone is near, and speeds them up the moment they leave to keep your production moving.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

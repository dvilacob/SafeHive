import { XCircle, CheckCircle2 } from "lucide-react";

export function Comparison() {
  return (
    <section className="py-24 bg-zinc-950">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-headline tracking-tight text-white">Stop Stopping Everything.</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Traditional factory safety is an all-or-nothing switch. We built something smarter.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* The Old Way */}
          <div className="relative group overflow-hidden">
            <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative p-8 rounded-3xl border border-white/5 bg-zinc-900 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500">
                  <XCircle size={24} />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">The Problem</div>
                  <h3 className="text-xl font-headline font-bold text-white">Blanket E-Stops</h3>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed flex-1">
                If a robot loses its Wi-Fi signal for a split second, the whole line stops. If you want to change where a robot can go, you have to spend weeks rewriting code and paying for expensive safety inspections.
              </p>
              <div className="mt-8 pt-6 border-t border-white/5 text-sm text-red-400/80 italic">
                "We lose $25k every time a packet drops."
              </div>
            </div>
          </div>

          {/* The SafeHive Way */}
          <div className="relative group overflow-hidden">
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative p-8 rounded-3xl border border-primary/20 bg-zinc-900 flex flex-col h-full shadow-[0_0_40px_rgba(247,198,17,0.03)]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-primary">The Solution</div>
                  <h3 className="text-xl font-headline font-bold text-white">Localized Control</h3>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed flex-1">
                If a robot loses its signal, only that robot reacts. You can change how machines behave using a simple website dashboard. No one has to touch the factory's main safety computer (PLC).
              </p>
              <div className="mt-8 pt-6 border-t border-white/5 text-sm text-primary/80 italic">
                "Instant logic changes without downtime."
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

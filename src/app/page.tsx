import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { SafetyVolumes } from "@/components/SafetyVolumes";
import { BlindAssets } from "@/components/BlindAssets";
import { HiveInteractive } from "@/components/HiveInteractive";
import { Configurator } from "@/components/Configurator";
import { Deployment } from "@/components/Deployment";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <HiveInteractive />
      <SafetyVolumes />
      <BlindAssets />
      <Configurator />
      <Deployment />
      <FAQ />
      
      {/* ISO Compliance Quick-Reference (Secondary) */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <div className="p-8 rounded-2xl bg-white border border-slate-100 space-y-4 shadow-sm">
            <h4 className="font-headline font-bold text-slate-900 uppercase text-xs tracking-widest">ISO 10218-2 / ISO/TS 15066 Regulatory Framework</h4>
            <p className="font-mono text-[11px] bg-slate-50 p-4 border rounded text-slate-600">S = Σ [ (v_h * t_r) + (v_r * t_b) + (α_zone * C) ]</p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-4">
              {[
                { l: "v_h", d: "Human Speed" },
                { l: "v_r", d: "Asset Speed" },
                { l: "t_r/t_b", d: "Latency/Brake" },
                { l: "α_zone", d: "Sensitivity" },
                { l: "C", d: "Confidence" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <span className="font-bold text-primary text-[10px] font-mono">{item.l}</span>
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{item.d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

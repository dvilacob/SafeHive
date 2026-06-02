import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { SafetyVolumes } from "@/components/SafetyVolumes";
import { BlindAssets } from "@/components/BlindAssets";
import { HiveInteractive } from "@/components/HiveInteractive";
import { Configurator } from "@/components/Configurator";
import { Deployment } from "@/components/Deployment";
import { Footer } from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <SafetyVolumes />
      <BlindAssets />
      <HiveInteractive />
      <Configurator />
      <Deployment />
      
      {/* Technical Details & ISO Compliance Section */}
      <section className="py-24 bg-white border-t border-slate-50">
        <div className="container mx-auto px-6 max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="tech-specs" className="border-none">
              <AccordionTrigger className="text-slate-400 hover:text-primary text-xs font-bold uppercase tracking-[0.2em] transition-colors">
                Technical Details & ISO Compliance
              </AccordionTrigger>
              <AccordionContent className="pt-8 space-y-6 text-slate-500 leading-relaxed">
                <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 space-y-4">
                  <h4 className="font-headline font-bold text-slate-900 uppercase text-xs tracking-widest">ISO 10218-2 / ISO/TS 15066 Regulatory Framework</h4>
                  <p className="font-mono text-[11px] bg-white p-4 border rounded">S = (v_h + v_r) × t_r + d_stop + C</p>
                  <ul className="text-xs space-y-2 list-disc pl-4 font-medium">
                    <li>v_h: Maximum speed of the human operator (mm/s)</li>
                    <li>v_r: Maximum speed of the robot/humanoid (mm/s)</li>
                    <li>t_r: System response time including network latency (ms)</li>
                    <li>d_stop: Physical braking distance of the robot</li>
                    <li>C: Confidence Factor (Intrusion Distance) based on source redundancy</li>
                  </ul>
                </div>
                <p className="text-sm font-medium">
                  SafeHive is designed to achieve SIL 3 / PLd performance levels. Our implementation of the Black-Channel safety protocol ensures a Probability of Failure per Hour (PFH) of &lt; 10⁻⁷, meeting the most stringent industrial safety requirements for collaborative work environments.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <Footer />
    </main>
  );
}

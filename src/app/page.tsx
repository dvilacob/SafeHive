import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { SafetyVolumes } from "@/components/SafetyVolumes";
import { HiveInteractive } from "@/components/HiveInteractive";
import { Configurator } from "@/components/Configurator";
import { Deployment } from "@/components/Deployment";
import { Footer } from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <SafetyVolumes />
      <HiveInteractive />
      <Configurator />
      <Deployment />
      
      {/* Technical Details Section */}
      <section className="py-24 bg-white border-t border-slate-50">
        <div className="container mx-auto px-6 max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="tech-specs" className="border-none">
              <AccordionTrigger className="text-slate-400 hover:text-primary text-sm font-bold uppercase tracking-[0.2em] transition-colors">
                View Technical Details & Regulatory Formulas
              </AccordionTrigger>
              <AccordionContent className="pt-8 space-y-6 text-slate-500 leading-relaxed">
                <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 space-y-4">
                  <h4 className="font-headline font-bold text-slate-900">Safety Buffer Formula (S)</h4>
                  <p className="font-mono text-xs">S = (v × t_r) + d_stop + C</p>
                  <ul className="text-xs space-y-2 list-disc pl-4">
                    <li>v: Maximum velocity of the asset (mm/s)</li>
                    <li>t_r: System response time including network latency (ms)</li>
                    <li>d_stop: Physical braking distance at velocity v</li>
                    <li>C: Confidence Factor based on reporting source redundancy</li>
                  </ul>
                </div>
                <p className="text-sm">
                  SafeHive is fully compliant with ISO/TS 15066 and RIA R15.06 standards for collaborative robotics. Our system utilizes a deterministic mesh network with &lt;20ms end-to-end latency for all safety-critical signals.
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
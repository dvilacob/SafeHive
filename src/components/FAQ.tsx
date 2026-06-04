"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

const faqs = [
  {
    tag: "SSM CALC",
    question: "How exactly does the real-time safety bubble calculate its physical size?",
    answer: "The system generates a 3D Safety Volume by projecting a dynamic expansion buffer (S) around the physical morphology of an asset.\n\nFirst, the engine calculates the separation distance: S = Σ [ (Vh * Tr) + (Vr * Tb) + (a_zone * C) ], accounting for human/asset speeds, system latency, and tracking confidence (C).\n\nSecond, it applies this distance as a dynamic 3D envelope over the asset's specific shape. As confidence (C) increases, the buffer shrinks, allowing for maximum throughput while maintaining ISO-compliant protection."
  },
  {
    tag: "DETERMINISM",
    question: "What happens to the safety bubble and the asset if a wireless network packet drops?",
    answer: "When a packet drops or visibility decreases, system certainty plummets. To maintain strict ISO compliance without abruptly shutting down production, SafeHive triggers an autonomous Dual-Action Fallback: 1. The Confidence Buffer (C) instantly increases, expanding the safety bubble into a wider, more cautious footprint to protect the human's uncertain position. 2. Simultaneously, the asset's velocity (Vr) throttles down to a regulated safe collaborative crawl (<250mm/s) until the connection re-establishes and the bubble can snap tight again."
  },
  {
    tag: "FAIL-SAFE",
    question: "How does the system guarantee a safe state if a total network drop or critical perception failure occurs?",
    answer: "No, because safety happens right at the machine level. The system uses a built-in hardware fail-safe that treats the wireless network as an unreliable \"Black Channel.\"\n\nIf the wireless signal drops for even 100 milliseconds, the onboard module instantly drops its safety relays. This cuts power and locks the mechanical brakes directly on the machine—completely independent of your main network or plant infrastructure. If communication fails, the asset instantly stops itself in its safest state."
  },
  {
    tag: "INTEGRATION",
    question: "Does SafeHive need the plant PLC to be modified?",
    answer: "No. SafeHive operates as a 100% independent, decentralized safety mesh. The safety loop closes entirely at the edge module level mounted directly on each mobile asset. You can deploy SafeHive as a modular overlay without touching, rewiring, or reprogramming a single line of the factory's legacy central safety PLC code."
  },
  {
    tag: "SCALABILITY",
    question: "How can an engineer expand system confidence adding sources ?",
    answer: "SafeHive is completely sensor-agnostic. You can connect any external source of truth—from traditional SICK laser scanners and light curtains to new AI computer vision algorithms. You simply link your source to a ROS/ROS2 topic; our bridge nodes ingest the data, validate it through the black-channel protocol, and integrate it into the Hive’s spatial logic grid. More sources = higher triangulation certainty = smaller safety bubbles."
  },
  {
    tag: "ROS/OPS",
    question: "Can the SafeHive control hub send active operational commands back to the humanoids?",
    answer: "Yes. SafeHive features a dedicated product section specifically designed to define and command humanoid behaviors. While local safety loops remain strictly autonomous at the edge, SafeHive exposes standard, asynchronous ROS Action Topics."
  }
];

export function FAQ() {
  return (
    <section id="faq" className="py-32 bg-white border-t border-slate-100">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="space-y-4 mb-16">
          <span className="tech-label text-primary">Technical Documentation</span>
          <h2 className="text-4xl font-headline font-bold text-slate-900">FAQs</h2>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border border-slate-100 px-6 rounded-sm bg-slate-50/50 hover:bg-white hover:shadow-lg hover:shadow-primary/5 transition-all group"
            >
              <AccordionTrigger className="hover:no-underline py-6">
                <div className="flex flex-col items-start gap-3 text-left">
                  <Badge variant="outline" className="font-mono text-[9px] tracking-widest text-primary border-primary/20 bg-primary/5 px-2 py-0">
                    {faq.tag}
                  </Badge>
                  <span className="text-lg font-headline font-bold text-slate-900 group-hover:text-primary transition-colors">
                    {faq.question}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-8 pt-2">
                <div className="pl-0 text-slate-500 leading-relaxed text-sm font-medium border-l-2 border-primary/20 pl-6 whitespace-pre-line">
                  {faq.answer}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
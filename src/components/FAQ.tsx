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
    tag: "Integration",
    question: "How do we integrate existing safety sensors into the SafeHive system?",
    answer: "You can connect your existing safety sensors to the SafeHive Control Hub using an I/O module compatible with your industrial network. Once connected, the SafeHive Configurator maps these simple \"on/off\" inputs into specific spatial safety zones within your facility."
  },
  {
    tag: "Integration",
    question: "Does SafeHive replace the function of safety sensors?",
    answer: "No, SafeHive enhances them. While standard safety sensors simply trigger an immediate \"stop\" signal, SafeHive takes those inputs and applies intelligent, adaptive safety logic. This transforms basic hardware into part of a larger, certified system that can prioritize, slow down, or stop equipment based on real-time spatial calculations."
  },
  {
    tag: "Integration",
    question: "Why use safety sensors with SafeHive instead of just using them alone?",
    answer: "Using safety sensors alone often leads to productivity bottlenecks because they only perform simple, binary stops. By integrating them into the SafeHive network, you gain the ability to manage safety zones dynamically, ensuring that the plant keeps running smoothly while maintaining full compliance with safety standards like ISO 10218-2."
  },
  {
    tag: "Integration",
    question: "What physical components are included with the SafeHive Hub?",
    answer: "The SafeHive Hub is delivered as a pre-wired, drop-in industrial control panel. Inside the box, you receive:\n\n• Spatial Compute Core: An industrial PC with hardware acceleration.\n• Hardware Safety Controller: Dedicated, safety-certified PLC.\n• Safety Input/Output (I/O) Boards: High-speed, dual-channel interface cards.\n• Secure Remote Gateway: IT-compliant router for isolated local safety network.\n• Managed Network Switch: Rugged, high-bandwidth switch.\n• Power Delivery System: Stabilized 24V DC power supply with UPS."
  },
  {
    tag: "Integration",
    question: "Does SafeHive need the plant PLC to be modified?",
    answer: "No. SafeHive operates as a 100% independent, decentralized safety mesh. The safety loop closes entirely at the edge module level mounted directly on each mobile asset. You can deploy SafeHive as a modular overlay without touching a single line of legacy PLC code."
  },
  {
    tag: "ROS",
    question: "How does SafeHive integrate with my existing ROS network?",
    answer: "SafeHive acts as a high-speed, safety-critical data broker. If your humanoid fleet runs ROS/ROS2, integration simply enhances it via deterministic, low-latency publish-subscribe models for telemetry and velocity control."
  },
  {
    tag: "ISO",
    question: "How exactly does the real-time safety bubble calculate its physical size?",
    answer: "The system generates a 3D Safety Volume using the formula: S = Σ [ (Vh * Tr) + (Vr * Tb) + (a_zone * C) ]. This accounts for human/asset speeds, system latency, and tracking confidence (C). As confidence increases, the buffer shrinks, maximizing throughput."
  }
];

export function FAQ() {
  return (
    <section id="faq" className="py-20 lg:py-32 bg-white border-t border-slate-100">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="space-y-4 mb-12 lg:mb-16 text-center lg:text-left">
          <h2 className="text-3xl lg:text-4xl font-headline font-bold text-slate-900 tracking-tight">FAQ</h2>
          <p className="text-slate-500 text-sm lg:text-base">Deep dive into the SafeHive spatial safety architecture.</p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border border-slate-100 px-4 lg:px-6 rounded-sm bg-slate-50/50 hover:bg-white hover:shadow-lg hover:shadow-primary/5 transition-all group"
            >
              <AccordionTrigger className="hover:no-underline py-5 lg:py-6">
                <div className="flex flex-col items-start gap-2 lg:gap-3 text-left">
                  <Badge variant="outline" className="text-[8px] lg:text-[9px] uppercase tracking-widest font-bold border-primary/20 text-primary px-2 py-0">
                    {faq.tag}
                  </Badge>
                  <span className="text-base lg:text-lg font-headline font-bold text-slate-900 group-hover:text-primary transition-colors">
                    {faq.question}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-6 lg:pb-8 pt-2">
                <div className="pl-4 lg:pl-6 text-slate-500 leading-relaxed text-sm font-medium border-l-2 border-primary/20 whitespace-pre-line">
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

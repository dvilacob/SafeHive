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
    question: "What physical components are included with the SafeHive Hub?",
    answer: "The SafeHive Hub is delivered as a pre-wired, drop-in industrial control panel. Inside the box, you receive:\n\n• Spatial Compute Core: An industrial, fanless PC with hardware acceleration to process heavy 3D spatial math and AI vision models.\n\n• Hardware Safety Controller: A dedicated, safety-certified PLC that manages deterministic, fail-safe network handshakes over the Black Channel.\n\n• Safety Input/Output (I/O) Boards: High-speed, dual-channel interface cards that translate physical sensor states (like a tripped light curtain) into safety-coded data packets for the Hive.\n\n• Secure Remote Gateway: A dedicated, IT-compliant industrial router that allows remote access to the factory infrastructure for diagnostics, monitoring, and updates without compromising the isolated local safety network.\n\n• Managed Network Switch: A rugged, high-bandwidth industrial switch to aggregate incoming safety sensors, plant networks, and wireless access points.\n\n• Safety Signal Interface: Dedicated modules to broadcast high-speed safety-critical commands across the decentralized mesh.\n\n• Power Delivery System: A stabilized 24V DC power supply paired with a mini-UPS to prevent accidental emergency stops during temporary voltage drops.\n\n• Industrial I/O Terminals: Safety-rated DIN-rail terminal blocks for clean, organized hard-wiring of legacy plant safety sensors."
  },
  {
    tag: "Integration",
    question: "Does SafeHive need the plant PLC to be modified?",
    answer: "No. SafeHive operates as a 100% independent, decentralized safety mesh. The safety loop closes entirely at the edge module level mounted directly on each mobile asset. You can deploy SafeHive as a modular overlay without touching, rewiring, or reprogramming a single line of the factory's legacy central safety PLC code."
  },
  {
    tag: "Integration",
    question: "How can an engineer expand system confidence adding sources?",
    answer: "SafeHive is sensor-agnostic. You can connect any external source of truth—from traditional SICK laser scanners to AI vision algorithms. You simply link your source to a ROS/ROS2 topic; our bridge nodes ingest the data and integrate it into the Hive’s spatial logic grid. More sources = higher triangulation certainty = smaller safety bubbles."
  },
  {
    tag: "ROS",
    question: "How does SafeHive integrate with my existing ROS network?",
    answer: "SafeHive operates seamlessly with your existing robot ecosystem by acting as a high-speed, safety-critical data broker. If your humanoid fleet or AMRs already run Robot Operating System (ROS/ROS2), integration doesn’t require stripping out your existing stack—it simply enhances it. The architecture relies on a deterministic, low-latency publish-subscribe model utilizing three primary ROS topics."
  },
  {
    tag: "ROS",
    question: "What data does the Position Topic handle, and how does SafeHive use it?",
    answer: "The Position Topic is a high-frequency input stream sent from your robots to the SafeHive Control Hub. Your agents continuously publish their high-frequency telemetry, exact spatial coordinates, and localized state data over this channel. Instead of forcing your robots to calculate where everyone else is, they simply report where they are. The Control Hub aggregates these incoming positional streams in real time, instantly mapping the entire facility's moving canvas to maintain absolute spatial awareness."
  },
  {
    tag: "ROS",
    question: "How does the Object Tracking topic use \"object redundancy\" to prevent false alarms?",
    answer: "The Object Tracking topic is an input stream that allows humanoids to broadcast their current velocity, onboard vision-detected obstacles, and system health flags. By combining and cross-referencing this velocity and positional data with visual reports from multiple robots and plant sensors simultaneously, the Hub creates object redundancy. If multiple agents report consistent position and velocity data for a shared observation, the Hub instantly verifies if the entity is a known asset—such as a registered coworker or another machine—or an actual obstacle. This prevents the system from triggering unnecessary emergency stops for \"unidentified objects,\" keeping your production line moving smoothly."
  },
  {
    tag: "ROS",
    question: "How does the Command Topic safely control individual robots without lagging the network?",
    answer: "The Command Topic is the safety-rated output stream sent from the SafeHive Hub back to your fleet. Based on the global spatial math and verified data processed by the Hub, SafeHive publishes speed vectors and dynamic zone commands over this channel. To keep the network lightweight and deterministic, these payloads are highly targeted. Instead of broadcasting blanket commands to the whole factory, the Hub explicitly sends instructions only to the specific registered devices currently inside or approaching an affected safety zone. This allows your machines to handle their local navigation independently while receiving an instant, global safety overlay."
  },
  {
    tag: "ISO",
    question: "How does Adaptive Safety Shielding support my safety goals?",
    answer: "SafeHive is architected to align with ISO/TS 15066 guidelines, which define the limits for safe interaction between robots and humans. By applying these force and pressure limits to your robot's movements, the system provides a technical foundation that helps you demonstrate that your workspace is designed to prioritize human safety."
  },
  {
    tag: "ISO",
    question: "How does this feature help me align with the new 2025 ISO requirements?",
    answer: "The updated ISO 10218-1/2:2025 standard introduces more flexibility for safety designs that can prove high reliability. SafeHive provides the software-based safety logic and diagnostic coverage intended to help your systems meet the required performance levels (PLd), allowing you to move toward more flexible, high-reliability architectures while maintaining alignment with modern safety standards."
  },
  {
    tag: "ISO",
    question: "What happens if the wireless network connection is lost?",
    answer: "The system employs a local, hardware-based \"watchdog\" mechanism. The robot continuously expects a \"heartbeat\" signal from the controller; if the connection is interrupted for more than a defined threshold, the onboard safety module—independent of the network—immediately de-energizes the safety relays to lock the brakes and stop the machine. This ensures the robot reverts to a safe state without requiring a successful command transmission."
  },
  {
    tag: "ISO",
    question: "How exactly does the real-time safety bubble calculate its physical size?",
    answer: "The system generates a 3D Safety Volume by projecting a dynamic expansion buffer (S) around the physical morphology of an asset.\n\nFirst, the engine calculates the separation distance: S = Σ [ (Vh * Tr) + (Vr * Tb) + (a_zone * C) ], accounting for human/asset speeds, system latency, and tracking confidence (C).\n\nSecond, it applies this distance as a dynamic 3D envelope over the asset's specific shape. As confidence (C) increases, the buffer shrinks, allowing for maximum throughput while maintaining ISO-compliant protection."
  }
];

export function FAQ() {
  return (
    <section id="faq" className="py-20 lg:py-32 bg-white border-t border-slate-100">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="space-y-4 mb-12 lg:mb-16 text-center lg:text-left">
          <h2 className="text-3xl lg:text-4xl font-headline font-bold text-slate-900 tracking-tight">Technical Documentation</h2>
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

"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What physical components are included with the SafeHive Hub?",
    answer: "The SafeHive Hub is delivered as a pre-wired, drop-in industrial control panel. Inside the box, you receive:\n\n• Spatial Compute Core: An industrial, fanless PC with hardware acceleration to process heavy 3D spatial math and AI vision models.\n\n• Hardware Safety Controller: A dedicated, safety-certified PLC that manages deterministic, fail-safe network handshakes over the Black Channel.\n\n• Safety Input/Output (I/O) Boards: High-speed, dual-channel interface cards that translate physical sensor states (like a tripped light curtain) into safety-coded data packets for the Hive.\n\n• Secure Remote Gateway: A dedicated, IT-compliant industrial router that allows remote access to the factory infrastructure for diagnostics, monitoring, and updates without compromising the isolated local safety network.\n\n• Managed Network Switch: A rugged, high-bandwidth industrial switch to aggregate incoming safety sensors, plant networks, and wireless access points.\n\n• Safety Signal Interface: Dedicated modules to broadcast high-speed safety-critical commands across the decentralized mesh.\n\n• Power Delivery System: A stabilized 24V DC power supply paired with a mini-UPS to prevent accidental emergency stops during temporary voltage drops.\n\n• Industrial I/O Terminals: Safety-rated DIN-rail terminal blocks for clean, organized hard-wiring of legacy plant safety sensors."
  },
  {
    question: "How does SafeHive help me certify a specific Safety Category or Performance Level (PL) according to ISO 13849-1?",
    answer: "As a component supplier, SafeHive cannot uniquely certify your final end-to-end factory system category, as ultimate compliance depends entirely on your total plant integration and deployment environment. However, we provide all the specialized architectural tools required for your engineering team to successfully achieve a Category 3/4, PL d/e rating.\n\nOur compliance enablement architecture relies on two core pillars:\n\n1. ROS Communication over a Certified Black Channel (IEC 61784-3):\nSafeHive does not require you to trust your standard wireless network infrastructure for primary safety. Instead, we implement a Black Channel protocol layer on top of standard ROS/ROS2 communication. This protocol encapsulates safety-critical telemetry with deterministic watchdogs, cyclic redundancy checks (CRCs), and unique packet identifiers. The local hardware edge module enforces a strict timeout window (e.g., ≤ 40 ms). If a packet is dropped, corrupted, or delayed, the local hardware immediately detects the heartbeat loss, bypasses the software completely, and drops its dual-channel safety relays to trigger a safe state.\n\n2. The Shared Distributed Perception Topic:\nWithin this protected Black Channel, SafeHive exposes a dedicated safety-critical ROS topic specifically designed for distributed object detection data. This allows you to combine and cross-check redundant information from entirely disparate sensor systems to meet the \"Diagnostic Coverage\" and \"Common Cause Failure\" requirements of ISO 13849-1. Engineers can feed data into this single topic from multiple sources simultaneously:\n- Fleet Telemetry: Dynamic bounding boxes and spatial mapping shared from neighboring Humanoids.\n- Fixed Infrastructure: Spatial tracking data streamed from a facility-wide CCTV network running localized perception and vision algorithms.\n- Legacy Safety Hardware: Hard-wired inputs from traditional safety sensors, such as classical SICK laser scanners and plant PLC inputs.\n\nThe Integration Bottom Line: SafeHive delivers the secure, deterministic data pipeline (the Black Channel) and the open integration framework (the Distributed Perception Topic). This gives your team the exact mathematical and architectural foundation needed to satisfy safety auditors and achieve your target ISO compliance layout."
  },
  {
    question: "How exactly does the real-time safety bubble calculate its physical size?",
    answer: "The system generates a 3D Safety Volume by projecting a dynamic expansion buffer (S) around the physical morphology of an asset.\n\nFirst, the engine calculates the separation distance: S = Σ [ (Vh * Tr) + (Vr * Tb) + (a_zone * C) ], accounting for human/asset speeds, system latency, and tracking confidence (C).\n\nSecond, it applies this distance as a dynamic 3D envelope over the asset's specific shape. As confidence (C) increases, the buffer shrinks, allowing for maximum throughput while maintaining ISO-compliant protection."
  },
  {
    question: "What happens to the safety bubble and the asset if a wireless network packet drops?",
    answer: "When a packet drops or visibility decreases, system certainty plummets. To maintain strict ISO compliance without abruptly shutting down production, SafeHive triggers an autonomous Dual-Action Fallback: 1. The Confidence Buffer (C) instantly increases, expanding the safety bubble into a wider, more cautious footprint to protect the human's uncertain position. 2. Simultaneously, the asset's velocity (Vr) throttles down to a regulated safe collaborative crawl (<250mm/s) until the connection re-establishes and the bubble can snap tight again."
  },
  {
    question: "How does the system guarantee a safe state if a total network drop or critical perception failure occurs?",
    answer: "No, because safety happens right at the machine level. The system uses a built-in hardware fail-safe that treats the wireless network as an unreliable \"Black Channel.\"\n\nIf the wireless signal drops for even 100 milliseconds, the onboard module instantly drops its safety relays. This cuts power and locks the mechanical brakes directly on the machine—completely independent of your main network or plant infrastructure. If communication fails, the asset instantly stops itself in its safest state."
  },
  {
    question: "Does SafeHive need the plant PLC to be modified?",
    answer: "No. SafeHive operates as a 100% independent, decentralized safety mesh. The safety loop closes entirely at the edge module level mounted directly on each mobile asset. You can deploy SafeHive as a modular overlay without touching, rewiring, or reprogramming a single line of the factory's legacy central safety PLC code."
  },
  {
    question: "How can an engineer expand system confidence adding sources ?",
    answer: "SafeHive is sensor-agnostic. You can connect any external source of truth—from traditional SICK laser scanners to AI vision algorithms. You simply link your source to a ROS/ROS2 topic; our bridge nodes ingest the data and integrate it into the Hive’s spatial logic grid. More sources = higher triangulation certainty = smaller safety bubbles."
  },
  {
    question: "Can the SafeHive control hub send active operational commands back to the humanoids?",
    answer: "Yes. SafeHive features a dedicated section specifically designed to command humanoid behaviors. While local safety loops remain strictly autonomous at the edge, SafeHive exposes standard, asynchronous ROS Action Topics."
  }
];

export function FAQ() {
  return (
    <section id="faq" className="py-32 bg-white border-t border-slate-100">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="space-y-4 mb-16">
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
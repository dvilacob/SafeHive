import { Terminal, Mountain, Users, Link as LinkIcon, Lock } from "lucide-react";

export function Deployment() {
  const steps = [
    {
      icon: <Terminal className="w-6 h-6" />,
      title: "Mount & Power the Hub",
      body: "Screw the main control enclosure to the wall and plug it into factory power. The legacy safety PLC is left completely untouched."
    },
    {
      icon: <Mountain className="w-6 h-6" />,
      title: "Hang Ceiling Access Points",
      body: "Mount the wireless APs to the ceiling girders and run a single PoE cable from each one back to the main Hub."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Equip Assets and Workers",
      body: "Put the smart vests on workers and plug the adapter nodes into legacy machines. Smart robots skip this and connect automatically."
    },
    {
      icon: <LinkIcon className="w-6 h-6" />,
      title: "Link with the SafeHive Tool",
      body: "Open the SafeHive browser tool on a tablet or laptop to instantly pair all active devices over the air."
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Set the Rules and Lock",
      body: "Assign safety profiles to your assets, run the heartbeat check, and lock the configuration. You are now live."
    }
  ];

  return (
    <section id="deployment" className="py-24 bg-zinc-950">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-headline text-white">Five Steps to Absolute Safety</h2>
          <p className="text-muted-foreground text-lg">No weeks of coding. No factory rewiring. Just simple setup.</p>
        </div>

        <div className="relative">
          {/* Progress Line */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-white/5 -translate-y-1/2 hidden lg:block" />
          
          <div className="grid lg:grid-cols-5 gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="relative group">
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center text-primary group-hover:border-primary/50 transition-colors shadow-xl z-10 relative overflow-hidden">
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {step.icon}
                  </div>
                  <div className="space-y-3 px-4 lg:px-0">
                    <div className="text-primary font-bold text-xs uppercase tracking-widest">Step 0{idx + 1}</div>
                    <h3 className="text-lg font-headline font-bold text-white">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

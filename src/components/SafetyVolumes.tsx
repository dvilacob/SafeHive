'use client';

import { Ruler, Gauge, Activity, ShieldAlert, Ghost, Zap } from 'lucide-react';

export function SafetyVolumes() {
  const features = [
    {
      icon: <Ruler className="w-8 h-8" />,
      title: '1. Proximity',
      text: 'The closer an object gets, the more the system restricts movement. Safety volumes dynamically scale based on real-time distance—expanding into a larger protective buffer as objects approach each other.',
    },
    {
      icon: <Gauge className="w-8 h-8" />,
      title: '2. Speed',
      text: 'Safety volume is a function of velocity. The faster a machine moves, the larger the protective bubble required to guarantee a safe stop. This ensures a safe separation distance for all parties involved.',
    },
    {
      icon: <ShieldAlert className="w-8 h-8" />,
      title: '3. Body Volumes Sensitivity',
      text: 'Safety volumes are tailored to the specific morphology and mechanical weakness of each asset. For humans, the system automatically enforces ISO/TS 15066 thresholds, ensuring protection is highest where the body is most vulnerable',
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: '4. Hive Redundancy',
      text: 'The more the system sees, the closer the robot can safely get. Combining the humanoid’s vision with your other data sources creates an accurate map. More sources = higher confidence = smaller safety volumes that keep your workflow moving.',
    },
    {
      icon: <Ghost className="w-8 h-8" />,
      title: '5. Ghost Assets',
      text: "Track moving machines that aren't broadcasting data. By processing humanoid hive vision, the system identifies untracked moving machines and projects dynamic safety volumes over them. More sources = more data = better ghost asset identification",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: '6. Real-Time Safety Dynamics',
      text: 'Safety volumes that adapt to movement. Once the system identifies assets and sets up safety zones, it assigns a specific behavior profile to each volume. As objects move or conditions change, the system sends real-time commands to the equipment to throttle speeds or adjust safety parameters dynamically. This ensures the workspace stays safe without needing constant manual resets.',
    },
  ];

  return (
    <section id="volumes" className="py-40 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mb-24">
          <span className="tech-label text-primary">Spatial Logic</span>
          <h2 className="text-5xl font-headline font-bold leading-tight mt-4">
            Real-Time Safety Dynamic Volumes.
          </h2>
          <p className="text-slate-500 text-lg mt-6">
            The spatial grid calculates safety shells for every asset every 10ms, ensuring deterministic
            protection without the constraints of physical barriers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-slate-50 p-10 space-y-8 group transition-all border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1"
            >
              <div className="text-primary p-4 bg-primary/5 inline-block rounded-sm transition-transform group-hover:scale-110 shadow-sm border border-primary/10">
                {feature.icon}
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-headline font-bold">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed text-xs font-medium">{feature.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

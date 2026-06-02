import { ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-8 h-8 text-primary" />
              <span className="text-2xl font-headline font-bold tracking-tight text-white">SafeHive</span>
            </div>
            <p className="text-muted-foreground max-w-sm leading-relaxed">
              Industrial-grade deterministic safety for the modern factory floor. 
              Built for speed, certified for humans.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest border border-white/10 rounded-full text-muted-foreground">ISO/TS 15066 Compliant</span>
              <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest border border-white/10 rounded-full text-muted-foreground">CE Mark Ready</span>
              <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest border border-white/10 rounded-full text-muted-foreground">RIA Safety Standard Compatible</span>
            </div>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-white font-headline font-bold uppercase tracking-widest text-xs">Technology</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Safety Volumes</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Mesh Positioning</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">SAFE ROS Integration</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Hardware Specs</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-white font-headline font-bold uppercase tracking-widest text-xs">Company</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact Sales</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Support</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground font-medium">
          <p>© 2024 SafeHive Technologies Inc. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Twitter / X</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

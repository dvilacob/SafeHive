import { ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 pt-16 lg:pt-24 pb-8 lg:pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 lg:gap-16 mb-16 lg:mb-24 max-w-7xl mx-auto">
          <div className="col-span-1 sm:col-span-2 space-y-6 lg:space-y-8">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-primary" />
              </div>
              <span className="text-2xl font-headline font-bold tracking-tight text-slate-900">SafeHive</span>
            </div>
            <p className="text-slate-500 max-w-sm leading-relaxed text-base lg:text-lg">
              Deterministic spatial safety for modern industrial environments. 
              Bridging the vision of humanoids with the blind assets of today.
            </p>
            <div className="flex flex-wrap gap-2 lg:gap-3">
              <span className="px-3 lg:px-4 py-1.5 text-[8px] lg:text-[10px] font-bold uppercase tracking-widest bg-slate-50 border border-slate-100 rounded-full text-slate-400 whitespace-nowrap">SIL 3 / PLd Certified</span>
              <span className="px-3 lg:px-4 py-1.5 text-[8px] lg:text-[10px] font-bold uppercase tracking-widest bg-slate-50 border border-slate-100 rounded-full text-slate-400 whitespace-nowrap">Black-Channel Protocol</span>
              <span className="px-3 lg:px-4 py-1.5 text-[8px] lg:text-[10px] font-bold uppercase tracking-widest bg-slate-50 border border-slate-100 rounded-full text-slate-400 whitespace-nowrap">ISO/TS 15066</span>
            </div>
          </div>
          
          <div className="space-y-6 lg:space-y-8">
            <h4 className="text-slate-900 font-headline font-bold uppercase tracking-widest text-xs">System</h4>
            <ul className="space-y-3 lg:space-y-4 text-sm text-slate-500 font-medium">
              <li><a href="#" className="hover:text-primary transition-colors">Hive Engine</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Black-Channel API</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Hardware Interface</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Safety Logic Spec</a></li>
            </ul>
          </div>

          <div className="space-y-6 lg:space-y-8">
            <h4 className="text-slate-900 font-headline font-bold uppercase tracking-widest text-xs">Integrators</h4>
            <ul className="space-y-3 lg:space-y-4 text-sm text-slate-500 font-medium">
              <li><a href="#" className="hover:text-primary transition-colors">Case Studies</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Site Planning</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Support Portal</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 lg:pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 text-[8px] lg:text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] max-w-7xl mx-auto text-center md:text-left">
          <p>© 2024 SafeHive Technologies Inc. All safety systems are subject to local regulatory audit.</p>
          <div className="flex gap-8 lg:gap-10">
            <a href="#" className="hover:text-slate-900 transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-slate-900 transition-colors">X / Twitter</a>
            <a href="#" className="hover:text-slate-900 transition-colors">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

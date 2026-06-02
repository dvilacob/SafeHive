import { ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-2 space-y-8">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-primary" />
              </div>
              <span className="text-2xl font-headline font-bold tracking-tight text-slate-900">SafeHive</span>
            </div>
            <p className="text-slate-500 max-w-sm leading-relaxed text-lg">
              Industrial-grade spatial safety for the modern collaborative factory. 
              Deterministic awareness, delivered at the edge.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-slate-50 border border-slate-100 rounded-full text-slate-400">ISO/TS 15066</span>
              <span className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-slate-50 border border-slate-100 rounded-full text-slate-400">CE Certified</span>
              <span className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-slate-50 border border-slate-100 rounded-full text-slate-400">RIA R15.06</span>
            </div>
          </div>
          
          <div className="space-y-8">
            <h4 className="text-slate-900 font-headline font-bold uppercase tracking-widest text-xs">Technology</h4>
            <ul className="space-y-4 text-sm text-slate-500 font-medium">
              <li><a href="#" className="hover:text-primary transition-colors">Adaptive Shells</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Mesh Positioning</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">SafeFlow API</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Hardware Specs</a></li>
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="text-slate-900 font-headline font-bold uppercase tracking-widest text-xs">Company</h4>
            <ul className="space-y-4 text-sm text-slate-500 font-medium">
              <li><a href="#" className="hover:text-primary transition-colors">Team</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Case Studies</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-slate-400 font-bold uppercase tracking-widest">
          <p>© 2024 SafeHive Technologies Inc.</p>
          <div className="flex gap-10">
            <a href="#" className="hover:text-slate-900 transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-slate-900 transition-colors">X / Twitter</a>
            <a href="#" className="hover:text-slate-900 transition-colors">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
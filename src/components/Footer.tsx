
import { ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 py-12 lg:py-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 max-w-7xl mx-auto">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-primary" />
            </div>
            <span className="text-2xl font-headline font-bold tracking-tight text-slate-900">SafeHive</span>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 text-[8px] lg:text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] text-center md:text-left">
            <p>© 2024 SafeHive Technologies Inc. All safety systems are subject to local regulatory audit.</p>
            <div className="flex gap-8 lg:gap-10">
              <a href="#" className="hover:text-slate-900 transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-slate-900 transition-colors">X / Twitter</a>
              <a href="#" className="hover:text-slate-900 transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

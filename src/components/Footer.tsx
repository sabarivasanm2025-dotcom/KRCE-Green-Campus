import React from 'react';
import { Leaf, Heart, ArrowUp, ShieldCheck, MapPin, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#020805] border-t border-emerald-500/20 text-slate-300 pt-16 pb-12 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-emerald-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/5">
          {/* Col 1: Branding & College Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-forest-850 border border-emerald-500/40 flex items-center justify-center shadow-lg">
                <Leaf className="w-5 h-5 text-lime-400" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-extrabold tracking-wider text-white font-display">GREEN</span>
                  <span className="text-base font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-400 font-display">CAMPUS</span>
                </div>
                <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase">
                  KRCE • EVS PROJECT • 2026
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              "Green Campus Initiatives for Environmental Protection" — An academic Environmental Studies (EVS) proposal envisioning sustainable, regenerative, and low-impact infrastructure for K. Ramakrishnan College of Engineering.
            </p>

            <div className="flex items-start gap-2 text-xs text-slate-300">
              <MapPin className="w-4 h-4 text-lime-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">K. Ramakrishnan College of Engineering (KRCE)</p>
                <p className="text-slate-400">Samayapuram, Kariyamanickam Road, Trichy – 621 112, Tamil Nadu, India.</p>
              </div>
            </div>

            {/* Personal Contact & Social Links */}
            <div className="pt-2 flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs">
              <a
                href="https://www.instagram.com/sabari_._7/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-forest-900/80 hover:bg-forest-850 border border-emerald-500/25 hover:border-lime-400/50 text-slate-300 hover:text-lime-300 transition-all duration-300 group shadow-sm"
                title="Instagram: @sabari_._7"
              >
                <svg
                  className="w-3.5 h-3.5 text-lime-400 group-hover:scale-110 transition-transform"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <span className="font-mono text-[11px]">@sabari_._7</span>
              </a>

              <a
                href="https://www.linkedin.com/in/sabarivasan-m48/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-forest-900/80 hover:bg-forest-850 border border-emerald-500/25 hover:border-lime-400/50 text-slate-300 hover:text-lime-300 transition-all duration-300 group shadow-sm"
                title="LinkedIn: @sabarivasan-m48"
              >
                <svg
                  className="w-3.5 h-3.5 text-lime-400 group-hover:scale-110 transition-transform"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                <span className="font-mono text-[11px]">@sabarivasan-m48</span>
              </a>

              <a
                href="tel:+918270263100"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-forest-900/80 hover:bg-forest-850 border border-emerald-500/25 hover:border-lime-400/50 text-slate-300 hover:text-lime-300 transition-all duration-300 group shadow-sm"
                title="Call: +91 8270263100"
              >
                <Phone className="w-3.5 h-3.5 text-lime-400 group-hover:scale-110 transition-transform" />
                <span className="font-mono text-[11px]">+91 8270263100</span>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
              Platform Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#hero" className="hover:text-lime-300 transition-colors">Hero Overview</a>
              </li>
              <li>
                <a href="#vision" className="hover:text-lime-300 transition-colors">Our Vision & 3D Model</a>
              </li>
              <li>
                <a href="#initiatives" className="hover:text-lime-300 transition-colors">Core Initiatives</a>
              </li>
              <li>
                <a href="#journey" className="hover:text-lime-300 transition-colors">Ecological Journey</a>
              </li>
              <li>
                <a href="#impact" className="hover:text-lime-300 transition-colors">Impact Targets Dashboard</a>
              </li>
              <li>
                <a href="#score" className="hover:text-lime-300 transition-colors">Interactive Green Score</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Academic Notice & Compliance */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-lime-400">
              Project Authenticity
            </h4>
            <div className="p-3.5 rounded-xl bg-forest-900/60 border border-emerald-500/20 text-xs text-slate-300 space-y-2">
              <div className="flex items-center gap-1.5 text-lime-300 font-mono font-semibold text-[11px]">
                <ShieldCheck className="w-4 h-4 text-lime-400" />
                <span>Academic EVS Initiative</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-400">
                All numerical indicators are strictly labeled as <strong>Proposed Targets</strong>, <strong>Project Goals</strong>, or <strong>Illustrative Models</strong> for academic presentation.
              </p>
            </div>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-forest-900 hover:bg-forest-850 border border-emerald-500/30 text-xs text-lime-300 hover:text-white transition-colors"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="flex items-center gap-1">
            Developed with <Heart className="w-3.5 h-3.5 text-lime-400 inline fill-lime-400/20" /> for KRCE Environmental Studies (EVS) Curriculum
          </p>
          <p className="font-mono text-[11px]">
            © 2026 K. Ramakrishnan College of Engineering (KRCE) • Academic Green Campus Proposal
          </p>
        </div>
      </div>
    </footer>
  );
};

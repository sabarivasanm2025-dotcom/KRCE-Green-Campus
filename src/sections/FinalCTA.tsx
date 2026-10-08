import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Compass, ArrowRight, ShieldCheck } from 'lucide-react';

interface FinalCTAProps {
  onStartJourney: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onStartJourney }) => {
  return (
    <section className="relative py-32 bg-[#020804] border-t border-emerald-500/15 overflow-hidden flex items-center justify-center">
      {/* Cinematic Environmental Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&w=2000&q=85"
          alt="Lush green environmental landscape"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020804] via-[#03150b]/85 to-[#020804]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-950/60 via-forest-950/80 to-[#020804]" />
      </div>

      {/* Floating radial glow */}
      <div className="absolute w-[600px] h-[400px] bg-gradient-radial from-lime-400/15 to-transparent blur-[140px] pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-forest-900/80 border border-lime-400/40 text-lime-300 text-xs font-mono font-semibold uppercase mb-6 backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-lime-400" />
          <span>KRCE GREEN CAMPUS INITIATIVE • 2026</span>
        </motion.div>

        {/* Big Heading: "One Campus. One Community. One Planet." */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-black text-white font-display uppercase tracking-tight leading-tight"
        >
          One Campus.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-emerald-400 to-teal-300 block sm:inline">
            One Community.
          </span>{' '}
          <span className="block text-slate-100">One Planet.</span>
        </motion.h2>

        {/* Supporting text */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 text-base sm:text-xl text-slate-300 max-w-2xl font-light leading-relaxed"
        >
          "Small actions become powerful when an entire campus moves together."
        </motion.p>

        {/* Action Button: "Start the Green Journey" */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-10"
        >
          <button
            onClick={onStartJourney}
            className="px-10 py-4 rounded-full font-extrabold text-sm sm:text-base text-slate-950 bg-gradient-to-r from-lime-400 via-lime-300 to-emerald-400 hover:from-lime-300 hover:to-emerald-300 shadow-[0_0_35px_rgba(163,230,53,0.45)] hover:shadow-[0_0_55px_rgba(163,230,53,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 group"
          >
            <Compass className="w-5 h-5 text-slate-950 group-hover:rotate-45 transition-transform duration-300" />
            <span>Start the Green Journey</span>
            <ArrowRight className="w-5 h-5 text-slate-950 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* Institutional subtext */}
        <div className="mt-8 flex items-center gap-2 text-xs font-mono text-slate-400/90">
          <ShieldCheck className="w-4 h-4 text-lime-400" />
          <span>K. Ramakrishnan College of Engineering • Trichy, Tamil Nadu</span>
        </div>
      </div>
    </section>
  );
};

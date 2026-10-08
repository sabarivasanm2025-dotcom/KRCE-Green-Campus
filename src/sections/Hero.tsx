import React from 'react';
import { motion } from 'framer-motion';
import { Compass, ChevronRight, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onExploreVision: () => void;
  onViewInitiatives: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreVision, onViewInitiatives }) => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16"
    >
      {/* Background Image with Depth & Dark Translucent Green Gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&w=2000&q=85"
          alt="Lush green environmental landscape"
          className="w-full h-full object-cover scale-105 motion-safe:animate-pulse-glow"
        />
        {/* Dark translucent green gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#030d08]/85 via-[#041c12]/80 to-[#030d08]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-950/40 via-forest-950/70 to-[#030d08]" />
      </div>

      {/* Floating Ambient Glow Lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-radial from-emerald-500/15 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[350px] h-[350px] bg-gradient-radial from-lime-400/10 to-transparent blur-[100px] pointer-events-none" />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Project Label */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-900/80 border border-lime-400/30 text-lime-300 text-xs font-mono font-semibold tracking-wider backdrop-blur-md shadow-[0_0_20px_rgba(163,230,53,0.15)] mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
          <span>KRCE • EVS PROJECT • 2026</span>
          <span className="text-emerald-400 font-normal">| Academic Proposal</span>
        </motion.div>

        {/* Main Text: "GREEN CAMPUS" */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white font-display uppercase leading-none drop-shadow-2xl"
        >
          GREEN{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-300 via-emerald-400 to-teal-300">
            CAMPUS
          </span>
        </motion.h1>

        {/* Large Secondary Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-100 font-display tracking-tight"
        >
          Designing a Greener Future for KRCE
        </motion.h2>

        {/* Project Subtitle / Title */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45 }}
          className="mt-2 text-sm sm:text-base font-mono text-emerald-400 tracking-wide font-medium"
        >
          "Green Campus Initiatives for Environmental Protection"
        </motion.p>

        {/* Supporting Text */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55 }}
          className="mt-5 text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl font-light leading-relaxed"
        >
          An EVS vision for transforming our campus into a more sustainable, responsible and environmentally conscious community.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <button
            onClick={onExploreVision}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full font-bold text-sm text-slate-950 bg-gradient-to-r from-lime-400 via-lime-300 to-emerald-400 hover:from-lime-300 hover:to-emerald-300 shadow-[0_0_30px_rgba(163,230,53,0.4)] hover:shadow-[0_0_45px_rgba(163,230,53,0.65)] hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <Compass className="w-4 h-4 text-slate-900 group-hover:rotate-45 transition-transform duration-300" />
            <span>Explore the Vision</span>
          </button>

          <button
            onClick={onViewInitiatives}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full font-semibold text-sm text-slate-200 bg-forest-900/80 hover:bg-forest-850 hover:text-white border border-emerald-500/40 hover:border-lime-400/50 backdrop-blur-md hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <span>View Initiatives</span>
            <ChevronRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* Illustrative Transparency Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-10 flex items-center gap-2 text-[11px] font-mono text-slate-400/80 bg-forest-950/60 px-4 py-1.5 rounded-full border border-white/5"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-lime-400" />
          <span>Academic EVS Project • All Statistics Labeled as Proposed Targets</span>
        </motion.div>
      </div>

      {/* Subtle Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          delay: 1.1,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 pointer-events-none"
      >
        <span className="text-[10px] font-mono tracking-widest uppercase text-emerald-400/80">
          SCROLL TO EXPLORE
        </span>
        <div className="w-5 h-8 rounded-full border border-emerald-500/40 flex items-start justify-center p-1">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-lime-400"
          />
        </div>
      </motion.div>
    </section>
  );
};

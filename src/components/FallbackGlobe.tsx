import React from 'react';
import { motion } from 'framer-motion';

export const FallbackGlobe: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-[340px] flex items-center justify-center select-none overflow-hidden">
      {/* Outer Glow */}
      <div className="absolute w-72 h-72 rounded-full bg-emerald-500/15 blur-3xl animate-pulse-glow" />
      <div className="absolute w-60 h-60 rounded-full bg-lime-400/10 blur-2xl" />

      {/* Stylized SVG Globe */}
      <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
        {/* Orbit Ring 1 */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full border border-dashed border-emerald-400/30"
          style={{ transform: 'rotateX(68deg)' }}
        />

        {/* Orbit Ring 2 */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-4 rounded-full border border-lime-400/25"
          style={{ transform: 'rotateY(65deg)' }}
        />

        {/* Orbit Ring 3 */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-8 rounded-full border border-emerald-500/20"
          style={{ transform: 'rotateZ(45deg) rotateX(55deg)' }}
        />

        {/* Globe Sphere Surface */}
        <div className="w-48 h-48 md:w-60 md:h-60 rounded-full bg-gradient-to-tr from-forest-950 via-forest-850 to-emerald-950 border border-emerald-500/30 shadow-[inset_0_0_40px_rgba(16,185,129,0.35),0_0_35px_rgba(16,185,129,0.2)] relative overflow-hidden flex items-center justify-center">
          {/* Latitude / Longitude grid lines */}
          <div className="absolute inset-0 opacity-30">
            <div className="w-full h-full rounded-full border-t border-b border-emerald-400/40 my-auto" />
            <div className="absolute top-1/4 left-0 right-0 h-px bg-emerald-400/30" />
            <div className="absolute bottom-1/4 left-0 right-0 h-px bg-emerald-400/30" />
            <div className="absolute left-1/4 top-0 bottom-0 w-px bg-emerald-400/30" />
            <div className="absolute right-1/4 top-0 bottom-0 w-px bg-emerald-400/30" />
            <div className="absolute inset-0 border-x border-emerald-400/40 rounded-full" />
          </div>

          {/* Continents / Green Nodes */}
          <motion.div
            animate={{ x: [-20, 20, -20] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-32 h-20 rounded-full bg-emerald-500/20 blur-md" />
            <div className="absolute top-10 right-12 w-16 h-12 rounded-full bg-lime-400/20 blur-sm" />
          </motion.div>

          {/* Stylized KRCE Node Marker */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group">
            <span className="relative flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-lime-400 shadow-[0_0_12px_#bef264]" />
            </span>
            <div className="mt-1.5 px-2 py-0.5 rounded bg-forest-900/90 border border-lime-400/40 text-[10px] font-mono tracking-wider text-lime-300 backdrop-blur-sm whitespace-nowrap shadow-lg">
              KRCE • TRICHY
            </div>
          </div>

          {/* Subtle Atmosphere Gradient Overlay */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-t from-emerald-950/60 via-transparent to-lime-400/10 pointer-events-none" />
        </div>

        {/* Ambient Floating Mini-Nodes */}
        <motion.div
          animate={{ y: [-6, 6, -6], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-2 right-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-forest-900/80 border border-emerald-500/30 text-[11px] text-emerald-300 font-mono shadow-md backdrop-blur-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>SUSTAINABILITY 2026</span>
        </motion.div>

        <motion.div
          animate={{ y: [6, -6, 6], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-2 left-6 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-forest-900/80 border border-lime-400/30 text-[11px] text-lime-300 font-mono shadow-md backdrop-blur-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
          <span>PROPOSED TARGETS</span>
        </motion.div>
      </div>
    </div>
  );
};

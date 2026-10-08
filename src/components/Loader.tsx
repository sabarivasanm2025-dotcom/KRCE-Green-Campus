import React from 'react';
import { motion } from 'framer-motion';

interface LoaderProps {
  onComplete: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      onAnimationComplete={() => {
        // Automatically complete quickly
      }}
      className="fixed inset-0 z-[100000] bg-[#030d08] flex flex-col items-center justify-center p-6 select-none"
    >
      {/* Background ambient radial glow */}
      <div className="absolute w-96 h-96 rounded-full bg-emerald-500/10 blur-[100px] pointer-events-none" />

      {/* Animated Center Symbol */}
      <div className="relative mb-8 flex items-center justify-center">
        {/* Pulsing ring */}
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute w-24 h-24 rounded-full border border-lime-400/30"
        />
        {/* Rotating ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 rounded-full border-t-2 border-r border-emerald-400 border-b-transparent border-l-transparent"
        />

        {/* Center glowing leaf */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-lime-400 filter drop-shadow-[0_0_8px_#bef264]">
            <path
              d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2Z"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeDasharray="2 2"
              className="opacity-40"
            />
            <path
              d="M12 4C12 4 18 8 18 14C18 18 14.5 20 12 20C9.5 20 6 18 6 14C6 8 12 4 12 4Z"
              fill="currentColor"
              fillOpacity="0.8"
            />
          </svg>
        </div>
      </div>

      {/* Main Title Reveal */}
      <motion.div
        initial={{ y: 15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-center"
      >
        <div className="inline-block px-3 py-1 rounded-full bg-forest-900 border border-emerald-500/30 text-[10px] font-mono text-lime-300 tracking-widest uppercase mb-3">
          EVS PROJECT • 2026
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-wider text-slate-100 font-display">
          GREEN <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-400">CAMPUS</span>
        </h1>
        <p className="text-xs md:text-sm text-emerald-400/90 font-medium tracking-widest uppercase mt-1">
          K. RAMAKRISHNAN COLLEGE OF ENGINEERING
        </p>
      </motion.div>

      {/* Progress Line */}
      <div className="w-48 h-1 bg-forest-900 rounded-full mt-6 overflow-hidden border border-emerald-500/20">
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
          onAnimationComplete={onComplete}
          className="h-full bg-gradient-to-r from-emerald-500 via-lime-400 to-emerald-400"
        />
      </div>

      <div className="mt-4 text-[11px] font-mono text-slate-400/80">
        INITIALIZING SUSTAINABILITY PLATFORM...
      </div>
    </motion.div>
  );
};

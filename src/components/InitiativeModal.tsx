import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ChevronRight, AlertCircle, Sparkles, Target } from 'lucide-react';
import type { Initiative } from '../types';

interface InitiativeModalProps {
  initiative: Initiative | null;
  onClose: () => void;
  onOpenVolunteer: () => void;
}

export const InitiativeModal: React.FC<InitiativeModalProps> = ({
  initiative,
  onClose,
  onOpenVolunteer,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (initiative) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [initiative, onClose]);

  if (!initiative) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#030d08]/85 backdrop-blur-md"
        />

        {/* Modal Dialog Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-forest-900 border border-emerald-500/30 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden z-10 max-h-[90vh] flex flex-col"
        >
          {/* Header Image with Overlay */}
          <div className="relative h-56 sm:h-72 w-full overflow-hidden shrink-0">
            <img
              src={initiative.image}
              alt={initiative.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-900 via-forest-900/50 to-transparent" />

            {/* Top Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-lime-400"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Top Badges */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-forest-950/80 border border-lime-400/40 text-[11px] font-mono font-semibold text-lime-300 backdrop-blur-md">
                INITIATIVE #{initiative.number}
              </span>
              <span className="px-3 py-1 rounded-full bg-forest-950/80 border border-emerald-500/40 text-[11px] font-mono text-emerald-300 backdrop-blur-md">
                {initiative.category}
              </span>
            </div>

            {/* Title In Overlay */}
            <div className="absolute bottom-4 left-6 right-6">
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
                {initiative.title}
              </h2>
              <p className="text-sm sm:text-base text-lime-300 font-medium italic mt-1">
                "{initiative.tagline}"
              </p>
            </div>
          </div>

          {/* Modal Body (Scrollable) */}
          <div className="p-6 overflow-y-auto space-y-6 text-slate-200">
            {/* Metric Banner */}
            <div className="p-4 rounded-xl bg-forest-850/80 border border-lime-400/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-inner">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-lime-400/10 border border-lime-400/30 text-lime-400">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 block font-semibold">
                    {initiative.metrics.label}
                  </span>
                  <span className="text-xl font-bold text-white font-mono">
                    {initiative.metrics.target}
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-mono text-amber-300/90 self-start sm:self-center px-2.5 py-1 rounded bg-amber-950/40 border border-amber-500/20">
                PROPOSED TARGET • EVS PROJECT
              </span>
            </div>

            {/* Summary */}
            <p className="text-sm sm:text-base leading-relaxed text-slate-300">
              {initiative.summary}
            </p>

            {/* Problem & Solution Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Problem */}
              <div className="p-4 rounded-xl bg-forest-950/60 border border-red-500/20 space-y-2">
                <div className="flex items-center gap-2 text-rose-300 text-xs font-mono font-semibold uppercase tracking-wider">
                  <AlertCircle className="w-4 h-4 text-rose-400" />
                  <span>The Campus Challenge</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {initiative.problem}
                </p>
              </div>

              {/* Proposed Solution */}
              <div className="p-4 rounded-xl bg-forest-950/60 border border-emerald-500/30 space-y-2">
                <div className="flex items-center gap-2 text-lime-300 text-xs font-mono font-semibold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-lime-400" />
                  <span>Proposed Green Solution</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {initiative.proposedSolution}
                </p>
              </div>
            </div>

            {/* Anticipated Ecological Benefits */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-emerald-400 font-mono uppercase tracking-wider">
                Anticipated Ecological Benefits
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {initiative.benefits.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-lg bg-forest-850/50 border border-white/5 text-xs sm:text-sm text-slate-300"
                  >
                    <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Phased Implementation Steps */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-emerald-400 font-mono uppercase tracking-wider">
                Phased Implementation Roadmap
              </h3>
              <div className="space-y-2">
                {initiative.implementationSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 rounded-lg bg-forest-950/70 border border-emerald-500/15 text-xs sm:text-sm text-slate-300"
                  >
                    <div className="w-6 h-6 rounded-full bg-forest-800 border border-lime-400/40 text-[10px] font-mono font-bold text-lime-300 flex items-center justify-center shrink-0">
                      0{idx + 1}
                    </div>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="p-4 sm:p-5 border-t border-emerald-500/20 bg-forest-950/80 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
            <span className="text-[11px] font-mono text-slate-400 text-center sm:text-left">
              K. Ramakrishnan College of Engineering • Environmental Studies Project
            </span>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 transition-colors w-1/2 sm:w-auto"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onClose();
                  onOpenVolunteer();
                }}
                className="px-5 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-lime-400 to-emerald-400 hover:from-lime-300 hover:to-emerald-300 shadow-[0_0_15px_rgba(163,230,53,0.3)] transition-all flex items-center justify-center gap-1.5 w-1/2 sm:w-auto"
              >
                <span>Support Initiative</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

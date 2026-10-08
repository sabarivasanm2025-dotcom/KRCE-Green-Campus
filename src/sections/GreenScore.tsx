import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckSquare,
  Award,
  RotateCcw,
  ShieldAlert,
  HelpCircle
} from 'lucide-react';
import { quizQuestions } from '../data/campusData';
import confetti from 'canvas-confetti';

export const GreenScore: React.FC = () => {
  // Store selected question ids (10 questions, each worth 10%)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    4: true,
    7: true,
    10: true,
  });

  const [showResults, setShowResults] = useState(false);

  const toggleAnswer = (id: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const selectAll = () => {
    const all: Record<number, boolean> = {};
    quizQuestions.forEach((q) => {
      all[q.id] = true;
    });
    setSelectedAnswers(all);
  };

  const clearAll = () => {
    setSelectedAnswers({});
  };

  const answeredCount = Object.values(selectedAnswers).filter(Boolean).length;
  const scorePercent = Math.round((answeredCount / quizQuestions.length) * 100);

  const getTier = (score: number) => {
    if (score <= 30) {
      return {
        level: '0–30%',
        title: 'Starting the Journey',
        description: 'Initial awareness stage. Great potential exists to introduce foundational waste segregation and water collection routines.',
        color: 'from-amber-500 to-orange-400',
        textColor: 'text-amber-400',
        badge: 'Foundation Tier',
      };
    } else if (score <= 60) {
      return {
        level: '31–60%',
        title: 'Growing Greener',
        description: 'Noticeable ecological practices in motion. Campus infrastructure is expanding into active energy efficiency and student green clubs.',
        color: 'from-lime-400 to-emerald-400',
        textColor: 'text-lime-300',
        badge: 'Development Tier',
      };
    } else if (score <= 80) {
      return {
        level: '61–80%',
        title: 'Green Progress',
        description: 'Strong environmental commitment. Significant adoption of solar arrays, rainwater retention, and native biodiversity spaces.',
        color: 'from-emerald-400 to-teal-300',
        textColor: 'text-emerald-300',
        badge: 'Advanced Tier',
      };
    } else {
      return {
        level: '81–100%',
        title: 'Green Campus Vision Leader',
        description: 'Exemplary sustainability model! Comprehensive zero-waste, clean renewable energy, and circular student-led ecological ecosystem.',
        color: 'from-lime-300 via-emerald-400 to-cyan-400',
        textColor: 'text-lime-300',
        badge: 'Excellence Tier',
      };
    }
  };

  const tier = getTier(scorePercent);

  const handleCalculateScore = () => {
    setShowResults(true);
    if (scorePercent >= 60) {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#a3e635', '#10b981', '#6ee7b7'],
      });
    }
  };

  return (
    <section id="score" className="relative py-28 bg-[#030d08] border-t border-emerald-500/15 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-emerald-600/10 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-forest-900 border border-emerald-500/30 text-lime-300 text-xs font-mono font-semibold uppercase mb-4"
          >
            <HelpCircle className="w-3.5 h-3.5 text-lime-400" />
            <span>SECTION 05 • INTERACTIVE AUDIT TOOL</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight"
          >
            How Green Is{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-emerald-400 to-teal-300">
              Your Campus?
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed"
          >
            An interactive self-assessment instrument based on universal green campus benchmarks. Toggle the 10 sustainability parameters below to compute your simulated score.
          </motion.p>
        </div>

        {/* Audit Tool Container */}
        <div className="rounded-3xl bg-forest-900/60 border border-emerald-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-xl overflow-hidden p-6 sm:p-8">
          {/* Quick Action Controls & Live Counter */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
            <div>
              <span className="text-xs font-mono uppercase text-emerald-400 font-semibold tracking-wider">
                Assessment Parameters: {answeredCount} / {quizQuestions.length} Checked
              </span>
              <div className="w-48 sm:w-64 h-2 bg-forest-950 rounded-full mt-2 overflow-hidden border border-emerald-500/20">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-lime-400 transition-all duration-500"
                  style={{ width: `${scorePercent}%` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={selectAll}
                className="px-3 py-1.5 rounded-lg bg-forest-850 hover:bg-forest-800 border border-emerald-500/30 text-[11px] font-mono text-lime-300 transition-colors"
              >
                Select All
              </button>
              <button
                onClick={clearAll}
                className="px-3 py-1.5 rounded-lg bg-forest-850 hover:bg-forest-800 border border-white/10 text-[11px] font-mono text-slate-300 hover:text-white transition-colors"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Question Items List */}
          <div className="py-6 space-y-3">
            {quizQuestions.map((q) => {
              const isChecked = !!selectedAnswers[q.id];
              return (
                <div
                  key={q.id}
                  onClick={() => toggleAnswer(q.id)}
                  className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer flex items-start gap-3.5 select-none ${
                    isChecked
                      ? 'bg-forest-850/80 border-lime-400/40 shadow-sm'
                      : 'bg-forest-950/40 border-white/5 hover:border-emerald-500/30'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {isChecked ? (
                      <div className="w-5 h-5 rounded-md bg-lime-400 text-slate-950 flex items-center justify-center shadow-[0_0_10px_#bef264]">
                        <CheckSquare className="w-4 h-4" />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-md border border-slate-600 hover:border-emerald-400 bg-forest-950" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-slate-100">
                        {q.id}. {q.text}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-forest-950 border border-white/10 text-emerald-300 shrink-0">
                        {q.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      {q.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Assessment Trigger Button */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs font-mono text-slate-400">
              ✦ Click parameters to toggle active implementation status
            </span>

            <button
              onClick={handleCalculateScore}
              className="w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-lime-400 to-emerald-400 hover:from-lime-300 hover:to-emerald-300 shadow-[0_0_25px_rgba(163,230,53,0.35)] transition-all flex items-center justify-center gap-2"
            >
              <Award className="w-4 h-4" />
              <span>Calculate Green Campus Score</span>
            </button>
          </div>

          {/* Results Display Card */}
          <AnimatePresence>
            {showResults && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-forest-950 via-forest-900 to-emerald-950 border-2 border-lime-400/60 shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_30px_rgba(163,230,53,0.2)]"
              >
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  {/* Score Number Circle */}
                  <div className="flex items-center gap-5">
                    <div className="w-24 h-24 rounded-2xl bg-forest-950 border-2 border-lime-400 flex flex-col items-center justify-center shadow-[0_0_20px_#bef264]">
                      <span className="text-3xl font-black font-mono text-white">
                        {scorePercent}%
                      </span>
                      <span className="text-[10px] font-mono text-lime-400 uppercase tracking-wider">
                        SCORE
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-forest-900 border border-emerald-500/30 text-[10px] font-mono text-emerald-400">
                          {tier.badge}
                        </span>
                        <span className="text-xs font-mono text-slate-400">{tier.level}</span>
                      </div>
                      <h3 className={`text-2xl font-bold font-display mt-1 ${tier.textColor}`}>
                        {tier.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-md">
                        {tier.description}
                      </p>
                    </div>
                  </div>

                  {/* Reset action */}
                  <button
                    onClick={() => setShowResults(false)}
                    className="px-4 py-2 rounded-xl bg-forest-850 hover:bg-forest-800 border border-white/10 text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Recalculate</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Educational Project Disclaimer */}
          <div className="mt-8 p-4 rounded-xl bg-forest-950/80 border border-emerald-500/20 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-lime-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-300 space-y-1">
              <span className="font-mono font-semibold text-lime-300 block">
                Educational Project Assessment Notice
              </span>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                This is an interactive educational assessment developed as part of an academic EVS proposal for KRCE. It serves to illustrate potential sustainability performance metrics and does not constitute an official governmental or institutional KRCE green audit report.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Compass, CheckCircle2 } from 'lucide-react';
import { timelineSteps } from '../data/campusData';

export const Journey: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="journey" className="relative py-28 bg-[#030d08] border-t border-emerald-500/15 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-lime-400/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-forest-900 border border-emerald-500/30 text-lime-300 text-xs font-mono font-semibold uppercase mb-4"
          >
            <Compass className="w-3.5 h-3.5 text-lime-400" />
            <span>SECTION 03 • PROGRESSIVE ROADMAP</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight"
          >
            Our Journey Towards a{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-400">
              Greener Campus
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed"
          >
            A continuous six-stage methodology guiding KRCE from baseline environmental awareness to measurable campus transformation and student-led leadership.
          </motion.p>
        </div>

        {/* Step Selector Pills (Horizontal on Desktop, scrollable on mobile) */}
        <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-4 no-scrollbar mb-10">
          {timelineSteps.map((s, idx) => (
            <button
              key={s.step}
              onClick={() => setActiveStep(idx)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all duration-300 shrink-0 flex items-center gap-2 border ${
                activeStep === idx
                  ? 'bg-lime-400 text-slate-950 border-lime-300 shadow-[0_0_20px_rgba(163,230,53,0.4)] scale-105'
                  : 'bg-forest-900/60 text-slate-300 border-emerald-500/20 hover:border-emerald-400/50 hover:text-white'
              }`}
            >
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                activeStep === idx ? 'bg-slate-900 text-lime-300' : 'bg-forest-950 text-slate-400'
              }`}>
                {s.step}
              </span>
              <span>{s.title}</span>
            </button>
          ))}
        </div>

        {/* Vertical Connected Timeline Display */}
        <div className="relative max-w-4xl mx-auto">
          {/* Animated Glowing Connecting Line */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 -translate-x-1/2 w-0.5 bg-gradient-to-b from-lime-400 via-emerald-500 to-teal-400 opacity-30 pointer-events-none" />

          <div className="space-y-8">
            {timelineSteps.map((step, idx) => {
              const isSelected = activeStep === idx;
              const isLeft = idx % 2 === 0;

              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  onClick={() => setActiveStep(idx)}
                  className={`relative flex flex-col md:flex-row items-start cursor-pointer ${
                    isLeft ? 'md:flex-row-reverse' : ''
                  } gap-6 md:gap-12 group`}
                >
                  {/* Central Timeline Milestone Node */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                    <div
                      className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                        isSelected
                          ? 'bg-forest-950 border-lime-400 text-lime-300 shadow-[0_0_20px_#bef264] scale-110'
                          : 'bg-forest-900 border-emerald-500/40 text-slate-300 group-hover:border-lime-400'
                      }`}
                    >
                      <span className="font-mono text-xs font-bold">{step.step}</span>
                    </div>
                  </div>

                  {/* Card Content (Offset for left/right alternately) */}
                  <div className="w-full pl-14 md:pl-0 md:w-1/2">
                    <div
                      className={`p-6 rounded-2xl border transition-all duration-300 backdrop-blur-md ${
                        isSelected
                          ? 'bg-forest-850/90 border-lime-400/50 shadow-[0_10px_30px_rgba(0,0,0,0.6),0_0_25px_rgba(163,230,53,0.15)]'
                          : 'bg-forest-900/40 border-emerald-500/20 hover:border-emerald-500/40 group-hover:bg-forest-900/70'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-mono font-semibold text-lime-400 uppercase">
                          PHASE {step.step} • {step.subheading}
                        </span>
                        {isSelected && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-lime-400/20 text-lime-300">
                            FOCUSED
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl font-bold text-white font-display">
                        {step.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                        {step.description}
                      </p>

                      {/* Action item tags */}
                      <div className="mt-4 flex flex-wrap gap-2 pt-3 border-t border-white/5">
                        {step.actionItems.map((act, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-forest-950 border border-white/5 text-[11px] font-mono text-emerald-300"
                          >
                            <CheckCircle2 className="w-3 h-3 text-lime-400" />
                            <span>{act}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Spacer for alternating layout on desktop */}
                  <div className="hidden md:block w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

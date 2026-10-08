import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Trees,
  Droplet,
  Recycle,
  Sun,
  Bike,
  Activity,
  ShieldCheck,
  TrendingUp,
  Info
} from 'lucide-react';
import { impactTargets } from '../data/campusData';

interface CounterProps {
  value: number;
  suffix: string;
  inView: boolean;
}

const AnimatedCounter: React.FC<CounterProps> = ({ value, suffix, inView }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!inView) {
      setDisplayValue(0);
      return;
    }

    const duration = 1800; // ms
    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(ease * value);
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setDisplayValue(value);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [value, inView]);

  return (
    <span className="font-mono font-black tracking-tight">
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
};

export const ImpactDashboard: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.25 });

  const getMetricIcon = (icon: string) => {
    switch (icon) {
      case 'Trees':
        return <Trees className="w-6 h-6 text-emerald-400" />;
      case 'Droplet':
        return <Droplet className="w-6 h-6 text-cyan-400" />;
      case 'Recycle':
        return <Recycle className="w-6 h-6 text-lime-400" />;
      case 'Sun':
        return <Sun className="w-6 h-6 text-amber-400" />;
      case 'Bike':
        return <Bike className="w-6 h-6 text-teal-400" />;
      default:
        return <Activity className="w-6 h-6 text-lime-400" />;
    }
  };

  return (
    <section
      id="impact"
      ref={containerRef}
      className="relative py-28 bg-[#020a06] border-t border-emerald-500/15 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[700px] h-[500px] bg-emerald-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-forest-900 border border-emerald-500/30 text-lime-300 text-xs font-mono font-semibold uppercase mb-4"
          >
            <Activity className="w-3.5 h-3.5 text-lime-400" />
            <span>SECTION 04 • TARGET METRICS</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight"
          >
            Measure What{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-emerald-400 to-teal-300">
              Matters
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed"
          >
            Clear, quantitative benchmarks designed to measure environmental progress across energy, water, biodiversity, waste diversion, and student mobility.
          </motion.p>

          {/* Mandatory academic label callout */}
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-950 border border-lime-400/30 text-xs font-mono text-lime-300">
            <ShieldCheck className="w-4 h-4 text-lime-400" />
            <span>MANDATORY LABEL: ALL NUMBERS REPRESENT PROPOSED PROJECT TARGETS</span>
          </div>
        </div>

        {/* 5 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {impactTargets.map((target, idx) => {
            // Circular progress calculations
            const radius = 38;
            const circumference = 2 * Math.PI * radius;
            const strokeDashoffset = circumference - (target.progress / 100) * circumference;

            return (
              <motion.div
                key={target.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-forest-900/60 border border-emerald-500/25 hover:border-lime-400/50 backdrop-blur-md transition-all duration-300 shadow-glass-card hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar with Icon & Circular Gauge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-forest-950 border border-emerald-500/40 shadow-inner">
                      {getMetricIcon(target.icon)}
                    </div>

                    {/* Circular Progress Gauge */}
                    <div className="relative w-16 h-16 flex items-center justify-center">
                      <svg className="w-16 h-16 transform -rotate-90">
                        <circle
                          cx="32"
                          cy="32"
                          r={radius}
                          stroke="currentColor"
                          strokeWidth="5"
                          className="text-forest-950"
                          fill="transparent"
                        />
                        <circle
                          cx="32"
                          cy="32"
                          r={radius}
                          stroke="url(#limeGradient)"
                          strokeWidth="5"
                          strokeDasharray={circumference}
                          strokeDashoffset={isInView ? strokeDashoffset : circumference}
                          strokeLinecap="round"
                          fill="transparent"
                          className="transition-all duration-1000 ease-out"
                        />
                        <defs>
                          <linearGradient id="limeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#bef264" />
                            <stop offset="100%" stopColor="#10b981" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <span className="absolute text-[11px] font-mono font-bold text-lime-300">
                        {target.progress}%
                      </span>
                    </div>
                  </div>

                  {/* Target Label Type */}
                  <span className="text-[10px] font-mono tracking-wider uppercase text-emerald-400/90 font-semibold block mb-1">
                    {target.labelType}
                  </span>

                  {/* Numeric Value */}
                  <div className="text-3xl sm:text-4xl font-extrabold text-white">
                    <AnimatedCounter
                      value={target.value}
                      suffix={target.suffix}
                      inView={isInView}
                    />
                  </div>

                  <p className="text-sm font-semibold text-slate-100 font-display mt-1">
                    {target.title}
                  </p>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {target.desc}
                  </p>
                </div>

                {/* Bottom Metric Unit Subtext */}
                <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Unit: {target.unit}</span>
                  <div className="flex items-center gap-1 text-lime-400">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Project Vision</span>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* 6th Educational Summary Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-forest-950 via-forest-900 to-emerald-950 border border-lime-400/40 shadow-glass-card flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 text-lime-400 mb-3">
                <Info className="w-5 h-5" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider">
                  Academic Transparency
                </span>
              </div>
              <h3 className="text-lg font-bold text-white font-display">
                Science-Based Methodology
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mt-2">
                Targets are modeled based on standard engineering benchmark assumptions for a 4,000+ student collegiate facility in the Cauvery basin climatic zone.
              </p>
              <div className="mt-4 p-3 rounded-lg bg-black/40 border border-white/5 space-y-1 text-[11px] font-mono text-emerald-300">
                <p>• Rooftop Area: ~25,000 sq.m Catchment</p>
                <p>• Sunshine Hours: ~5.2 kWh/sq.m/day</p>
                <p>• Segregation Target: 80% Organic Recovery</p>
              </div>
            </div>

            <div className="mt-4 text-[10px] font-mono text-slate-400">
              Prepared for KRCE EVS Academic Submission
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

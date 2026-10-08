import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Droplets,
  CloudRain,
  Inbox,
  Filter,
  Database,
  Sparkles,
  Waves,
  CheckCircle2,
  ArrowDown,
  ArrowRight
} from 'lucide-react';
import { waterFeatures } from '../data/campusData';

export const WaterConservation: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number>(0);

  const waterCards = [
    {
      title: 'Rainwater Harvesting',
      tagline: 'Intercepting monsoonal downpours.',
      desc: 'Channeling high-volume runoff from over 25,000 sq. meters of academic roof area via dual silt-trap filtration chambers directly into subterranean aquifer recharge pits.',
      metrics: '50,000 L / Day Target',
      icon: CloudRain,
      details: ['Rooftop PVC gutters with leaf deflectors', 'Sediment settling tanks', 'Aquifer replenishment wells']
    },
    {
      title: 'Water Reuse & Greywater',
      tagline: 'Circular water recycling for campus lawns.',
      desc: 'Hostel and canteen washbasin greywater is treated through natural sand and reed-bed bio-filtration, redirecting clean non-potable water into botanical sprinkler networks.',
      metrics: '40% Groundwater Savings',
      icon: Waves,
      details: ['Gravity-fed root-zone wetland filters', 'Automated subsurface drip lines', 'Zero discharge into open drains']
    },
    {
      title: 'Ultrasonic Leak Detection',
      tagline: 'Continuous IoT pipe integrity monitoring.',
      desc: 'Strategic ultrasonic acoustic sensors placed along KRCE main distribution headers detect minor hairline pipe fractures and valve seepage before catastrophic water loss occurs.',
      metrics: '<2% Pipeline Loss Target',
      icon: Filter,
      details: ['Smart automated solenoid shutoffs', 'Instant SMS maintenance alerts', 'Overhead tank overflow prevention']
    },
    {
      title: 'Smart Consumption & Fixtures',
      tagline: 'Efficiency at every faucet point.',
      desc: 'Retrofitting all department restrooms, labs, and hostel washrooms with low-flow aerator nozzles that maintain satisfying pressure while cutting volumetric water draw by half.',
      metrics: '50% Fixture Efficiency',
      icon: Sparkles,
      details: ['Low-flow aerator aerators (1.5 LPM)', 'Push-metered push faucets', 'Dual-flush hygiene systems']
    },
  ];

  return (
    <section id="water" className="relative py-28 bg-[#020905] border-t border-emerald-500/15 overflow-hidden">
      {/* Background aquatic gradient and wave glow */}
      <div className="absolute top-1/3 left-1/4 w-[700px] h-[500px] bg-cyan-900/15 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[400px] bg-teal-800/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-forest-900 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold uppercase mb-4"
          >
            <Droplets className="w-3.5 h-3.5 text-cyan-400" />
            <span>SECTION 06 • HYDROLOGICAL RESILIENCE</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight"
          >
            Every Drop{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
              Preserved & Reclaimed
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed"
          >
            Transforming KRCE campus into a water-neutral ecosystem through circular hydrological cycles: intercepting rainfall, purifying greywater, and eliminating distribution leaks.
          </motion.p>
        </div>

        {/* The 5-Step Flow Cycle: RAIN ↓ COLLECT ↓ FILTER ↓ STORE ↓ REUSE */}
        <div className="mb-20">
          <div className="text-center mb-6">
            <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase">
              CLOSED-LOOP CAMPUS WATER CYCLE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
            {waterFeatures.map((feat, idx) => {
              const icons = [CloudRain, Inbox, Filter, Database, Sparkles];
              const IconComp = icons[idx];

              return (
                <motion.div
                  key={feat.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="relative p-5 rounded-2xl bg-forest-900/60 border border-cyan-500/25 hover:border-cyan-400/60 backdrop-blur-md flex flex-col justify-between group hover:-translate-y-1 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-mono font-bold text-cyan-300 px-2 py-0.5 rounded bg-forest-950 border border-cyan-500/30">
                        {feat.step}
                      </span>
                      <IconComp className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                    </div>
                    <h4 className="text-sm font-bold text-white font-display mb-1">
                      {feat.title}
                    </h4>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>

                  {/* Flow arrow on desktop */}
                  {idx < 4 && (
                    <div className="hidden md:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-forest-950 border border-cyan-400/40 items-center justify-center text-cyan-300">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  )}

                  {/* Flow arrow on mobile */}
                  {idx < 4 && (
                    <div className="flex md:hidden justify-center pt-3 text-cyan-400">
                      <ArrowDown className="w-4 h-4" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* 4 Interactive Water Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {waterCards.map((card, idx) => {
            const IconC = card.icon;
            const isSelected = activeCard === idx;

            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => setActiveCard(idx)}
                className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-forest-850/90 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.25)] -translate-y-1'
                    : 'bg-forest-900/50 border-emerald-500/20 hover:border-cyan-500/40 hover:bg-forest-900/80'
                }`}
              >
                <div>
                  <div className="p-3 rounded-xl bg-forest-950 border border-cyan-500/30 w-fit mb-4 text-cyan-400">
                    <IconC className="w-5 h-5" />
                  </div>

                  <h3 className="text-lg font-bold text-white font-display">
                    {card.title}
                  </h3>
                  <p className="text-xs text-cyan-300 font-mono italic mt-0.5">
                    "{card.tagline}"
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed mt-2.5">
                    {card.desc}
                  </p>

                  <div className="mt-4 space-y-1.5 pt-3 border-t border-white/5">
                    {card.details.map((d, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] text-slate-300">
                        <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0" />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-cyan-300 font-bold">{card.metrics}</span>
                  <span className="text-slate-400">Proposed</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

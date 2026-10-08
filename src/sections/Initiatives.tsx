import React from 'react';
import { motion } from 'framer-motion';
import {
  Trash2,
  Droplets,
  SunMedium,
  Flower2,
  Bike,
  Building2,
  ArrowRight,
  Layers,
  Target
} from 'lucide-react';
import { initiativesData } from '../data/initiativesData';
import type { Initiative } from '../types';

interface InitiativesProps {
  onSelectInitiative: (initiative: Initiative) => void;
}

export const Initiatives: React.FC<InitiativesProps> = ({ onSelectInitiative }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Trash2':
        return <Trash2 className="w-5 h-5 text-lime-400 group-hover:rotate-12 transition-transform duration-300" />;
      case 'Droplets':
        return <Droplets className="w-5 h-5 text-cyan-400 group-hover:scale-125 transition-transform duration-300" />;
      case 'SunMedium':
        return <SunMedium className="w-5 h-5 text-amber-400 group-hover:rotate-45 transition-transform duration-300" />;
      case 'Flower2':
        return <Flower2 className="w-5 h-5 text-emerald-400 group-hover:rotate-12 transition-transform duration-300" />;
      case 'Bike':
        return <Bike className="w-5 h-5 text-lime-400 group-hover:translate-x-1 transition-transform duration-300" />;
      case 'Building2':
        return <Building2 className="w-5 h-5 text-teal-400 group-hover:scale-110 transition-transform duration-300" />;
      default:
        return <Layers className="w-5 h-5 text-lime-400" />;
    }
  };

  return (
    <section id="initiatives" className="relative py-28 bg-[#020a06] border-t border-emerald-500/15 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-emerald-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-forest-900 border border-emerald-500/30 text-lime-300 text-xs font-mono font-semibold uppercase mb-4"
          >
            <Layers className="w-3.5 h-3.5 text-lime-400" />
            <span>SECTION 02 • CORE INITIATIVES</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight"
          >
            Green Campus{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-emerald-400 to-teal-300">
              Action Pillars
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed"
          >
            Six interlinked environmental interventions designed to systematically reduce resource waste, regenerate natural cycles, and foster eco-literacy across the KRCE campus.
          </motion.p>
        </div>

        {/* 6 Large Interactive Initiative Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {initiativesData.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              onClick={() => onSelectInitiative(item)}
              className="group relative cursor-pointer rounded-2xl overflow-hidden bg-forest-900/60 border border-emerald-500/25 hover:border-lime-400/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8),0_0_30px_rgba(16,185,129,0.25)] flex flex-col justify-between"
            >
              {/* Card Image Banner with Zoom Effect */}
              <div className="relative h-52 w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-900 via-forest-900/40 to-transparent" />

                {/* Top Corner Number & Category */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-forest-950/80 border border-white/10 text-[11px] font-mono font-bold text-lime-300 backdrop-blur-md">
                    {item.number}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-forest-950/80 border border-emerald-500/30 text-[10px] font-mono text-emerald-300 backdrop-blur-md">
                    {item.category}
                  </span>
                </div>

                {/* Floating Icon Badge */}
                <div className="absolute bottom-3 left-4 p-3 rounded-xl bg-forest-950/90 border border-emerald-500/40 shadow-lg group-hover:border-lime-400 transition-colors">
                  {getIcon(item.iconName)}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-lime-300 transition-colors font-display">
                    {item.title}
                  </h3>
                  <p className="text-xs font-mono text-lime-400 font-medium italic mt-0.5">
                    "{item.tagline}"
                  </p>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-3 line-clamp-3">
                    {item.summary}
                  </p>
                </div>

                {/* Metric Target Pill */}
                <div className="pt-2 border-t border-emerald-500/15 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-300">
                    <Target className="w-3.5 h-3.5 text-lime-400" />
                    <span>{item.metrics.target}</span>
                  </div>

                  {/* Forward Action Arrow */}
                  <div className="flex items-center gap-1 text-xs font-mono font-semibold text-lime-400 group-hover:text-white transition-colors">
                    <span>EXPLORE</span>
                    <ArrowRight className="w-4 h-4 text-lime-400 group-hover:translate-x-1.5 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <span className="text-xs font-mono text-slate-400">
            ✦ Click on any card to view detailed implementation roadmaps, problems, and proposed targets.
          </span>
        </div>
      </div>
    </section>
  );
};

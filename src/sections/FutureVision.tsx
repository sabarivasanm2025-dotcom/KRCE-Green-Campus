import React from 'react';
import { motion } from 'framer-motion';
import {
  Rocket,
  Radio,
  Sun,
  Droplets,
  Bike,
  MapPin,
  Activity,
  Users,
  Cpu,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { futureVisionConcepts } from '../data/campusData';

export const FutureVision: React.FC = () => {
  const getConceptIcon = (icon: string) => {
    switch (icon) {
      case 'Radio':
        return <Radio className="w-5 h-5 text-lime-400" />;
      case 'Sun':
        return <Sun className="w-5 h-5 text-amber-400" />;
      case 'Droplets':
        return <Droplets className="w-5 h-5 text-cyan-400" />;
      case 'Bike':
        return <Bike className="w-5 h-5 text-teal-400" />;
      case 'MapPin':
        return <MapPin className="w-5 h-5 text-emerald-400" />;
      case 'Activity':
        return <Activity className="w-5 h-5 text-lime-400" />;
      case 'Users':
        return <Users className="w-5 h-5 text-cyan-300" />;
      default:
        return <Cpu className="w-5 h-5 text-lime-400" />;
    }
  };

  return (
    <section id="future" className="relative py-28 bg-[#020a06] border-t border-emerald-500/15 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-emerald-600/10 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-forest-900 border border-lime-400/30 text-lime-300 text-xs font-mono font-semibold uppercase mb-4"
          >
            <Rocket className="w-3.5 h-3.5 text-lime-400" />
            <span>SECTION 12 • NEXT-GEN ECO-TECH</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight"
          >
            Tomorrow Starts on{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-emerald-400 to-teal-300">
              Campus
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed"
          >
            A high-tech roadmap where artificial intelligence, Internet-of-Things (IoT), and circular engineering converge to create a self-sustaining collegiate campus of the future.
          </motion.p>
        </div>

        {/* 7 Futuristic Concept Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {futureVisionConcepts.map((concept, idx) => (
            <motion.div
              key={concept.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="p-6 rounded-2xl bg-forest-900/50 hover:bg-forest-850/80 border border-emerald-500/20 hover:border-lime-400/50 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 shadow-glass-card group flex flex-col justify-between"
            >
              <div>
                {/* Header with Icon & Futuristic Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-forest-950 border border-emerald-500/30 group-hover:border-lime-400 transition-colors shadow-inner">
                    {getConceptIcon(concept.icon)}
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-forest-950/80 border border-white/10 text-[10px] font-mono text-lime-300">
                    {concept.badge}
                  </span>
                </div>

                <span className="text-[10px] font-mono uppercase text-emerald-400 tracking-wider font-semibold block mb-1">
                  {concept.category}
                </span>

                <h3 className="text-lg font-bold text-white group-hover:text-lime-300 transition-colors font-display">
                  {concept.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-2.5">
                  {concept.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>KRCE Vision Horizon</span>
                <ArrowUpRight className="w-4 h-4 text-emerald-400 group-hover:text-lime-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
            </motion.div>
          ))}

          {/* Futuristic Banner Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-forest-950 via-forest-900 to-emerald-950 border-2 border-lime-400/40 shadow-glass-card flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 text-lime-400 mb-3">
                <Sparkles className="w-5 h-5" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider">
                  Engineered for Impact
                </span>
              </div>
              <h3 className="text-lg font-bold text-white font-display">
                Zero Carbon Campus Blueprint
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mt-2">
                Integrating student capstone thesis research directly into campus infrastructure maintenance and clean technology patents.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 text-[10px] font-mono text-lime-300">
              ✦ KRCE Department of Environmental Studies • 2026
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { motion } from 'framer-motion';
import { Recycle, RefreshCw, Lightbulb, Compass, Globe2 } from 'lucide-react';
import { ThreeGlobe } from '../components/ThreeGlobe';

export const Vision: React.FC = () => {
  const principles = [
    {
      number: '01',
      title: 'REDUCE',
      subtitle: 'Reduce environmental impact.',
      desc: 'Systematically lower campus power drain, water losses, and discard volume through proactive conservation policies and smart building controls.',
      icon: Recycle,
      badge: 'Resource Efficiency',
    },
    {
      number: '02',
      title: 'RESTORE',
      subtitle: 'Restore and protect natural resources.',
      desc: 'Recharge Trichy’s underground aquifer with storm runoff and reintroduce native biodiversity via indigenous micro-forest canopies.',
      icon: RefreshCw,
      badge: 'Ecological Recovery',
    },
    {
      number: '03',
      title: 'INSPIRE',
      subtitle: 'Inspire students to live sustainably.',
      desc: 'Cultivate an ethos of environmental stewardship among future engineers so sustainable thinking becomes a core instinct in every technical career.',
      icon: Lightbulb,
      badge: 'Student Leadership',
    },
  ];

  return (
    <section id="vision" className="relative py-28 bg-[#030e09] border-t border-emerald-500/15 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-lime-400/5 rounded-full blur-[140px] pointer-events-none" />

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
            <span>SECTION 01 • OUR VISION</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight"
          >
            A Campus That Gives{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-400">
              Back to Nature
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed"
          >
            The KRCE Green Campus initiative envisions engineering education existing in dynamic harmony with the ecosystem. By treating our campus as a living laboratory, we bridge academic technology with environmental responsibility.
          </motion.p>
        </div>

        {/* Split-Screen: Principles on Left, 3D Globe Visual on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: 3 Core Principles */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4">
              {principles.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={item.number}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.15 }}
                    className="group p-6 rounded-2xl bg-forest-900/60 hover:bg-forest-850/80 border border-emerald-500/20 hover:border-lime-400/40 backdrop-blur-md transition-all duration-300 shadow-glass-card hover:-translate-y-1"
                  >
                    <div className="flex items-start gap-4">
                      {/* Number Badge */}
                      <div className="w-12 h-12 rounded-xl bg-forest-950 border border-emerald-500/30 group-hover:border-lime-400/60 flex items-center justify-center shrink-0 transition-colors shadow-inner">
                        <span className="text-sm font-mono font-bold text-lime-300 group-hover:scale-110 transition-transform">
                          {item.number}
                        </span>
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                          <h3 className="text-lg font-bold text-white group-hover:text-lime-300 transition-colors font-display flex items-center gap-2">
                            <span>{item.title}</span>
                            <span className="text-slate-400 text-sm font-normal">— {item.subtitle}</span>
                          </h3>
                          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-forest-950 border border-emerald-500/30 text-[10px] font-mono text-emerald-400">
                            <IconComponent className="w-3 h-3 text-lime-400" />
                            <span>{item.badge}</span>
                          </div>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-2">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Academic proposal note */}
            <div className="p-4 rounded-xl bg-forest-950/70 border border-white/5 flex items-center gap-3 text-xs text-slate-400">
              <Globe2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                Demonstrating environmental stewardship aligned with UN Sustainable Development Goals (SDG 7, 11, 12 & 13) for KRCE college community.
              </span>
            </div>
          </div>

          {/* Right Column: Interactive 3D Environmental Globe */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full relative rounded-3xl bg-forest-950/90 border border-emerald-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.7)] p-4 overflow-hidden"
            >
              <div className="flex items-center justify-between px-3 py-2 border-b border-emerald-500/20 mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-lime-400" />
                  <span className="text-xs font-mono font-semibold text-slate-200">
                    ECOLOGICAL 3D PROJECTION
                  </span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400/90">
                  INTERACTIVE ELEMENT
                </span>
              </div>

              {/* Three.js Globe Component */}
              <ThreeGlobe />

              <div className="p-3 bg-forest-900/60 rounded-xl border border-white/5 mt-2 text-center">
                <p className="text-[11px] font-mono text-slate-300">
                  Global Sustainability Contextualized at KRCE Campus (Trichy)
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

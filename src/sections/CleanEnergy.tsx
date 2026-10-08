import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sun,
  Zap,
  Cpu,
  LineChart,
  Lightbulb,
  BatteryCharging,
  ArrowRight,
  ArrowDown,
  CheckCircle2
} from 'lucide-react';
import { cleanEnergyFeatures } from '../data/campusData';

export const CleanEnergy: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const energyPillars = [
    {
      title: 'Solar Photovoltaic Generation',
      subtitle: 'Capturing Trichy’s clean solar radiance',
      icon: Sun,
      stat: '10,000 kWh / Month Target',
      desc: 'Deploying high-efficiency monocrystalline solar panels atop Mechanical and ECE department blocks to displace heavy grid electricity demands during peak daylight laboratory sessions.',
      bullets: [
        'Tier-1 monocrystalline panels with >21% module efficiency',
        'Grid-tied synchronized string inverters with net metering',
        'Passive thermal cooling effect on top floor classrooms',
      ]
    },
    {
      title: 'Dusk-to-Dawn Smart LEDs',
      subtitle: 'Intelligent low-wattage illumination',
      icon: Lightbulb,
      stat: '60% Lighting Load Drop',
      desc: 'Complete retrofit of traditional fluorescent tubes and sodium pathway fixtures with energy-star rated, photocell-enabled LED luminaires across all college avenues.',
      bullets: [
        'Automatic ambient-light sensing activation at twilight',
        'Occupancy PIR motion sensors in lecture halls and labs',
        'Zero ultraviolet or infrared heat radiation emissions',
      ]
    },
    {
      title: 'Real-Time IoT Monitoring',
      subtitle: 'Precision engineering student telemetry',
      icon: LineChart,
      stat: '24/7 Live Telemetry',
      desc: 'Sub-metering every engineering department with smart digital transducers feeding telemetry into an open campus dashboard for electrical engineering student research.',
      bullets: [
        'Live sub-metering per block to spot phantom energy vampire drains',
        'Digital public dashboard in central library entrance foyer',
        'Automated spike alerts and power factor optimization',
      ]
    },
    {
      title: 'Energy Storage & Load Shifting',
      subtitle: 'Resilient buffer for critical equipment',
      icon: BatteryCharging,
      stat: 'Peak-Shaving Design',
      desc: 'Targeted lithium-ion buffer banks coupled to core research servers and emergency corridor lighting, insulating critical campus infrastructure from local grid brownouts.',
      bullets: [
        'High-density LiFePO4 battery chemistry for thermal safety',
        'Smart peak-shaving algorithm discharging during tariff highs',
        'Autonomous clean backup during regional storm outages',
      ]
    },
  ];

  return (
    <section id="energy" className="relative py-28 bg-[#030e09] border-t border-emerald-500/15 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-1/4 w-[700px] h-[500px] bg-amber-500/10 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[400px] bg-emerald-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-forest-900 border border-amber-400/30 text-amber-300 text-xs font-mono font-semibold uppercase mb-4"
          >
            <Sun className="w-3.5 h-3.5 text-amber-400" />
            <span>SECTION 07 • CLEAN RENEWABLE POWER</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight"
          >
            Powering Tomorrow{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-lime-400 to-emerald-400">
              Responsibly
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed"
          >
            Harnessing the high solar irradiance of Tamil Nadu to transform KRCE rooftops into active clean energy generators, coupled with smart telemetry and efficient LED infrastructure.
          </motion.p>
        </div>

        {/* Animated Energy Flow Diagram: ☀️ ↓ SOLAR ↓ ENERGY STORAGE ↓ CAMPUS USE */}
        <div className="mb-20 p-8 rounded-3xl bg-forest-950/80 border border-amber-400/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          <div className="text-center mb-6">
            <span className="text-xs font-mono text-amber-300 tracking-widest uppercase">
              RENEWABLE GENERATION TO CAMPUS CONVERSION ARCHITECTURE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            {cleanEnergyFeatures.map((f, idx) => {
              const icons = [Sun, Cpu, Zap, LineChart];
              const IconC = icons[idx];

              return (
                <div
                  key={f.step}
                  className="relative p-5 rounded-2xl bg-forest-900/60 border border-amber-400/20 hover:border-amber-400/50 backdrop-blur-md flex flex-col justify-between group transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono font-bold text-amber-300 px-2 py-0.5 rounded bg-forest-950 border border-amber-400/30">
                        {f.step}
                      </span>
                      <IconC className="w-4 h-4 text-amber-400 group-hover:scale-125 transition-transform" />
                    </div>
                    <h4 className="text-sm font-bold text-white font-display mb-1">
                      {f.title}
                    </h4>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      {f.desc}
                    </p>
                  </div>

                  {/* Flow arrow on desktop */}
                  {idx < 3 && (
                    <div className="hidden md:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-forest-950 border border-amber-400/40 items-center justify-center text-amber-300">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  )}

                  {/* Flow arrow on mobile */}
                  {idx < 3 && (
                    <div className="flex md:hidden justify-center pt-3 text-amber-400">
                      <ArrowDown className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 4 Energy Pillars Detail Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {energyPillars.map((pillar, idx) => {
            const IconP = pillar.icon;
            const isSelected = activeTab === idx;

            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => setActiveTab(idx)}
                className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-forest-850/90 border-amber-400/60 shadow-[0_10px_35px_rgba(0,0,0,0.6),0_0_20px_rgba(245,158,11,0.2)] -translate-y-1'
                    : 'bg-forest-900/50 border-emerald-500/20 hover:border-amber-400/40'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="p-3 rounded-xl bg-forest-950 border border-amber-400/30 text-amber-400 shrink-0">
                    <IconP className="w-6 h-6" />
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-amber-300 block">
                      {pillar.stat}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">Proposed Target</span>
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="text-xl font-bold text-white font-display">
                    {pillar.title}
                  </h3>
                  <p className="text-xs font-mono text-emerald-400 mt-0.5">
                    {pillar.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-2.5">
                    {pillar.desc}
                  </p>

                  <div className="mt-4 space-y-1.5 pt-3 border-t border-white/5">
                    {pillar.bullets.map((b, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-lime-400 shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

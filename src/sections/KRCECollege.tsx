import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, MapPin, ShieldCheck } from 'lucide-react';

export const KRCECollege: React.FC = () => {
  return (
    <section id="krce" className="relative py-28 bg-[#030d08] border-t border-emerald-500/15 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 w-[700px] h-[500px] bg-emerald-600/10 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-forest-900 border border-emerald-500/30 text-lime-300 text-xs font-mono font-semibold uppercase mb-4"
          >
            <GraduationCap className="w-3.5 h-3.5 text-lime-400" />
            <span>SECTION 11 • INSTITUTIONAL SPOTLIGHT</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight"
          >
            Green Vision for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-emerald-400 to-teal-300">
              KRCE
            </span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="flex items-center justify-center gap-2 text-sm sm:text-base font-semibold text-emerald-300 mt-2"
          >
            <span>K. Ramakrishnan College of Engineering</span>
            <span>•</span>
            <span className="text-slate-300 font-normal">Trichy, Tamil Nadu</span>
          </motion.div>
        </div>

        {/* College Vision Card with Split Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Visual Campus Presentation */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 relative rounded-3xl overflow-hidden bg-forest-950 border border-emerald-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
          >
            <div className="relative h-80 sm:h-96 w-full">
              <img
                src="/images/krce-entrance.jpg"
                alt="K. Ramakrishnan College of Engineering (KRCE) campus entrance"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/40 to-transparent" />

              {/* Badges in image */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className="px-3 py-1 rounded-full bg-forest-950/90 border border-lime-400/40 text-xs font-mono font-bold text-lime-300 backdrop-blur-md">
                  CAMPUS PROPOSAL 2026
                </span>
                <span className="px-3 py-1 rounded-full bg-forest-950/90 border border-emerald-500/40 text-xs font-mono text-emerald-300 backdrop-blur-md">
                  AUTONOMOUS INSTITUTION
                </span>
              </div>

              {/* Bottom Card in Image */}
              <div className="absolute bottom-4 left-6 right-6 p-4 rounded-xl bg-forest-900/90 border border-emerald-500/30 backdrop-blur-md">
                <div className="flex items-center gap-2 text-xs font-mono text-lime-400">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Samayapuram, Trichy – 621 112, Tamil Nadu</span>
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Renowned engineering institution nurturing technical excellence and community responsibility.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Explanatory Context & Framework */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="p-6 rounded-2xl bg-forest-900/60 border border-emerald-500/25 space-y-4 backdrop-blur-md">
              <h3 className="text-xl font-bold text-white font-display">
                Academic Project Mandate
              </h3>
              <blockquote className="text-sm sm:text-base text-slate-200 leading-relaxed italic border-l-2 border-lime-400 pl-4 py-1">
                "This project presents a proposed sustainability vision for KRCE, encouraging students, faculty and the campus community to work together toward responsible environmental practices."
              </blockquote>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Rather than treating Environmental Studies (EVS) as merely theoretical curriculum, this project outlines actionable, low-cost and high-impact interventions tailored for engineering students to implement across college departments.
              </p>
            </div>

            {/* 3 Academic Vision Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-forest-950/80 border border-white/5 text-center space-y-1">
                <span className="text-xs font-mono font-bold text-lime-400 block">STUDENTS</span>
                <p className="text-[11px] text-slate-300">Active eco-club engagement & practical engineering projects.</p>
              </div>
              <div className="p-4 rounded-xl bg-forest-950/80 border border-white/5 text-center space-y-1">
                <span className="text-xs font-mono font-bold text-emerald-400 block">FACULTY</span>
                <p className="text-[11px] text-slate-300">Mentorship in sustainable lab designs & green innovation.</p>
              </div>
              <div className="p-4 rounded-xl bg-forest-950/80 border border-white/5 text-center space-y-1">
                <span className="text-xs font-mono font-bold text-cyan-400 block">CAMPUS</span>
                <p className="text-[11px] text-slate-300">Living laboratory for solar, water and circular waste cycles.</p>
              </div>
            </div>

            {/* Strict Authenticity Disclaimer */}
            <div className="p-4 rounded-xl bg-forest-950 border border-emerald-500/25 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-lime-400 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-300 space-y-1">
                <span className="font-mono font-semibold text-lime-300">
                  Authenticity & Integrity Standard
                </span>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  In compliance with academic standards, this portal outlines a proposed framework. It deliberately avoids making unverified claims regarding historical emissions or official certifications, prioritizing honest, forward-looking student innovation.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

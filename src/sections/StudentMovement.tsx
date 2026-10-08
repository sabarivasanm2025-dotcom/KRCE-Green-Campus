import React from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Calendar,
  UserCheck,
  HeartHandshake
} from 'lucide-react';
import { studentActivities } from '../data/campusData';

interface StudentMovementProps {
  onOpenVolunteerModal: (preferredActivity?: string) => void;
}

export const StudentMovement: React.FC<StudentMovementProps> = ({ onOpenVolunteerModal }) => {
  return (
    <section id="activities" className="relative py-28 bg-[#030d08] border-t border-emerald-500/15 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-emerald-600/10 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-forest-900 border border-emerald-500/30 text-lime-300 text-xs font-mono font-semibold uppercase mb-4"
          >
            <Users className="w-3.5 h-3.5 text-lime-400" />
            <span>SECTION 09 • STUDENT LEADERSHIP</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight"
          >
            Students Are the{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-emerald-400 to-teal-300">
              Change
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed"
          >
            Engineering innovation meets environmental civic duty. Explore the active drives, workshops, and awareness campaigns organized by KRCE student green leaders.
          </motion.p>

          {/* Main Volunteer Call to Action Button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => onOpenVolunteerModal()}
              className="px-8 py-3.5 rounded-full font-bold text-sm text-slate-950 bg-gradient-to-r from-lime-400 via-emerald-400 to-teal-300 hover:from-lime-300 hover:to-teal-200 shadow-[0_0_30px_rgba(163,230,53,0.35)] hover:shadow-[0_0_40px_rgba(163,230,53,0.6)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5"
            >
              <HeartHandshake className="w-4 h-4 text-slate-950" />
              <span>Become a Green Volunteer</span>
            </button>
          </div>
        </div>

        {/* 8 Student Activity Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {studentActivities.map((act, idx) => (
            <motion.div
              key={act.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group rounded-2xl overflow-hidden bg-forest-900/60 border border-emerald-500/25 hover:border-lime-400/50 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_15px_30px_rgba(0,0,0,0.7)] flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="relative h-44 w-full overflow-hidden">
                  <img
                    src={act.image}
                    alt={act.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-900 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-forest-950/80 border border-white/10 text-[10px] font-mono text-lime-300 backdrop-blur-md">
                    {act.category}
                  </span>
                </div>

                {/* Body */}
                <div className="p-5 space-y-2">
                  <h3 className="text-base font-bold text-white group-hover:text-lime-300 transition-colors font-display">
                    {act.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                    {act.description}
                  </p>

                  <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-emerald-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-lime-400" />
                      {act.schedule}
                    </span>
                    <span className="text-slate-400">
                      {act.volunteersNeeded}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => onOpenVolunteerModal(act.title)}
                  className="w-full py-2 rounded-xl bg-forest-950 hover:bg-forest-800 border border-emerald-500/30 hover:border-lime-400/40 text-xs font-mono font-semibold text-lime-300 hover:text-white transition-all flex items-center justify-center gap-1.5"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Join This Activity</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

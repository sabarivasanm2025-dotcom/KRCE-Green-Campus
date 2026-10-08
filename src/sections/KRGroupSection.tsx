import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, MapPin, ExternalLink, Leaf, ChevronDown, ChevronUp } from 'lucide-react';
import type { InstitutionCard } from '../types';
import { institutionsData } from '../data/institutionsData';

// ─────────────────────────────────────────────────────────────────────────────
// Institution Card Component
// ─────────────────────────────────────────────────────────────────────────────

const InstitutionCardItem: React.FC<{ institution: InstitutionCard; index: number }> = ({
  institution,
  index,
}) => {
  const [imgError, setImgError] = useState(false);
  const [highlightsOpen, setHighlightsOpen] = useState(false);

  const fallbackImage =
    'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80';

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col rounded-3xl overflow-hidden
                 bg-forest-900/60 border border-emerald-500/20
                 shadow-[0_8px_40px_rgba(0,0,0,0.55)]
                 hover:border-lime-400/40
                 hover:shadow-[0_16px_60px_rgba(52,211,153,0.12)]
                 transition-all duration-500 backdrop-blur-sm"
    >
      {/* ── Campus Image ── */}
      <div className="relative h-56 sm:h-64 overflow-hidden">
        <motion.img
          src={imgError ? fallbackImage : institution.image}
          alt={`${institution.fullName} campus`}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover transition-transform duration-700
                     group-hover:scale-105"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030d08] via-[#030d08]/30 to-transparent" />

        {/* Short name badge */}
        <div className="absolute top-4 left-4">
          <span
            className="px-3 py-1 rounded-full text-xs font-mono font-bold
                          bg-forest-950/90 border border-lime-400/40 text-lime-300
                          backdrop-blur-md"
          >
            {institution.shortName}
          </span>
        </div>

        {/* Website link */}
        {institution.websiteUrl && (
          <a
            href={institution.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-4 right-4 p-2 rounded-full
                       bg-forest-950/80 border border-emerald-500/30
                       text-emerald-300 hover:text-lime-300
                       hover:border-lime-400/50 transition-all duration-300
                       backdrop-blur-md"
            aria-label={`Visit ${institution.shortName} website`}
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}

        {/* Location strip */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-1.5 text-[11px] font-mono text-slate-300">
          <MapPin className="w-3 h-3 text-lime-400 shrink-0" />
          <span className="truncate">{institution.location}</span>
        </div>
      </div>

      {/* ── Card Body ── */}
      <div className="flex flex-col flex-1 p-6 space-y-4">
        {/* Full Name + Tagline */}
        <div>
          <h3 className="text-lg font-extrabold text-white font-display leading-snug">
            {institution.fullName}
          </h3>
          <p className="text-xs font-mono text-lime-400 mt-0.5">{institution.tagline}</p>
        </div>

        {/* Affiliation */}
        <div className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-1.5">
          {institution.affiliation}
        </div>

        {/* Description */}
        <p className="text-sm text-slate-300 leading-relaxed line-clamp-3">
          {institution.description}
        </p>

        {/* Metrics Row */}
        <div className="grid grid-cols-3 gap-2">
          {institution.metrics.map((m) => (
            <div
              key={m.label}
              className="p-2.5 rounded-xl bg-forest-950/70 border border-white/5 text-center"
            >
              <span className="block text-sm font-bold text-lime-300">{m.value}</span>
              <span className="block text-[10px] text-slate-400 leading-tight mt-0.5">
                {m.label}
              </span>
            </div>
          ))}
        </div>

        {/* Green Focus Tag */}
        <div className="flex items-center gap-2">
          <Leaf className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="text-[11px] text-emerald-300 font-medium">{institution.greenFocus}</span>
        </div>

        {/* Expandable Highlights */}
        <div className="border-t border-emerald-500/15 pt-3">
          <button
            onClick={() => setHighlightsOpen((prev) => !prev)}
            className="flex items-center justify-between w-full text-left group/btn"
          >
            <span className="text-xs font-mono font-semibold text-slate-300 group-hover/btn:text-lime-300 transition-colors">
              Green Highlights
            </span>
            <motion.span
              animate={{ rotate: highlightsOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {highlightsOpen ? (
                <ChevronUp className="w-4 h-4 text-lime-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              )}
            </motion.span>
          </button>

          <motion.div
            initial={false}
            animate={{ height: highlightsOpen ? 'auto' : 0, opacity: highlightsOpen ? 1 : 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <ul className="mt-3 space-y-1.5">
              {institution.greenHighlights.map((highlight, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime-400 shrink-0 mt-1.5" />
                  {highlight}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Main Section
// ─────────────────────────────────────────────────────────────────────────────

export const KRGroupSection: React.FC = () => {
  return (
    <section
      id="kr-group"
      className="relative py-28 bg-[#030d08] border-t border-emerald-500/15 overflow-hidden"
    >
      {/* Ambient glow blobs */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[400px] bg-emerald-600/8 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/5 w-[500px] h-[350px] bg-lime-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ── Section Header ── */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full
                       bg-forest-900 border border-emerald-500/30
                       text-lime-300 text-xs font-mono font-semibold uppercase mb-4"
          >
            <Building2 className="w-3.5 h-3.5 text-lime-400" />
            <span>KR GROUP OF INSTITUTIONS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight"
          >
            One Group.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-emerald-400 to-teal-300">
              Three Institutions.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.18 }}
            className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            One educational group. Three institutions. One shared vision for a greener future.
          </motion.p>

          {/* Decorative connector line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
            className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-lime-400/60 to-transparent origin-center"
          />
        </div>

        {/* ── Institution Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
          {institutionsData.map((institution, index) => (
            <InstitutionCardItem key={institution.id} institution={institution} index={index} />
          ))}
        </div>

        {/* ── Bottom Note ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-14 text-center"
        >
          <p className="text-xs font-mono text-slate-500 max-w-xl mx-auto leading-relaxed">
            Metrics shown are{' '}
            <span className="text-lime-400/70 font-semibold">Proposed Targets</span> and{' '}
            <span className="text-lime-400/70 font-semibold">Illustrative Data</span> for academic
            project purposes. They do not represent officially verified or historical records.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

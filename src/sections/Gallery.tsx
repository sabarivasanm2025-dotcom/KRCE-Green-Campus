import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, Eye } from 'lucide-react';
import { galleryItems } from '../data/campusData';
import type { GalleryItem } from '../types';

interface GalleryProps {
  onOpenLightbox: (item: GalleryItem) => void;
}

export const Gallery: React.FC<GalleryProps> = ({ onOpenLightbox }) => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const categories = ['ALL', 'CAMPUS', 'NATURE', 'STUDENTS', 'ENERGY', 'WASTE', 'WATER'];

  const filteredItems =
    activeCategory === 'ALL'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <section id="gallery" className="relative py-28 bg-[#020905] border-t border-emerald-500/15 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-emerald-600/10 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-forest-900 border border-emerald-500/30 text-lime-300 text-xs font-mono font-semibold uppercase mb-4"
          >
            <ImageIcon className="w-3.5 h-3.5 text-lime-400" />
            <span>SECTION 10 • VISUAL ARCHIVE</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight"
          >
            Campus Visual{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-emerald-400 to-teal-300">
              Showcase
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed"
          >
            A curated photographic exhibition presenting proposed architectural interventions, student field activities, renewable energy arrays, and lush campus habitats.
          </motion.p>
        </div>

        {/* Filter Buttons Navigation */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 no-scrollbar mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all duration-300 shrink-0 border ${
                activeCategory === cat
                  ? 'bg-lime-400 text-slate-950 border-lime-300 shadow-[0_0_20px_rgba(163,230,53,0.35)] scale-105'
                  : 'bg-forest-900/60 text-slate-300 border-emerald-500/20 hover:border-emerald-400/50 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry-Style Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                onClick={() => onOpenLightbox(item)}
                className="group relative cursor-pointer rounded-2xl overflow-hidden bg-forest-900 border border-emerald-500/25 hover:border-lime-400/60 transition-all duration-500 shadow-glass-card hover:-translate-y-1.5"
                data-cursor="view"
              >
                {/* Image */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  {/* Top Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full bg-forest-950/80 border border-white/10 text-[10px] font-mono font-semibold text-lime-300 backdrop-blur-md">
                      {item.category}
                    </span>
                  </div>

                  {/* Hover Eye Indicator */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="p-3.5 rounded-full bg-forest-950/80 border border-lime-400 text-lime-300 shadow-[0_0_20px_#bef264] transform scale-75 group-hover:scale-100 transition-transform">
                      <Eye className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Bottom Captions */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-base font-bold text-white font-display group-hover:text-lime-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-300 line-clamp-1 mt-0.5">
                      {item.caption}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-12 text-center text-xs font-mono text-slate-400">
          ✦ Illustrative environmental photography presented for KRCE academic EVS demonstration
        </div>
      </div>
    </section>
  );
};

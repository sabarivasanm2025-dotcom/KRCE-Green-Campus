import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Tag } from 'lucide-react';
import type { GalleryItem } from '../types';

interface LightboxModalProps {
  item: GalleryItem | null;
  items: GalleryItem[];
  onClose: () => void;
  onNavigate: (newItem: GalleryItem) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  item,
  items,
  onClose,
  onNavigate,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!item) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    if (item) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, items, onClose]);

  if (!item) return null;

  const currentIndex = items.findIndex((i) => i.id === item.id);

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % items.length;
    onNavigate(items[nextIdx]);
  };

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + items.length) % items.length;
    onNavigate(items[prevIdx]);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 select-none">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#020905]/95 backdrop-blur-xl"
        />

        {/* Content Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.3 }}
          className="relative max-w-5xl w-full flex flex-col items-center z-10"
        >
          {/* Top Controls */}
          <div className="w-full flex items-center justify-between pb-3 text-slate-300">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-forest-900 border border-emerald-500/30 text-xs font-mono text-lime-300">
                {item.category}
              </span>
              <span className="text-xs font-mono text-slate-400">
                {currentIndex + 1} / {items.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-forest-900/80 hover:bg-forest-800 border border-white/20 text-white transition-colors"
              aria-label="Close image viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Visual with Nav Arrows */}
          <div className="relative w-full max-h-[70vh] rounded-2xl overflow-hidden bg-forest-950 border border-emerald-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex items-center justify-center">
            <img
              src={item.url}
              alt={item.title}
              className="max-h-[70vh] w-full object-contain select-none"
            />

            {/* Left Prev Arrow */}
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-forest-950/80 hover:bg-forest-900 border border-white/20 text-white hover:text-lime-300 transition-all hover:scale-105"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Next Arrow */}
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-forest-950/80 hover:bg-forest-900 border border-white/20 text-white hover:text-lime-300 transition-all hover:scale-105"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Caption & Tag */}
          <div className="w-full pt-4 px-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-lg font-bold text-white font-display">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                {item.caption}
              </p>
            </div>
            <div className="flex items-center gap-1.5 self-start sm:self-center px-3 py-1 rounded-full bg-forest-900/90 border border-lime-400/30 text-xs font-mono text-lime-300">
              <Tag className="w-3.5 h-3.5 text-lime-400" />
              <span>{item.tag}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

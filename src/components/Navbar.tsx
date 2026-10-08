import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenVolunteerModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenVolunteerModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Vision', href: '#vision' },
    { name: 'Initiatives', href: '#initiatives' },
    { name: 'Impact', href: '#impact' },
    { name: 'Activities', href: '#activities' },
    { name: 'Gallery', href: '#gallery' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Check current section in view
      const sections = ['hero', 'vision', 'initiatives', 'journey', 'impact', 'score', 'water', 'energy', 'biodiversity', 'activities', 'gallery', 'krce'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'py-3 bg-[#030d08]/85 backdrop-blur-xl border-b border-emerald-500/20 shadow-[0_10px_30px_rgba(0,0,0,0.6)]'
            : 'py-6 bg-transparent border-b border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleScrollTo(e, '#hero')}
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-lime-400 rounded-lg p-1"
          >
            <div className="relative w-10 h-10 rounded-xl bg-forest-850 border border-emerald-500/40 flex items-center justify-center shadow-lg group-hover:border-lime-400 transition-all duration-300">
              <Leaf className="w-5 h-5 text-lime-400 group-hover:scale-110 transition-transform duration-300" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping opacity-75" />
            </div>
            <div className="flex flex-col leading-none">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-black tracking-widest text-slate-100 font-display">GREEN</span>
                <span className="text-sm font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-400 font-display">CAMPUS</span>
              </div>
              <span className="text-[10px] font-mono tracking-wider text-emerald-400 font-semibold mt-0.5">
                KRCE • TRICHY
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 p-1.5 rounded-full bg-forest-900/60 border border-emerald-500/20 backdrop-blur-md shadow-inner">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className={`relative px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-300 ${
                    isActive
                      ? 'text-lime-300 bg-emerald-950/80 shadow-[0_0_15px_rgba(163,230,53,0.25)] border border-lime-400/30'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Right Action / CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onOpenVolunteerModal}
              className="relative inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold text-slate-950 bg-gradient-to-r from-lime-400 to-emerald-400 hover:from-lime-300 hover:to-emerald-300 shadow-[0_0_20px_rgba(163,230,53,0.35)] hover:shadow-[0_0_30px_rgba(163,230,53,0.6)] active:scale-95 transition-all duration-300"
            >
              <Sparkles className="w-3.5 h-3.5 text-slate-900" />
              <span>Join the Movement</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-forest-900/80 border border-emerald-500/30 text-slate-200 hover:text-lime-400 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#030d08]/95 backdrop-blur-2xl flex flex-col justify-between pt-24 pb-8 px-6 md:hidden"
          >
            <div className="flex flex-col gap-3">
              <span className="text-[11px] font-mono tracking-widest text-emerald-400 uppercase">
                Explore Navigation
              </span>
              <nav className="flex flex-col gap-2 mt-2">
                {navLinks.map((link, idx) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-forest-900/50 border border-emerald-500/20 text-slate-200 hover:text-lime-400 hover:border-lime-400/40 text-base font-medium transition-all"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                  </motion.a>
                ))}
              </nav>
            </div>

            <div className="pt-6 border-t border-emerald-500/20 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenVolunteerModal();
                }}
                className="w-full py-3.5 rounded-xl font-semibold text-slate-950 bg-gradient-to-r from-lime-400 to-emerald-400 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(163,230,53,0.35)]"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>Join the Movement</span>
              </button>
              <p className="text-[11px] text-center text-slate-400 font-mono">
                K. Ramakrishnan College of Engineering • EVS 2026
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

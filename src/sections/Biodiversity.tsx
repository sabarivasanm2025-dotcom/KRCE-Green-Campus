import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trees,
  Flower2,
  Bird,
  Compass,
  Sprout,
  ChevronRight
} from 'lucide-react';

export const Biodiversity: React.FC = () => {
  const [activeItem, setActiveItem] = useState<number>(0);

  const biodiversityPillars = [
    {
      id: 'native-trees',
      title: 'Native Trees Sanctuary',
      species: 'Azadirachta indica (Neem), Pongamia pinnata (Pungan), Ficus religiosa (Peepal)',
      tag: '500+ Saplings Proposed Target',
      image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
      desc: 'Planting drought-resistant indigenous Tamil Nadu tree species that thrive in semi-arid soils, creating dense canopy shade that lowers surrounding sidewalk temperatures by 2–3°C.',
      benefits: [
        'High particulate air filtration and oxygen production',
        'Deep root networks that stabilize topsoil and aid groundwater absorption',
        'Zero synthetic pesticide requirements'
      ],
      icon: Trees,
    },
    {
      id: 'pollinator-gardens',
      title: 'Pollinator Butterfly Gardens',
      species: 'Lantana camara, Ixora coccinea, Cosmos sulphureus, Calotropis',
      tag: 'Pollinator Habitats',
      image: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1200&q=80',
      desc: 'Dedicated nectar-rich perennial flower beds attracting honeybees, stingless bees, and native butterflies, restoring crucial pollination corridors around campus agricultural zones.',
      benefits: [
        'Protection of endangered local insect species',
        'Natural biological pest suppression across campus greenery',
        'Interactive entomology study zone for life sciences students'
      ],
      icon: Flower2,
    },
    {
      id: 'bird-spaces',
      title: 'Bird-Friendly Sanctuaries',
      species: 'Indian Silverbill, Purple Sunbird, Spotted Dove, Common Myna',
      tag: 'Avian Conservation',
      image: 'https://images.unsplash.com/photo-1520808663317-647b476a81b9?auto=format&fit=crop&w=1200&q=80',
      desc: 'Integration of stone bird baths, fruit-bearing berry shrubs, and elevated earthen water bowls across quiet campus courtyards providing sanctuary for local Trichy avian species.',
      benefits: [
        'Year-round clean hydration during scorching summer months',
        'Natural seed dispersal across campus perimeter boundaries',
        'Acoustically soothing natural campus soundscapes'
      ],
      icon: Bird,
    },
    {
      id: 'green-corridors',
      title: 'Biophilic Green Corridors',
      species: 'Bougainvillea spectabilis, Tecoma stans, Vernonia elaeagnifolia',
      tag: 'Microclimate Cooling',
      image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80',
      desc: 'Continuous shaded pergolas and vertical green trellis screens connecting academic departments, shielding walking students from direct noon sunlight while filtering breezes.',
      benefits: [
        'Encourages walking and pedestrian commuting across departments',
        'Vertical trellis foliage blocks solar radiant heat on classroom walls',
        'Aesthetic green vistas replacing stark concrete facades'
      ],
      icon: Compass,
    },
    {
      id: 'campus-gardens',
      title: 'Botanical & Medicinal Herbarium',
      species: 'Ocimum sanctum (Tulsi), Aloe vera, Senna auriculata (Avaram)',
      tag: 'Educational Herbarium',
      image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1200&q=80',
      desc: 'A curated herbal garden showcasing traditional Siddha and Ayurvedic medicinal flora of Tamil Nadu, each tagged with digital QR codes explaining their pharmacological relevance.',
      benefits: [
        'Preservation of indigenous herbal knowledge among students',
        'On-campus nursery producing organic saplings for college events',
        'Nourished entirely by compost produced in hostel dining pits'
      ],
      icon: Sprout,
    },
  ];

  return (
    <section id="biodiversity" className="relative py-28 bg-[#020a06] border-t border-emerald-500/15 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/3 w-[800px] h-[500px] bg-emerald-600/10 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-forest-900 border border-emerald-500/30 text-lime-300 text-xs font-mono font-semibold uppercase mb-4"
          >
            <Trees className="w-3.5 h-3.5 text-lime-400" />
            <span>SECTION 08 • ECOLOGICAL REGENERATION</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight"
          >
            Let Nature{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-emerald-400 to-teal-300">
              Thrive
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed"
          >
            Restoring native flora, pollinator havens, and avian sanctuaries across KRCE to replace sterile concrete surfaces with vibrant, self-sustaining micro-ecosystems.
          </motion.p>
        </div>

        {/* Interactive Biodiversity Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Selector Navigation */}
          <div className="lg:col-span-5 space-y-3">
            {biodiversityPillars.map((item, idx) => {
              const IconC = item.icon;
              const isSelected = activeItem === idx;

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveItem(idx)}
                  className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between gap-4 ${
                    isSelected
                      ? 'bg-forest-850 border-lime-400/60 shadow-[0_10px_25px_rgba(0,0,0,0.5),0_0_20px_rgba(163,230,53,0.15)] -translate-x-1'
                      : 'bg-forest-900/50 border-emerald-500/20 hover:border-emerald-500/40 hover:bg-forest-900/80'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`p-2.5 rounded-xl border ${
                      isSelected ? 'bg-forest-950 border-lime-400 text-lime-400' : 'bg-forest-950/80 border-white/5 text-slate-400'
                    }`}>
                      <IconC className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white font-display">
                        {item.title}
                      </h4>
                      <span className="text-[11px] font-mono text-emerald-400">
                        {item.tag}
                      </span>
                    </div>
                  </div>

                  <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-lime-400 translate-x-1' : 'text-slate-500'}`} />
                </div>
              );
            })}
          </div>

          {/* Right Column: Dynamic Deep-Dive Feature Card */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {(() => {
                const cur = biodiversityPillars[activeItem];
                return (
                  <motion.div
                    key={cur.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-3xl bg-forest-900/70 border border-emerald-500/30 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl"
                  >
                    {/* Feature Image */}
                    <div className="relative h-64 sm:h-80 w-full overflow-hidden">
                      <img
                        src={cur.image}
                        alt={cur.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-forest-900 via-forest-900/40 to-transparent" />
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-forest-950/80 border border-lime-400/40 text-[11px] font-mono text-lime-300 backdrop-blur-md">
                        {cur.tag}
                      </div>
                      <div className="absolute bottom-4 left-6 right-6">
                        <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
                          {cur.title}
                        </h3>
                        <p className="text-xs text-lime-300 font-mono mt-1">
                          Key Species: {cur.species}
                        </p>
                      </div>
                    </div>

                    {/* Feature Details */}
                    <div className="p-6 sm:p-8 space-y-5">
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {cur.desc}
                      </p>

                      <div className="space-y-2.5 pt-4 border-t border-white/5">
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 block">
                          Ecological Advantages for KRCE
                        </span>
                        {cur.benefits.map((b, i) => (
                          <div key={i} className="flex items-center gap-2.5 text-xs text-slate-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-lime-400" />
                            <span>{b}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-slate-400">
                        <span>Academic EVS Biodiversity Blueprint</span>
                        <span className="text-lime-300">Proposed Target: 500+ Trees</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })()}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

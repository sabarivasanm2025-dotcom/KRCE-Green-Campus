import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { CustomCursor } from './components/CustomCursor';
import { ParallaxLeaves } from './components/ParallaxLeaves';
import { Loader } from './components/Loader';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { InitiativeModal } from './components/InitiativeModal';
import { VolunteerModal } from './components/VolunteerModal';
import { LightboxModal } from './components/LightboxModal';

// Sections
import { Hero } from './sections/Hero';
import { Vision } from './sections/Vision';
import { Initiatives } from './sections/Initiatives';
import { Journey } from './sections/Journey';
import { ImpactDashboard } from './sections/ImpactDashboard';
import { GreenScore } from './sections/GreenScore';
import { WaterConservation } from './sections/WaterConservation';
import { CleanEnergy } from './sections/CleanEnergy';
import { Biodiversity } from './sections/Biodiversity';
import { StudentMovement } from './sections/StudentMovement';
import { Gallery } from './sections/Gallery';
import { KRCECollege } from './sections/KRCECollege';
import { KRGroupSection } from './sections/KRGroupSection';
import { FutureVision } from './sections/FutureVision';
import { FinalCTA } from './sections/FinalCTA';

// Data types
import type { Initiative, GalleryItem } from './types';
import { galleryItems } from './data/campusData';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedInitiative, setSelectedInitiative] = useState<Initiative | null>(null);
  const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false);
  const [volunteerDefaultActivity, setVolunteerDefaultActivity] = useState<string | undefined>(undefined);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);

  const handleOpenVolunteerModal = (preferredActivity?: string) => {
    setVolunteerDefaultActivity(preferredActivity);
    setIsVolunteerModalOpen(true);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#030d08] text-slate-100 selection:bg-lime-400/30 selection:text-lime-200 overflow-x-hidden font-sans">
      {/* Short Premium Animated Loader Screen */}
      <AnimatePresence>
        {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* Desktop Custom Cursor */}
      <CustomCursor />

      {/* Ambient Parallax Environmental Foliage & Particles */}
      <ParallaxLeaves />

      {/* Floating Glassmorphic Navigation */}
      <Navbar onOpenVolunteerModal={() => handleOpenVolunteerModal()} />

      {/* Main Content Layout */}
      <main className="relative z-20">
        {/* Hero Section */}
        <Hero
          onExploreVision={() => scrollToSection('vision')}
          onViewInitiatives={() => scrollToSection('initiatives')}
        />

        {/* Section 01: Vision (Split screen with 3 principles + 3D Earth Globe) */}
        <Vision />

        {/* Section 02: Core Green Campus Initiatives */}
        <Initiatives onSelectInitiative={(init) => setSelectedInitiative(init)} />

        {/* Section 03: Environmental Journey Roadmap */}
        <Journey />

        {/* Section 04: Impact Dashboard & Proposed Project Targets */}
        <ImpactDashboard />

        {/* Section 05: Interactive Green Score Assessment Tool */}
        <GreenScore />

        {/* Section 06: Water Conservation & Closed-Loop Hydrology */}
        <WaterConservation />

        {/* Section 07: Clean Renewable Energy Infrastructure */}
        <CleanEnergy />

        {/* Section 08: Biodiversity & Indigenous Habitats */}
        <Biodiversity />

        {/* Section 09: Student Movement & Activities */}
        <StudentMovement onOpenVolunteerModal={handleOpenVolunteerModal} />

        {/* Section 10: Curated Gallery & Photography Archive */}
        <Gallery onOpenLightbox={(item) => setSelectedGalleryItem(item)} />

        {/* Section 11: Dedicated KRCE College Section */}
        <KRCECollege />

        {/* Section 11b: KR Group of Institutions */}
        <KRGroupSection />

        {/* Section 12: Future Vision (Next-Gen Eco-Tech) */}
        <FutureVision />

        {/* Section 13: Final Cinematic CTA */}
        <FinalCTA onStartJourney={() => handleOpenVolunteerModal()} />
      </main>

      {/* Premium Dark College Footer */}
      <Footer />

      {/* Detailed Full-Screen Initiative Modal */}
      <InitiativeModal
        initiative={selectedInitiative}
        onClose={() => setSelectedInitiative(null)}
        onOpenVolunteer={() => handleOpenVolunteerModal(selectedInitiative?.title)}
      />

      {/* Student Volunteer Registration Modal */}
      <VolunteerModal
        isOpen={isVolunteerModalOpen}
        onClose={() => setIsVolunteerModalOpen(false)}
        defaultPreference={volunteerDefaultActivity}
      />

      {/* Gallery Lightbox Modal */}
      <LightboxModal
        item={selectedGalleryItem}
        items={galleryItems}
        onClose={() => setSelectedGalleryItem(null)}
        onNavigate={(newItem) => setSelectedGalleryItem(newItem)}
      />
    </div>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import GalleryGrid from './components/GalleryGrid';
import AboutSection from './components/AboutSection';
import ArtworkModal from './components/ArtworkModal';
import { Artwork } from './types';
import { ARTWORKS } from './data/artworks';
import { Instagram, Mail, MapPin } from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState<'collection' | 'about'>('collection');
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  // Deep-linking: look for '?artwork=art-id' in the URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const artworkId = params.get('artwork');
    if (artworkId) {
      const match = ARTWORKS.find(art => art.id === artworkId);
      if (match) {
        setSelectedArtwork(match);
        setActiveView('collection'); // Switch to full collection view so the context matches
      }
    }
  }, []);

  // Cycle Next artwork in the light box modal
  const handleNextArtwork = () => {
    if (!selectedArtwork) return;
    const currentIndex = ARTWORKS.findIndex(art => art.id === selectedArtwork.id);
    const nextIndex = (currentIndex + 1) % ARTWORKS.length;
    setSelectedArtwork(ARTWORKS[nextIndex]);
  };

  // Cycle Previous artwork in the light box modal
  const handlePrevArtwork = () => {
    if (!selectedArtwork) return;
    const currentIndex = ARTWORKS.findIndex(art => art.id === selectedArtwork.id);
    const prevIndex = (currentIndex - 1 + ARTWORKS.length) % ARTWORKS.length;
    setSelectedArtwork(ARTWORKS[prevIndex]);
  };

  return (
    <div id="gallery-app-root" className="min-h-screen bg-[#F5F2ED] flex flex-col selection:bg-[#2D2D2A]/15 selection:text-[#2D2D2A]">
      {/* Prime Header Navigation */}
      <Navbar activeView={activeView} setActiveView={setActiveView} />

      {/* Main Container Stage */}
      <main className="flex-grow">
        {activeView === 'collection' && (
          <div id="full-portfolio-section" className="animate-fade-in">
            {/* Header introduction */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 text-center md:text-left flex flex-col md:flex-row items-baseline justify-between border-b border-[#2D2D2A]/10 pb-4">
              <div>
                <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#2D2D2A] tracking-tight">
                  The Full Portfolio
                </h2>
                <p className="text-[#2D2D2A]/60 text-xs sm:text-sm mt-1.5 max-w-xl font-sans font-light">
                  Browse through active series and historic studies of original southwestern works.
                </p>
              </div>
              <span className="font-sans text-[10px] tracking-widest font-semibold text-[#2D2D2A]/40 mt-2 md:mt-0 uppercase">
                {ARTWORKS.length} Paintings In Catalog
              </span>
            </div>

            <GalleryGrid onSelectArtwork={(art) => setSelectedArtwork(art)} />
          </div>
        )}

        {activeView === 'about' && (
          <div id="artist-statement-section" className="animate-fade-in">
            <AboutSection />
          </div>
        )}
      </main>

      {/* Detailed Lightbox Artwork Inspect Modal */}
      <ArtworkModal
        artwork={selectedArtwork}
        onClose={() => setSelectedArtwork(null)}
        onNext={handleNextArtwork}
        onPrev={handlePrevArtwork}
      />

      {/* Pristine Museum Footer */}
      <footer className="bg-[#EAE7E2] border-t border-[#2D2D2A]/10 mt-20 py-12 text-[#2D2D2A]/70 text-xs font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Left description */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <span className="font-serif text-[#2D2D2A] tracking-tight text-sm sm:text-base font-normal">
                Linda DeLuca Art Studio
              </span>
              <span className="font-sans text-[10px] tracking-widest font-semibold text-[#2D2D2A]/40 mt-1 uppercase">
                London, Ontario • Contemporary Folk Expressionism
              </span>
            </div>

            {/* Middle links */}
            <div className="flex items-center gap-6 justify-center font-medium">
              <a 
                id="footer-instagram-link"
                href="https://instagram.com/lindadeluca_art" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-[#2D2D2A] transition-colors"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>Instagram</span>
              </a>
              <a 
                id="footer-email-link"
                href="mailto:deluca77@gmail.com"
                className="flex items-center gap-1.5 hover:text-[#2D2D2A] transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>deluca77@gmail.com</span>
              </a>
            </div>

            {/* Right Copyright info */}
            <div className="text-center md:text-right text-[10px] text-[#2D2D2A]/40 font-light">
              <p>© {new Date().getFullYear()} Linda DeLuca Art Studio.</p>
              <p className="mt-0.5">All Rights Reserved • Crafted with Minimalist Discipline</p>
            </div>

          </div>
        </div>
      </footer>
    </div>
  );
}

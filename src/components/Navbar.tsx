import React from 'react';
import { Eye, Grid, Sparkles } from 'lucide-react';

interface NavbarProps {
  activeView: 'collection' | 'about';
  setActiveView: (view: 'collection' | 'about') => void;
}

export default function Navbar({ activeView, setActiveView }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-[#F5F2ED]/85 backdrop-blur-md border-b border-[#2D2D2A]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo / Artist Name */}
          <div className="flex flex-col">
            <h1 
              id="artist-brand-title"
              className="font-serif text-xl sm:text-2xl font-light tracking-tight text-[#2D2D2A] cursor-pointer transition-opacity hover:opacity-80"
              onClick={() => setActiveView('collection')}
            >
              Linda DeLuca
            </h1>
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase font-medium text-[#2D2D2A]/60 mt-0.5">
              Contemporary Fine Art
            </span>
          </div>

          {/* Navigation Menu */}
          <nav className="flex items-center gap-2 sm:gap-4">
            <button
              id="nav-btn-collection"
              className={`flex items-center gap-1.5 px-3 py-2 text-[11px] font-sans font-medium uppercase tracking-widest transition-all duration-300 ${
                activeView === 'collection'
                  ? 'text-[#2D2D2A] border-b-2 border-[#2D2D2A] pb-1'
                  : 'text-[#2D2D2A]/50 hover:text-[#2D2D2A] border-b-2 border-transparent pb-1'
              }`}
              onClick={() => setActiveView('collection')}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Collection</span>
            </button>

            <button
              id="nav-btn-about"
              className={`flex items-center gap-1.5 px-3 py-2 text-[11px] font-sans font-medium uppercase tracking-widest transition-all duration-300 ${
                activeView === 'about'
                  ? 'text-[#2D2D2A] border-b-2 border-[#2D2D2A] pb-1'
                  : 'text-[#2D2D2A]/50 hover:text-[#2D2D2A] border-b-2 border-transparent pb-1'
              }`}
              onClick={() => setActiveView('about')}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>About</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}

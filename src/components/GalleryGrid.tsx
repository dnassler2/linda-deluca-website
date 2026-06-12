import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Artwork } from '../types';
import { ARTWORKS } from '../data/artworks';
import { Search, SlidersHorizontal, ArrowUpRight } from 'lucide-react';
import ArtworkImage from './ArtworkImage';

interface GalleryGridProps {
  onSelectArtwork: (artwork: Artwork) => void;
}

type FilterCategory = 'all' | 'linocuts' | 'animals' | 'circles' | 'city' | 'paris' | 'portraits' | 'resin-lino' | 'vegas';

export default function GalleryGrid({ onSelectArtwork }: GalleryGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Categories list
  const categories: { label: string; value: FilterCategory }[] = [
    { label: 'All Pieces', value: 'all' },
    { label: 'Linocuts', value: 'linocuts' },
    { label: 'Animals', value: 'animals' },
    { label: 'Circle Artworks', value: 'circles' },
    { label: 'City', value: 'city' },
    { label: 'Paris', value: 'paris' },
    { label: 'Portraits', value: 'portraits' },
    { label: 'Resin Lino', value: 'resin-lino' },
    { label: 'Vegas', value: 'vegas' }
  ];

  // Filtering logic
  const filteredArtworks = ARTWORKS.filter(artwork => {
    const matchesCategory = selectedCategory === 'all' || artwork.category === selectedCategory;
    const matchesSearch = artwork.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          artwork.medium.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          artwork.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#2D2D2A]/15">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              id={`filter-pill-${cat.value}`}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-4 py-2.5 text-xs font-sans font-medium tracking-widest uppercase rounded-md transition-all duration-300 border ${
                selectedCategory === cat.value
                  ? 'bg-[#2D2D2A] border-[#2D2D2A] text-white shadow-sm'
                  : 'bg-[#EAE7E2]/40 border-[#2D2D2A]/10 text-[#2D2D2A]/60 hover:text-[#2D2D2A] hover:bg-[#EAE7E2]/70 hover:border-[#2D2D2A]/30'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Minimalist Search Input */}
        <div className="relative max-w-xs w-full self-start md:self-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2D2D2A]/45" />
          <input
            id="artwork-search-input"
            type="text"
            placeholder="Search collection..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/60 border border-[#2D2D2A]/10 rounded-lg pl-9 pr-4 py-2.5 text-xs outline-none focus:border-[#2D2D2A]/30 focus:bg-white transition-all font-sans"
          />
        </div>
      </div>

      {/* Grid Display */}
      {filteredArtworks.length > 0 ? (
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 py-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredArtworks.map((artwork) => (
              <motion.div
                key={artwork.id}
                id={`grid-artwork-card-${artwork.id}`}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className="group flex flex-col cursor-pointer bg-[#EAE7E2]/55 border border-[#2D2D2A]/10 rounded-xl p-5 hover:border-[#2D2D2A]/25 hover:shadow-md transition-all duration-300"
                onClick={() => onSelectArtwork(artwork)}
              >
                {/* Artwork Framed Thumbnail */}
                <div className="relative overflow-hidden aspect-[4/3] bg-[#E2DFD9] border border-[#2D2D2A]/10 rounded-lg shadow-inner p-4 sm:p-5 flex items-center justify-center">
                  <ArtworkImage artwork={artwork} />
                  
                  {/* Floating unobtrusive subtle badge on top-right, indicating inspect action */}
                  <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="bg-[#2D2D2A] text-[#F5F2ED] text-[9px] font-sans font-medium uppercase tracking-widest px-2 py-1 rounded shadow flex items-center gap-1">
                      Inspect <ArrowUpRight className="w-2.5 h-2.5" />
                    </span>
                  </div>
                </div>

                {/* Metadata card footer */}
                <div className="mt-4 flex flex-col flex-grow">
                  <div className="flex items-start justify-between gap-2">
                    <h3 id={`artwork-title-${artwork.id}`} className="font-serif font-normal text-[#2D2D2A] text-base tracking-tight group-hover:text-[#2D2D2A]/80 transition-colors">
                      {artwork.title}
                    </h3>
                    <span id={`artwork-year-${artwork.id}`} className="font-mono text-[10px] text-[#2D2D2A]/60 bg-[#2D2D2A]/5 px-2 py-0.5 rounded border border-[#2D2D2A]/10">
                      {artwork.year}
                    </span>
                  </div>

                  <p id={`artwork-medium-${artwork.id}`} className="text-[#2D2D2A]/60 text-xs font-sans mt-2 line-clamp-1">
                    {artwork.medium}
                  </p>

                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-[#2D2D2A]/10 text-xs font-sans">
                    <span className="tracking-wide text-[#2D2D2A]/50">
                      {artwork.dimensions}
                    </span>
                    <span className={`font-medium ${artwork.price === 'Sold' ? 'text-[#2D2D2A]/40 line-through' : 'text-[#2D2D2A]'}`}>
                      {artwork.price}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="py-20 text-center max-w-sm mx-auto font-sans">
          <p className="text-[#2D2D2A]/60 text-sm">No artworks match your selected filters. Try adjusting categories or search keywords.</p>
          <button 
            id="clear-filters-btn"
            onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
            className="mt-4 text-xs font-semibold underline uppercase tracking-widest text-[#2D2D2A] hover:opacity-85"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}


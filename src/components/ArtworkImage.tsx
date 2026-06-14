import React, { useState } from 'react';
import { Artwork } from '../types';
import { UploadCloud, AlertCircle, Sparkles, Footprints, RotateCcw } from 'lucide-react';

interface ArtworkImageProps {
  artwork: Artwork;
  className?: string;
  isModal?: boolean;
}

export default function ArtworkImage({ artwork, className = '', isModal = false }: ArtworkImageProps) {
  const [hasError, setHasError] = useState(false);

  // Derive a quick slug pattern matching in case of name adjustments
  const normalizedTitle = artwork.title.toLowerCase();
  
  // Custom styled vector representations for artworks to act as artistic prints
  const renderFallbackIllustration = () => {
    // 1. Cowboy Boots
    if (normalizedTitle.includes('boot')) {
      return (
        <div className="absolute inset-0 bg-gradient-to-tr from-[#DE8C68]/20 to-[#EAD2AC]/30 flex flex-col items-center justify-center p-4">
          <svg className="w-2/5 h-2/5 text-[#A64F37] opacity-85" viewBox="0 0 100 100" fill="currentColor">
            {/* Minimalist rustic cowboy boot shape */}
            <path d="M40 10C35 10 32 12 32 15V60C32 63 34 65 37 67L55 78C58 80 62 80 66 78L78 69C82 66 82 60 76 56C72 53 66 50 63 45C60 40 60 25 60 20C60 14 58 10 50 10H40ZM48 18V45C48 48 52 50 55 53C58 56 61 59 61 63H40V18H48Z" />
            <circle cx="50" cy="28" r="3" />
            <circle cx="50" cy="38" r="3" />
            <path d="M36 62H42V67H36z" />
          </svg>
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#A64F37] mt-3 font-medium">Boot Series Study</span>
        </div>
      );
    }

    // 2. Owls / Birds
    if (normalizedTitle.includes('owl')) {
      return (
        <div className="absolute inset-0 bg-gradient-to-b from-[#2E4156]/20 to-[#A5C4D4]/10 flex flex-col items-center justify-center p-4">
          <svg className="w-2/5 h-2/5 text-[#2E4156] opacity-85" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            {/* Owl body & details */}
            <rect x="30" y="30" width="40" height="50" rx="20" fill="currentColor" fillOpacity="0.08" />
            <circle cx="42" cy="48" r="6" />
            <circle cx="58" cy="48" r="6" />
            <circle cx="42" cy="48" r="1.5" fill="currentColor" />
            <circle cx="58" cy="48" r="1.5" fill="currentColor" />
            <path d="M50 51L47 56H53Z" fill="currentColor" />
            {/* Crown */}
            <path d="M40 25L45 30L50 22L55 30L60 25V30H40V25Z" fill="#D4AF37" stroke="#D4AF37" />
            <path d="M35 80C40 85 60 85 65 80" />
          </svg>
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#2E4156] mt-3 font-medium">Horned Owl Study</span>
        </div>
      );
    }

    // 3. Circles
    if (normalizedTitle.includes('circle') || normalizedTitle.includes('sphere')) {
      return (
        <div className="absolute inset-0 bg-[#F2ECE4] flex flex-col items-center justify-center p-4">
          <svg className="w-1/2 h-1/2 text-[#D3527D]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="50" cy="50" r="38" className="opacity-15" fill="currentColor" />
            <circle cx="50" cy="50" r="30" strokeDasharray="4,4" />
            <circle cx="50" cy="50" r="22" strokeWidth="3" />
            <circle cx="50" cy="50" r="14" fill="currentColor" className="opacity-25" />
            <circle cx="50" cy="50" r="6" fill="currentColor" />
          </svg>
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#D3527D] mt-3 font-medium">Repeating Circles Study</span>
        </div>
      );
    }

    // 4. Cones / Ice Cream
    if (normalizedTitle.includes('cone') || normalizedTitle.includes('cream')) {
      return (
        <div className="absolute inset-0 bg-gradient-to-tr from-[#DEACBA]/20 to-[#ECCEA6]/30 flex flex-col items-center justify-center p-4">
          <svg className="w-1/3 h-1/3 text-[#B36987]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            {/* Simple cone layout */}
            <path d="M50 85L30 45H70L50 85Z" fill="currentColor" fillOpacity="0.1" />
            <circle cx="50" cy="33" r="15" fill="currentColor" className="opacity-60" />
            <circle cx="50" cy="18" r="10" fill="currentColor" className="opacity-80" />
            <path d="M35 45L55 85" strokeWidth="1" strokeDasharray="2,2" />
            <path d="M65 45L45 85" strokeWidth="1" strokeDasharray="2,2" />
          </svg>
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#B36987] mt-3 font-medium">Sweet Cones Series</span>
        </div>
      );
    }

    // 5. Butterfly / Butterflies
    if (normalizedTitle.includes('butterfl')) {
      return (
        <div className="absolute inset-0 bg-gradient-to-tr from-[#CA7060]/20 to-[#F49A88]/20 flex flex-col items-center justify-center p-4">
          <svg className="w-2/5 h-2/5 text-[#B84B35]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5">
            {/* Wing outlines */}
            <path d="M50 50 C30 20, 15 30, 20 50 C22 65, 38 60, 50 50 Z" fill="currentColor" fillOpacity="0.15" />
            <path d="M50 50 C70 20, 85 30, 80 50 C78 65, 62 60, 50 50 Z" fill="currentColor" fillOpacity="0.15" />
            <path d="M50 50 C35 70, 25 78, 30 85 C35 90, 48 80, 50 50 Z" fill="currentColor" fillOpacity="0.08" />
            <path d="M50 50 C65 70, 75 78, 70 85 C65 90, 52 80, 50 50 Z" fill="currentColor" fillOpacity="0.08" />
            {/* Antennae */}
            <path d="M50 35 C47 25, 42 20, 36 22" />
            <path d="M50 35 C53 25, 58 20, 64 22" />
            <line x1="50" y1="35" x2="50" y2="75" strokeWidth="4" strokeLinecap="round" />
          </svg>
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#B84B35] mt-3 font-medium">Lepidoptera Print</span>
        </div>
      );
    }

    // 6. Pony / Horses
    if (normalizedTitle.includes('pony') || normalizedTitle.includes('horse') || normalizedTitle.includes('stallion')) {
      return (
        <div className="absolute inset-0 bg-[#E8DDD2] flex flex-col items-center justify-center p-4">
          <svg className="w-2/5 h-2/5 text-[#8C694F] opacity-80" viewBox="0 0 100 100" fill="currentColor">
            {/* Minimalist Southwest animal contour */}
            <path d="M25 65 C25 60, 30 55, 35 50 C40 45, 45 42, 50 42 C55 42, 60 45, 65 42 C70 38, 70 30, 75 25 C78 22, 83 23, 85 28 C87 32, 84 38, 80 43 C76 48, 77 55, 75 62 L80 82 H74 L71 65 L60 68 L57 82 H51 L51 64 L40 64 L36 82 H30 L32 65 H25 Z" />
          </svg>
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#8C694F] mt-3 font-medium">Stallion Series</span>
        </div>
      );
    }

    // 7. Rabbit
    if (normalizedTitle.includes('rabbit') || normalizedTitle.includes('hare')) {
      return (
        <div className="absolute inset-0 bg-gradient-to-tr from-[#9BAF9B]/15 to-[#DFEDDF]/20 flex flex-col items-center justify-center p-4">
          <svg className="w-1/3 h-1/3 text-[#4A634A] opacity-80" viewBox="0 0 100 100" fill="currentColor">
            {/* Rabbit contour in folk-art style */}
            <path d="M35 75C30 75 25 70 28 60C30 53 38 48 42 42C44 38 41 25 45 15C47 10 50 10 52 18C54 25 51 35 53 38C56 32 58 20 62 16C65 14 67 17 66 25C65 35 58 45 60 52C63 56 71 58 75 65C79 72 73 78 62 76C55 75 42 75 35 75Z" />
            <circle cx="60" cy="50" r="1.5" fill="#E2DFD9" />
          </svg>
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#4A634A] mt-3 font-medium">Desert Hare Print</span>
        </div>
      );
    }

    // 8. Flowers / Flora
    if (normalizedTitle.includes('flower') || normalizedTitle.includes('floral') || normalizedTitle.includes('bloom') || normalizedTitle.includes('garden')) {
      return (
        <div className="absolute inset-0 bg-[#EAD5D7]/40 flex flex-col items-center justify-center p-4">
          <svg className="w-1/3 h-1/3 text-[#C04C63]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5">
            {/* Folk art flower bloom */}
            <circle cx="50" cy="50" r="8" fill="currentColor" className="opacity-20" />
            <circle cx="50" cy="50" r="4" fill="currentColor" />
            {/* Petals */}
            <path d="M50 30 C45 20, 55 20, 50 38" />
            <path d="M50 70 C45 80, 55 80, 50 62" />
            <path d="M30 50 C20 45, 20 55, 38 50" />
            <path d="M70 50 C80 45, 80 55, 62 50" />
            <path d="M36 36 C28 28, 38 20, 43 43" strokeDasharray="1,1" />
            <path d="M64 64 C72 72, 62 80, 57 57" strokeDasharray="1,1" strokeWidth="1.5" />
          </svg>
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#C04C63] mt-3 font-medium">Botanical Linocut</span>
        </div>
      );
    }

    // 9. Forest / Trees / Mountain
    if (normalizedTitle.includes('forrest') || normalizedTitle.includes('forest') || normalizedTitle.includes('pine') || normalizedTitle.includes('wood')) {
      return (
        <div className="absolute inset-0 bg-[#E0D8C8] flex flex-col items-center justify-center p-4">
          <svg className="w-1/3 h-1/3 text-[#5A4E3A]" viewBox="0 0 100 100" fill="currentColor">
            {/* 3 stylized pine tree outlines */}
            <path d="M50 20 L30 55 H42 L32 75 H68 L58 75 H70 L50 20Z" />
            <rect x="47" y="75" width="6" height="10" />
          </svg>
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#5A4E3A] mt-3 font-medium">Ontario Woods Study</span>
        </div>
      );
    }

    // Default Southwestern Nocturne Landscape
    return (
      <div className="absolute inset-0 bg-gradient-to-b from-[#2E282A] to-[#121111] flex flex-col items-center justify-center p-4 text-center">
        <svg className="w-1/3 h-1/3 text-[#DE8C68] opacity-80" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          {/* Saguaro Cactus under starry sky */}
          <line x1="50" y1="25" x2="50" y2="80" strokeWidth="3.5" />
          <path d="M32 45 C32 35, 48 35, 48 50" strokeWidth="3" />
          <path d="M68 55 C68 45, 52 45, 52 60" strokeWidth="3" />
          <polygon points="50,15 48,22 52,22" fill="currentColor" stroke="none" />
          <circle cx="25" cy="22" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="78" cy="30" r="1" fill="currentColor" stroke="none" />
          <circle cx="50" cy="40" r="1.5" fill="currentColor" stroke="none" className="animate-pulse" />
        </svg>
        <span className="text-[10px] uppercase font-mono tracking-widest text-[#EAD2AC]/80 mt-3 font-medium">Original Folk Study</span>
      </div>
    );
  };

  // Get the sub-image relative path to guide file-matching precisely
  const absolutePublicPath = `/public${artwork.imageUrl}`;

  return (
    <div className={`relative w-full h-full flex items-center justify-center ${isModal ? '' : 'overflow-hidden'} ${className}`}>
      {!hasError ? (
        <img
          src={artwork.imageUrl}
          alt={artwork.title}
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          className={
            isModal 
              ? "max-w-full max-h-full object-contain pointer-events-none rounded border-[3px] border-[#2D2D2A] shadow-[0_12px_35px_rgba(0,0,0,0.5)] z-10 transition-transform duration-300"
              : "max-w-full max-h-full object-contain shadow-md rounded-[2px] border border-[#2D2D2A]/10 group-hover:scale-[1.03] transition-transform duration-500"
          }
        />
      ) : (
        <div className="absolute inset-0 flex flex-col justify-between w-full h-full bg-[#E6E3DC] p-3 text-[#2D2D2A] rounded-lg">
          {/* Inner aesthetic frame */}
          <div className="relative flex-grow rounded-md border border-[#2D2D2A]/15 overflow-hidden flex items-center justify-center bg-[#ECE9E2]">
            {renderFallbackIllustration()}
          </div>

          {/* Action indicator at base */}
          <div className="mt-2.5 flex flex-col gap-1 z-20 bg-[#E2DFD9] p-2 rounded-md border border-[#2D2D2A]/10">
            <div className="flex items-center justify-between text-[10px] font-sans">
              <span className="font-semibold text-stone-700 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                Upload Standby
              </span>
              <span className="font-mono text-[9px] text-[#2D2D2A]/50 shrink-0">Empty file detected</span>
            </div>

            {isModal && (
              <div className="text-[10.5px] text-stone-600 font-sans mt-1 bg-white/70 p-2 rounded leading-relaxed border border-[#2D2D2A]/5">
                <p className="mb-1 font-medium text-stone-800">✨ How to display your real artwork graphic:</p>
                <div className="mt-1 font-mono text-[9.5px] bg-[#2D2D2A]/5 p-1 px-1.5 rounded text-[#2D2D2A] select-all break-all overflow-x-auto whitespace-pre-wrap">
                  File needs to be uploaded to:
                  <br />
                  <span className="font-semibold text-rose-700">{absolutePublicPath}</span>
                </div>
                <p className="mt-1.5 text-[9px] text-stone-500 italic">
                  Tip: Right-click the folder "public/Artwork-linocuts" in your workspace sidebar, then choose 'Upload Files' to overwrite this placeholder with your real image.
                </p>
              </div>
            )}
            
            {!isModal && (
              <span className="text-[8.5px] font-mono text-[#2D2D2A]/55 truncate">
                Target: {artwork.imageUrl.split('/').pop()}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

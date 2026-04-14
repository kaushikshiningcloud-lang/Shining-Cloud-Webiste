'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

interface WorksGridWithPreviewProps {
  images: string[];
}

export default function WorksGridWithPreview({ images }: WorksGridWithPreviewProps) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedIdx(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIdx]);

  // Prevent scroll when lightbox is open
  useEffect(() => {
    if (selectedIdx !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedIdx]);

  const handlePrev = () => {
    if (selectedIdx === null) return;
    setSelectedIdx((prev) => (prev === 0 ? images.length - 1 : (prev ?? 0) - 1));
  };

  const handleNext = () => {
    if (selectedIdx === null) return;
    setSelectedIdx((prev) => (prev === images.length - 1 ? 0 : (prev ?? 0) + 1));
  };

  return (
    <div className="w-full">
      {/* Photo Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {images.map((img, i) => (
          <div
            key={i}
            className="group relative aspect-[4/3] bg-[#0d0d0d] border border-white/5 overflow-hidden cursor-pointer"
            onClick={() => setSelectedIdx(i)}
          >
            <Image
              src={`/images/works/${img}`}
              alt={`Architectural Render ${i + 1}`}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
              loading={i < 8 ? 'eager' : 'lazy'}
            />
            {/* Minimal Overlay - No Filename */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
               <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <Maximize2 size={18} className="text-white" />
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Overlay */}
      {selectedIdx !== null && (
        <div className="fixed inset-0 z-[1000] bg-[#020202] flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-300">
          
          {/* Controls Hooked to Backdrop */}
          <div className="absolute inset-0 cursor-zoom-out" onClick={() => setSelectedIdx(null)} />

          {/* Nav Buttons */}
          <button 
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            className="absolute left-4 md:left-12 z-10 w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/30 transition-all transition-transform active:scale-95"
          >
            <ChevronLeft size={24} />
          </button>

          <button 
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            className="absolute right-4 md:right-12 z-10 w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/30 transition-all transition-transform active:scale-95"
          >
            <ChevronRight size={24} />
          </button>

          <button 
            onClick={() => setSelectedIdx(null)}
            className="absolute top-6 right-6 md:top-12 md:right-12 z-10 text-white opacity-40 hover:opacity-100 transition-opacity flex items-center gap-2 group"
          >
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase hidden md:block group-hover:mr-2 transition-all">CLOSE</span>
            <X size={28} />
          </button>

          {/* Featured Image */}
          <div className="relative w-full h-full max-w-6xl max-h-[80vh] flex items-center justify-center pointer-events-none">
            <Image
              src={`/images/works/${images[selectedIdx]}`}
              alt={`Full View Render ${selectedIdx + 1}`}
              fill
              className="object-contain"
              priority
              quality={100}
            />
          </div>

          {/* Counter */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 text-[10px] font-bold tracking-[0.3em] uppercase">
             {selectedIdx + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

export default function WorksGallery({ images }: { images: string[] }) {
  const featuredImages = useMemo(() => images.slice(0, 20), [images]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [offsets, setOffsets] = useState<{x: number, y: number}[]>([]);

  useEffect(() => {
    // Generate stable random offsets for the 2D layout
    const newOffsets = featuredImages.map(() => ({
       x: Math.random() * 40 - 20,
       y: Math.random() * 30 - 15
    }));
    setOffsets(newOffsets);
    setMounted(true);
  }, [featuredImages]);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;
    
    // We animate the items using a "Virtual Depth" system
    // Instead of moving in Z, we evolve their scale and position mathematically
    const items = containerRef.current.querySelectorAll('.gallery-item');
    
    const ctx = gsap.context(() => {
      items.forEach((item, i) => {
        const duration = 45; // Slower, more cinematic duration
        const delay = (i / items.length) * -duration; 
        
        // Infinite forward glide using scale and opacity
        gsap.fromTo(item, 
          { 
            scale: 0.2, 
            opacity: 0,
            xPercent: offsets[i].x * 5,
            yPercent: offsets[i].y * 5,
          },
          {
            scale: 2.5,
            opacity: 0.8,
            xPercent: offsets[i].x * 50, 
            yPercent: offsets[i].y * 50,
            duration: duration,
            repeat: -1,
            delay: delay,
            ease: "power1.in",
            onRepeat: function() {
              gsap.set(item, { opacity: 0 });
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [mounted, featuredImages.length, offsets]);

  return (
    <div className="relative w-full h-[100dvh] bg-[#020202] overflow-hidden flex items-center justify-center">
       <div 
         ref={containerRef} 
         className="relative w-full h-full flex items-center justify-center pointer-events-none"
       >
          {mounted && offsets.length === featuredImages.length && featuredImages.map((img, i) => (
             <div 
               key={i} 
               className="gallery-item absolute w-[70vw] md:w-[45vw] lg:w-[30vw] aspect-[4/3] md:aspect-video border-[1px] border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.9)] opacity-0 pointer-events-auto will-change-transform"
             >
               <Image 
                 src={`/images/works/${img}`} 
                 alt={`Render ${i}`} 
                 fill 
                 className="object-cover" 
                 sizes="(max-width: 1024px) 70vw, 30vw"
                 priority={i < 4}
               />
               
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
               
               <div className="absolute bottom-6 left-6 text-white flex flex-col pointer-events-none">
                  <span className="text-[9px] md:text-[10px] font-bold tracking-[0.3em] uppercase text-white/40 mb-1">ARCHIVI_PROJ_{i.toString().padStart(3, '0')}</span>
                  <span className="text-lg md:text-xl font-bold uppercase tracking-tight">{img.split('.')[0]}</span>
               </div>
             </div>
          ))}
       </div>
       
       {/* Central Branding Overlay */}
       <div className="absolute inset-0 z-50 pointer-events-none flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-6xl md:text-[10rem] lg:text-[14rem] font-black uppercase tracking-[-0.05em] text-white/10 select-none">
            CATALOG.
          </h1>
          <div className="flex flex-col items-center gap-4 mt-8">
             <div className="w-[1px] h-20 bg-gradient-to-b from-white/20 to-transparent" />
             <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/30">Scroll to Explore Archive</p>
          </div>
       </div>
    </div>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

export default function WorksGallery({ images }: { images: string[] }) {
  const featuredImages = images.slice(0, 20); // Limit to 20 for pure stability
  const zWrapperRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [offsets, setOffsets] = useState<{x: number, y: number}[]>([]);

  useEffect(() => {
    // Generate constant random offsets
    const newOffsets = featuredImages.map(() => ({
       x: Math.random() * 60 - 30, // Tighter spread for more focus
       y: Math.random() * 40 - 20
    }));
    setOffsets(newOffsets);
    setMounted(true);
  }, [featuredImages]);

  useEffect(() => {
    if (!mounted || !zWrapperRef.current) return;
    
    const depthSpacing = 400; // Compressed depth for mathematical stability
    const totalDepth = featuredImages.length * depthSpacing;

    const ctx = gsap.context(() => {
       // Slow cinematic glide
       gsap.to(zWrapperRef.current, {
           z: totalDepth - 500,
           ease: 'sine.inOut',
           duration: 180, // Extremely slow for a premium glide feel
           yoyo: true,
           repeat: -1,
           force3D: true
       });
    }, zWrapperRef);

    return () => ctx.revert();
  }, [mounted, featuredImages.length]);

  return (
    <div 
      className="relative w-full h-[100dvh] bg-[#020202] overflow-hidden" 
      style={{ perspective: '1000px' }}
    >
       <div 
         ref={zWrapperRef} 
         className="absolute inset-0 w-full h-full flex flex-col items-center justify-center pointer-events-none"
         style={{ transformStyle: 'preserve-3d' }}
       >
          {mounted && offsets.length === featuredImages.length && featuredImages.map((img, i) => {
             const zPos = -i * 400; // Compressed spacing
             const { x, y } = offsets[i];
             
             // Depth-based fog calculation: further items are darker/faded
             // i=0 is front, i=19 is back
             const opacity = 1 - (i / featuredImages.length) * 0.8;

             return (
               <div 
                 key={i} 
                 className="gallery-item absolute w-[70vw] md:w-[45vw] lg:w-[35vw] aspect-[4/3] md:aspect-video border-[1px] border-white/5 shadow-[0_0_100px_rgba(0,0,0,0.8)] pointer-events-auto"
                 style={{
                    transform: `translate3d(${x}vw, ${y}vh, ${zPos}px)`,
                    opacity: opacity,
                    filter: `brightness(${opacity * 100}%)`,
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transformStyle: 'preserve-3d',
                    WebkitTransformStyle: 'preserve-3d'
                 }}
               >
                 <Image 
                   src={`/images/works/${img}`} 
                   alt={`Render ${i}`} 
                   fill 
                   className="object-cover" 
                   sizes="(max-width: 1024px) 70vw, 40vw"
                   priority={i < 4}
                 />
                 
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                 
                 <div className="absolute bottom-6 left-6 text-white flex flex-col pointer-events-none">
                    <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-white/40 mb-2">ARCHIVE FILE_{i.toString().padStart(3, '0')}</span>
                    <span className="text-xl md:text-2xl font-bold uppercase tracking-tight">{img.split('.')[0]}</span>
                 </div>
               </div>
             )
          })}
       </div>
       
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1000] pointer-events-none text-center flex flex-col gap-6 items-center">
          <h1 className="text-5xl md:text-[8rem] lg:text-[12rem] font-bold uppercase tracking-[-0.04em] text-white opacity-40">
            CATALOG.
          </h1>
          <div className="flex flex-col items-center gap-2 mt-auto">
             <div className="w-[1px] h-16 md:h-24 bg-gradient-to-b from-white/40 to-transparent" />
             <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/40">Scroll for Video Profiles</p>
          </div>
       </div>

    </div>
  )
}

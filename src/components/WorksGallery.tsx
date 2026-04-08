'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

export default function WorksGallery({ images }: { images: string[] }) {
  const featuredImages = images.slice(0, 20); // Limit to 20 for performance/stability
  const zWrapperRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [offsets, setOffsets] = useState<{x: number, y: number}[]>([]);

  useEffect(() => {
    // Generate random offsets on the client after mount to satisfy purity rules
    const newOffsets = featuredImages.map(() => ({
       x: Math.random() * 80 - 40,
       y: Math.random() * 60 - 30
    }));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOffsets(newOffsets);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, [featuredImages]);

  useEffect(() => {
    if (!mounted || !zWrapperRef.current) return;
    
    const depthSpacing = 1200;
    const totalDepth = featuredImages.length * depthSpacing;

    const ctx = gsap.context(() => {
       gsap.to(zWrapperRef.current, {
           z: totalDepth - 2000,
           ease: 'sine.inOut',
           duration: 120,
           yoyo: true,
           repeat: -1
       });
    }, zWrapperRef);

    return () => ctx.revert();
  }, [mounted, featuredImages.length]);

  return (
    <div 
      className="relative w-full h-[100dvh] bg-[#020202] overflow-hidden" 
      style={{ perspective: '800px' }}
    >
       <div 
         ref={zWrapperRef} 
         className="absolute inset-0 w-full h-full flex flex-col items-center justify-center pointer-events-none"
         style={{ transformStyle: 'preserve-3d' }}
       >
          {mounted && offsets.length === featuredImages.length && featuredImages.map((img, i) => {
             const zPos = -i * 1200;
             const { x, y } = offsets[i];

             return (
               <div 
                 key={i} 
                 className="gallery-item absolute w-[70vw] md:w-[45vw] lg:w-[35vw] aspect-[4/3] md:aspect-video border-[1px] border-white/10 opacity-100 shadow-[0_0_100px_rgba(0,0,0,0.8)] filter brightness-75 transition-all duration-500 pointer-events-auto"
                 style={{
                    transform: `translate3d(${x}vw, ${y}vh, ${zPos}px)`,
                    willChange: 'transform'
                 }}
               >
                 <Image 
                   src={`/images/works/${img}`} 
                   alt={`Render ${i}`} 
                   fill 
                   className="object-cover" 
                   sizes="(max-width: 1024px) 70vw, 40vw"
                   priority={i < 5}
                   loading={i >= 5 ? "lazy" : undefined}
                 />
                 
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                 
                 <div className="absolute bottom-6 left-6 text-white flex flex-col pointer-events-none">
                    <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-archivi-accent mb-2">ARCHIVE FILE_{i.toString().padStart(3, '0')}</span>
                    <span className="text-xl md:text-2xl font-bold uppercase tracking-tight">{img.split('.')[0]}</span>
                 </div>
               </div>
             )
          })}
       </div>
       
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1000] pointer-events-none text-center flex flex-col gap-6 items-center">
          <h1 className="text-5xl md:text-[8rem] lg:text-[12rem] font-bold uppercase tracking-[-0.04em] text-white opacity-80 mix-blend-overlay">
            CATALOG.
          </h1>
          <div className="flex flex-col items-center gap-2 mt-auto mix-blend-lighten">
             <div className="w-[1px] h-16 md:h-24 bg-gradient-to-b from-white/80 to-transparent" />
             <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-white">Scroll for Video Profiles</p>
          </div>
       </div>

    </div>
  )
}

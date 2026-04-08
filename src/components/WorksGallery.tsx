'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

export default function WorksGallery({ images }: { images: string[] }) {
  const zWrapperRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !zWrapperRef.current) return;
    
    // Core parameters for the 3D flying tunnel
    const depthSpacing = 1200; // Deep spacing
    const totalDepth = images.length * depthSpacing;

    const ctx = gsap.context(() => {
       // Autonomous infinite cinematic float
       // Pushes the entire wrapper deep into the Z-axis, then reverses gently
       gsap.to(zWrapperRef.current, {
           z: totalDepth - 2000, // Leave some buffer at the end
           ease: 'sine.inOut',
           duration: 120, // 2-minute majestic sweep inwards
           yoyo: true, // Fly backwards
           repeat: -1
       });

       // Dynamically calculate camera pass-through fading based on Z-position
       const items = gsap.utils.toArray('.gallery-item') as HTMLElement[];
       
       // Instead of ScrollTrigger, we use a continuous ticker to govern opacity
       // based on physical Z-matrix world relative bounds (less performant but accurate)
       // OR simply let them fly past. Wait, CSS handles Z-clipping behind the camera natively!
       // CSS `perspective` automatically clips objects that cross Z = 0 into negative space (behind the viewer).
       // We don't necessarily need a Javascript ticker just to hide them, CSS handles the clipping.
    }, zWrapperRef);

    return () => ctx.revert();
  }, [mounted, images.length]);

  return (
    <div 
      className="relative w-full h-[100dvh] bg-[#020202] overflow-hidden" 
      style={{ perspective: '800px' }}
    >
       {/* 3D Transform Wrapper - Automatically driven by GSAP */}
       <div 
         ref={zWrapperRef} 
         className="absolute inset-0 w-full h-full flex flex-col items-center justify-center pointer-events-none"
         style={{ transformStyle: 'preserve-3d' }}
       >
          {images.map((img, i) => {
             // Generate chaotic yet controlled placement logic
             const randX = Math.random() * 80 - 40; // -40vw to 40vw offset
             const randY = Math.random() * 60 - 30; // -30vh to 30vh offset
             const zPos = -i * 1200; // Incremental depth deep into the screen

             return (
               <div 
                 key={i} 
                 className="gallery-item absolute w-[70vw] md:w-[45vw] lg:w-[35vw] aspect-[4/3] md:aspect-video border-[1px] border-white/10 opacity-100 shadow-[0_0_100px_rgba(0,0,0,0.8)] filter brightness-75 transition-all duration-500 pointer-events-auto"
                 style={{
                    transform: `translate3d(${randX}vw, ${randY}vh, ${zPos}px)`,
                    willChange: 'transform'
                 }}
               >
                 <Image 
                   src={`/images/works/${img}`} 
                   alt={`Render ${i}`} 
                   fill 
                   className="object-cover" 
                   sizes="(max-width: 1024px) 70vw, 40vw"
                   priority={i < 5} // Eager load the closest frames
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
       
       {/* Static Interface Hero Layer above the 3D space */}
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

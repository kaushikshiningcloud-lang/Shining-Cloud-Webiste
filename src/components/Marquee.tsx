'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Marquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    const content = containerRef.current.querySelector('.marquee-content');
    if (!content) return;

    gsap.to(content, {
      xPercent: -50,
      ease: "none",
      duration: 20,
      repeat: -1,
    });
  }, []);

  return (
    <div className="w-full overflow-hidden bg-archivi-dark text-white py-6 border-y border-white/10 flex">
      <div ref={containerRef} className="flex whitespace-nowrap">
        <div className="marquee-content flex gap-12 items-center text-xs md:text-sm font-bold tracking-[0.2em] uppercase">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex gap-12 items-center">
              <span>3D VISUALIZATION</span>
              <span className="w-1.5 h-1.5 bg-archivi-accent"></span>
              <span className="text-white/50">SCALE MODELS</span>
              <span className="w-1.5 h-1.5 bg-archivi-accent"></span>
              <span>ARCHITECTURAL WALKTHROUGHS</span>
              <span className="w-1.5 h-1.5 bg-archivi-accent"></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

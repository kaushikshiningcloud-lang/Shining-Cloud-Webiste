'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function QualityExpectation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      '.anim-up-quality',
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        }
      }
    );
  }, []);

  return (
    <section ref={containerRef} className="py-32 md:py-48 px-6 md:px-12 bg-archivi-dark text-white">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        <div className="relative h-[60vh] md:h-[80vh] w-full bg-[#111] overflow-hidden anim-up-quality group">
          <Image
            src="/images/project3.jpg"
            alt="Final Render Quality"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-[2s] group-hover:scale-105"
          />
          <div className="absolute inset-0 border-[16px] border-archivi-dark pointer-events-none z-10" />
        </div>

        <div className="flex flex-col">
          <p className="anim-up-quality text-archivi-accent text-[11px] tracking-[0.2em] font-bold uppercase mb-8 flex items-center gap-3">
            <span className="text-white/30 text-sm">//</span> THE GUARANTEE
          </p>
          <h2 className="anim-up-quality text-4xl md:text-6xl font-bold tracking-[-0.03em] uppercase leading-[1.1] mb-12">
            WHAT YOU SEE <br/>
            IS EXACTLY <br/>
            WHAT YOU GET.
          </h2>
          
          <div className="anim-up-quality flex flex-col gap-8 pl-6 border-l border-white/20">
            <p className="text-sm md:text-base font-medium leading-relaxed max-w-md">
              Final output will match the exact atmospheric fidelity, material accuracy, and overall quality established during concept review.
            </p>
            <p className="text-xs text-white/50 font-medium leading-relaxed max-w-sm uppercase tracking-wider">
              We operate on a philosophy of 100% translational rigor. Never compromised for the sake of speed.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

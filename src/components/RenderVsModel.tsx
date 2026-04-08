'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function RenderVsModel() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      '.anim-up-rvm',
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        }
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-32 md:py-48 px-6 md:px-12 max-w-[1600px] mx-auto bg-archivi-light text-archivi-dark">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Text Block - Bento Left */}
        <div className="anim-up-rvm lg:col-span-4 bg-white p-10 flex flex-col justify-between min-h-[40vh]">
          <div>
            <p className="text-archivi-accent text-[11px] tracking-[0.2em] font-bold uppercase mb-8 flex items-center gap-3">
              <span className="text-black/30 text-sm">{"//"}</span> FIDELITY CHECK
            </p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-[-0.03em] uppercase leading-[1.1] mb-6">
              DIGITAL <br/> CONSTRUCT <br/> VS PHYSICAL.
            </h2>
          </div>
          <p className="text-sm font-medium text-black/60 leading-relaxed max-w-sm">
            Observe the identical level of detail and structural precision, validating the integrity of the design through both digital renders and scale models.
          </p>
        </div>

        {/* Split Image Block - Bento Right */}
        <div className="anim-up-rvm lg:col-span-8 grid grid-cols-2 gap-2 bg-[#E1DED8] p-2">
          <div className="relative aspect-[3/4] md:aspect-square w-full">
            <Image
              src="/images/render.jpg"
              alt="3D Render"
              fill
              sizes="(max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 text-[10px] font-bold tracking-widest uppercase">
              Digital Render
            </div>
          </div>
          
          <div className="relative aspect-[3/4] md:aspect-square w-full">
            <Image
              src="/images/model.png"
              alt="Scale Model"
              fill
              sizes="(max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
             <div className="absolute top-4 left-4 bg-archivi-dark/90 backdrop-blur-sm px-4 py-2 text-white text-[10px] font-bold tracking-widest uppercase">
              Scale Model
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

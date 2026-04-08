'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDownRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const processes = [
  { id: '01', title: 'INPUT & DISCOVERY', desc: 'Synthesizing blueprints, references, and styling parameters to establish the geometric foundation.' },
  { id: '02', title: 'SPATIAL CONCEPT', desc: 'Developing the initial 3D geometry and defining the pure lighting schema.' },
  { id: '03', title: 'CLIENT DIALOG', desc: 'Iterative feedback on camera angles, materials, and atmospheric intent.' },
  { id: '04', title: 'REFINEMENT', desc: 'Micro-adjustments and precision mapping based on explicit evaluation.' },
  { id: '05', title: 'FINAL OUTPUT', desc: 'Cinematic high-resolution rendering, grading, and post-production delivery.' },
];

export default function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    gsap.fromTo(
      '.anim-up-proc',
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
    <section ref={containerRef} className="py-32 md:py-48 px-6 md:px-12 bg-archivi-light text-archivi-dark border-t border-black/10">
      <div className="max-w-[1600px] mx-auto">
        
        <div className="mb-24 flex flex-col md:flex-row justify-between items-start md:items-end">
          <div className="anim-up-proc">
            <p className="text-archivi-accent text-[11px] tracking-[0.2em] font-bold uppercase mb-6 flex items-center gap-3">
              <span className="text-black/30 text-sm">//</span> METHODOLOGY
            </p>
            <h2 className="text-5xl md:text-7xl font-bold tracking-[-0.03em] leading-[0.9]">
              STRUCTURED <br /> PRECISION
            </h2>
          </div>
          <p className="anim-up-proc text-sm text-black/60 font-medium tracking-wide mt-8 md:mt-0 max-w-sm leading-relaxed">
            A rigorous, battle-tested pipeline ensuring uncompromising quality from blueprint to final render.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {processes.map((proc, index) => {
            // Make the first card span 2 cols on large screens
            const spanClass = index === 0 ? 'lg:col-span-2 bg-[#E1DED8]' : 'bg-white';
            
            return (
              <div 
                key={proc.id} 
                className={`anim-up-proc group p-10 flex flex-col justify-between min-h-[320px] transition-colors duration-500 hover:bg-archivi-dark hover:text-white cursor-crosshair ${spanClass}`}
              >
                <div className="flex justify-between items-start mb-16">
                  <span className="text-[10px] font-bold tracking-[0.3em] text-archivi-accent">STEP {proc.id}</span>
                  <ArrowDownRight className="text-black/20 group-hover:text-white/50 transition-colors" />
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold tracking-[-0.01em] uppercase mb-4">{proc.title}</h3>
                  <p className="text-sm font-medium text-black/60 group-hover:text-white/60 leading-relaxed">
                    {proc.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

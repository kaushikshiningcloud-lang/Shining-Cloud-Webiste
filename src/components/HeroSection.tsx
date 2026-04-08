'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Entrance animations
    const ctx = gsap.context(() => {
      gsap.fromTo('.anim-hero', 
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, stagger: 0.15, ease: 'power3.out' }
      );

      gsap.fromTo('.anim-line',
        { height: 0 },
        { height: '100%', duration: 2, ease: 'power3.inOut' }
      );

      // Badge rotation
      gsap.to(badgeRef.current, {
        rotation: 360,
        duration: 12,
        repeat: -1,
        ease: 'none'
      });

    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[100dvh] bg-archivi-dark text-white overflow-hidden">
      
      {/* Fallback CSS Marquee to guarantee smooth endless scroll */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes endless-scroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .css-marquee {
          animation: endless-scroll 35s linear infinite;
          will-change: transform;
        }
      `}} />



      {/* 4-Column Vertical Grid Lines */}
      <div className="absolute inset-x-0 bottom-0 top-24 z-0 flex w-full max-w-[1600px] mx-auto px-6 md:px-0 opacity-20 md:opacity-40 pointer-events-none">
          <div className="flex-1 relative h-full hidden lg:block">
             <div className="anim-line absolute left-0 top-0 w-[1px] bg-white/20 origin-top"></div>
             <span className="absolute top-24 left-8 text-[9px] tracking-[0.2em] font-bold text-white/50 uppercase">
                 {"//"} Architecture
             </span>
             <div className="anim-line absolute right-0 top-0 w-[1px] bg-white/20 origin-top"></div>
          </div>
          <div className="flex-1 relative h-full hidden md:block">
             <span className="absolute top-24 left-8 text-[9px] tracking-[0.2em] font-bold text-white/50 uppercase">
                 {"//"} Development
             </span>
             <div className="anim-line absolute right-0 top-0 w-[1px] bg-white/20 origin-top"></div>
          </div>
          <div className="flex-1 relative h-full">
             <span className="absolute top-24 left-8 text-[9px] tracking-[0.2em] font-bold text-white/50 uppercase">
                 {"//"} Idea & Action
             </span>
             <div className="anim-line absolute right-0 top-0 w-[1px] bg-white/20 origin-top"></div>
          </div>
      </div>

      {/* Upper Content Area */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto h-full px-6 md:px-0 pointer-events-none">
          <div className="absolute inset-x-0 top-64 w-full flex flex-col md:flex-row">
              
              {/* Invisible spacer for Col 1 */}
              <div className="flex-1 hidden lg:block" />
              
              {/* Col 2: The Floating Badge */}
              <div className="flex-1 hidden md:flex items-start justify-center pt-2 pointer-events-auto">
                  <div 
                    ref={badgeRef}
                    className="anim-hero w-36 h-36 border-[3px] border-[#111] bg-[#9F8C75] rounded-full flex items-center justify-center shadow-xl"
                  >
                      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full p-2">
                          <path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="none" />
                          <text className="text-[11px] font-bold fill-[#111] uppercase" letterSpacing="0.1em">
                              <textPath href="#circlePath" startOffset="0%" textLength="220" lengthAdjust="spacingAndGlyphs">
                                 SPACES THAT INSPIRE LIVING 
                              </textPath>
                          </text>
                      </svg>
                      <div className="text-[#111] z-10 font-bold tracking-wider text-sm flex gap-1 items-center">
                         <span className="w-5 h-5 bg-[#111] rotate-45 transform"></span>
                      </div>
                  </div>
              </div>

              {/* Col 3/4: Call to Action Block */}
              <div className="flex-[2] flex flex-col md:flex-row items-start px-0 md:px-12 pt-8 z-20 pointer-events-auto anim-hero">
                  <div className="max-w-[320px]">
                      <h2 className="text-4xl md:text-[2.5rem] font-bold tracking-[-0.03em] leading-[1.05] mb-8 text-white">
                         Creating innovative architecture with timeless aesthetics.
                      </h2>
                      <div className="flex items-center gap-3 cursor-pointer group w-fit">
                          <div className="w-12 h-12 bg-white text-archivi-dark rounded-full flex items-center justify-center text-2xl font-light transition-transform duration-500 group-hover:rotate-180">
                            +
                          </div>
                          <div className="bg-archivi-accent px-6 py-4 rounded-full text-[11px] font-bold tracking-[0.1em] text-archivi-dark transition-colors duration-300 group-hover:bg-white">
                            BOOK A CALL
                          </div>
                      </div>
                  </div>
              </div>
              
          </div>
      </div>

      {/* Massive Horizontal Scrolling Marquee Text */}
      <div className="absolute -bottom-10 md:-bottom-12 left-0 z-0 w-full flex overflow-hidden pointer-events-none">
          <div className="css-marquee flex flex-nowrap whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-t from-archivi-dark via-white/80 to-white w-max">
              <h1 className="text-[25vw] md:text-[22vw] font-bold tracking-[-0.04em] leading-none uppercase pr-16 md:pr-32">
                  SHINING CLOUD
              </h1>
              <h1 className="text-[25vw] md:text-[22vw] font-bold tracking-[-0.04em] leading-none uppercase pr-16 md:pr-32">
                  SHINING CLOUD
              </h1>
          </div>
      </div>

    </section>
  );
}

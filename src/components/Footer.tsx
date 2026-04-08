'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      '.anim-up-footer',
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        }
      }
    );
  }, []);

  return (
    <footer ref={containerRef} className="bg-archivi-dark text-white pt-32 pb-8 border-t border-white/10 relative z-10 w-full rounded-t-3xl mt-[-2rem]">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        
        {/* Massive Let's Talk */}
        <div className="mb-24 md:mb-32">
          <p className="anim-up-footer text-archivi-accent text-[11px] tracking-[0.2em] font-bold uppercase mb-8 flex items-center gap-3">
            <span className="text-white/30 text-sm">//</span> START A PROJECT
          </p>
          <div className="group inline-block cursor-pointer">
            <h2 className="anim-up-footer text-6xl md:text-[8rem] lg:text-[11rem] font-bold tracking-[-0.04em] leading-[0.85] uppercase transition-colors duration-500 hover:text-archivi-accent">
              LET'S TALK
            </h2>
          </div>
        </div>

        {/* Global Directors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 pt-16 border-t border-white/10">
          
          <div className="anim-up-footer flex flex-col gap-4">
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 mb-2">US DIVISION</p>
            <a href="mailto:david@shining-cloud.com" className="text-sm font-medium tracking-wide hover:text-archivi-accent transition-colors">
              david@shining-cloud.com
            </a>
            <a href="tel:+13477418308" className="text-sm font-medium tracking-wide hover:text-archivi-accent transition-colors">
              (+1) 347-741-8308
            </a>
          </div>

          <div className="anim-up-footer flex flex-col gap-4">
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 mb-2">EU DIVISION</p>
            <a href="mailto:jeff@shining-cloud.com" className="text-sm font-medium tracking-wide hover:text-archivi-accent transition-colors">
              jeff@shining-cloud.com
            </a>
            <a href="tel:+4901601540851" className="text-sm font-medium tracking-wide hover:text-archivi-accent transition-colors">
              (+49) 0160 1540851
            </a>
          </div>

          <div className="anim-up-footer flex flex-col gap-4">
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 mb-2">ASIA DIVISION</p>
            <a href="mailto:praveen@shining-cloud.com" className="text-sm font-medium tracking-wide hover:text-archivi-accent transition-colors">
              praveen@shining-cloud.com
            </a>
            <a href="tel:+919710773655" className="text-sm font-medium tracking-wide hover:text-archivi-accent transition-colors">
              (+91) 97107 73655
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-24 pt-8 border-t border-white/10 flex flex-col gap-6 md:flex-row justify-between items-start md:items-center">
          <p className="anim-up-footer text-[10px] font-bold tracking-[0.2em] uppercase text-white/40">
            © 2026 SHINING CLOUD STUDIO. ALL RIGHTS RESERVED.
          </p>
          <div className="anim-up-footer text-[10px] font-bold tracking-[0.2em] uppercase text-white/40">
            AUGMENTED REALITY, VIRTUAL REALITY & MIXED REALITY SERVICE PROVIDER
          </div>
        </div>

      </div>
    </footer>
  );
}

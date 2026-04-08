'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
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
    <footer ref={containerRef} className="bg-archivi-light text-archivi-dark pt-32 pb-8 border-t border-black/10">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        
        {/* Massive Let's Talk */}
        <div className="mb-24 md:mb-32">
          <p className="anim-up-footer text-archivi-accent text-[11px] tracking-[0.2em] font-bold uppercase mb-8 flex items-center gap-3">
            <span className="text-black/30 text-sm">{"//"}</span> START A PROJECT
          </p>
          <div className="group inline-block cursor-pointer">
            <h2 className="anim-up-footer text-6xl md:text-[8rem] lg:text-[12rem] font-bold tracking-[-0.04em] leading-[0.85] uppercase transition-colors duration-500 hover:text-archivi-accent">
              LET&apos;S TALK
            </h2>
          </div>
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12 pt-16 border-t border-black/10">
          <div className="anim-up-footer col-span-1 lg:col-span-2">
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-black/40 mb-6">HQ</p>
            <p className="text-sm font-medium leading-relaxed max-w-xs">
              Global Operations<br/>
              Working remotely with top-tier studios worldwide.
            </p>
          </div>

          <div className="anim-up-footer flex flex-col gap-4">
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-black/40 mb-2">CONNECT</p>
            <a href="mailto:hello@shiningcloud.com" className="text-sm font-bold uppercase tracking-wider hover:text-archivi-accent transition-colors">
              HELLO@SHININGCLOUD.COM
            </a>
            <a href="tel:+1234567890" className="text-sm font-bold uppercase tracking-wider hover:text-archivi-accent transition-colors">
              +1 (234) 567-890
            </a>
          </div>

          <div className="anim-up-footer flex flex-col gap-4">
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-black/40 mb-2">SOCIALS</p>
            <a href="#" className="text-sm font-bold uppercase tracking-wider hover:text-archivi-accent transition-colors">INSTAGRAM</a>
            <a href="#" className="text-sm font-bold uppercase tracking-wider hover:text-archivi-accent transition-colors">BEHANCE</a>
            <a href="#" className="text-sm font-bold uppercase tracking-wider hover:text-archivi-accent transition-colors">LINKEDIN</a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-32 pt-8 border-t border-black/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="anim-up-footer text-[10px] font-bold tracking-[0.2em] uppercase text-black/40">
            © 2026 SHINING CLOUD STUDIO. ALL RIGHTS RESERVED.
          </p>
          <div className="anim-up-footer text-[10px] font-bold tracking-[0.2em] uppercase text-black/40">
            Developed based on Archivi Identity
          </div>
        </div>

      </div>
    </footer>
  );
}

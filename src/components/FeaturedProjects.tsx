'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { id: 1, title: 'MODERN VILLA', category: 'RESIDENTIAL', date: '2025', src: '/images/project1.jpg' },
  { id: 2, title: 'CORPORATE HQ', category: 'COMMERCIAL', date: '2026', src: '/images/project2.jpg' },
  { id: 3, title: 'LUXURY APARTMENT', category: 'INTERIOR', date: '2024', src: '/images/project3.jpg' },
  { id: 4, title: 'CULTURAL CENTER', category: 'PUBLIC', date: '2025', src: '/images/project4.jpg' },
  { id: 5, title: 'BOUTIQUE HOTEL', category: 'HOSPITALITY', date: '2026', src: '/images/project5.jpg' },
];

export default function FeaturedProjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;
    
    gsap.fromTo(
      '.anim-up-proj',
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
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-24 flex flex-col md:flex-row justify-between items-start md:items-end">
          <div className="anim-up-proj">
            <p className="text-archivi-accent text-[11px] tracking-[0.2em] font-bold uppercase mb-6 flex items-center gap-3">
              <span className="text-white/30 text-sm">//</span> SELECTED WORKS
            </p>
            <h2 className="text-4xl md:text-6xl lg:text-[6rem] font-bold tracking-[-0.03em] leading-[1]">
              RECENT <br className="hidden md:block" /> PROJECTS
            </h2>
          </div>
          <p className="anim-up-proj text-sm text-white/50 font-medium tracking-wide mt-8 md:mt-0 uppercase max-w-[200px] text-left md:text-right">
            Hover to explore our architectural archive.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative">
          {/* Sticky Image Kiosk */}
          <div className="w-full lg:w-1/2 relative">
            <div className="sticky top-32 w-full aspect-[4/3] overflow-hidden bg-[#1a1a1a]">
              {projects.map((project, index) => (
                <Image
                  key={project.id}
                  src={project.src}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className={`object-cover transition-opacity duration-700 ease-in-out ${activeIndex === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                />
              ))}
            </div>
          </div>

          {/* Interactive List */}
          <div className="w-full lg:w-1/2 flex flex-col pt-8">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="anim-up-proj group border-t border-white/10 last:border-b py-8 cursor-pointer relative"
                onMouseEnter={() => setActiveIndex(index)}
              >
                {/* Accent Fill on Hover */}
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -mx-6 px-6" />
                
                <div className="flex justify-between items-center relative z-10">
                  <div className="flex items-center gap-8 md:gap-12">
                    <span className="text-white/30 font-bold text-sm tracking-widest w-6">0{index + 1}</span>
                    <h3 className="text-3xl md:text-5xl font-bold tracking-[-0.02em] group-hover:text-archivi-accent transition-colors duration-300">
                      {project.title}
                    </h3>
                  </div>
                  <ArrowUpRight className="text-white/30 group-hover:text-white transition-colors duration-300 transform group-hover:translate-x-2 group-hover:-translate-y-2 opacity-0 md:opacity-100" size={32} />
                </div>
                
                <div className="flex gap-16 mt-6 ml-14 md:ml-20">
                  <p className="text-[10px] tracking-[0.2em] text-white/50 font-bold">{project.category}</p>
                  <p className="text-[10px] tracking-[0.2em] text-white/50 font-bold">{project.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

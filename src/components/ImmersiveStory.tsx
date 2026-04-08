'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const storySteps = [
  { id: 1, title: 'I. THE VISION', text: 'Capturing exterior essence in true geographic context.', src: '/images/exterior.jpg' },
  { id: 2, title: 'II. INTIMATE DETAIL', text: 'Focusing on pure materiality, shadow, and light.', src: '/images/project1.jpg' },
  { id: 3, title: 'III. GRAND SCALE', text: 'Understanding the architectural geometry from above.', src: '/images/interior.jpg' },
  { id: 4, title: 'IV. NOCTURNAL', text: 'How spatial perception shifts radically after dusk.', src: '/images/project2.jpg' },
];

export default function ImmersiveStory() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const items = gsap.utils.toArray('.story-row') as HTMLElement[];
    items.forEach((item) => {
      gsap.fromTo(
        item.querySelectorAll('.anim-up-story'),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
          }
        }
      );
    });
  }, []);

  return (
    <section ref={containerRef} className="py-32 md:py-48 bg-archivi-light text-archivi-dark px-6 md:px-12 border-t border-black/10">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-24 flex justify-between items-end">
          <h2 className="text-4xl md:text-6xl font-bold tracking-[-0.03em] uppercase leading-[1]">
            NARRATIVE <br/> THROUGH <br/> FRAMES.
          </h2>
          <p className="hidden md:block text-archivi-accent text-[11px] tracking-[0.2em] font-bold uppercase mb-2">
            // VISUAL STORYTELLING
          </p>
        </div>

        <div className="flex flex-col gap-32">
          {storySteps.map((step, index) => (
            <div key={step.id} className="story-row grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
              {/* Text Block */}
              <div className={`lg:col-span-4 flex flex-col ${index % 2 === 1 ? 'lg:order-2 lg:pl-16' : 'lg:order-1'}`}>
                <span className="anim-up-story text-archivi-accent text-[11px] tracking-[0.2em] font-bold uppercase mb-6 flex items-center gap-3">
                  <span className="text-black/30 text-sm">/</span> 0{step.id}
                </span>
                <h3 className="anim-up-story text-3xl font-bold tracking-[-0.02em] mb-6">{step.title}</h3>
                <p className="anim-up-story text-sm font-medium text-black/60 leading-relaxed max-w-sm">
                  {step.text}
                </p>
              </div>

              {/* Image Block */}
              <div className={`anim-up-story relative lg:col-span-8 w-full aspect-video md:aspect-[21/9] bg-[#E1DED8] overflow-hidden ${index % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}`}>
                <Image
                  src={step.src}
                  alt={step.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover transition-transform duration-[1.5s] hover:scale-[1.02]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

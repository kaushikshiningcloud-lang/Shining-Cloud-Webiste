'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Offerings', href: '/services' },
    { name: 'Works', href: '/works' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[1000] flex justify-between items-center px-6 md:px-12 py-6 bg-[#020202]/80 backdrop-blur-xl border-b border-white/5 text-white transition-all duration-300">
        <Link 
          href="/" 
          className="relative w-[140px] md:w-[180px] h-[35px] md:h-[45px] cursor-pointer pointer-events-auto"
          onClick={() => setIsOpen(false)}
        >
          <Image 
            src="/images/logo.png" 
            alt="Shining Cloud Studio" 
            fill 
            className="object-contain object-left drop-shadow-2xl" 
            priority 
          />
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-12 text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase pointer-events-auto">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="hover:text-[#9F8C75] transition-colors duration-300"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex p-2 pointer-events-auto text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Bulletproof Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-x-0 top-0 h-[100dvh] z-[2000] bg-[#020202] flex flex-col items-center justify-center p-8 md:hidden overflow-hidden">
          {/* Internal Close Button */}
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-8 right-8 text-white p-2 z-[2010]"
            aria-label="Close menu"
          >
            <X size={32} />
          </button>

          <div className="relative z-[2001] w-full flex flex-col gap-10 items-center justify-center">
            <p className="text-white/10 text-[9px] tracking-[0.5em] uppercase mb-2">ARCHIVE NAVIGATION</p>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-4xl xs:text-5xl font-bold tracking-[0.2em] uppercase text-white hover:text-archivi-accent active:text-archivi-accent py-2"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="absolute bottom-12 text-white/20 text-[9px] tracking-[0.2em] uppercase z-[2001]">
            SHINING CLOUD // EST. 2026
          </div>
        </div>
      )}
        
      {/* Mobile Footer Info - Hidden when menu open */}
      {!isOpen && (
        <div className="fixed bottom-12 left-6 text-[10px] tracking-[0.2em] uppercase opacity-40 text-white z-[100] md:hidden">
          Shining Cloud Studio © 2026
        </div>
      )}
    </>
  );
}

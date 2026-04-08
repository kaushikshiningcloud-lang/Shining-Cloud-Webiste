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
    { name: 'About', href: '/about' },
    { name: 'Offerings', href: '/services' },
    { name: 'Works', href: '/works' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[100] flex justify-between items-center px-6 md:px-12 py-6 bg-[#020202]/60 backdrop-blur-xl border-b border-white/5 text-white pointer-events-none transition-all duration-300">
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

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-[90] bg-[#020202] transition-transform duration-500 ease-in-out transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden flex flex-col items-center justify-center`}
      >
        <div className="flex flex-col gap-8 text-center">
          {navLinks.map((link, index) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`text-2xl font-bold tracking-[0.3em] uppercase transition-all duration-300 ${
                isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {link.name}
            </Link>
          ))}
        </div>
        
        {/* Mobile Footer Info */}
        <div className={`absolute bottom-12 text-[10px] tracking-[0.2em] uppercase opacity-50 transition-opacity duration-1000 ${
          isOpen ? 'opacity-50' : 'opacity-0'
        }`}>
          Shining Cloud Studio © 2026
        </div>
      </div>
    </>
  );
}

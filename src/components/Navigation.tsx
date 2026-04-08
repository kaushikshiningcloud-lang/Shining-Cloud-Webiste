'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 w-full z-[100] flex justify-between items-center px-6 md:px-12 py-8 mix-blend-difference text-white pointer-events-none">
      <Link href="/" className="relative w-[140px] md:w-[180px] h-[40px] md:h-[60px] cursor-pointer pointer-events-auto">
        <Image 
          src="/images/logo.png" 
          alt="Shining Cloud Studio" 
          fill 
          className="object-contain object-left drop-shadow-lg" 
          priority 
        />
      </Link>
      
      <div className="hidden md:flex gap-12 text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase pointer-events-auto">
        <Link href="/" className="hover:text-[#9F8C75] transition-colors">Home</Link>
        <Link href="/about" className="hover:text-[#9F8C75] transition-colors">About</Link>
        <Link href="/services" className="hover:text-[#9F8C75] transition-colors">Offerings</Link>
        <Link href="/works" className="hover:text-[#9F8C75] transition-colors">Works</Link>
        <Link href="/contact" className="hover:text-[#9F8C75] transition-colors">Contact</Link>
      </div>
    </nav>
  );
}

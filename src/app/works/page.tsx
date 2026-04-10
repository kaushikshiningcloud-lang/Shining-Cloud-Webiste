import WorksGallery from '@/components/WorksGallery';
import YouTubeArchive from '@/components/YouTubeArchive';
import { worksImages } from '@/data/worksImages';
import Image from 'next/image';

export default async function WorksPage() {
  const images = worksImages;

  return (
    <div className="w-full bg-[#020202] text-white">

      {/* ── Hero: Particle Building Animation ── */}
      <WorksGallery images={images} />

      {/* ── Section Header ── */}
      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 pt-24 pb-12 border-t border-white/5">
        <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#C8A96E] mb-4 flex items-center gap-3">
          <span className="text-white/20">{"//"}</span> CURATED RENDERS
        </p>
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-[-0.04em] leading-[0.9] text-white">
          PROJECT<br />ARCHIVE.
        </h2>
      </div>

      {/* ── Photo Masonry Grid ── */}
      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 pb-24">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[220px] md:auto-rows-[260px]">
          {images.map((img, i) => {
            // Alternate spanning to create editorial masonry feel
            const isWide  = i % 7 === 0 || i % 7 === 4;   // col-span-2
            const isTall  = i % 9 === 2 || i % 9 === 6;   // row-span-2
            const spanCls = isWide ? 'col-span-2' : 'col-span-1';
            const rowCls  = isTall ? 'row-span-2' : 'row-span-1';

            return (
              <div
                key={i}
                className={`${spanCls} ${rowCls} relative group overflow-hidden bg-[#0d0d0d] border border-white/5`}
              >
                <Image
                  src={`/images/works/${img}`}
                  alt={`Project ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  loading={i < 8 ? 'eager' : 'lazy'}
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#C8A96E]">
                    PROJ_{String(i + 1).padStart(3, '0')}
                  </span>
                  <p className="text-sm font-bold uppercase tracking-tight text-white mt-1 truncate">
                    {img.replace(/\.[^.]+$/, '').trim()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="border-t border-white/5" />
      </div>

      {/* ── Video Archive ── */}
      <YouTubeArchive />

    </div>
  );
}

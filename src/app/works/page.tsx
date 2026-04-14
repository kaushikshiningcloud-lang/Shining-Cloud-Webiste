import YouTubeArchive from '@/components/YouTubeArchive';
import WorksGridWithPreview from '@/components/WorksGridWithPreview';
import { worksImages } from '@/data/worksImages';

export default async function WorksPage() {
  const images = worksImages;

  return (
    <div className="w-full bg-[#020202] text-white">

      {/* ── Minimalist Hero Header ── */}
      <section className="w-full pt-48 pb-32 px-6 md:px-12 max-w-[1600px] mx-auto border-b border-white/5">
        <p className="text-archivi-accent text-[11px] tracking-[0.4em] font-bold uppercase mb-8 flex items-center gap-3">
          <span className="text-white/30 text-sm">{"//"}</span> GLOBAL ARCHIVE
        </p>
        <h1 className="text-6xl md:text-[9rem] lg:text-[12rem] font-bold tracking-[-0.05em] leading-[0.85] uppercase mb-16">
          PORTFOLIO.
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <p className="text-lg md:text-xl font-medium leading-[1.4] max-w-lg text-white/80">
               A curated selection of photorealistic visualizations, cinematic animations, and interactive spatial archives.
            </p>
            <div className="flex flex-col justify-end">
               <div className="flex gap-8 text-[10px] font-bold tracking-[0.2em] uppercase text-white/40">
                  <span>(01) XR WALKTHROUGHS</span>
                  <span>(02) 3D RENDERINGS</span>
                  <span>(03) SCALE MODELS</span>
               </div>
            </div>
        </div>
      </section>

      {/* ── Section 1: Extended Reality (YouTube) ── */}
      <section id="extended-reality" className="scroll-mt-32">
        <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 pt-32 pb-12">
          <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#C8A96E] mb-4 flex items-center gap-3">
            <span className="text-white/20">01 /</span> EXTENDED REALITY
          </p>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-[-0.04em] text-white underline decoration-white/10 decoration-1 underline-offset-[12px]">
            INTERACTIVE VIDEO.
          </h2>
        </div>
        <YouTubeArchive />
      </section>

      {/* ── Section 2: 3D Animations / Renderings (Photos) ── */}
      <section id="3d-animations" className="scroll-mt-32 border-t border-white/5 bg-[#050505]">
        <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 pt-32 pb-12">
          <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#C8A96E] mb-4 flex items-center gap-3">
            <span className="text-white/20">02 /</span> 3D ANIMATIONS & RENDERS
          </p>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-[-0.04em] text-white underline decoration-white/10 decoration-1 underline-offset-[12px]">
            VISUAL ARCHIVE.
          </h2>
        </div>
        <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 pb-32">
          <WorksGridWithPreview images={images} />
        </div>
      </section>

      {/* ── Section 3: Scale Models ── */}
      <section id="scale-models" className="scroll-mt-32 border-t border-white/5 min-h-[50vh]">
        <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 pt-32 pb-12">
          <p className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#C8A96E] mb-4 flex items-center gap-3">
            <span className="text-white/20">03 /</span> SCALE MODELS
          </p>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-[-0.04em] text-white underline decoration-white/10 decoration-1 underline-offset-[12px]">
            DIGITAL CONSTRUCTS.
          </h2>
        </div>
        <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 pb-32">
          <WorksGridWithPreview images={[
            'scale-models/scale_01.jpg',
            'scale-models/scale_02.jpg',
            'scale-models/scale_03.jpg'
          ]} />
        </div>
      </section>

    </div>
  );
}

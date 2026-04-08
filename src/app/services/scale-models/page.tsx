import QualityExpectation from "@/components/QualityExpectation";

export default function ScaleModelsPage() {
  return (
    <div className="w-full bg-archivi-dark text-white pt-48 pb-0 min-h-screen">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 mb-32">
        <p className="text-archivi-accent text-[11px] tracking-[0.2em] font-bold uppercase mb-8 flex items-center gap-3">
          <span className="text-white/30 text-sm">{"//"}</span> SERVICE: PHYSICALITY
        </p>
        <h1 className="text-5xl md:text-[6rem] lg:text-[8rem] text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30 font-bold tracking-[-0.04em] leading-[0.85] uppercase mb-12">
          SCALE <br/> MODELS.
        </h1>
        <p className="text-lg font-medium leading-relaxed max-w-xl text-white/70">
          The ultimate translation of digital design back into physical reality. Our scale models reflect identical proportions and meticulous material detailing, used as centerpieces for major global development pitches.
        </p>
      </div>

      <QualityExpectation />
    </div>
  );
}

import RenderVsModel from "@/components/RenderVsModel";

export default function AnimationPage() {
  return (
    <div className="w-full bg-archivi-light text-archivi-dark pt-48 pb-0">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 mb-16 md:mb-32">
        <p className="text-archivi-accent text-[11px] tracking-[0.2em] font-bold uppercase mb-8 flex items-center gap-3">
          <span className="text-black/30 text-sm">//</span> SERVICE: KINETIC VISUALS
        </p>
        <h1 className="text-5xl md:text-[6rem] lg:text-[8rem] font-bold tracking-[-0.04em] leading-[0.85] uppercase mb-12">
          3D <br/> ANIMATION.
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 border-t border-black/10 pt-12">
            <p className="text-lg font-medium leading-relaxed max-w-xl text-black/70">
              Transforming static geometry into cinematic sequence. We craft atmospheric fly-throughs that establish the emotional texture of physical spaces.
            </p>
            <div className="pl-6 border-l border-black/10">
               <ul className="flex flex-col gap-4 text-sm font-bold tracking-widest uppercase text-black/70">
                  <li>— Fluid Camera Dynamics</li>
                  <li>— Time-Lapse Lighting Studies</li>
                  <li>— Cinematic Editing & Grading</li>
               </ul>
            </div>
        </div>
      </div>

      <RenderVsModel />
    </div>
  );
}

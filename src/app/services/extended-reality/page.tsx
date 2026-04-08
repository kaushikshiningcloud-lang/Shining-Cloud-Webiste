import Image from 'next/image';

export default function ExtendedRealityPage() {
  const xrFeatures = [
    { title: "VIRTUAL WALKTHROUGHS", desc: "Fully interactive 3D environments navigated via headset or browser.", span: "col-span-1 md:col-span-2 lg:col-span-8 bg-white", img: "/images/interior.jpg" },
    { title: "AUGMENTED OVERLAYS", desc: "Projecting blueprints and material finishes directly onto physical construction sites.", span: "col-span-1 lg:col-span-4 bg-[#EAE8E4]", img: "/images/project1.jpg" },
    { title: "MIXED REALITY SCALARS", desc: "Holographic architectural models for boardroom presentations.", span: "col-span-1 lg:col-span-12 bg-archivi-dark text-white", img: "/images/project3.jpg" },
  ];

  return (
    <div className="w-full bg-archivi-light text-archivi-dark pt-48 pb-32">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="mb-24 md:mb-32">
          <p className="text-archivi-accent text-[11px] tracking-[0.2em] font-bold uppercase mb-8 flex items-center gap-3">
            <span className="text-black/30 text-sm">//</span> SERVICE: XR LABS
          </p>
          <h1 className="text-5xl md:text-[6rem] lg:text-[8rem] font-bold tracking-[-0.04em] leading-[0.85] uppercase mb-12">
            EXTENDED <br/> REALITY.
          </h1>
          <p className="text-lg font-medium leading-relaxed max-w-xl text-black/70">
            Pushing the boundaries of spatial perception. We build immersive, interactive architectures that allow clients to physically inhabit spaces long before concrete is poured.
          </p>
        </div>

        {/* Custom Bento Layout for XR */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 auto-rows-[400px] md:auto-rows-[450px]">
          {xrFeatures.map((f, i) => (
             <div key={i} className={`${f.span} p-8 md:p-12 flex flex-col justify-between group overflow-hidden relative border border-black/5`}>
                <div className="relative z-10 flex justify-between w-full">
                   <h2 className="text-2xl md:text-3xl font-bold tracking-tight uppercase leading-[1] max-w-[250px]">{f.title}</h2>
                   <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-40">0{i+1}</span>
                </div>
                <div className="relative z-10 w-full flex justify-end">
                   <p className="text-sm font-medium leading-relaxed max-w-sm text-right opacity-80 bg-inherit/50 backdrop-blur-md p-4 rounded-xl">{f.desc}</p>
                </div>
                
                {/* Background Image injected into Bento Card */}
                <Image src={f.img} alt={f.title} fill className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0 scale-105 group-hover:scale-100" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0" />
             </div>
          ))}
        </div>
      </div>
    </div>
  );
}

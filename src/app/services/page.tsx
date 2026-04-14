import Link from 'next/link';

export default function ServicesPage() {
  const services = [
    { title: "EXTENDED REALITY", desc: "Augmented, Virtual, and Mixed Reality integrations driving interactive spatial discovery.", route: "/works#extended-reality" },
    { title: "3D ANIMATION", desc: "Cinematic fly-throughs and sequenced architectural reveals simulating physical presence.", route: "/works#3d-animations" },
    { title: "SCALE MODELS", desc: "Interactive digital constructs reflecting identical physical proportions and lighting.", route: "/works#scale-models" }
  ];

  return (
    <div className="w-full min-h-screen bg-archivi-dark text-white pt-48 pb-32">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        
        <div className="mb-32">
          <p className="text-archivi-accent text-[11px] tracking-[0.2em] font-bold uppercase mb-8 flex items-center gap-3">
            <span className="text-white/30 text-sm">{"//"}</span> CORE OFFERINGS
          </p>
          <h1 className="text-6xl md:text-[8rem] lg:text-[11rem] font-bold tracking-[-0.04em] leading-[0.85] uppercase">
            SERVICES.
          </h1>
        </div>

        <div className="flex flex-col border-t border-white/10">
           {services.map((svc, i) => (
             <Link key={i} href={svc.route} className="group flex flex-col md:flex-row justify-between items-start md:items-center py-12 border-b border-white/10 hover:bg-white/[0.02] transition-colors px-6 -mx-6">
                <div className="flex items-center gap-8 mb-6 md:mb-0">
                   <span className="text-xs font-bold tracking-[0.3em] text-white/20">0{i+1}</span>
                   <h2 className="text-3xl md:text-5xl font-bold tracking-tight">{svc.title}</h2>
                </div>
                <div className="flex items-center gap-8 md:w-[40%] justify-between">
                   <p className="text-sm font-medium text-white/50 leading-relaxed max-w-sm group-hover:text-white transition-colors">{svc.desc}</p>
                   {/* Arrow Button */}
                   <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-archivi-accent group-hover:border-archivi-accent transition-all duration-500">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white group-hover:text-black transform -rotate-45 group-hover:rotate-0 transition-transform duration-500">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                   </div>
                </div>
             </Link>
           ))}
        </div>

      </div>
    </div>
  );
}

import HeroSection from "@/components/HeroSection";
import Marquee from "@/components/Marquee";
import ImmersiveStory from "@/components/ImmersiveStory";
import ProcessTimeline from "@/components/ProcessTimeline";

const testimonials = [
  { text: "The translation of our CAD files into atmospheric reality was immaculate. Absolute professionals.", author: "A. Sterling", role: "Principal Architect" },
  { text: "We were able to pre-sell 40% of the units purely based on the nocturnal mixed reality walkthrough.", author: "M. Chen", role: "Development Lead" },
  { text: "Finally, an XR agency that understands physical light and material density. Cannot recommend enough.", author: "T. Wright", role: "Design Director" },
];

export default function Home() {
  return (
    <div className="bg-archivi-dark w-full">
      <HeroSection />
      <Marquee />
      <div className="bg-archivi-light w-full">
        {/* Studio Introduction - Integrated from About */}
        <section className="max-w-[1600px] mx-auto px-6 md:px-12 pt-32 pb-16">
          <p className="text-archivi-accent text-[11px] tracking-[0.2em] font-bold uppercase mb-8 flex items-center gap-3 text-archivi-dark">
            <span className="text-black/30 text-sm">{"//"}</span> THE STUDIO
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-black/10 pt-12">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.1] text-archivi-dark uppercase">
               SPATIAL <br/> ARCHIVES.
            </h2>
            <div className="flex flex-col gap-8">
              <p className="text-lg md:text-xl font-medium leading-[1.4] max-w-lg text-archivi-dark">
                 We construct digital twins of unbuilt environments, blending architectural precision with cinematic lighting to pre-visualize reality.
              </p>
              <p className="text-sm font-medium text-black/60 leading-[1.6] max-w-sm">
                 Founded on the principles of immaculate geometry and photorealistic truth, Shining Cloud Studio partners with global developers to render extended reality, 3D animations, and scale models that drive multi-million dollar investments.
              </p>
            </div>
          </div>
        </section>

        <ImmersiveStory />
        <ProcessTimeline />
        
        {/* Industry Reception Integrated */}
        <section className="py-32 bg-[#E1DED8] px-6 md:px-12 border-t border-black/10 relative overflow-hidden">
          <div className="max-w-[1600px] mx-auto">
            <p className="text-archivi-accent text-[11px] tracking-[0.2em] font-bold uppercase mb-16 flex items-center gap-3">
              <span className="text-black/30 text-sm">{"//"}</span> INDUSTRY RECEPTION
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {testimonials.map((t, idx) => (
                <div key={idx} className="bg-white p-12 flex flex-col justify-between min-h-[300px]">
                  <h3 className="text-xl md:text-2xl font-medium tracking-tight leading-[1.3] mb-12 text-archivi-dark">
                    &quot;{t.text}&quot;
                  </h3>
                  <div>
                    <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-archivi-dark">{t.author}</p>
                    <p className="text-[10px] font-bold tracking-widest uppercase text-black/40 mt-1">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

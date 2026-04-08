import ProcessTimeline from "@/components/ProcessTimeline";
import ImmersiveStory from "@/components/ImmersiveStory";

// Synthetic Testimonials logic built deeply into the About page architecture
const testimonials = [
  { text: "The translation of our CAD files into atmospheric reality was immaculate. Absolute professionals.", author: "A. Sterling", role: "Principal Architect" },
  { text: "We were able to pre-sell 40% of the units purely based on the nocturnal mixed reality walkthrough.", author: "M. Chen", role: "Development Lead" },
  { text: "Finally, an XR agency that understands physical light and material density. Cannot recommend enough.", author: "T. Wright", role: "Design Director" },
];

export default function AboutPage() {
  return (
    <div className="w-full bg-archivi-light text-archivi-dark pt-32 pb-0">
      
      {/* About Hero Segment */}
      <section className="max-w-[1600px] mx-auto px-6 md:px-12 mb-32">
        <p className="text-archivi-accent text-[11px] tracking-[0.2em] font-bold uppercase mb-8 flex items-center gap-3">
          <span className="text-black/30 text-sm">//</span> THE STUDIO
        </p>
        <h1 className="text-5xl md:text-8xl lg:text-[10rem] font-bold tracking-[-0.04em] leading-[0.85] uppercase mb-16">
          SPATIAL <br/> ARCHIVES.
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-black/10 pt-12">
            <p className="text-lg md:text-xl font-medium leading-[1.4] max-w-lg">
               We construct digital twins of unbuilt environments, blending architectural precision with cinematic lighting to pre-visualize reality.
            </p>
            <p className="text-sm font-medium text-black/60 leading-[1.6] max-w-sm">
               Founded on the principles of immaculate geometry and photorealistic truth, Shining Cloud Studio partners with global developers to render extended reality, 3D animations, and scale models that drive multi-million dollar investments.
            </p>
        </div>
      </section>

      {/* Visual Block */}
      <ImmersiveStory />

      {/* Process Block */}
      <ProcessTimeline />

      {/* Testimonials Archivi Style */}
      <section className="py-32 bg-[#E1DED8] px-6 md:px-12 border-t border-black/10 relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto">
            <p className="text-archivi-accent text-[11px] tracking-[0.2em] font-bold uppercase mb-16 flex items-center gap-3">
              <span className="text-black/30 text-sm">//</span> INDUSTRY RECEPTION
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               {testimonials.map((t, idx) => (
                  <div key={idx} className="bg-white p-12 flex flex-col justify-between min-h-[300px]">
                      <h3 className="text-xl md:text-2xl font-medium tracking-tight leading-[1.3] mb-12">
                         "{t.text}"
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
  );
}

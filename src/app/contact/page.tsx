export default function ContactPage() {
  return (
    <div className="w-full min-h-screen bg-archivi-light text-archivi-dark pt-48 pb-32">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="mb-24">
          <p className="text-archivi-accent text-[11px] tracking-[0.2em] font-bold uppercase mb-8 flex items-center gap-3">
            <span className="text-black/30 text-sm">{"//"}</span> PROJECT INQUIRY
          </p>
          <h1 className="text-6xl md:text-[8rem] lg:text-[11rem] font-bold tracking-[-0.04em] leading-[0.85] uppercase">
            CONTACT.
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 border-t border-black/10 pt-16">
           <div className="lg:col-span-5 flex flex-col gap-8">
              <h3 className="text-2xl font-bold uppercase tracking-tight">Let&apos;s craft the Unbuilt.</h3>
              <p className="text-sm font-medium text-black/60 leading-relaxed max-w-sm">
                 Please provide structural context, phase timeline, and architectural intention. Our global directors will coordinate within 24 hours.
              </p>
           </div>
           
           <div className="lg:col-span-7">
              <form className="flex flex-col gap-12 w-full">
                 <div className="flex flex-col gap-4 border-b border-black/20 pb-4">
                    <label className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-40">01. Studio / Brand Name</label>
                    <input type="text" className="w-full bg-transparent text-xl md:text-3xl font-medium focus:outline-none placeholder:text-black/20" placeholder="e.g. Zaha Hadid Architects" />
                 </div>
                 
                 <div className="flex flex-col gap-4 border-b border-black/20 pb-4">
                    <label className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-40">02. Primary Contact</label>
                    <input type="email" className="w-full bg-transparent text-xl md:text-3xl font-medium focus:outline-none placeholder:text-black/20" placeholder="director@studio.com" />
                 </div>
                 
                 <div className="flex flex-col gap-4 border-b border-black/20 pb-4">
                    <label className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-40">03. Project Scope Details</label>
                    <textarea className="w-full bg-transparent text-xl md:text-3xl font-medium focus:outline-none placeholder:text-black/20 resize-none h-32" placeholder="Tell us about the scale, location, and aesthetic goal..."></textarea>
                 </div>

                 <button type="button" className="group flex items-center justify-between w-full py-8 mt-8 border border-black/10 hover:border-archivi-accent transition-colors px-8 rounded-full cursor-pointer hover:bg-archivi-dark hover:text-white">
                    <span className="text-[11px] font-bold tracking-[0.2em] uppercase">Submit Inquiry</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="transform group-hover:rotate-45 transition-transform duration-500">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                 </button>
              </form>
           </div>
        </div>

      </div>
    </div>
  );
}

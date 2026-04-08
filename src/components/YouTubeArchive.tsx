export default function YouTubeArchive() {
  const vids = [
    '-Qdz4UAtqw8', 'HlTXbwi681Y', '0EOq5kfJ2gc', 'dwQWe6YnwfM',
    'L3CYyf5TFc4', '99ipxNO211c', 'Zn7k8jMf4r4', 'qW2wbncAQco',
    '8hKvfLFCySo', 'FJwDwCjCrHA'
  ];

  return (
    <section className="bg-archivi-light text-archivi-dark py-32 px-6 relative z-20">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-24 flex flex-col md:flex-row justify-between items-start md:items-end border-b border-black/10 pb-12">
            <div>
              <p className="text-archivi-accent text-[11px] tracking-[0.2em] font-bold uppercase mb-6 flex items-center gap-3">
                <span className="text-black/30 text-sm">//</span> MOTION CAPTURE
              </p>
              <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-[-0.03em] leading-[0.9]">
                KINETIC <br/> PROFILES.
              </h2>
            </div>
            <p className="text-sm text-black/60 font-medium max-w-sm mt-8 md:mt-0 leading-relaxed">
              Our curated archive of architectural sequences, VR teardowns, and mixed-reality walkthroughs extracted directly from live deployments.
            </p>
        </div>

        {/* Archivi Bento Grid for Videos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[350px]">
           {vids.map((id, index) => {
              // Create irregular spanning for architectural effect
              const colSpan = index === 0 || index === 5 ? 'lg:col-span-2' : 'col-span-1';

              return (
                <div key={id} className={`${colSpan} bg-[#EAE8E4] flex flex-col group overflow-hidden border border-black/10 relative p-2`}>
                   
                   <div className="absolute top-6 left-6 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                       <span className="bg-archivi-accent text-archivi-dark px-3 py-1 text-[9px] font-bold tracking-[0.2em] uppercase shadow-lg">
                           PLAYING: SEQ_{index.toString().padStart(3, '0')}
                       </span>
                   </div>

                   <iframe 
                      src={`https://www.youtube.com/embed/${id}?controls=1&rel=0&modestbranding=1`}
                      title={`Kinetic Profile ${index}`}
                      className="w-full h-full object-cover filter grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 pointer-events-auto"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                   />
                </div>
              )
           })}
        </div>
      </div>
    </section>
  )
}

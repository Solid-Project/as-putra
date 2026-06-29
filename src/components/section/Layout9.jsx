import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSectionAnimation } from "@/hooks/useSectionAnimation";
import logoSiluet from "@/assets/logo.jpg"; 

gsap.registerPlugin(ScrollTrigger);

const Layout9 = ({ data, index }) => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const listRef = useRef(null);

  const displayTitle = data?.title || "Pilar Keunggulan Sektor Kami";
  const displaySubtitle = data?.subtitle || "Aretha Farm";
  const displayImage = data?.image ? `${import.meta.env.VITE_API_URL}/storage/${data.image}` : "";
  const lists = data?.layout_data?.lists || [];

  const isLongContent = lists.length > 3 || (displayTitle && displayTitle.length > 60);

  useSectionAnimation(sectionRef, () => {
      gsap.fromTo(titleRef.current, { y: -20 }, { 
        y: 20, ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1 }
      });

      gsap.fromTo(imageRef.current, { y: 40 }, { 
        y: -40, ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1.5 }
      });
  }, [lists]);

  return (
    <section 
      ref={sectionRef} 
      id={`section-${index}`}
      className="section no-snap relative w-full flex flex-col bg-white overflow-hidden"
      style={{ 
        height: isLongContent ? "auto" : "100vh",
        minHeight: "100vh",
        scrollSnapAlign: isLongContent ? "none" : "start",
      }}
      data-theme="light"
    >
      {/* BACKGROUND SILUET LOGO */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none -z-0">
        <img src={logoSiluet} alt="" className="w-[60%] h-auto rotate-12" />
      </div>

      {/* KONTEN UTAMA */}
      {/* pt-20 (80px): Jarak yang jauh lebih rapat dan ideal untuk Navbar standar */}
      <div className="container mx-auto px-[8%] relative z-10 pt-20 pb-16 lg:pt-24">
        
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-20 items-start">
          
          {/* SISI KIRI: JUDUL & VISUAL */}
          <div className="lg:col-span-7 relative">
            <div ref={titleRef} className="text-reveal relative z-20 mb-10">
              <span className="text-slate-500 font-black tracking-[0.4em] text-[9px] uppercase mb-3 block">
                {displaySubtitle}
              </span>
              <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-7xl text-slate-900 font-bold leading-[1] mb-0 tracking-tighter whitespace-pre-line">
                {displayTitle}
              </h2>
            </div>
            
            <div 
              ref={imageRef}
              className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] z-10 bg-slate-50 mt-6"
            >
              {displayImage && (
                <img src={displayImage} alt={displayTitle} className="w-full h-full object-cover" />
              )}
            </div>
          </div>

          {/* SISI KANAN: LIST DESKRIPSI */}
          {/* lg:mt-12 disesuaikan agar tetap sejajar horizontal dengan baris pertama judul */}
          <div ref={listRef} className="lg:col-span-5 space-y-10 lg:mt-12">
            
            {lists.map((item, idx) => (
              <div key={item.id || idx} className="text-reveal flex gap-6 group">
                {/* ANGKA: Hitam Pekat */}
                <span className="text-3xl font-black text-black font-['Playfair_Display'] leading-none">
                  0{idx + 1}
                </span>
                
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-slate-700 leading-relaxed font-light text-sm md:text-base text-justify">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}

          </div>

        </div>
      </div>

      <style>{`
        #section-${index}.no-snap {
          scroll-snap-align: none !important;
          height: auto !important;
          min-height: 100vh !important;
        }
      `}</style>
    </section>
  );
};

export default Layout9;
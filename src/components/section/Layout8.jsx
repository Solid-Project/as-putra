import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSectionAnimation } from "@/hooks/useSectionAnimation";
import logoAsliUrl from "@/assets/logo.jpg";

gsap.registerPlugin(ScrollTrigger);

const Layout8 = ({ data, index }) => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const cardRef = useRef(null);
  const statsRef = useRef(null);

  const displayTitle = data?.title || "";
  const displayDescription = data?.description || "";
  const displayImage = data?.image 
    ? `${import.meta.env.VITE_API_URL}/storage/${data.image}` 
    : "";
  
  const layoutData = data?.layout_data || {};
  const stats = layoutData?.stats || [];

  useSectionAnimation(sectionRef, () => {
      gsap.fromTo(imageRef.current, 
        { y: 30 }, 
        { 
          y: -30, 
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          }
        }
      );
  }, [stats]);

  return (
    <section 
      ref={sectionRef} 
      id={`section-${index}`}
      className="section no-snap relative w-full flex flex-col bg-[#0F1A3E]"
      style={{ 
        scrollSnapAlign: "none", 
        scrollSnapStop: "normal",
        minHeight: "100vh",
        height: "auto", 
        display: "block", 
      }}
      data-theme="dark"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none -z-0">
        <img src={logoAsliUrl} alt="" className="w-[70%] h-auto rotate-12" />
      </div>

      {/* PERBAIKAN JARAK: 
          - pt-24 lg:pt-28: Mengurangi jarak atas agar tidak terlalu jauh melorot (Navbar Safe Zone).
          - pb-24 lg:pb-32: Mengurangi jarak bawah agar lebih seimbang.
      */}
      <div className="w-full flex items-center px-[6%] relative z-10 pt-24 pb-24 lg:pt-28 lg:pb-32">
        <div className="w-full grid lg:grid-cols-12 gap-10 lg:gap-0 items-center lg:items-start">
          
          {/* KOLOM KIRI: IMAGE */}
          <div className="lg:col-span-7 relative group order-2 lg:order-1">
            <div className="overflow-hidden rounded-sm shadow-2xl aspect-[4/5] lg:aspect-[16/10] border border-white/10 bg-[#162454]">
              {displayImage && (
                <img 
                  ref={imageRef}
                  src={displayImage} 
                  alt={displayTitle} 
                  className="w-full h-full object-cover scale-110" 
                />
              )}
            </div>
            
            <div className="absolute -bottom-6 -left-4 lg:-left-6 bg-[#FFC700] text-[#0F1A3E] p-6 lg:p-8 shadow-xl z-30">
               <p className="text-[10px] font-black tracking-[0.3em] uppercase mb-1 opacity-70">
                 {layoutData.year_label || "Established"}
               </p>
               <h4 className="text-3xl lg:text-4xl font-black font-['Playfair_Display']">
                 {layoutData.year_num || "1988"}
               </h4>
            </div>
          </div>

          {/* KOLOM KANAN: CARD */}
          <div className="lg:col-span-5 lg:-ml-20 mt-8 lg:mt-24 z-20 order-1 lg:order-2">
            <div 
              ref={cardRef}
              className="bg-[#162454] p-8 md:p-14 shadow-2xl border-t-4 border-[#FFC700]"
            >
              <h2 className="font-['Playfair_Display'] text-3xl md:text-5xl text-white font-bold mb-6 lg:mb-8 leading-tight tracking-tighter whitespace-pre-line">
                {displayTitle}
              </h2>
              
              <div 
                className="text-gray-400 leading-relaxed mb-10 text-base md:text-lg font-light text-justify"
                dangerouslySetInnerHTML={{ __html: displayDescription }}
              />

              <div ref={statsRef} className="grid grid-cols-2 gap-6 lg:gap-8 border-t border-white/10 pt-8 lg:pt-10">
                {stats.map((stat, i) => (
                  <div key={i}>
                    <h5 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-1">
                      {stat.label}
                    </h5>
                    <p className="text-2xl lg:text-3xl font-bold text-[#FFC700] italic font-['Playfair_Display'] leading-none">
                      {stat.val}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        #section-${index}.no-snap {
          scroll-snap-align: none !important;
          scroll-snap-stop: normal !important;
          height: auto !important;
          min-height: 100vh !important;
          overflow: visible !important;
        }
      `}</style>
    </section>
  );
};

export default Layout8;
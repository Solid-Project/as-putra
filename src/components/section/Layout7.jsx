import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRightIcon, ArrowLeftIcon, BuildingOffice2Icon } from "@heroicons/react/24/outline";
import logoAsliUrl from "@/assets/logo.jpg";

gsap.registerPlugin(ScrollTrigger);

const Layout7 = ({ data, index }) => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const mainCardRef = useRef(null);
  const scrollContainerRef = useRef(null);

  const displayTitle = data?.title || "Sektor Kami";
  const displaySubtitle = data?.subtitle || "";
  const displayLabel = data?.more_text || "Unit Bisnis";
  const unitBisnis = data?.layout_data?.items || [];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current, 
        { y: 20, opacity: 0 }, 
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%" }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // PERBAIKAN: Gunakan fungsi scroll standar yang dibungkus pencegah lonjakan
  const handleScroll = (e, direction) => {
    // 1. Sangat Penting: Hentikan semua propagasi agar tidak memicu scroll parent/fullpage.js
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 320; 
      const targetScroll = direction === "left" 
        ? container.scrollLeft - scrollAmount 
        : container.scrollLeft + scrollAmount;

      // Gunakan scrollTo bawaan browser yang lebih stabil jika tidak ingin menambah plugin GSAP
      container.scrollTo({
        left: targetScroll,
        behavior: "smooth"
      });
    }
  };

  return (
    <section 
      ref={sectionRef} 
      id={`section-${index}`}
      className="section relative w-full h-screen flex flex-col bg-white overflow-hidden"
      // CSS overflowAnchor mencegah browser 'menebak' posisi scroll
      style={{ overflowAnchor: "none" }} 
      data-theme="light"
    >
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none -z-0">
        <img src={logoAsliUrl} alt="" className="w-[50%] h-auto rotate-6" />
      </div>
      
      <div className="relative z-10 w-full h-full flex flex-col justify-center pt-20 pb-10 px-[8%]">
        
        <div ref={headerRef} className="w-full mb-6 flex flex-col md:flex-row justify-between items-end gap-4">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-2">
               <div className="w-8 h-[2px] bg-slate-900"></div>
               <span className="text-slate-900 font-black tracking-[0.3em] text-[9px] uppercase">
                  {displaySubtitle}
               </span>
            </div>
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl lg:text-5xl text-slate-950 font-bold leading-tight tracking-tighter">
              {displayTitle}
            </h2>
          </div>

          <div className="flex gap-2 mb-1">
            <button 
              type="button"
              // Mencegah button mengambil fokus yang memicu scroll-to-view
              onMouseDown={(e) => e.preventDefault()} 
              onClick={(e) => handleScroll(e, "left")} 
              className="p-3 border border-slate-200 bg-white rounded-full hover:bg-slate-950 hover:text-white transition-all shadow-sm active:scale-90 group outline-none"
            >
              <ArrowLeftIcon className="w-4 h-4" />
            </button>
            <button 
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={(e) => handleScroll(e, "right")} 
              className="p-3 border border-slate-200 bg-white rounded-full hover:bg-slate-950 hover:text-white transition-all shadow-sm active:scale-90 group outline-none"
            >
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div 
          ref={mainCardRef}
          className="bg-white/95 backdrop-blur-md p-5 md:p-8 rounded-xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08)] border border-slate-100"
        >
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
             <BuildingOffice2Icon className="w-4 h-4 text-slate-400" />
             <h3 className="text-[9px] font-black text-slate-900 tracking-[0.2em] uppercase">
                {displayLabel}
             </h3>
          </div>

          <div 
            ref={scrollContainerRef}
            // MENGHAPUS snap-mandatory dan snap-x untuk menghindari konflik koordinat browser
            className="hide-scrollbar flex gap-6 overflow-x-auto touch-pan-x"
            style={{ 
              scrollSnapType: "none", 
              WebkitOverflowScrolling: "touch"
            }}
          >
            {unitBisnis.map((item, idx) => (
              <div 
                key={item.id || idx}
                className="unit-card flex-none w-[260px] md:w-[300px] group"
              >
                <div className="relative h-[140px] md:h-[180px] overflow-hidden rounded-lg bg-slate-100 mb-4 border border-slate-200/50 shadow-sm">
                  {item.image ? (
                    <img 
                      src={`${import.meta.env.VITE_API_URL}/storage/${item.image}`} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300 italic text-xs">No Image</div>
                  )}
                </div>

                <h4 className="text-lg font-bold text-slate-950 mb-1 tracking-tight group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h4>
                <p className="text-slate-500 text-[13px] leading-relaxed font-light line-clamp-2 italic">
                  {item.desc}
                </p>
                <div className="mt-4 w-6 group-hover:w-12 h-[2px] bg-slate-900 transition-all duration-500"></div>
              </div>
            ))}
            <div className="flex-none w-10" />
          </div>
        </div>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

export default Layout7;
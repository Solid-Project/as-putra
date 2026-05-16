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

  const handleScroll = (e, direction) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const container = scrollContainerRef.current;
    if (container) {
      // Menggunakan ukuran scroll statis yang sesuai dengan lebar kartu baru Anda (280px + gap)
      const scrollAmount = window.innerWidth < 768 ? 300 : 340; 
      const targetScroll = direction === "left" 
        ? container.scrollLeft - scrollAmount 
        : container.scrollLeft + scrollAmount;

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
      // h-auto di mobile agar membungkus pas, md:h-screen di desktop
      className="section relative w-full h-auto md:h-screen flex flex-col bg-white overflow-hidden"
      style={{ overflowAnchor: "none" }} 
      data-theme="light"
    >
      {/* Background Decor Logo */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] md:opacity-[0.03] pointer-events-none -z-0">
        <img src={logoAsliUrl} alt="" className="w-[80%] md:w-[50%] h-auto rotate-6" />
      </div>
      
      {/* Padding atas bawah disesuaikan agar pas dengan kontainer */}
      <div className="relative z-10 w-full h-full flex flex-col justify-start lg:justify-center py-12 md:py-10 px-5 sm:px-12 lg:px-[8%]">
        
        {/* HEADER AREA */}
        <div ref={headerRef} className="w-full mb-6 flex flex-row justify-between items-end gap-4">
          <div className="max-w-[70%] sm:max-w-3xl">
            <div className="flex items-center gap-3 mb-2">
               <div className="w-6 md:w-8 h-[2px] bg-slate-900"></div>
               <span className="text-slate-900 font-black tracking-[0.2em] md:tracking-[0.3em] text-[8px] md:text-[9px] uppercase truncate">
                  {displaySubtitle}
               </span>
            </div>
            <h2 className="font-['Playfair_Display'] text-2xl sm:text-4xl lg:text-5xl text-slate-950 font-bold leading-tight tracking-tighter line-clamp-1 md:line-clamp-none">
              {displayTitle}
            </h2>
          </div>

          <div className="flex gap-1.5 md:gap-2 mb-0.5">
            <button 
              type="button"
              onMouseDown={(e) => e.preventDefault()} 
              onClick={(e) => handleScroll(e, "left")} 
              className="p-2 md:p-3 border border-slate-200 bg-white rounded-full hover:bg-slate-950 hover:text-white transition-all shadow-sm active:scale-90 group outline-none"
            >
              <ArrowLeftIcon className="w-4 h-4" />
            </button>
            <button 
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={(e) => handleScroll(e, "right")} 
              className="p-2 md:p-3 border border-slate-200 bg-white rounded-full hover:bg-slate-950 hover:text-white transition-all shadow-sm active:scale-90 group outline-none"
            >
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* CONTAINER UTAMA CARD */}
        <div 
          ref={mainCardRef}
          className="bg-white/95 backdrop-blur-md p-5 md:p-8 rounded-xl shadow-[0_15px_30px_-12px_rgba(0,0,0,0.04)] md:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08)] border border-slate-100 w-full"
        >
          <div className="flex items-center gap-2 mb-5 pb-4 border-b border-slate-100">
             <BuildingOffice2Icon className="w-4 h-4 text-slate-400" />
             <h3 className="text-[9px] font-black text-slate-900 tracking-[0.2em] uppercase">
                {displayLabel}
             </h3>
          </div>

          <div 
            ref={scrollContainerRef}
            // PERBAIKAN UTAMA: Menggunakan grid-rows-2 dengan tinggi statis h-[480px] di mobile.
            // Tinggi h-[480px] ini pas untuk menampung 2 baris kartu besar tanpa menyisakan ruang kosong di bawah.
            className="hide-scrollbar grid grid-rows-2 grid-flow-col h-[480px] md:h-auto lg:flex lg:flex-row gap-x-6 gap-y-5 lg:gap-6 overflow-x-auto touch-pan-x w-full"
            style={{ 
              scrollSnapType: "none", 
              WebkitOverflowScrolling: "touch"
            }}
          >
            {unitBisnis.map((item, idx) => (
              <div 
                key={item.id || idx}
                // PERBAIKAN: Ukuran kartu dikembalikan besar (w-[280px]) agar mantap dan tidak kempis
                className="unit-card flex-none w-[280px] md:w-[300px] group"
              >
                {/* PERBAIKAN: Tinggi gambar dikembalikan ke h-[140px] seperti semula */}
                <div className="relative h-[140px] md:h-[180px] overflow-hidden rounded-lg bg-slate-100 mb-3 border border-slate-200/50 shadow-sm">
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

                <h4 className="text-base md:text-lg font-bold text-slate-950 mb-1 tracking-tight group-hover:text-blue-600 transition-colors line-clamp-1">
                  {item.title}
                </h4>
                <p className="text-slate-500 text-[12px] md:text-[13px] leading-relaxed font-light line-clamp-2 italic text-justify">
                  {item.desc}
                </p>
                <div className="mt-4 w-6 group-hover:w-12 h-[2px] bg-slate-900 transition-all duration-500 hidden sm:block"></div>
              </div>
            ))}
            
            {/* Spacer ujung kanan */}
            <div className="w-2 md:w-10" />
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
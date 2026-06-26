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
      /* 
        KUNCI PERBAIKAN: Tambahkan 'no-snap' di className!
        Ini memberi tahu GSAP/CSS Snap agar JANGAN memaksa komponen ini berukuran 100vh.
        Sekarang tinggi halaman murni mengikuti isi konten (h-auto).
      */
      className="section no-snap relative w-full h-auto flex flex-col bg-white overflow-hidden"
      style={{ 
        overflowAnchor: "none",
        // Mengamankan style inline agar tidak ditimpa oleh library luar
        height: "auto",
        minHeight: "100vh"
      }} 
      data-theme="light"
    >
      {/* Background Decor Logo */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] md:opacity-[0.03] pointer-events-none -z-0">
        <img src={logoAsliUrl} alt="" className="w-[80%] md:w-[50%] h-auto rotate-6" />
      </div>
      
      {/* Kontainer dalam sekarang menggunakan py-12 agar pas, tidak berlebih */}
      <div className="relative z-10 w-full h-auto flex flex-col justify-start py-12 md:py-20 px-5 sm:px-12 lg:px-[8%]">
        
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
          className="bg-white/95 backdrop-blur-md p-5 md:p-8 rounded-xl shadow-[0_15px_30px_-12px_rgba(0,0,0,0.04)] md:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08)] border border-slate-100 w-full h-auto"
        >
          <div className="flex items-center gap-2 mb-5 pb-4 border-b border-slate-100">
             <BuildingOffice2Icon className="w-4 h-4 text-slate-400" />
             <h3 className="text-[9px] font-black text-slate-900 tracking-[0.2em] uppercase">
                {displayLabel}
             </h3>
          </div>

          <div 
            ref={scrollContainerRef}
            className="hide-scrollbar flex flex-row items-stretch h-auto gap-x-6 overflow-x-auto touch-pan-x w-full py-2"
            style={{ 
              scrollSnapType: "none", 
              WebkitOverflowScrolling: "touch"
            }}
          >
            {unitBisnis.map((item, idx) => (
              <div 
                key={item.id || idx}
                className="unit-card flex-none w-[280px] md:w-[310px] flex flex-col justify-between group bg-transparent"
              >
                <div className="flex flex-col h-auto">
                  {/* Gambar Unit Bisnis */}
                  <div className="relative h-[130px] md:h-[165px] overflow-hidden rounded-lg bg-slate-100 mb-3 border border-slate-200/50 shadow-sm flex-shrink-0">
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

                  {/* Judul Unit Bisnis */}
                  <h4 className="text-base md:text-lg font-bold text-slate-950 mb-2 tracking-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                    {item.title}
                  </h4>

                  {/* Teks Deskripsi Otomatis Melar Tanpa Batasan */}
                  <p className="text-slate-500 text-[12px] md:text-[13px] leading-relaxed font-light h-auto italic text-justify break-words whitespace-normal pb-2">
                    {item.desc}
                  </p>
                </div>

                {/* Garis dekoratif konstan di bagian bawah card */}
                <div className="mt-auto pt-2 w-6 group-hover:w-12 h-[2px] bg-slate-900 transition-all duration-500 hidden sm:block"></div>
              </div>
            ))}
            
            {/* Spacer ujung kanan */}
            <div className="w-2 md:w-10 flex-shrink-0" />
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